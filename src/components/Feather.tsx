import React, { SVGProps } from 'react'

const initial: SVGProps<SVGSVGElement> = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: 2,
  viewBox: '0 0 24 24',
}

export const HomeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...initial} {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
    <path d="M9 22L9 12 15 12 15 22"></path>
  </svg>
)

export const UserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...initial} {...props}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

export const ImageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...initial} {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <path d="M21 15L16 10 5 21"></path>
  </svg>
)

export const MailIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...initial} {...props}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <path d="M22 6L12 13 2 6"></path>
  </svg>
)

export const MoonIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...initial} {...props}>
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
  </svg>
)

export const SunIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...initial} {...props}>
    <circle cx="12" cy="12" r="5"></circle>
    <path d="M12 1L12 3"></path>
    <path d="M12 21L12 23"></path>
    <path d="M4.22 4.22L5.64 5.64"></path>
    <path d="M18.36 18.36L19.78 19.78"></path>
    <path d="M1 12L3 12"></path>
    <path d="M21 12L23 12"></path>
    <path d="M4.22 19.78L5.64 18.36"></path>
    <path d="M18.36 5.64L19.78 4.22"></path>
  </svg>
)

export const Volume2Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...initial} {...props}>
    <path d="M11 5L6 9 2 9 2 15 6 15 11 19 11 5z"></path>
    <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"></path>
  </svg>
)

export const VolumeXIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...initial} {...props}>
    <path d="M11 5L6 9 2 9 2 15 6 15 11 19 11 5z"></path>
    <path d="M23 9L17 15"></path>
    <path d="M17 9L23 15"></path>
  </svg>
)

export const LockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...initial} {...props}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0110 0v4"></path>
  </svg>
)

export const StarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...initial} {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
)

export const ClipboardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...initial} {...props}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
  </svg>
)
