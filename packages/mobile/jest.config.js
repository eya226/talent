module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-vector-icons|@react-navigation|@react-native-firebase|react-native-gifted-chat|react-native-parsed-text|react-native-lightbox-v2)/)',
  ],
  setupFiles: ['./jest.setup.js'],
};
