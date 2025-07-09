import type { LucideProps } from "lucide-react";
import * as React from "react";

const PorkIcon = (props: LucideProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}>
    <path d="M12 2c-4 0-6 2-6 5v2.5C6 11.2 4.5 13 3 14h18c-1.5-1-3-2.8-3-4.5V7c0-3-2-5-6-5Z"/>
    <path d="M15.5 14a3.5 3.5 0 1 1-7 0"/>
    <path d="M10 9.5c.5-.5 1.5-1 2-1s1.5.5 2 1"/>
    <path d="M5.5 12.5a.5.5 0 0 1 0-1"/>
    <path d="M18.5 12.5a.5.5 0 0 1 0-1"/>
  </svg>
);

export default PorkIcon;
