const axios = require("axios")
const { backendUrl } = require("../config")

module.exports = async (req, res) => {
  const { OrigId, Result } = req.body.Message.Body

  let result = "T"
  if (Result == 0) result = "F"
  else if (Result == 1) result = "S"

  console.log({ OrigId, result })
  try {
    await axios.patch(`${backendUrl}/actionMessage?transactionId=${OrigId}`, {
      result
    })
    return res.send({ Status: "OK" })
  } catch (error) {
    return res.status(400).send({ Error: error.message })
  }
}
