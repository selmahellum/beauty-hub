import {useCallback} from 'react'
import {Flex, Text, Box} from '@sanity/ui'
import {set, unset} from 'sanity'
import type {NumberInputProps} from 'sanity'
import {GoHeartFill} from 'react-icons/go'

const MAX_HEARTS = 5

export const HeartRatingInput = (props: NumberInputProps) => {
  const {onChange, value} = props
  const currentRating = value ?? 0

  const handleClick = useCallback(
    (rating: number) => {
      // If clicking the same rating, unset it (toggle off)
      if (currentRating === rating) {
        onChange(unset())
      } else {
        onChange(set(rating))
      }
    },
    [onChange, currentRating],
  )

  return (
    <Flex gap={2} align="center">
      <Flex gap={1}>
        {Array.from({length: MAX_HEARTS}, (_, index) => {
          const heartValue = index + 1
          const isFilled = heartValue <= currentRating

          return (
            <Box
              key={heartValue}
              as="button"
              type="button"
              onClick={() => handleClick(heartValue)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                fontSize: '24px',
                lineHeight: 1,
                transition: 'transform 0.1s ease',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.transform = 'scale(1.2)'
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <GoHeartFill
                style={{
                  color: isFilled ? '#ff9ec5' : '#D1D5DB',
                  filter: isFilled ? 'drop-shadow(0 0 4px rgba(255, 158, 197, 0.4))' : 'none',
                }}
              />
            </Box>
          )
        })}
      </Flex>
      <Text size={1} muted>
        {currentRating > 0 ? `${currentRating} av ${MAX_HEARTS}` : 'Ikke satt'}
      </Text>
    </Flex>
  )
}
