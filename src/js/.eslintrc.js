module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    extends: 'airbnb-base',
    plugins: [
        'html'
    ],
    env: {
        'browser': true,
        'es6': true
    },
    'rules': {
        'import/no-unresolved': 0,
        "indent": [1, 4],
        "comma-dangle": [1, "only-multiline"],
        "brace-style": [1, "stroustrup", { "allowSingleLine": true }],
        "arrow-spacing": [1, { "before": false, "after": true }],
        "prefer-template": 0,
        "quote-props": [0, "as-needed"],
        "no-param-reassign": 0,
        "object-curly-spacing": [1, "never"],
        "arrow-body-style": [1, "as-needed"],
        "padded-blocks": [0, "never"],
        "newline-per-chained-call": [2, { "ignoreChainWithDepth": 2 }],
        "no-restricted-syntax": 0,
        "max-len": [1, 120, 4],
        "eol-last": 1,
        'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'func-names': 0,
        'space-before-function-paren': [1, 'never'],
        'import/extensions': [1, 'always', {
            'js': 'never',
            'vue': 'never'
        }]
    }
}
