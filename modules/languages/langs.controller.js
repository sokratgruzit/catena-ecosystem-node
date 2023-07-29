import { Languages } from "../../models/Languages.js";

export const getLocales = async (req, res) => {
  try {
    const langs = await Languages.find();

    return res.status(200).json(langs);
  } catch (error) {
    return res.status(500).json(error);
  }
};
