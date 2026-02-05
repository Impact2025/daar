// Type definities voor DAAR Kennisbank & CRM

import type {
  Article,
  Category,
  Tag,
  Author,
  User,
  ChatSession,
  ChatMessage,
  Lead,
  PageView,
  ArticleStatus,
  UserRole,
  MessageRole,
  LeadStatus,
  LeadSource,
  // CRM types
  TeamMember,
  Customer,
  Activity,
  Task,
  Deal,
  Note,
  CustomerStatus,
  CustomerSource,
  OrganizationType,
  OrganizationSector,
  ActivityType,
  TaskStatus,
  TaskPriority,
  DealStage,
  // Drive types
  DriveFolder,
  DriveFile,
} from '@prisma/client'

// Re-export Prisma types
export type {
  Article,
  Category,
  Tag,
  Author,
  User,
  ChatSession,
  ChatMessage,
  Lead,
  PageView,
  ArticleStatus,
  UserRole,
  MessageRole,
  LeadStatus,
  LeadSource,
  // CRM
  TeamMember,
  Customer,
  Activity,
  Task,
  Deal,
  Note,
  CustomerStatus,
  CustomerSource,
  OrganizationType,
  OrganizationSector,
  ActivityType,
  TaskStatus,
  TaskPriority,
  DealStage,
  // Drive
  DriveFolder,
  DriveFile,
}

// Extended types met relaties
export type ArticleWithRelations = Article & {
  author: Author
  category: Category | null
  tags: { tag: Tag }[]
}

export type ArticleListItem = Pick<Article,
  'id' | 'title' | 'slug' | 'excerpt' | 'featuredImage' | 'publishedAt' | 'readingTime' | 'viewCount'
> & {
  author: Pick<Author, 'name' | 'avatar'>
  category: Pick<Category, 'name' | 'slug' | 'color'> | null
}

export type ChatSessionWithMessages = ChatSession & {
  messages: ChatMessage[]
  lead: Lead | null
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// Form types
export interface ArticleFormData {
  title: string
  slug?: string
  content: string
  excerpt?: string
  metaTitle?: string
  metaDescription?: string
  featuredImage?: string
  featuredImageAlt?: string
  categoryId?: string
  tagIds?: string[]
  status: ArticleStatus
}

export interface LeadFormData {
  name?: string
  email?: string
  phone?: string
  organization?: string
  interest?: string
}

// Chat types
export interface ChatMessageInput {
  sessionId: string
  content: string
}

export interface ChatStreamEvent {
  type: 'text' | 'article_suggestion' | 'lead_prompt' | 'done' | 'error'
  content?: string
  article?: ArticleListItem
  error?: string
}

// Search types
export interface SearchParams {
  query: string
  category?: string
  tags?: string[]
  page?: number
  pageSize?: number
}

export interface SearchResult {
  articles: ArticleListItem[]
  total: number
  suggestions?: string[]
}

// Analytics types
export interface AnalyticsOverview {
  totalArticles: number
  publishedArticles: number
  totalViews: number
  totalLeads: number
  topArticles: Array<{
    id: string
    title: string
    viewCount: number
  }>
  recentLeads: Array<{
    id: string
    name: string | null
    email: string | null
    createdAt: Date
  }>
  viewsOverTime: Array<{
    date: string
    views: number
  }>
}

// Navigation types
export interface NavItem {
  label: string
  href: string
  icon?: string
  children?: NavItem[]
}

// UI Component props
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export interface CardProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

// ============================================
// CRM TYPES
// ============================================

export type CustomerWithRelations = Customer & {
  assignedTo: TeamMember | null
  activities: Activity[]
  tasks: Task[]
  deals: Deal[]
  notes: Note[]
  _count?: {
    activities: number
    tasks: number
    deals: number
    notes: number
  }
}

export type CustomerListItem = Pick<Customer,
  'id' | 'companyName' | 'contactName' | 'contactEmail' | 'status' | 'source' | 'lastContactAt' | 'nextFollowUp'
> & {
  assignedTo: Pick<TeamMember, 'id' | 'name' | 'avatar' | 'color'> | null
  _count?: {
    deals: number
    tasks: number
  }
}

export type DealWithRelations = Deal & {
  customer: Pick<Customer, 'id' | 'companyName' | 'contactName'>
  owner: Pick<TeamMember, 'id' | 'name' | 'avatar' | 'color'>
}

export type TaskWithRelations = Task & {
  customer: Pick<Customer, 'id' | 'companyName'> | null
  assignedTo: Pick<TeamMember, 'id' | 'name' | 'avatar' | 'color'>
  createdBy: Pick<TeamMember, 'id' | 'name'>
}

export type ActivityWithRelations = Activity & {
  customer: Pick<Customer, 'id' | 'companyName'>
  performedBy: Pick<TeamMember, 'id' | 'name' | 'avatar' | 'color'>
}

export type NoteWithAuthor = Note & {
  author: Pick<TeamMember, 'id' | 'name' | 'avatar'>
}

// CRM Form types
export interface CustomerFormData {
  companyName: string
  kvkNumber?: string
  vatNumber?: string
  website?: string
  industry?: string
  contactName: string
  contactEmail: string
  contactPhone?: string
  contactRole?: string
  address?: string
  postalCode?: string
  city?: string
  country?: string
  status?: CustomerStatus
  source?: CustomerSource
  employeeCount?: string
  priceAgreement?: string
  hourlyRate?: number
  monthlyBudget?: number
  paymentTerms?: number
  assignedToId?: string
  nextFollowUp?: string
}

export interface DealFormData {
  name: string
  description?: string
  value?: number
  currency?: string
  stage?: DealStage
  probability?: number
  expectedCloseDate?: string
  customerId: string
  ownerId: string
}

export interface TaskFormData {
  title: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  dueDate?: string
  customerId?: string
  assignedToId: string
}

export interface ActivityFormData {
  type: ActivityType
  title: string
  description?: string
  occurredAt?: string
  duration?: number
  customerId: string
  performedById: string
  metadata?: Record<string, unknown>
}

export interface NoteFormData {
  content: string
  isPinned?: boolean
  customerId: string
}

// CRM Stats
export interface CRMStats {
  totalCustomers: number
  activeDeals: number
  pipelineValue: number
  dealsThisMonth: number
  tasksDueToday: number
  conversionRate: number
}

export interface PipelineStats {
  stage: DealStage
  count: number
  value: number
}

export interface TeamMemberStats {
  member: Pick<TeamMember, 'id' | 'name' | 'avatar' | 'color'>
  customersCount: number
  dealsCount: number
  dealsValue: number
  activitiesCount: number
}

// ============================================
// DRIVE TYPES
// ============================================

export type DriveFolderWithRelations = DriveFolder & {
  parent: Pick<DriveFolder, 'id' | 'name'> | null
  children: Pick<DriveFolder, 'id' | 'name' | 'color' | 'icon'>[]
  files: DriveFileListItem[]
  customer: Pick<Customer, 'id' | 'companyName'> | null
  createdBy: Pick<TeamMember, 'id' | 'name'>
  _count?: {
    children: number
    files: number
  }
}

export type DriveFileListItem = Pick<DriveFile,
  'id' | 'name' | 'displayName' | 'mimeType' | 'size' | 'extension' | 'url' | 'thumbnailUrl' | 'createdAt'
> & {
  uploadedBy: Pick<TeamMember, 'id' | 'name' | 'avatar'>
}

export type DriveFileWithRelations = DriveFile & {
  folder: Pick<DriveFolder, 'id' | 'name'> | null
  uploadedBy: Pick<TeamMember, 'id' | 'name' | 'avatar'>
}

export interface DriveStats {
  totalFiles: number
  totalFolders: number
  totalSize: number
  recentFiles: DriveFileListItem[]
}

// Breadcrumb for navigation
export interface DriveBreadcrumb {
  id: string
  name: string
}

export interface UploadProgress {
  fileName: string
  progress: number
  status: 'pending' | 'uploading' | 'complete' | 'error'
  error?: string
}
