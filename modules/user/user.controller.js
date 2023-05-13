import { User } from "../../models/User.js";
import { imageUpload } from "../../utils/uploadImage.js";

export async function getUserInfo(req, res) {
  try {
    let { address } = req.body;

    if (!address) return res.status(400).send("no address");
    address = address.toLowerCase();

    // const userId = req.userId;
    // if (!userId) return res.status(404).send("unauthorized");

    const user = await User.findOne({ address: address });

    const returnUser = {
      fullname: user.fullname,
      email: user.email,
      mobile: user.mobile,
      dateOfBirth: user.dateOfBirth,
      nationality: user.nationality,
    };

    return res.status(200).send({ user: returnUser });
  } catch (e) {
    console.log(e);
    return res.status(404).send("no user or unauthorized");
  }
}

export async function makeProfile(req, res) {
  try {
    let { address, fullname, email, mobile, dateOfBirth, nationality } = req.body;

    if (!address) return res.status(400).send("no address");
    address = address.toLowerCase();

    const foundUser = await User.findOne({ address });
    if (!foundUser) return res.status(400).send("no user found");

    const file = req.file;

    const image = await imageUpload(address, req.file, "profile");
    const updatedUser = await User.findOneAndUpdate(
      { address },
      { fullname, email, mobile, dateOfBirth, nationality },
      { new: true },
    );

    res.status(200).send({ result: updatedUser });
  } catch (e) {
    console.log(e);
    return res.status(404).send("something wen wrong");
  }
}

// export async function makeProfile(req, res) {
//   try {
//     let { address, fullname, email, mobile, dateOfBirth, nationality } = req.body;
//     address = address.toLowerCase();

//     const image = await imageUpload(
//       address,
//       req.files.image,
//       req.files.image.path,
//       "profile",
//     );
//     const updatedUser = await User.findOneAndUpdate(
//       { address },
//       { fullname, email, mobile, dateOfBirth, nationality },
//       { new: true },
//     );

//     res.status(200).send({ result: updatedUser });
//   } catch (e) {
//     console.log(e);
//     return res.status(404).send("something went wrong");
//   }
// }
// export async function validateAddress(req, res, next) {
//   const form = formidable({ multiples: true });

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       console.error("Error", err);
//       throw err;
//     }

//     console.log(fields);
//     console.log(files);

//     let { address } = fields;

//     if (!address) return res.status(400).send("no address");
//     address = address.toLowerCase();

//     const foundUser = await User.findOne({ address });
//     if (!foundUser) return res.status(400).send("no user found");

//     req.body = fields; // save the fields to req.body so they can be used in the next middleware
//     req.files = files; // save the files to req.files so they can be used in the next middleware

//     next(); // Go to the next middleware
//   });
// }
