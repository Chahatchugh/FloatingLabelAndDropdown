/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import {
  TextInput,
  Animated,
  Easing,
  View,
  Text,
} from 'react-native';
import style from './style';

function getLabelStyle(dirty) {
  const placeHolderStyle = dirty ? style.dirtyStyle : style.cleanStyle;
  return {
    fontSize: new Animated.Value(placeHolderStyle.fontSize),
    top: new Animated.Value(placeHolderStyle.top),
  };
}

const FloatingLabel = (props) => {
  let textInput = useRef(null);
  const [text, changeText] = useState(props.value);
  const [dirty, changeDirty] = useState(props.value || props.placeholder);
  const [labelStyle] = useState(getLabelStyle(dirty));

  const animate = (isDirty) => {
    const nextStyle = isDirty ? style.dirtyStyle : style.cleanStyle;
    const animation = Object.keys(nextStyle).map((prop) => Animated.timing(
      labelStyle[prop],
      {
        toValue: nextStyle[prop],
        duration: 200,
        useNativeDriver: false
      },
      Easing.ease,
    ));

    Animated.parallel(animation).start();
  };

  useEffect(() => {
    if(props.Ref) {
      props.Ref(textInput)
    }
  }),[];

  useEffect(() => {
    if (typeof props.value !== 'undefined') {
      changeText(props.value);
      changeDirty(!!props.value);
      animate(!!props.value);
    }
  }, [props.value]);


  const onFocus = () => {
    animate(true);
    changeDirty(true);
    if (props.onFocus) {
      props.onFocus(arguments);
    }
  };

  const onBlur = () => {
    if (!text) {
      animate(false);
      changeDirty(false);
    }

    if (props.onBlur) {
      props.onBlur(arguments);
    }
  };

  const onChangeText = (newText) => {
    changeText(newText);
    if (props.onChangeText) {
      props.onChangeText(newText);
    }
  };

  const updateText = (event) => {
    changeText(event.nativeEvent.text);
    if (props.onEndEditing) {
      props.onEndEditing(event);
    }
  };

  const renderLabel = () => (
    <Animated.Text
      style={[labelStyle, style.label, props.labelStyle]}
    >
      {props.name}
    </Animated.Text>
  );

  const elementStyles = [style.element];

  if (props.inputStyle) {
    elementStyles.push(props.inputStyle);
  }

  if (props.style) {
    elementStyles.push(props.style);
  }

  const textInputProps = {
    autoCapitalize: props.autoCapitalize,
    autoCorrect: props.autoCorrect,
    autoFocus: props.autoFocus,
    bufferDelay: props.bufferDelay,
    clearButtonMode: props.clearButtonMode,
    clearTextOnFocus: props.clearTextOnFocus,
    controlled: props.controlled,
    editable: props.editable,
    enablesReturnKeyAutomatically: props.enablesReturnKeyAutomatically,
    //icon: props.icon,                          left and right icon
    keyboardType: props.keyboardType,
    multiline: props.multiline,
    maxLength: props.maxLength,                        // maxLength Functionality
    numberOfLines: props.numberOfLines,
    onBlur: onBlur,
    onChange: props.onChange,
    onChangeText: onChangeText,
    onEndEditing: updateText,
    onFocus: onFocus,
    ref: textInput,                                    // ref Functionality
    onSubmitEditing: props.onSubmitEditing,
    password: props.secureTextEntry || props.password, // Compatibility
    placeholder: props.placeholder,
    secureTextEntry: props.secureTextEntry || props.password, // Compatibility
    returnKeyType: props.returnKeyType,
    selectTextOnFocus: props.selectTextOnFocus,
    selectionState: props.selectionState,
    selectionColor: props.selectionColor,
    style: [style.input],
    testID: props.testID,
    accessibilityLabel: props.accessibilityLabel,
    value: text,
    underlineColorAndroid: props.underlineColorAndroid, // android TextInput will show the default bottom border
    onKeyPress: props.onKeyPress,
  };

  return (
    <View style={elementStyles}>
      {renderLabel()}
      <TextInput
        {...textInputProps}
      />
    </View>
  );
};

export default FloatingLabel;
