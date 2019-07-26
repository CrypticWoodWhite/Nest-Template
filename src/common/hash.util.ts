// tslint:disable:no-bitwise

export class HashUtil {

    public static createHash(
        username: string,
        password: string,
        firstName: string,
        lastName: string,
    ) {
        // Init props
        const str: string = username + password + firstName + lastName;
        let hash: number = 0;
        let chr: number = null;

        // First condition check
        if (str.length === 0) {
            return hash;
        }
        // Compute hash
        const inputLen = str.length;
        for (let i = 0; i < inputLen; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
}
