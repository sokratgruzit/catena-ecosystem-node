import { Faq } from "../../models/Faq.js";


export const create = async (req, res) => {
    try {
        const { question, answer } = req.body;

        const result = await Faq.create({
            question: question,
            answer: answer
        })

        res.status(200).json({ message: "New Faq Created", result });
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: e.message });
    }
};

export const findOneFaq = async (req, res) => {
    try {
        let result = await Faq.find({
         question: req.body.question 
        });
    
        res.status(200).json(result);
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: e.message });
    }
};

export const findAllFaq = async (req, res) => {
    try {
        let result = await Faq.find({ });
    
        res.status(200).json(result);
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

        console.log(req.body)
    
        res.status(200).json( result );
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: e.message });
    }
};

export const destroyOneFaq = async (req, res) => {
    try {
        const result = await Faq.deleteOne({ _id: req.body._id});

        if (result.acknowledged === true) {
          return res.status(200).json({ message: "Faq successuly deleted" });
        }
        res.status(400).json({ message: "Faq deletion failed" });
      } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: e.message });
      }
};
