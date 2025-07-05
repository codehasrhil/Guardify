export async function handler(event) {
  const url = new URLSearchParams(event.body).get("url");

  try {
    const response = await fetch("https://www.virustotal.com/api/v3/urls", {
      method: "POST",
      headers: {
        "x-apikey": process.env.VIRUSTOTAL_API_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `url=${url}`,
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