require('react-native-gesture-handler/jestSetup');

jest.mock('@react-native-firebase/app', () => ({
  __esModule: true,
  default: {
    apps: [],
    initializeApp: jest.fn(),
  },
}));

jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: () => ({
    signInWithEmailAndPassword: jest.fn(),
  }),
}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});
