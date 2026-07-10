'use client'
import { useTheme } from '@/contexts/ThemeContext'
import FuzzyText from './FuzzyText'

const NUMBER_FONT = "'Arial Black', 'Segoe UI', system-ui, sans-serif"

const Fuzzy404: React.FC<{ notFoundFont?: string }> = ({ notFoundFont }) => {
  const { dark } = useTheme()
  const color = dark ? '#ffffff' : '#000000'

  return (
    <div className="flex flex-col items-center gap-2">
      <FuzzyText
        color={color}
        fontFamily={NUMBER_FONT}
        fontSize="clamp(6rem, 24vw, 14rem)"
        fontWeight={900}
        baseIntensity={0.18}
        hoverIntensity={0.5}
        fps={30}
      >
        404
      </FuzzyText>
      <FuzzyText
        color={color}
        fontFamily={notFoundFont}
        fontSize="clamp(2rem, 9vw, 4.5rem)"
        fontWeight={400}
        baseIntensity={0.15}
        hoverIntensity={0.4}
        fps={30}
      >
        not found
      </FuzzyText>
    </div>
  )
}

export default Fuzzy404
