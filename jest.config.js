module.exports = {
  transform: {
    '^.+\\.svelte$': 'svelte-jester',
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'svelte'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest',
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
  },
  testPathIgnorePatterns: ['node_modules'],
  transformIgnorePatterns: ['/node_modules/(?!@smui|@material).+\\.js$'],
}
