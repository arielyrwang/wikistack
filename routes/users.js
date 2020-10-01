const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send('get /wiki')
});

router.post('/', (req, res, next) => {
  res.send('post /wiki')
});

router.get('/', (req, res, next) => {
  res.send('get /wiki/add')
});



module.exports = router;
