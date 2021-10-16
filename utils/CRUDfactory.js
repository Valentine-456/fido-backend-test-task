const catchAsync = require("./catchAsync");

class CRUDfactory {
  constructor(Model, uniqueModelField) {
    this.Model = Model;
    this.uniqueModelField = uniqueModelField;
  }

  getAll() {
    return catchAsync(async (req, res, next) => {
      const documents = await this.Model.find();

      res.status(200).json({
        status: "success",
        length: documents.length,
        data: documents,
      });
    });
  }

  createOne() {
    return catchAsync(async (req, res, next) => {
      const document = await this.Model.create(req.body);

      res.status(201).json({
        status: "success",
        data: document,
      });
    });
  }

  deleteOne() {
    return catchAsync(async (req, res, next) => {
      const uniqueFieldName = this.uniqueModelField;
      const uniqueValue = req.params[uniqueFieldName];

      await this.Model.findOneAndDelete({ [uniqueFieldName]: uniqueValue });

      res.status(204).json({
        status: "success",
        data: null,
      });
    });
  }
}

module.exports = CRUDfactory;
