
import FormData from 'form-data';


export async function handler(event) {
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ message: "Scan file function is working!" }),
        };
    };
    try {


        if(!event.body){
            throw new Error('Request body is missing:');
        }

        let parsedbody;
        try{
            parsedbody = JSON.parse(event.body);
        }catch (e){
            throw new Error("invalid json body.")
        }

       const base64File = parsedbody.file;

       if(!base64File){
        throw new Error("Missing file")
       }

        const buffer = Buffer.from(base64File, "base64");
        const form = new FormData();
        form.append('file', buffer, { filename: 'upload.pdf' });
        const uploadres = await fetch('https://www.virustotal.com/api/v3/files', {
            method: 'POST',
            headers: {
                'x-apikey': process.env.VIRUSTOTAL_API_KEY,
                ...form.getHeaders(),
            },
            body: form,
        });

        const uploadData = await uploadres.json();

         if (!uploadres.ok || !uploadData.data || !uploadData.data.id) {
         throw new Error('Upload failed — response: ' + JSON.stringify(uploadData));
    }

        const analysisId = uploadData.data.id;

        const resultRes = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
            method: 'GET',
            headers: {
                'x-apikey': process.env.VIRUSTOTAL_API_KEY,
            },
        });

        const resultData = await resultRes.json();

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(resultData),
        };

    } catch (error) {
        console.error('Scan failed:', error);

        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                error: 'Scan failed',
                details: error.message,
                stack: error.stack,
            }),
        };
    }
}