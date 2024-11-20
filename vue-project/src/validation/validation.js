
export function validateName(name) {
    if (!name) {
        return 'The field name is empty'
    } else if (name.length <= 1) {
        return 'The name must contain at least 2 characters'
    }
    return null;
}

export function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        return 'Please enter a valid email address';

    }
    return null;
}

export function validatePassword(password, passwordConfirmation) {

    if (!password) {
        return 'Please, enter your password.';
    } else if (password.length < 8) {
        return 'The password must contain at least 8 characters';
    } else if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
        return 'Password must contain at least one letter and one number.';
    } else if (password !== passwordConfirmation) {
        return 'Passwords do not match';
    }
    return null;
}


