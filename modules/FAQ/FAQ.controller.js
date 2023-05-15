import { FAQ } from "../../models/FAQ.js";


export const create = async (req, res) => {
    try {
        const { question, answer } = req.body;

        const result = await FAQ.create({
            question: question,
            answer: answer
        })

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
    
        res.status(200).json(result);
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: e.message });
    }
};

export const findAllFAQ = async (req, res) => {
    try {
        let result = await FAQ.find({ });
    
        res.status(200).json(result);
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: e.message });
    }
};

export const updateOneFAQ = async (req, res) => {
    try {
        const { _id } = req.body;
 
        const result = await FAQ.findOneAndUpdate({ _id }, req.body, {
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
 
        const result = await FAQ.findOneAndUpdate({ _id }, req.body, {
            new: true,
          });

        console.log(req.body)
    
        res.status(200).json( result );
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: e.message });
    }
};

export const destroyOneFAQ = async (req, res) => {
    try {
        const result = await FAQ.deleteOne({ _id: req.body._id});

        if (result.acknowledged === true) {
          return res.status(200).json({ message: "FAQ successuly deleted" });
        }
        res.status(400).json({ message: "FAQ deletion failed" });
      } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: e.message });
      }
};
