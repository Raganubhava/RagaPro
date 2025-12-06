// apps/web/src/reanimated-web-stub.tsx
import * as React from 'react';

// Basic no-op shared value
export function useSharedValue<T>(initial: T): { value: T } {
  return { value: initial };
}

// Basic no-op animated style
export function useAnimatedStyle(
  factory: () => Record<string, any>,
  deps?: React.DependencyList
): () => Record<string, any> {
  // Just return a plain style; ignore animations
  const style = factory();
  return () => style;
}

// Basic timing/spring/etc that just return the value
export function withTiming<T>(toValue: T, _config?: any) {
  return toValue;
}
export function withSpring<T>(toValue: T, _config?: any) {
  return toValue;
}
export function withDelay<T>(_delayMs: number, toValue: T) {
  return toValue;
}
export function withRepeat<T>(toValue: T) {
  return toValue;
}
export function withSequence<T>(...values: T[]) {
  return values[values.length - 1];
}

export function withDecay<T>(config?: any, _callback?: (finished: boolean) => void): T {
  // A simple no-op implementation for the web stub
  return (typeof config === 'object' && config.toValue) ? config.toValue : 0 as any;
}

// runOnJS shim just calls the function
export function runOnJS(fn: (...args: any[]) => any, ...args: any[]) {
  return fn(...args);
}

// Add the missing createAnimatedComponent function
export function createAnimatedComponent<P extends object>(Component: React.ComponentType<P>) {
  return Component; // no-op wrapper
}

// A very simple "Animated" View/Text that just render div/span
export const View: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => (
  <div {...rest}>{children}</div>
);

export const Text: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ children, ...rest }) => (
  <span {...rest}>{children}</span>
);

// Default export for imports like "import Animated from 'react-native-reanimated'"
const Animated = {
  View,
  Text,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  withRepeat,
  withSequence,
  withDecay,
  runOnJS,
  createAnimatedComponent, // Add createAnimatedComponent to the default export
};

export default Animated;
