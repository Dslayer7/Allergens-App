'use client';

import type { MenuItem } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import { AllergenIcon } from './allergen-icon';
import React, { useRef } from 'react';
import { useToast } from '@/hooks/use-toast';

interface FoodTagCardProps {
  item: MenuItem;
}

export default function FoodTagCard({ item }: FoodTagCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // The physical dimensions are 13mm x 9mm. At 300 DPI, this is approx 154x106 pixels.
  // We'll use this for aspect ratio and styling.
  const aspectW = 154;
  const aspectH = 106;

  const handleDownload = async () => {
    // Note: A library like html-to-image or dom-to-image would simplify this process significantly.
    // The following is a placeholder for a more robust canvas-based solution.
    toast({
        title: "Download PNG",
        description: "This feature requires a canvas rendering library to be implemented.",
    });
    
    if (!cardRef.current) return;
    // Implementation with a library would look like:
    // import { toPng } from 'html-to-image';
    // toPng(cardRef.current)
    //   .then(function (dataUrl) {
    //     const link = document.createElement('a');
    //     link.download = `${item.name}-tag.png`;
    //     link.href = dataUrl;
    //     link.click();
    //   });
  };

  return (
    <div className="space-y-2">
      <Card
        ref={cardRef}
        className="overflow-hidden transition-shadow hover:shadow-lg"
        style={{ width: `${aspectW * 1.5}px`, height: `${aspectH * 1.5}px` }}
      >
        <CardHeader className="p-2 text-center bg-muted/30">
            {/* The prompt mentioned a print area of 6.5mm length. We can represent this with padding. */}
        </CardHeader>
        <CardContent className="flex h-full flex-col justify-center items-center px-2 pt-2 pb-6 text-center">
            <div className="flex-grow flex flex-col justify-center items-center">
                <p className="font-headline text-base font-semibold leading-tight break-words">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.japaneseName}</p>
            </div>
            {item.allergens.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                {item.allergens.map((allergenKey) => (
                    <AllergenIcon key={allergenKey} allergenKey={allergenKey} className="h-5 w-5" />
                ))}
                </div>
            )}
        </CardContent>
      </Card>
      <Button onClick={handleDownload} variant="outline" size="sm" className="w-full">
        <Download className="mr-2 h-4 w-4" />
        Download PNG
      </Button>
    </div>
  );
}
