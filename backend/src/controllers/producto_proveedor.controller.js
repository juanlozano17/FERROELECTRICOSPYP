import { supabase } from '../supabase.js';

// 1. OBTENER TODAS LAS ASOCIACIONES (GET)
export const getProductosProveedores = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('producto_proveedor')
            .select('*, producto(*), proveedores(*)'); 

        if (error) throw error;
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// 2. BUSCAR RELACIÓN POR ID (GET por ID)
export const getProductoProveedorById = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('producto_proveedor')
            .select('*, producto(*), proveedores(*)')
            .eq('idproducto_proveedor', id) 
            .single();

        if (error || !data) {
            return res.status(404).json({ error: 'Relación producto-proveedor no encontrada' });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// 3. ASOCIAR UN PRODUCTO A UN PROVEEDOR (POST)
export const createProductoProveedor = async (req, res) => {
    try {
        const { idproducto, idproveedor, precio_compra_actual } = req.body;
        
        const { data, error } = await supabase
            .from('producto_proveedor')
            .insert([{ idproducto, idproveedor, precio_compra_actual }])
            .select();

        if (error) throw error;
        return res.status(201).json({ 
            message: 'Asociación Producto-Proveedor registrada con éxito', 
            data: data[0] 
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// 4. ACTUALIZAR LA RELACIÓN (PUT)
export const updateProductoProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const { idproducto, idproveedor, precio_compra_actual } = req.body;

        const { data, error } = await supabase
            .from('producto_proveedor')
            .update({ idproducto, idproveedor, precio_compra_actual })
            .eq('idproducto_proveedor', id)
            .select();

        if (error) throw error;
        return res.status(200).json({ 
            message: 'Relación actualizada con éxito', 
            data: data[0] 
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// 5. ELIMINAR LA RELACIÓN (DELETE)
export const deleteProductoProveedor = async (req, res) => {
    try {
        const { id } = req.params; 

        const { data, error } = await supabase
            .from('producto_proveedor')
            .delete()
            .eq('idproducto_proveedor', id)
            .select();

        if (error) throw error;
        return res.status(200).json({ 
            message: 'Relación Producto-Proveedor eliminada correctamente',
            data 
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};