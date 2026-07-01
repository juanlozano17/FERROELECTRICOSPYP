import { supabase } from '../supabase.js';

// 1. Obtener todos los proveedores (GET)
export const getProveedores = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('proveedores')
            .select('*');

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Buscar proveedor por ID (GET)
export const getProveedorById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('proveedores')
            .select('*')
            .eq('idproveedor', id)
            .single();

        if (error) return res.status(404).json({ error: 'Proveedor no encontrado' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Crear un nuevo proveedor (POST)
export const createProveedor = async (req, res) => {
    try {
        const { nombre_proveedor, contacto, correo, telefono } = req.body;

        const { data, error } = await supabase
            .from('proveedores')
            .insert([{ nombre_proveedor, contacto, correo, telefono }])
            .select();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Actualizar un proveedor (PUT)
export const updateProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_proveedor, contacto, correo, telefono } = req.body;

        const { data, error } = await supabase
            .from('proveedores')
            .update({ nombre_proveedor, contacto, correo, telefono })
            .eq('idproveedor', id)
            .select();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. Eliminar un proveedor (DELETE)
export const deleteProveedor = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('proveedores')
            .delete()
            .eq('idproveedor', id)
            .select();

        if (error) throw error;
        res.json({ message: 'Proveedor eliminado correctamente', data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};