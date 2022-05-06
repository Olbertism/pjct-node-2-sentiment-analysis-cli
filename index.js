import axios from 'axios';
import querystring from 'node:querystring';

const apiUrl = 'http://text-processing.com/api/sentiment/';

const textMessage = querystring.stringify({
  text: process.argv.slice(2).join(' '),
});

axios
  .post(apiUrl, textMessage)
  .then(function (response) {
    let label = response.data.label;
    const pos = response.data.probability.pos;
    const neg = response.data.probability.neg;
    const neutral = response.data.probability.neutral;

    if (label === 'pos') label = 'positive';
    if (label === 'neg') label = 'negative';

    console.log(
      `The text is considered ${label}.
    I sense a ${Math.round(pos * 100)}% positive probability, a ${Math.round(
        neg * 100,
      )}% negative probability and a ${Math.round(
        neutral * 100,
      )}% neutral probability,`,
    );
  })
  .catch(function (error) {
    console.log(error);
  });
