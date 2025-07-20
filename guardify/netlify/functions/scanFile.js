const Busboy = require('busboy');
const fetch = require('node-fetch');
const FormData = require('form-data');

exports.handler = async (event) => {

    console.log("getting to console")
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

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      fileName = filename;
      file.on('data', (data) => {
        fileBuffer = Buffer.concat([fileBuffer, data]);
      });
    });

    busboy.on('finish', async () => {
      try {
        formData.append('file', fileBuffer, fileName);

        const response = await fetch('https://www.virustotal.com/api/v3/files', {
          method: 'POST',
          headers: {
            'x-apikey': process.env.VIRUSTOTAL_API_KEY, // set this in Netlify dashboard
          },
          body: formData,
        });

        const data = await response.json();

        resolve({
          statusCode: 200,
          body: JSON.stringify({ data }),
        });
      } catch (err) {
        console.error('VirusTotal upload error:', err);
        resolve({
          statusCode: 500,
          body: JSON.stringify({ error: 'Upload failed' }),
        });
      }
    });

    busboy.end(Buffer.from(event.body, 'base64'));
  });
};