export const searchTextFieldOpt = (text, SEARCH_TEXT_FIELD) => {
   return SEARCH_TEXT_FIELD.map((item) => ({
      // Perform Case-Insensitive Regular Expression Match (Mongo Doc)
      [item]: { $regex: new RegExp(text, 'i') },
   }));
};
