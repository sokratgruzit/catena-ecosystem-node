import { Permissions } from '../../models/Permissions.js';

export const get = async (req, res) => {
  try {
    const result = await Permissions.find()

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send({ error: "Error to getting permissions" });
  }
};

export const update = async (req, res) => {
  const { _id, name } = req.body;

  const filter = { _id };
  const update = { name };
  try {
    const updateToggleStatus = await Permissions.findOneAndUpdate(filter, update, { new: true })

    return res.status(200).send(updateToggleStatus);
  } catch (error) {
    return res.status(500).send({ error: "Failed to update active status" });
  }
};

export const deletePermision = async (req, res) => {
  const { _id } = req.body;

  try {
    const deleteMany = await Permissions.deleteMany({ _id });

    return res.status(200).json(deleteMany);
  } catch (error) {
    return res.status(500).json(error);
  }
};