import './App.css'
import BoundedOverlayManager, { Overlay, PredefinedPosition } from '../dist/main';
import { useRef } from 'react';

const YourMainComponent = () => {
  return (
      <div style={{ height: '300px', backgroundColor: '#ddd', padding: '20px', borderRadius: '10px', margin: 0 }}>
          <h1>Main Content Area</h1>
          <p>This is the main component where the controls will appear on top when the mouse is moved.</p>
      </div>
  );
};

const ControlComponent1 = () => {
  return (
      <button style={{ padding: '10px' }}>
          Control Button 1
      </button>
  );
};

const ControlComponent2 = () => {
  return (
      <div style={{ margin: '10px', padding: '10px', backgroundColor: '#eee', borderRadius: '5px' }}>
          <p>Info Panel</p>
      </div>
  );
};

const App = () => {
  const mainComponentRef = useRef(null); // Create a reference for the main component

  return (
      <div>
          <div ref={mainComponentRef}>
              <YourMainComponent />
          </div>
          <BoundedOverlayManager boundingComponentRef={mainComponentRef} >
            <Overlay position={PredefinedPosition.BOTTOM_CENTER}>
              <ControlComponent1 />
            </Overlay>
            <Overlay position={PredefinedPosition.TOP_LEFT}>
              <ControlComponent2 />
            </Overlay>
          </BoundedOverlayManager>
      </div>
  );
};

export default App
