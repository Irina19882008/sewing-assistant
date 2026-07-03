// Type definitions for User
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  created_at: string
  last_login?: string
  plan: 'Free' | 'Pro'
}

export interface Workshop {
  id: string
  user_id: string
  name: string
  created_at: string
  updated_at: string
}

export interface Fabric {
  id: string
  workshop_id: string
  name: string
  category?: string
  composition?: string
  width?: number
  color?: string
  print?: string
  supplier?: string
  purchase_price?: number
  purchase_date?: string
  initial_length: number
  current_length: number
  location?: string
  status: 'новая' | 'используется' | 'закончилась'
  photo?: string
  created_at: string
  updated_at: string
}

export interface Pattern {
  id: string
  workshop_id: string
  name: string
  author?: string
  type?: string
  size_range?: string
  file_pdf?: string
  photo?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  workshop_id: string
  name: string
  category?: string
  status: 'Идея' | 'Подготовка' | 'В работе' | 'Пауза' | 'Готово'
  created_at: string
  finished_at?: string
  description?: string
  cover_photo?: string
}

export interface TimelineEvent {
  id: string
  project_id: string
  type: 'photo' | 'note' | 'calculation' | 'purchase' | 'edit' | 'status_change'
  content: Record<string, any>
  created_at: string
}

export interface ShoppingItem {
  id: string
  project_id: string
  name: string
  quantity: number
  unit: string
  price?: number
  is_bought: boolean
  created_at: string
}

export interface AssistantMemory {
  id: string
  workshop_id: string
  memory_json: {
    favorite_fabrics?: string[]
    favorite_patterns?: string[]
    errors_history?: string[]
    habits?: Record<string, any>
    style?: Record<string, any>
    completed_projects?: string[]
  }
  created_at: string
  updated_at: string
}
