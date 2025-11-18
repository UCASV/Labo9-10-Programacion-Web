import React, { useState } from 'react';

// URL del endpoint para registrar ventas
const API_URL = "http://localhost:3010/api/sales"; 

const SalesForm = () => {
    const [amount, setAmount] = useState('');
    const [idCustomer, setIdCustomer] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Registrando venta...');

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    amount: parseFloat(amount), 
                    id_customer: parseInt(idCustomer, 10)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al registrar la venta.');
            }

            setMessage(`Exito: ${data.message}`);
            setAmount('');
            setIdCustomer('');
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="form-container">
            <h2>Ejercicio 3: Registrar Nueva Venta</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Monto ($):</label>
                    <input
                        type="number"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>ID Cliente:</label>
                    <input
                        type="number"
                        value={idCustomer}
                        onChange={(e) => setIdCustomer(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="form-button">Registrar Venta</button>
            </form>
            {message && (
                <p className={message.startsWith() ? 'message-success' : 'message-error'}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default SalesForm;