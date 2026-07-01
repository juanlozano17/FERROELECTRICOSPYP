import { supabase } from '../supabase.js';

export const getRoles = async (req, res) => {
    try {
        const { data, error } = await supabase.from('roles').select('*');
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createRol = async (req, res) => {
    try {
        const { data, error } = await supabase.from('roles').insert([req.body]).select();
        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateRol = async (req, res) => {
    try {
        const { data, error } = await supabase.from('roles').update(req.body).eq('id_rol', req.params.id).select();
        if (error) throw error;
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteRol = async (req, res) => {
    try {
        const { error } = await supabase.from('roles').delete().eq('id_rol', req.params.id);
        if (error) throw error;
        res.status(200).json({ message: 'Rol eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};