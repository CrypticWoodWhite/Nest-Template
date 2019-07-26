import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';

import { User } from './auth.entity';
import { LoginRequest, SignupRequest } from './auth.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly _userRepository: Repository<User>,
    ) { }

    async getUserByCredentials(request: LoginRequest): Promise<User> {
        // Set options to elect cols without password, active, createdAt, updatedAt
        // NOTE: optional as the user entity already sets password 'select' to false (just showing proof of concept)
        const options: FindOneOptions<User> = {
            select: ['id', 'username', 'email', 'first_name', 'last_name', 'user_type'],
        };
        // Fetch user
        const user: User = await this._userRepository.findOne({
            username: request.username,
        }, options);
        // Validate password
        if ((user != null) && (await user.isPasswordValid(request.password))) {
            return user;
        } else {
            return null;
        }
    }

    async getUserById(id: string): Promise<User> {
        // Fetch user
        return await this._userRepository.findOne(id);
    }

    async createUser(request: SignupRequest): Promise<User> {
        const newUser: User = new User();
        newUser.adaptFromDto(request);
        // Fetch user
        const user: User = await this._userRepository.save(newUser);
        // Remove password field (security)
        delete(user.password);
        return user;
    }
}
