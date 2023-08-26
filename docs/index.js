const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const Swagger = require("../handler/swagger");
const auth = require("./api/auth/index");
const user = require('./api/user/index');
const ranking = require('./api/ranking');


class ApiDocs {
  #apiDocOption;
  #swagger;

  constructor() {
    this.#apiDocOption = {
      ...auth,
      ...user,
      ...ranking,
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