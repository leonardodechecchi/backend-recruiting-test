import { Router } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  // is used to determine within which folder the uploaded files should be stored
  destination: function (request, file, cb) {
    cb(null, "uploads/");
  },
  // is used to determine what the file should be named inside the folder
  filename: function (request, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}.${file.originalname.split(".").pop()}`
    );
  },
});

// se non specifichi la destinazione "dest", i file non vengono scritti su disco
const upload = multer({ storage });

const multerRouter = Router();

multerRouter.post("/upload", upload.single("file"), (request, response) => {
  console.log(request.file);

  response.status(200).json({ message: "Upload completed" });
});

multerRouter.post("/uploads", upload.array("filename"), (request, response) => {
  console.log(request.files);
  response.status(200).json({ message: "Upload completed" });
});

export { multerRouter };
