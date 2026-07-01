import { supabase } from '../supabase.js';

// 1. Obtener todos los detalles de ventas (GET)
export const getDetallesVenta = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('detalle_venta')
            .select('*');

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Buscar un detalle de venta por ID (GET)
export const getDetalleVentaById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('detalle_venta')
            .select('*')
            .eq('iddetalle_venta', id)
            .single();

        if (error) return res.status(404).json({ error: 'Detalle de venta no encontrado' });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Crear un nuevo detalle de venta (POST)
export const createDetalleVenta = async (req, res) => {
    try {
        const { idventa, idproducto, cantidad, precio_unitario, subtotal } = req.body;

        const { data, error } = await supabase
            .from('detalle_venta')
            .insert([{ idventa, idproducto, cantidad, precio_unitario, subtotal }])
            .select();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 4. Actualizar un detalle de venta (PUT)
export const updateDetalleVenta = async (req, res) => {
    try {
        const { id } = req.params;
        const { idventa, idproducto, cantidad, precio_unitario, subtotal } = req.body;

        const { data, error } = await supabase
            .from('detalle_venta')
            .update({ idventa, idproducto, cantidad, precio_unitario, subtotal })
            .eq('iddetalle_venta', id)
            .select();

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 5. Eliminar un detalle de venta (DELETE)
export const deleteDetalleVenta = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('detalle_venta')
            .delete()
            .eq('iddetalle_venta', id)
            .select();

        if (error) throw error;
        res.json({ message: 'Detalle de venta eliminado correctamente', data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};