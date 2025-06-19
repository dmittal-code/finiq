import { supabase } from '../supabaseClient';

export interface FinancialTerm {
  id: number;
  term: string;
  definition: string;
  category: string;
  example?: string;
  related_terms?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface CreateFinancialTermData {
  term: string;
  definition: string;
  category: string;
  example?: string;
  related_terms?: string[];
}

export interface UpdateFinancialTermData {
  term?: string;
  definition?: string;
  category?: string;
  example?: string;
  related_terms?: string[];
}

export async function getAllFinancialTerms(): Promise<FinancialTerm[]> {
  try {
    const { data, error } = await supabase
      .from('financial_terms')
      .select('*')
      .order('term');

    if (error) {
      console.error('Error fetching financial terms:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllFinancialTerms:', error);
    throw error;
  }
}

export async function searchFinancialTerms(searchTerm: string): Promise<FinancialTerm[]> {
  try {
    const { data, error } = await supabase
      .from('financial_terms')
      .select('*')
      .or(`term.ilike.%${searchTerm}%,definition.ilike.%${searchTerm}%`)
      .order('term');

    if (error) {
      console.error('Error searching financial terms:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in searchFinancialTerms:', error);
    throw error;
  }
}

export async function getFinancialTermsByCategory(category: string): Promise<FinancialTerm[]> {
  try {
    const { data, error } = await supabase
      .from('financial_terms')
      .select('*')
      .eq('category', category)
      .order('term');

    if (error) {
      console.error('Error fetching financial terms by category:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getFinancialTermsByCategory:', error);
    throw error;
  }
}

export async function getFinancialTermById(id: number): Promise<FinancialTerm | null> {
  try {
    const { data, error } = await supabase
      .from('financial_terms')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching financial term by ID:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getFinancialTermById:', error);
    throw error;
  }
}

export async function createFinancialTerm(termData: CreateFinancialTermData): Promise<FinancialTerm> {
  try {
    const { data, error } = await supabase
      .from('financial_terms')
      .insert([termData])
      .select()
      .single();

    if (error) {
      console.error('Error creating financial term:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createFinancialTerm:', error);
    throw error;
  }
}

export async function updateFinancialTerm(id: number, termData: UpdateFinancialTermData): Promise<FinancialTerm> {
  try {
    const { data, error } = await supabase
      .from('financial_terms')
      .update(termData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating financial term:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in updateFinancialTerm:', error);
    throw error;
  }
}

export async function deleteFinancialTerm(id: number): Promise<void> {
  try {
    const { error } = await supabase
      .from('financial_terms')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting financial term:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in deleteFinancialTerm:', error);
    throw error;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('financial_terms')
      .select('category')
      .order('category');

    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

    // Remove duplicates and return unique categories
    const categories = [...new Set(data?.map(item => item.category) || [])];
    return categories;
  } catch (error) {
    console.error('Error in getCategories:', error);
    throw error;
  }
} 