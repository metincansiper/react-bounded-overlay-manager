import React, { useRef } from 'react';
import { mount } from '@cypress/react18';
import BoundedOverlayManager, { Overlay, PredefinedPosition } from '../../lib/main';

describe('BoundedOverlayManager Component', () => {
    describe('overlays container has the right bbox on mount', () => {
        const parentStyles = [
            { position: 'relative', top: '10px', left: '10px' },
            { position: 'absolute', top: '20px', left: '20px' },
            { position: 'fixed', top: '30px', left: '30px' },
            { position: 'static' },
            { display: 'flex', justifyContent: 'center', alignItems: 'center' },
            { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' },
            { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' },
            { overflow: 'hidden', padding: '20px' },
        ];
        
        const boundingStyles = [
            { position: 'absolute', top: '100px', left: '100px', width: '400px', height: '200px' },
            { position: 'relative', top: '50px', left: '150px', width: '300px', height: '100px' },
            { position: 'relative', top: '50px', left: '150px', width: '3000px', height: '1000px' },
            { position: 'fixed', top: '200px', left: '200px', width: '200px', height: '100px' },
            { position: 'static', width: '100%', height: '50%' },
            { position: 'static', width: '200%', height: '250%' },
            { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' },
        ];
    
        parentStyles.forEach(parentStyle => {
            boundingStyles.forEach(boundingStyle => {
                it(`works correctly with parent style ${JSON.stringify(parentStyle)} and bounding style ${JSON.stringify(boundingStyle)}`, () => {
                    const OverlayManagerTest = () => {
                        const boundingComponentRef = useRef();
                        return (
                            <>  
                                <div style={{ width: '1000px', height: '500px', ...parentStyle }}>
                                    <div id='bounding-component' style={{ backgroundColor: 'blue', ...boundingStyle }} ref={boundingComponentRef}></div>
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
        });
    });  
});
