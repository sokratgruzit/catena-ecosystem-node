import { Translate } from "../../models/Translate.js";

export const createTranslate = async (req, res) => {
    const { translation } = req.body;

    try {
        const translate = await Translate.create({
            translation: translation
        });

        return res.status(200).json(translate);
    } catch (error) {
        return res.status(500).json(error);
    }

};

export const translateFindWithKey = async (req, res) => {
    const { key } = req.query;
    
    try {
        const query = { [`translation.${key}`]: { $exists: true } };
        const translateWithKey = await Translate.findOne(query);

        return res.status(200).json(translateWithKey);
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const updateTranslate = async (req, res) => {
    const { _id, value } = req.body;
    const { field } = req.params;

    try {
        const updatedTranslate = await Translate.findOneAndUpdate(
            { _id },
            { $set: { [ `translation.${field}` ]: value } },
            { new: true }
        );

        return res.status(200).json(updatedTranslate);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
};

export const deleteTranslate = async (req, res) => {
    const { _id } = req.body;

    try {
        const deletedTranslate = await Translate.findOneAndDelete({ _id: _id });

        return res.status(200).json(deletedTranslate);
    } catch (error) {
        return res.status(500).json(error);
    }
};