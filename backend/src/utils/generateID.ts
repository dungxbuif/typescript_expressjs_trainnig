import fs from 'fs';
import path from 'path';

const generate = (model: string) => {
   const ID_STORE = JSON.parse(fs.readFileSync(path.join(__dirname, 'ID.json'), 'utf-8'));

   if (!ID_STORE[model]) {
      ID_STORE[model] = {};
      ID_STORE[model].id = 0;
   }

   const ID = ID_STORE[model].id + 1;

   ID_STORE[model].id = ID;

   fs.writeFileSync(path.join(__dirname, 'ID.json'), JSON.stringify(ID_STORE));
   return ID;
};

export = generate;
