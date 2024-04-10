const pools = require('../conn/dbService')

const indexController = {
     getAllData: async () => {
          const [rows, field] = await pools.centralPool.query("SELECT * FROM Luzon LIMIT 100")
          return rows
     },
     getSearchData: async () => {
          const [rows, field] = await pools.centralPool.query(`
          SELECT * 
          FROM ?
          WHERE ? = ? 
          LIMIT 10
          `)
          return rows 
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