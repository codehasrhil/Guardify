export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { filename, content } = JSON.parse(event.body);

    const base64Data = content.split(',')[1]; // remove Data URL prefix
    const buffer = Buffer.from(base64Data, 'base64');

    // Now send this `buffer` to VirusTotal API (or just simulate for testing)
    const res = await fetch("https://www.virustotal.com/api/v3/files", {
      method: "POST",
      headers: {
        "x-apikey": process.env.VIRUSTOTAL_API_KEY, // or inline for testing
      },
      body: buffer,
    });

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Scan started", data }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}