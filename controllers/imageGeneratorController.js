const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const imageGnerator = async (req, res) => {
  const { prompt, imageSize } = req.body;
  if (prompt == "" || imageSize == "") {
    return res.status(300).json({
      success: false,
      error: "Prompt or image size should not be empty.",
    });
  }
  const sizes = ["small", "medium", "large"];
  if (!sizes.includes(imageSize)) {
    return res.status(400).json({
      success: false,
      error: "Image size should be small, medium, large",
    });
  }

  const imgSize =
    imageSize === "small"
      ? "256x256"
      : imageSize === "medium"
      ? "512x512"
      : "1024x1024";

  try {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
      prompt,
      n: 2,
      size: imgSize,
    });

    return res.status(200).json({
      success: true,
      imageUrl: response.data.data[0].url,
    });
  } catch (exception) {
    if (exception.response) {
      return res.status(exception.response.status).json({
        success: false,
        error: exception.response.data,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: exception.message,
      });
    }
  }
};

module.exports = { imageGnerator };
