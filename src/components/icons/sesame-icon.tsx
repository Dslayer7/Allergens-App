import type { LucideProps } from "lucide-react";
import * as React from "react";

const SesameIcon = (props: LucideProps) => (
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
    <circle cx="12" cy="12" r="1"/>
    <circle cx="16" cy="8" r="1"/>
    <circle cx="8" cy="16" r="1"/>
    <circle cx="9" cy="9" r="1"/>
    <circle cx="15" cy="15" r="1"/>
    <circle cx="18" cy="12" r="1"/>
    <circle cx="6" cy="12" r="1"/>
  </svg>
);

export default SesameIcon;
