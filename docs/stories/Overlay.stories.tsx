import React, { useRef } from 'react';
import type { Meta, Story } from '@storybook/react';
import BoundedOverlayManager, { Overlay, PredefinedPosition } from '../../lib/main';

const meta: Meta = {
  title: 'Components/Overlay',
  component: Overlay,
  parameters: {
    layout: 'left',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      description: ` Defines the anchor point for both the overlay and the bounding component. 
      This prop establishes a fixed point on the overlay that is directly anchored to a 
      corresponding point on the bounding component. For example, when the position is set to 
      BOTTOM_CENTER, it means that the bottom center point of the overlay will be anchored to the 
      bottom center of the bounding component.`,
    },
    offset: {
      description: `Modifies the overlay's anchored position by adjusting its coordinates 
      relative to the anchor point set by the 'position' prop. The accepted values for 'offset' 
      mirror those of corresponding CSS properties when it corresponds to edge-alligned positions 
      ('top', 'bottom', 'left', 'right'). For instance, the 'top' property of 'offset' can be assigned any value that is valid for CSSProperties['top'],
      such as '50px', '20%', etc. For center-aligned positions, use properties ending in 'InPercent' (e.g., 'topInPercent'), 
      accepting numeric values for precise adjustment. The specific 'offset' properties that are applicable vary based 
      on the selected 'position', allowing for targeted adjustments in different directions:


      - TOP_LEFT: Adjust using 'top' and 'left'
      - TOP_CENTER: Adjust using 'top' and 'leftInPercent'
      - TOP_RIGHT: Adjust using 'top' and 'right'
      - MID_LEFT: Adjust using 'topInPercent' and 'left'
      - CENTER: Adjust using 'topInPercent' and 'leftInPercent'
      - MID_RIGHT: Adjust using 'topInPercent' and 'right'
      - BOTTOM_LEFT: Adjust using 'bottom' and 'left'
      - BOTTOM_CENTER: Adjust using 'bottom' and 'leftInPercent'
      - BOTTOM_RIGHT: Adjust using 'bottom' and 'right'
      `,
    },
  }
};

export default meta;

const OverlayStory: Story = (args: any) => {
  const boundingComponentRef = useRef(null);

  return (
    <>
      <div ref={boundingComponentRef} style={{ width: '70vw', height: '50vh', border: '1px solid black' }}/>
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
        <Overlay {...args}>
          <div>Overlay Content</div>
        </Overlay>
      </BoundedOverlayManager>
    </>
  );
};

export const Default = OverlayStory.bind({});

Default.args = {};

export const TopLeft = OverlayStory.bind({});
TopLeft.args = {
  position: PredefinedPosition.TOP_LEFT,
};

export const TopLeftWithOffset = OverlayStory.bind({});
TopLeftWithOffset.args = {
  position: PredefinedPosition.TOP_LEFT,
  offset: { top: '10px', left: '10%' },
};

export const TopCenter = OverlayStory.bind({});
TopCenter.args = {
  position: PredefinedPosition.TOP_CENTER,
};

export const TopCenterWithOffset = OverlayStory.bind({});
TopCenterWithOffset.args = {
  position: PredefinedPosition.TOP_CENTER,
  offset: { top: '10px', leftInPercent: 10 },
};

export const TopRight = OverlayStory.bind({});
TopRight.args = {
  position: PredefinedPosition.TOP_RIGHT,
};

export const TopRightWithOffset = OverlayStory.bind({});
TopRightWithOffset.args = {
  position: PredefinedPosition.TOP_RIGHT,
  offset: { top: '10px', right: '10%' },
};

export const MidLeft = OverlayStory.bind({});
MidLeft.args = {
  position: PredefinedPosition.MID_LEFT,
};

export const MidLeftWithOffset = OverlayStory.bind({});
MidLeftWithOffset.args = {
  position: PredefinedPosition.MID_LEFT,
  offset: { topInPercent: 10, left: '10px' },
};

export const Center = OverlayStory.bind({});
Center.args = {
  position: PredefinedPosition.CENTER,
};

export const CenterWithOffset = OverlayStory.bind({});
CenterWithOffset.args = {
  position: PredefinedPosition.CENTER,
  offset: { topInPercent: 10, leftInPercent: 10 },
};

export const MidRight = OverlayStory.bind({});
MidRight.args = {
  position: PredefinedPosition.MID_RIGHT,
};

export const MidRightWithOffset = OverlayStory.bind({});
MidRightWithOffset.args = {
  position: PredefinedPosition.MID_RIGHT,
  offset: { topInPercent: 10, right: '10px' },
};

export const BottomLeft = OverlayStory.bind({});
BottomLeft.args = {
  position: PredefinedPosition.BOTTOM_LEFT,
};

export const BottomLeftWithOffset = OverlayStory.bind({});
BottomLeftWithOffset.args = {
  position: PredefinedPosition.BOTTOM_LEFT,
  offset: { bottom: '10px', left: '10%' },
};

export const BottomCenter = OverlayStory.bind({});
BottomCenter.args = {
  position: PredefinedPosition.BOTTOM_CENTER,
};

export const BottomCenterWithOffset = OverlayStory.bind({});
BottomCenterWithOffset.args = {
  position: PredefinedPosition.BOTTOM_CENTER,
  offset: { bottom: '10px', leftInPercent: 10 },
};

export const BottomRight = OverlayStory.bind({});
BottomRight.args = {
  position: PredefinedPosition.BOTTOM_RIGHT,
};

export const BottomRightWithOffset = OverlayStory.bind({});
BottomRightWithOffset.args = {
  position: PredefinedPosition.BOTTOM_RIGHT,
  offset: { bottom: '10px', right: '10%' },
};



