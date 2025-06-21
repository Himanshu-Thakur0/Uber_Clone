import arcjet, {shield,detectBot,tokenBucket} from "@arcjet/node";
import { ARCJET_KEY } from "./env.ts";

const aj = arcjet({
  key: ARCJET_KEY as string,
  characteristics: ["ip.src"], // Track requests by IP
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: [
        "POSTMAN",
        
      ],
    }),
   
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10, 
      capacity: 10, 
    }),
  ],
})

export default aj;