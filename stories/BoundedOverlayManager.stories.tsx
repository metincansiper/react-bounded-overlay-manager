import React, { useRef } from 'react';
import type { Meta, Story } from '@storybook/react';
import BoundedOverlayManager, { Overlay, PredefinedPosition } from '../lib/main';

const meta: Meta = {
  title: 'Components/BoundedOverlayManager',
  component: BoundedOverlayManager,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    persistentlyShowOverlays: {
      control: 'boolean',
      description: 'If true, overlays will be shown persistently',
    },
    boundingComponentRef: {
      control: false
    }
  },
};

export default meta;

const BoundedOverlayManagerStory: Story = (args) => {
  const boundingComponentRef = useRef(null);

  return (
    <div ref={boundingComponentRef} style={{ width: '300px', height: '200px', border: '1px solid black' }}>
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} {...args}>
        <Overlay position={PredefinedPosition.CENTER}>
          <div>Overlay Content</div>
        </Overlay>
      </BoundedOverlayManager>
    </div>
  );
};

export const Default = BoundedOverlayManagerStory.bind({});

// CustomBoundedOverlayManager.args = {
//   persistentlyShowOverlays: true,
// };
