import {PixelRatio} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Dimensions = {};

Dimensions.scaleFont = size => size * PixelRatio.getFontScale();

Dimensions.wp = wp;
Dimensions.hp = hp;

export default Dimensions;
