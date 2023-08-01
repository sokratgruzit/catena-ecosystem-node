import { Career } from "../../models/Carerr.js";
import fs from "fs";

export const create = async (req, res) => {
    const data = req.body;

    try {
        console.log(data);
        return res.status(200).json("hello");
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Error Creating Career" });
    }
};

export const deleteCareer = async (req, res) => {
    const data = req.body;

    try {
        console.log(data);
        return res.status(200).json("hello")

    } catch (error) {
        return res.status(500).send({ error: "Error Deleting Career" })
    }
};

export const editCareer = async (req, res) => {
    const data = req.body;

    try {
        console.log(data);
        return res.status(200).json("hello");
    } catch (error) {
        return req.status(500).send({ error: "Error Editing Career" })
    }
};

export const getAllCareers = async (req, res) => {
    const data = req.body;

    try {
        console.log(data);
        return res.status(200).json("hello");
    } catch (error) {
        return req.status(500).send({ error: "Error Editing Career" })
    }
};