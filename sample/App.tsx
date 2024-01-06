import { useState, useRef } from 'react';
import FullScreen from 'react-fullscreen-crossbrowser';
import BoundedOverlayManager, { BoundedOverlayManagerApi, Overlay, PredefinedPosition } from '../dist/main';
// import { NO_TIMEOUT } from '../lib/src/timer/TimedEventManager';

const App = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreenChange = (state: boolean) => {
    setIsFullScreen(state);
  };

  const boundingComponentRef = useRef(null);
  const apiRef = useRef<BoundedOverlayManagerApi>();

  const onApiUpdated = (api: BoundedOverlayManagerApi) => {
    apiRef.current = api;
  };

  return (
    <>
      <FullScreen
        enabled={isFullScreen}
        onChange={handleFullScreenChange}
      >
        <div style={{width: '90vw', height: '60vh'}}>
          <div ref={boundingComponentRef} style={{ width: '100%', height: '100%', backgroundColor:'blue' }}>
            <button onClick={() => setIsFullScreen(!isFullScreen)}>
              {isFullScreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
            </button>
          </div>
        </div>
      </FullScreen>
      <button onClick={() => apiRef.current?.renderOverlays()}>
        Render Overlays
      </button>
      <button onClick={() => apiRef.current?.clearOverlays()}>
        Clear Overlays
      </button>
      <BoundedOverlayManager onApiUpdated={onApiUpdated} boundingComponentRef={boundingComponentRef}>
          <Overlay position={PredefinedPosition.BOTTOM_CENTER} offset={{bottom: '10%', leftInPercent: 10}}>
            <button>Overlay Button</button>
          </Overlay>
      </BoundedOverlayManager>
    </>

  );
};

export default App;
