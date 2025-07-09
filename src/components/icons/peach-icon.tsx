import type { LucideProps } from "lucide-react";
import * as React from "react";

const PeachIcon = (props: LucideProps) => (
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
        <path d="M12.8 21.6c-2.4.4-4.8-.4-6.4-2.4-2.5-3-3.2-7.1-1.7-10.4 1.2-2.6 3.5-4.4 6.2-4.9.6-.1 1.2 0 1.7.3-1.6.8-2.9 2.5-3.2 4.5-1.1 5.4 3.1 10.3 8.3 10.5.2 0 .3 0 .5 0a7 7 0 0 0 2-14.8c-1.3-.4-2.7-.2-4 .4-2.1.9-3.4 2.8-3.7 5-.2 1.1.2 2.3 1.2 2.9.9.6 2.1.6 3.1.2"/>
        <path d="M16 4.3c-1 0-1.8.4-2.4 1-.5.7-1 1.4-1.6 2.1"/>
    </svg>
);

export default PeachIcon;
