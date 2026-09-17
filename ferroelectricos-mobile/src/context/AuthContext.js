import React, { createContext, useState, useEffect, useContext } from 'react';
import bcrypt from 'bcryptjs';
import { supabase } from '../config/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función interna para traer los datos y el rol desde la tabla 'usuarios'
  const fetchUserProfile = async (authUser) => {
    if (!authUser) {
      setUser(null);
      return;
    }

    const { data: dbUser, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('correo', authUser.email)
      .single();

    if (error) {
      console.log('Error obteniendo perfil de usuario:', error.message);
      // Mantiene la sesión básica de Supabase Auth si falla la consulta
      setUser({ ...authUser, id_rol: 2 });
    } else {
      // Combina la sesión de Auth con los datos de la tabla (incluyendo id_rol)
      setUser({ ...authUser, ...dbUser });
    }
  };

  useEffect(() => {
    // Comprobar la sesión actual al cargar
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Escuchar cambios de autenticación
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    // Obtener los datos del rol para actualizar el estado global inmediatamente
    if (data?.user) {
      await fetchUserProfile(data.user);
    }
    return data;
  };

  const register = async (email, password, nombre) => {
    // 1. Crear el usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: nombre },
      },
    });

    if (authError) throw authError;

    // 2. Generar el salt e incriptar la contraseña de forma síncrona
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // 3. Insertar en la tabla 'usuarios' con id_rol = 2 (Cliente por defecto)
    if (authData?.user) {
      const { error: dbError } = await supabase.from('usuarios').insert([
        {
          nombre: nombre,
          correo: email,
          contrasena: hashedPassword,
          id_rol: 2,
        },
      ]);

      if (dbError) {
        console.log('Error insertando en la tabla usuarios:', dbError.message);
        throw dbError;
      }

      await fetchUserProfile(authData.user);
    }

    return authData;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);