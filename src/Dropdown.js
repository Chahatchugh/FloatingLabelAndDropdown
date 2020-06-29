import React, {useState, useEffect, createRef} from 'react';
import {
  Keyboard,
  Modal,
  Picker,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import {defaultStyles} from './dropDownStyle';

const defaultProps = {
  value: undefined,
  placeholder: {
    label: 'Select an item...',
    value: null,
    color: '#9EA0A4',
  },
  disabled: false,
  itemKey: null,
  style: {},
  children: null,
  useNativeAndroidPickerStyle: false,
  doneText: 'Done',
  onDonePress: null,
  onUpArrow: null,
  onDownArrow: null,
  onOpen: null,
  onClose: null,
  modalProps: {},
  textInputProps: {},
  pickerProps: {},
  touchableDoneProps: {},
  touchableWrapperProps: {},
  Icon: null,
  InputAccessoryView: null,
};

const Dropdown = props => {
  props = {...defaultProps, ...props};
  // export default class RNPickerSelect extends PureComponent {
  // const propTypes = {
  //     onValueChange: PropTypes.func.isRequired,
  //     items: PropTypes.arrayOf(
  //         PropTypes.shape({
  //             label: PropTypes.string.isRequired,
  //             value: PropTypes.any.isRequired,
  //             key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  //             color: PropTypes.string,
  //             displayValue: PropTypes.bool,
  //         })
  //     ).isRequired,
  //     value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  //     placeholder: PropTypes.shape({
  //         label: PropTypes.string,
  //         value: PropTypes.any,
  //         key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  //         color: PropTypes.string,
  //     }),
  //     disabled: PropTypes.bool,
  //     itemKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  //     style: PropTypes.shape({}),
  //     children: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  //     onOpen: PropTypes.func,
  //     useNativeAndroidPickerStyle: PropTypes.bool,

  //     // Custom Modal props (iOS only)
  //     doneText: PropTypes.string,
  //     onDonePress: PropTypes.func,
  //     onUpArrow: PropTypes.func,
  //     onDownArrow: PropTypes.func,
  //     onClose: PropTypes.func,

  //     // Modal props (iOS only)
  //     modalProps: PropTypes.shape({}),

  //     // TextInput props (iOS only)
  //     textInputProps: PropTypes.shape({}),

  //     // Picker props
  //     pickerProps: PropTypes.shape({}),

  //     // Touchable Done props (iOS only)
  //     touchableDoneProps: PropTypes.shape({}),

  //     // Touchable wrapper props
  //     touchableWrapperProps: PropTypes.shape({}),

  //     // Custom Icon
  //     Icon: PropTypes.func,
  //     InputAccessoryView: PropTypes.func,
  // };
  const [items, changeItems] = useState([]);
  const [selectedItem, changeSelectedItem] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const [animationType, setAnimationType] = useState(undefined);
  const [orientation, changeOrientation] = useState('portrait');
  const [doneDepressed, setDoneDepressed] = useState(false);
  let inputRef = createRef();

  useEffect(() => {
    const newItems = handlePlaceholder({
      placeholder: props.placeholder,
    }).concat(props.items);
    changeItems(newItems);
    const {selectedItem: newSelectedItem} = getSelectedItem({
      key: props.itemKey,
      value: props.value,
    });
    changeSelectedItem(newSelectedItem);
  }, [
    props.itemKey,
    props.items,
    props.value,
  ]);

  const handlePlaceholder = ({placeholder}) => {
    if (isEqual(placeholder, {})) {
      return [];
    }
    return [placeholder];
  };

  const getSelectedItem = ({key, value}) => {
    let idx = items.findIndex(item => {
      if (item.key && key) {
        return isEqual(item.key, key);
      }
      return isEqual(item.value, value);
    });
    if (idx === -1) {
      idx = 0;
    }
    return {
      selectedItem: items[idx] || {},
      idx,
    };
  };

  // const getDerivedStateFromProps = (nextProps, prevState) => {
  //   // update items if items or placeholder prop changes
  //   const items = Dropdown.handlePlaceholder({
  //     placeholder: nextProps.placeholder,
  //   }).concat(nextProps.items);
  //   const itemsChanged = !isEqual(prevState.items, items);

  //   // update selectedItem if value prop is defined and differs from currently selected item
  //   const {selectedItem, idx} = Dropdown.getSelectedItem({
  //     items,
  //     key: nextProps.itemKey,
  //     value: nextProps.value,
  //   });
  //   const selectedItemChanged =
  //     !isEqual(nextProps.value, undefined) &&
  //     !isEqual(prevState.selectedItem, selectedItem);

  //   if (itemsChanged || selectedItemChanged) {
  //     if (selectedItemChanged) {
  //       nextProps.onValueChange(selectedItem.value, idx);
  //     }

  //     return {
  //       ...(itemsChanged ? {items} : {}),
  //       ...(selectedItemChanged ? {selectedItem} : {}),
  //     };
  //   }

  //   return null;
  // };

  // constructor(props) {
  //     super(props);

  //     const items = RNPickerSelect.handlePlaceholder({
  //         placeholder: props.placeholder,
  //     }).concat(props.items);

  //     const { selectedItem } = RNPickerSelect.getSelectedItem({
  //         items,
  //         key: props.itemKey,
  //         value: props.value,
  //     });

  //     this.state = {
  //         items,
  //         selectedItem,
  //         showPicker: false,
  //         animationType: undefined,
  //         orientation: 'portrait',
  //         doneDepressed: false,
  //     };

  //     this.onUpArrow = this.onUpArrow.bind(this);
  //     this.onDownArrow = this.onDownArrow.bind(this);
  //     this.onValueChange = this.onValueChange.bind(this);
  //     this.onOrientationChange = this.onOrientationChange.bind(this);
  //     this.setInputRef = this.setInputRef.bind(this);
  //     this.togglePicker = this.togglePicker.bind(this);
  //     this.renderInputAccessoryView = this.renderInputAccessoryView.bind(this);
  // }

  const onUpArrow = () => {
    const {onUpArrow} = props;

    togglePicker(false, onUpArrow);
  };

  const onDownArrow = () => {
    const {onDownArrow} = props;

    togglePicker(false, onDownArrow);
  };

  const onValueChange = (value, index) => {
    const {onValueChange} = props;
    onValueChange(value, index);
    changeSelectedItem(items[index]);
    // setState((prevState) => {
    //     return {
    //         selectedItem: prevState.items[index],
    //     };
    // });
  };

  const onOrientationChange = ({nativeEvent}) => {
    changeOrientation(nativeEvent.orientation);
  };

  const setInputRef = ref => {
    inputRef = ref;
  };

  const getPlaceholderStyle = () => {
    const {placeholder, style} = props;

    if (!isEqual(placeholder, {}) && selectedItem.label === placeholder.label) {
      return {
        ...defaultStyles.placeholder,
        ...style.placeholder,
      };
    }
    return {};
  };

  const triggerOpenCloseCallbacks = () => {
    const {onOpen, onClose} = props;

    if (!showPicker && onOpen) {
      onOpen();
    }

    if (showPicker && onClose) {
      onClose();
    }
  };

  const togglePicker = (animate = false, postToggleCallback) => {
    const {modalProps, disabled} = props;

    if (disabled) {
      return;
    }

    if (!showPicker) {
      Keyboard.dismiss();
    }

    const animationType =
      modalProps && modalProps.animationType
        ? modalProps.animationType
        : 'slide';

    triggerOpenCloseCallbacks();
    setAnimationType(animate ? animationType : undefined);
    setShowPicker(!showPicker);
    if (postToggleCallback) {
      postToggleCallback();
    }
  };

  const renderPickerItems = () => {
    return items.map(item => {
      return (
        <Picker.Item
          label={item.label}
          value={item.value}
          key={item.key || item.label}
          color={item.color}
        />
      );
    });
  };

  const renderInputAccessoryView = () => {
    const {
      InputAccessoryView,
      doneText,
      onUpArrow,
      onDownArrow,
      onDonePress,
      style,
      touchableDoneProps,
    } = props;

    if (InputAccessoryView) {
      return <InputAccessoryView testID="custom_input_accessory_view" />;
    }

    return (
      <View
        style={[defaultStyles.modalViewMiddle, style.modalViewMiddle]}
        testID="input_accessory_view">
        <View style={[defaultStyles.chevronContainer, style.chevronContainer]}>
          <TouchableOpacity
            activeOpacity={onUpArrow ? 0.5 : 1}
            onPress={onUpArrow ? onUpArrow : null}>
            <View
              style={[
                defaultStyles.chevron,
                style.chevron,
                defaultStyles.chevronUp,
                style.chevronUp,
                onUpArrow
                  ? [defaultStyles.chevronActive, style.chevronActive]
                  : {},
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={onDownArrow ? 0.5 : 1}
            onPress={onDownArrow ? onDownArrow : null}>
            <View
              style={[
                defaultStyles.chevron,
                style.chevron,
                defaultStyles.chevronDown,
                style.chevronDown,
                onDownArrow
                  ? [defaultStyles.chevronActive, style.chevronActive]
                  : {},
              ]}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          testID="done_button"
          onPress={() => {
            togglePicker(true, onDonePress);
          }}
          onPressIn={() => {
            setDoneDepressed(true);
          }}
          onPressOut={() => {
            setDoneDepressed(false);
          }}
          hitSlop={{top: 4, right: 4, bottom: 4, left: 4}}
          {...touchableDoneProps}>
          <View testID="needed_for_touchable">
            <Text
              testID="done_text"
              allowFontScaling={false}
              style={[
                defaultStyles.done,
                style.done,
                doneDepressed
                  ? [defaultStyles.doneDepressed, style.doneDepressed]
                  : {},
              ]}>
              {doneText}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderIcon = () => {
    const {style, Icon} = props;

    if (!Icon) {
      return null;
    }

    return (
      <View
        testID="icon_container"
        style={[defaultStyles.iconContainer, style.iconContainer]}>
        <Icon testID="icon" />
      </View>
    );
  };

  const renderTextInputOrChildren = () => {
    const {children, style, textInputProps} = props;
    const containerStyle =
      Platform.OS === 'ios'
        ? style.inputIOSContainer
        : style.inputAndroidContainer;

    if (children) {
      return (
        <View pointerEvents="box-only" style={containerStyle}>
          {children}
        </View>
      );
    }

    return (
      <View pointerEvents="box-only" style={containerStyle}>
        <TextInput
          testID="text_input"
          style={[
            Platform.OS === 'ios' ? style.inputIOS : style.inputAndroid,
            getPlaceholderStyle(),
          ]}
          value={
            selectedItem.displayValue ? selectedItem.value : selectedItem.label
          }
          ref={setInputRef}
          editable={false}
          {...textInputProps}
        />
        {renderIcon()}
      </View>
    );
  };

  //   const renderIOS = () => {
  //     const {style, modalProps, pickerProps, touchableWrapperProps} = props;
  //     const {animationType, orientation, selectedItem, showPicker} = state;

  //     return (
  //       <View style={[defaultStyles.viewContainer, style.viewContainer]}>
  //         <TouchableOpacity
  //           testID="ios_touchable_wrapper"
  //           onPress={() => {
  //             togglePicker(true);
  //           }}
  //           activeOpacity={1}
  //           {...touchableWrapperProps}>
  //           {renderTextInputOrChildren()}
  //         </TouchableOpacity>
  //         <Modal
  //           testID="ios_modal"
  //           visible={showPicker}
  //           transparent
  //           animationType={animationType}
  //           supportedOrientations={['portrait', 'landscape']}
  //           onOrientationChange={onOrientationChange}
  //           {...modalProps}>
  //           <TouchableOpacity
  //             style={[defaultStyles.modalViewTop, style.modalViewTop]}
  //             testID="ios_modal_top"
  //             onPress={() => {
  //               togglePicker(true);
  //             }}
  //           />
  //           {renderInputAccessoryView()}
  //           <View
  //             style={[
  //               defaultStyles.modalViewBottom,
  //               {height: orientation === 'portrait' ? 215 : 162},
  //               style.modalViewBottom,
  //             ]}>
  //             <Picker
  //               testID="ios_picker"
  //               onValueChange={onValueChange}
  //               selectedValue={selectedItem.value}
  //               {...pickerProps}>
  //               {renderPickerItems()}
  //             </Picker>
  //           </View>
  //         </Modal>
  //       </View>
  //     );
  //   };

  const renderAndroidHeadless = () => {
    const {
      disabled,
      Icon,
      style,
      pickerProps,
      onOpen,
      touchableWrapperProps,
    } = props;

    return (
      <TouchableOpacity
        testID="android_touchable_wrapper"
        onPress={onOpen}
        activeOpacity={1}
        {...touchableWrapperProps}>
        <View style={style.headlessAndroidContainer}>
          {renderTextInputOrChildren()}
          <Picker
            style={[
              Icon ? {backgroundColor: 'transparent'} : {}, // to hide native icon
              defaultStyles.headlessAndroidPicker,
              style.headlessAndroidPicker,
            ]}
            testID="android_picker_headless"
            enabled={!disabled}
            onValueChange={onValueChange}
            selectedValue={selectedItem.value}
            {...pickerProps}>
            {renderPickerItems()}
          </Picker>
        </View>
      </TouchableOpacity>
    );
  };

    const renderAndroidNativePickerStyle = () => {
      const {disabled, Icon, style, pickerProps} = props;

      return (
        <View style={[defaultStyles.viewContainer, style.viewContainer]}>
          <Picker
            style={[
              Icon ? {backgroundColor: 'transparent'} : {}, // to hide native icon
              style.inputAndroid,
              getPlaceholderStyle(),
            ]}
            testID="android_picker"
            enabled={!disabled}
            onValueChange={onValueChange}
            selectedValue={selectedItem.value}
            {...pickerProps}>
            {renderPickerItems()}
          </Picker>
          {renderIcon()}
        </View>
      );
    };

  const {children, useNativeAndroidPickerStyle} = props;

  //   if (Platform.OS === 'ios') {
  //     return renderIOS();
  //   }

  if (children || !useNativeAndroidPickerStyle) {
    return renderAndroidHeadless();
  }
  return renderAndroidNativePickerStyle();
};

export {defaultStyles};
export default Dropdown;
