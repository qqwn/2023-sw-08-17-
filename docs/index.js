const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const Swagger = require("../handler/swagger");
const auth = require("./api/auth/index");

class ApiDocs {
  #apiDocOption;
  #swagger;

  constructor() {
    this.#apiDocOption = {
      ...auth,
    };

    this.#swagger = new Swagger();
  }
  init() {
    this.#swagger.addAPI(this.#apiDocOption);
  }

  getSwaggerOption() {
    const { apiOption, setUpoption } = this.#swagger.getOption();
    const specs = swaggerJsDoc(apiOption);
    return {
      swaggerUI,
      specs,
      setUpoption,
    };
  }
}

module.exports = ApiDocs;