const https = require('https');
https.get('https://pin.it/4PPo8xJBy', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/<meta property="og:image" content="(.*?)"/);
    if (match) console.log(match[1]);
    else console.log(res.headers.location || 'Not found');
  });
}).on('error', err => console.log('Error', err));
