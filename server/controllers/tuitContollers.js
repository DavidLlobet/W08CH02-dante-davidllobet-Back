const Tuit = require("../../DB/models/Tuit");

const getTuits = async (req, res, next) => {
  try {
    const tuits = await Tuit.find();
    return res.status(200).json(tuits);
  } catch {
    const error = new Error("Error loading the tuits.");
    return next(error);
  }
};

const getTuit = async (req, res, next) => {
  const { id } = req.params;
  try {
    const tuits = await Tuit.findById({ id });
    if (!tuits) {
      const error = new Error("Tuit not found.");
      error.status = 404;
      return next(error);
    }
    return res.status(200).json(tuits);
  } catch {
    const error = new Error("Error loading the tuits.");
    return next(error);
  }
};

const deleteTuit = async (req, res, next) => {
  const { id } = req.params;
  try {
    const tuit = await Tuit.findByIdAndDelete(id);
    if (!tuit) {
      const error = new Error("Tuit not found.");
      return next(error);
    }
    return res.status(200).json(id);
  } catch {
    const error = new Error("Error deleting the tuit.");
    return next(error);
  }
};

const createTuit = async (req, res, next) => {
  const { text } = req.body;
  try {
    const tuit = await Tuit.create({ text });
    return res.status(201).json(tuit);
  } catch {
    const error = new Error("Error creating the tuit.");
    return next(error);
  }
};

module.exports = { getTuits, deleteTuit, createTuit, getTuit };
