import type { LucideProps } from "lucide-react";
import * as React from "react";

const CeleryIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22c0-4-1.5-8-4-10"/>
    <path d="M11 12c-2.5 2-4 6-4 10"/>
    <path d="M11 12c0-3.5 2-7.5 2-10"/>
    <path d="M7 2c1.5 2.5 2.5 5.5 2.5 7.5"/>
    <path d="M17 2c-1.5 2.5-2.5 5.5-2.5 7.5"/>
  </svg>
);

export default CeleryIcon;
