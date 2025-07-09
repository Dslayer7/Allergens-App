import type { LucideProps } from "lucide-react";
import * as React from "react";

const MatsutakeIcon = (props: LucideProps) => (
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
        <path d="M20 15a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4v2h12v-2z" />
        <path d="M12 19v3" />
    </svg>
);

export default MatsutakeIcon;
