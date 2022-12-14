const { mgdbClient } = require("../db/mongodb");

let userImageInfo = {};
mgdbClient().then(function (mongoose) {
  const userImageSchema = mongoose.Schema({
    mgdbimageId: String,
    piccontent: String,
    pictype: String,
  });
  userImageInfo = mongoose.model("userImageInfo", userImageSchema);
});

function addUserImage(userImage) {
  let addUserImageInfo = new userImageInfo({
    mgdbimageId: userImage.mgdbimageId,
    piccontent: userImage.piccontent,
    pictype: userImage.pictype,
  });
  addUserImageInfo.save();
}

module.exports = {
  addUserImage,
};
