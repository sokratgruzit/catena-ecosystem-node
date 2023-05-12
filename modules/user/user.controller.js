import { User } from "../../models/User.js";

export async function getUserInfo(req, res) {
  try {
    const userId = req.userId;

    if (!userId) return res.status(404).send("unauthorized");

    const user = await User.findOne({ _id: userId });

    const userData = { username: user?.username, email: user?.email };

    return res.status(200).send(userData);
  } catch (e) {
    return res.status(404).send("no user or unauthorized");
  }
}

export async function makeProfile(req, res) {
  try {
    let address = req.address;
    console.log(address);
  } catch (e) {
    console.log(e);
    return res.status(404).send("something wen wrong");
  }
}
