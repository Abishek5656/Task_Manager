import express from "express"
import cors from "cors"
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['POST', 'GET', 'PUT', 'DELETE'],  
}));


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))


// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/task", taskRoutes)


export { app }