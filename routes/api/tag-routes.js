const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  console.log()
  // find all tags
  // be sure to include its associated Product data
  try {
    const TagData = await Tag.findAll(req.params.id, {
      include: [{ model: Product, 
       through: ProductTag}], 
    });

    if (!TagData) {
      res.status(404).json({ message: "No Tag found with that id"});
       return;
     }
     res.status(200).json(TagData);  
  }   catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
    try {
      const TagData = await Tag.findByPk(req.params.id, {
        include: [{ model: Product }],
      });
      if (!TagData) {
        res.status(404).json({ message: "No Tag found with that id"});
         return;
       }
       res.status(200).json(TagData);  
    }   catch (err) {
      res.status(500).json(err);
    }
   });


router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((Tag) => {
     
      res.status(200).json(Tag);
    })
    
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});
  


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const TagData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if(!TagData) {
      res.status(404).json({ message: "No Tag found with that id!"});
      return;
    }

    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
  })

});

module.exports = router;
