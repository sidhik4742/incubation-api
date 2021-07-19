const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

const url = "http://localhost:4000/api";

let gfs;
const conn = mongoose.connection;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

exports.uploadImage = (req, res) => {
  try {
    if (!req.file) return res.status(404).json("file not found");
    const imageURL = `${url}/file/${req.file.filename}`;
    res.status(200).json(imageURL);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const rs = gfs.createReadStream(file.filename);
    rs.pipe(res);
  } catch (error) {
    res.status(500).json(error);
  }
};
