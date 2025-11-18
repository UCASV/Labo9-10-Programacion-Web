import { db } from "../data/connection.js"; 

export const getSales = async (req, res) => {
    try {
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        
        // Consulta con JOIN: Obtener ventas con el nombre del cliente
        const query = `
            SELECT 
                s.id, 
                s.amount, 
                s.created_at, 
                c.name AS customer_name
            FROM sales s
            JOIN customers c ON s.id_customer = c.id
            ORDER BY s.created_at DESC;
        `;
        
        const result = await db.query(query);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No se encontraron ventas." });
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error al obtener ventas:", error.message);
        res.status(500).json({ message: "Error interno del servidor al obtener ventas." });
    }
};