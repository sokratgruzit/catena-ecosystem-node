import { FAQ } from "../../models/FAQ.js";

export const create = async (req, res) => {
  try {
    const { question, answer } = req.body;

    let result = new FAQ({
      question,
      answer,
    });

    result = await result.save();

    res.status(200).json({ message: "New FAQ Created", result });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
};
