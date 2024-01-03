# React Bounded Overlay Manager

## Overview

`React Bounded Overlay Manager` is a React library designed to create and manage overlay components within a specified bounding container. It offers flexible positioning, dynamic show/hide behavior, customizable event handling, and an API for extended control.

## Key Features

- **Flexible Positioning**: Utilize `position` and `offset` parameters within the Overlay component to achieve precise and strategic placement of overlays.
- **Dynamic Visibility**: Effortlessly configure the appearance and disappearance of overlays in response to user interactions, enhancing user experience and interface responsiveness.
- **Customizable Event Handling**: Tailor overlay visibility to align with specific application requirements. This includes the ability to control when overlays appear or disappear based on user interactions, system events, or custom triggers. Configure these settings to suit your application's behavior and user experience needs.
- **Extended Control via API**: Access the API for comprehensive control over overlay behavior, extending beyond the capabilities offered by component properties.

## Installation

```bash
npm install react-bounded-overlay-manager
```

## Basic Example

```jsx
import React, { useRef } from 'react';
import BoundedOverlayManager, { Overlay, PredefinedPosition } from 'react-bounded-overlay-manager';

const BasicExample = () => {
  const boundingComponentRef = useRef(null);

  return (
    <div>
      <div ref={boundingComponentRef} style={{ width: '70vw', height: '50vh', border: '1px solid black' }}>
        Hover over this div to display overlays.
      </div>
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef}>
        <Overlay position={PredefinedPosition.BOTTOM_CENTER}>
          <button>Overlay Button</button>
        </Overlay>
        <!-- more overlays here -->
      </BoundedOverlayManager>
    </div>
  );
};
```

## Learn More
For more detailed information on how to utilize `React Bounded Overlay Manager` to its fullest, explore the [documentation](./link/to/docs/here)

## For Developers
If you are interested in contributing to the project or want to build and test the library, please refer to our [Developer Guide](./readme_supplements/DEVELOPER_GUIDE.md) for detailed instructions on setup, development, testing, and deployment.