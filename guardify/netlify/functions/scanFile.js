const FormData = require('form-data');
const Busboy = require('busboy');
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: 'OK',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const contentType = event.headers['content-type'] || event.headers['Content-Type'];
    const busboy = new Busboy({ headers: { 'content-type': contentType } });

    return await new Promise((resolve, reject) => {
      let fileBuffer = null;

      busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        const chunks = [];
        file.on('data', data => chunks.push(data));
        file.on('end', () => {
          fileBuffer = Buffer.concat(chunks);
        });
      });

      busboy.on('finish', async () => {
        if (!fileBuffer) {
          return resolve({
            statusCode: 400,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ error: 'No file received' }),
          });
        }

        const form = new FormData();
        form.append('file', fileBuffer, { filename: 'upload.file' });

        // Send to VirusTotal
        const vtRes = await fetch('https://www.virustotal.com/api/v3/files', {
          method: 'POST',
          headers: {
            'x-apikey': process.env.VIRUSTOTAL_API_KEY,
            ...form.getHeaders(),
          },
          body: form,
        });

        const vtData = await vtRes.json();

        return resolve({
          statusCode: vtRes.status,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify(vtData),
        });
      });

      busboy.write(event.body, event.isBase64Encoded ? 'base64' : 'binary');
      busboy.end();
    });

  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message, stack: error.stack }),
    };
  }
};
