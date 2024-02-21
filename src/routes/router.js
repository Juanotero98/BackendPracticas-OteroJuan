const { Router } = require("express");
const jwt = require("jsonwebtoken");

class RouterCustom {
  constructor() {
    this.router = Router(); // instanciar const router = Router()
    this.init();
  }

  getRouter() {
    return this.router; //module.exports
  }

  init() {} //EN CLASES HEREDADAS LAS VAMOS A DEFINIR

  generateCustomResponse = (req, res, next) => {
    res.sendSuccess = (payload) => res.send({ status: "success", payload });
    res.sendServerError = (error) =>
      res.status(500).send({ status: "error", error });
    res.sendUserError = (error) =>
      res.status(400).send({ status: "error", error });
    next();
  };

  // METODO PARA EJECUTAR CALLBACKS [MIDDL...,(REQ, RES)=>{}]
  applyCallback(callbacksArray) {
    //(REQ, RES, NEXT)
    return callbacksArray.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        console.log(error);
        params[1].status(500).send(error); //response
      }
    });
  }
  //policies ['PUBLIC' , 'USER', 'USER PREMIUM', 'ADMIN' ]

  handlePolicies = (policies) => (req, res, next) => {
    if (policies[0] == "PUBLIC") return next();
    const authHeaders = req.headers.authorization; // Bearer fasdhasfdahjhfaj
    if (!authHeaders)
      return res.status(401).send({ status: "error", error: "Unauthorized" });
    const token = authHeaders.split("")[1]; // ['Breaer', 'fafsgdgag']
    let user = jwt.verify(token, "CoderSecretoJsonWebToken");
    if (!policies.includes(user.normalize.toUpperCase()))
      return res
        .status(403)
        .send({ status: "error", error: "Not permissions" });
        req.user = user
        next()
  };

  get(path, policies, ...callbacksArray) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponse,
      this.applyCallback(callbacksArray)
    );
  }

  post(path, policies, ...callbacksArray) {
    this.router.post(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponse,
      this.applyCallback(callbacksArray)
    );
  }

  put(path, policies, ...callbacksArray) {
    this.router.put(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponse,
      this.applyCallback(callbacksArray)
    );
  }

  delete(path, policies, ...callbacksArray) {
    this.router.delete(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponse,
      this.applyCallback(callbacksArray)
    );
  }
}

module.exports = RouterCustom;
