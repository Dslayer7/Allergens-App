'use client';

import { Button } from './ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useSelection } from '@/context/selection-context';
import { useCallback, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function FloatingDownloadButton() {
  const { selectedItems, clearSelection } = useSelection();
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = useCallback(async () => {
    if (selectedItems.length === 0) return;
    
    setIsDownloading(true);
    
    try {
      const zip = new JSZip();
      let downloadedCount = 0;
      
      // Process each selected item
      for (const itemId of selectedItems) {
        try {
          // Find the card element by data-id attribute
          const cardElement = document.querySelector(`[data-card-id="${itemId}"]`);
          if (!cardElement) continue;
          
          // Use html2canvas to render the card with high DPI for better quality
          const dpi = window.devicePixelRatio || 1;
          const canvas = await html2canvas(cardElement as HTMLElement, {
            // Use type assertion to bypass TypeScript errors for now
            // We'll need to update the type definitions if these are needed
            ...({
              backgroundColor: '#ffffff',
              scale: dpi * 2, // Double the DPI for better quality
              useCORS: true,
              allowTaint: true,
              logging: false,
              removeContainer: true,
            } as any)
          });
          
          // Convert canvas to blob
          const blob = await new Promise<Blob | null>((resolve) => {
            canvas.toBlob((blob: Blob | null) => resolve(blob), 'image/png', 1);
          });
          
          if (!blob) continue;
          
          // Extract the item name for the filename
          const itemName = (cardElement.querySelector('[data-item-name]')?.textContent || 'tag')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
          
          // Add the image to the zip
          zip.file(`${itemName}-${itemId.slice(0, 6)}.png`, blob);
          
          downloadedCount++;
        } catch (error) {
          console.error(`Failed to process item ${itemId}:`, error);
        }
      }
      
      if (downloadedCount > 0) {
        // Generate the zip file
        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, `food-tags-${new Date().toISOString().slice(0, 10)}.zip`);
        
        toast({
          title: 'Download Complete',
          description: `Successfully downloaded ${downloadedCount} tag(s).`,
        });
      } else {
        throw new Error('No tags were processed successfully');
      }
      
      clearSelection();
    } catch (error) {
      console.error('Batch download failed:', error);
      toast({
        variant: 'destructive',
        title: 'Download Failed',
        description: 'Failed to download one or more tags. Please try again.',
      });
    } finally {
      setIsDownloading(false);
    }
  }, [selectedItems, clearSelection, toast]);
  


  if (selectedItems.length === 0) return null;
  
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in-50 slide-in-from-bottom-2">
      <Button 
        onClick={handleDownload} 
        disabled={isDownloading}
        className="shadow-lg rounded-full px-6 py-6 text-base font-medium"
        size="lg"
      >
        {isDownloading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Download className="mr-2 h-5 w-5" />
            Download {selectedItems.length} {selectedItems.length === 1 ? 'Tag' : 'Tags'}
          </>
        )}
      </Button>
    </div>
  );
}
