const axios = require("axios");
const { createHmac } = require("crypto");

const host = " https://api-bisnis.vocagame.com/v1/core";
const merchant_id = "0423ebfc-3032-4776-a7b4-b68ffc0a3c5e";
const secret_key =
  "32db521c87d7e1a6746637e02e69d7d51246baf805ca23e03915cda5e545b64a";
const callback_key = "VOCA_7490db96097f26811669606827199";

async function voca_curl(url, method = "get", data = {}) {
  try {
    const config = {
      method: method,
      url: url,
      headers: {
        "X-Merchant": merchant_id,
      },
      data,
    };
    const response = await axios(config);
    return response?.data;
  } catch (error) {
    return { message: "Internal Server Error | 500" };
  }
}

function generate_sinature(endpoint) {
  const signature = createHmac("sha256", secret_key)
    .update(merchant_id + endpoint)
    .digest("hex");

  return signature;
}

module.exports = {
  host,
  merchant_id,
  callback_key,
  secret_key,
  generate_sinature,
  voca_curl,
};
