'use client';

import type { MenuItem } from '@/lib/types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Download, Check } from 'lucide-react';
import { AllergenIcon } from './allergen-icon';
import React, { useRef, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { toPng } from 'html-to-image';
import { useSelection } from '@/context/selection-context';
import { useMenu } from '@/context/menu-provider';
import Image from 'next/image';
import { createRoot } from 'react-dom/client';

interface FoodTagCardProps {
  item: MenuItem;
}

export default function FoodTagCard({ item }: FoodTagCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { isSelected, toggleItem } = useSelection();
  const { showLogo } = useMenu();
  const selected = isSelected(item.id);
  
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleItem(item.id);
  };

  // Based on printing specs: 9cm width x 6.5cm height (front face)
  // Using 37.8px per cm for accurate screen representation
  const pxPerCm = 37.8;
  const cardWidth = 9 * pxPerCm; // 340.2px
  const cardHeight = 6.5 * pxPerCm; // 245.7px
  
  // The bottom margin for the logo is 1.8cm
  const logoAreaHeight = 1.8 * pxPerCm; // 68.04px

  const renderFullDownloadCard = () => {
    return (
      <div className="relative bg-white flex flex-col"
        style={{
          width: '9cm',
          height: '13cm',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
          boxSizing: 'border-box',
        }}
      >
        {/* Blank top half (6.5cm) */}
        <div style={{ 
          height: '6.5cm', 
          width: '100%',
          backgroundColor: '#ffffff',
          borderBottom: '1px dashed #e5e7eb',
        }} />
        
        {/* Content in bottom half (6.5cm) */}
        <div style={{
          height: '6.5cm',
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Main content area */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.3cm 0.5cm',
            textAlign: 'center',
            boxSizing: 'border-box',
          }}>
            <div style={{ marginBottom: '0.3cm' }}>
              <p className="font-sans font-bold leading-tight break-words" style={{ 
                fontSize: '0.5cm',
                lineHeight: '1.2',
                margin: '0 0 0.2cm',
              }}>
                {item.name}
              </p>
              {item.japaneseName && (
                <p className="text-gray-600" style={{ 
                  fontSize: '0.35cm',
                  margin: '0 0 0.3cm',
                  lineHeight: '1.3',
                }}>
                  {item.japaneseName}
                </p>
              )}
            </div>

            {item.allergens.length > 0 ? (
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '0.3cm',
                marginTop: '0.3cm',
                width: '100%',
                maxWidth: '7.5cm',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
                {item.allergens.map((allergenKey) => (
                  <div key={allergenKey} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: '0.8cm',
                    minHeight: '0.8cm',
                    justifyContent: 'center',
                  }}>
                    <AllergenIcon 
                      allergenKey={allergenKey} 
                      className="h-6 w-6"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500 italic">No allergens detected</div>
            )}
          </div>
          
          {/* Logo area at the bottom */}
          <div style={{ 
            height: '1.8cm',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderTop: '1px solid #e5e7eb',
            padding: '0.2cm 0',
            boxSizing: 'border-box',
          }}>
            {showLogo && (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Image 
                  src="/Swissotel_Logo.png" 
                  alt="Swissotel Logo" 
                  width={120}
                  height={40}
                  style={{
                    objectFit: 'contain',
                    maxHeight: '80%',
                    maxWidth: '80%',
                  }}
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const handleDownload = async () => {
    // Create a temporary container for the full-size card
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.top = '-1000px';
    tempContainer.style.left = '-1000px';
    document.body.appendChild(tempContainer);
    
    try {
      // Create a React element for the full card
      const fullCard = renderFullDownloadCard();
      
      // Create a root and render the card
      const root = createRoot(tempContainer);
      root.render(fullCard);
      
      // Wait for the DOM to update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Get the card element
      const cardElement = tempContainer.firstChild as HTMLElement;
      if (!cardElement) throw new Error('Could not generate download preview');
      
      // Set exact dimensions in mm (more precise for printing)
      const mmToPx = 3.7795275591; // 1mm = 3.7795275591px at 96 DPI
      const widthPx = 90 * mmToPx; // 90mm = 9cm
      const heightPx = 130 * mmToPx; // 130mm = 13cm
      
      // Set the element's size to match the target dimensions
      cardElement.style.width = `${widthPx}px`;
      cardElement.style.height = `${heightPx}px`;
      
      // Generate the image with exact physical dimensions
      const dataUrl = await toPng(cardElement, { 
        width: Math.round(widthPx),
        height: Math.round(heightPx),
        style: {
          margin: '0',
          padding: '0',
          width: `${widthPx}px`,
          height: `${heightPx}px`,
          display: 'block',
        },
        pixelRatio: 2, // For better print quality
        cacheBust: true,
      });
      
      // Create and trigger download
      const link = document.createElement('a');
      const safeFileName = item.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      link.download = `${safeFileName}-tag.png`;
      link.href = dataUrl;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      root.unmount();
      
      toast({
        title: 'Download Started',
        description: `Downloading ${safeFileName}-tag.png.`,
      });
    } catch (error) {
      console.error('Error generating download:', error);
      toast({
        variant: 'destructive',
        title: 'Download Failed',
        description: 'Could not generate the image. Check the console for details.',
      });
    } finally {
      // Ensure we always clean up the container
      if (document.body.contains(tempContainer)) {
        document.body.removeChild(tempContainer);
      }
    }
  };

  return (
    <div className="p-2">
      <div 
        className={`relative transition-all duration-200 ${selected ? 'ring-2 ring-primary ring-offset-2 rounded-md' : ''} hover:ring-2 hover:ring-primary/30 hover:ring-offset-2 hover:rounded-md`}
        style={{ width: `${cardWidth}px` }}
        data-card-id={item.id}
      >
        {/* Mark count indicator */}
        {item.markCount !== undefined && item.markCount !== item.allergens.length && (
          <div className="absolute -top-2 -right-2 z-10">
            <div className="bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {item.markCount > item.allergens.length 
                ? `+${item.markCount - item.allergens.length}`
                : `-${item.allergens.length - item.markCount}`}
            </div>
          </div>
        )}
        
        {/* Selection Checkbox */}
        <button
          type="button"
          onClick={handleCheckboxClick}
          className={`absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
            selected 
              ? 'bg-primary text-primary-foreground scale-110 shadow-md' 
              : 'bg-white border-2 border-gray-300 hover:bg-gray-100 hover:scale-110 hover:shadow-md'
          }`}
          style={item.markCount !== undefined && item.markCount !== item.allergens.length ? { top: '0.5rem', right: '0.5rem' } : {}}
          aria-label={selected ? 'Deselect item' : 'Select item'}
          title={selected ? 'Deselect for download' : 'Select for batch download'}
        >
          {selected ? (
            <Check className="h-4 w-4" />
          ) : (
            <span className="text-xs font-medium">{'\u00A0'}</span>
          )}
        </button>
        <Card
          ref={cardRef}
          className="flex flex-col overflow-hidden rounded-md border-2 border-gray-200 bg-white shadow-md transition-all hover:shadow-lg"
          style={{ 
            width: '100%',
            height: `${cardHeight}px`,
          }}
        >
          {/* Main content area */}
          <CardContent className="flex flex-grow flex-col items-center justify-center p-4 text-center">
            {/* Item name and japanese name */}
            <div className="flex-grow flex flex-col justify-center items-center px-2">
              <p 
                className="font-sans text-lg font-bold leading-tight break-words" 
                style={{ fontSize: '1.2rem' }}
                data-item-name={item.name}
              >
                {item.name}
              </p>
              {item.japaneseName && (
                <p className="text-sm text-gray-600 mt-1">
                  {item.japaneseName}
                </p>
              )}
            </div>

            {/* Allergens */}
            {item.allergens.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {item.allergens.map((allergenKey) => (
                  <div key={allergenKey} className="flex flex-col items-center">
                    <AllergenIcon 
                      allergenKey={allergenKey} 
                      className="h-8 w-8"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500 italic">No allergens detected</div>
            )}
          </CardContent>
          
          {/* Logo area - always rendered to maintain consistent spacing */}
          <CardFooter 
            className="flex items-center justify-center border-t border-gray-100"
            style={{ 
              minHeight: `${logoAreaHeight}px`,
              padding: '0.5rem 0',
              backgroundColor: '#ffffff'
            }}
          >
            {showLogo && (
              <div className="relative w-full h-full flex items-center justify-center">
                <Image 
                  src="/Swissotel_Logo.png" 
                  alt="Swissotel Logo" 
                  width={120}
                  height={40}
                  className="object-contain max-h-[80%]"
                  priority
                />
              </div>
            )}
          </CardFooter>
        </Card>
        
        {/* Mismatch warning */}
        {item.markCount !== undefined && item.markCount !== item.allergens.length && (
          <div className="mt-1 text-xs text-amber-600 dark:text-amber-400 text-center">
            {item.markCount > item.allergens.length 
              ? `${item.markCount - item.allergens.length} mark(s) not matched`
              : `${item.allergens.length - item.markCount} allergen(s) not marked`}
          </div>
        )}
      </div>
      <Button 
        onClick={handleDownload} 
        variant="outline" 
        size="sm" 
        className="w-full mt-2 text-xs py-1 h-8"
      >
        <Download className="mr-2 h-3.5 w-3.5" />
        Download
      </Button>
    </div>
  );
}
