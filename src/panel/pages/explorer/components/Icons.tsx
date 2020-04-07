import React, { FC } from "react";

export const ArrowIcon: FC<JSX.IntrinsicElements["svg"]> = (props) => (
  <svg height="10" width="10" viewBox="0 0 4 8" {...props}>
    <path
      d="M4 3.982a.485.485 0 01-.127.355C3.731 4.5.61 7.729.465 7.892c-.145.163-.443.163-.443-.147L0 .255c0-.31.298-.31.442-.147C.587.271 3.71 3.5 3.852 3.663c.085.1.148.173.148.319z"
      fill="currentColor"
    />
  </svg>
);

export const SeeMoreIcon: FC<JSX.IntrinsicElements["svg"]> = (props) => (
  <svg width="13" height="9" viewBox="0 0 13 9" fill="none" {...props}>
    <rect width="13" height="9" rx="2" fill="#11171A" />
    <rect
      x="0.25"
      y="0.25"
      width="12.5"
      height="8.5"
      rx="1.75"
      stroke="#607E90"
      strokeOpacity="0.5"
      strokeWidth="0.5"
    />
    <path
      d="M3.58091 6.13201C3.34625 6.13201 3.17391 6.07335 3.06391 5.95601C2.96125 5.83868 2.90991 5.68468 2.90991 5.49401V5.35101C2.90991 5.16035 2.96125 5.00635 3.06391 4.88901C3.17391 4.77168 3.34625 4.71301 3.58091 4.71301C3.81558 4.71301 3.98425 4.77168 4.08691 4.88901C4.19691 5.00635 4.25191 5.16035 4.25191 5.35101V5.49401C4.25191 5.68468 4.19691 5.83868 4.08691 5.95601C3.98425 6.07335 3.81558 6.13201 3.58091 6.13201ZM6.49591 6.13201C6.26125 6.13201 6.08891 6.07335 5.97891 5.95601C5.87625 5.83868 5.82491 5.68468 5.82491 5.49401V5.35101C5.82491 5.16035 5.87625 5.00635 5.97891 4.88901C6.08891 4.77168 6.26125 4.71301 6.49591 4.71301C6.73058 4.71301 6.89925 4.77168 7.00191 4.88901C7.11191 5.00635 7.16691 5.16035 7.16691 5.35101V5.49401C7.16691 5.68468 7.11191 5.83868 7.00191 5.95601C6.89925 6.07335 6.73058 6.13201 6.49591 6.13201ZM9.42191 6.13201C9.18725 6.13201 9.01491 6.07335 8.90491 5.95601C8.80225 5.83868 8.75091 5.68468 8.75091 5.49401V5.35101C8.75091 5.16035 8.80225 5.00635 8.90491 4.88901C9.01491 4.77168 9.18725 4.71301 9.42191 4.71301C9.65658 4.71301 9.82525 4.77168 9.92791 4.88901C10.0379 5.00635 10.0929 5.16035 10.0929 5.35101V5.49401C10.0929 5.68468 10.0379 5.83868 9.92791 5.95601C9.82525 6.07335 9.65658 6.13201 9.42191 6.13201Z"
      fill="#B4BFD1"
    />
  </svg>
);

export const CacheOutcomeIcon: FC<
  JSX.IntrinsicElements["svg"] & {
    state?: "hit" | "miss" | "partial";
  }
> = ({ state, ...props }) => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 5C0 6.36273 0.545159 7.59812 1.42928 8.5L5 5L8.57072 1.5C7.66326 0.574319 6.3987 0 5 0C2.23858 0 0 2.23858 0 5Z"
      fill={state === "partial" ? "#ECF29F" : "transparent"}
    />
    <circle
      cx="5"
      cy="5"
      r="4.5"
      stroke="#ECF29F"
      fill={state === "hit" ? "#ECF29F" : "transparent"}
    />
  </svg>
);