// require your server and launch it here
require('dotenv').config();
const server = require("./api/server")

const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
