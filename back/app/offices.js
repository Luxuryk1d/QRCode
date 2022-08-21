const router = require("express").Router();
const Office = require("../models/Offices");
const multer = require("multer");
const path = require("path");
const config = require("../config");
const {nanoid} = require("nanoid");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});
const upload = multer({storage});

router.get("/", async (req, res) => {
    try {
        const offices = await Office.find().sort({num: 1});
        res.send(offices);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get("/:id", async (req, res) => {
    const result = await Office.find({officeId: req.params.id});
    if (result) {
        res.send(result);
    } else {
        res.status(400).send("Office doesn't find");
    }
});

router.post("/", upload.single("image"), async (req, res) => {
    const officeData = req.body;
    if (req.file) {
        officeData.image = req.file.filename;
    }

    const office = new Office(officeData);
    try {
        await office.save();
        res.send(office);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.put("/:id", async (req,res) => {
    console.log(req.body)
     try {
         const result = await Office.findOneAndUpdate({officeId: req.params.id}, req.body);
         res.send(result);
     } catch (e) {
         res.sendStatus(400);
     }
});

router.delete("/:id", async (req, res) => {
    try {
        await Office.findOneAndDelete({officeId: req.params.id});
        res.send("Deleted");
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;