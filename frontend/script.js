document.addEventListener('DOMContentLoaded', function() {
    const chatCategories = document.querySelectorAll('.chat-categories .category');
    const chatLists = document.querySelectorAll('.chat-list');
    const chatAreas = document.querySelectorAll('.chat-area');
    const emptyChatArea = document.querySelector('.empty-chat-area');
    const chatItems = document.querySelectorAll('.chat-item');
    const backButtons = document.querySelectorAll('.back-button');

    let activeChatId = null;

    function hideAll() {
        chatAreas.forEach(area => area.classList.add('hidden'));
        chatLists.forEach(list => list.classList.add('hidden'));
        chatCategories.forEach(category => category.classList.remove('active'));
        emptyChatArea.classList.remove('hidden');
    }

    function showChat(chatId) {
        const chatUserNameElement = document.getElementById('chat-user-name');
        const chatUserAvatarElement = document.getElementById('chat-user-avatar');

        const selectedChatItem = document.querySelector(`.chat-item[data-chat-id="${chatId}"]`);
        const userName = selectedChatItem.dataset.userName;
        const avatarSrc = selectedChatItem.dataset.userAvatar;

        chatUserNameElement.textContent = userName;
        chatUserAvatarElement.src = avatarSrc;

        chatAreas.forEach(area => area.classList.add('hidden'));
        const chatArea = document.querySelector(`.chat-area[data-chat-id="${chatId}"]`);
        chatArea.classList.remove('hidden');

        emptyChatArea.classList.add('hidden');
    }

    chatCategories.forEach(category => {
        category.addEventListener('click', function() {
            hideAll();
            const categoryName = this.dataset.category;
            document.querySelector(`.chat-list[data-category="${categoryName}"]`).classList.remove('hidden');
            this.classList.add('active');
            emptyChatArea.classList.add('hidden');
        });
    });

    chatItems.forEach(chatItem => {
        chatItem.addEventListener('click', function() {
            const chatId = this.dataset.chatId;
            showChat(chatId);
        });
    });

    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            hideAll();
            document.querySelector(`.chat-categories .category[data-category="all"]`).classList.add('active');
            document.querySelector(`.chat-list[data-category="all"]`).classList.remove('hidden');
            emptyChatArea.classList.remove('hidden');
        });
    });

    // Получаем элементы
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("openModalBtn");
    var span = document.getElementsByClassName("close")[0];
    var messageContainer = document.getElementById("message-container");
    var messageInput = document.getElementById("message-input");
    var sendButton = document.getElementById("send-button");

    // Получаем имя пользователя из chat-user-name
    var chatUsername = document.getElementById("chat-user-name").textContent;
    var modalUsername = document.getElementById("modal-username");

    // Получаем номер телефона
    var phoneNumber = "79999999999";
    var modalPhone = document.getElementById("modal-phone");

    // Устанавливаем имя пользователя в модальном окне
    if (chatUsername) {
        modalUsername.textContent = chatUsername;
    }

    // Устанавливаем номер телефона в модальном окне
    modalPhone.textContent = phoneNumber;

    // Получаем элемент иконки меню
    const menuIcon = document.querySelector('.menu-icon');

    // Получаем элементы для myModal
    var myModal = document.getElementById("myModal");
    var btn = document.getElementById("openModalBtn");
    var myModalSpan = myModal.querySelector(".close");

    // Получаем элементы для menuModal
    var menuModal = document.getElementById("menuModal");
    var menuModalSpan = menuModal.querySelector(".close");

    // *********************************************************************************************
    //  Открываем модальное окно по клику на иконку меню
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            // Открываем модальное окно
            menuModal.style.display = "block"; // Открываем menuModal
        });
    }

    // *********************************************************************************************
    // Открываем модальное окно по клику на аватар (как и раньше)
    btn.onclick = function() {
        myModal.style.display = "block"; // Открываем myModal
    }

    // *********************************************************************************************
    // Закрытие модальных окон (крестики)
    if (myModalSpan) {
        myModalSpan.onclick = function() {
            myModal.style.display = "none";
        }
    }

    if (menuModalSpan) {
        menuModalSpan.onclick = function() {
            menuModal.style.display = "none";
        }
    }

    // *********************************************************************************************
    // Закрытие модальных окон по клику вне модального окна
    window.onclick = function(event) {
        if (event.target == myModal) {
            myModal.style.display = "none";
        }
        if (event.target == menuModal) {
            menuModal.style.display = "none";
        }
    }

    // Получаем элементы для выбора фото профиля и изменения темы
    const changePhotoButton = document.getElementById('change-photo-btn');
    const profilePhotoInput = document.getElementById('profile-photo-input');
    const menuModalAvatar = document.getElementById('menu-modal-user-avatar');
    // const themeSelect = document.getElementById('theme-select');
    // Добавляем код для палитры цветов
    const themeColorInput = document.getElementById('theme-color');

    // Получаем контейнер чата
    const chatContainer = document.querySelector('.container'); // Выберите правильный селектор для вашего контейнера

    // Обработчик события для выбора фото профиля
    changePhotoButton.addEventListener('click', function() {
        profilePhotoInput.click(); // Вызываем клик по скрытому input
    });

    profilePhotoInput.addEventListener('change', function() {
        const file = this.files[0]; // Получаем выбранный файл
        if (file) {
            const reader = new FileReader(); // Создаем FileReader
            reader.onload = function(e) {
                menuModalAvatar.src = e.target.result; // Устанавливаем аватар
            }
            reader.readAsDataURL(file); // Читаем файл как Data URL
        }
    });
    themeColorInput.addEventListener('change', function() {
        const selectedColor = this.value; // Получаем выбранный цвет
        // Устанавливаем значение CSS-переменной для контейнера
        chatContainer.style.setProperty('--theme-color', selectedColor);
    });

    // Добавляем код для информации о себе (menuModal)
    const aboutMeTextarea = document.getElementById('about-me');

    // При открытии модального окна, загружаем информацию из Local Storage
    menuIcon.addEventListener('click', function() { // Используем иконку меню для открытия
        const savedAboutMe = localStorage.getItem('aboutMe');
        if (savedAboutMe) {
            aboutMeTextarea.value = savedAboutMe;
        }
    });

    // При закрытии модального окна, сохраняем информацию в Local Storage
    menuModalSpan.addEventListener('click', function() { // Используем крестик в menuModal
        const aboutMe = aboutMeTextarea.value;
        localStorage.setItem('aboutMe', aboutMe);
        console.log('Информация "О себе" сохранена: ' + aboutMe); // Выводим в консоль
    });

    // =============================================================================================
    // Все что ниже - код для функциональности чата и т.д.
    // =============================================================================================
    // Функция для проверки, нужно ли показывать ползунок
    function checkScroll() {
        const messageContainer = document.getElementById('message-container');
        if (messageContainer.scrollHeight > messageContainer.clientHeight) {
            messageContainer.style.overflowY = 'auto'; // Показываем ползунок
        } else {
            messageContainer.style.overflowY = 'hidden'; // Скрываем ползунок
        }
    }

    // Вызываем функцию при загрузке страницы и при добавлении новых сообщений
    document.addEventListener('DOMContentLoaded', checkScroll);

    // Функция для добавления нового сообщения
    function addMessage(text, isSent) {
        const messageContainer = document.getElementById('message-container');
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', isSent ? 'sent' : 'received');
        messageElement.textContent = text;
        messageContainer.appendChild(messageElement);

        // Автоматическая прокрутка к последнему сообщению
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    // Пример использования:
    addMessage("Новое сообщение", true);

    // Функция для отправки сообщения с анимацией
    function sendMessage() {
        var messageText = messageInput.value.trim(); // Получаем текст сообщения и убираем пробелы в начале и конце
        if (messageText !== "") {
            // Создаем элемент сообщения
            var messageElement = document.createElement("div");
            messageElement.classList.add("message", "sent");
            messageElement.textContent = messageText;

            // Добавляем анимацию fade-out
            messageElement.classList.add("fade-out"); // добавляем класс fade-out

            // Добавляем сообщение в контейнер
            messageContainer.appendChild(messageElement);

            // Прокручиваем контейнер сообщений вниз
            messageContainer.scrollTop = messageContainer.scrollHeight;

            // Очищаем поле ввода сообщения
            messageInput.value = "";

            // Удаляем класс fade-out после завершения анимации
            setTimeout(function() {
                messageElement.classList.remove("fade-out"); // Убираем класс fade-out
            }, 300); // 300 мс - время анимации
        }
    }

    // Обработчик события для кнопки "Отправить"
    sendButton.addEventListener("click", sendMessage);

    // Обработчик события для нажатия клавиши "Enter" в поле ввода сообщения
    messageInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});