import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { hash, compare } from 'bcrypt';

import { UserType } from '../../common/enums';
import { SignupRequest } from './auth.dto';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 256,
        unique: true,
    })
    username: string;

    @Column({
        type: 'varchar',
        length: 256,
    })
    first_name: string;

    @Column({
        type: 'varchar',
        length: 256,
    })
    last_name: string;

    @Column({
        type: 'varchar',
        length: 256,
    })
    email: string;

    @Column({
        type: 'varchar',
        select: false,
    })
    password: string;

    @Column({
        type: 'enum',
    })
    user_type: UserType;

    @Column({
        type: 'tinyint',
        default: true,
    })
    active: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    public async passwordToHash() {
        this.password = await hash(this.password, 10);
    }

    public async isPasswordValid(plainPassword: string): Promise<boolean> {
        return await compare(plainPassword, this.password);
    }

    public adaptFromDto(request: SignupRequest): void {
        this.username = request.username;
        this.first_name = request.first;
        this.last_name = request.last;
        this.email = request.email;
        this.password = request.password;
        // True for publisher, False for reader
        // NOTE: Should update to use enums instead
        this.user_type = (request.type) ? UserType.Publisher : UserType.Reader;
    }
}
