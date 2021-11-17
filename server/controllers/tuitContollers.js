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

module.exports = { getTuits, deleteTuit };
