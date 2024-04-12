const { Router, json } = require('express'); 
const router = Router();
const visMinController = require('../controller/vismin.controller')

router.get('/', async (req, res) => {
    try {
      const rows = await visMinController.getVisMinData()
      res.render('vismin', {title: "VisMin Node", rows: rows})
    } catch (err) {
      console.log(err)
      res.render('vismin', {title: "VisMin Node"})
    }
  });

  router.get('/search', async (req, res) => {
    try{
      const rows = await visMinController.getVisMinSearch()
    } catch (err) {
      console.log(err)
      res.render('vismin', {title: "VisMin Node"})
    }
  })

  module.exports = router;