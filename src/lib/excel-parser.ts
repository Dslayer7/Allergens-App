import * as XLSX from 'xlsx';

export function parseExcel(fileBuffer: ArrayBuffer): { headers: string[]; data: Record<string, string>[] } {
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });

  if (jsonData.length === 0) {
    return { headers: [], data: [] };
  }
  
  // Heuristic: The header row is the first one with more than 5 non-empty cells.
  // This helps skip over titles or other content at the top of the sheet.
  let headerRowIndex = -1
  for (let i = 0; i < jsonData.length; i++) {
    const nonEmptyCells = jsonData[i].filter(cell => String(cell).trim() !== '').length;
    if (nonEmptyCells > 5) {
      headerRowIndex = i;
      break;
    }
  }

  if (headerRowIndex === -1) {
    console.error("Could not determine header row in Excel file. A header row should have at least 6 non-empty columns.");
    return { headers: [], data: [] };
  }

  const headers: string[] = jsonData[headerRowIndex].map(String);
  const dataRows = jsonData.slice(headerRowIndex + 1);

  const data: Record<string, string>[] = dataRows.map(row => {
    const rowData: Record<string, string> = {};
    headers.forEach((header, index) => {
      rowData[header] = row[index] !== null && row[index] !== undefined ? String(row[index]) : '';
    });
    return rowData;
  }).filter(row => Object.values(row).some(cell => String(cell).trim() !== '')); // Filter out completely empty rows

  return { headers, data };
}
