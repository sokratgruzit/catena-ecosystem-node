import { VoiceMatter } from "../../models/VoiceMatter.js";
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
    const feedback = await VoiceMatter.create({
      userName: name,
      email: email,
      message: suggestion,
    });

    return res.status(200).json(feedback);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getAll = async (req, res) => {
  const { page, limit } = req.query;
  try {
    const {
      results: feedback,
      totalPages,
      currentPage,
    } = await paginateResults(VoiceMatter, {}, page, limit);

    return res.status(200).json({
      feedback,
      totalPages,
      currentPage,
    });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await VoiceMatter.findByIdAndDelete({ _id: req.params._id });
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (error) {
    console.error("Error getting FAFeedbackQ:", error);
    res.status(500).json({ error: "Failed to get Feedback" });
  }
};
