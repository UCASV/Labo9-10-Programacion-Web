import React, { useState, useEffect } from 'react';

// URL del endpoint para listar ventas
const API_URL = "http://localhost:3010/api/sales"; 

const SalesList = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                // Petición fetch simple
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setSales(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSales();
    }, []);

    if (loading) return <p>Cargando ventas...</p>;
    if (error) return <p className="message-error">Error al cargar ventas: {error}</p>;

    return (
        <div className="list-wrapper">
            <h2>Ejercicio 4: Listado de Ventas con Cliente</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID Venta</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                        <th>Nombre del Cliente</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => (
                        <tr key={sale.id}>
                            <td>{sale.id}</td>
                            <td>${sale.amount}</td>
                            <td>{new Date(sale.created_at).toLocaleDateString()}</td>
                            <td>{sale.customer_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesList;