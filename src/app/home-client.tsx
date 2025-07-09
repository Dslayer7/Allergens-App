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
          // From user's first list
          'えび': 'shrimp',
          'かに': 'crab',
          'くるみ': 'walnut',
          '小麦': 'wheat',
          'そば': 'buckwheat',
          '卵': 'egg',
          '乳': 'milk',
          '牛乳': 'milk', // Alias from new image
          '落花生': 'peanut',
          'ピーナッツ': 'peanut', // Alias from new image
          'アーモンド': 'almond',
          'あわび': 'abalone',
          'いか': 'squid',
          'いくら': 'salmon_roe',
          'オレンジ': 'orange',
          'カシューナッツ': 'cashew',
          'キウイフルーツ': 'kiwi',
          '牛肉': 'beef',
          'ごま': 'sesame',
          'さけ': 'salmon',
          'さば': 'mackerel',
          '大豆': 'soybean',
          '鶏肉': 'chicken',
          'バナナ': 'banana',
          '豚肉': 'pork',
          'まつたけ': 'matsutake',
          'もも': 'peach',
          'やまいも': 'yam',
          'りんご': 'apple',
          'ゼラチン': 'gelatin',
          // From user's new image
          '魚': 'fish',
          '甲殻類': 'shrimp', // Map category to representative
          '軟体動物': 'squid', // Map category to representative
          'セロリ': 'celery',
          '亜硫酸塩': 'sulfites',
          'ルピナス': 'lupin',
          'マスタード': 'mustard',
          'ナッツ類': 'nuts',
      };

      const newMenuItems: MenuItem[] = [];
      const itemNameHeader = headers[0]; 

      // This regex identifies most Japanese characters (Hiragana, Katakana, Kanji) and common punctuation.
      const japaneseRegex = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uffef\u4e00-\u9faf\u3400-\u4dbf「」【】、。]+/g;

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const fullName = row[itemNameHeader]?.trim();
        
        if (!fullName) continue;

        const jaParts = fullName.match(japaneseRegex);
        const japaneseName = jaParts ? jaParts.join('').trim() : '';
        // Remove Japanese parts and any stray colons to get the English name
        const englishName = fullName.replace(japaneseRegex, '').replace(/[:]/g, '').trim();

        let finalEnglishName = englishName;
        let finalJapaneseName = japaneseName;

        if (!englishName && japaneseName) {
            finalEnglishName = japaneseName;
            finalJapaneseName = '';
        } else if (!japaneseName && englishName) {
            finalJapaneseName = '';
        }

        const allergens = new Set<string>();
        for (const header of headers) {
            const allergenKey = allergenHeaderMap[header.trim()];
            if (allergenKey) {
                if (String(row[header]).includes('✓') || String(row[header]).includes('✔')) {
                    allergens.add(allergenKey);
                }
            }
        }
        
        newMenuItems.push({
            id: `${file.name}-${i}`,
            name: finalEnglishName,
            japaneseName: finalJapaneseName,
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
