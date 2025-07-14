'use client';

import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useMenu } from "@/context/menu-provider";

export function LogoSelector() {
  const { showLogo, toggleLogo } = useMenu();
  
  return (
    <div className="flex items-center space-x-2">
      <Switch 
        id="logo-toggle" 
        checked={showLogo} 
        onCheckedChange={toggleLogo} 
      />
      <Label htmlFor="logo-toggle" className="cursor-pointer">
        {showLogo ? "Using Swissotel Logo" : "No Logo"}
      </Label>
    </div>
  );
}
