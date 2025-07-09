import type { LucideProps } from "lucide-react";
import * as React from "react";

const KiwiIcon = (props: LucideProps) => (
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
        {...props}
    >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M12 16a4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4 4 4 0 0 1-4 4z"/>
        <path d="M12 8V6"/>
        <path d="M16.24 9.76l1.42-1.42"/>
        <path d="M18 14h2"/>
        <path d="M16.24 18.24l1.42 1.42"/>
        <path d="M12 20v2"/>
        <path d="M7.76 18.24l-1.42 1.42"/>
        <path d="M6 14H4"/>
        <path d="M7.76 9.76l-1.42-1.42"/>
    </svg>
);

export default KiwiIcon;
