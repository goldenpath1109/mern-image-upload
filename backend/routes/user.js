const router = require("express").Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const User = require("../models/user");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public");
	},
	filename: function (req, file, cb) {
		cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
	},
});

const fileFilter = (req, file, cb) => {
	const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
	if (allowedFileTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

let upload = multer({ storage, fileFilter });

router.route("/add").post(upload.single("photo"), (req, res) => {
	const url = req.protocol + "://" + req.get("host");
	const name = req.body.name;
	const birthdate = req.body.birthdate;
	const photo = url + "/public/" + req.file.filename;
	console.log(photo);

	console.log("req.file: ", req.file);

	const newUserData = {
		name,
		birthdate,
		photo,
	};

	const newUser = new User(newUserData);

	newUser
		.save()
		.then(() => res.json("User Added"))
		.catch((err) => res.status(400).json("Error: " + err));
});
router.get("/", (req, res, next) => {
	User.find().then((data) => {
		res.status(200).json({
			message: "User list retrieved successfully!",
			users: data,
		});
	});
});
module.exports = router;
