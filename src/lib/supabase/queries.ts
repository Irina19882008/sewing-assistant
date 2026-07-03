// Supabase database queries
import { supabase } from './client'

// User queries
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session?.user
}

// Workshop queries
export async function getWorkshop(userId: string) {
  const { data, error } = await supabase
    .from('workshops')
    .select('*')
    .eq('user_id', userId)
    .single()
  if (error) throw error
  return data
}

export async function createWorkshop(userId: string, name: string = 'Моя мастерская') {
  const { data, error } = await supabase
    .from('workshops')
    .insert([{ user_id: userId, name }])
    .select()
    .single()
  if (error) throw error
  return data
}

// Project queries
export async function getProjects(workshopId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('workshop_id', workshopId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getProject(projectId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single()
  if (error) throw error
  return data
}

export async function createProject(workshopId: string, name: string, category?: string) {
  const { data, error } = await supabase
    .from('projects')
    .insert([{ workshop_id: workshopId, name, category, status: 'Идея' }])
    .select()
    .single()
  if (error) throw error
  return data
}

// Fabric queries
export async function getFabrics(workshopId: string) {
  const { data, error } = await supabase
    .from('fabrics')
    .select('*')
    .eq('workshop_id', workshopId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

// Timeline queries
export async function getTimeline(projectId: string) {
  const { data, error } = await supabase
    .from('timeline_events')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

export async function createTimelineEvent(
  projectId: string,
  type: string,
  content: Record<string, any>
) {
  const { data, error } = await supabase
    .from('timeline_events')
    .insert([{ project_id: projectId, type, content }])
    .select()
    .single()
  if (error) throw error
  return data
}

// Shopping list queries
export async function getShoppingList(projectId: string) {
  const { data, error } = await supabase
    .from('shopping_items')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}
