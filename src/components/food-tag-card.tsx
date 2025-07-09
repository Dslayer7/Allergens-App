'use client';

import type { MenuItem } from '@/lib/types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import { AllergenIcon } from './allergen-icon';
import React, { useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { toPng } from 'html-to-image';

interface FoodTagCardProps {
  item: MenuItem;
}

export default function FoodTagCard({ item }: FoodTagCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Based on printing specs: 9cm width x 6.5cm height.
  // We maintain this aspect ratio for preview. Using a multiplier for pixel dimensions.
  const multiplier = 30;
  const cardWidth = 9 * multiplier; // 270px
  const cardHeight = 6.5 * multiplier; // 195px
  
  // The bottom margin for the logo is 1.8cm. (1.8 / 6.5) of total height.
  const logoAreaHeight = (1.8 / 6.5) * cardHeight;

  const handleDownload = async () => {
    if (!cardRef.current) {
      console.error("handleDownload Error: cardRef is null. Cannot generate image.");
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not find the card element to download.',
      });
      return;
    }

    console.log("handleDownload: Starting PNG generation for item:", item.name);
    console.log("handleDownload: Target DOM element:", cardRef.current);
    
    try {
      console.log("handleDownload: Calling html-to-image 'toPng' function...");
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
      console.log("handleDownload: PNG generation successful. Data URL created.");
      
      const link = document.createElement('a');
      const safeFileName = item.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      link.download = `${safeFileName}-tag.png`;
      link.href = dataUrl;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log(`handleDownload: Download triggered for ${safeFileName}-tag.png.`);
      toast({
        title: 'Download Started',
        description: `Downloading ${safeFileName}-tag.png.`,
      });
    } catch (err) {
      console.error('handleDownload Error: An error occurred inside the html-to-image library.', err);
      toast({
        variant: 'destructive',
        title: 'Download Failed',
        description: 'Could not generate the image. Check the console for details.',
      });
    }
  };

  return (
    <div className="space-y-2">
      <Card
        ref={cardRef}
        className="flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-lg"
        style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}
      >
        {/* This container holds the item name and allergens */}
        <CardContent className="flex flex-grow flex-col items-center justify-center p-3 text-center">
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
        
        {/* This footer reserves space for the logo */}
        <CardFooter 
          className="flex items-center justify-center p-1"
          style={{ minHeight: `${logoAreaHeight}px` }}
        >
          {/* This space is reserved for a logo */}
        </CardFooter>
      </Card>
      <Button onClick={handleDownload} variant="outline" size="sm" className="w-full">
        <Download className="mr-2 h-4 w-4" />
        Download PNG
      </Button>
    </div>
  );
}
