import { db } from "../data/connection.js"; 

export const getCustomers = async (req, res) => {
    try {
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');

        // Consulta: SELECT * FROM customers;
        const query = "SELECT id, name, address, phone, code FROM customers";
        const result = await db.query(query);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No se encontraron clientes." });
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error al obtener clientes:", error.message);
        res.status(500).json({ message: "Error interno del servidor al obtener clientes." });
    }
};