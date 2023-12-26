import { useState, useRef } from 'react';
import FullScreen from 'react-fullscreen-crossbrowser';
import BoundedOverlayManager, { BoundedOverlayManagerApi, Overlay, PredefinedPosition } from '../lib/main';
import { NO_TIMEOUT } from '../lib/src/timer/TimedEventManager';

const FullScreenTextArea = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreenChange = (state: boolean) => {
    setIsFullScreen(state);
  };

  const boundingComponentRef = useRef(null);
  const apiRef = useRef<BoundedOverlayManagerApi>();

  return (
    <>
      <FullScreen
        enabled={isFullScreen}
        onChange={handleFullScreenChange}
      >
        <div  ref={boundingComponentRef} style={{ width: '100vw', height: '80vh', backgroundColor:'blue' }}>
          <div style={{ width: '100%', height: '300px', backgroundColor: 'red' }}></div>
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
      <BoundedOverlayManager apiRef={apiRef} boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={false} overlaysShowTimeout={NO_TIMEOUT}>
          <Overlay position={PredefinedPosition.BOTTOM_CENTER} offset={{bottom: '10%', left: '25%'}}>
            <button>Overlay Button</button>
          </Overlay>
      </BoundedOverlayManager>
    </>

  );
};

export default FullScreenTextArea;
