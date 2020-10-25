const axios = require("axios")
const { backendUrl } = require("../config")

module.exports = async (req, res) => {
  const { TagName, InputStatus } = req.body.Message.Body

  console.log({ TagName, InputStatus })

  try {
    await axios.patch(`${backendUrl}/devices?wgInputId=${TagName}`, {
      status: InputStatus
    })
    return res.send({ Status: "OK" })
  } catch (error) {
    return res.status(400).send({ Error: error.message })
  }
}
