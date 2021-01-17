const handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      event,
      secret: process.env.SECRET,
    }),
  };
};

module.exports = {
  handler,
};
