# React minesweeper

## Създаване на проект

1. `npm init -y`
2. `npm install @webpack-cli/generators`
3. `npx webpack-cli init`

```
(node:346206) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
? Which of the following JS solutions do you want to use? Typescript
? Do you want to use webpack-dev-server? Yes
? Do you want to simplify the creation of HTML files for your bundle? Yes
? Do you want to add PWA support? Yes
? Which of the following CSS solutions do you want to use? CSS only
? Will you be using PostCSS in your project? No
? Do you want to extract CSS for every file? No
? Do you like to install prettier to format generated configuration? Yes
? Pick a package manager: npm
[webpack-cli] ℹ INFO  Initialising project...
 conflict package.json
? Overwrite package.json? overwrite
    force package.json
   create src/index.ts
   create README.md
   create index.html
   create webpack.config.js
   create tsconfig.json

Changes to package.json were detected.

Running npm install for you to install the required dependencies.
```

Пускаме приложението в режим на разработка с командата `npx webpack-dev-server`.
сървърът автоматично компилира и презарежда нужните файлове при промяна.

като част от предната стъпка получаваме и пакета `prettier`, който ни дава
инструменти, с които да проверяваме и налагаме определни правила за стила на
кода в проекта ни. ако инсталираме съответното разширение (от
[тук](https://open-vsx.org/extension/esbenp/prettier-vscode) за vscodium или от
[тук](https://marketplace.visualstudio.com/items?itemname=esbenp.prettier-vscode)
за vscode) редактора ще се грижи автоматично да форматира кода ни с `prettier`.
конкретни правила за това как искаме да бъде форматиран кода можем да
настройваме в `.prettierrc` файла в основната папка на приложението ни (в случая
папката за седмица 06).

`npm install react react-dom @types/react @types/react-dom`

## `src/minesweeper/game.ts`

Това е просто typescript код, който реализира самата имплементация на играта.

## `src/index.ts`

Входната точка на проекта ни, в която React приложението се „закача“ в DOM-а на
страницата ни.

## `src/Application.tsx`

Съществената реализация на потребителския интерфейс на играта.

### `Application`

Главният компонент на интерфейса.

### `Board`

Компонента, рендериращ дъската на играта.

### `Cell`

Компонент, рендериращ клетка. С `onMouseDown` задаваме обработчик за натискане
на което и да е копче на мишката. Тъй като поведението по подразбиране на
браузърите е при десен бутон да се отваря контекстното меню, е нужно да извикаме
и `event.preventDefault` в `onContextMenu`, за да си подсигурим, че
`onMouseDown` обработчика ни ще бъде извикан и в тези случаи, вместо да се
показва контекстно меню.

## Управление на състоянието

Тъй като отварянето на една клетка може да доведе до отварянето на още клетки е
нужно да имаме механизъм, по който това да се случва. Постигаме това с
`emitSelfChange` аргумента на конструктура на `Game` класа.
