// models/middleware/filterDeletedMiddleware.js
const filterDeletedMiddleware = function(schema) {
    schema.pre(/^find/, function(next) {
        this.where({ isDeleted: false });
        next();
      });
    }      
  
  export default filterDeletedMiddleware;
  