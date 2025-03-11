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

    hideAll();
    document.querySelector(`.chat-list[data-category="all"]`).classList.remove('hidden');
    document.querySelector(`.chat-categories .category[data-category="all"]`).classList.add('active');

    // Получаем элементы
    var messageContainer = document.getElementById("message-container");
    var messageInput = document.getElementById("message-input");
    var sendButton = document.getElementById("send-button");

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
});