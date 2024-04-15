const express = require("express")
const router = express.Router()

const {
    getAllPosts,
} = require("../controllers/posts")

const {
    getAllMembers,
} = require("../controllers/members")

router.route("/").get(getAllPosts)
router.route("/publicmembers").get(getAllMembers)

module.exports = router