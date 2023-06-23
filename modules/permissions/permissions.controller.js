import { Permissions } from '../../models/Permissions.js';

export const get = async (req, res) => {
  try {
    const result = await Permissions.find()

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).send({ error: "Error to getting permissions" });
  }
};

export const create = async (req, res) => {
  try {
      const { name } = req.body;

      const result = await Permissions.create({ name })

      res.status(200).json( result );
  } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: e.message });
  }
};

export const update = async (req, res) => {
  const { _id, name } = req.body;

  try {
      const updateToggleStatus = await Permissions.findOneAndUpdate({ _id }, { name }, { new: true })
      console.log(name)
      return res.status(200).send(updateToggleStatus);
  } catch(error) {
      return res.status(500).send({ error: "Failed to update active status" });
  }
};

export const deletePermission = async (req, res) => {
  const { _id } = req.body;

  try {
    const deleteMany = await Permissions.deleteMany({ _id });

    return res.status(200).json(deleteMany);
  } catch (error) {
    return res.status(500).json(error);
  }
};