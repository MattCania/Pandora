const express = require("express");
const path = require("path");
const router = express.Router();

const {UserProfile, ProfileImage} = require('../models')

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

router.post('/upload',  (req, res) => {

	upload(req, res, async (err) => {
	  if (err) {
		return res.status(500).json({ message: 'Error uploading file', error: err });
	  }
  
	  try {
		
		const userId = req.session.userId;

		if (!userId) {
			return res.status(401).json({ message: "User is not authenticated" });
		  }
		const profileImg = req.file.buffer; // Get the file as a buffer
  
		const newProfileImage = await ProfileImage.create({
		  userId: userId,
		  profileImg: profileImg,
		});
  
		res.status(200).json({
		  message: 'Profile image uploaded successfully',
		  profileImage: newProfileImage,
		});
	  } catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error saving profile image', error });
	  }
	});
  })

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// router.post("/upload", upload.single("image"), (req, res) => {
//   console.log(req.file);
//   console.log(req.body);

//   res.status(200).json({ message: "Successfully Uploaded" });
// });

module.exports = router;
