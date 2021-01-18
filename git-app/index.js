const { getKeyword, getGifForKeyword, addComment } = require('./helpers');

const handler = async (event) => {
  const body = JSON.parse(event.body);

  if (!body || body.action !== 'created' || !body.comment) {
    console.log('Not Comment Creation, Halting execution.');
    return {
      message: 'Not a comment.',
    };
  }

  let keyword = '',
    gifUrl = '';
  try {
    keyword = getKeyword(body.comment.body);
  } catch (err) {
    console.log('Halting execution, no keyword found.', err);
    return {
      message: 'No keyword found.',
    };
  }

  try {
    gifUrl = await getGifForKeyword(keyword);
  } catch (err) {
    console.log('Error in fetching GIF.', err);
    return {
      message: 'Error in fetching GIF.',
    };
  }

  try {
    const commentUrl = body.issue.comments_url;
    const installationId = body.installation.id;
    let res = await addComment(installationId, commentUrl, gifUrl, keyword);
    res = await res.json();

    console.log(res);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Comment Added.',
      }),
    };
  } catch (err) {
    console.log('Failed to add comment', err);
    return {
      message: 'Comment addition failed 😢',
    };
  }
};

module.exports = {
  handler,
};
