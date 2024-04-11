const { data } = require('jquery')
const pools = require('../conn/dbService')

const indexController = {
     getAllData: async () => {
          const [rows, field] = await pools.centralPool.query("SELECT * FROM Luzon.Luzon LIMIT 100")
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
          } /*else if (database =='Central'){ 
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
          }*/
     }
     ,
     postData: async (apptid, pxid, doctorid, hospitalname, City, Province, RegionCode, status, type, Virtual) => {
          try {
               type = 'Consultation';
               var Database;
               switch(RegionCode){
                    case 1:
                         RegionCode = 'I'
                         RegionName = 'Ilocos Region';
                         Database = 'Luzon';
                         break;
                    case 2:
                         RegionCode = 'II'
                         RegionName = 'Cagayan Valley';
                         Database = 'Luzon';
                         break;
                    case 3:
                         RegionCode = 'III'
                         RegionName = 'Central Luzon';
                         Database = 'Luzon';
                         break;
                    case 4:
                         RegionCode = 'IV-A'
                         RegionName = 'CALABARZON';
                         Database = 'Luzon';
                         break;
                    case 5:
                         RegionCode = 'IV-B'
                         RegionName = 'MIMAROPA';
                         Database = 'Luzon';
                         break;
                    case 6:
                         RegionCode = 'V'
                         RegionName = 'Bicol Region';
                         Database = 'Luzon';
                         break;
                    case 7:
                         RegionCode = 'VI'
                         RegionName = 'Western Visayas';
                         Database = 'VisMin';
                         break;
                    case 8:
                         RegionCode = 'VII'
                         RegionName = 'Central Visayas';
                         Database = 'VisMin';
                         break;
                    case 9:
                         RegionCode = 'VIII'
                         RegionName = 'Eastern Visayas';
                         Database = 'VisMin';
                         break;
                    case 10:
                         RegionCode = 'IX'
                         RegionName = 'Zamboanga Peninsula';
                         Database = 'VisMin';
                         break;
                    case 11:
                         RegionCode = 'X'
                         RegionName = 'Northern Mindanao';
                         Database = 'VisMin';
                         break;
                    case 12:
                         RegionCode = 'XI'
                         RegionName = 'Davao';
                         Database = 'VisMin';
                         break;
                    case 13:
                         RegionCode = 'XII'
                         RegionName = 'SOCCSKSARGEN';
                         Database = 'VisMin';
                         break;
                    case 14:
                         RegionCode = 'XIII'
                         RegionName = 'CARAGA';
                         Database = 'VisMin';
                         break;
                    case 15:
                         RegionCode = 'NCR'
                         RegionName = 'National Capital Region';
                         Database = 'Luzon';
                         break;
                    case 16:
                         RegionCode = 'CAR'
                         RegionName = 'Cordillera Administrative Region';
                         Database = 'Luzon';
                         break;
                    case 17:
                         RegionCode = 'ARMM'
                         RegionName = 'Autonomous Region in Muslim Mindanao';
                         Database = 'VisMin';
                         break;
                    case 18:
                         RegionCode = 'BARMM'
                         RegionName = 'Bangsamoro Autonomous Region in Muslim Mindanao';
                         Database = 'VisMin';
                         break;
                    default:
                         RegionName = 'Did not select';
                         Database = 'VisMin';
                         break;
               }
               console.log(RegionCode)
               console.log(RegionName)
               console.log(Database)
               
               const unprocessed_date = new Date();
               const year = unprocessed_date.getFullYear();
               const month = unprocessed_date.getMonth();
               const day = unprocessed_date.getDay();
               const hour = unprocessed_date.getHours();
               const min = unprocessed_date.getMinutes();
               const sec = unprocessed_date.getSeconds();

               const TimeQueued = `${year}-${month}-${day} ${hour}:${min}:${sec}`;
               const QueueDate = `${year}-${month}-${day} 16:00:00`;
               
               const StartTime=null, EndTime=null; //function for current time?? maybe just pass something idk maybe even null might be fine honestly
               

               if(Database='Luzon'){
                    const [rows, field] = await pools.centralPool.query(
                    `INSERT INTO Luzon (apptid, pxid, doctorid, hospitalname, City, Province, RegionName, RegionCode, 
                                    status, TimeQueued, QueueDate, StartTime, EndTime, type, \`Virtual\`)
                     VALUES (?, ?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,?, ?, ?, ?);
                `,[apptid, pxid, doctorid, hospitalname, City, Province, RegionName, RegionCode, status, TimeQueued, QueueDate, StartTime, EndTime, type, Virtual]);
                return rows;
               } 
               if (Database='VisMin'){
                    const [rows, field] = await pools.centralPool2.query(
                         `INSERT INTO VisMin (apptid, pxid, doctorid, hospitalname, City, Province, RegionName, RegionCode, 
                                         status, TimeQueued, QueueDate, StartTime, EndTime, type, \`Virtual\`)
                          VALUES (?, ?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,?, ?, ?);
                     `,[apptid, pxid, doctorid, hospitalname, City, Province, RegionName, RegionCode, status, TimeQueued, QueueDate, StartTime, EndTime, type, Virtual]);
                     return rows;
               }
               
          
          
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
                    const [rows, field] = await pools.centralPool.query(query, [hospitalname, City, Province, status, type, Virtual, apptid]);
               } else if (table === 'VisMin') {
                    query = `UPDATE VisMin 
                             SET hospitalname=?, City=?, Province=?, status=?, type=?, Virtual=?
                             WHERE apptid=?`;
                    const [rows, field] = await pools.centralPool2.query(query, [hospitalname, City, Province, status, type, Virtual, apptid]);
               } else {
                    // Handle invalid table name
                    throw new Error('Invalid table name specified');
               }
               return rows;
          } catch (err) {
               console.log(err);
               throw err; // Rethrow the error for handling at a higher level
          }
     },
     deleteData: async(apptid, regionCode) => {
          try{
               if(regionCode=='I'||regionCode=='II'||regionCode=='III'||regionCode=='IV-A'||regionCode=='IV-B'||regionCode=='V'||regionCode=='NCR'||regionCode=='CAR'){
                    const [rows, field] = await pools.centralPool.query(
                         `DELETE FROM Luzon
                         WHERE apptid= ?`, [apptid])
               } else{
                    const [rows, field] = await pools.centralPool2.query(
                         `DELETE FROM VisMin
                         WHERE apptid= ?`, [apptid])
               }
               
          } catch (err) {
               console.log(err)
          }
     }
}




module.exports = indexController