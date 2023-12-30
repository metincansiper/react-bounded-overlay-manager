import { useState, useRef } from 'react';
import FullScreen from 'react-fullscreen-crossbrowser';
import BoundedOverlayManager, { BoundedOverlayManagerApi, Overlay, PredefinedPosition } from '../lib/main';
import { NO_TIMEOUT } from '../lib/src/timer/TimedEventManager';

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
        <div  ref={boundingComponentRef} style={{ width: '100vw', height: '80vh', backgroundColor:'blue' }}>
          {/* <div style={{ width: '100%', height: '300px', backgroundColor: 'red' }}></div> */}
          <button onClick={() => setIsFullScreen(!isFullScreen)}>
            {isFullScreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
          </button>
        </div>
      </FullScreen>
      <button onClick={() => apiRef.current?.renderOverlays()}>
        Render Overlays
      </button>
      <button onClick={() => apiRef.current?.clearOverlays()}>
        Clear Overlays
      </button>
      <BoundedOverlayManager onApiUpdated={onApiUpdated} boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={false} overlaysShowTimeout={NO_TIMEOUT} hideOverlaysOnMouseLeave={false}>
          <Overlay position={PredefinedPosition.BOTTOM_CENTER} offset={{bottom: '10%', left: '100px'}}>
            <button>Overlay Button</button>
          </Overlay>
      </BoundedOverlayManager>
    </>

  );
};

export default App;
