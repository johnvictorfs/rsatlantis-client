# How to contribute

- [Build instructions](#build-instructions)
- [Contribution guidelines](#contribution-guidelines)
  - [Tests](#tests)
  - [Linting](#linting)
  - [Coding Conventions](#coding-conventions)
- [License](#license)

---

# Build instructions

- Install dependencies with [yarn](https://github.com/yarnpkg/yarn)
  ```bash
  yarn
  ```

- Create config file for API URL `.env`
  ```ini
  # If your local Django server is running on a different port
  # for some reason, change it here accordingly
  VUE_APP_API_URL="http://localhost:8000"
  ```

- Run local development server
  ```
  yarn serve
  ```

---

# Contribution Guidelines

## Linting

Every component/helper files etc. need to be properly linted and already come with the used configuration and libraries used for linting in their package manager files, so should already be installed.

If you use the [Visual Studio Code](https://github.com/microsoft/vscode) editor and open the workspace `ws.code-workspace` in the project root, it should ask you to install recommended extensions, those extensions will setup linting in the editor for you and highlight any linting errors automatically.

Linting is also checked for with CI when you make a pull request, pull requests that fail CI for linting will not be merged.

- **Frontend linting**
  ```bash
  yarn lint
  ```

---

## Coding conventions

- All Vue components should be [Single File Components](https://vuejs.org/v2/guide/single-file-components.html) and use [TypeScript](https://vuejs.org/v2/guide/typescript.html#Class-Style-Vue-Components). Class-Style components are not necessary but it's the most used in the project.

- [SCSS](https://sass-lang.com/documentation/syntax#scss) is preferable over CSS or SASS in `<style>` tags. Also always prefer [scoped styles](https://vue-loader.vuejs.org/guide/scoped-css.html) over global styles. If you feel like a style is gonna be used enough to be global, it should probably reside in the `/src/scss/main.scss` file (or create another `.scss` file and import it in `main.scss`).

- [Vuetify](https://vuetifyjs.com) components are preferred over brand new components if there's one that already fills the requirements for whatever is being done.

---

## License

Refer to [LICENSE](LICENSE)
