export const validateEmail = (email) => {
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/)) {
        return 'Invalid email format';
    }
    return '';
};

export const validatePassword = (password) => {
    if (password.length < 6) {
        return 'Password must be at least 6 characters';
    }
    return '';
};

export const validateUsername = (username) => {
    if (!username.match(/^[A-Za-z]+$/)) {
        return 'Username must contain only letters';
    }
    return '';
};

export const validateSignIn = (formState) => {
    let errors = { email: '', password: '' };
    errors.email = validateEmail(formState.email);
    errors.password = validatePassword(formState.password);
    return errors;
};

export const validateSignUp = (formState) => {
    let errors = { username: '', email: '', password: '' };
    errors.username = validateUsername(formState.username);
    errors.email = validateEmail(formState.email);
    errors.password = validatePassword(formState.password);
    return errors;
};

export const isValid = (errors) => {
    return !Object.values(errors).some(error => error !== '');
};