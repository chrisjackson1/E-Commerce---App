const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const newCategoryData = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(newCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const newCategoryData = await Category.findByPk(req.params.id, {
      include: [Product],
    });

    if (!newCategoryData) {
      res.status(404).json({ message: "No Category found with that id!" });
      return;
    }
    res.status(200).json(newCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const newCategoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(newCategoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const findData = await Category.create(req.body);
    res.status(200).json(findData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const newCategoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!newCategoryData) {
      res.status(404).json({ message: "No Category found with that id!" });
      return;
    }

    res.status(200).json({ message: "Category has been deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
