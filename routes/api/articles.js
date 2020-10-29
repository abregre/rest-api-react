const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

//Article Model
const Article = require('../../models/Article');
const Category = require('../../models/Category');

//@GET /api/articles
//@desc Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    if (articles.length > 0) {
      res.json(articles);
    } else {
      res.status(404).json({ message: 'No articles found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//@GET /api/articles/:id
//@desc Get one article
router.get('/:id', getArticle, async (req, res) => {
  try {
    res.json(res.article);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//@POST /api/articles
//@desc Post an article
router.post(
  '/',
  [
    body('title', 'Title is required').not().isEmpty(),
    body('content', 'Article content is required').not().isEmpty(),
    body('category', 'Category should be chosen').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, content, description, category } = req.body;

      const newArticle = new Article({
        title,
        content,
        description,
        category,
      });

      article = await newArticle.save();
      res.status(201).json(article);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);

//@PATCH /api/articles/:id
//@desc Update article
router.patch('/:id', getArticle, async (req, res) => {
  try {
    const article = await res.article;

    let { content, description, category } = req.body;
    content == null ? (content = article.content) : content;
    description == null ? (description = article.description) : description;
    category == null ? (category = article.category) : category;

    const updatedArticle = await Article.updateOne(
      { _id: req.params.id },
      {
        $set: { content, description, category },
      }
    );

    if (updatedArticle) {
      res.status(201).json({
        success: true,
        message: `The article ${article.title} was updated`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//@DELETE /api/articles/:id
//@desc DELETE an article
router.delete('/:id', getArticle, async (req, res) => {
  try {
    const article = await res.article;
    article.remove();
    res.status(200).json({ success: true, description: 'article deleted' });
  } catch (err) {
    res.status(404).json({ success: false, message: "article doesn't exist" });
  }
});

//Get article by id middleware
async function getArticle(req, res, next) {
  let article;
  try {
    article = await Article.findById(req.params.id);
    if (article == null) {
      return res.status(404).json({ message: 'Cannot find article' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.article = article;
  next();
}

module.exports = router;
