import { AuthError, AuthResponse } from '@supabase/supabase-js';
import { supabase } from './supabase';
import toast from 'react-hot-toast';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  fullName: string;
  role: 'host' | 'guest';
}

export const login = async ({ email, password }: LoginCredentials): Promise<void> => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    toast.success('Welcome back!');
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};

export const register = async ({ email, password, fullName, role }: RegisterCredentials): Promise<void> => {
  try {
    // First check if user exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      throw new Error('Email already registered');
    }

    // If user doesn't exist, proceed with registration
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role,
        },
      },
    });

    if (error) throw error;

    toast.success('Registration successful! Please check your email to verify your account.');
  } catch (error: any) {
    toast.error(error.message);
    throw error;
  }
};