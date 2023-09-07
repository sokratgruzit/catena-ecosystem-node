import { OpenPosition } from "../../models/OpenPosition.js";
import { paginateResults } from "../../utils/pagination.js";

const generateJobId = async (department) => {
  const latestPost = await OpenPosition.findOne({}, null, { sort: { createdAt: -1 } });
  const sequence = latestPost ? latestPost.sequence + 1 : 1;
  const paddedSequence = String(sequence).padStart(6, '0');
  const departmentAbbreviation = department.substring(0, 2).toUpperCase();
  const reference = departmentAbbreviation + paddedSequence;
  return [`${departmentAbbreviation}${paddedSequence}`, sequence, reference];
};

const compareJobPostingData = () => {
  const now = new Date();
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1, 
    0, 0, 0, 0 
  );
  
  const timeUntilMidnight = 19988; 
  // const timeUntilMidnight = midnight - now; 

  setTimeout(() => {
    try {
      const currentDate = new Date();
      
      OpenPosition.find({
        job_posting_from: { $lte: currentDate },
        job_posting_to: { $gte: currentDate },
      }, (error, openPositions) => {
        if (error) {
          console.error('Error fetching OpenPositions:', error);
          return;
        }

        const updatedOpenPositions = openPositions.map((position) => {
          const isActive = currentDate >= position.job_posting_from && currentDate <= position.job_posting_to;

          return {
            ...position.toObject(),
            active: isActive,
          };
        });

        console.log(updatedOpenPositions);

        compareJobPostingData();
      });
    } catch (error) {
      console.error('Error fetching OpenPositions:', error);
    }
  }, timeUntilMidnight);
};

compareJobPostingData();

console.log('date')
export const create = async (req, res) => {
  const {
    title,
    department,
    summary,
    responsibilities,
    requirements,
    benefits,
    about_catena,
    working_at_catena,
    how_we_work,
    job_level,
    salary_range_from,
    salary_range_to,
    languages,
    locations,
    type,
    featured,
    remote,
    job_posting_from,
    job_posting_to,
  } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required." });
  }

  const result = await generateJobId(department.en["department.departmentName"]);
  let trimmedTitle = title.en["openPosition.title"].replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
  const slug = `${trimmedTitle}_${result[0]}`;

  try {
    const openPosition = await OpenPosition.create({
      title,
      department,
      summary,
      responsibilities,
      requirements,
      benefits,
      about_catena,
      working_at_catena,
      how_we_work,
      job_level,
      salary_range_from,
      salary_range_to,
      languages,
      locations,
      type,
      featured,
      remote,
      job_posting_from,
      job_posting_to,
      job_id: result[0],
      reference: result[2],
      slug,
      sequence: result[1] // Extract the sequence portion for numeric sorting
    });

    return res.status(200).json(openPosition);
  } catch (error) {
    console.error('Error creating OpenPosition:', error);
    return res.status(500).json({ message: "Error creating OpenPosition.", error: error });
  }
};

export const deleteOpenPosition = async (req, res) => {
  const { _id } = req.body;
  console.log(_id)
  try {
    const removeOpenPosition = await OpenPosition.findOneAndDelete({ _id });
    if (!removeOpenPosition) {
      return res.status(404).json({ error: "Open Position not found" });
    }
    res.status(200).json({ message: "Open Position removed successfully" });
  } catch (error) {
    console.error("Error removing Open Position:", error);
    res.status(500).json({ error: "Failed to remove Open Position" });
  }
};

export const editOpenPosition = async (req, res) => {
  const {
    _id,
    title,
    department,
    summary,
    responsibilities,
    requirements,
    benefits,
    about_catena,
    working_at_catena,
    how_we_work,
    job_level,
    salary_range_from,
    salary_range_to,
    languages,
    locations,
    type,
    featured,
    remote,
    job_posting_from,
    job_posting_to,
    reference,
    slug,
  } = req.body;

  console.log(req.body);
  try {
    const updateOpenPosition = await OpenPosition.findOneAndUpdate(
      { _id: _id },
      {
        title,
        department,
        summary,
        responsibilities,
        requirements,
        benefits,
        about_catena,
        working_at_catena,
        how_we_work,
        job_level,
        salary_range_from,
        salary_range_to,
        languages,
        locations,
        type,
        featured,
        remote,
        job_posting_from,
        job_posting_to,
        reference,
        slug,
      },
      { new: true }
    );
    if (!updateOpenPosition) {
      return res.status(404).json({ error: "Open Position not found" });
    } else {
      res.status(200).json(updateOpenPosition);
    }
  } catch (error) {
    console.error("Error updating Open Position:", error);
    res.status(500).json({ error: "Failed to update Open Position" });
  }
};

export const getAllOpenPositions = async (req, res) => {
  const { page, limit } = req.query;

  try {
    const {
      results: openPosition,
      totalPages,
      currentPage,
    } = await paginateResults(OpenPosition, {}, page, limit);

    return res.status(200).json({
      openPosition,
      totalPages,
      currentPage,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getOneOpenPosition = async (req, res) => {
  const { slug } = req.body;
  try {
    const openPosition = await OpenPosition.findOne({ slug });
    return res.status(200).json(openPosition);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const getActiveOpenPositions = async (req, res) => {
  try {
    const openPosition = await OpenPosition.find({ active_status: true });

    return res.status(200).json(openPosition);
  } catch (error) {
    return req.status(500).send({ error: "Error Editing OpenPosition" });
  }
};

export const getFeaturedOpenPositions = async (req, res) => {
  const { page, limit } = req.query;

  try {
    const {
      results: openPosition,
      totalPages,
      currentPage,
    } = await paginateResults(OpenPosition, { featured: "Yes" }, page, limit);

    return res.status(200).json({
      openPosition,
      totalPages,
      currentPage,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getOpenPositionById = async (req, res) => {
  const { _id } = req.body;

  try {
    const openPosition = await OpenPosition.find({ _id });

    return res.status(200).json(openPosition);
  } catch (error) {
    return req.status(500).send({ error: "Error Editing OpenPosition" });
  }
};

export const getAllOpenPositionSlug = async (req, res) => {
  try {
    const openPosition = await OpenPosition.find({}, { slug: 1, _id: 0 });

    if (openPosition && openPosition.length > 0) {
      return res.status(200).json(openPosition);
    } else {
      return res.status(200).json([]);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
