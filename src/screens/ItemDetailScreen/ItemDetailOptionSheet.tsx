// 안드로이드 gesture handler 가 모달 위에서 적용이 되지 않기 때문에 
// Modal에 coverScreen={false}를 주고 이 컴포넌트를 스크린이 선언되는 최상단 View 바로 아래에다가 배치해주세요
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BaseText from '../../components/BaseText';
import BottomSheet from '../../components/BottomSheets/BottomSheet';
import TouchableScale from '../../components/Buttons/TouchableScale';
import NumberCounterMinusIcon from '../../components/Svgs/NumberCounterMinusIcon';
import NumberCounterPlusIcon from '../../components/Svgs/NumberCounterPlusIcon';
import { COLOR1, GRAY, LIGHT_GRAY, VERY_LIGHT_GRAY } from '../../constants/styles';
import moneyFormat from '../../lib/moneyFormat';
import Accordian from '../../components/ItemOptionAccordian';
import LinearGradient from 'react-native-linear-gradient';
import { ItemDetail } from '../../graphql/item';
import { useAddToCart } from '../../graphql/cartItem';
import { useNavigation } from '@react-navigation/native';
import { PaymentScreenProps } from '../PaymentScreen';


const MIN_NUMBER = 1
const MAX_NUMBER = 99

interface ItemDetailOptionSheetProps {
    visible: boolean
    onClose: () => void
    data: ItemDetail
}

const ItemDetailOptionSheet: React.FC<ItemDetailOptionSheetProps> = ({ onClose, visible, data }) => {

    const { navigate } = useNavigation()
    const { bottom } = useSafeAreaInsets()

    const [options, setOptions] = useState<(number | null)[]>([])
    // 모든 옵션이 null이 아닐때
    const isSelectedOption = options.filter(v => v === null).length === 0
    const [number, setNumber] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)

    const [addToCart, { loading }] = useAddToCart()

    useEffect(() => {
        init()
    }, [])

    const init = useCallback(() => { // 초기화
        setOptions((data.option?.data || []).map(() => null))
        setNumber(1)
    }, [])

    useEffect(() => { // totalPrice 계산
        if (!data.salePrice) return
        // 기본가
        let totalPriceTemp = data.salePrice
        // 옵션 가격 적용
        for (const [index, value] of (data.option?.data || []).entries()) {
            const currentOption = options[index]
            if (currentOption === null || currentOption === undefined) continue
            totalPriceTemp += value.optionDetails[currentOption].price
        }
        // 수량 적용
        totalPriceTemp *= number
        setTotalPrice(totalPriceTemp)
    }, [data, options, number])


    const onCart = useCallback(async () => {
        if (!isSelectedOption) return
        if (loading) return
        await addToCart({
            variables: {
                itemId: data.id,
                number,
                option: data.option ? options.map(v => v || 0) : undefined
            }
        })
        onClose()
        setTimeout(() => { init() }, 250)
    }, [isSelectedOption, addToCart, number, loading])

    const onBuy = useCallback(async () => {
        if (!isSelectedOption) return
        // TODO
        try {
            const { data: result } = await addToCart({
                variables: {
                    itemId: data.id,
                    number,
                    option: data.option ? options.map(v => v || 0) : undefined,
                    isDirectBuy: true
                }
            })
            if (!result) throw new Error
            const params: PaymentScreenProps = {
                cartItemIds: [result.addToCart.id]
            }
            navigate('Payment', params)

        } catch (error) {
            console.error(error)
        }

        onClose()
        setTimeout(() => { init() }, 250)
    }, [isSelectedOption, addToCart, number, loading])

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

                    <LinearGradient
                        style={styles.fadeoutView}
                        colors={['#ffffff', '#ffffff00']}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                    />

                    {data.option?.data && <FlatList
                        style={{ height: 64 * 5, paddingTop: 8 }}
                        data={data.option.data}
                        keyExtractor={({ optionGroupName }, index) => optionGroupName + index}
                        renderItem={({ item, index }) => {
                            const selectedIndex = options[index]
                            const selectedOption = selectedIndex !== null ? item.optionDetails[selectedIndex] : null
                            const isSelected = selectedIndex !== null
                            return <Accordian
                                onSelect={(selectedIndex) => setOptions(options.map((v, i) => i === index ? selectedIndex : v))}
                                style={[styles.accordian, { borderColor: isSelected ? GRAY : VERY_LIGHT_GRAY }]}
                                title={item.optionGroupName + ' 옵션을 선택해주세요'}
                                selectedTitle={selectedOption && selectedOption.name}
                                contents={item.optionDetails.map(({ name, price }) => ({ left: name, right: price === 0 ? '' : moneyFormat(price, true) }))}
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
                                contianerStyle={styles.footerCartBtnTouchableContainer}
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
                                contianerStyle={styles.footerBuyBtnTouchableContainer}
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
        paddingTop: 16,
        backgroundColor: '#fff'
    },
    swipeHandle: {
        width: 48,
        height: 4,
        borderRadius: 2,
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
    footerCartBtnTouchableContainer: {
        flex: 1
    },
    footerBuyBtn: {
        flex: 1,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerBuyBtnTouchableContainer: {
        flex: 1
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
    },
    fadeoutView: { height: 8, position: 'absolute', top: 0, zIndex: 999, left: 0, right: 0 }
})
