const User = require("../models/user.model");
const { AnalyticsOpenCreateRoomModal } = require("../models/analytics.model");

exports.openCreateRoomModal = async (req, res) => {
  const userId = req.body.userId;

  console.log(req.body)

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const currentUser = await User.findOne({ _id: userId });

    if (!currentUser) {
      return res.status(401).send({ message: "User not found" });
    }
  
    const analytics = new AnalyticsOpenCreateRoomModal({ userId: currentUser._id});
    
    analytics.save()
  
    res.send({ message: "Success" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
 
};
