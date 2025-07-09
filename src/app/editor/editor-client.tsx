'use client';

import { useMenu } from '@/context/menu-provider';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AllergenSelector } from '@/components/allergen-selector';
import { AllergenIcon } from '@/components/allergen-icon';
import { findMenuItemAllergens } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';
import React from 'react';

export default function EditorClient() {
  const { menuItems, updateMenuItem, isDataLoaded, isLoading, setIsLoading } = useMenu();
  const router = useRouter();
  const { toast } = useToast();

  React.useEffect(() => {
    if (!isDataLoaded) {
      router.push('/');
    }
  }, [isDataLoaded, router]);

  const handleInputChange = (id: string, field: string, value: string) => {
    updateMenuItem(id, { [field]: value });
  };

  const handleAllergenChange = (id: string, allergenKey: string, checked: boolean) => {
    const item = menuItems.find(i => i.id === id);
    if (!item) return;
    const newAllergens = checked
      ? [...item.allergens, allergenKey]
      : item.allergens.filter(a => a !== allergenKey);
    updateMenuItem(id, { allergens: newAllergens });
  };
  
  const handleDetectAll = async () => {
    setIsLoading(true);
    toast({
        title: 'Starting Allergen Detection',
        description: `Analyzing ${menuItems.length} menu items... This may take a moment.`,
    });

    let successCount = 0;
    const promises = menuItems.map(async (item) => {
        const result = await findMenuItemAllergens({
            menuItemName: item.name,
            ingredients: item.description || '', // Use description as ingredients for now
            description: item.description || ''
        });
        if (result.success && result.data) {
            updateMenuItem(item.id, { allergens: result.data.allergens });
            successCount++;
        }
    });

    await Promise.all(promises);

    setIsLoading(false);
    toast({
        title: 'Detection Complete',
        description: `Successfully analyzed ${successCount} out of ${menuItems.length} items.`,
    });
  };

  if (!isDataLoaded) {
    return (
        <div className="flex h-full w-full items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <CardTitle>Menu Editor</CardTitle>
                <CardDescription>Review, edit, and verify your menu items and their allergens.</CardDescription>
            </div>
            <div className="flex gap-2">
                <Button onClick={handleDetectAll} disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    Detect All Allergens
                </Button>
                <Button onClick={() => router.push('/preview')}>
                    Preview Tags
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[20%]">Item Name</TableHead>
                <TableHead className="w-[20%]">Japanese Name</TableHead>
                <TableHead className="w-[35%]">Description</TableHead>
                <TableHead className="w-[10%]">Price</TableHead>
                <TableHead className="w-[15%]">Allergens</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menuItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Input value={item.name || ''} onChange={(e) => handleInputChange(item.id, 'name', e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Input value={item.japaneseName || ''} onChange={(e) => handleInputChange(item.id, 'japaneseName', e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Input value={item.description || ''} onChange={(e) => handleInputChange(item.id, 'description', e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Input type="text" value={item.price || ''} onChange={(e) => handleInputChange(item.id, 'price', e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <AllergenSelector selectedAllergens={item.allergens} onAllergenChange={(key, checked) => handleAllergenChange(item.id, key, checked)}>
                      <Badge variant="outline" className="cursor-pointer whitespace-nowrap p-2 hover:bg-accent">
                        {item.allergens.length > 0 ? (
                            <div className="flex items-center gap-1.5">
                                {item.allergens.map(key => <AllergenIcon key={key} allergenKey={key} className="h-4 w-4" />)}
                            </div>
                        ) : 'Select...'}
                      </Badge>
                    </AllergenSelector>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
