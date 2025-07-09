import type { LucideProps } from "lucide-react";
import * as React from "react";

const AbaloneIcon = (props: LucideProps) => (
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
        <path d="M16.5 20c-3.9 0-6-2.5-6-6s2.1-6 6-6c2.6 0 4.5.9 4.5 3s-1.9 3-4.5 3" />
        <path d="M19.5 11c-2.4 0-3.5 1.5-3.5 3s1.1 3 3.5 3c1.6 0 2.5-.5 2.5-1.5s-0.9-1.5-2.5-1.5" />
        <path d="M6.5 14a5.2 5.2 0 0 1-2.8-1.5A5.8 5.8 0 0 1 2 8c0-3 2.5-6 6-6s6 3 6 6" />
    </svg>
);

export default AbaloneIcon;
