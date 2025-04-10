import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import  {connectDB } from "./config/db";
import allRoutes from "./routes/allRoutes";


dotenv.config();

connectDB();

const app =express();

app.use(express.json());
app.use(morgan("dev"));
app.use(allRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
