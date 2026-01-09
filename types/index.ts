// Type definities voor DAAR Kennisbank

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
