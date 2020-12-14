// react-native-linear-gradient에서 animated 적용이 안되서 사용하는 객체입니다

import React, { Component } from "react";
import LinearGradient from "react-native-linear-gradient";

interface GradientHelperProps {
    color1: any,
    color2: any,
    style: any,
    startX: any,
    startY: any,
    endX: any,
    endY: any
}

export default class GradientHelper extends Component<GradientHelperProps> {
    render() {
        const { style, color1, color2, startX, startY, endX, endY } = this.props;
        return (
            <LinearGradient
                colors={[color1, color2]}
                start={{
                    x: startX,
                    y: startY
                }}
                end={{
                    x: endX,
                    y: endY
                }}
                style={style}
            />
        )
    }
}