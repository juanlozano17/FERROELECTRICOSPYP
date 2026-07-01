import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Asegúrate de importar supabase aquí

const Register = () => {
    const [form, setForm] = useState({ 
        nombres: '', 
        apellidos: '', 
        telefono: '', 
        correo: '', 
        contrasena: '' 
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Insertamos en la tabla 'usuarios'
            const { error } = await supabase
                .from('usuarios')
                .insert([
                    { 
                        nombre: `${form.nombres} ${form.apellidos}`,
                        correo: form.correo,
                        contrasena: form.contrasena,
                        telefono: form.telefono,
                        id_rol: 2 // Rol 2 = Cliente
                    }
                ]);

            if (error) throw error;

            alert("¡Registro exitoso!");
            navigate('/login');
        } catch (err) {
            alert("Error al crear cuenta: " + err.message);
        }
    };

    return (
        <div className="container py-5">
            <form onSubmit={handleSubmit} className="card p-5 mx-auto shadow-lg border-0" style={{ maxWidth: '700px', borderRadius: '30px' }}>
                <h3 className="text-center mb-4 fw-bold">Crear cuenta</h3>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input className="form-control" placeholder="Nombres" required
                            onChange={e => setForm({...form, nombres: e.target.value})} />
                    </div>
                    <div className="col-md-6">
                        <input className="form-control" placeholder="Apellidos" required
                            onChange={e => setForm({...form, apellidos: e.target.value})} />
                    </div>
                    <div className="col-md-6">
                        <input className="form-control" placeholder="Correo electrónico" required
                            onChange={e => setForm({...form, correo: e.target.value})} />
                    </div>
                    <div className="col-md-6">
                        <input className="form-control" placeholder="Teléfono" required
                            onChange={e => setForm({...form, telefono: e.target.value})} />
                    </div>
                    <div className="col-12">
                        <input className="form-control" type="password" placeholder="Contraseña" required
                            onChange={e => setForm({...form, contrasena: e.target.value})} />
                    </div>
                </div>
                <button type="submit" className="btn btn-dark w-100 mt-4 py-2 rounded-pill fw-bold">Crear cuenta</button>
            </form>
        </div>
    );
};

export default Register;