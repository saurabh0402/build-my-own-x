const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const { readFileSync } = require('fs');

const giphyKey = process.env.GIPHY_API_KEY;
const appId = process.env.APP_ID;

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

const getToken = async (installationId) => {
  const cert = readFileSync('pkey.pem');
  const jwtSigned = jwt.sign(
    {
      iss: appId,
    },
    cert,
    {
      algorithm: 'RS256',
      expiresIn: '10m',
    }
  );

  let tokenRes = await fetch(
    `https://api.github.com/app/installations/${installationId}/access_tokens`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtSigned}`,
      },
    }
  );

  tokenRes = await tokenRes.json();
  return tokenRes.token;
};

const addComment = async (installationId, url, gifUrl, keyword) => {
  const comment = `![Gif for ${keyword}](${gifUrl})`;
  const accessToken = await getToken(installationId);

  return fetch(url, {
    method: 'post',
    body: JSON.stringify({
      body: comment,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${accessToken}`,
    },
  });
};

module.exports = {
  getKeyword,
  getGifForKeyword,
  addComment,
  getToken,
};
