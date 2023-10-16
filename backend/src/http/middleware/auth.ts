import MiddlewareFunc from "./middlewarefunc";

/**
 * requiresAuth() middleware requires the user to be authenticated. If authenticated,
 * the call to user object is attached to the request object, and the request is passed.
 * Else, the middleware responds with "Unauthenticated" message.
 * @param req 
 * @param res 
 * @param next 
 */
const requiresAuth: MiddlewareFunc = (req, res, next) => {
    // TODO: Implement this middleware.
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
const requiresMod: MiddlewareFunc = (req, res, next) => {
    // TODO: Implement this middleware.
    next();
};

export { requiresAuth, requiresMod };