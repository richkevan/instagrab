const functions = require("firebase-functions");
const axios = require("axios");
const cheerio = require("cheerio");

exports.instaGrab = functions.https.onCall(async (data, context) => {
  functions.logger.info(data);
  const html = await axios(data.url);
  functions.logger.info(html);
  const $ = cheerio.load(html.data);
  functions.logger.info("Cheerio Loaded html: ", $);
  var imageString;
  if (data.radio === "image") {
    imageString = $("meta[property='og:image']").attr("content");
    functions.logger.info("Instagram Image URL: ", imageString);
  }
  if (data.radio === "video") {
    imageString = $("script[nonce='od0scHEf']").attr("contentUrl");
    functions.logger.info("Instagram Video URL: ", imageString);
  }
  return { type: data.radio, url: imageString };
});
