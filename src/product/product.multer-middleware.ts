// import * as path from 'path';
// import * as fs from 'fs';
// import * as multer from 'multer';

// storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//     const dir = './productImg';
//     if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir);
//     }
//     cb(null, dir); // 文件保存的文件夹
//     },
//     filename: (req, file, cb) => {
//     const pName = req.body.p_name;
//     const ext = path.extname(file.originalname); // 获取文件扩展名
//     cb(null, `${pName}${ext}`); // 使用 p_name 作为文件名，后跟文件扩展名
//     },
// }),
