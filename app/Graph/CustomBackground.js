import React from 'react';
import { VictoryContainer } from 'victory-native';
import Svg, { Rect } from 'react-native-svg';
export const chartPadding = { top: 10, bottom: 50, left: 50, right: 50 };

const CustomBackground = ({ children, ...props }) => {
    const yScale = props.scale.y;
  
    const plotAreaTop = yScale(150);
    const plotAreaBottom = yScale(0);
  
    const yYellow = yScale(104);
    const yGreen = yScale(35);
    const yRed = plotAreaTop;
  
    const heightLightYellow = yGreen - yYellow;
    const heightLightGreen = plotAreaBottom - yGreen;
    const heightLightCoral = yYellow - yRed;
  
    return (
      <VictoryContainer {...props}>
        <Svg style={{ position: 'absolute', top: 0, left: 0 }}>
          <Rect x={chartPadding.left} y={yYellow} width={props.width - chartPadding.left - chartPadding.right} height={heightLightYellow} fill="#FFFFE5" />
          <Rect x={chartPadding.left} y={yGreen} width={props.width - chartPadding.left - chartPadding.right} height={heightLightGreen} fill="#E5FFE5" />
          <Rect x={chartPadding.left} y={yRed} width={props.width - chartPadding.left - chartPadding.right} height={heightLightCoral} fill="#FFE5E5" />
        </Svg>
        {children}
      </VictoryContainer>
    );
  };

export default CustomBackground