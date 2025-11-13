import { db } from "../data/connection.js"; 

export const postSales = async (req, res) => {
    // Campos requeridos: amount, id_customer [cite: 154]
    const { amount, id_customer } = req.body;

    if (!amount || !id_customer) {
        return res.status(400).json({ message: "Faltan campos obligatorios: amount e id_customer." });
    }

    try {
        // 1. Validar que id_customer exista en customers 
        const customerCheckQuery = "SELECT id FROM customers WHERE id = $1";
        const customerCheckResult = await db.query(customerCheckQuery, [id_customer]);

        if (customerCheckResult.rows.length === 0) {
            return res.status(404).json({ message: `Cliente con ID ${id_customer} no encontrado.` });
        }

        // 2. Insertar en sales con amount y created_at (usar NOW()) 
        const insertQuery = "INSERT INTO sales (amount, created_at, id_customer) VALUES ($1, NOW(), $2) RETURNING id";
        const insertResult = await db.query(insertQuery, [amount, id_customer]);

        res.status(201).json({ 
            message: "Venta registrada exitosamente.",
            saleId: insertResult.rows[0].id
        });
    } catch (error) {
        console.error("Error al registrar venta:", error.message);
        res.status(500).json({ message: "Error interno del servidor al registrar la venta." });
    }
};