import React, { useState } from 'react';

// URL base del endpoint para búsqueda por código
const API_BASE_URL = "http://localhost:3010/api/customers/search"; 

const CustomerSearch = () => {
    const [searchCode, setSearchCode] = useState('');
    const [customer, setCustomer] = useState(null);
    const [message, setMessage] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setMessage('Buscando...');
        setCustomer(null);

        if (!searchCode) {
            setMessage('Por favor, ingresa un código de cliente.');
            return;
        }

        try {
            // URL con el parámetro de consulta
            const url = `${API_BASE_URL}?code=${searchCode}`;

            // Petición fetch simple
            const response = await fetch(url);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error en la búsqueda.');
            }

            if (data && data.length > 0) {
                setCustomer(data[0]);
                setMessage(`Cliente encontrado: ${data[0].name}`);
            } else {
                setMessage('Cliente no encontrado.');
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="form-container">
            <h2>Ejercicio 5: Buscar Cliente por Código</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Ingrese código (ej: CUST001)"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    required
                />
                <button type="submit" className="form-button">Buscar</button>
            </form>
            {message && <p className={message.startsWith() ? 'message-success' : 'message-error'}>{message}</p>}
            
            {customer && (
                <div className="result-box">
                    <h3>Resultado de Búsqueda</h3>
                    <p><strong>ID:</strong> {customer.id}</p>
                    <p><strong>Nombre:</strong> {customer.name}</p>
                    <p><strong>Código:</strong> {customer.code}</p>
                </div>
            )}
        </div>
    );
};

export default CustomerSearch;