const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  console.log();
  // find all tags
  // be sure to include its associated Product data
  try {
    const TagData = await Tag.findAll(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });

    if (!TagData) {
      res.status(404).json({ message: "No Tag found with that id" });
      return;
    }
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const TagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!TagData) {
      res.status(404).json({ message: "No Tag found with that id" });
      return;
    }
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async(req, res) => {
  // create a new tag
  try{
    const TagData = await Tag.create(req.body);

    res.status(200).json(TagData)
  }catch(err){
    res.status(500).json(err);
  }
    
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value

  try {
    const TagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const TagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!TagData) {
      res.status(404).json({ message: "No Tag found with that id!" });
      return;
    }

    res.status(200).json({ message: "tag has been deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
