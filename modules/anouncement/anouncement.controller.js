import { Anouncement } from '../../models/Anouncements.js';
import { uploadImageMany } from '../../utils/uploadImageMany.js';
import { anouncementTranslate } from '../../models/Anouncements.Translate.js';

export const getAllAnouncement = async (req, res) => {
    try {
        const result = await Anouncement.find()
        .populate("anouncementTranslate")
        
        return res.status(200).json( result );
    } catch(error) {
        return res.status(500).send({ error: "Error to getting Anouncement" });
    }
};

export const createAnouncement = async (req, res) => {
    const { name, title, text, inner_descr, time, active_status, categoryId, userId, slug } = req.body;


    // if ( !name || !text || !inner_descr || !title ) {
    //     return res.status(400).send({
    //         message: "Fill all fealds"
    //     });
    // }

    const coverImageFiles = req.files['cover_image'];
    const ImageFiles = req.files['image'];
    const files = [...coverImageFiles, ...ImageFiles];

    try {
        const img = await uploadImageMany(userId, files, 'anouncement');

        const anouncement = await Anouncement.create({
            name: name,
            image: img[0],
            title: title,
            text: text,
            inner_descr: inner_descr,
            time: time,
            cover_image: img[1],
            active_status: active_status,
            category: categoryId,
            slug
        });

        await anouncementTranslate.create({
            name: name,
            title: title,
            text: text,
            inner_descr: inner_descr,
            anouncement: anouncement._id.toString()
        })

        return res.status(200).json(anouncement);
    } catch(error) {
        console.log(error)
        return res.status(500).json(error)
    }
};

export const updateActiveStatus = async (req, res) => {
    const { _id, active_status } = req.body;
    const filter = { _id };
    const update = { active_status };

    try {
        const updateToggleStatus = await Anouncement.findOneAndUpdate(filter, update, { new: true })

        return res.status(200).send(updateToggleStatus);
    } catch(error) {
        return res.status(500).send({ error: "Failed to update active status" });
    }
};

export const destroyOneAnouncement = async (req, res) => {
    try {
        const result = await Anouncement.deleteOne({ _id: req.body._id});

        if (result.acknowledged === true) {
          return res.status(200).json({ message: "Anouncement successuly deleted" });
        }
        res.status(400).json({ message: "Anouncement deletion failed" });
      } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: e.message });
      }
};
