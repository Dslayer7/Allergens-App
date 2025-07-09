import * as XLSX from 'xlsx';

export function parseExcel(fileBuffer: ArrayBuffer): { headers: string[]; data: Record<string, string>[] } {
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });

  if (jsonData.length === 0) {
    return { headers: [], data: [] };
  }

  const headers: string[] = jsonData[0].map(String);
  const data: Record<string, string>[] = jsonData.slice(1).map(row => {
    const rowData: Record<string, string> = {};
    headers.forEach((header, index) => {
      rowData[header] = row[index] !== null && row[index] !== undefined ? String(row[index]) : '';
    });
    return rowData;
  });

  return { headers, data };
}
