import { Roles } from '../../models/Roles.js';

export const get = async (req, res) => {

    try {
        const result = await Roles.find()

        return res.status(200).json( result );
    } catch(error) {
        return res.status(500).send({ error: "Error to getting Roles" });
    }
};

export const create = async (req, res) => {
  try {
      const { name } = req.body;

      const result = await Roles.create({ name })

      res.status(200).json( result );
  } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: e.message });
  }
};

export const update = async (req, res) => {
  const { _id, name } = req.body;

  try {
      const updateToggleStatus = await Roles.findOneAndUpdate({ _id }, { name }, { new: true })
      console.log(_id, name)
      return res.status(200).send(updateToggleStatus);
  } catch(error) {
      return res.status(500).send({ error: "Failed to update" });
  }
};

export const deleteRole = async (req, res) => {
  const { _id } = req.body;

  try {
    const deleteMany = await Roles.deleteMany({ _id });

    return res.status(200).json(deleteMany);
  } catch (error) {
    return res.status(500).json(error);
  }
};