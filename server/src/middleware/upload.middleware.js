import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
        cb(new Error("Only PDF files are allowed"), false);
    } else {
        cb(null, true);
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter,
});

export default upload;
