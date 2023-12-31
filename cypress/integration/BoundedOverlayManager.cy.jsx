import React, { createRef, useRef } from 'react';
import { mount } from '@cypress/react18';
import BoundedOverlayManager, { Overlay, PredefinedPosition } from '../../lib/main';

describe('OverlayManagerTest Component', () => {
    it('overlays container has the right bbox when the bounding component is absolutely positioned inside a relatively positioned parent div', () => {
        const OverlayManagerTest = () => {
            const boundingComponentRef = useRef();
            return (
                <>  
                    <div style={{position: 'relative', width: '1000px', height: '500px'}}>
                        <div id='bounding-component' style={{position: 'absolute', top: '100px', left: '100px', width: '400px', height: '200px', backgroundColor: 'blue'}} ref={boundingComponentRef}></div>
                    </div>
                    
                    <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
                        <Overlay position={PredefinedPosition.TOP_LEFT}>
                            Hello World
                        </Overlay>
                    </BoundedOverlayManager>
                </>
            );
        };

        mount(<OverlayManagerTest />);
        
        cy.get('#bounding-component').then(($boundingComponent) => {
            const boundingComponent = $boundingComponent[0];
            cy.get('[role="overlays-container"]').should(($overlaysContainer) => {
                const overlaysContainer = $overlaysContainer[0];
                const overlaysContainerBbox = overlaysContainer.getBoundingClientRect();
                const boundingComponentBbox = boundingComponent.getBoundingClientRect();

                expect(overlaysContainerBbox.left).to.be.equal(boundingComponentBbox.left);
                expect(overlaysContainerBbox.top).to.be.equal(boundingComponentBbox.top);
                expect(overlaysContainerBbox.width).to.be.equal(boundingComponentBbox.width);
                expect(overlaysContainerBbox.height).to.be.equal(boundingComponentBbox.height);
            });
        });
        
    });
});
