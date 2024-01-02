import React, { CSSProperties, useRef } from 'react';
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

  const boundingComponentStyle: CSSProperties = {
    width: '70vw',
    height: '50vh',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 'large',
  };

  return (
    <div ref={boundingComponentRef} style={boundingComponentStyle}>
      Move the mouse over this div to show the overlays
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} {...args}>
        <Overlay position={PredefinedPosition.BOTTOM_CENTER} offset={{bottom: '2vh'}}>
          <button>Overlay Button</button>
        </Overlay>
        <Overlay position={PredefinedPosition.BOTTOM_RIGHT} offset={{bottom: '2vh', right: '2vw'}}>
          <div style={{border: '2px solid black', padding: '2px'}}>Overlay Div</div>
        </Overlay>
      </BoundedOverlayManager>
    </div>
  );
};

export const Default = BoundedOverlayManagerStory.bind({});

// CustomBoundedOverlayManager.args = {
//   persistentlyShowOverlays: true,
// };
