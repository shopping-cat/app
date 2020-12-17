// 안드로이드 gesture handler 가 모달 위에서 적용이 되지 않기 때문에 
// Modal에 coverScreen={false}를 주고 이 컴포넌트를 스크린이 선언되는 최상단 View 바로 아래에다가 배치해주세요
import React, { useCallback, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BaseText from '../../components/BaseText';
import BottomSheet from '../../components/BottomSheet';
import TouchableScale from '../../components/Buttons/TouchableScale';
import { COLOR1, GRAY, LIGHT_GRAY, VERY_LIGHT_GRAY, WIDTH } from '../../constants/styles';

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

interface ItemDetailOptionModalProps {
    visible: boolean
    onClose: () => void
}

const ItemDetailOptionModal: React.FC<ItemDetailOptionModalProps> = ({ onClose, visible }) => {

    const { bottom } = useSafeAreaInsets()

    const [options, setOptions] = useState(dummyOption.map(() => null))

    // 모든 옵션이 null이 아닐때
    // const isSelectedOption = options.filter(v => !v).length === 0
    const isSelectedOption = true

    const onCart = useCallback(() => {
        console.log('123')
        if (!isSelectedOption) return
        onClose()
    }, [isSelectedOption])

    const onBuy = useCallback(() => {
        if (!isSelectedOption) return
        onClose()
    }, [isSelectedOption])

    return (
        // <Modal
        //     // coverScreen={false}
        //     isVisible={visible}
        //     onBackButtonPress={onClose}
        //     onBackdropPress={onClose}
        //     onSwipeComplete={onClose}
        //     swipeDirection='down'
        //     backdropOpacity={0.5}
        //     backdropTransitionOutTiming={0}
        //     style={styles.modal}
        //     propagateSwipe
        //     //@ts-ignore
        //     statusBarTranslucent
        // >
        //     <BaseButton>
        //         <View style={[styles.container, { maxHeight: 400 + bottom, paddingBottom: bottom }]} >
        //             <View style={styles.swipeHandleConatiner} >
        //                 <View style={styles.swipeHandle} />
        //             </View>
        //             <ScrollView>
        //                 {/* TouahbleOpacity로 래핑 해줘야 스크롤 할때 modal의 swipe랑 안겹침 */}
        //                 <View style={{ height: 1000, backgroundColor: 'red' }} />
        //             </ScrollView>
        //             <View style={styles.footerContainer}>
        //                 <View style={styles.footerBtnContainer} >
        //                     <BaseButton onPress={onCart} style={{ flex: 1 }} >
        //                         <TouchableScale
        //                             onPress={onCart}
        //                             style={[
        //                                 styles.footerCartBtn,
        //                                 { backgroundColor: isSelectedOption ? '#fff' : LIGHT_GRAY }
        //                             ]}
        //                             targetScale={0.8}
        //                         >
        //                             <BaseText
        //                                 style={[
        //                                     styles.footerBtnText,
        //                                     { color: isSelectedOption ? '#000' : GRAY }
        //                                 ]}
        //                             >
        //                                 장바구니
        //                 </BaseText>
        //                         </TouchableScale>
        //                     </BaseButton>
        //                 </View>
        //                 <View style={styles.footerBtnContainer} >
        //                     <TouchableScale
        //                         onPress={onBuy}
        //                         style={[
        //                             styles.footerBuyBtn,
        //                             { backgroundColor: isSelectedOption ? COLOR1 : LIGHT_GRAY }
        //                         ]}
        //                         targetScale={0.8}
        //                     >
        //                         <BaseText
        //                             style={[
        //                                 styles.footerBtnText,
        //                                 { color: isSelectedOption ? '#fff' : GRAY }
        //                             ]}
        //                         >
        //                             구매하기
        //                 </BaseText>
        //                     </TouchableScale>
        //                 </View>
        //             </View>
        //         </View>
        //     </BaseButton>
        // </Modal>
        <BottomSheet
            visible={visible}
            onClose={onClose}
            render={() =>
                <View style={[styles.container, { maxHeight: 400 + bottom, paddingBottom: bottom }]} >
                    <View style={styles.swipeHandleConatiner} >
                        <View style={styles.swipeHandle} />
                    </View>
                    <ScrollView>
                        {/* TouahbleOpacity로 래핑 해줘야 스크롤 할때 modal의 swipe랑 안겹침 */}
                        <View style={{ height: 1000, backgroundColor: 'red' }} />
                    </ScrollView>
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

export default ItemDetailOptionModal

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        zIndex: 2,
        justifyContent: 'flex-end'
    },
    container: {
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    swipeHandleConatiner: {
        width: '100%',
        height: 24,
        alignItems: 'center',
        marginTop: 8
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
    }
})
