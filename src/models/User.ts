export interface User {
  cpf?: string;
  email: string;
  password: string;
  type: string;
  role: string;
  full_name?: string | null;
  birth_date?: string | null;
  phone?: string | null;
  created_at?: Date;
  updated_at?: Date;
}
