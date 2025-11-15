import React, { useState, useEffect } from 'react';
const API_URL = "http://localhost:3010/api/sales/report"; 

const SalesReport = () => {
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setReport(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, []);

    if (loading) return <p>Generando reporte...</p>;
    if (error) return <p className="message-error">Error al generar reporte: {error}</p>;

    return (
        <div className="list-wrapper">
            <h2>Ejercicio 6: Reporte de Ventas por Cliente</h2>
            <table>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Total Ventas</th>
                    </tr>
                </thead>
                <tbody>
                    {report.map((item, index) => (
                        <tr key={index}>
                            <td>{item.customer_name}</td>
                            <td>${parseFloat(item.total_sales).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesReport;