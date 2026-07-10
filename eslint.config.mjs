import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

const eslintConfig = [
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  ...nextCoreWebVitals,
  ...nextTs,
  prettierRecommended,
  {
    rules: {
      'no-console': 'warn',
      // Newly-added rules in eslint-plugin-react-hooks v7 (React Compiler-aware).
      // Kept off to preserve the pre-upgrade lint contract; revisit to adopt gradually.
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/refs': 'off',
      'react/jsx-sort-props': [
        2,
        {
          callbacksLast: true,
          shorthandFirst: false,
          shorthandLast: false,
          ignoreCase: true,
          noSortAlphabetically: true,
        },
      ],
      'react/no-unescaped-entities': 'off',
      'prettier/prettier': 'error',
    },
  },
]

export default eslintConfig
