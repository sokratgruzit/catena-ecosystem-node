import { FAQ } from "../../models/FAQ.js";


export const create = async (req, res) => {
    try {
        const { question, answer } = req.body;
        console.log(question, answer)
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

export const findOneFAQ = async (req, res) => {
    try {
        let result = await FAQ.find({
         question: req.body.question 
        });
        console.log(req.body)
    
        res.status(200).json(result);
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: e.message });
    }
};

export const destroyOneFAQ = async (req, res) => {
    try {
        const result = await FAQ.deleteOne({ question: req.body.question });

        if (result.acknowledged === true) {
          return res.status(200).json({ message: "FAQ successuly deleted" });
        }
        res.status(400).json({ message: "Article deletion failed" });
      } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: e.message });
      }
};
