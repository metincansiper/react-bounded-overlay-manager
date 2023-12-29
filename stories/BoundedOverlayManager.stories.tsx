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
      control: false,
      description: 'The component relative to which the overlays will be positioned',
    },
    overlaysShowTimeout: {
      description: 'The timeout after which the overlays will be hidden, if not persistently shown. Use NO_TIMEOUT or -1 to disable the timeout',
    },
    hideOverlaysOnMouseLeave: {
      description: 'If true, overlays will be hidden when the mouse leaves the bounding component',
    },
    showOverlaysOnMouseMove: {
      description: 'If true, overlays will be shown when the mouse moves over the bounding component',
    },
    skipAllSystemEvents: {
      description: 'If true, all system events will be ignored',
    },
    onApiUpdated: {
      control: false,
      description: 'A callback that will be called when the api is updated, the callback will accept the api as a parameter',
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
