import { Persons } from '../../models/Persons.js';
import * as fs from 'fs';

export const persons = async (req, res) => {
    const { title, status } = req.body;
    const { userId } = req.userId;

    if (!userId) {
        return res.status(400).send({ error: "User isn't authenticated" });
    }

    const imagePath = req.file.path;
    const imagetargetPath = `uploads/${req.file.originalname}`

    if (!title || !status || !imagetargetPath) {
        return res.status(400).send({
            message: "Fill all fealds"
        });
    }

    fs.rename(imagePath, imagetargetPath, handleImageUploadError)

    try {
        const persons = await Persons.create({
            title: title,
            status: status,
            image: imagetargetPath
        });

        return res.status(200).json(persons);

    } catch (error) {
        return res.status(500).send({ error: "Error persons created" });
    }

};

export const handleImageUploadError = (error) => {
    if (error) {
        console.log(`image exception ${error}`)
    }
}

export const getAllPersons = async (req, res) => {
    try {
        const persons = await Persons.find();
        
        return res.status(200).json(persons);
    } catch (error) {
        return res.status(500).send({ error: "Error getting persons" });
    }
};