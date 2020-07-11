module.exports = {
  testEnvironment: 'jest-environment-jsdom-sixteen',
  transform: {
    '.(ts|tsx)$': require.resolve('ts-jest/dist'),
    '.(js|jsx)$': require.resolve('babel-jest'), // jest's default
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  setupFilesAfterEnv: ['./tests/setupTest.js'],
};
