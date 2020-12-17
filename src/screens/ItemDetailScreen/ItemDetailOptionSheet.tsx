// 안드로이드 gesture handler 가 모달 위에서 적용이 되지 않기 때문에 
// Modal에 coverScreen={false}를 주고 이 컴포넌트를 스크린이 선언되는 최상단 View 바로 아래에다가 배치해주세요
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BaseText from '../../components/BaseText';
import BottomSheet from '../../components/BottomSheet';
import TouchableScale from '../../components/Buttons/TouchableScale';
import NumberCounterMinusIcon from '../../components/Svgs/NumberCounterMinusIcon';
import NumberCounterPlusIcon from '../../components/Svgs/NumberCounterPlusIcon';
import { COLOR1, GRAY, LIGHT_GRAY, VERY_LIGHT_GRAY } from '../../constants/styles';
import moneyFormat from '../../lib/moneyFormat';
import Accordian from '../../components/Accordian';

const dummyOption = [
    {
        optionGroupName: '색상',
        optionDetails: [
            {
                optionDetailName: '빨간색',
                price: 0
            },
            {
                optionDetailName: '주황색',
                price: 0
            },
            {
                optionDetailName: '노란색',
                price: 0
            },
            {
                optionDetailName: '초록색',
                price: 0
            },
            {
                optionDetailName: '파란색',
                price: 0
            },
            {
                optionDetailName: '남색',
                price: -20000
            },
            {
                optionDetailName: '보라색',
                price: 2300
            }
        ]
    },
    {
        optionGroupName: '사이즈',
        optionDetails: [
            {
                optionDetailName: 'S',
                price: -300
            },
            {
                optionDetailName: 'M',
                price: 0
            },
            {
                optionDetailName: 'L',
                price: 20000
            },
            {
                optionDetailName: 'XL',
                price: 50000
            }
        ]
    }
]
// const dummyOption = null
const dummyPrice = 38700

const MIN_NUMBER = 1
const MAX_NUMBER = 99

interface ItemDetailOptionSheetProps {
    visible: boolean
    onClose: () => void
}

const ItemDetailOptionSheet: React.FC<ItemDetailOptionSheetProps> = ({ onClose, visible }) => {

    const { bottom } = useSafeAreaInsets()

    const [options, setOptions] = useState<(number | null)[]>([])
    const isSelectedOption = options.filter(v => v === null).length === 0
    // 모든 옵션이 null이 아닐때
    const [number, setNumber] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        init()
    }, [])

    const init = useCallback(() => { // 초기화
        setOptions((dummyOption || []).map(() => null))
        setNumber(1)
    }, [])

    useEffect(() => { // totalPrice 계산
        if (!dummyPrice) return
        // 기본가
        let totalPriceTemp = dummyPrice
        // 옵션 가격 적용
        for (const [index, value] of (dummyOption || []).entries()) {
            const currentOption = options[index]
            if (currentOption === null || currentOption === undefined) continue
            totalPriceTemp += value.optionDetails[currentOption].price
        }
        // 수량 적용
        totalPriceTemp *= number
        setTotalPrice(totalPriceTemp)
    }, [dummyPrice, options, number])


    const onCart = useCallback(() => {
        if (!isSelectedOption) return
        onClose()
        init()
    }, [isSelectedOption])

    const onBuy = useCallback(() => {
        if (!isSelectedOption) return
        onClose()
        init()
    }, [isSelectedOption])

    const numberIncrease = useCallback(() => {
        if (number === MAX_NUMBER) return
        setNumber(number + 1)
    }, [number])

    const numberDecrease = useCallback(() => {
        if (number === MIN_NUMBER) return
        setNumber(number - 1)
    }, [number])


    return (
        <BottomSheet
            visible={visible}
            onClose={onClose}
            draggAbleHeaderRender={() =>
                <View style={styles.swipeHandleConatiner} >
                    <View style={styles.swipeHandle} />
                </View>
            }
            render={() =>
                <View style={[styles.container, { paddingBottom: bottom }]} >

                    {dummyOption && <FlatList
                        style={{ height: 64 * 5 }}
                        data={dummyOption}
                        keyExtractor={({ optionGroupName }, index) => optionGroupName + index}
                        renderItem={({ item, index }) => {
                            const selectedIndex = options[index]
                            const selectedOption = selectedIndex !== null ? item.optionDetails[selectedIndex] : null
                            const isSelected = selectedIndex !== null
                            return <Accordian
                                onSelect={(selectedIndex) => setOptions(options.map((v, i) => i === index ? selectedIndex : v))}
                                style={[styles.accordian, { borderColor: isSelected ? GRAY : VERY_LIGHT_GRAY }]}
                                title={item.optionGroupName + ' 옵션을 선택해주세요'}
                                selectedTitle={selectedOption && selectedOption.optionDetailName}
                                contents={item.optionDetails.map(({ optionDetailName, price }) => ({ left: optionDetailName, right: price === 0 ? '' : moneyFormat(price) }))}
                            />
                        }}
                    />}

                    <View style={[styles.resultContainer, { borderTopWidth: options.length > 1 ? 1 : 0 }]} >
                        <View style={styles.numberCounterContainer} >
                            <TouchableScale
                                onPress={numberDecrease}
                                style={[
                                    styles.numberCounterBtn,
                                    { opacity: number === MIN_NUMBER ? 0.3 : 1 }
                                ]}
                            >
                                <NumberCounterMinusIcon />
                            </TouchableScale>
                            <View style={styles.numberContainer} >
                                <BaseText>{number}</BaseText>
                            </View>
                            <TouchableScale
                                onPress={numberIncrease}
                                style={[
                                    styles.numberCounterBtn,
                                    { opacity: number === MAX_NUMBER ? 0.3 : 1 }
                                ]}
                            >
                                <NumberCounterPlusIcon />
                            </TouchableScale>
                        </View>
                        <BaseText>{moneyFormat(totalPrice)}원</BaseText>
                    </View>

                    <View style={styles.footerContainer}>
                        <View style={styles.footerBtnContainer} >
                            <TouchableScale
                                onPress={onCart}
                                style={[
                                    styles.footerCartBtn,
                                    { backgroundColor: isSelectedOption ? '#fff' : LIGHT_GRAY }
                                ]}
                                targetScale={0.8}
                            >
                                <BaseText
                                    style={[
                                        styles.footerBtnText,
                                        { color: isSelectedOption ? '#000' : GRAY }
                                    ]}
                                >
                                    장바구니
                        </BaseText>
                            </TouchableScale>
                        </View>
                        <View style={styles.footerBtnContainer} >
                            <TouchableScale
                                onPress={onBuy}
                                style={[
                                    styles.footerBuyBtn,
                                    { backgroundColor: isSelectedOption ? COLOR1 : LIGHT_GRAY }
                                ]}
                                targetScale={0.8}
                            >
                                <BaseText
                                    style={[
                                        styles.footerBtnText,
                                        { color: isSelectedOption ? '#fff' : GRAY }
                                    ]}
                                >
                                    구매하기
                        </BaseText>
                            </TouchableScale>
                        </View>
                    </View>
                </View>
            }
        />
    )
}

export default ItemDetailOptionSheet

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        maxHeight: '100%'
    },
    swipeHandleConatiner: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        width: '100%',
        height: 25,
        marginBottom: -1, // container랑 겹치기 위해서
        alignItems: 'center',
        paddingTop: 8,
        backgroundColor: '#fff'
    },
    swipeHandle: {
        width: 32,
        height: 2,
        borderRadius: 1,
        backgroundColor: LIGHT_GRAY
    },
    footerContainer: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: VERY_LIGHT_GRAY,
        borderTopWidth: 1
    },
    footerBtnContainer: {
        flex: 1,
        padding: 16
    },
    footerCartBtn: {
        flex: 1,
        borderColor: LIGHT_GRAY,
        borderWidth: 1,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerBuyBtn: {
        flex: 1,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerBtnText: {
        fontSize: 20
    },
    resultContainer: {
        width: '100%',
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderTopColor: VERY_LIGHT_GRAY
    },
    numberCounterContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    numberCounterBtn: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        borderColor: GRAY,
        borderWidth: 1
    },
    numberContainer: {
        width: 40,
        alignItems: 'center'
    },
    totalPrice: {
        fontSize: 16
    },
    accordian: {
        marginBottom: 16, marginHorizontal: 16, borderWidth: 1
    }
})
