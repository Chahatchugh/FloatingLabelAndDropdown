import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cleanStyle: {
    fontSize: 20,
    top: 7,
  },
  dirtyStyle: {
    fontSize: 12,
    top: -10,
  },
  element: {
    position: 'relative',
  },
  input: {
    height: 48,
    borderColor: '#C0C0C0',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    color: 'black',
    fontSize: 20,
    borderRadius: 4,
    marginTop: 10,
    borderBottomWidth: 1,
  },
  label: {
    marginTop: 21,
    paddingLeft: 3,
    color: 'black',
    position: 'absolute',
  },
});

export default styles;
