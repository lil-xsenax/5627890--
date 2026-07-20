// ======================================
// ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ
// ======================================

function showScreen(oldScreen, newScreen) {
  if (oldScreen) oldScreen.classList.remove('active');
  if (newScreen) newScreen.classList.add('active');
}

// ======================================
// ЗАСТАВКА
// ======================================

setTimeout(() => {
  const intro = document.querySelector('.intro');
  const question = document.querySelector('.question');
  showScreen(intro, question);
}, 4000);

// ======================================
// КНОПКА "НЕТ" УБЕГАЕТ
// ======================================

const noButton = document.querySelector('.no');
if (noButton) {
  noButton.addEventListener('mouseover', () => {
    const x = Math.random() * 250 - 125;
    const y = Math.random() * 150 - 75;
    noButton.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// ======================================
// СОЗДАНИЕ СЕРДЕЧЕК (для анимации)
// ======================================

function createHeart() {
  const heart = document.createElement('div');
  heart.innerHTML = '❤️';
  heart.style.position = 'fixed';
  heart.style.left = Math.random() * 100 + '%';
  heart.style.bottom = '0';
  heart.style.fontSize = 20 + Math.random() * 30 + 'px';
  heart.style.zIndex = '9999';
  heart.style.animation = 'fly 3s linear';
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 3000);
}

// ======================================
// ДА НА ПЕРВЫЙ ВОПРОС
// ======================================

const yesButton = document.querySelector('.yes');
if (yesButton) {
  yesButton.addEventListener('click', () => {
    for (let i = 0; i < 50; i++) {
      setTimeout(() => createHeart(), i * 30);
    }

    setTimeout(() => {
      showScreen(
        document.querySelector('.question'),
        document.querySelector('.choice')
      );
    }, 1000);
  });
}

// ======================================
// ВЫБОР СВИДАНИЯ (активности)
// ======================================

const cards = document.querySelectorAll('.date-card');
const continueButton = document.querySelector('.continue');
let activitySelected = false;

cards.forEach(card => {
  card.addEventListener('click', () => {
    cards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    activitySelected = true;
    continueButton.classList.add('active');
  });
});

continueButton.addEventListener('click', () => {
  if (activitySelected) {
    showScreen(
      document.querySelector('.choice'),
      document.querySelector('.calendar')
    );
    createCalendar(); // создаём календарь при переходе
  }
});

// ======================================
// КАЛЕНДАРЬ
// ======================================

const calendarDays = document.querySelector('.calendar-days');
const monthTitle = document.querySelector('.month-title');
let currentDate = new Date(2026, 6, 1); // 1 июля 2026

// Флаги выбора
let dateSelected = false;
let timeSelected = false;

// Элементы
const timePicker = document.querySelector('.time-picker');
const calendarButton = document.querySelector('.calendar-next');
const hint = document.createElement('p'); // подсказка для пользователя
hint.style.fontSize = '14px';
hint.style.color = '#888';
hint.style.marginTop = '5px';
hint.textContent = 'Выберите дату и время, чтобы продолжить';
if (timePicker && timePicker.parentNode) {
  timePicker.parentNode.insertBefore(hint, timePicker.nextSibling);
}

function checkCalendar() {
  if (dateSelected && timeSelected) {
    calendarButton.classList.add('active');
    calendarButton.style.opacity = '1';
    calendarButton.style.pointerEvents = 'auto';
    hint.textContent = '✅ Отлично! Нажимайте "Продолжить"';
    hint.style.color = 'green';
  } else {
    calendarButton.classList.remove('active');
    calendarButton.style.opacity = '0.5';
    calendarButton.style.pointerEvents = 'none';
    hint.textContent = 'Выберите дату и время, чтобы продолжить';
    hint.style.color = '#888';
  }
}

function createCalendar() {
  if (!calendarDays) return;
  calendarDays.innerHTML = '';

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthTitle.textContent = currentDate.toLocaleString('ru-RU', {
    month: 'long',
    year: 'numeric',
  });

  // Определяем первый день недели (Пн = 1, Вс = 7)
  let firstDay = new Date(year, month, 1).getDay();
  if (firstDay === 0) firstDay = 7;

  // Пустые ячейки до первого дня
  for (let i = 1; i < firstDay; i++) {
    calendarDays.appendChild(document.createElement('div'));
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const button = document.createElement('button');
    button.className = 'calendar-day';
    button.textContent = i;

    button.addEventListener('click', () => {
      // Снимаем выделение со всех дней
      document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
      });
      button.classList.add('selected');
      dateSelected = true;

      // Автоматически переключаем фокус на поле времени
      if (timePicker) {
        timePicker.focus();
        // На мобильных иногда не открывается пикер, но попытаемся
        timePicker.click();
      }

      checkCalendar();
    });

    calendarDays.appendChild(button);
  }

  // При создании нового месяца сбрасываем выбор даты и времени?
  // Но мы не хотим сбрасывать время, только дату – потому что время может остаться.
  // Однако если мы перелистнули месяц, дата уже неактуальна.
  dateSelected = false;
  // Убираем выделение со всех дней
  document.querySelectorAll('.calendar-day').forEach(day => {
    day.classList.remove('selected');
  });
  // Время не сбрасываем, но если оно было выбрано – оно останется,
  // но кнопка активируется только после выбора новой даты.
  checkCalendar();
}

// ======================================
// ПЕРЕЛИСТЫВАНИЕ МЕСЯЦЕВ
// ======================================

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

if (prevButton) {
  prevButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    createCalendar();
  });
}

if (nextButton) {
  nextButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    createCalendar();
  });
}

// ======================================
// ВЫБОР ВРЕМЕНИ (исправлено!)
// ======================================

if (timePicker) {
  function handleTimeChange() {
    if (timePicker.value !== '') {
      timeSelected = true;
      checkCalendar();
    } else {
      timeSelected = false;
      checkCalendar();
    }
  }

  // Слушаем оба события для максимальной совместимости
  timePicker.addEventListener('input', handleTimeChange);
  timePicker.addEventListener('change', handleTimeChange);

  // Дополнительно: если пользователь очистил поле вручную
  timePicker.addEventListener('blur', handleTimeChange);
}

// ======================================
// КНОПКА "ПРОДОЛЖИТЬ" В КАЛЕНДАРЕ
// ======================================

if (calendarButton) {
  calendarButton.addEventListener('click', () => {
    // Если по какой-то причине условия не выполнены – не переходим
    if (!dateSelected || !timeSelected) return;

    document.querySelector('.calendar').classList.remove('active');
    document.querySelector('.thanks').classList.add('active');
  });
}

// ======================================
// КНОПКА "ЕЩЁ КОЕ-ЧТО"
// ======================================

const nextQuestion = document.querySelector('.next-question');
if (nextQuestion) {
  nextQuestion.addEventListener('click', () => {
    showScreen(
      document.querySelector('.thanks'),
      document.querySelector('.final-question')
    );
  });
}

// ======================================
// ПОСЛЕДНИЙ ВОПРОС (НЕТ УБЕГАЕТ)
// ======================================

const loveNo = document.querySelector('.love-no');
if (loveNo) {
  loveNo.addEventListener('mouseover', () => {
    const x = Math.random() * 250 - 125;
    const y = Math.random() * 150 - 75;
    loveNo.style.transform = `translate(${x}px, ${y}px)`;
  });
}

const loveYes = document.querySelector('.love-yes');
const loveMessage = document.querySelector('.love-message');

if (loveYes) {
  loveYes.addEventListener('click', () => {
    if (loveMessage) loveMessage.classList.add('show');

    for (let i = 0; i < 40; i++) {
      setTimeout(() => createHeart(), i * 40);
    }

    setTimeout(() => {
      showScreen(
        document.querySelector('.final-question'),
        document.querySelector('.final')
      );
    }, 2000);
  });
}

// ======================================
// ОТКРЫТИЕ ПИСЬМА (конверт)
// ======================================

const envelope = document.querySelector('.envelope');
const letter = document.querySelector('.letter');

if (envelope && letter) {
  envelope.addEventListener('click', () => {
    letter.classList.add('open');
  });
}

// ======================================
// ФОНОВЫЕ СЕРДЕЧКИ (🤍)
// ======================================

function createBackgroundHeart() {
  const heart = document.createElement('div');
  heart.className = 'bg-heart';
  heart.innerHTML = '🤍';
  heart.style.left = Math.random() * 100 + '%';
  heart.style.fontSize = 12 + Math.random() * 18 + 'px';
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 10000);
}

setInterval(createBackgroundHeart, 700);