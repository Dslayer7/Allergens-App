'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMenu } from '@/context/menu-provider';
import { useToast } from '@/hooks/use-toast';
import { parseCsv } from '@/lib/csv-parser';
import { parseExcel } from '@/lib/excel-parser';
import type { MenuItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, Loader2 } from 'lucide-react';

export default function HomeClient() {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const { setMenuItems, isLoading, setIsLoading } = useMenu();
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      
      if (!['csv', 'xls', 'xlsx'].includes(fileExtension || '')) {
        toast({
          variant: 'destructive',
          title: 'Invalid File Type',
          description: 'Please upload a .csv, .xls, or .xlsx file.',
        });
        setFile(null);
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No File Selected',
        description: 'Please select a file to upload.',
      });
      return;
    }

    setIsLoading(true);
    try {
      let parsedData: { headers: string[]; data: Record<string, string>[] };
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (fileExtension === 'csv') {
        const fileContent = await file.text();
        parsedData = parseCsv(fileContent);
      } else if (fileExtension === 'xls' || fileExtension === 'xlsx') {
        const fileBuffer = await file.arrayBuffer();
        parsedData = parseExcel(fileBuffer);
      } else {
        throw new Error('Unsupported file type.');
      }
      
      const { headers, data: rows } = parsedData;

      if (rows.length === 0) {
        throw new Error('File is empty or could not be parsed.');
      }
      
      const allergenHeaderMap: Record<string, string> = {
          '小麦': 'wheat', 'Wheat': 'wheat',
          'そば': 'buckwheat', 'Buckwheat': 'buckwheat',
          '卵': 'egg', 'Egg': 'egg',
          '乳': 'milk', '牛乳': 'milk', 'Milk': 'milk',
          '落花生': 'peanut', 'ピーナッツ': 'peanut', 'Peanut': 'peanut',
          'えび': 'shrimp', 'Shrimp': 'shrimp',
          'かに': 'crab', 'Crab': 'crab',
          'あわび': 'abalone', 'Abalone': 'abalone',
          'いか': 'squid', 'Squid': 'squid',
          'いくら': 'salmon_roe', 'Salmon Roe': 'salmon_roe',
          'オレンジ': 'orange', 'Orange': 'orange',
          'キウイフルーツ': 'kiwi', 'Kiwi': 'kiwi',
          '牛肉': 'beef', 'Beef': 'beef',
          'くるみ': 'walnut', 'Walnut': 'walnut',
          'さけ': 'salmon', '鮭': 'salmon', 'Salmon': 'salmon',
          'さば': 'mackerel', '鯖': 'mackerel', 'Mackerel': 'mackerel',
          '大豆': 'soybean', 'Soybean': 'soybean',
          '鶏肉': 'chicken', 'Chicken': 'chicken',
          'バナナ': 'banana', 'Banana': 'banana',
          '豚肉': 'pork', 'Pork': 'pork',
          // Generic fallbacks from the provided image
          '魚': 'salmon',
          '甲殼類': 'crab',
      };

      const newMenuItems: MenuItem[] = [];
      const itemNameHeader = headers[0]; // Assuming the first column is always for item names.

      for (let i = 0; i < rows.length; i++) {
        const potentialJapaneseRow = rows[i];
        const potentialEnglishRow = rows[i + 1];

        const name1 = potentialJapaneseRow[itemNameHeader];
        const name2 = potentialEnglishRow ? potentialEnglishRow[itemNameHeader] : '';

        // Heuristic to check if the next row is the English translation
        const isPair = name1 && name2 && !(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uffef]/.test(name2));

        let item: Partial<MenuItem>;
        let rowForAlergens = potentialJapaneseRow;

        if (isPair) {
            item = {
                japaneseName: name1,
                name: name2,
            };
            // In a pair, check for allergens in both rows
            const combinedAllergens = {...potentialJapaneseRow, ...potentialEnglishRow};
            rowForAlergens = combinedAllergens;
            i++; // Increment index since we consumed two rows
        } else {
            item = { name: name1 };
        }
        
        if (!item.name) continue; // Skip if no name found

        const allergens = new Set<string>();
        for (const header of headers) {
            const allergenKey = allergenHeaderMap[header.trim()];
            if (allergenKey) {
                if (String(rowForAlergens[header]).includes('✓')) {
                    allergens.add(allergenKey);
                }
            }
        }
        
        newMenuItems.push({
            ...item,
            id: `${file.name}-${i}`,
            allergens: Array.from(allergens),
        } as MenuItem);
      }

      setMenuItems(newMenuItems);
      toast({
        title: 'File Processed Successfully',
        description: `Loaded ${newMenuItems.length} menu items.`,
      });
      router.push('/editor');
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      toast({
        variant: 'destructive',
        title: 'Processing Failed',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle>Upload Menu File</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700">
              Menu (.csv, .xlsx, .xls)
            </label>
            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5">
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                  >
                    <span>Upload a file</span>
                    <Input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept=".csv,.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">CSV, XLSX, XLS up to 10MB</p>
              </div>
            </div>
             {file && <p className="text-sm text-muted-foreground">Selected file: {file.name}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Upload and Process'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
