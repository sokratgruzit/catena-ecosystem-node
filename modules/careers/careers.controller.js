import { Career } from "../../models/Career.js";
import { paginateResults } from "../../utils/pagination.js";

const generateJobId = async (department) => {
    const latestPost = await Career.findOne({}, null, { sort: { createdAt: -1 } });
    const sequence = latestPost ? latestPost.sequence + 1 : 1;
    const paddedSequence = String(sequence).padStart(6, '0');
    const departmentAbbreviation = department.substring(0, 2).toUpperCase();
    return [`${departmentAbbreviation}${paddedSequence}`, sequence];
};

export const create = async (req, res) => {
    try {
        const {
            title,
            department,
            summary,
            responsibilities,
            requirements,
            benefits,
            about_core_multichain,
            worcking_at_core_multichain,
            how_we_work,
            job_level,
            salary_range_from,
            salary_range_to,
            career_languages,
            locations,
            type,
            featured,
            job_posting_from,
            job_posting_to,
        } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required." });
        }
        console.log(title.en["career.title"])

        const result = await generateJobId(department);
        let trimmedTitle = title.en["career.title"].split(' ').join('');
        const slug = `${trimmedTitle}_${result[0]}`;

        const career = await Career.create({
            title,
            department,
            summary,
            responsibilities,
            requirements,
            benefits,
            about_core_multichain,
            worcking_at_core_multichain,
            how_we_work,
            job_level,
            salary_range_from,
            salary_range_to,
            career_languages,
            locations,
            type,
            featured,
            job_posting_from,
            job_posting_to,
            job_id: result[0],
            slug,
            sequence: result[1] // Extract the sequence portion for numeric sorting
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
    department,
    summary,
    responsibilities,
    requirements,
    benefits,
    about_core_multichain,
    worcking_at_core_multichain,
    how_we_work,
    job_level,
    salary_range_from,
    salary_range_to,
    career_languages,
    locations,
    type,
    featured,
    job_posting_from,
    job_posting_to,
    slug,
  } = req.body;

  console.log(req.body);
  try {
    const updateCareer = await Career.findOneAndUpdate(
      { _id: _id },
      {
        title,
        department,
        summary,
        responsibilities,
        requirements,
        benefits,
        about_core_multichain,
        worcking_at_core_multichain,
        how_we_work,
        job_level,
        salary_range_from,
        salary_range_to,
        career_languages,
        locations,
        type,
        featured,
        job_posting_from,
        job_posting_to,
        slug,
      },
      { new: true }
    );
    if (!updateCareer) {
      return res.status(404).json({ error: "FAQ not found" });
    } else {
      res.status(200).json(updateCareer);
    }
  } catch (error) {
    console.error("Error updating FAQ:", error);
    res.status(500).json({ error: "Failed to update FAQ" });
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

export const getAllCareersSlug = async (req, res) => {
  try {
    const careers = await Career.find({}, { slug: 1, _id: 0 });

    return res.status(200).json(careers);
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
  const { slug } = req.body;
  try {
    const career = await Career.find({ slug });

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
