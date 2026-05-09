// Shared types for the Kulima platform

export type Role = 'FARMER' | 'BUYER' | 'ADMIN'

export type User = {
  id: string
  email: string
  role: Role
  phoneNumber: string | null
  createdAt: Date
  updatedAt: Date
}

export type Farmer = {
  id: string
  userId: string
  fullName: string
  location: string
  nationalId: string | null
  createdAt: Date
  updatedAt: Date
}

export type Buyer = {
  id: string
  userId: string
  businessName: string
  businessType: string
  location: string
  createdAt: Date
  updatedAt: Date
}

export type Farm = {
  id: string
  farmerId: string
  name: string
  location: string
  sizeInAcres: number
  createdAt: Date
  updatedAt: Date
}

export type CropCycleStatus = 'PLANNED' | 'ACTIVE' | 'HARVESTED' | 'FAILED'

export type CropCycle = {
  id: string
  farmId: string
  cropType: string
  plantingDate: Date
  expectedHarvestDate: Date
  actualHarvestDate: Date | null
  status: CropCycleStatus
  createdAt: Date
  updatedAt: Date
}

export type ListingStatus = 'DRAFT' | 'ACTIVE' | 'SOLD' | 'EXPIRED'

export type Listing = {
  id: string
  farmerId: string
  cropType: string
  quantity: number
  pricePerUnit: number
  status: ListingStatus
  description: string | null
  createdAt: Date
  updatedAt: Date
}

export type OfferStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN'

export type Offer = {
  id: string
  listingId: string
  buyerId: string
  offerAmount: number
  status: OfferStatus
  message: string | null
  createdAt: Date
  updatedAt: Date
}

export type NotificationType = 'OFFER_RECEIVED' | 'OFFER_ACCEPTED' | 'OFFER_REJECTED' | 'PRICE_ALERT' | 'WEATHER_ALERT'
export type NotificationChannel = 'SMS' | 'EMAIL' | 'PUSH'
export type NotificationStatus = 'PENDING' | 'SENT' | 'FAILED'

export type Notification = {
  id: string
  userId: string
  type: NotificationType
  channel: NotificationChannel
  message: string
  status: NotificationStatus
  sentAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export type MarketPrice = {
  id: string
  cropType: string
  pricePerUnit: number
  location: string
  date: Date
  source: string
  createdAt: Date
  updatedAt: Date
}

export type LoanStatus = 'PENDING' | 'APPROVED' | 'DISBURSED' | 'REPAID' | 'DEFAULTED'

export type LoanProfile = {
  id: string
  farmerId: string
  loanAmount: number
  interestRate: number
  status: LoanStatus
  disbursementDate: Date | null
  repaymentDate: Date | null
  createdAt: Date
  updatedAt: Date
}
