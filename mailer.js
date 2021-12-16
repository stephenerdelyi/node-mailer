class Mailer {
    constructor() {
        const nodemailer = require('nodemailer');

        this.from_email = process.env.FROM_EMAIL;
        this.to_email = process.env.TO_EMAIL;
        this.password = process.env.PASSWORD;

        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.from_email,
                pass: this.password
            }
        });
    }

    validate(name, email, message) {
        let has_errors = false;
        this.errors = [];

        //validate email (not the strongest regex, but simple is fine)
        if(email.length == 0) {
            has_errors = true;
            this.errors.push('missing_email');
        } else if(!new RegExp(/^\S+@\S+\.\S+$/).test(email)) {
            has_errors = true;
            this.errors.push('invalid_email');
        }

        //validate name
        if(name.length == 0) {
            has_errors = true;
            this.errors.push('missing_name');
        }

        //validate message
        if(message.length == 0) {
            has_errors = true;
            this.errors.push('missing_message');
        }

        return !has_errors;
    }

    send(name, email, message) {
        if(this.validate(name, email, message) == true) {
            let options = {
                from: `"${name}" ${this.from_email}`,
                to: this.to_email,
                replyTo: email,
                subject: 'Message from ' + name + ' (' + email + ')',
                text: message
            };

            let info = this.transporter.sendMail(options, (error, info) => {
                if(error) {
                    //TO-DO: properly wait for this to finish so error data can be set and returned
                    console.log(error);
                    this.errors.push('transporter_errored');
                }
            });

            return { sent: true };
        }

        return {
            sent: false,
            errors: this.errors
        };
    }
}

module.exports = Mailer;
