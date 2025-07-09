import type { LucideProps } from "lucide-react";
import * as React from "react";

const SalmonIcon = (props: LucideProps) => (
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
    <path d="M16.5 6.5C14.5 4.5 12 4 10 4c-3.5 0-6 2.5-6 6s2.5 6 6 6c2 0 4.5-.5 6.5-2.5"/>
    <path d="M15.5 12.5c1.5-1 2.5-2.5 2.5-4.5 0-3-2-4-4-4"/>
    <path d="M8 10h6"/>
    <path d="M8 12h5"/>
    <path d="M8 14h4"/>
  </svg>
);

export default SalmonIcon;
