const router = require('express').Router();
const { addPage } = require('../views');

const { Page } = require("../models");

router.get('/', (req, res, next) => {
  res.send('got to GET /wiki/')
});

router.get('/add',(req, res, next)=> {
  // res.send('wiki/add/ GET');
  res.send(addPage());
});

router.post('/', async (req, res, next) => {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
      slug: req.body.slug
    });

    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect('/');
  } catch (error) { next(error) }
});


router.post('/',(req, res, next)=> {
  res.json(req.body)
});



module.exports = router;
