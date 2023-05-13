import { Persons } from '../../models/Persons.js';
import { imageUpload } from '../../utils/upload.js';

export const persons = async (req, res) => {
    const { title, status } = req.body;
    const randomString = Math.random().toString(15).slice(2, 30);

    if (!title || !status) {
        return res.status(400).send({
            message: "Fill all fealds"
        });
    }

    try {
        const image = await imageUpload(randomString, req.file, req.file.path, 'persons');

        const persons = await Persons.create({
            title: title,
            status: status,
            image: image
        });

        return res.status(200).json(persons);
    } catch (error) {
        return res.status(500).send({ error: "Error creating persons" });
    }
};

export const getAllPersons = async (req, res) => {
    try {
        const persons = await Persons.find();

        return res.status(200).json(persons);
    } catch (error) {
        return res.status(500).send({ error: "Error getting persons" });
    }
};