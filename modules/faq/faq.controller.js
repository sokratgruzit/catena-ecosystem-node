import { Faq } from "../../models/Faq.js";
import { faqTranslate } from "../../models/Faq.Translate.js";
import { languages } from "../../utils/languages.js";

export const findOneFaq = async (req, res) => {
  try {
    let result = await Faq.find({
      question: req.body.question,
    });

    res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
};

export const findAllFaq = async (req, res) => {
  try {
    let result = await Faq.find({}).populate("faqTranslate");

    res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
};

export const create = async (req, res) => {
  try {
    let data = req.body;
    console.log(data);
    let slug = convertToSlug(data.en.question);
    let translatedData = [];
    const result = await Faq.create({ slug });
    for (let i = 0; i < languages.length; i++) {
      translatedData.push({
        lang: languages[i].code,
        question: data[languages[i].code]?.question,
        answer: data[languages[i].code]?.answer,
        faq: result._id.toString(),
      });
    }
    console.log(translatedData);
    await faqTranslate.insertMany(translatedData);

    const returnData = await Faq.aggregate([
      {
        $match: {
          _id: result._id,
        },
      },
      {
        $lookup: {
          from: "faqtranslates",
          localField: "_id",
          foreignField: "faq",
          as: "translations",
        },
      },
      {
        $addFields: {
          translations: {
            $arrayToObject: {
              $map: {
                input: "$translations",
                as: "faq",
                in: {
                  k: "$$faq.lang",
                  v: "$$faq",
                },
              },
            },
          },
        },
      },
    ]);
    return res.status(200).json(returnData);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
};

export const updateOneFaq = async (req, res) => {
  try {
    const { _id } = req.body;

    const result = await Faq.findOneAndUpdate({ _id }, req.body, {
      new: true,
    });

    res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const { _id } = req.body;

    const result = await Faq.findOneAndUpdate({ _id }, req.body, {
      new: true,
    });

    console.log(req.body);

    res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
};

function convertToSlug(title) {
  const slug = title
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s-]/g, "") // Remove non-word characters (except spaces and hyphens)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
    .trim(); // Remove leading/trailing spaces

  return slug;
}

export const deleteOneFaq = async (req, res) => {
  try {
    const result = await Faq.deleteOne({ _id: req.body._id });

    if (result.acknowledged === true) {
      return res.status(200).json({ message: "Faq successuly deleted" });
    }
    res.status(400).json({ message: "Faq deletion failed" });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
};
