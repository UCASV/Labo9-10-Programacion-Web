import { db } from "../data/connection.js";

export const getUsers = async (req, res) => {
  const { order } = req.query;
  if (order === "asc") return await getUsersAsc(req, res);

  await getUsersDesc(req, res);
};

export const getCustomers = async (req, res) =>{
    db.query("SELECT * FROM customers", async (error, results) => {
         if (error) {
      throw error;
    }

    const resultsFind = results.rows;
    const resultsLength = resultsFind.length ?? 0;

    return res.status(200).json({
      success: true,
      message: `customers found: ${resultsLength}`,
      resultsFind,
      });
    });
}