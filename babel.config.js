module.exports = {
  presets: [['@babel/env'], '@babel/react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true
      }
    ],
    [
      'babel-plugin-styled-components',
      {
        ssr: false,
        displayName: false,
        fileName: false,
        pure: true
      }
    ]
  ]
}
