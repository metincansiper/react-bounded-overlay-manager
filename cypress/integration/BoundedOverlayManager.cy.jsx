import React, { useRef } from 'react';
import { mount } from '@cypress/react18';
import BoundedOverlayManager, { Overlay, PredefinedPosition } from '../../lib/main';

describe('BoundedOverlayManager Component', () => {
    const boundingComponentId = 'bounding-component';
    const getBoundingComponent = () => cy.get(`#${boundingComponentId}`);
    const getOverlaysContainer = () => cy.get('[role="overlays-container"]');

    const OverlayManagerTest = ({ boundingComponentStyle = {}, boundingComponentParentStyle = {}, overlayManagerProps = {}, overlayProps = {} }) => {
        const boundingComponentRef = useRef();
        return (
            <>
                <div style={boundingComponentParentStyle}>
                    <div id={boundingComponentId} style={boundingComponentStyle} ref={boundingComponentRef}></div>
                </div>
    
                <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true} { ...overlayManagerProps }>
                    <Overlay position={PredefinedPosition.TOP_LEFT} {...overlayProps}>
                        Hello World
                    </Overlay>
                </BoundedOverlayManager>
            </>
        );
    };

    const expectRightOverlaysContainerBBox = () => {
        getBoundingComponent().then(($boundingComponent) => {
            const boundingComponent = $boundingComponent[0];
            getOverlaysContainer().should(($overlaysContainer) => {
                const overlaysContainer = $overlaysContainer[0];
                const overlaysContainerBbox = overlaysContainer.getBoundingClientRect();
                const boundingComponentBbox = boundingComponent.getBoundingClientRect();

                expect(overlaysContainerBbox.left).to.be.equal(boundingComponentBbox.left);
                expect(overlaysContainerBbox.top).to.be.equal(boundingComponentBbox.top);
                expect(overlaysContainerBbox.width).to.be.equal(boundingComponentBbox.width);
                expect(overlaysContainerBbox.height).to.be.equal(boundingComponentBbox.height);
            });
        });
    };
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
                    const boundingComponentStyle = { ...boundingStyle };
                    const boundingComponentParentStyle = { width: '1000px', height: '500px', ...parentStyle };
                    const CustomOverlayManagerTest = () => {
                        return (
                            <OverlayManagerTest boundingComponentStyle={boundingComponentStyle} boundingComponentParentStyle={boundingComponentParentStyle} />
                        );
                    };

                    mount(<CustomOverlayManagerTest />);

                    expectRightOverlaysContainerBBox();
                });
            });
        });
    });

    describe('overlays container has the right bbox when bounding component is resized', () => {
        [
            {
                initialDimentions: { width: '400px', height: '200px' },
                finalDimentions: { width: '600px', height: '300px' }
            },
            {
                initialDimentions: { width: '80vw', height: '100vh' },
                finalDimentions: { width: '100vw', height: '200vh' }
            },
            {
                initialDimentions: { width: '75%', height: '75%' },
                finalDimentions: { width: '80%', height: '60%' }
            }
        ].forEach(({ initialDimentions, finalDimentions }) => {
            it(`works correctly when bounding component itself is resized directly from ${JSON.stringify(initialDimentions)} to ${JSON.stringify(finalDimentions)}`, () => {
                const CustomOverlayManagerTest = () => {
                    return (
                        <OverlayManagerTest boundingComponentStyle={ { ...initialDimentions } } />
                    );
                }
    
                mount(<CustomOverlayManagerTest />);
    
                expectRightOverlaysContainerBBox();
    
                getBoundingComponent().then(($boundingComponent) => {
                    const boundingComponent = $boundingComponent[0];
                    boundingComponent.style.width = finalDimentions.width;
                    boundingComponent.style.height = finalDimentions.height;
    
                    expectRightOverlaysContainerBBox();
                });
            });
        });
        
        [
            {
                initialDimentions: { width: '400px', height: '200px' },
                finalDimentions: { width: '600px', height: '300px' }
            },
            {
                initialDimentions: { width: '80vw', height: '100vh' },
                finalDimentions: { width: '100vw', height: '200vh' }
            },
            {
                initialDimentions: { width: '75%', height: '75%' },
                finalDimentions: { width: '80%', height: '60%' }
            },
        ].forEach(({ initialDimentions, finalDimentions }) => {
            it(`works correctly when bounding component is resized indirectly through resize of its parent from ${JSON.stringify(initialDimentions)} to ${JSON.stringify(finalDimentions)}`, () => {
                const CustomOverlayManagerTest = () => {
                    return (
                        <OverlayManagerTest boundingComponentParentStyle={ { ...initialDimentions } } />
                    );
                };

                mount(<CustomOverlayManagerTest />);
    
                expectRightOverlaysContainerBBox();
    
                getBoundingComponent().then(($boundingComponent) => {
                    const boundingComponentParent = $boundingComponent[0].parentNode;
                    boundingComponentParent.style.width = finalDimentions.width;
                    boundingComponentParent.style.height = finalDimentions.height;
    
                    expectRightOverlaysContainerBBox();
                });
            });
        });
        
    });
});
