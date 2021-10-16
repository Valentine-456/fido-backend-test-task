const User = require("../models/UserModel");
const CRUDfactory = require("../utils/CRUDfactory");

const userFactory = new CRUDfactory(User);

exports.getAll = userFactory.getAll();
exports.createOne = userFactory.createOne();
exports.deleteOne = userFactory.deleteOne();
// exports.isLoggedIn
