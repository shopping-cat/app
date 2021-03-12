import React from 'react'
import { Pressable, StyleSheet, View, ViewProps } from 'react-native'
import { COLOR1, LIGHT_GRAY } from '../../constants/styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface RateStarRrops {
    rate: number
    starSize?: number
    spacing?: number
    fillColor?: string
    emptyColor?: string
    onRate?: (rate: number) => void
}

type StarState = 'fill' | 'empty' | 'half'

const HalfStar = (props: ViewProps & { fillColor?: string, emptyColor?: string, size: number }) =>
    <View {...props}>
        <Icon style={{ position: 'absolute' }} name='star' color={props.emptyColor} size={props.size} />
        <Icon name='star-half' color={props.fillColor} size={props.size} />
    </View>

const RateStars: React.FC<RateStarRrops> = ({ rate, spacing, starSize, emptyColor, fillColor, onRate }) => {

    // 정수부 만큼 fill 추가
    let starList: StarState[] = Array(Math.floor(rate)).fill('fill')
    // 소수부 처리 (0.25 이하일때는 뒤에서 알아서 처리함)
    if (rate % 1 >= 0.75) starList.push('fill')
    else if (rate % 1 >= 0.25) starList.push('half')
    // 5개에서 부족한만큼 empty로 채우기
    starList = [...starList, ...Array(5 - starList.length).fill('empty')]

    if (!starSize || !spacing) return null

    return (
        <View style={[styles.container, { width: (starSize * 5) + (spacing * 4) }]} >
            {starList.map((v, i) =>
                <Pressable
                    onPress={() => onRate && onRate(i + 1)}
                    key={v + i}
                >
                    {() => {
                        switch (v) {
                            case 'fill':
                                return <Icon name='star' color={fillColor} size={starSize} />
                            case 'half':
                                return <HalfStar fillColor={fillColor} emptyColor={emptyColor} size={starSize} />
                            case 'empty':
                                return <Icon name='star' color={emptyColor} size={starSize} />
                        }
                    }}
                </Pressable>
            )}
        </View>
    )
}

RateStars.defaultProps = {
    emptyColor: LIGHT_GRAY,
    fillColor: COLOR1,
    spacing: 0,
    rate: 5,
    starSize: 16
}

export default RateStars

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})
