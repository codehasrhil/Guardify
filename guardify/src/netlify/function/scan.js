const axios = require('axios');

exports.handler = async function (event) {
    if(event.httpMethod !== 'POST'){
        return{
            statusCode:405,
            body: 'Method not Allowed',
        };
    }

    const {url} = JSON.parse(event.body);
    const data = new URLSearchParams();
    data.append('url',url);

    try{
        const response = await axios.post('https://www.virustotal.com/api/v3/urls',data,{
            headers:{
                "X-apikey":Process.env.
            }
        })
    }
}