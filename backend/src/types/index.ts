import { User } from "@/models";
import { Request } from "express";

interface RequestWithUser extends Request {
    user?: () => Promise<User | null>;
}

export { RequestWithUser };