import { createClient } from '@supabase/supabase-js'; // <-- ¡CORREGIDO AQUÍ CON supabase-js!
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Inicializar la conexión global
export const supabase = createClient(supabaseUrl, supabaseKey);