const { Router, json } = require('express'); 
const router = Router();
const indexController = require('../controller/index.controller')
const reportController = require('../controller/report.controller')

router.get('/', async (req, res) => {
    try {
      console.log("put report here")
      const nAppointments = await reportController.getAmountAppointments();
      const cAppointments = 0;
      const nDPatients = 0;
      const nDDoctors = 0;

      res.render('report', {title: "Report", nAppointments: nAppointments, cAppointments: cAppointments, nDPatients: nDPatients, nDDoctors:nDDoctors})
    } catch (err) {
      console.log(err)
      res.render('report', {title: "Report"})
    }
  });
  module.exports = router;