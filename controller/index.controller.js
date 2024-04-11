const { data } = require('jquery')
const pools = require('../conn/dbService')

const indexController = {
     getAllData: async () => {
          const [rows, field] = await pools.centralPool.query("SELECT * FROM Luzon LIMIT 100")
          //console.log(rows)
          return rows
     },
     getSearchData: async (database, variable) => {
          if (!variable){ //if empty variable
               if(database=='Luzon'){
                    const [rows, field] = await pools.luzonPool.query(`
                    SELECT * 
                    FROM ` + database + `
                    LIMIT 10
                    `, [variable])
                    return rows
               } else if(database=='VisMin'){
                    const [rows, field] = await pools.visMinPool.query(`
                    SELECT * 
                    FROM ` + database + ` 
                    LIMIT 10
                    `, [variable])
                    return rows
               } else if (database =='Central'){ 
                    const [rows, field] = await pools.centralPool2.query(`
                    SELECT * 
                    FROM VisMin
                    LIMIT 5
                    `, [variable]);
                    const [rows2, field2] = await pools.centralPool.query(`
                    SELECT * 
                    FROM Luzon
                    LIMIT 5
                    `, [variable])
                    console.log(rows)
                    console.log(rows2)
                    const row_processed = rows.concat(rows2)
                    return row_processed
               }
          }
          if (database == 'Luzon'){
               const [rows, field] = await pools.luzonPool.query(`
               SELECT * 
               FROM ` + database + `
               WHERE apptid = ? 
               LIMIT 10
               `, [variable])
               return rows
          } else if (database =='VisMin'){
               const [rows, field] = await pools.visMinPool.query(`
               SELECT * 
               FROM ` + database + `
               WHERE apptid = ? 
               LIMIT 10
               `, [variable])
               return rows
          } else if (database =='Central'){ 
               const [rows, field] = await pools.centralPool2.query(`
               SELECT * 
               FROM VisMin
               WHERE apptid = ? 
               LIMIT 10
               `, [variable]);
               const [rows2, field2] = await pools.centralPool.query(`
               SELECT * 
               FROM Luzon
               WHERE apptid = ? 
               LIMIT 10
               `, [variable])
               console.log(rows)
               console.log(rows2)
               const row_processed = rows.concat(rows2)
               return row_processed
          }
     }
     ,
     postData: async (apptid, pxid, doctorid, hospitalname, City, Province, RegionCode, status, type, Virtual) => {
          try { //for TimeQueued idk what to do, maybe current time???
               const RegionName = RegionCode //stuff here to translate region name? maybe pass values too with region code or just have another dropdown??
               const TimeQueued="", QueueDate="", StartTime=null, EndTime=null; //function for current time?? maybe just pass something idk maybe even null might be fine honestly
               
               const [rows, field] = await pools.centralPool.query(
               `INSERT INTO ? (apptid, pxid, doctorid, hospitalname, City, Province, RegionName, RegionCode, 
                               status, TimeQueued, QueueDate, StartTime, EndTime, type, Virtual)
                VALUES (?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,?, ?, ?, ?, ?)
           `,[apptid, pxid, doctorid, hospitalname, City, Province, RegionName, RegionCode, status, TimeQueued, QueueDate, StartTime, EndTime, type, Virtual])
          
          
          } catch(err) {
             console.log(err)
          }
     },

     
     searchDate: async() => {

     },
    // updateData: async(apptid, table, hospitalname, City, Province, status, type, Virtual) => { //maybe need another page for updating values??? maybe, similar to creating but less fields I guess
     //     try{
      //         const [rows, field] = await pools.centralPool.query(//have if else statements for central1 or 2 either luzon or vismin to update accordingly.
       //             `UPDATE ?
        //            SET hospitalname=?, City=?, Province=?, status=?, type=?, Virtual=?
           //         WHERE apptid=?`, [table, hospitalname, City, Province, status, type, Virtual, apptid])
         // } catch(err) {
          //     console.log(err)
        //  }
     // },
  
     updateData: async (apptid, table, hospitalname, City, Province, status, type, Virtual) => {
          try {
               let query = '';
               if (table === 'Luzon') {
                    query = `UPDATE Luzon 
                             SET hospitalname=?, City=?, Province=?, status=?, type=?, Virtual=?
                             WHERE apptid=?`;
               } else if (table === 'VisMin') {
                    query = `UPDATE VisMin 
                             SET hospitalname=?, City=?, Province=?, status=?, type=?, Virtual=?
                             WHERE apptid=?`;
               } else if (table === 'Central')
               {
                    query = `UPDATE VisMin 
                             SET hospitalname=?, City=?, Province=?, status=?, type=?, Virtual=?
                             WHERE apptid=?`;
               }
               
               else {
                    // Handle invalid table name
                    throw new Error('Invalid table name specified');
               }
     
               const [rows, field] = await pools.centralPool.query(query, [hospitalname, City, Province, status, type, Virtual, apptid]);
               return rows;
          } catch (err) {
               console.log(err);
               throw err; // Rethrow the error for handling at a higher level
          }
     },
     


     deleteData: async(apptid) => {
          try{
               const [rows, field] = await pools.centralPool.query(
                    `DELETE FROM Luzon
                    WHERE apptid=?`, [apptid])
          } catch (err) {
               console.log(err)
          }
     }
}




module.exports = indexController