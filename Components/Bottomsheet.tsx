import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

const BottomSheet = ({
  children,
  onOpen,
  onClose,
  isOpen = false,
}: {
  children: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  isOpen?: boolean;
}) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(isOpen);
  const translateY = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isOpen) {
      animateBottomSheetOpen();
    } else {
      animateBottomSheetClose();
    }
  }, [isOpen]);

  const animateBottomSheetOpen = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const animateBottomSheetClose = () => {
    Animated.timing(translateY, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleOpen = () => {
    setIsBottomSheetOpen(true);
    onOpen && onOpen(); // Call external open callback
  };

  const handleClose = () => {
    setIsBottomSheetOpen(false);
    onClose && onClose(); // Call external close callback
  };

  const handlePanGesture = Animated.event(
    [
      {
        nativeEvent: { translationY: translateY },
      },
    ],
    { useNativeDriver: true }
  );

  return (
    <Animated.View
      style={[styles.bottomSheet, { transform: [{ translateY }] }]}
    >
      <PanGestureHandler onGestureEvent={handlePanGesture}>
        <TouchableOpacity activeOpacity={1} onPress={handleClose}>
          <View style={styles.content}>{children}</View>
        </TouchableOpacity>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    borderRadius: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  content: {
    padding: 20,
  },
});

export default BottomSheet;
