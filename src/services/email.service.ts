import { Injectable } from '@nestjs/common';
import { createTransport, SendMailOptions, SentMessageInfo, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {

    private _transporter: Transporter;
    private _defaultOptions: SendMailOptions = {
        from: 'FROM_EMAIL',
    };

    constructor() {
        this._transporter = createTransport({
            service: 'gmail',
            auth: {
                user: 'USERNAME',
                pass: 'PASSWORD',
            },
        });
    }

    public sendMail(emailOptions: SendMailOptions): Promise<SentMessageInfo> {
        // Merge default options with incoming options (allows for using default from address)
        const options: SendMailOptions = { ...this._defaultOptions, ...emailOptions };
        return this._transporter.sendMail(options);
    }
}
