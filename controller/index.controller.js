const pools = require('../conn/dbService')

const indexController = {
     getAllData: async () => {
          const [rows, field] = await pools.centralPool.query("SELECT * FROM Luzon LIMIT 100")
          //console.log(rows)
          return rows
     },
     getSearchData: async (database, variable) => {
          if (database == 'Luzon'){
               const [rows, field] = await pools.centralPool.query(`
               SELECT * 
               FROM ` + database + `
               WHERE apptid = ? 
               LIMIT 10
               `, [variable])
               return rows
          } else if (database =='VisMin'){
               const [rows, field] = await pools.centralPool2.query(`
               SELECT * 
               FROM ` + database + `
               WHERE apptid = ? 
               LIMIT 10
               `, [variable])
               return rows
          } /*else { //central does not work :(((
               const [rows, field] = await pools.centralPool2.query(`
               SELECT * 
               FROM ` + database + `
               WHERE apptid = ? 
               LIMIT 10
               `, [variable]);
               const [rows2, field2] = await pools.centralPool.query(`
               SELECT * 
               FROM ` + database + `
               WHERE apptid = ? 
               LIMIT 10
               `, [variable])
               var rows_processed = rows+rows2;
               return rows_processed
          }*/
          //var row_processed = JSON.parse(JSON.stringify(rows));
          //console.log(row_processed);
          //return row_processed
     }
     ,
     postData: async () => {
          try {
               const [rows, field] = await pools.centralPool.query(
               `INSERT INTO ? (apptid, pxid, doctorid, hospitalname, City, Province, RegionName, RegionCode, 
                               status, TimeQueued, QueueDate, StartTime, EndTime, type, Virtual)
                VALUES (?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,?, ?, ?, ?, ?)
           `,[])} catch(err) {
             console.log(err)
          }
     },
     searchDate: async() => {

     }
}
module.exports = indexController