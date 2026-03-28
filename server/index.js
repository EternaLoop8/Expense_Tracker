import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "dotenv/config";
import todayspentrouter from "./routes/todayspentRoutes.js";
import transactionrouter from "./routes/transactionRoutes.js";
import portfoliorouter from "./routes/portfolioRoutes.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", todayspentrouter);
app.use("/api", transactionrouter);
app.use("/api", portfoliorouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));