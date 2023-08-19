import { Feedback } from "../../models/Feedback.js";

export const create = async (req, res) => {
  const { email, name, suggestion } = req.body;
  console.log(req.body);

  if (!name || !email || !suggestion) {
    return res.status(400).send({
      message: "Fill all fields",
    });
  }

  try {
    const feedback = await Feedback.create({
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
  try {
    const feedback = await Feedback.find();
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (error) {
    console.error("Error getting FAFeedbackQ:", error);
    res.status(500).json({ error: "Failed to get Feedback" });
  }
};


export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete({ _id: req.params._id });
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (error) {
    console.error("Error getting FAFeedbackQ:", error);
    res.status(500).json({ error: "Failed to get Feedback" });
  }
}