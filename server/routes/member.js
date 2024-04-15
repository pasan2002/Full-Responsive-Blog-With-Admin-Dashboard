const express = require("express")
const router = express.Router()

const {
    createMembers,
    getAllMembers,
    getMember,
    deleteMember,
    editMember
} = require("../controllers/members")

router.route("/").post(createMembers).get(getAllMembers)
router.route("/:id").get(getMember).delete(deleteMember).patch(editMember)

module.exports = router