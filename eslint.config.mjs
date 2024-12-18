import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import pluginReact from 'eslint-plugin-react';
import tseslint, { parser as TsEslintParser } from 'typescript-eslint';
import stylisticJs from '@stylistic/eslint-plugin-js';

export default [
	pluginJs.configs.recommended,
	pluginReact.configs.flat.recommended,
	...tseslint.configs.recommendedTypeChecked,
	{
		files: ['**/*.{js,cjs,ts,tsx}',],
		plugins: {
			'@stylistic': stylistic,
			'@stylistic/js': stylisticJs
		},
		languageOptions: {
			parser: TsEslintParser,
			parserOptions: {
				sourceType: 'module',
				project: './tsconfig.json'
			}
		},
		settings: {
			react: {
				version: 'detect'
			}
		},
		rules: {
			// Any type
			'@typescript-eslint/no-explicit-any': 'error',

			// Possible Errors
			'no-console': 'warn', // Warns on console statements
			'no-debugger': 'warn', // Warns on debugger statements

			// Best Practices
			'eqeqeq': ['error', 'always',], // Enforces the use of === and !==
			'no-eval': 'error', // Disallows the use of eval()
			'no-implied-eval': 'error', // Disallows the use of implied eval()
			'no-new': 'error', // Disallows new operators with a Function object

			// Variables
			'no-unused-vars': ['warn', { args: 'none' },], // Warns on unused variables, but not on unused function arguments
			// 'no-undef': 'error', // Disallows the use of undeclared variables

			'@stylistic/indent': ['error', 'tab',], // Enforce the use of tabs for indentation
			'@stylistic/no-multi-spaces': ['error',], // Disallow multiple spaces in code

			// Require a trailing comma in array and object literals
			// Do not allow trailing commas in imports, exports, or function parameters
			'comma-dangle': ['error', {
				'arrays': 'always', // Trailing comma required for array elements
				'objects': 'never', // No trailing comma allowed in object properties
				'imports': 'never', // No trailing comma allowed in import declarations
				'exports': 'never', // No trailing comma allowed in export declarations
				'functions': 'never' // No trailing comma allowed in function parameters
			},],

			'@stylistic/brace-style': 'error', // Enforce consistent brace style (e.g., one true brace style for blocks)
			'@stylistic/block-spacing': ['error', 'always',], // Enforce consistent spacing inside blocks Requires a space inside curly braces
			'@stylistic/array-bracket-spacing': ['error', 'never',], // Disallow spacing inside array brackets
			'quotes': ['error', 'single',], // Enforces the use of single quotes
			'semi': ['error', 'always',], // Enforces the use of semicolons
			'object-shorthand': ['error', 'always',], // Enforces shorthand notation for object properties

			// Enforce the use of dot notation when accessing object properties
			// This rule ensures that properties are accessed using dot notation where possible, instead of bracket notation
			'dot-notation': 'error',

			// ES6+ Features
			'prefer-const': 'error', // Suggests using const for variables that are never reassigned
			'no-var': 'error', // Disallows the use of var and enforces let/const
			'arrow-spacing': ['error', { before: true, after: true },], // Enforces consistent spacing around arrow function arrows
			'react/react-in-jsx-scope': 'off',
			'@stylistic/js/jsx-quotes': ['error', 'prefer-single',],
			'no-undef': 'off',
			"react/prop-types": 0,
		    "@typescript-eslint/await-thenable": "off",
			"@typescript-eslint/no-misused-promises": "off"
		}
	},
];