import multer from 'multer';
import path from 'path';

const storageOpt = multer.diskStorage({
   destination: function (req, file, cb) {
      const dir = path.join(__dirname, `../public/avartar`);
      cb(null, dir);
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + '.jpg');
   },
});

export const storeAvatar = multer({ storage: storageOpt }).any();
