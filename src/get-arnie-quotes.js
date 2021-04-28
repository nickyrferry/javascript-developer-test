const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  let results = [];
  const requests = urls.map(async (url) => await httpGet(url));

  return Promise.all(requests)
    .then((responses) => {
      responses.forEach((response) => {
        const element = JSON.parse(response.body);
        if (response.status === 200)
          results.push({ 'Arnie Quote': element.message })
        else 
          results.push({ 'FAILURE': 'Your request has been terminated' });
        })
        return results;
    })
    .catch((error) => console.log(`ERROR getting Arnie Quotes: ${error}`))
};

module.exports = {
  getArnieQuotes,
};
