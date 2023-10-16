interface Payload {
    email: string;
    firstName: string;
}

interface AuthTokenRepository {
    /**
     * createToken() takes user object and returns a token string
     * @param {Payload} payload
     */
    createToken(payload: Payload): string;

    /**
     * parseToken() takes a token, verifies it, and parses its content
     * @param {string }token
     */
    parseToken(token: string): Payload | null;
}

export { AuthTokenRepository, Payload };