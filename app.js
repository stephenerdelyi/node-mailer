const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

function sendMail() {
    let nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'stephenerdelyi@gmail.com',
        pass: 'deulicjbowjekmss'
      }
    });

    let mailOptions = {
      from: 'test@test.com',
      to: 'stephenerdelyi@icloud.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if(error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}

const server = http.createServer((request, response) => {
  response.setHeader('Content-Type', 'text/plain');

  if(request.method == 'POST') {
      this.params = '';

      request.on('data', (chunck) => {
        this.params += chunck;
      });

      request.on('end', () => {
        this.params = JSON.parse(this.params);
        response.statusCode = 200;
      });
  } else {
      //response.statusCode = 403;
  }

  response.write('Hello world from nodemailer');

  response.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
