import express from "express";

// imports de módulos para validaciones
import { verifyToken } from "../utils/middleware/index.js";

// Módulos controladores importados
import { SingIn } from "../controllers/signin.js";
import { SingUp } from "../controllers/signup.js";
import { displayHome } from "../controllers/displayHome.js";
import { getUserById, getUsers, getUsersDesc } from "../controllers/getUsers.js";
import { updateUser } from "../controllers/updateUser.js";
import { deleteUser } from "../controllers/deleteUser.js";
//endpoints Creados en el labo 10 
import { getCustomers } from "../controllers/getCustomers.js";
import { postSales } from "../controllers/postSales.js";
import { getSales } from "../controllers/getSales.js";
import { searchCustomers } from "../controllers/searchCustomer.js";
import { getSalesReport } from "../controllers/getSalesReport.js";
// creación del enrutador 
const router = express.Router();

// Routes
router.get("/", displayHome);
router.post("/signin", SingIn);
router.post("/signup", SingUp);
router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.put("/users/:id", verifyToken, updateUser);
router.delete('/users/:id', verifyToken, deleteUser);
//endpoints Creados en el labo 10 
router.get("/customers", getCustomers);
router.post("/sales", postSales);
router.get("/sales", getSales);
router.get("/customers/search", searchCustomers);
router.get("/sales/report", getSalesReport);
export default router;