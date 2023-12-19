import { useState, useRef } from 'react';
import FullScreen from 'react-fullscreen-crossbrowser';
import BoundedOverlayManager, { Overlay, PredefinedPosition } from '../lib/main';

const FullScreenTextArea = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreenChange = (state: boolean) => {
    setIsFullScreen(state);
  };

  const boundingComponentRef = useRef(null);

  return (
    <>
      <FullScreen
        enabled={isFullScreen}
        onChange={handleFullScreenChange}
      >
        <div style={{ width: '100vw', height: '80vh' }}>
          <div ref={boundingComponentRef} style={{ width: '100%', height: '300px', backgroundColor: 'red' }}></div>
          <textarea style={{ width: '100%', height: '300px' }}></textarea>
          <button onClick={() => setIsFullScreen(!isFullScreen)}>
            {isFullScreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
          </button>
        </div>
      </FullScreen>
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={false}>
          <Overlay position={PredefinedPosition.BOTTOM_CENTER}>
            <button>Overlay Button</button>
          </Overlay>
      </BoundedOverlayManager>
    </>

  );
};

export default FullScreenTextArea;
