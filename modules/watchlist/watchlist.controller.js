import { Watchlist } from "../../models/Watchlist.js";

export const createOrUpdateWatchlist = async (req, res) => {
  const {
    user_id,
    token_id
  } = req.body;

  try {
    const userWatchlist = await Watchlist.findOne({ user_id });
    if (userWatchlist) {
      const { token_ids } = userWatchlist;
      let newTokenIds = token_ids.push(token_id);

      const updateWatchlist = await Watchlist.findOneAndUpdate({ user_id }, { token_ids: newTokenIds }, { new: true });

      if (!updateWatchlist) {
        return res.status(404).json({ error: "Career not found" });
      } else {
        res.status(200).json(updateWatchlist);
      }
    } else {
      const createWatchlist = await Watchlist.create({ user_id, token_id });
      res.status(200).json(createWatchlist);
    }
  } catch (error) {
    console.error("Error updating Career:", error);
    res.status(500).json({ error: "Failed to update Career" });
  }
};

export const getAllList = async (req, res) => {
  const { user_id } = req.body;

  try {
    const userWatchlist = await Watchlist.findOne({ user_id });

    return res.status(200).json(userWatchlist);
  } catch (error) {
    return res.status(500).json(error);
  }
};
