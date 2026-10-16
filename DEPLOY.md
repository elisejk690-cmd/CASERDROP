# 🚀 Инструкция по деплою на GitHub Pages

## 📋 Что нужно сделать

### 1. Создай аккаунт на GitHub (если нет)
- Зайди на https://github.com
- Нажми "Sign up"
- Заполни форму и подтверди email

### 2. Создай новый репозиторий
- Нажми "+" в правом верхнем углу
- Выбери "New repository"
- Название: `caser-drop`
- Выбери "Public"
- **НЕ ставь** галочки "Add a README file", "Add .gitignore", "Choose a license"
- Нажми "Create repository"

### 3. Загрузи код на GitHub

Открой терминал в папке проекта и выполни команды по очереди:

```bash
# Инициализация git
git init

# Добавление всех файлов
git add .

# Создание первого коммита
git commit -m "Initial commit - Caser Drop game"

# Добавление удалённого репозитория
# ВАЖНО: Замени USERNAME на свой username GitHub!
git remote add origin https://github.com/USERNAME/caser-drop.git

# Переименование ветки
git branch -M main

# Загрузка кода на GitHub
git push -u origin main
```

### 4. Включи GitHub Pages

1. Открой свой репозиторий на GitHub
2. Перейди в **Settings** (Настройки)
3. В левом меню найди **Pages**
4. В разделе **Build and deployment**:
   - **Source**: Выбери **GitHub Actions**
5. GitHub автоматически запустит workflow

### 5. Подожди 2-3 минуты

GitHub Actions:
- Соберёт проект
- Задеплоит на GitHub Pages
- Сайт будет доступен по адресу: `https://USERNAME.github.io/caser-drop/`

### 6. Проверь сайт

Открой в браузере:
```
https://USERNAME.github.io/caser-drop/
```

## 🔄 Как обновлять сайт

После внесения изменений просто выполни:

```bash
git add .
git commit -m "Описание изменений"
git push
```

GitHub Actions автоматически пересоберёт и задеплоит новую версию!

## 🐛 Если что-то не работает

### Проверь workflow
1. Зайди в репозиторий
2. Перейди в **Actions**
3. Посмотри статус последнего запуска
4. Если ошибка - нажми на него и посмотри логи

### Очисти кэш браузера
- Нажми `Ctrl + Shift + R` (Windows/Linux)
- Или `Cmd + Shift + R` (Mac)

### Проверь настройки Pages
1. Settings → Pages
2. Убедись, что Source = **GitHub Actions**
3. Должна быть зелёная галочка "Deployed"

## 📱 Доступ с телефона

Сайт будет работать на любом устройстве:
- Компьютер
- Телефон
- Планшет

Просто открой ссылку в браузере!

## 🌐 Свой домен (опционально)

Если хочешь свой домен (например, `caserdrop.com`):

1. Купи домен на любом регистраторе (Namecheap, GoDaddy, etc.)
2. В настройках домена добавь CNAME запись:
   - Name: `www`
   - Value: `USERNAME.github.io`
3. В GitHub: Settings → Pages → Custom domain
4. Введи свой домен
5. Подожди 10-30 минут

## 💡 Советы

- **Делай коммиты часто** - это поможет отслеживать изменения
- **Пиши понятные сообщения коммитов** - например "Add battle mode", "Fix upgrade bug"
- **Используй ветки** для больших изменений:
  ```bash
  git checkout -b new-feature
  # делай изменения
  git push -u origin new-feature
  # потом создай Pull Request на GitHub
  ```

## 🎉 Готово!

Теперь твой сайт работает 24/7 на GitHub Pages бесплатно!
