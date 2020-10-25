const crypto = require("crypto")
const dayjs = require("dayjs")
const axios = require("axios")

const { backendUrl, postCmdActionUrl } = require("../config")

module.exports = async (req, res) => {
  const { stationTag, stationName, tagName, status, operator } = req.body

  if (!tagName) return res.status(400).send({ Error: "tagName is required" })
  if (!status) return res.status(400).send({ Error: "status is required" })

  const transactionId = crypto.randomBytes(16).toString("hex")

  //Save the transaction into DB
  try {
    await axios.post(`${backendUrl}/actionMessage`, {
      transactionId,
      stationTag,
      tagName,
      status
    })
  } catch (error) {
    return res.status(400).send({ Error: error.message })
  }
  //Return response

  const data = {
    Message: {
      Header: {
        Type: "Cmd",
        Name: "Action",
        StationTag: stationTag || "HFDL",
        Station: stationName || "Halifax 66KV",
        MsgTime: dayjs().format("DD/MM/YYYY HH:mm:ss")
      },
      Body: {
        TagName: tagName,
        OutputStatus: status,
        Timeout: 20,
        Operator: operator || "John",
        TransactionId: transactionId
      }
    }
  }

  try {
    const response = await axios.post(postCmdActionUrl, data)
    return res.send(response.data)
  } catch (error) {
    return res.status(400).send({ Error: error.message })
  }
}
