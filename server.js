require("dotenv").config();
const app = require('./src/app');
const connectToDB = require('./src/config/db');

const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT || 3000;

connectToDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Startup aborted:", err.message);
        process.exit(1);
    });
