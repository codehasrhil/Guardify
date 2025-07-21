const Busboy = require('busboy');
const fetch = require('node-fetch');
const FormData = require('form-data');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  return new Promise((resolve, reject) => {
    const busboy = Busboy({ headers: event.headers });
    const formData = new FormData();
    let fileBuffer = Buffer.alloc(0);
    let fileName = '';

    busboy.on('file', (fieldname, file, filename) => {
      fileName = filename;
      file.on('data', (data) => {
        fileBuffer = Buffer.concat([fileBuffer, data]);
      });
    });

    busboy.on('finish', async () => {
      try {
        formData.append('file', fileBuffer, fileName);

        const res = await fetch('https://www.virustotal.com/api/v3/files', {
          method: 'POST',
          headers: {
            'x-apikey': process.env.VIRUSTOTAL_API_KEY,
          },
          body: formData,
        });

        const data = await res.json();

        resolve({
          statusCode: 200,
          body: JSON.stringify({ analysisId: data?.data?.id }),
        });
      } catch (err) {
        console.error('Upload failed:', err);
        resolve({
          statusCode: 500,
          body: JSON.stringify({ error: 'Upload failed' }),
        });
      }
    });

    busboy.end(Buffer.from(event.body, 'base64'));
  });
};