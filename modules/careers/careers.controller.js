import { Career } from "../../models/Career.js";
import { paginateResults } from "../../utils/pagination.js";

export const create = async (req, res) => {
    try {
        const {
            title,
            inner_descr
        } = req.body;

        if (!title || !inner_descr) {
            return res.status(400).json({ message: "Title is required." });
        }

        const career = await Career.create({
            title,
            inner_descr
        });

        return res.status(200).json(career);
    } catch (error) {
        console.error('Error creating career:', error);
        return res.status(500).json({ message: "Error creating career.", error: error });
    }
};

export const deleteCareer = async (req, res) => {
  const { _id } = req.body;
  try {
    const removeCareer = await Career.findOneAndDelete({ _id: _id });
    if (!removeCareer) {
      return res.status(404).json({ error: "Career not found" });
    }
    res.status(200).json({ message: "Career removed successfully" });
  } catch (error) {
    console.error("Error removing Career:", error);
    res.status(500).json({ error: "Failed to remove Career" });
  }
};

export const updateCareer = async (req, res) => {
  const {
    _id,
    title,
    inner_descr
  } = req.body;

  console.log(req.body);
  try {
    const updateCareer = await Career.findOneAndUpdate(
      { _id: _id },
      {
        title,
        inner_descr
      },
      { new: true }
    );
    if (!updateCareer) {
      return res.status(404).json({ error: "Career not found" });
    } else {
      res.status(200).json(updateCareer);
    }
  } catch (error) {
    console.error("Error updating Career:", error);
    res.status(500).json({ error: "Failed to update Career" });
  }
};

export const getAllCareers = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const {
      results: career,
      totalPages,
      currentPage,
    } = await paginateResults(Career, {}, page, limit);

    return res.status(200).json({
      career,
      totalPages,
      currentPage,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};


export const getOneCareer = async (req, res) => {
    const { slug } = req.body;
  
    try {
      const career = await Career.findOne({ slug });
      return res.status(200).json(career);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
  

export const getActiveCareers = async (req, res) => {
  try {
    const career = await Career.find({ active_status: true });

    return res.status(200).json(career);
  } catch (error) {
    return req.status(500).send({ error: "Error Editing Career" });
  }
};

export const getCareerById = async (req, res) => {
  const { _id } = req.body;
  try {
    const career = await Career.find({ _id });

    return res.status(200).json(career);
  } catch (error) {
    return req.status(500).send({ error: "Error Editing Career" });
  }
};

export const getAllCareerSlug = async (req, res) => {
  try {
    const career = await Career.find({}, { slug: 1, _id: 0 });

    if (career && career.length > 0) {
      return res.status(200).json(career);
    } else {
      return res.status(200).json([]);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
