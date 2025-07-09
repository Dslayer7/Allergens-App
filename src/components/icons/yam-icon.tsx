import type { LucideProps } from "lucide-react";
import * as React from "react";

const YamIcon = (props: LucideProps) => (
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
        <path d="M12.3 2.1a3.4 3.4 0 0 0-4.1 3l-1.3 4a3.4 3.4 0 0 0 .8 3.5l4.3 4.3a3.4 3.4 0 0 0 4.8 0l4.3-4.3a3.4 3.4 0 0 0 .8-3.5l-1.3-4a3.4 3.4 0 0 0-4.1-3c-1 0-1.8.5-2.2 1.3-.4-.8-1.3-1.3-2.2-1.3z"/>
        <path d="m15.8 15.8-3.5 3.5a2.4 2.4 0 0 1-3.4 0l-3.5-3.5"/>
        <path d="M12.3 2.1c.5 0 1 .2 1.4.6"/>
        <path d="m2.8 12.3-.6.6"/>
        <path d="m21.8 12.3-.6-.6"/>
    </svg>
);

export default YamIcon;
