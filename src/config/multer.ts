import multer from 'multer';


//Usar o memoryStorage para manter o arquivo em memória e enviar direto pro cloudinary.

export default {

    storage: multer.memoryStorage(),
    limits: {

        fileSize: 4 * 1024 * 1024 // 4mb
    },
    fileFilter: (req: any, file: Express.Multer.File, cb: any) => {

        const allowedMimes = ["image/jpeg", "image/jpg", "image/png"]

        if(allowedMimes.includes(file.mimetype)){

            cb(null, true)
            
        } else {

            cb(new Error("Formato de arquivo inválido, formatos permitidos: JPG, JPEG, PNG."))
        }
    }
}