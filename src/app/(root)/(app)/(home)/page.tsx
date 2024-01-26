import { SOCIALS } from '@/constans/common'
import { FaGithub, FaInstagram, FaWhatsapp, FaLinkedin } from 'react-icons/fa'

export default function HomePage() {
  return (
    <div className="relative flex min-h-full w-full flex-col items-center justify-center">
      <div className="relative flex items-center justify-center py-3">
        <h1 className="relative flex-1">
          <span className="grid grid-cols-2">
            <span className="block text-center text-sm opacity-90">I AM</span>
          </span>{' '}
          <span className=" z-10 block text-[calc(1.825rem+6.9vw)] font-bold leading-none">Dede Ard</span>{' '}
          <span className="grid grid-cols-2 justify-items-end">
            <span className="block"></span>
            <span className="block text-sm opacity-90">
              A FULL STACK
              <br /> WEB DEVELOPER
            </span>
          </span>
        </h1>
        <div className="absolute -bottom-1/4 mx-auto flex">
          <a href={SOCIALS.IG} aria-label="Instagram" target="_blank" rel="noopener" className="mx-2 block p-2 opacity-80 hover:opacity-95">
            <FaInstagram size={20} />
          </a>
          <a href={SOCIALS.GH} aria-label="GitHub" target="_blank" rel="noopener" className="mx-2 block p-2 opacity-80 hover:opacity-95">
            <FaGithub size={20} />
          </a>
          <a href={SOCIALS.IN} aria-label="Linkedin" target="_blank" rel="noopener" className="mx-2 block p-2 opacity-80 hover:opacity-95">
            <FaLinkedin size={20} />
          </a>
          <a href={SOCIALS.WA} aria-label="WhatsApp" target="_blank" rel="noopener" className="mx-2 block p-2 opacity-80 hover:opacity-95">
            <FaWhatsapp size={20} />
          </a>
        </div>
      </div>
    </div>
  )
}
