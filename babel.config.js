module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@controller': './src/app/Controller',
          '@domain': './src/app/Domain',
          '@error': './src/app/Error',
          '@events': './src/app/Events',
          '@interfaces': './src/app/Interfaces',
          '@middleware': './src/app/Middleware',
          '@provider': './src/app/Provider',
          '@singleton': './src/app/Singleton',
          '@infra': './src/infra',
          '@config': './src/infra/Config',
          '@database': './src/infra/Database',
          '@exception': './src/infra/Exceptions',
          '@routes': './src/infra/Routes',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
