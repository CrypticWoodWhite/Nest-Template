
export class LoginRequest {
    readonly username: string;
    readonly password: string;
}

export class SignupRequest {
    readonly username: string;
    readonly password: string;
    readonly first: string;
    readonly last: string;
    readonly email: string;
    readonly type: string;
}
