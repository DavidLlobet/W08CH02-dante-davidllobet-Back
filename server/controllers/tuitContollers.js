const Tuit = require("../../DB/models/tuit");

const getTuits = async (req, res, next) => {
  try {
    const tuits = await Tuit.find();
    res.status(200).json(tuits);
  } catch {
    const error = new Error("Error loading the tuits");
    next(error);
  }
};

module.exports = { getTuits };
