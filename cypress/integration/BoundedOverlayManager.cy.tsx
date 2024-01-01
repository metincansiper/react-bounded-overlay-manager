import React, { useRef } from 'react';
import { mount } from '@cypress/react18';
import BoundedOverlayManager, { Overlay, PredefinedPosition } from '../../lib/main';

const boundingComponentId = 'bounding-component';
const getBoundingComponent = () => cy.get(`#${boundingComponentId}`);
const getOverlaysContainer = () => cy.get('[role="overlays-container"]');

const OverlayManagerTest = ({ boundingComponentChildren = null, boundingComponentStyle = {}, boundingComponentParentStyle = {}, overlayManagerProps = {}, overlayProps = {} }: any) => {
    const boundingComponentRef = useRef(null);
    return (
        <>
            <div style={boundingComponentParentStyle}>
                <div id={boundingComponentId} style={boundingComponentStyle} ref={boundingComponentRef}>
                    {boundingComponentChildren}
                </div>
            </div>

            <BoundedOverlayManager boundingComponentRef={boundingComponentRef} {...overlayManagerProps}>
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
                        <OverlayManagerTest boundingComponentStyle={{ ...initialDimentions }} />
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
                        <OverlayManagerTest boundingComponentParentStyle={{ ...initialDimentions }} />
                    );
                };

                mount(<CustomOverlayManagerTest />);

                expectRightOverlaysContainerBBox();

                getBoundingComponent().then(($boundingComponent) => {
                    const boundingComponentParent = $boundingComponent[0].parentNode as any;
                    boundingComponentParent.style.width = finalDimentions.width;
                    boundingComponentParent.style.height = finalDimentions.height;

                    expectRightOverlaysContainerBBox();
                });
            });
        });

    });

    describe('overlays container has the right bbox when the window is resized', () => {
        [
            {
                parentStyle: { width: '1000px', height: '500px', position: 'relative' },
                boundingComponentStyle: { position: 'absolute', left: '20%', top: '30%', width: '400px', height: '200px' },
            },
            {
                parentStyle: { width: '1000px', height: '500px', position: 'absolute', left: '20%', top: '30%' },
                boundingComponentStyle: { width: '400px', height: '200px' },
            },
            {
                parentStyle: { width: '1000px', height: '500px', position: 'absolute', right: '20%', bottom: '30%' },
                boundingComponentStyle: { width: '400px', height: '200px' },
            },
            {
                parentStyle: { width: '1000px', height: '500px', position: 'absolute', left: '20%', top: '30%' },
                boundingComponentStyle: { width: '400px', height: '200px', position: 'absolute', left: '20%', top: '30%' },
            },
            {
                parentStyle: { width: '80vw', height: '80%', position: 'absolute', left: '20%', top: '30%' },
                boundingComponentStyle: { width: '400px', height: '200px', position: 'absolute', left: '20%', top: '30%' },
            },
            {
                parentStyle: { width: '80vw', height: '80%' },
                boundingComponentStyle: { width: '400px', height: '200px', position: 'absolute', left: '20%', top: '30%' },
            },
            {
                parentStyle: { width: '80vw', height: '80%' },
                boundingComponentStyle: { width: '50%', height: '50%' },
            },
            {
                parentStyle: { width: '200px', height: '500px' },
                boundingComponentStyle: { width: '50%', height: '50%' },
            }
        ].forEach(({ parentStyle, boundingComponentStyle }) => {
            it(`works correctly when the window is resized when bounding component has the style of ${JSON.stringify(boundingComponentStyle)} and its parent has the style of ${JSON.stringify(parentStyle)} `, () => {
                const CustomOverlayManagerTest = () => {
                    return (
                        <OverlayManagerTest boundingComponentStyle={{ ...boundingComponentStyle }} boundingComponentParentStyle={{ ...parentStyle }} />
                    );
                };

                cy.viewport(500, 400);

                mount(<CustomOverlayManagerTest />);

                expectRightOverlaysContainerBBox();

                cy.viewport(800, 600);

                expectRightOverlaysContainerBBox();
            });
        });
    });

    describe('overlays container does not block the children of the bounding component', () => {
        [
            {
                overlayPosition: PredefinedPosition.BOTTOM_RIGHT,
                description: 'child of the bounding component is clickable when there is no overlay covering it',
                childShouldBeClicked: true,
            },
            {
                overlayPosition: PredefinedPosition.TOP_LEFT,
                description: 'child of the bounding component is not clickable when the overlay covers the child',
                childShouldBeClicked: false,
            }
        ].forEach(({ overlayPosition, description, childShouldBeClicked }) => {
            it(description, () => {
                const boundingComponentChildId = 'bounding-component-child';

                const boundingComponentStyle = { width: '800px', height: '800px', position: 'relative' };
                const overlayManagerProps = {
                    persistentlyShowOverlays: true,
                };
                const clickSpy = cy.spy().as('clickSpy');
                const boundingComponentChildren = (
                    <div
                        id={boundingComponentChildId}
                        onClick={clickSpy}
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100px',
                            height: '20px'
                        }}>
                    </div>
                );
                const overlayProps = {
                    position: overlayPosition,
                };
                const CustomOverlayManagerTest = () => {
                    return (
                        <OverlayManagerTest
                            overlayManagerProps={overlayManagerProps}
                            boundingComponentChildren={boundingComponentChildren}
                            boundingComponentStyle={boundingComponentStyle}
                            overlayProps={overlayProps}
                        />
                    );
                };

                mount(<CustomOverlayManagerTest />);

                cy.get(`#${boundingComponentChildId}`).then($boundingComponentChild => {
                    const boundingRect = $boundingComponentChild[0].getBoundingClientRect();
                    const x = boundingRect.left + 20;
                    const y = boundingRect.top + 10;

                    cy.get('body').click(x, y);

                    if (childShouldBeClicked) {
                        cy.get('@clickSpy').should('have.been.called');
                    }
                    else {
                        cy.get('@clickSpy').should('not.have.been.called');
                    }
                });
            });
        });
    });

    describe('overlays container has the right bbox after api.updateOverlaysContainerBoundingBox is called ', () => {
        it('works correctly when the bounding component itself is repositioned and then api.updateOverlaysContainerBoundingBox is called', () => {
            let api;

            const onApiUpdated = (_api) => {
                console.log('api up')
                api = _api;
            };

            const boundingComponentStyle = { position: 'absolute', left: 0, top: 0, width: '400px', height: '200px' };
            const boundingComponentParentStyle = { width: '1000px', height: '500px', position: 'relative' };

            const CustomOverlayManagerTest = () => {
                return (
                    <OverlayManagerTest overlayManagerProps={{ onApiUpdated }} boundingComponentStyle={boundingComponentStyle} boundingComponentParentStyle={boundingComponentParentStyle} />
                );
            }

            mount(<CustomOverlayManagerTest />);

            getBoundingComponent()
                .then(($boundingComponent) => {
                    const boundingComponent = $boundingComponent[0];
                    boundingComponent.style.left = '100px';
                    boundingComponent.style.top = '100px';
                })
                .should(($boundingComponent) => {
                    const boundingComponent = $boundingComponent[0];
                    const boundingComponentBbox = boundingComponent.getBoundingClientRect();
                    expect(boundingComponentBbox.left).to.be.greaterThan(0);
                    expect(boundingComponentBbox.top).to.be.greaterThan(0);
                    expect(api).to.not.be.undefined;
                })
                .then(() => {
                    api.updateOverlaysContainerBoundingBox();
                    expectRightOverlaysContainerBBox();
                });
        });
    });
});
