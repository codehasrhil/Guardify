const fetch = require('node-fetch');
const FromData = require('form-data')


exports.handler = async (event) => {
    if (event.httpMethod === 'OPTIONS') {
        return {
            statuscode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body:'',
        };
    }
    try {
        const  base64file =  event.body;

        const buffer =  buffer.from(base64file,"base64");
        const from = new FromData();
        from.append('file',buffer,{filename:'upload.pdf'});
        const uploadres = await fetch('https://www.virustotal.com/api/v3/files',{
            method:'POST',
            headers: {
                'x-apikey':process.eventNames.VIRUSTOTAL_API_KEY,
                ...form.getHeaders(),
            },
            body:from,
        });

        const uploadData = await uploadres.json();
        const analysisld = uploadData.data.id;

        const resultRes = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`,{
            method:'GET',
            headers:{
                'x-apikey':process.env.VIRUSTOTAL_API_KEY,
            },
        });

        const resultData = await resultRes.json();

        return{
            statuscode:200,
            headers:{
                'Access-Control-Allow-Origin':'*',
            },
            body:JSON.stringify(resultData),
        };

    } catch (error) {
         console.error('Scan failed:', error);
    }
}