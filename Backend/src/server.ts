import cors from "cors";
import { app } from "./app.ts";
import connectDB from "./config/db.ts";
import { PORT } from "./config/env.ts";


app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);


connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on https://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Mongo DB Connection Error : ", err);
    });
