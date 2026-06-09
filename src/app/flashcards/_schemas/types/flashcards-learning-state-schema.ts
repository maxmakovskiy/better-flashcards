import { z } from 'zod'
import { State } from 'ts-fsrs'
import { LearningStateEnum } from '@/../prisma/generated/prisma/enums'

export const FlashcardsLearningStateSchema = z.enum(LearningStateEnum)

export const LearningStateFromFsrsSchema = z.enum(State).transform(state => {
    switch(state) {
        case State.New:
            return LearningStateEnum.NEW
        case State.Learning:
            return LearningStateEnum.LEARNING
        case State.Review:
            return LearningStateEnum.REVIEW
        case State.Relearning:
            return LearningStateEnum.RELEARNING
    }
})

