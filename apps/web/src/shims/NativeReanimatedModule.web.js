// This is the correct web fallback for Reanimated.
// It prevents TurboModuleRegistry lookups on web.

export default {
  installCoreFunctions: () => {},
  makeShareableClone: (value) => value,
  scheduleOnJS: () => {},
  scheduleOnUI: () => {},
  registerEventHandler: () => {},
  getViewProp: () => Promise.resolve(null),
  enableLayoutAnimations: () => {},
  configureProps: () => {},
};
