import { Department } from "../../models/Department.js";

export const create = async (req, res) => {
  const {
    department_name,
    active_status
  } = req.body;

  console.log(req.body)

  if (!department_name) {
    return res.status(400).send({
      message: "Fill all fealds",
    });
  }

  let exists = await Department.findOne({ department_name });

  if (exists) {
    return res.status(200).json({ message: "Department already exists" });
  } else {
    try {
      const department = await Department.create({
        department_name,
        active_status
      });

      return res.status(200).json(department);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};

export const getAllDepartment = async (req, res) => {
  try {
    const department = await Department.find();

    return res.status(200).json(department);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteOne = async (req, res) => {
  const { _id } = req.body;

  try {
    const remove = await Department.findOneAndDelete({ _id });
    if (!remove) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json({ message: "Department removed successfully" });
  } catch (error) {
    console.error("Error removing Department:", error);
    res.status(500).json({ error: "Failed to remove Department" });
  }
};


export const updateDepartment = async (req, res) => {
  const { _id, department_name } = req.body;
  const filter = { _id };
  const update = { department_name };

  try {
    const updateToggleStatus = await Department.findOneAndUpdate(filter, update, {
      new: true,
    });

    return res.status(200).send(updateToggleStatus);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateActiveStatus = async (req, res) => {
  const { _id, active_status } = req.body;
  const filter = { _id };
  const update = { active_status };

  try {
    const updateToggleStatus = await Department.findOneAndUpdate(filter, update, {
      new: true,
    });

    return res.status(200).send(updateToggleStatus);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getOneDepartment = async (req, res) => {
  const { department_name } = req.body;
  try {
    const department = await Department.findOne({ department_name })

    return res.status(200).json(department);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getDepartmentWithActiveStatus = async (req, res) => {
  try {
    const DepartmentWithActiveStatus = await Department.find({
      active_status: true,
    })

    return res.status(200).json(DepartmentWithActiveStatus);
  } catch (error) {
    return res.status(500).json(error);
  }
};