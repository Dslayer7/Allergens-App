import * as XLSX from 'xlsx';

export function parseExcel(fileBuffer: ArrayBuffer): { headers: string[]; data: Record<string, string>[] } {
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  
  let allHeaders: string[] = [];
  let allData: Record<string, string>[] = [];

  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });

    if (jsonData.length === 0) {
      continue; // Skip empty sheets
    }
    
    // Heuristic: The header row is the one with the most non-empty cells in the first 20 rows.
    let headerRowIndex = -1;
    let maxNonEmptyCells = 0;
    
    // Look for the header in the first 20 rows of the spreadsheet
    for (let i = 0; i < Math.min(jsonData.length, 20); i++) {
      const row = jsonData[i];
      if (!Array.isArray(row)) continue;
      const nonEmptyCells = row.filter(cell => String(cell).trim() !== '').length;
      // Header should have more columns than what we've seen so far.
      if (nonEmptyCells > maxNonEmptyCells) {
        maxNonEmptyCells = nonEmptyCells;
        headerRowIndex = i;
      }
    }

    // If no row with multiple cells was found, it's probably not a data sheet.
    if (headerRowIndex === -1 || maxNonEmptyCells < 2) {
      continue;
    }

    const headers: string[] = jsonData[headerRowIndex].map(String);
    if (allHeaders.length === 0) {
        allHeaders = headers;
    }
    
    const dataRows = jsonData.slice(headerRowIndex + 1);

    const sheetData: Record<string, string>[] = dataRows.map(row => {
      const rowData: Record<string, string> = {};
      if (Array.isArray(row)) {
          headers.forEach((header, index) => {
            rowData[header] = row[index] !== null && row[index] !== undefined ? String(row[index]) : '';
          });
      }
      return rowData;
    }).filter(row => Object.values(row).some(cell => String(cell).trim() !== '')); // Filter out completely empty rows
    
    allData.push(...sheetData);
  }

  return { headers: allHeaders, data: allData };
}
