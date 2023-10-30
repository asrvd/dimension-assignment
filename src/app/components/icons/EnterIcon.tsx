import type { SVGProps } from "react";

export function EnterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      {...props}
    >
      <path
        fill="currentColor"
        d="M35.5 7.25a1.25 1.25 0 1 1 2.5 0v18.5A7.25 7.25 0 0 1 30.75 33H12.582l7.04 6.854a1.25 1.25 0 0 1-1.744 1.792l-9.5-9.25a1.25 1.25 0 0 1 0-1.792l9.5-9.25a1.25 1.25 0 0 1 1.744 1.792L12.069 30.5H30.75a4.75 4.75 0 0 0 4.75-4.75V7.25Z"
      ></path>
    </svg>
  );
}
