import React, { CSSProperties, useRef } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import BoundedOverlayManager, { Overlay, PredefinedPosition } from '../../lib/main';
import { DEFAULT_HIDE_OVERLAYS_ON_MOUSE_LEAVE, DEFAULT_OVERLAYS_SHOW_TIMEOUT, DEFAULT_PERSISTANTLY_SHOW_OVERLAYS, DEFAULT_SHOW_OVERLAYS_ON_MOUSE_MOVE, DEFAULT_SKIP_ALL_SYSTEM_EVENTS, DEFAULT_UNMOUNT_CONTENT_WHEN_HIDDEN } from '../../lib/src/config';

// Note that the config values are the only ones that are imported from source code of the library,
// this exception is made to ensure that the default values are always in sync with the ones 
// actually used in the library.

const meta: Meta = {
  title: 'Components/BoundedOverlayManager',
  component: BoundedOverlayManager,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    persistentlyShowOverlays: {
      description: 'When set to true, overlays are always shown independent of the other factors.',
      // defaultValue: DEFAULT_PERSISTANTLY_SHOW_OVERLAYS,
    },
    boundingComponentRef: {
      control: false,
      description: 'Reference to the component relative to which overlays will be positioned.',
    },
    overlaysShowTimeout: {
      description: 'Time (in milliseconds) after which overlays will automatically hide, unless persistently shown. Set to NO_TIMEOUT or -1 to disable.',
      // defaultValue: DEFAULT_OVERLAYS_SHOW_TIMEOUT,
    },
    hideOverlaysOnMouseLeave: {
      description: 'When enabled (true), overlays will hide as soon as the mouse leaves the bounding component.',
      // defaultValue: DEFAULT_HIDE_OVERLAYS_ON_MOUSE_LEAVE,
    },
    showOverlaysOnMouseMove: {
      description: 'When enabled (true), overlays will appear when the mouse moves on the bounding component.',
      // defaultValue: DEFAULT_SHOW_OVERLAYS_ON_MOUSE_MOVE,
    },
    skipAllSystemEvents: {
      description: 'When set to true, all system events (like mouse movement) will be ignored in overlay behavior.',
      // defaultValue: DEFAULT_SKIP_ALL_SYSTEM_EVENTS,
    },
    onApiUpdated: {
      control: false,
      description: 'Callback function that is called when the API updates. The updated API is passed as an argument to this function.',
    },
    unmountContentWhenHidden: {
      description: 'When set to true, the content of the overlay will be unmounted when the overlay is hidden.',
      // defaultValue: DEFAULT_UNMOUNT_CONTENT_WHEN_HIDDEN,
    },
  },
};

export default meta;

const BoundedOverlayManagerStory: StoryFn = (args) => {
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
    <>
      <div ref={boundingComponentRef} style={boundingComponentStyle}>
        Move the mouse over this div to show the overlays
      </div>
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} {...args}>
        <Overlay position={PredefinedPosition.BOTTOM_CENTER} offset={{bottom: '2vh'}}>
          <button>Overlay Button</button>
        </Overlay>
        <Overlay position={PredefinedPosition.BOTTOM_RIGHT} offset={{bottom: '2vh', right: '2vw'}}>
          <div style={{border: '2px solid black', padding: '2px'}}>Overlay Div</div>
        </Overlay>
      </BoundedOverlayManager>
    </>
  );
};

const defaultArgs = {
  persistentlyShowOverlays: DEFAULT_PERSISTANTLY_SHOW_OVERLAYS,
  overlaysShowTimeout: DEFAULT_OVERLAYS_SHOW_TIMEOUT,
  hideOverlaysOnMouseLeave: DEFAULT_HIDE_OVERLAYS_ON_MOUSE_LEAVE,
  showOverlaysOnMouseMove: DEFAULT_SHOW_OVERLAYS_ON_MOUSE_MOVE,
  skipAllSystemEvents: DEFAULT_SKIP_ALL_SYSTEM_EVENTS,
  unmountContentWhenHidden: DEFAULT_UNMOUNT_CONTENT_WHEN_HIDDEN,
};

export const Default = BoundedOverlayManagerStory.bind({});

Default.args = {
  ...defaultArgs,
}; 
