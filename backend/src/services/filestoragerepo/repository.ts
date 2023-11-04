
interface FileStorageRepository {
    /**
     * uploadFile() uploads a file to the file storage service
     * @param file The file to upload
     * @returns The  name of the saved file
     */
    uploadFile(file: Express.Multer.File): Promise<string>;

    /**
     * deleteFile() deletes a file from the file storage service
     * @param filename The URL of the file to delete
     */
    deleteFile(filename: string): Promise<void>;

    /**
     * getFileUrl() gets the URL of a file from the file storage service
     * @param filename The URL of the file to get
     * @returns The URL of the file
     */
    getFileUrl(filename: string): Promise<string>;
}

export default FileStorageRepository;