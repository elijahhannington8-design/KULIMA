import { z } from 'zod'

// Create listing schema
export const createListingSchema = z.object({
  cropType: z.string().min(1, 'Crop type is required'),
  quantity: z.number().positive('Quantity must be a positive number'),
  pricePerUnit: z.number().positive('Price must be a positive number'),
  description: z.string().optional(),
  status: z.enum(['DRAFT', 'ACTIVE', 'SOLD', 'EXPIRED']).default('DRAFT'),
})

export type CreateListingInput = z.infer<typeof createListingSchema>

// Update listing schema
export const updateListingSchema = createListingSchema.partial()

export type UpdateListingInput = z.infer<typeof updateListingSchema>

// Create offer schema
export const createOfferSchema = z.object({
  listingId: z.string().cuid('Invalid listing ID'),
  offerAmount: z.number().positive('Offer amount must be a positive number'),
  message: z.string().optional(),
})

export type CreateOfferInput = z.infer<typeof createOfferSchema>

// Update offer schema
export const updateOfferSchema = z.object({
  status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED', 'WITHDRAWN']),
})

export type UpdateOfferInput = z.infer<typeof updateOfferSchema>
