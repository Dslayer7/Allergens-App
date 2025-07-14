'use client';

import FoodTagCard from "@/components/food-tag-card";
import { useMenu } from "@/context/menu-provider";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Download } from "lucide-react";
import { SelectionProvider, useSelection } from "@/context/selection-context";
import FloatingDownloadButton from "@/components/floating-download-button";

function PreviewContent() {
  const { menuItems, isDataLoaded } = useMenu();
  const { selectedItems, clearSelection } = useSelection();
  const router = useRouter();

  React.useEffect(() => {
    if (!isDataLoaded) {
      router.push('/');
    }
  }, [isDataLoaded, router]);

  if (!isDataLoaded) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <>
      <Card className="mb-20">
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Food Tag Preview</CardTitle>
                <CardDescription>
                  {selectedItems.length > 0 
                    ? `${selectedItems.length} tag${selectedItems.length !== 1 ? 's' : ''} selected`
                    : 'Click on the checkmark to select tags for batch download'}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {selectedItems.length > 0 && (
                  <Button 
                    variant="outline" 
                    onClick={clearSelection}
                    className="whitespace-nowrap"
                  >
                    Clear Selection
                  </Button>
                )}
                <Button onClick={() => router.push('/editor')}>Back to Editor</Button>
              </div>
            </div>
            
            {selectedItems.length > 0 && (
              <div className="bg-primary/10 p-3 rounded-md flex items-center gap-2 text-sm text-primary">
                <Download className="h-4 w-4" />
                <span>Selected {selectedItems.length} tag{selectedItems.length !== 1 ? 's' : ''} for download</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
            <div className="w-full overflow-x-auto">
                <div className="flex flex-wrap justify-center gap-4">
                    {menuItems.map((item) => (
                        <div key={item.id} className="flex-shrink-0">
                            <FoodTagCard item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </CardContent>
      </Card>
      <FloatingDownloadButton />
    </>
  );
}

export default function PreviewClient() {
  return (
    <SelectionProvider>
      <div className="container mx-auto p-4 md:p-8">
        <PreviewContent />
      </div>
    </SelectionProvider>
  );
}
