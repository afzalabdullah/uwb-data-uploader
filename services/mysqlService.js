const mysql = require('mysql2/promise');

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: '13.60.233.30',
    user: 'root',     // Replace with your MySQL username
    password: 'abdullah.afzal',  // Replace with your MySQL password
    database: 'tracking'   // Replace with your MySQL database name
});

// Function to insert a read into the database
async function insertRead(readData) {
    const { transmitterSerialNumber, nodeType, timeStampUTC, deviceUID, manufacturerName, distance, count } = readData;

    const query = `
        INSERT INTO gateway_readings (transmitter_serial_number, node_type, time_stamp_utc, device_uid, manufacturer_name, distance, count, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const values = [transmitterSerialNumber, nodeType, timeStampUTC, deviceUID, manufacturerName, distance, count];

    const [result] = await pool.execute(query, values);
    return result;
}

module.exports = { insertRead };
