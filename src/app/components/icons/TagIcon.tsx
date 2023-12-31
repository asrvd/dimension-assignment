import type { SVGProps } from "react";

export function TagIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M240 126.9L135.6 22.4a16.2 16.2 0 0 0-14.5-4.4L40.4 34.2a7.9 7.9 0 0 0-6.2 6.2L18 121.1a15.9 15.9 0 0 0 4.4 14.4L126.9 240a15.9 15.9 0 0 0 22.6 0l90.5-90.5a15.9 15.9 0 0 0 0-22.6ZM138.2 228.7L33.7 124.2l15.1-75.4l75.4-15.1l104.5 104.5ZM96 84a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z"
      ></path>
    </svg>
  );
}
