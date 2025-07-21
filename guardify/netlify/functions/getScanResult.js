const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const id = event.queryStringParameters?.id;

  if (!id) {
    return { statusCode: 400, body: 'Missing analysis ID' };
  }

  try {
    const res = await fetch(`https://www.virustotal.com/api/v3/analyses/${id}`, {
      headers: {
        'x-apikey': process.env.VIRUSTOTAL_API_KEY,
      },
    });

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ result: data }),
    };
  } catch (err) {
    console.error('Error fetching scan result:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Fetch failed' }),
    };
  }
};
