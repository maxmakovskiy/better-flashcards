import * as z from 'zod'

export const StudySessionActionsSchema = z.enum(['PAUSE', 'RESUME', 'FINISH'])
export type StudySessionActionsSchema = z.infer<typeof StudySessionActionsSchema>
