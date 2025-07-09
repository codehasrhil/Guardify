
import FormData from 'form-data';


export async function handler  (event) {
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body:JSON.stringify({ message: "Scan file function is working!" }),
        };
    };
    try {
        const  base64file =  event.body;

        const buffer =  Buffer.from(base64file,"base64");
        const form = new FormData();
        form.append('file',buffer,{filename:'upload.pdf'});
        const uploadres = await fetch('https://www.virustotal.com/api/v3/files',{
            method:'POST',
            headers: {
                'x-apikey':process.env.VIRUSTOTAL_API_KEY,
                ...form.getHeaders(),
            },
            body:form,
        });

        const uploadData = await uploadres.json();
        const analysisId = uploadData.data.id;

        const resultRes = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`,{
            method:'GET',
            headers:{
                'x-apikey':process.env.VIRUSTOTAL_API_KEY,
            },
        });

        const resultData = await resultRes.json();

        return{
            statusCode:200,
            headers:{
                'Access-Control-Allow-Origin':'*',
            },
            body:JSON.stringify(resultData),
        };

    } catch (error) {
         console.log('Scan failed:', error);
    }
}