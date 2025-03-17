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

    const profileModal = document.getElementById('profile-modal');
    const profileAvatar = document.getElementById('profile-avatar');
    const profileName = document.getElementById('profile-name');
    const closeModal = document.querySelector('.close-modal');

    const chatHeader = document.querySelector('.chat-header');
    chatHeader.addEventListener('click', function() {
        const chatUserAvatar = document.getElementById('chat-user-avatar').src;
        const chatUserName = document.getElementById('chat-user-name').textContent;

        profileAvatar.src = chatUserAvatar;
        profileName.textContent = chatUserName;

        profileModal.classList.remove('hidden');
    });

    closeModal.addEventListener('click', function() {
        profileModal.classList.add('hidden');
    });

    window.addEventListener('click', function(event) {
        if (event.target === profileModal) {
            profileModal.classList.add('hidden');
        }
    });

    hideAll();
    document.querySelector(`.chat-list[data-category="all"]`).classList.remove('hidden');
    document.querySelector(`.chat-categories .category[data-category="all"]`).classList.add('active');

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
    var phoneNumber = "79999999999"; // Это нужно будет изменить, чтобы получить динамически!
    var modalPhone = document.getElementById("modal-phone");

    // Устанавливаем имя пользователя в модальном окне
    if (chatUsername) {
        modalUsername.textContent = chatUsername;
    }

    // Устанавливаем номер телефона в модальном окне
    modalPhone.textContent = phoneNumber;

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

    // Пример добавления нового сообщения (для тестирования)
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
                messageElement.classList.remove("fade-out");
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

    // Обработчики событий для модального окна
    btn.onclick = function() {
        var chatAvatarSrc = document.getElementById("chat-user-avatar").src;
        document.getElementById("modal-user-avatar").src = chatAvatarSrc;
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});