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
        <div style={{width: '100vw', height: '100vh', position: 'relative'}}>
          <div  ref={boundingComponentRef} style={{ position: 'absolute', left: '20%', top: '20%', width: '500px', height: '500px', backgroundColor:'blue' }}>
            {/* <div style={{ width: '100%', height: '300px', backgroundColor: 'red' }}></div> */}
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
      <BoundedOverlayManager onApiUpdated={onApiUpdated} boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
          <Overlay position={PredefinedPosition.BOTTOM_CENTER} offset={{bottom: '10%', leftInPercent: 10}}>
            <button>Overlay Button</button>
          </Overlay>
      </BoundedOverlayManager>
    </>

  );
};

export default App;
