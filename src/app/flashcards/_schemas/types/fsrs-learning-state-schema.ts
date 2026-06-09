import * as z from 'zod'
import { State } from 'ts-fsrs'
import { LearningStateEnum } from '@/../prisma/generated/prisma/enums'

export const FsrsLearningStateSchema = z.enum(LearningStateEnum).transform(state => {
    switch(state) {
        case LearningStateEnum.NEW:
            return State.New
        case LearningStateEnum.LEARNING:
            return State.Learning
        case LearningStateEnum.REVIEW:
            return State.Review
        case LearningStateEnum.RELEARNING:
            return State.Relearning
    }
})
