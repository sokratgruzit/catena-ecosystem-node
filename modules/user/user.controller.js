import { User } from "../../models/User.js";

export const getUserInfo = async (req, res) => {
  const userId = req.userId;

  if (userId) {
    const user = await User.findOne({ _id: userId });

    const userData = { username: user?.username, email: user?.email };

    return res.status(200).send(userData);
  }

  return res.status(404).send("no user or unauthorized");
};
