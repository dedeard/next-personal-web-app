const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    fill="currentColor"
    viewBox="0 0 240 240"
    height={16}
    width={16}
    style={{
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      strokeLinejoin: 'round',
      strokeMiterlimit: 2,
    }}
    {...props}
  >
    <path d="M0 216.346V23.653C0 10.598 10.599-.001 23.654-.001H120c66.23 0 120 53.77 120 120 0 66.23-53.77 120-120 120H23.654C10.599 239.999 0 229.4 0 216.345Zm120-49.039h23.753a19.71 19.71 0 0 0 14.094-33.42l-3.95-4.077c-5.296-5.468-5.296-14.152 0-19.62l3.926-4.053a19.722 19.722 0 0 0-14.157-33.444h-23.667c-26.11 0-47.307 21.198-47.307 47.307 0 26.11 21.198 47.307 47.307 47.307Z" />
  </svg>
)

export default Logo
