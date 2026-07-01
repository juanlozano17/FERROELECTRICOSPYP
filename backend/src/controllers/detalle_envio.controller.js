import { supabase } from '../supabase.js';

// OBTENER TODOS LOS DETALLES DE ENVÍO
export const getDetallesEnvio = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('detalle_envio')
            .select('*, registro_envio(*)'); // Trae también los datos del envío maestro si lo necesitas

        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// BUSCAR UN DETALLE DE ENVÍO POR ID
export const getDetalleEnvioById = async (req, res) => {
    const { id } = req.params;
    try {
        const { data, error } = await supabase
            .from('detalle_envio')
            .select('*')
            .eq('iddetalleenvio', id)
            .single();

        if (error || !data) return res.status(404).json({ message: 'Detalle de envío no encontrado' });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREAR UN NUEVO DETALLE DE ENVÍO
export const createDetalleEnvio = async (req, res) => {
    const { idenvio, calle, ciudad, codigo_postal, estado } = req.body;
    try {
        const { data, error } = await supabase
            .from('detalle_envio')
            .insert([{ 
                idenvio, 
                calle, 
                ciudad, 
                codigo_postal, 
                estado: estado || 'en proceso' 
            }])
            .select();

        if (error) throw error;
        res.status(201).json({ message: 'Detalle de envío registrado con éxito', detalle: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ACTUALIZAR EL ESTADO O DIRECCIÓN DEL ENVÍO
export const updateDetalleEnvio = async (req, res) => {
    const { id } = req.params;
    const { calle, ciudad, codigo_postal, estado } = req.body;
    try {
        const { data, error } = await supabase
            .from('detalle_envio')
            .update({ 
                calle, 
                ciudad, 
                codigo_postal, 
                estado,
                fecha_modificacion: new Date() // Setea la fecha de cambio automáticamente
            })
            .eq('iddetalleenvio', id)
            .select();

        if (error) throw error;
        res.status(200).json({ message: 'Dirección o estado de envío actualizado', detalle: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
