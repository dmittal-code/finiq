import { supabase } from '../supabaseClient';

export interface Flashcard {
  id: number;
  term: string;
  definition: string;
  category: string;
  created_at?: string;
  updated_at?: string;
}

// Get all flashcards from the database
export async function getFlashcards(): Promise<Flashcard[]> {
  try {
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .order('term');

    if (error) {
      console.error('Error fetching flashcards:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getFlashcards:', error);
    throw error;
  }
}

// Get flashcards by category
export async function getFlashcardsByCategory(category: string): Promise<Flashcard[]> {
  try {
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .eq('category', category)
      .order('term');

    if (error) {
      console.error('Error fetching flashcards by category:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getFlashcardsByCategory:', error);
    throw error;
  }
}

// Get all unique categories
export async function getFlashcardCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('flashcards')
      .select('category')
      .order('category');

    if (error) {
      console.error('Error fetching flashcard categories:', error);
      throw error;
    }

    // Extract unique categories
    const categories = [...new Set(data?.map(item => item.category) || [])];
    return categories;
  } catch (error) {
    console.error('Error in getFlashcardCategories:', error);
    throw error;
  }
}

// Search flashcards by term or definition
export async function searchFlashcards(query: string): Promise<Flashcard[]> {
  try {
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .or(`term.ilike.%${query}%,definition.ilike.%${query}%`)
      .order('term');

    if (error) {
      console.error('Error searching flashcards:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in searchFlashcards:', error);
    throw error;
  }
}

// Get a single flashcard by ID
export async function getFlashcardById(id: number): Promise<Flashcard | null> {
  try {
    const { data, error } = await supabase
      .from('flashcards')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching flashcard by ID:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getFlashcardById:', error);
    throw error;
  }
}

// Add a new flashcard (for future admin functionality)
export async function addFlashcard(flashcard: Omit<Flashcard, 'id' | 'created_at' | 'updated_at'>): Promise<Flashcard> {
  try {
    const { data, error } = await supabase
      .from('flashcards')
      .insert([flashcard])
      .select()
      .single();

    if (error) {
      console.error('Error adding flashcard:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in addFlashcard:', error);
    throw error;
  }
}

// Update a flashcard (for future admin functionality)
export async function updateFlashcard(id: number, updates: Partial<Omit<Flashcard, 'id' | 'created_at' | 'updated_at'>>): Promise<Flashcard> {
  try {
    const { data, error } = await supabase
      .from('flashcards')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating flashcard:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in updateFlashcard:', error);
    throw error;
  }
}

// Delete a flashcard (for future admin functionality)
export async function deleteFlashcard(id: number): Promise<void> {
  try {
    const { error } = await supabase
      .from('flashcards')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting flashcard:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in deleteFlashcard:', error);
    throw error;
  }
} 