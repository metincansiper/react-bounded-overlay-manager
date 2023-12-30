import React, { createRef, useRef } from 'react';
import { mount } from '@cypress/react18';
import BoundedOverlayManager, { Overlay, PredefinedPosition } from '../../lib/main';
import cssUnits from 'units-css';

describe('OverlayManagerTest Component', () => {
    it('overlay content is visible', () => {
        // let boundingComponentRef = createRef();
        const OverlayManagerTest = () => {
            const boundingComponentRef = useRef();
            return (
                <>  
                    <div style={{position: 'relative', width: '1000px', height: '500px'}}>
                        <div id='bounding-component' style={{position: 'absolute', top: '100px', left: '100px', width: '400px', height: '200px', backgroundColor: 'blue'}} ref={boundingComponentRef}></div>
                    </div>
                    
                    <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
                        <Overlay position={PredefinedPosition.MID_LEFT} offset={{left: '10%', top: '10%'}}>
                            <div id="overlay-content">Hello World</div>
                        </Overlay>
                    </BoundedOverlayManager>
                </>
            );
        };

        mount(<OverlayManagerTest />);
        
        cy.get('#overlay-content').then(($overlayContent) => {
            const overlayContent = $overlayContent[0];
            cy.get('#bounding-component').should(($boundingComponent) => {
                const boundingComponent = $boundingComponent[0];
                // expect(boundingComponent).to.have.property('width', '400px');
                expect(cssUnits.convert('px', '10%', overlayContent, 'width')).to.be.a('number');
                expect(cssUnits.convert('px', '10%', overlayContent, 'height')).to.be.a('number');
                const offsetLeftInPx = cssUnits.convert('px', '10%', boundingComponent, 'left');
                const offsetTopInPx = cssUnits.convert('px', '60%', boundingComponent, 'top');
                
                const bboxOverlayContent = overlayContent.getBoundingClientRect();
                const bboxBoundingComponent = boundingComponent.getBoundingClientRect();

                // expect(bboxBoundingComponent.left + offsetLeftInPx).to.be.equal(bboxOverlayContent.left);
                // expect(bboxBoundingComponent.top + offsetTopInPx).to.be.equal(bboxOverlayContent.top);
                // cy.should(() => {
                    
                //     // expect(offsetLeftInPx).to.be.a('number');
                //     // expect(offsetTopInPx).to.be.a('number');
                //     // expect(bboxOverlayContent.left).to.be.a('number');
                //     // expect(bboxOverlayContent.top).to.be.a('number');
                // });


                // cy.wait(2000).then(() => {
                //     expect(bboxBoundingComponent.left).to.be.a('number');
                //     expect(bboxBoundingComponent.top).to.be.a('number');
                //     // expect(offsetLeftInPx).to.be.a('number');
                //     // expect(offsetTopInPx).to.be.a('number');
                //     expect(bboxOverlayContent.left).to.be.a('number');
                //     expect(bboxOverlayContent.top).to.be.a('number');
                // });
                
                
                // expect(bboxBoundingComponent.left).to.be.equal(bboxOverlayContent.left + offsetLeftInPx);
                // expect(bboxBoundingComponent.top).to.be.equal(bboxOverlayContent.top + offsetTopInPx);
            });
        });
        
    });
});
