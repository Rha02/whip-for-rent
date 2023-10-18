// import Config from "@/config";
import { AppMiddlewareFunc } from "./middlewarefunc";

/**
 * requiresAuth() middleware requires the user to be authenticated. If authenticated,
 * the call to user object is attached to the request object, and the request is passed.
 * Else, the middleware responds with "Unauthenticated" message.
 * @param req 
 * @param res 
 * @param next 
 */
const requiresAuth: AppMiddlewareFunc = (app) => async (req, res, next) => {
    // Get authorization header from request
    const token = req.header("Authorization") as string;
    if (!token) {
        res.status(401).send("Unauthenticated");
        return;
    }

    // Parse token
    const cleanToken = token.replace('Bearer ', '');
    const payload = app.authTokenRepo.parseToken(cleanToken);
    if (!payload) {
        res.status(401).send("Unauthenticated");
        return;
    }

    // Attach function call to user object
    req.user = () => app.db.getUserByEmail(payload.email);

    next();
};


/**
 * requiresMod() middleware requires the user to be authenticated and to have moderator
 * privileges. If authenticated and is a moderator, the call to user object is attached
 * to the request object, and the request is passed. If user is unauthenticated, then the 
 * middleware responds with "Unauthenticated" message. If user is authenticated but is not
 * a moderator, then the middleware responds with "Unauthorized" message.
 * @param req 
 * @param res 
 * @param next 
 */
const requiresMod: AppMiddlewareFunc = (app) => async (req, res, next) => {
    // Get token from request header
    const token = req.header("Authorization") as string;
    if (!token) {
        res.status(401).send("Unauthenticated");
        return;
    }

    // Parse token
    const cleanToken = token.replace('Bearer ', '');
    const payload = app.authTokenRepo.parseToken(cleanToken);
    if (!payload) {
        res.status(401).send("Unauthenticated");
        return;
    }

    // Check if user is a moderator
    if (payload.accessLevel > 2) {
        res.status(403).send("Unauthorized");
        return;
    }

    // Attach function call to user object
    req.user = () => app.db.getUserByEmail(payload.email);

    app.authTokenRepo.parseToken(cleanToken);
    next();
};

export { requiresAuth, requiresMod };