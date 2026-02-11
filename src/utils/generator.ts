export interface GeneratorOptions {
    length: number;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
}

export function generatePassword(options: GeneratorOptions): string {
    const charset = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    };

    let chars = '';
    if (options.uppercase) chars += charset.uppercase;
    if (options.lowercase) chars += charset.lowercase;
    if (options.numbers) chars += charset.numbers;
    if (options.symbols) chars += charset.symbols;

    if (chars === '') return '';

    let password = '';
    const randomValues = new Uint32Array(options.length);
    crypto.getRandomValues(randomValues);

    for (let i = 0; i < options.length; i++) {
        password += chars[randomValues[i] % chars.length];
    }

    return password;
}

export function calculateStrength(password: string): 'Weak' | 'Medium' | 'Strong' {
    if (password.length < 8) return 'Weak';
    let score = 0;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score < 3) return 'Weak';
    if (score === 3 || password.length < 12) return 'Medium';
    return 'Strong';
}
