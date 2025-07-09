'use client';

import FoodTagCard from "@/components/food-tag-card";
import { useMenu } from "@/context/menu-provider";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function PreviewClient() {
  const { menuItems, isDataLoaded } = useMenu();
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
    <Card>
        <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <CardTitle>Food Tag Preview</CardTitle>
                    <CardDescription>Here is a preview of the generated food tags for your menu items.</CardDescription>
                </div>
                <Button onClick={() => router.push('/editor')}>Back to Editor</Button>
            </div>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {menuItems.map((item) => (
                    <FoodTagCard key={item.id} item={item} />
                ))}
            </div>
        </CardContent>
    </Card>
  );
}
