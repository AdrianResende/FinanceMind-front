/**
 * Tipos de resposta da API
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
  field?: string;
}

/**
 * Tipos comuns de entidades
 */
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
}

/**
 * Tipos de formulário
 */
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea';
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
}

/**
 * Tipos de estado de carregamento
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AsyncState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
  status: LoadingState;
}
