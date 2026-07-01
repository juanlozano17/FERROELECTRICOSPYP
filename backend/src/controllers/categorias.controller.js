import { supabase } from '../supabase.js';

// 1. Obtener todas las categorías (GET)
export const getCategorias = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('categorias')
            .select('*');

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Buscar categoría por ID (GET)
export const getCategoriaById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('categorias')
            .select('*')
            .eq('idcategoria', id)
            .single();

        if (error) return res.status(404).json({ error: 'Categoría no encontrada' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Crear una nueva categoría (POST)
export const createCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;

        const { data, error } = await supabase
            .from('categorias')
            .insert([{ nombre }])
            .select();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Actualizar una categoría (PUT)
export const updateCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        const { data, error } = await supabase
            .from('categorias')
            .update({ nombre })
            .eq('idcategoria', id)
            .select();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. Eliminar una categoría (DELETE)
export const deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('categorias')
            .delete()
            .eq('idcategoria', id)
            .select();

        if (error) throw error;
        res.json({ message: 'Categoría eliminada correctamente', data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};