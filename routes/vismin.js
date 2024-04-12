const { Router, json } = require('express'); 
const router = Router();
const indexController = require('../controller/index.controller')

router.get('/', async (req, res) => {
    try {
      const rows = await indexController.getSearchData("VisMin","")
      res.render('vismin', {title: "VisMin Node", rows: rows})
    } catch (err) {
      console.log(err)
      res.render('vismin', {title: "VisMin Node"})
    }
  });

  router.get('/search',  async (req, res) => {
    try {
      const rows = await indexController.getSearchData(req.query.database, req.query.search)
      /*if(typeof req.query.search === 'string'){
          console.log('req search is string')
      }
      console.log(req.query.database)
      console.log(req.query.search)*/
      console.log("Search attempted VisMin Node")
      res.render('vismin', {title: "VisMin Node", rows: rows})
    } catch (err) {
      console.log(err)
      res.render('vismin', {title: "VisMin Node"})
      
    }
  }) 


  module.exports = router;