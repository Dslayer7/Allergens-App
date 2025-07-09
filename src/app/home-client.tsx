'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMenu } from '@/context/menu-provider';
import { useToast } from '@/hooks/use-toast';
import { parseCsv } from '@/lib/csv-parser';
import { mapColumns } from '@/lib/actions';
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
      if (selectedFile.type !== 'text/csv') {
        toast({
          variant: 'destructive',
          title: 'Invalid File Type',
          description: 'Please upload a .csv file.',
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
      const fileContent = await file.text();
      const { headers, data } = parseCsv(fileContent);

      if (data.length === 0) {
        throw new Error('CSV file is empty or could not be parsed.');
      }
      
      const exampleRows = data.slice(0, 5);
      const result = await mapColumns(headers, exampleRows);
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'AI column mapping failed.');
      }
      
      const columnMap = result.data;
      const fieldMap: Record<string, string> = {};
      Object.keys(columnMap).forEach(header => {
        const field = columnMap[header];
        if (field === 'Item Name') fieldMap[header] = 'name';
        if (field === 'Japanese Name') fieldMap[header] = 'japaneseName';
        if (field === 'Description') fieldMap[header] = 'description';
        if (field === 'Price') fieldMap[header] = 'price';
      });

      const newMenuItems: MenuItem[] = data.map((row, index) => {
        const newItem: Partial<MenuItem> = {
          id: `${file.name}-${index}`,
          allergens: [],
        };
        Object.keys(fieldMap).forEach(header => {
          const field = fieldMap[header];
          (newItem as any)[field] = row[header];
        });
        if (!newItem.name) {
          // If no name, try to find the first non-empty column as a fallback
          const firstValue = Object.values(row).find(val => val.trim() !== '');
          newItem.name = firstValue || `Unnamed Item ${index + 1}`;
        }
        return newItem as MenuItem;
      });

      setMenuItems(newMenuItems);
      toast({
        title: 'File Processed Successfully',
        description: 'Your menu has been loaded into the editor.',
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
              Menu (.csv)
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
                      accept=".csv"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">CSV up to 10MB</p>
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
