import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const EditProfile = () => {
  const [debug, setDebug] = useState("Revisando...");

  useEffect(() => {
    const check = async () => {
      // 1. ¿Qué hay en el localstorage?
      const keys = Object.keys(localStorage);
      const sessionKey = keys.find(k => k.startsWith('sb-') && k.endsWith('-auth-token'));
      
      if (!sessionKey) {
        setDebug("NO HAY TOKEN EN LOCALSTORAGE. El login no está guardando la sesión.");
        return;
      }

      // 2. Intentar recuperar desde el cliente
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setDebug("EL LOCALSTORAGE TIENE TOKEN, PERO SUPABASE DICE QUE NO ES VÁLIDO.");
      } else {
        setDebug("SESIÓN ENCONTRADA. Usuario: " + data.session.user.email);
      }
    };
    check();
  }, []);

  return <h1>{debug}</h1>;
};

export default EditProfile;