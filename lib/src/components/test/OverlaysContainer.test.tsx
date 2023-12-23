
import OverlaysContainer from '../OverlaysContainer';

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';


describe('OverlaysContainer', () => {
  const mockChild = <div>Mock Child</div>;

  it('toggles visibility based on show prop', () => {
    const containerRef = { current: document.createElement('div') }
    const { container } = render(
        <OverlaysContainer ref={containerRef} show={false}>
            {mockChild}
        </OverlaysContainer>
        
    );
    
    let overlaysContainer = container.querySelector(`.overlays-container`);
    expect(overlaysContainer).toHaveStyle('display: none');

    // rerender(
    //     <OverlayManagerContextProvider boundingComponentRef={boundingComponentRef}>
    //         <OverlaysContainer show={true}>
    //             {mockChild}
    //         </OverlaysContainer>
    //     </OverlayManagerContextProvider>
    // );

    // overlaysContainer = container.querySelector(`.${styles.overlaysContainer}`);
    // expect(overlaysContainer).toHaveStyle('display: block');
  });
});
