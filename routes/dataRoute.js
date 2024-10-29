const express = require('express');
const moment = require('moment-timezone');
const mysqlService = require('../services/mysqlService');

const router = express.Router();

router.post('/data', async (req, res) => {
    // Access data from the Request Payload
    let jsonData = req.body;

    console.log('Received data via HTTP API:', jsonData);

    // Check if allCount is greater than zero
    if (jsonData.allCount > 0) {
        try {
            // Replace timeStampUTC with current PKT timestamp
            const currentPKT = moment().tz('Asia/Karachi').format('YYYY-MM-DD HH:mm:ss');
            const readsWithPKT = jsonData.reads.map(read => ({
                ...read,
                timeStampUTC: currentPKT  // Replace timeStampUTC with PKT timestamp
            }));

            // Prepare SQL insert statements
            const insertPromises = readsWithPKT.map(read => {
                return mysqlService.insertRead({
                    transmitterSerialNumber: jsonData.transmitterSerialNumber,
                    nodeType: jsonData.nodeType,
                    timeStampUTC: read.timeStampUTC,
                    deviceUID: read.deviceUID,
                    manufacturerName: read.manufacturerName,
                    distance: read.distance,
                    count: read.count
                });
            });

            // Execute all insert promises
            await Promise.all(insertPromises);
            console.log('Data stored in MySQL:', jsonData);
        } catch (error) {
            console.error('Error storing data in MySQL:', error);
            return res.status(500).send('Internal Server Error');
        }
    }

    res.send('Data received successfully!');
});

module.exports = router;
