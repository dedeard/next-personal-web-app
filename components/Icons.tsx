import React, { SVGProps, memo } from 'react'

export const Brand = memo((props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 137.41 137.41" height={16} width={16} {...props}>
      <path d="M68.71 0a68.71 68.71 0 1068.7 68.71A68.71 68.71 0 0068.71 0zm26.21 82.92a12 12 0 01-12 12H54.49a12 12 0 01-12-12V54.49a12 12 0 0112-12h28.43a12 12 0 0112 12z"></path>
    </svg>
  )
})

export const HomeIcon = memo((props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="feather feather-home"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
      <path d="M9 22L9 12 15 12 15 22"></path>
    </svg>
  )
})

export const UserIcon = memo((props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="feather feather-user"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  )
})

export const ImageIcon = memo((props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="feather feather-image"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <path d="M21 15L16 10 5 21"></path>
    </svg>
  )
})

export const MailIcon = memo((props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="feather feather-mail"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <path d="M22 6L12 13 2 6"></path>
    </svg>
  )
})

export const MoonIcon = memo((props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="feather feather-moon"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
    </svg>
  )
})

export const SunIcon = memo((props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="feather feather-sun"
      viewBox="0 0 24 24"
      {...props}
    >
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
})

export const Volume2Icon = memo((props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="feather feather-volume-2"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M11 5L6 9 2 9 2 15 6 15 11 19 11 5z"></path>
      <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"></path>
    </svg>
  )
})

export const VolumeXIcon = memo((props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="feather feather-volume-x"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M11 5L6 9 2 9 2 15 6 15 11 19 11 5z"></path>
      <path d="M23 9L17 15"></path>
      <path d="M17 9L23 15"></path>
    </svg>
  )
})

export const LockIcon = memo((props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="feather feather-lock"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0110 0v4"></path>
    </svg>
  )
})
