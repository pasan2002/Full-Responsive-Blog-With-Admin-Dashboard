const express = require("express")
const router = express.Router()

const {
    createPosts,
    getAllPosts,
    getPost,
    deletePost,
    editPost,
} = require("../controllers/posts")

router.route("/").post(createPosts).get(getAllPosts)
router.route("/:id").get(getPost).delete(deletePost).patch(editPost)


module.exports = router