import { Career } from "../../models/Career.js";

export const create = async (req, res) => {
    const {
        title,
        inner_descr,
        slug,
        active_status,
        job_type,
        remote,
        department,
        responsibilities,
        requirements,
        benefits,
        working_at_core_multichain,
        how_we_work,
        about_core_multichain,
        job_level,
        lenguages,
        featured
    } = req.body;

    console.log(req.body)

    if (!title || !inner_descr || !slug || !job_type || !department || !responsibilities || !requirements || !job_level) {
        return res.status(400).send({
            message: "Fill all fealds",
        });
    }

    let exists = await Career.findOne({ slug });

    if (exists) {
        return res.status(200).json({ message: "already exists" });
    } else {
        try {
            const career = await Career.create({
                title,
                inner_descr,
                slug,
                active_status,
                job_type,
                remote,
                department,
                responsibilities,
                requirements,
                benefits,
                working_at_core_multichain,
                how_we_work,
                about_core_multichain,
                job_level,
                lenguages,
                featured
            });

            return res.status(200).json(career);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
};

export const deleteCareer = async (req, res) => {
    const { _id } = req.body
    try {
        const removeCareer = await Career.findOneAndDelete({ _id: _id });
        if (!removeCareer) {
            return res.status(404).json({ error: "FAQ not found" });
        }
        res.status(200).json({ message: "FAQ removed successfully" });
    } catch (error) {
        console.error("Error removing FAQ:", error);
        res.status(500).json({ error: "Failed to remove FAQ" });
    }
};

export const editCareer = async (req, res) => {
    const {
        _id,
        title,
        inner_descr,
        slug,
        active_status,
        job_type,
        remote,
        department,
        responsibilities,
        requirements,
        benefits,
        working_at_core_multichain,
        how_we_work,
        about_core_multichain,
        job_level,
        lenguages,
        featured
    } = req.body;

    console.log(req.body)
    try {
        const updateCareer = await Career.findOneAndUpdate(
            { _id: _id },
            {
                title,
                inner_descr,
                slug,
                active_status,
                job_type,
                remote,
                department,
                responsibilities,
                requirements,
                benefits,
                working_at_core_multichain,
                how_we_work,
                about_core_multichain,
                job_level,
                lenguages,
                featured
            },
            { new: true }
        );
        if (!updateCareer) {
            return res.status(404).json({ error: "FAQ not found" });
        } 
        else {
            res.status(200).json(updateCareer);
        }
    } catch (error) {
        console.error("Error updating FAQ:", error);
        res.status(500).json({ error: "Failed to update FAQ" });
    }
};

export const getAllCareers = async (req, res) => {
    try {
        const career = await Career.find();

        return res.status(200).json(career);
    } catch (error) {
        return req.status(500).send({ error: "Error Editing Career" })
    }
};

export const getActiveCareers = async (req, res) => {
    try {
        const career = await Career.find({ active_status: true });

        return res.status(200).json(career);
    } catch (error) {
        return req.status(500).send({ error: "Error Editing Career" })
    }
};