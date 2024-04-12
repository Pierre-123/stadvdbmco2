const pools = require('../conn/dbService')

const reportController = {
    getAmountAppointments: async () => {
        const [rows, field] = await pools.centralPool2.query(`
               SELECT COUNT(apptid) as amounta
               FROM VisMin
               `);
               const [rows2, field2] = await pools.centralPool.query(`
               SELECT COUNT(apptid) as amountb 
               FROM Luzon
               `)
               const jsonrows = JSON.parse(JSON.stringify(rows))
               const jsonrows2 = JSON.parse(JSON.stringify(rows2))
               console.log(jsonrows[0].amounta)
               console.log(jsonrows2[0].amountb)
               const row_processed = jsonrows[0].amounta + jsonrows2[0].amountb;
               return row_processed
   }
}

module.exports = reportController