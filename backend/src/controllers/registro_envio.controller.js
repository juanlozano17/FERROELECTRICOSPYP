import { supabase } from '../supabase.js';

// 1. Obtener todos los registros de envío (GET)
export const getRegistrosEnvio = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('registro_envio')
            .select('*');

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Buscar un registro de envío por ID (GET)
export const getRegistroEnvioById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('registro_envio')
            .select('*')
            .eq('idenvio', id)
            .single();

        if (error) return res.status(404).json({ error: 'Registro de envío no encontrado' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Crear un nuevo registro de envío (POST)
export const createRegistroEnvio = async (req, res) => {
    try {
        const { idtransportadora, numero_guia, fecha_envio, estado, idventa } = req.body;

        const { data, error } = await supabase
            .from('registro_envio')
            .insert([{ idtransportadora, numero_guia, fecha_envio, estado, idventa }])
            .select();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Actualizar un registro de envío (PUT)
export const updateRegistroEnvio = async (req, res) => {
    try {
        const { id } = req.params;
        const { idtransportadora, numero_guia, fecha_envio, estado, idventa } = req.body;

        const { data, error } = await supabase
            .from('registro_envio')
            .update({ idtransportadora, numero_guia, fecha_envio, estado, idventa })
            .eq('idenvio', id)
            .select();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. Eliminar un registro de envío (DELETE)
export const deleteRegistroEnvio = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('registro_envio')
            .delete()
            .eq('idenvio', id)
            .select();

        if (error) throw error;
        res.json({ message: 'Registro de envío eliminado correctamente', data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};