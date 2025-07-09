import type { LucideProps } from "lucide-react";
import * as React from "react";

const BeefIcon = (props: LucideProps) => (
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
        <path d="M15.35 6.2c.4-1.3.1-2.8-.8-3.8-1.3-1.4-3.5-1.4-5.1-.1-.3.3-.6.6-.8.9"/>
        <path d="M12 12c-2 0-2.5-1-2.5-2.5C9.5 7 10.5 6 12 6s2.5 1 2.5 3.5c0 1.5-.5 2.5-2.5 2.5z"/>
        <path d="M18.5 4.5c1.4 1.4 2 3.5 1.5 5.5-1.2 5.5-5.5 8-10.5 8s-9-4-7-8l2-4.5"/>
        <path d="M6.5 12.5c0-1.5.5-2.5 2-2.5"/>
        <path d="M15.5 10c1.5 0 2 .5 2 2"/>
    </svg>
);

export default BeefIcon;
