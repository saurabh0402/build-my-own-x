const fetch = require('node-fetch');

const giphyKey = process.env.GIPHY_API_KEY;
const gitToken = process.env.GITHUB_ACCESS_TOKEN;

const getKeyword = (commentBody) => {
  const format = /\[giffy:(.+?)\]/g;
  const matchResult = format.exec(commentBody);

  if (!matchResult) {
    throw new Error('No match');
  }

  let keyword = matchResult[1] && matchResult[1].trim();
  if (!keyword) {
    throw new Error('No Keyword');
  }

  return keyword;
};

const getGifForKeyword = async (keyword) => {
  const url = 'http://api.giphy.com/v1/gifs/search?';
  const urlParams = new URLSearchParams({
    api_key: giphyKey,
    q: keyword,
    limit: 1,
    rating: 'g',
    lang: 'en',
  });

  let gifRes = await fetch(url + urlParams);
  gifRes = await gifRes.json();

  return gifRes.data[0].images.fixed_height.url;
};

const addComment = (url, gifUrl, keyword) => {
  const comment = `![Gif for ${keyword}](${gifUrl})`;
  return fetch(url, {
    method: 'post',
    body: JSON.stringify({
      body: comment,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${gitToken}`,
    },
  });
};

module.exports = {
  getKeyword,
  getGifForKeyword,
  addComment,
};
