document.addEventListener('DOMContentLoaded', function() {


     const registerForm = document.querySelector('form[action="/register"]');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(registerForm);
            const response = await fetch('/register', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                window.location.href = '/login';
            } else {
                const errorData = await response.json();
                const errorMessage = document.getElementById('error-message');
                errorMessage.textContent = errorData.detail;
                errorMessage.style.display = 'block';
            }
        });
    }
    // =======================================================================
    // Код для переключения между вкладками "Вход" и "Регистрация"
    // =======================================================================

    // Получаем ссылки на элементы DOM
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginContent = document.getElementById('login-content');
    const registerContent = document.getElementById('register-content');

    // Добавляем обработчик события на кнопку "Вход"
    loginTab.addEventListener('click', function() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginContent.style.display = 'block';
        registerContent.style.display = 'none';
    });

    // Добавляем обработчик события на кнопку "Регистрация"
    registerTab.addEventListener('click', function() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        loginContent.style.display = 'none';
        registerContent.style.display = 'block';
    });

    // Получаем ссылку на поле ввода номера телефона
    const phoneNumberInput = document.getElementById('phone-number');

    // Добавляем обработчик события на ввод в поле
    if (phoneNumberInput) {
        phoneNumberInput.addEventListener('input', function() {
            let value = phoneNumberInput.value;
            value = value.replace(/[^\d+]/g, '');
            value = value.slice(0, 11);
            if (value.length > 0 && !value.startsWith('7')) {
                value = '7' + value.slice(2);
            }
            phoneNumberInput.value = value;
        });
    } else {
        console.warn("Элемент с id 'phone-number' не найден.");
    }

    //=======================================================================
    // Код для показа/скрытия пароля
    //=======================================================================

    $('body').on('click', '.password-control', function(e) {
        e.preventDefault();
        let passwordInput = $(this).siblings('input[type="password"]');
        let isPassword = passwordInput.attr('type') === 'password';

        if (isPassword) {
            $(this).addClass('view');
            passwordInput.attr('type', 'text');
        } else {
            $(this).removeClass('view');
            passwordInput.attr('type', 'password');
        }
    });

    //=======================================================================
    // Код для проверки совпадения паролей при регистрации
    //=======================================================================

    const passwordInputRegister = document.getElementById('password-input-register');
    const passwordInputConfirm = document.getElementById('password-input-confirm');
    const passwordError = document.getElementById('password-error');
    const registerButton = document.querySelector('.register-button');

    function checkPasswords() {
        if (passwordInputRegister.value !== passwordInputConfirm.value) {
            passwordError.style.display = 'block';
            registerButton.disabled = true;
        } else {
            passwordError.style.display = 'none';
            registerButton.disabled = false;
        }
    }

    passwordInputRegister.addEventListener('input', checkPasswords);
    passwordInputConfirm.addEventListener('input', checkPasswords);
});