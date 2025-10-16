export type Role = 'user' | 'admin'

export type User = {
    id: string
    fullName: string
    username: string
    // password: string
    contactNumber: string
    role: string
    isActive: boolean
    // createdAt: LocalDateTime
}

export type Item = {
    id: string
    itemName: string
    description: string
    itemStatus: 'lost' | 'found'
    dateLostOrFound?: string
    category?: string
    reportedByUser?: string
    requestEntityList?: string[]
}