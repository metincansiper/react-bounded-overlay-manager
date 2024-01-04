import{j as e}from"./jsx-runtime-AgcCsxC8.js";import"./blocks-i5o0VK9R.js";import{useMDXComponents as i}from"./index-7MmEg4M7.js";import{M as r}from"./index-Ebd_GBJe.js";import"./index-XiNr8FW2.js";import"./_commonjsHelpers-5-cIlDoe.js";import"./iframe-QoMV_NDT.js";import"../sb-preview/runtime.js";import"./index-9vG4XYWr.js";import"./index-ogXoivrg.js";import"./index-mLPG47JP.js";import"./index-PPLHz8o0.js";function t(o){const n=Object.assign({h1:"h1",h2:"h2",p:"p",code:"code",pre:"pre",h3:"h3",ul:"ul",li:"li"},i(),o.components);return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Documentation/API Documentation"}),`
`,e.jsx(n.h1,{id:"api-documentation-for-react-bounded-overlay-manager",children:"API Documentation for React Bounded Overlay Manager"}),`
`,e.jsx(n.h2,{id:"introduction",children:"Introduction"}),`
`,e.jsxs(n.p,{children:["This section provides detailed information about the API methods available in the ",e.jsx(n.code,{children:"React Bounded Overlay Manager"})," library."]}),`
`,e.jsx(n.h2,{id:"using-the-api",children:"Using the API"}),`
`,e.jsxs(n.p,{children:["To access the API, use the ",e.jsx(n.code,{children:"onApiUpdated"})," property of the ",e.jsx(n.code,{children:"BoundedOverlayManager"})," component. This callback returns an API object."]}),`
`,e.jsx(n.p,{children:"Here's an example demonstrating how to use the API:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`const boundingComponentRef = useRef(null);
const apiRef = useRef<BoundedOverlayManagerApi>();

const onApiUpdated = (api: BoundedOverlayManagerApi) => {
    apiRef.current = api;
};

return (
    <>
        <div ref={boundingComponentRef}>
            Bounding Component
        </div>
        <button onClick={() => apiRef?.renderOverlays()}>Render Overlays</button>
        <BoundedOverlayManager onApiUpdated={onApiUpdated} boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
            <Overlay position={PredefinedPosition.BOTTOM_CENTER}>
                Overlay Content
            </Overlay>
        </BoundedOverlayManager>
    </>
)
`})}),`
`,e.jsx(n.h2,{id:"api-methods",children:"API Methods"}),`
`,e.jsx(n.h3,{id:"renderoverlays",children:"renderOverlays()"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Triggers the rendering of overlays. This method is effective for scenarios where system events do not automatically trigger overlay rendering."}),`
`]}),`
`,e.jsx(n.h3,{id:"clearoverlays",children:"clearOverlays()"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Triggers clearing of the currently displayed overlays, effective in cases where system events do not automatically lead to their hiding. Note, however, that it has no effect when ",e.jsx(n.code,{children:"persistentlyShowOverlays"})," is enabled, as overlays in this mode are intended to stay visible continuously."]}),`
`]}),`
`,e.jsx(n.h3,{id:"updateoverlayscontainerboundingbox",children:"updateOverlaysContainerBoundingBox()"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Updates the bounding box of the overlays container. While the library automatically updates the bounding box during window resizing or direct resizing of the bounding component, there are other situations where a manual update is necessary to ensure accurate overlay positioning such as when the bounding component is repositioned."}),`
`]})]})}function x(o={}){const{wrapper:n}=Object.assign({},i(),o.components);return n?e.jsx(n,Object.assign({},o,{children:e.jsx(t,o)})):t(o)}export{x as default};
