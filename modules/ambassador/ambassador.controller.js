import { Ambassador } from "../../models/Ambassador.js";
import { paginateResults } from "../../utils/pagination.js";

export const create = async (req, res) => {
  const { email, name, suggestion } = req.body;
  console.log(req.body);

  if (!name || !email || !suggestion) {
    return res.status(400).send({
      message: "Fill all fields",
    });
  }

  try {
    const ambassador = await Ambassador.create({
      userName: name,
      email: email,
      message: suggestion,
    });

    return res.status(200).json(ambassador);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getAll = async (req, res) => {
  const { page, limit } = req.query;
  try {
    const {
      results: ambassador,
      totalPages,
      currentPage,
    } = await paginateResults(Ambassador, {}, page, limit);

    return res.status(200).json({
      ambassador,
      totalPages,
      currentPage,
    });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const deleteAmbassador = async (req, res) => {
  try {
    const ambassador = await Ambassador.findByIdAndDelete({ _id: req.params._id });
    if (!ambassador) {
      return res.status(404).json({ error: "Ambassador not found" });
    }
    res.status(200).json(ambassador);
  } catch (error) {
    console.error("Error getting ambassador:", error);
    res.status(500).json({ error: "Failed to get ambassador" });
  }
};
