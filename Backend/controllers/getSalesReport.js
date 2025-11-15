import { db } from "../data/connection.js"; 

export const getSalesReport = async (req, res) => {
    try {
        // SOLUCIÓN: Deshabilitar explícitamente el caché (Para prevenir el status 304)
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        
        // Consulta con JOIN y GROUP BY para sumar ventas por cliente
        const query = `
            SELECT 
                c.name AS customer_name, 
                SUM(s.amount) AS total_sales
            FROM sales s
            JOIN customers c ON s.id_customer = c.id
            GROUP BY c.name
            ORDER BY total_sales DESC;
        `; // Consulta del Ejercicio 6
        
        const result = await db.query(query);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No se encontraron ventas para generar el reporte." });
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error al generar el reporte:", error.message); // <-- ¡BUSCA ESTE MENSAJE EN TU TERMINAL!
        res.status(500).json({ message: "Error interno del servidor al generar el reporte de ventas." });
    }
};