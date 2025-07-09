import type { LucideProps } from "lucide-react";
import * as React from "react";

const MustardIcon = (props: LucideProps) => (
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
    <path d="M6 14h12v6H6z"/>
    <path d="M8 14V8c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v6"/>
    <path d="M8 4h8"/>
  </svg>
);

export default MustardIcon;
