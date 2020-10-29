const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');


//Category Model
const Category = require('../../models/Category');

//@GET /api/categories
//@desc Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
   
  } catch (err) {
    console.error(err);
  }
});
//@GET /api/categories/id
//@desc Get a category by id
router.get('/:id', getCategory, (req, res) => {
  res.json(res.category);
});

//@POST /api/categories
//@desc Post a category
router.post('/',  [
  body('name', 'Category name is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {name} = req.body
  try {
    let newCategory = await Category.findOne({name})
    if(newCategory){
      res.status(400).json({errors: [{msg: 'Category already exists'}]})
    }
    newCategory = new Category({
      name,
    });
    await newCategory.save();
    res.send(`Category ${name} created`)
  } catch (err) {
    console.error(err);    
    res.status(500).send('Server error')
  }
});

//@DELETE /api/categories/:id
//@desc DELETE a category by id
router.delete('/:id',getCategory , async (req, res) => {
    try{
        await res.category.remove()
        res.json({ success: true, description: 'category deleted' })
    }catch(err){
        res.status(500).json({ success: false, message: err.message })
    }
});

//@PATCH /api/categories/:id
//@desc Update a category's name
router.patch('/:id',getCategory , async (req, res) => {
    if(req.body.name !=null){
        res.category.name = req.body.name
    }
    try{
        const updatedCategory = await res.category.save()
        res.json(updatedCategory)
    }catch(err){
        res.status(400).json({message: err.message})
    }
});




//Get category by id middleware
 async function getCategory(req, res, next) {
  let category;
  try {
    category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: 'Cannot find category' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.category = category;
  next();
}

module.exports = router;
