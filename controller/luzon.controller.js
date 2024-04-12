const pools = require('../conn/dbService')
const iso_level_ru = `SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;` //just for reading
const iso_level_rc = `SET TRANSACTION ISOLATION LEVEL READ COMMITTED;` //can be used for insert-read
const start_query = `START TRANSACTION;`
const sleep = `DO SLEEP(10);`
const commit = `COMMIT;`
const search_step = iso_level_ru + start_query; // no sleep for slave >:(


const luzonController = {
     getLuzonData: async () => {
          {
               const [rows, field] = await pools.luzonPool.query(`
               SELECT * 
               FROM Luzon
               LIMIT 10
               `)
               return rows
          }
     },
     getLuzonSearch: async (variable) => {
          if(!variable){
               const [rows, field] = await pools.luzonPool.query(
          `SELECT * 
          FROM Luzon
          LIMIT 10
          `)
          return rows
          }
          pools.luzonPool.query(iso_level_ru)
          console.log(iso_level_ru)
          pools.luzonPool.query(start_query)
          console.log(start_query)
          const [rows, field] = await pools.luzonPool.query(
               `
          SELECT * 
          FROM Luzon
          WHERE apptid = ? 
          LIMIT 10
          `, [variable])
          pools.luzonPool.query(commit)
          return rows
     },
     deleteLuzonData: async (apptid) => {
          try{
               const [rows, field] = await pools.centralPool.query(
                    `DELETE FROM Luzon
                    WHERE apptid= ?`, [apptid])
          } catch (err) {
               console.log(err)
          }
     }
}

module.exports = luzonController