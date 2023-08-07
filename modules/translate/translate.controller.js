import { Translates } from "../../models/Translates.js";

export const getAllTranslates = async (req, res) => {
    try {
        const translates = await Translates.find({});

        return res.status(200).json(translates);
    } catch (error) {
        return res.status(200).json(error);
    }
};

export const getPageTranslates = async (req, res) => {
    const { page } = req.body;

    try {
        const translates = await Translates.findOne({ page });

        return res.status(200).json(translates.translates);
    } catch (error) {
        return res.status(200).json(error);
    }
};

export const create = async (req, res) => {
    const { translates, page, _id } = req.body;
    let trans;

    try {
        if (_id === null) {
            trans = await Translates.create({
                translates,
                page
            });
        } else {
            trans = await Translates.findByIdAndUpdate(_id, {
                page,
                translates
            },
            { new: true });
        }

        let updated = await Translates.find({});

        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// export const translateFindWithKey = async (req, res) => {
//     const { key } = req.query;

//     try {
//         const query = { [`translation.${key}`]: { $exists: true } };
//         const translateWithKey = await Translate.findOne(query);

//         return res.status(200).json(translateWithKey);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };

// export const updateTranslate = async (req, res) => {
//     const { _id, value } = req.body;
//     const { field } = req.params;

//     try {
//         const updatedTranslate = await Translate.findOneAndUpdate(
//             { _id },
//             { $set: { [`translation.${field}`]: value } },
//             { new: true }
//         );

//         return res.status(200).json(updatedTranslate);
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json(error)
//     }
// };

// export const deleteTranslate = async (req, res) => {
//     const { _id } = req.body;

//     try {
//         const deletedTranslate = await Translate.findOneAndDelete({ _id: _id });

//         return res.status(200).json(deletedTranslate);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };

// export const deleteManyTranslate = async (req, res) => {
//     const { _id } = req.body;

//     try {
//         const deleteMany = await Translate.deleteMany({ _id: _id });

//         return res.status(200).json(deleteMany);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };