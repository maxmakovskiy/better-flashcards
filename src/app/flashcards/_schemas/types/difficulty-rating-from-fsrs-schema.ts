import { z } from 'zod'
import { Rating } from 'ts-fsrs'
import { DifficultyRatingEnum } from '@/../prisma/generated/prisma/enums'

export const DifficultyRatingFromFsrsSchema = z.enum(Rating).transform(rating => {
    switch(rating ) {
        case Rating.Manual:
            return DifficultyRatingEnum.MANUAL
        case Rating.Again:
            return DifficultyRatingEnum.AGAIN
        case Rating.Hard:
            return DifficultyRatingEnum.HARD
        case Rating.Good:
            return DifficultyRatingEnum.GOOD
        case Rating.Easy:
            return DifficultyRatingEnum.EASY
    }
})
