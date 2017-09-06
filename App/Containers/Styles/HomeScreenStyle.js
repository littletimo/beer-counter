import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  section: {
    margin: Metrics.section,
    padding: 0,
  },
  drink: {
    backgroundColor: Colors.silver,
    borderRadius: 5,
    borderWidth: 5,
    borderColor: Colors.silver,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: 'bold',
    color: Colors.black,
  },
  time: {
    color: Colors.ember,
    paddingBottom: 8,
    textAlign: 'right',
  },
  icon: {
    fontSize: 24,
  },
})
