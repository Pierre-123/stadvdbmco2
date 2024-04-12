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
   },
   getCompletedAppointments: async () => {
    const [rows, field] = await pools.centralPool2.query(`
               SELECT COUNT(status) as amounta
               FROM VisMin
               WHERE status='Completed'`);
               const [rows2, field2] = await pools.centralPool.query(`
               SELECT COUNT(status) as amountb 
               FROM Luzon
               WHERE status='Completed'`);
               const jsonrows = JSON.parse(JSON.stringify(rows))
               const jsonrows2 = JSON.parse(JSON.stringify(rows2))
               console.log(jsonrows[0].amounta)
               console.log(jsonrows2[0].amountb)
               const row_processed = jsonrows[0].amounta + jsonrows2[0].amountb;
               return row_processed
   },
   getDistinctDoctors: async() => {
    const [rows, field] = await pools.centralPool2.query(`
    SELECT COUNT(DISTINCT(doctorid)) as amounta
    FROM VisMin
    `);
    const [rows2, field2] = await pools.centralPool.query(`
    SELECT COUNT(DISTINCT(doctorid)) as amountb 
    FROM Luzon
    `)
    const jsonrows = JSON.parse(JSON.stringify(rows))
               const jsonrows2 = JSON.parse(JSON.stringify(rows2))
               console.log(jsonrows[0].amounta)
               console.log(jsonrows2[0].amountb)
               const row_processed = jsonrows[0].amounta + jsonrows2[0].amountb;
               return row_processed
   },
   getDistinctPatients: async () => {
    const [rows, field] = await pools.centralPool2.query(`
    SELECT COUNT(DISTINCT(pxid)) as amounta
    FROM VisMin
    `);
    const [rows2, field2] = await pools.centralPool.query(`
    SELECT COUNT(DISTINCT(pxid)) as amountb
    FROM Luzon
    `);
    const jsonrows = JSON.parse(JSON.stringify(rows))
    const jsonrows2 = JSON.parse(JSON.stringify(rows2))
    console.log(jsonrows[0].amounta)
    console.log(jsonrows2[0].amountb)
    const row_processed = jsonrows[0].amounta + jsonrows2[0].amountb;
    return row_processed
   },
   getAppointmentsYear: async () => {
    const [rows, field] = await pools.centralPool2.query(`
    SELECT YEAR(QueueDate),COUNT(QueueDate)
FROM VisMin
GROUP BY YEAR(QueueDate)
ORDER BY YEAR(QueueDate) DESC
    `);
    const [rows2, field2] = await pools.centralPool.query(`
    SELECT YEAR(QueueDate),COUNT(QueueDate)
FROM Luzon
GROUP BY YEAR(QueueDate)
ORDER BY YEAR(QueueDate) DESC
    `);
    const jsonrows = JSON.parse(JSON.stringify(rows))
    const jsonrows2 = JSON.parse(JSON.stringify(rows2))
    console.log(jsonrows)
    console.log(jsonrows2)
    const combinedCounts = {};
    jsonrows.forEach(row => {
        const year = row['YEAR(QueueDate)'];
        const count = row['COUNT(QueueDate)'];

        if (combinedCounts[year]) {
            combinedCounts[year] += count;
        } else {
            combinedCounts[year] = count;
        }
    });
    jsonrows2.forEach(row => {
        const year = row['YEAR(QueueDate)'];
        const count = row['COUNT(QueueDate)'];

        if (combinedCounts[year]) {
            combinedCounts[year] += count;
        } else {
            combinedCounts[year] = count;
        }
    });

    //console.log(combinedCounts);
    return combinedCounts;
   }
}

module.exports = reportController