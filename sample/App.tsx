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
          <BoundedOverlayManager boundingComponentRef={mainComponentRef} persistentlyShowOverlays={true} >
            <Overlay position={PredefinedPosition.BOTTOM_CENTER}>
              <ControlComponent text="component 1" />
            </Overlay>
            <Overlay position={PredefinedPosition.TOP_LEFT}>
              <ControlComponent text="component 2" />
            </Overlay>
            <Overlay position={PredefinedPosition.TOP_RIGHT}>
              <ControlComponent text="component 3" />
            </Overlay>
          </BoundedOverlayManager>
      </div>
  );
};

export default App
