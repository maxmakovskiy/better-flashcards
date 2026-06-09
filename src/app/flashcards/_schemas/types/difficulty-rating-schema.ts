import { DifficultyRatingEnum } from '@/../prisma/generated/prisma/enums'
import * as z from 'zod'

export const DifficultyRatingSchema = z.enum(DifficultyRatingEnum)
