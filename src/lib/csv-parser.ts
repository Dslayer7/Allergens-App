export function parseCsv(csvText: string): { headers: string[]; data: Record<string, string>[] } {
  const lines = csvText.trim().split('\n');
  if (lines.length === 0) {
    return { headers: [], data: [] };
  }

  // More robust header parsing
  const headers = (lines[0].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [])
    .map(h => h.trim().replace(/^"|"$/g, ''));
  
  const data: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;

    const values = (lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [])
      .map(v => v.trim().replace(/^"|"$/g, ''));

    if (values.length === headers.length) {
      const row = headers.reduce((acc, header, index) => {
        acc[header] = values[index] || '';
        return acc;
      }, {} as Record<string, string>);
      data.push(row);
    }
  }

  return { headers, data };
}
