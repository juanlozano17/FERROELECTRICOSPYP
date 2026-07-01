import { supabase } from '../supabase.js';

// 1. Obtener todas las transportadoras (GET)
export const getTransportadoras = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('transportadora')
            .select('*');

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Buscar transportadora por ID (GET)
export const getTransportadoraById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('transportadora')
            .select('*')
            .eq('idtransportadora', id)
            .single();

        if (error) return res.status(404).json({ error: 'Transportadora no encontrada' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Crear una nueva transportadora (POST)
export const createTransportadora = async (req, res) => {
    try {
        const { telefono, nombre_transportadora, pagina_web } = req.body;

        const { data, error } = await supabase
            .from('transportadora')
            .insert([{ telefono, nombre_transportadora, pagina_web }])
            .select();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Actualizar una transportadora (PUT)
export const updateTransportadora = async (req, res) => {
    try {
        const { id } = req.params;
        const { telefono, nombre_transportadora, pagina_web } = req.body;

        const { data, error } = await supabase
            .from('transportadora')
            .update({ telefono, nombre_transportadora, pagina_web })
            .eq('idtransportadora', id)
            .select();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. Eliminar una transportadora (DELETE)
export const deleteTransportadora = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('transportadora')
            .delete()
            .eq('idtransportadora', id)
            .select();

        if (error) throw error;
        res.json({ message: 'Transportadora eliminada correctamente', data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};