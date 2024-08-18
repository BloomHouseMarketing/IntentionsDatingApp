import React, { useEffect } from 'react';
import { Animated, View, Dimensions, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../utils';

const { width, height } = Dimensions.get('screen');

const tabs: Animated.Value[] = Array.from({ length: 5 }, () => new Animated.Value(0));

interface LoaderProps {
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ color = colors.primary }) => {
  useEffect(() => {
    const animateHeight = () => {
      const animations = tabs.map((tab, index) =>
        Animated.sequence([
          Animated.timing(tab, {
            toValue: 1,
            duration: 400,
            delay: index * 120,
            useNativeDriver: false,
          }),
          Animated.timing(tab, {
            toValue: 0,
            duration: 400,
            useNativeDriver: false,
          }),
        ])
      );

      Animated.parallel(animations).start(() => animateHeight());
    };

    animateHeight();
  }, []);

  const renderItems = () => {
    return tabs.map((tab, index) => {
      const height1 = tab.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [20, 24, 36],
      });

      const height2 = tab.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [36, 24, 20],
      });

      return (
        <Animated.View
          key={index}
          style={[
            styles.animatedView,
            {
              backgroundColor: color,
              height: index % 2 === 0 ? height1 : height2,
            },
          ]}
        />
      );
    });
  };

  const loader = useSelector<{ appReducer: { loader: boolean } }, boolean>(
    (state) => state.appReducer?.loader || false
  );

  if (!loader) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.loaderContainer}>{renderItems()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    zIndex: 99,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  animatedView: {
    width: 6,
    marginLeft: 5,
    borderRadius: 50,
  },
});

export default Loader;
