import type { LucideProps } from "lucide-react";
import * as React from "react";

const ShrimpIcon = (props: LucideProps) => (
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
    <path d="M15.98 1.01a2.02 2.02 0 0 0-1.98 2.3V6H12c-2.6 0-5 1.4-5 3.5c0 1.4 1 2.5 2 2.5h2M12 6h-2M12 12H9.5C7 12 5 14 5 16.5C5 19 7 21 9.5 21H18c2 0 3-1 3-3c0-1.5-1.5-4.5-3-6c-1-1-2-2-2-3Z"/>
    <path d="M17 12s-1.5 1.5-1.5 3s1.5 3 1.5 3"/>
    <path d="M22 6c-1 0-2 1-2 2"/>
  </svg>
);

export default ShrimpIcon;
