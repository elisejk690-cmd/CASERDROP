# 🎮 Caser Drop

CS2 Case Opening Game с полным функционалом

## 🚀 Деплой на GitHub Pages

### 1. Создай репозиторий на GitHub

1. Зайди на https://github.com/new
2. Название: `caser-drop`
3. Public
4. Create repository

### 2. Загрузи код

Открой терминал в папке проекта и выполни:

```bash
# Инициализация git
git init

# Добавление файлов
git add .

# Первый коммит
git commit -m "Initial commit"

# Добавление remote (замени USERNAME на свой username GitHub)
git remote add origin https://github.com/USERNAME/caser-drop.git

# Push
git branch -M main
git push -u origin main
```

### 3. Включи GitHub Pages

1. Зайди в репозиторий на GitHub
2. Settings → Pages
3. Source: **GitHub Actions**
4. Workflow автоматически запустится при push

### 4. Готово!

Через 2-3 минуты сайт будет доступен по адресу:
```
https://USERNAME.github.io/caser-drop/
```

## 🔄 Автоматический деплой

При каждом push в ветку `main` GitHub Actions автоматически:
- Соберёт проект
- Задеплоит на GitHub Pages
- Обновит сайт

Просто делай:
```bash
git add .
git commit -m "Update"
git push
```

## 📦 Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр сборки
npm run preview
```

## 🎯 Функции

- ✅ Открытие кейсов с анимацией
- ✅ Апгрейдер с визуальной рулеткой
- ✅ Баттл режим (VS Bot)
- ✅ Crash Game
- ✅ Угадай цену
- ✅ Кланы
- ✅ Трейды между пользователями
- ✅ Лимитированные кейсы
- ✅ Осенний ивент с квестами
- ✅ Кейсы за время
- ✅ Админ панель
- ✅ Система редких предметов
- ✅ Персональные шансы
- ✅ Промокоды
- ✅ Реферальная система

## 🛠️ Технологии

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React Icons

## 📝 Лицензия

MIT
