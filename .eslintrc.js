module.exports = {
    parser: "@typescript-eslint/parser",
    env: {
      jest: true,
      browser: true,
    },
    plugins: [
      'react',
      'react-native',
      "@typescript-eslint"
    ],
    parserOptions: {
      "project": "./tsconfig.json"
    },
    extends: [
      "airbnb",
      "airbnb/hooks",
    ],
    rules: {
      'import/no-extraneous-dependencies': ["error", {
        "packageDir": ".",
        devDependencies: true,
      }],
      'function-paren-newline': ['error', 'consistent'],
      'jsx-a11y/label-has-for': [
        'error',
        {
          components: ['label'],
          required: {
            some: ['nesting', 'id']
          }
        }
      ],
      'max-len': [
        'error',
        {
          code: 80,
          ignoreComments: true,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreTrailingComments: true,
          ignoreUrls: true,
          tabWidth: 2
        }
      ],
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 1
        }
      ],
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react/jsx-filename-extension': ['off'],
      'react/jsx-one-expression-per-line': ['off'],
      semi: ['error', 'never'],
      'sort-keys': ['off'],
      'sort-vars': ['off'],
      'space-before-function-paren': ['error', 'always'],
      'react/prop-types': [
        'error',
        {
          ignore: ['navigation'],
        },
      ],
      'import/prefer-default-export': 0,
      'import/no-unresolved': 0,
      'import/extensions': 0,
      'react-native/no-inline-styles': 2,
      'comma-dangle': [
        'error',
        'only-multiline',
      ],
      'arrow-parens': [
        'error',
        'as-needed',
        { "requireForBlockBody": true }
      ],
      'react/jsx-props-no-spreading': ['off'],
      'implicit-arrow-linebreak': ['off'],
      'react/jsx-wrap-multilines': ['off'],
      'react/destructuring-assignment': ['off'],
      'operator-linebreak': ['off'],
      'function-paren-newline': ['off'],
      'react/state-in-constructor': ['off'],
      'object-curly-newline': ['off'],
      'react/default-props-match-prop-types': ['off'],
      'no-multiple-empty-lines': ['off'],
      'react/jsx-fragments': ['off'],
      'react/jsx-curly-brace-presence': ['off'],
      'react/jsx-curly-newline': ['off'],
      'import/no-useless-path-segments': ['off'],
      'lines-between-class-members': ['off'],
      'react/jsx-tag-spacing': ['off'],
      'react/forbid-foreign-prop-types': ['off'],
      'onBottomReached': ['off'],
      'react/jsx-indent': ['off'],
      'multiline-ternary': ['off'],
      'no-else-return': ['off'],
      'no-useless-escape': ['off'],
      'react/sort-comp': ['off'],
      'import/no-cycle': ['off'],
      'react/no-access-state-in-setstate': ['off'],
      'max-classes-per-file': ['off'],
      'react-hooks/exhaustive-deps': ['off'],
      'comma-style': ['off'],
    },
    overrides: [
      {
        "files": ["*.ts", '*.tsx'],
        extends: [
          "plugin:@typescript-eslint/eslint-recommended",
          "plugin:@typescript-eslint/recommended",
          "plugin:@typescript-eslint/recommended-requiring-type-checking"
        ],
      }
    ]
  }