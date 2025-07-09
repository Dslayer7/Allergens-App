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
    <path d="M14.5 13.04a3.5 3.5 0 0 1-5 0" />
    <path d="M17.5 12c-2.4 0-4-1.93-4-4.28" />
    <path d="M6.5 12c2.4 0 4-1.93 4-4.28" />
    <path d="M12 21.5a9.5 9.5 0 0 0 9.5-9.5c0-4.14-2.14-7.5-5.5-7.5-2.5 0-4.5 1.6-5.5 3.5-1-1.9-3-3.5-5.5-3.5-3.36 0-5.5 3.36-5.5 7.5A9.5 9.5 0 0 0 12 21.5Z" />
  </svg>
);

export default BeefIcon;
