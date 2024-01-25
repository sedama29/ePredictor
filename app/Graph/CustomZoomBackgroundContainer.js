import React from 'react';
import { VictoryZoomContainer } from 'victory-native';
import CustomBackground from './CustomBackground'; // Ensure the path is correct

class CustomZoomBackgroundContainer extends VictoryZoomContainer {
  render() {
    // Render the VictoryZoomContainer's default content
    const defaultContainer = super.render();

    // Render the CustomBackground with the same props
    return (
      <CustomBackground {...this.props}>
        {defaultContainer}
      </CustomBackground>
    );
  }
}

export default CustomZoomBackgroundContainer;