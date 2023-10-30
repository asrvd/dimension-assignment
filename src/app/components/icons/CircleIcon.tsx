import type { SVGProps } from "react";

export function CircleIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M128 232a104 104 0 1 1 104-104a104.2 104.2 0 0 1-104 104Zm0-192a88 88 0 1 0 88 88a88.1 88.1 0 0 0-88-88Z"
      ></path>
    </svg>
  );
}
