'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMenu } from '@/context/menu-provider';
import { useToast } from '@/hooks/use-toast';
import { parseCsv } from '@/lib/csv-parser';
import { parseExcel } from '@/lib/excel-parser';
import { extractFoodItems } from '@/lib/allergen-mapper';
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
    let parsedData: { headers: string[]; data: Record<string, string>[] };

    try {
      // Parse the file based on extension
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      if (fileExtension === 'csv') {
        const fileContent = await file.text();
        parsedData = parseCsv(fileContent);
      } else if (fileExtension === 'xls' || fileExtension === 'xlsx') {
        const fileBuffer = await file.arrayBuffer();
        parsedData = parseExcel(fileBuffer);
      } else {
        throw new Error('Unsupported file type');
      }

      const { headers, data } = parsedData;
      if (headers.length === 0 || data.length === 0) {
        throw new Error('The file appears to be empty or could not be parsed');
      }

      // Convert data to array of arrays for processing
      const dataRows = [
        headers,
        ...data.map(row => headers.map(header => row[header] || ''))
      ];

      // Process the data using our new function
      const menuItems = extractFoodItems(dataRows);
      
      if (menuItems.length === 0) {
        throw new Error('No valid menu items with allergen marks found in the file');
      }

      // Update the menu items in the context
      setMenuItems(menuItems);

      // Log some debug info
      const uniqueAllergens = [...new Set(menuItems.flatMap(item => item.allergens))];
      const itemsWithAllergens = menuItems.filter(item => item.allergens.length > 0).length;
      const totalMarks = menuItems.reduce((sum, item) => sum + item.markCount, 0);
      
      console.log('Processed menu items:', menuItems);
      console.log('Total items:', menuItems.length);
      console.log('Items with allergens:', itemsWithAllergens);
      console.log('Total marks found:', totalMarks);
      console.log('All detected allergens:', uniqueAllergens);

      // Show success message
      toast({
        title: 'File Processed Successfully',
        description: `Loaded ${menuItems.length} menu items.`,
      });

      // Navigate to the editor
      router.push('/editor');

    } catch (error) {
      console.error('Error processing file:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred while processing the file';
      toast({
        variant: 'destructive',
        title: 'Error Processing File',
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
