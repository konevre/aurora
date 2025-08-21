# Aurora Monorepo

Монорепа на базе Turborepo с настроенными ESLint и Prettier.

## Структура

```
aurora/
├── apps/          # Приложения
├── packages/      # Общие пакеты
├── turbo.json     # Конфигурация Turborepo
├── .eslintrc.js   # Конфигурация ESLint
├── .prettierrc    # Конфигурация Prettier
└── tsconfig.json  # Конфигурация TypeScript
```

## Команды

- `npm run dev` - Запуск всех приложений в режиме разработки
- `npm run build` - Сборка всех приложений
- `npm run lint` - Проверка кода ESLint
- `npm run lint:fix` - Исправление ошибок ESLint
- `npm run format` - Форматирование кода Prettier
- `npm run format:check` - Проверка форматирования
- `npm run clean` - Очистка кэша и сборок
- `npm run type-check` - Проверка типов TypeScript

## Добавление нового приложения

1. Создайте папку в `apps/`
2. Добавьте `package.json` с необходимыми скриптами
3. Настройте конфигурацию для вашего фреймворка

## Добавление нового пакета

1. Создайте папку в `packages/`
2. Добавьте `package.json` с экспортами
3. Настройте TypeScript конфигурацию
