import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { HOST } from '@/constans/common'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const postTitle = searchParams.get('title')
  const fontData = await fetch(new URL('../../../public/fonts/Lato-Bold.ttf', import.meta.url)).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundImage: `url(${HOST}/media/og-bg.jpg)`,
        }}
      >
        <div
          style={{
            paddingLeft: 190,
            paddingRight: 190,
            margin: 'auto',
            display: 'flex',
            fontSize: 130,
            fontFamily: 'Lato',
            letterSpacing: '-0.05em',
            fontStyle: 'normal',
            color: 'white',
            lineHeight: '120px',
            whiteSpace: 'pre-wrap',
            textAlign: 'center',
          }}
        >
          {postTitle}
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: 'Lato',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  )
}
