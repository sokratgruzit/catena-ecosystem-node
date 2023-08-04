import { Faq } from "../../models/Faq.js";

export const create = async (req, res) => {
  try {
    const { slug, active, translations } = req.body;

    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }

    const existingFaq = await Faq.findOne({ slug });

    if (existingFaq) {
      return res.status(409).json({ error: "Slug already exists" });
    }

    const newFaq = await Faq.create({ slug, active, translations });
    res.status(201).json(newFaq);
  } catch (error) {
    console.error("Error creating FAQ:", error);
    res.status(500).json({ error: "Failed to create FAQ" });
  }
};

export const update = async (req, res) => {
  try {
    const { slug, active, translations } = req.body;
    const updatedFaq = await Faq.findOneAndUpdate(
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
    const removedFaq = await Faq.findOneAndDelete({ _id: req.params._id }); 
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
    const allFaqs = await Faq.find({});

    if (!allFaqs || allFaqs.length === 0) {
      return res.status(404).json({ message: "No FAQs found" });
    }

    res.status(200).json(allFaqs);
  } catch (error) {
    console.error("Error retrieving FAQs:", error);
    res.status(500).json({ error: "Failed to get FAQs" });
  }
};
