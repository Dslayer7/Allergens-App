import type { LucideProps } from "lucide-react";
import * as React from "react";

const BuckwheatIcon = (props: LucideProps) => (
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
    <path d="M12 2 4.5 10.5l7.5 11.5 7.5-11.5L12 2Z" />
    <path d="m12.5 2-1.6 8.5 2.6 3" />
  </svg>
);

export default BuckwheatIcon;
