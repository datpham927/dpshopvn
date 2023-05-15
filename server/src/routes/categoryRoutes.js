const router = require("express").Router()
const categoryController = require("../controllers/categoryController")


router.post("/add", categoryController.insertCategory)
router.get("/all_category", categoryController.getAllCategory)

module.exports = router