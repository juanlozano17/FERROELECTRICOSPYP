import { supabase } from '../supabase.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 1. OBTENER TODOS LOS USUARIOS (GET)
export const getUsuarios = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('usuarios')
            .select('*');

        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. BUSCAR UN USUARIO POR ID (GET)
export const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('idusuario', id)
            .single();

        if (error || !data) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. REGISTRAR / CREAR NUEVO USUARIO (POST - Con Contraseña Encriptada)
export const createUsuario = async (req, res) => {
    const { id_rol, nombre, correo, contrasena } = req.body;
    try {
        // Encriptamos la clave antes de mandarla a Supabase
        const salt = await bcrypt.genSalt(10);
        const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);

        const { data, error } = await supabase
            .from('usuarios')
            .insert([{ 
                id_rol: id_rol || null, 
                nombre, 
                correo, 
                contrasena: contrasenaEncriptada 
            }])
            .select();

        if (error) throw error;
        res.status(201).json({ message: 'Usuario registrado con éxito', usuario: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. ACTUALIZAR UN USUARIO (PUT)
export const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { id_rol, nombre, correo, contrasena } = req.body;
    try {
        const datosActualizados = { nombre, correo, id_rol };

        // Si el usuario decide cambiar la contraseña en la actualización, también se encripta
        if (contrasena) {
            const salt = await bcrypt.genSalt(10);
            datosActualizados.contrasena = await bcrypt.hash(contrasena, salt);
        }

        const { data, error } = await supabase
            .from('usuarios')
            .update(datosActualizados)
            .eq('idusuario', id)
            .select();

        if (error) throw error;
        res.status(200).json({ message: 'Usuario actualizado con éxito', usuario: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. ELIMINAR UN USUARIO (DELETE)
export const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await supabase
            .from('usuarios')
            .delete()
            .eq('idusuario', id);

        if (error) throw error;
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 6. CONTROLADOR DE LOGIN: INICIO DE SESIÓN Y GENERACIÓN DE TOKEN JWT (POST)
export const loginUsuario = async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        // Buscar al usuario en Supabase comparando el correo electrónico
        const { data: usuario, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('correo', correo)
            .single();

        // Validar si el correo existe
        if (error || !usuario) {
            return res.status(404).json({ message: 'El correo no está registrado o el usuario no existe.' });
        }

        // Comparar la contraseña en texto plano con el hash encriptado de la BD
        const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
        
        if (!contrasenaValida) {
            return res.status(401).json({ message: 'Contraseña incorrecta. Inténtalo de nuevo.' });
        }

        // Crear el Token de seguridad firmado (Caduca en 2 horas)
        const token = jwt.sign(
            { id_usuario: usuario.idusuario, correo: usuario.correo },
            process.env.JWT_SECRET || 'FirmaSecretaSena2026',
            { expiresIn: '2h' }
        );

        // Responder con el pase de acceso
        res.status(200).json({
            message: `¡Bienvenido al sistema, ${usuario.nombre}!`,
            token: token
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};