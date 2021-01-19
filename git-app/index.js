const { getKeyword, getGifForKeyword, addComment } = require('./helpers');

const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    if (!body || body.action !== 'created' || !body.comment) {
      console.log('Not Comment Creation, Halting execution.');
      return {
        statusCode: 200,
        message: 'Not a comment.',
      };
    }

    const keyword = getKeyword(body.comment.body);
    const gifUrl = await getGifForKeyword(keyword);

    const commentUrl = body.issue.comments_url;
    const installationId = body.installation.id;

    await addComment(installationId, commentUrl, gifUrl, keyword);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Comment Added.',
      }),
    };
  } catch (err) {
    console.log('Error during complete processing.', err);

    // Always sending statusCode 200 since we don't need to show error on GitHub when this fails
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: false,
        message: 'Unable to send Gif back :(',
      }),
    };
  }
};

module.exports = {
  handler,
};
