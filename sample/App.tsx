import './App.css'
import BoundedOverlayManager, { Overlay, PredefinedPosition } from '../dist/main';
import { useRef } from 'react';
import { NO_TIMEOUT } from '../lib/src/timer/TimedEventManager';

// TODO: consider implemeting a slider where controls appear at the sides
// on mouse move and there is a pin button at top left to pin the controls 

const YourMainComponent = () => {
  return (
      <div style={{ height: '300px', backgroundColor: '#ddd', padding: '20px', borderRadius: '10px', margin: 0 }}>
          <h1>Main Content Area</h1>
          <p>This is the main component where the controls will appear on top when the mouse is moved.</p>
      </div>
  );
};

const ControlComponent = ({ text }: { text: string }) => {
  return (
      <button style={{ padding: 0, margin: 0 }}>
          { text }
      </button>
  );
};

const App = () => {
  const mainComponentRef = useRef(null); // Create a reference for the main component

  return (
      <div>
          <div ref={mainComponentRef}>
              <YourMainComponent />
          </div>
          <BoundedOverlayManager boundingComponentRef={mainComponentRef} overlaysShowTimeout={NO_TIMEOUT} >
            <Overlay position={PredefinedPosition.BOTTOM_CENTER} offset={{ bottom: '10%' }}>
              <ControlComponent text="component 1" />
            </Overlay>
            <Overlay position={PredefinedPosition.TOP_LEFT} offset={{ top: '10px', left: '10px' }}>
              <ControlComponent text="component 2" />
            </Overlay>
            <Overlay position={PredefinedPosition.TOP_RIGHT}>
              <ControlComponent text="component 3" />
            </Overlay>
            <Overlay position={PredefinedPosition.CENTER}>
              <ControlComponent text="component 4" />
            </Overlay>
            <Overlay position={PredefinedPosition.MID_LEFT}>
              <ControlComponent text="component 5" />
            </Overlay>
            <Overlay position={PredefinedPosition.MID_RIGHT}>
              <ControlComponent text="component 6" />
            </Overlay>
          </BoundedOverlayManager>
      </div>
  );
};

export default App
