import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { VERY_LIGHT_GRAY, VERY_VERY_LIGHT_GRAY } from '../constants/styles'

interface BaseSkeletonPlaceHolderProps {
    backgroundColor?: string
    speed?: number
    highlightColor?: string
}

//@ts-ignore
const BaseSkeletonPlaceHolder: React.FC<BaseSkeletonPlaceHolderProps> = (props) => <SkeletonPlaceholder backgroundColor={VERY_VERY_LIGHT_GRAY} highlightColor={VERY_LIGHT_GRAY} {...props} />

export default BaseSkeletonPlaceHolder

const styles = StyleSheet.create({})
