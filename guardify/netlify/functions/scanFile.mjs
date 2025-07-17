import fetch from "node-fetch";
import FormData from "form-data";
import busboy from "busboy";

export async function handler(event) {
  console.log("wee come to scan file")
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const contentType = event.headers["content-type"] || event.headers["Content-Type"];
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return {
        statusCode: 400,
        body: "Invalid Content-Type. Expected multipart/form-data.",
      };
    }

    const bb = busboy({ headers: event.headers });
    const fileChunks = [];
    let fileName = "";

    return new Promise((resolve, reject) => {
      bb.on("file", (file, info) => {
        fileName = info.filename;
        file.on("data", (data) => fileChunks.push(data));
      });

      bb.on("close", async () => {
        const fileBuffer = Buffer.concat(fileChunks);
        const form = new FormData();
        form.append("file", fileBuffer, fileName);

        try {
          const response = await fetch("https://www.virustotal.com/api/v3/files", {
            method: "POST",
            headers: {
              "x-apikey": process.env.VIRUSTOTAL_API_KEY,
              ...form.getHeaders(),
            },
            body: form,
          });

          const result = await response.json();

          resolve({
            statusCode: 200,
            body: JSON.stringify(result),
          });
        } catch (error) {
          resolve({
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
          });
        }
      });

      bb.end(Buffer.from(event.body, "base64"));
    });
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}