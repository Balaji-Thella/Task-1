const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const userDB = mongoose.model("User");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/search", function (req, res, next) {
  let info = req.body;
  userDB
    .aggregate([
      {
        $match: {
          firstname: new RegExp(info.username, "i"),
        },
      },
      {
        $lookup: {
          from: "Policy",
          localField: "_id",
          foreignField: "user_id",
          as: "Policy_info",
        },
      },
      {
        $unwind: {
          path: "$Policy_info",
        },
      },
      {
        $project: {
          _id: 0,
          Policy_info: 1,
        },
      },
    ])
    .exec(function (err, resData) {
      if (err) {
        res.json({
          status: false,
          Message: "Something Went Wrong",
        });
      }
      if (resData) {
        res.json({
          status: true,
          data: resData,
        });
      } else {
        res.json({
          status: false,
          Message: "No Records Found",
        });
      }
    });
});

router.get("/userPolicy", function (req, res, next) {
  userDB
    .aggregate([
      {
        $lookup: {
          from: "Policy",
          localField: "_id",
          foreignField: "user_id",
          as: "Policy_info",
        },
      },
      {
        $unwind: {
          path: "$Policy_info",
        },
      },
    ])
    .exec(function (err, resData) {
      if (err) {
        res.json({
          status: false,
          Message: "Something Went Wrong",
        });
      }
      if (resData) {
        res.json({
          status: true,
          data: resData,
        });
      } else {
        res.json({
          status: false,
          Message: "No Records Found",
        });
      }
    });
});

module.exports = router;
