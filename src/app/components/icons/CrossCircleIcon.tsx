import type { SVGProps} from "react";


export function CrossCircleIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M128 24a104 104 0 1 0 104 104A104.1 104.1 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Zm37.7-61.7a8.1 8.1 0 0 1 0 11.4a8.2 8.2 0 0 1-11.4 0L128 139.3l-26.3 26.4a8.2 8.2 0 0 1-11.4 0a8.1 8.1 0 0 1 0-11.4l26.4-26.3l-26.4-26.3a8.1 8.1 0 0 1 11.4-11.4l26.3 26.4l26.3-26.4a8.1 8.1 0 0 1 11.4 11.4L139.3 128Z"
      ></path>
    </svg>
  );
}