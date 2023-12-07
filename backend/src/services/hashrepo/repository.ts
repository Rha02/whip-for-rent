interface HashRepository {
    /**
     * createHash() takes a value and returns its hash value
     * @param value 
     */
    createHash(value: string): Promise<string>;

    /**
     * verifyHash() takes a value and hashes it. It compares the results with the stored hash value
     * @param value 
     * @param hash 
     */
    verifyHash(value: string, hash: string): Promise<boolean>;
}

export { HashRepository };