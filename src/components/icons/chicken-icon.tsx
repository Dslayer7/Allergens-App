import type { LucideProps } from "lucide-react";
import * as React from "react";

const ChickenIcon = (props: LucideProps) => (
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
        <path d="M16.06,7.24a4.34,4.34,0,0,1,1.44-4.8,1.45,1.45,0,0,1,2.2,1.18c0,2.15-2.4,3.2-3.64,3.62Z"/>
        <path d="M13.73,6.33a2.76,2.76,0,0,1,0-4.32,1.45,1.45,0,0,1,2.2,1.18c0,2.15-2.4,3.2-3.64,3.62"/>
        <path d="M14.9,9.44c3.2-1,7.1,2.8,7.1,7.12,0,3.3-2.5,6.44-8,6.44s-8-3.14-8-6.44C6,12.24,9.9,8.44,14.9,9.44Z"/>
        <path d="M12.91,20.09a3.1,3.1,0,0,1,0-4.38"/>
        <path d="M5.3,13.88a2,2,0,0,1,2.37-2.37"/>
    </svg>
);

export default ChickenIcon;
