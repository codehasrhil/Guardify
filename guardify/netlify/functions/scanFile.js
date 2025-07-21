const Busboy = require('busboy');
const fetch = require('node-fetch');
const FormData = require('form-data');

const VIRUSTOTAL_API_KEY = process.env.VIRUSTOTAL_API_KEY;

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

        // Step 1: Upload file to VirusTotal
        const uploadRes = await fetch('https://www.virustotal.com/api/v3/files', {
          method: 'POST',
          headers: {
            'x-apikey': VIRUSTOTAL_API_KEY,
          },
          body: formData,
        });

        const uploadData = await uploadRes.json();
        const analysisId = uploadData?.data?.id;

        if (!analysisId) {
          return resolve({
            statusCode: 500,
            body: JSON.stringify({ error: 'No analysisId received' }),
          });
        }

        // Step 2: Poll for scan result
        const pollScanResult = async () => {
          const analysisRes = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
            headers: {
              'x-apikey': VIRUSTOTAL_API_KEY,
            },
          });

          const analysisData = await analysisRes.json();
          const status = analysisData?.data?.attributes?.status;

          if (status === 'completed') {
            return resolve({
              statusCode: 200,
              body: JSON.stringify({ result: analysisData }),
            });
          } else {
            console.log('Scan still in progress...');
            setTimeout(pollScanResult, 3000); // retry
          }
        };

        pollScanResult();
      } catch (err) {
        console.error('Error during scan:', err);
        resolve({
          statusCode: 500,
          body: JSON.stringify({ error: 'Upload or polling failed' }),
        });
      }
    });

    busboy.end(Buffer.from(event.body, 'base64'));
  });
};