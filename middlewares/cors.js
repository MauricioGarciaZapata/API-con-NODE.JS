//instalo cors
import cors from "cors";

const ACCESS_ORIGIN = ["http://localhost:8090", "http://localhost:1234/movies","http://192.168.1.1:8080"];

export const validateCors = ({ acceptedOrigins = ACCESS_ORIGIN }={}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }
      if (!origin) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  });


  



