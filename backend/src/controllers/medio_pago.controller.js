import { supabase } from '../supabase.js';

// 1. Obtener todos los medios de pago (GET)
export const getMediosPago = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('medio_de_pago')
            .select('*');

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Buscar medio de pago por ID (GET)
export const getMedioPagoById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('medio_de_pago')
            .select('*')
            .eq('idmedio_pago', id)
            .single();

        if (error) return res.status(404).json({ error: 'Medio de pago no encontrado' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Crear un nuevo medio de pago (POST)
export const createMedioPago = async (req, res) => {
    try {
        const { nombre, tipo_med } = req.body;

        const { data, error } = await supabase
            .from('medio_de_pago')
            .insert([{ nombre, tipo_med }])
            .select();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Actualizar un medio de pago (PUT)
export const updateMedioPago = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, tipo_med } = req.body;

        const { data, error } = await supabase
            .from('medio_de_pago')
            .update({ nombre, tipo_med })
            .eq('idmedio_pago', id)
            .select();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. Eliminar un medio de pago (DELETE)
export const deleteMedioPago = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('medio_de_pago')
            .delete()
            .eq('idmedio_pago', id)
            .select();

        if (error) throw error;
        res.json({ message: 'Medio de pago eliminado correctamente', data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};