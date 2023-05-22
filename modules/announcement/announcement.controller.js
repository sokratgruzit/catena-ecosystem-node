import { Announcement } from '../../models/Announcement.js';
import { uploadImageMany } from '../../utils/uploadImageMany.js';

export const findAllActiveAnnouncement = async (req, res) => {
  try {
    const result = await Announcement.find({
      active_status: true,
    })
      .exec();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const findByPagination = async (req, res) => {
  try {
    let limit = req.limit;
    let req_page = req.page;
    let data = {}; 

    let result = await Announcement
      .find(data)
      .sort({ createdAt: "desc" })
      .limit(limit)
      .skip(limit * (req_page - 1));

    let total_pages = await Announcement.count(data);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};


export const getAllAnnouncement = async (req, res) => {
    try {
        const result = await Announcement.find()

        return res.status(200).json( result );
    } catch(error) {
        return res.status(500).send({ error: "Error to getting Announcement" });
    }
};

export const createAnnouncement = async (req, res) => {
    const { name, title, text, inner_descr, time, active_status, categoryId, userId, slug } = req.body;


    // if ( !name || !text || !inner_descr || !title ) {
    //     return res.status(400).send({
    //         message: "Fill all fealds"
    //     });
    // }

    const coverImageFiles = req.files['cover_image'];
    const ImageFiles = req.files['image'];
    const files = [...coverImageFiles, ...ImageFiles];

    try {
        const img = await uploadImageMany(userId, files, 'announcement');

        const announcement = await Announcement.create({
            name: name,
            image: img[0],
            title: title,
            text: text,
            inner_descr: inner_descr,
            time: time,
            cover_image: img[1],
            active_status: active_status,
            category: categoryId,
            slug
        })

        return res.status(200).json(announcement);
    } catch(error) {
        console.log(error)
        return res.status(500).json( error )
    }
};

export const updateActiveStatus = async (req, res) => {
    const { _id, active_status } = req.body;
    const filter = { _id };
    const update = { active_status };

    try {
        const updateToggleStatus = await Announcement.findOneAndUpdate(filter, update, { new: true })

        return res.status(200).send(updateToggleStatus);
    } catch(error) {
        return res.status(500).send({ error: "Failed to update active status" });
    }
};

export const update = async (req, res) => {
  const { 
    _id, 
    name,
    title,
    text,
    badge,
    inner_descr} = req.body;
  const filter = { _id };
  const update = { title, text, badge, inner_descr, name };

  try {
      const updateToggleStatus = await Announcement.findOneAndUpdate(filter, update, { new: true })

      return res.status(200).send(updateToggleStatus);
  } catch(error) {
      return res.status(500).send({ error: "Failed to update active status" });
  }
};

export const destroyOneAnnouncement = async (req, res) => {
    try {
        const result = await Announcement.deleteOne({ _id: req.body._id});

        if (result.acknowledged === true) {
          return res.status(200).json({ message: "Announcement successuly deleted" });
        }
        res.status(400).json({ message: "Announcement deletion failed" });
      } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: e.message });
      }
};

export const deleteManyAnnouncement = async (req, res) => {
  const { _id } = req.body;

  try {
    const deleteMany = await Announcement.deleteMany({ _id: _id });

    return res.status(200).json(deleteMany);
  } catch (error) {
    return res.status(500).json(error);
  }
};