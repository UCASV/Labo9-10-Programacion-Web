import { db } from "../data/connection.js"; 

export const postSales = async (req, res) => {
    // Asegúrate de que los datos llegan correctamente del frontend
    const { amount, id_customer } = req.body; 

    // console.log("Intentando registrar:", { amount, id_customer }); // Línea de depuración ÚTIL

    if (!amount || !id_customer) {
        return res.status(400).json({ message: "Faltan campos obligatorios: amount e id_customer." });
    }

    try {
        // 1. Validación de existencia del cliente
        // Si tienes problemas de conexión, el error ocurre AQUÍ o en el INSERT.
        const customerCheckQuery = "SELECT id FROM customers WHERE id = $1";
        const customerCheckResult = await db.query(customerCheckQuery, [id_customer]);

        if (customerCheckResult.rows.length === 0) {
            return res.status(404).json({ message: `Cliente con ID ${id_customer} no encontrado.` });
        }

        // 2. Inserción de la venta
        // Importante: PostgreSQL maneja los parámetros $1 y $2.
        const insertQuery = "INSERT INTO sales (amount, created_at, id_customer) VALUES ($1, NOW(), $2) RETURNING id";
        
        // El orden de los parámetros DEBE coincidir con el orden en la consulta
        const insertResult = await db.query(insertQuery, [amount, id_customer]);

        res.status(201).json({ 
            message: "Venta registrada exitosamente.",
            saleId: insertResult.rows[0].id
        });
    } catch (error) {
        // ¡ESTE ES EL MENSAJE QUE NECESITAS VER EN TU TERMINAL!
        console.error("Error al registrar venta:", error.message); 
        res.status(500).json({ message: "Error interno del servidor al registrar la venta." });
    }
};