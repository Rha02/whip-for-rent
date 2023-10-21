import { HashRepository } from "./repository";
import bcrypt from "bcrypt";

const NewBCryptHashRepo = (saltRounds: number): HashRepository => {
    const createHash = async (value: string): Promise<string> => {
        // Hashing the value with BCrypt
        try {
            const hashedPassword = await bcrypt.hash(value, saltRounds);
            return hashedPassword;

        } catch(error) {
            throw new Error('Error in hashing password');
        }
    };
    
    const verifyHash = async (value: string, hash: string): Promise<boolean> => {
        // Comparing value and hash with BCrypt
        try {
            return await bcrypt.compare(value, hash);
        } catch(error) {
            throw new Error('Error in comparing hashes');
        }
    };

    return {
        createHash,
        verifyHash
    };
};

export default NewBCryptHashRepo;