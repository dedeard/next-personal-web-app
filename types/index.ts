export interface IDataHead {
  title: string
  description: string
}

export interface IDataImage {
  alt: string
  url: string
  sm_url: string
}

export interface IDataBackground {
  image: string
  video: string
}

export interface IGlobalPage {
  body: {
    background: IDataBackground
    noise?: boolean
    cursor?: boolean
  }
}

export interface IHomePage {
  head: IDataHead
  body: {
    socials: {
      [key: string]: string
    }
    contents: {
      [key: string]: string
    }
  }
}

export interface IAboutPage {
  head: IDataHead
  body: {
    title: string
    resume?: string
    image: IDataImage
    contents: {
      [key: string]: {
        title: string
        text: string
      }
    }
  }
}

export interface IGalleryPage {
  head: IDataHead
  body: {
    title: string
    images: {
      [key: string]: IDataImage
    }
  }
}

export interface IContactPage {
  head: IDataHead
  body: {
    title: string
    formspree_key: string
    contents: {
      [key: string]: {
        title: string
        text: string
      }
    }
  }
}
