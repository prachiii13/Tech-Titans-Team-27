const { dialog } = require('electron').remote;

const user_data = {};

function signup() {
    const username = document.getElementById('signup_username_entry').value;
    const password = document.getElementById('signup_password_entry').value;
    if (username && password) {
        if (!(username in user_data)) {
            user_data[username] = password;
            dialog.showMessageBoxSync({ type: 'info', message: 'Registration successful!' });
            document.getElementById('signup_username_entry').value = '';
            document.getElementById('signup_password_entry').value = '';
        } else {
            dialog.showMessageBoxSync({ type: 'error', message: 'Username already exists.' });
        }
    } else {
        dialog.showMessageBoxSync({ type: 'error', message: 'Please enter both username and password.' });
    }
}

function login() {
    const username = document.getElementById('login_username_entry').value;
    const password = document.getElementById('login_password_entry').value;
    if (username && password) {
        if (username in user_data && user_data[username] === password) {
            dialog.showMessageBoxSync({ type: 'info', message: 'Login successful!' });
            document.getElementById('login_username_entry').value = '';
            document.getElementById('login_password_entry').value = '';
        } else {
            dialog.showMessageBoxSync({ type: 'error', message: 'Invalid username or password.' });
        }
    } else {
        dialog.showMessageBoxSync({ type: 'error', message: 'Please enter both username and password.' });
    }
}

const signup_username_entry = document.createElement('input');
signup_username_entry.id = 'signup_username_entry';
signup_frame.appendChild(signup_username_entry);

const signup_password_entry = document.createElement('input');
signup_password_entry.id = 'signup_password_entry';
signup_frame.appendChild(signup_password_entry);

const login_username_entry = document.createElement('input');
login_username_entry.id = 'login_username_entry';
root.appendChild(login_username_entry);

const login_password_entry = document.createElement('input');
login_password_entry.id = 'login_password_entry';
root.appendChild(login_password_entry);

const signup_button = document.createElement('button');
signup_button.textContent = 'Signup';
signup_button.addEventListener('click', signup);
signup_frame.appendChild(signup_button);

const login_button = document.createElement('button');
login_button.textContent = 'Login';
login_button.addEventListener('click', login);
root.appendChild(login_button);