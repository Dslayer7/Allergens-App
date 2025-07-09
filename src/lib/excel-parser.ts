import * as XLSX from 'xlsx';

export function parseExcel(fileBuffer: ArrayBuffer): { headers: string[]; data: Record<string, string>[] } {
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });

  if (jsonData.length === 0) {
    return { headers: [], data: [] };
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

  // If no row with multiple cells was found, it's probably a malformed file.
  if (headerRowIndex === -1 || maxNonEmptyCells < 2) {
    console.error("Could not determine a valid header row in Excel file. A header should have at least 2 columns.");
    return { headers: [], data: [] };
  }


  const headers: string[] = jsonData[headerRowIndex].map(String);
  const dataRows = jsonData.slice(headerRowIndex + 1);

  const data: Record<string, string>[] = dataRows.map(row => {
    const rowData: Record<string, string> = {};
    if (Array.isArray(row)) {
        headers.forEach((header, index) => {
          rowData[header] = row[index] !== null && row[index] !== undefined ? String(row[index]) : '';
        });
    }
    return rowData;
  }).filter(row => Object.values(row).some(cell => String(cell).trim() !== '')); // Filter out completely empty rows

  return { headers, data };
}
