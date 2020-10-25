const express = require("express")

const port = process.env.WILLOWGLEN_CLIENT_PORT || 3031

const app = express()
app.use(express.json())
require("./routesC2")(app) // This is the routes for API that is provided by C2
require("./routesAS")(app) // This is the routes for API that is provided by Data Aggregation Server

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
