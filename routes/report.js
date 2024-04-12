const { Router, json } = require('express'); 
const router = Router();
const indexController = require('../controller/index.controller')
const reportController = require('../controller/report.controller')

router.get('/', async (req, res) => {
    try {
      console.log("put report here")
      const nAppointments = await reportController.getAmountAppointments();
      const cAppointments = await reportController.getCompletedAppointments();
      const nDPatients = await reportController.getDistinctPatients();
      const nDDoctors = await reportController.getDistinctDoctors();
      const nAppYear = await reportController.getAppointmentsYear();
      console.log(nAppYear);
      res.render('report', {title: "Report", nAppointments: nAppointments, cAppointments: cAppointments, nDPatients: nDPatients, nDDoctors:nDDoctors, nAppYear: nAppYear})
    } catch (err) {
      console.log(err)
      res.render('report', {title: "Report"})
    }
  });
  module.exports = router;