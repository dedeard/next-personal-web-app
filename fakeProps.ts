import { IAboutPage, IContactPage, IGalleryPage, IGlobalPage, IHomePage } from '@/types'

export const fakeGlobalPageProps: IGlobalPage = {
  body: {
    background: {
      image: '/media/background.webp',
      video: '/media/background.webm',
    },
  },
}

export const fakeHomePageProps: IHomePage = {
  head: {
    title: 'Home',
    description: 'Description',
  },
  body: {
    socials: {
      IG: '#',
      GH: '#',
      WA: '#',
    },
    contents: {
      p1: 'I AM',
      p2: 'Dede Ard',
      p3: 'A JUNIOR<br /> WEB DEVELOPER',
    },
  },
}

export const fakeAboutPageProps: IAboutPage = {
  head: {
    title: 'About',
    description: 'Descriptioin',
  },
  body: {
    title: 'About',
    image: {
      alt: '/media/dedeard-dark.gif',
      sm_url: '/media/dedeard-dark.gif',
      url: '/media/dedeard-dark.gif',
    },
    contents: {
      '1x': {
        title: 'I’m Dede Ardiansya',
        text: 'Web developer based in Makassar, Indonesia. <br />Building websites is my hobby, I try to have a minimalist website design.',
      },
      '2x': {
        title: 'Saya Dede Ardiansya',
        text: 'Pengembang web yang berbasis di Makassar, Indonesia.<br />Membangun website adalah hobi saya, saya mencoba memiliki desain website yang minimalis.',
      },
    },
  },
}

export const fakeGalleryPageProps: IGalleryPage = {
  head: {
    title: 'Gallery',
    description: 'Descriptioin',
  },
  body: {
    title: 'Gallery',
    images: {
      '1a': {
        alt: 'k bolt Logo Design',
        sm_url:
          'https://cdn.statically.io/img/cdn.dribbble.com/w=400,h=400/users/24078/screenshots/14562865/media/130e993838dec40962316d5fde601ec2.jpg',
        url: 'https://cdn.statically.io/img/cdn.dribbble.com/w=1280,h=1280/users/24078/screenshots/14562865/media/130e993838dec40962316d5fde601ec2.jpg',
      },
      '2a': {
        alt: 'P + Box Logo Design',
        sm_url:
          'https://cdn.statically.io/img/cdn.dribbble.com/w=400,h=400/users/68544/screenshots/14616165/media/f5cce7a139d97774f722649a3af55e5e.png',
        url: 'https://cdn.statically.io/img/cdn.dribbble.com/w=1280,h=1280/users/68544/screenshots/14616165/media/f5cce7a139d97774f722649a3af55e5e.png',
      },
      '3a': {
        alt: 'Fobonacci 01 Logo Design',
        sm_url:
          'https://cdn.statically.io/img/cdn.dribbble.com/w=400,h=400/users/24078/screenshots/11588377/media/98f7235e173d56f168d3e9222523d42b.jpg',
        url: 'https://cdn.statically.io/img/cdn.dribbble.com/w=1280,h=1280/users/24078/screenshots/11588377/media/98f7235e173d56f168d3e9222523d42b.jpg',
      },
      '4a': {
        alt: 'Paulini Web Design',
        sm_url:
          'https://cdn.statically.io/img/cdn.dribbble.com/w=400,h=400/users/702789/screenshots/14012516/media/561a8b7e8cbe51c72c18f4ef0dc72676.png',
        url: 'https://cdn.statically.io/img/cdn.dribbble.com/w=1280,h=1280/users/702789/screenshots/14012516/media/561a8b7e8cbe51c72c18f4ef0dc72676.png',
      },
      '5a': {
        alt: 'Yogic Shiksha Web Design',
        sm_url:
          'https://cdn.statically.io/img/cdn.dribbble.com/w=400,h=400/users/702789/screenshots/14167472/media/8000d31c523631443cbe8eddaddd4300.png',
        url: 'https://cdn.statically.io/img/cdn.dribbble.com/w=1280,h=1280/users/702789/screenshots/14167472/media/8000d31c523631443cbe8eddaddd4300.png',
      },
      '6a': {
        alt: 'Job hunt Web Design',
        sm_url:
          'https://cdn.statically.io/img/cdn.dribbble.com/w=400,h=400/users/1615584/screenshots/14454453/media/69ef4fbbde7ee540579ca8d62d453c98.jpg',
        url: 'https://cdn.statically.io/img/cdn.dribbble.com/w=1280,h=1280/users/1615584/screenshots/14454453/media/69ef4fbbde7ee540579ca8d62d453c98.jpg',
      },
      '7a': {
        alt: 'Travel Mobile App Design',
        sm_url:
          'https://cdn.statically.io/img/cdn.dribbble.com/w=400,h=400/users/1615584/screenshots/14099247/media/c51d0b28a7916e194f9340d1237fce75.jpg',
        url: 'https://cdn.statically.io/img/cdn.dribbble.com/w=1280,h=1280/users/1615584/screenshots/14099247/media/c51d0b28a7916e194f9340d1237fce75.jpg',
      },
      '8a': {
        alt: 'Furniture Mobile App Design',
        sm_url:
          'https://cdn.statically.io/img/cdn.dribbble.com/w=400,h=400/users/1615584/screenshots/14011931/media/ff5b21c1710672cfbc06a2bd59f6dab3.jpg',
        url: 'https://cdn.statically.io/img/cdn.dribbble.com/w=1280,h=1280/users/1615584/screenshots/14011931/media/ff5b21c1710672cfbc06a2bd59f6dab3.jpg',
      },
      '9a': {
        alt: 'Pets Mobile App Design',
        sm_url:
          'https://cdn.statically.io/img/cdn.dribbble.com/w=400,h=400/users/1615584/screenshots/14320703/media/85c83355f2e9389879532f6587c0b94c.jpg',
        url: 'https://cdn.statically.io/img/cdn.dribbble.com/w=1280,h=1280/users/1615584/screenshots/14320703/media/85c83355f2e9389879532f6587c0b94c.jpg',
      },
    },
  },
}

export const fakeContactPageProps: IContactPage = {
  head: {
    title: 'Contact',
    description: 'Descriptioin',
  },
  body: {
    title: 'Contact',
    contents: {
      '1x': {
        title: 'ADDRESS STREET',
        text: 'D/23 Perumahan Puri diva Istanbul. <br /> Gowa, Sulawesi Selatan.',
      },
      '2x': {
        title: 'MOBILE PHONE',
        text: 'Call: +62 813-4391-2883 <br/> WhatsApp: +62 813-4391-2883',
      },
      '3x': {
        title: 'ADDRESS EMAIL',
        text: 'me@dedeard.my.id <br/> dedeariansya1@gmail.com',
      },
    },
    formspree_key: 'xoqyaqqe',
  },
}
