const router = require('express').Router();
const {addPage} = require('../views');

const { Page } = require("../models");

router.post('/', async (req, res, next) => {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  try {
    const page = await Page.create({
      title: 'title',
      content: 'content',
      slug: 'slug'
    });

    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect('/');
  } catch (error) { next(error) }
});

router.get('/',(req,res,next)=> {
  res.send('wiki GET')
});
router.post('/',(req,res,next)=> {
  res.json(req.body)
});
router.get('/add',(req,res,next)=> {
  // res.send('wiki/add/ GET');
  res.send(addPage());
});


module.exports = router;
