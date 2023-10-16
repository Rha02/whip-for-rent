import { AuthTokenRepository, Payload } from "./repository";
import jwt from "jsonwebtoken";

const NewJWTAuthRepo = (jwtSecret: string): AuthTokenRepository => {
    const createToken = (payload: Payload): string => {
        const token = jwt.sign(payload, jwtSecret, { 
            algorithm: "HS256",
            expiresIn: "7d" 
        });

        return token;
    };

    const parseToken = (token: string): Payload | null => {
        try {
            const payload = jwt.verify(token, jwtSecret) as Payload;
            return payload;
        } catch (err) {
            return null;
        }
    };
    
    return {
        createToken,
        parseToken
    };
};

export default NewJWTAuthRepo;
