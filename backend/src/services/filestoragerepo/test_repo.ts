import FileStorageRepository from "./repository";

const NewTestFileStorageRepo = (): FileStorageRepository => {
    return {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        uploadFile: (file) => {
            return Promise.resolve("test_file");
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        deleteFile: (filename) => {
            return Promise.resolve();
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getFileUrl: (filename) => {
            return Promise.resolve("test_url");
        }
    };
};

export default NewTestFileStorageRepo;