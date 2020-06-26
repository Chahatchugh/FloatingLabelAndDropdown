#react-native-floating-label-and-dropdown Build Status npm version MIT licensed Code Climate

A <FloatingLabel> component for react-native. This is still very much a work in progress and only handles the simplest of cases, ideas and contributions are very welcome.

Add it to your project
Run npm install react-native-floating-label-and-dropdown --save
var FloatingLabel = require('react-native-floating-labels');

FloatingLabel is just like any TextInput. It supports the below mentioned events handlers:

Following properties of TextInput are supported:

- autoCapitalize
- autoCorrect
- autoFocus
- bufferDelay
- clearButtonMode
- clearTextOnFocus
- controlled
- editable
- enablesReturnKeyAutomatically
- icon      // 0.
- keyboardType
- maxLength // 1.
- multiline
- password
- ref       //  2.
- returnKeyType
- selectTextOnFocus
- selectionState
- style
- testID
- value
- withDropdown  // 3. 


Following events are supported:

- onBlur
- onChange
- onChangeText
- onEndEditing
- onFocus
- onSubmitEditing
