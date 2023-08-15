const router = require("express").Router()
const categoryController = require("../controllers/categoryController")


router.get("/all_category", categoryController.getAllCategory)
// router.post("/add", categoryController.insertCategory)

module.exports = router