import { z } from 'zod'

// Create farm schema
export const createFarmSchema = z.object({
  name: z.string().min(1, 'Farm name is required'),
  location: z.string().min(1, 'Location is required'),
  sizeInAcres: z.number().positive('Size must be a positive number'),
})

export type CreateFarmInput = z.infer<typeof createFarmSchema>

// Update farm schema
export const updateFarmSchema = createFarmSchema.partial()

export type UpdateFarmInput = z.infer<typeof updateFarmSchema>

// Create crop cycle schema
export const createCropCycleSchema = z.object({
  farmId: z.string().cuid('Invalid farm ID'),
  cropType: z.string().min(1, 'Crop type is required'),
  plantingDate: z.coerce.date(),
  expectedHarvestDate: z.coerce.date(),
  status: z.enum(['PLANNED', 'ACTIVE', 'HARVESTED', 'FAILED']).default('PLANNED'),
})

export type CreateCropCycleInput = z.infer<typeof createCropCycleSchema>

// Update crop cycle schema
export const updateCropCycleSchema = z.object({
  actualHarvestDate: z.coerce.date().optional(),
  status: z.enum(['PLANNED', 'ACTIVE', 'HARVESTED', 'FAILED']).optional(),
})

export type UpdateCropCycleInput = z.infer<typeof updateCropCycleSchema>
