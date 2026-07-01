import { supabase } from '../supabase.js';

// 1. Obtener todos los clientes (GET)
export const getClientes = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('cliente')
            .select('*');

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Buscar cliente por ID (GET) - 🔥 CORREGIDO 'idcliente'
export const getClienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('cliente')
            .select('*')
            .eq('idcliente', id) // ✅ Corregido: Tu columna real en la BD es idcliente
            .single();

        if (error || !data) return res.status(404).json({ error: 'Cliente no encontrado' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Registrar nuevo cliente (POST) - 🔥 CORREGIDO con tus columnas reales
export const createCliente = async (req, res) => {
    try {
        // ✅ Usamos los campos reales de tu Supabase: idusuario, direccion, nombre, apellido, telefono
        const { idusuario, direccion, nombre, apellido, telefono } = req.body; 

        const { data, error } = await supabase
            .from('cliente')
            .insert([{ idusuario, direccion, nombre, apellido, telefono }])
            .select();

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Actualizar cliente (PUT) - 🔥 CORREGIDO 'idcliente' y campos
export const updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { idusuario, direccion, nombre, apellido, telefono } = req.body;

        const { data, error } = await supabase
            .from('cliente')
            .update({ idusuario, direccion, nombre, apellido, telefono })
            .eq('idcliente', id) // ✅ Corregido: idcliente
            .select();

        if (error) throw error;
        res.json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. Eliminar cliente (DELETE) - 🔥 CORREGIDO 'idcliente'
export const deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('cliente')
            .delete()
            .eq('idcliente', id) // ✅ Corregido: idcliente
            .select();

        if (error) throw error;
        res.json({ message: 'Cliente eliminado correctamente', data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};