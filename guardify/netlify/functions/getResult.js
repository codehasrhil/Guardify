export async function handler(event) {
  const scanId = event.queryStringParameters.id;

  try {
    const response = await fetch(`https://www.virustotal.com/api/v3/analyses/${scanId}`, {
      method: 'GET',
      headers: {
        "x-apikey": process.env.VIRUSTOTAL_API_KEY
      }
    });

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}