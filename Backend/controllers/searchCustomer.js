import { db } from "../data/connection.js"; 

export const searchCustomers = async (req, res) => {
    // 1. Obtener el parámetro 'code' de la URL query (GET /api/customers/search?code=XYZ)
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ message: "El parámetro 'code' es obligatorio." });
    }

    try {
        // 2. Ejecutar la consulta buscando por la columna 'code'
        // Consulta: SELECT * FROM customers WHERE code = $1; 
        const query = "SELECT id, name, address, phone, code FROM customers WHERE code = $1";
        // Pasamos el valor de la variable 'code' como parámetro ($1)
        const result = await db.query(query, [code]); 

        if (result.rows.length === 0) {
            return res.status(404).json({ message: `Cliente con código ${code} no encontrado.` });
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error al buscar clientes:", error.message);
        res.status(500).json({ message: "Error interno del servidor al buscar clientes." });
    }
};