const express = require('express');
const app = express();
const path = require('path');

const Params = require('./params');
const Mailer = require('./mailer');

app.post('/send', function(request, response) {
    response.setHeader('Content-Type', 'application/json');
    response.statusCode = 200;

    const params = new Params;
    const mailer = new Mailer;

    request.on('data', (item) => {
        params.add(item);
    });

    request.on('end', () => {
        let result = mailer.send(params.get('name'), params.get('email'), params.get('message'));

        response.write(JSON.stringify(result));
        response.end();
    });
});

app.listen(process.env.PORT || 8000, function () {
    console.log('http://localhost:' + process.env.PORT);
});
