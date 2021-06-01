import { Dimensions } from "react-native"
import { getStatusBarHeight } from "react-native-status-bar-height"
import { IS_CAT } from "./values"

export const WIDTH = Dimensions.get('window').width
export const HEIGHT = Dimensions.get('screen').height // 가능하면 사용하지 말아주세요 기종별로 오류가 너무 많아서...
export const STATUSBAR_HEIGHT = getStatusBarHeight()

// HEX COLORS
export const COLOR1 = IS_CAT ? '#E9A0A0' : '#35C5F0'
export const COLOR2 = IS_CAT ? '#35C5F0' : '#E9A0A0'
export const LIGHT_COLOR1 = IS_CAT ? '#FAE7E7' : '#C9F0FB'
export const GRAY = '#8B8B8B'
export const VERY_LIGHT_GRAY = '#ECECEC'
export const LIGHT_GRAY = '#C4C4C4'
export const VERY_VERY_LIGHT_GRAY = '#F5F5F5'

// RGB COLORS
export const COLOR1_RGB = IS_CAT ? 'rgb(233, 160, 160)' : 'rgb(53, 197, 240)'
export const COLOR2_RGB = IS_CAT ? 'rgb(53, 197, 240)' : 'rgb(233, 160, 160)'
export const GRAY_RGB = 'rgb(139, 139, 139)'

// RGB BASIC
export const WITHE_RGB = 'rgb(255, 255, 255)'
export const BLACK_RGB = 'rgb(0, 0, 0)'

// sns login colors
export const KAKAO_COLOR = '#FFE812'
export const FACEBOOK_COLOR = '#0078FF'
export const APPLE_COLOR = '#000'

export const SPRING_CONFIG = {
    damping: 10,
    mass: 0.4,
    stiffness: 121.6,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
}