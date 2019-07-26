import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailService } from '../../services/email.service';
import { AuthController } from './auth.controller';
import { User } from './auth.entity';
import { AuthService } from './auth.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    providers: [
        AuthService,
        EmailService,
    ],
    controllers: [
        AuthController,
    ],
})
export class AuthModule { }
