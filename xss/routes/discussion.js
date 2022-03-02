const express = require("express");
// import the xss package
const xss = require("xss");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/discussion");
});

router.get("/discussion", async function (req, res) {
  const comments = await db.getDb().collection("comments").find().toArray();
  res.render("discussion", { comments: comments });
});

router.post("/discussion/comment", async function (req, res) {
  const comment = {
    // apply the xss package for prevent the XSS attacks.
    // the xss package will sanitize and clean it and return the clean value.
    text: xss(req.body.comment),
  };

  await db.getDb().collection("comments").insertOne(comment);

  res.redirect("/discussion");
});

module.exports = router;
