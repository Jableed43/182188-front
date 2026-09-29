import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  // Código de la app (src/): corre en el navegador, reglas de React incluidas.
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['scripts/**'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  // Scripts (scripts/): corren en Node, no en el navegador, así que necesitan
  // los globals de Node (process, etc.) en vez de los de browser, y no tiene
  // sentido aplicarles las reglas de hooks de React.
  {
    files: ['scripts/**/*.js'],
    extends: [js.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
  },
])
