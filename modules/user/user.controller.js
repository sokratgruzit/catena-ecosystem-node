import { User } from "../../models/User.js";

export async function getUserInfo(req, res) {
  try {
    let { address } = req.body;

    if (!address) return res.status(400).send("no address");
    address.toLowerCase();
    // const userId = req.userId;
    // if (!userId) return res.status(404).send("unauthorized");

    const user = await User.findOne({ address: address });

    return res.status(200).send({ user });
  } catch (e) {
    console.log(e);
    return res.status(404).send("no user or unauthorized");
  }
}

export async function makeProfile(req, res) {
  try {
    let { address, username, email, password } = req.body;

    if (!address) return res.status(400).send("no address");

    const foundUser = await User.findOne({ address });

    if (!foundUser) return res.status(400).send("no user found");

    const updatedUser = await User.findOneAndUpdate(
      { address },
      { username, email, password },
      { new: true },
    );

    res.status(200).send({ result: updatedUser });
  } catch (e) {
    console.log(e);
    return res.status(404).send("something wen wrong");
  }
}
