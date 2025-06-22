import dotenv from "dotenv";
dotenv.config({
    path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

export const {
    PORT,
    NODE_ENV,

    MONGODB_NAME,
    MONGODB_URI,

    ACCESS_SECRET,
    ACCESS_EXPIRATION,
    REFRESH_SECRET,
    REFRESH_EXPIRATION,

    ARCJET_KEY,
    ARCJET_ENV,

    REDIS_URL,
    
} = process.env;

console.log(NODE_ENV);
