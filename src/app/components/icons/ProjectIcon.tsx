import type { SVGProps } from "react";


export function ProjectIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M112 40H48a8 8 0 0 0-8 8v64a8 8 0 0 0 8 8h64a8 8 0 0 0 8-8V48a8 8 0 0 0-8-8Zm-8 64H56V56h48Zm104-64h-64a8 8 0 0 0-8 8v64a8 8 0 0 0 8 8h64a8 8 0 0 0 8-8V48a8 8 0 0 0-8-8Zm-8 64h-48V56h48Zm-88 32H48a8 8 0 0 0-8 8v64a8 8 0 0 0 8 8h64a8 8 0 0 0 8-8v-64a8 8 0 0 0-8-8Zm-8 64H56v-48h48Zm104-64h-64a8 8 0 0 0-8 8v64a8 8 0 0 0 8 8h64a8 8 0 0 0 8-8v-64a8 8 0 0 0-8-8Zm-8 64h-48v-48h48Z"
      ></path>
    </svg>
  );
}