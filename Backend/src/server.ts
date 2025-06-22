import cors from "cors";
import { app } from "./app.ts";
import connectDB from "./config/db.ts";
import { PORT } from "./config/env.ts";
import redisClient from "./config/redis.ts";


app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);


(async () => {
  await redisClient.connect();
  console.log('Connected to Redis Cloud');

  connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Mongo DB Connection Error : ", err);
    });

})();



