import { Body, Controller, Get, Post, Render, Request } from '@nestjs/common';
import { Request as ExPRequest } from 'express';
import { SendMailOptions } from 'nodemailer';
import { HashUtil } from 'src/common/hash.util';
import { EmailService } from 'src/services/email.service';

import { LoginRequest, SignupRequest } from './auth.dto';
import { User } from './auth.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly _authService: AuthService,
        private readonly _emailService: EmailService,
    ) { }

    @Post('login')
    public async loginUser(@Body() req: LoginRequest): Promise<User> {
        return this._authService.getUserByCredentials(req);
    }

    @Post('signup')
    public async signupUser(
        @Request() req: ExPRequest,
        @Body() newUserReq: SignupRequest,
    ): Promise<User> {
        const user: User = await this._authService.createUser(newUserReq);
        if (user != null) {
            // Extract host
            const host: string = req.get('host');
            const userHash: number = HashUtil.createHash(
                user.username,
                user.password,
                user.first_name,
                user.last_name,
            );
            // Send email
            const emailOptions: SendMailOptions = {
                to: user.email,
                subject: 'Story Notification : Confirm your email',
                html: `
                    Hi ${user.first_name},
                    <br>
                    <a href=http://${host}/verify?id=${user.username}&hash=${userHash}>
                        Verify your email
                    </a>
                    <br>
                    Thanks!
                `,
            };
            await this._emailService.sendMail(emailOptions);
        }
        return user;
    }
}
