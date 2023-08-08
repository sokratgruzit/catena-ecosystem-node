import { FAQ } from "../../models/Faq.js";

export const create = async (req, res) => {
  const { question, answer, slug, active_status } = req.body;

  if (!question || !answer) {
    return res.status(400).send({
      message: "Fill all fields",
    });
  }

  let exists = await FAQ.findOne({ slug });

  if (exists) {
    return res.status(200).json({ message: "FAQ already exists" });
  } else {
    try {
      const faq = await FAQ.create({
        question,
        answer,
        slug,
        active_status,
      });

      return res.status(200).json(faq);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};

export const update = async (req, res) => {
  try {
    const { slug, active, translations } = req.body;
    const updatedFaq = await FAQ.findOneAndUpdate(
      { _id: req.params._id },
      { slug, active, translations },
      { new: true }
    );
    if (!updatedFaq) {
      return res.status(404).json({ error: "FAQ not found" });
    }
    res.status(200).json(updatedFaq);
  } catch (error) {
    console.error("Error updating FAQ:", error);
    res.status(500).json({ error: "Failed to update FAQ" });
  }
};

export const remove = async (req, res) => {
  try {
    const removedFaq = await FAQ.findOneAndDelete({ _id: req.params._id });
    if (!removedFaq) {
      return res.status(404).json({ error: "FAQ not found" });
    }
    res.status(200).json({ message: "FAQ removed successfully" });
  } catch (error) {
    console.error("Error removing FAQ:", error);
    res.status(500).json({ error: "Failed to remove FAQ" });
  }
};

export const getAllFaq = async (req, res) => {
  try {
    const faq = await FAQ.find();
    if (!faq) {
      return res.status(404).json({ error: "FAQ not found" });
    }
    res.status(200).json(faq);
  } catch (error) {
    console.error("Error getting FAQ:", error);
    res.status(500).json({ error: "Failed to get FAQ" });
  }
};
