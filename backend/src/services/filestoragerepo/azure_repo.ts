import { BlobServiceClient } from "@azure/storage-blob";
import FileStorageRepository from "./repository";

const createImageName = (name: string): string => {
    return `${Date.now()}-${name}`;
};

const NewAzureRepo = (conn: string): FileStorageRepository => {
    const cli = BlobServiceClient.fromConnectionString(conn);
    const container = cli.getContainerClient("images");

    const uploadFile = async (file: Express.Multer.File): Promise<string> => {
        const filename = createImageName(file.originalname);
        const blockBlobClient = container.getBlockBlobClient(filename);
        await blockBlobClient.uploadData(file.buffer, {
            blobHTTPHeaders: {
                blobContentType: file.mimetype
            }
        });

        return filename;
    };

    const deleteFile = async (filename: string): Promise<void> => {
        const blockBlobClient = container.getBlockBlobClient(filename);
        await blockBlobClient.deleteIfExists();
    };

    const getFileUrl = async (filename: string): Promise<string> => {
        const blockBlobClient = container.getBlockBlobClient(filename);
        const exists = await blockBlobClient.exists();
        if (exists) {
            return blockBlobClient.url;
        }
        return "";
    };

    return {
        uploadFile,
        deleteFile,
        getFileUrl
    };
};

export default NewAzureRepo;