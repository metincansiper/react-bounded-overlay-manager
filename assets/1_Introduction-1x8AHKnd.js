import{j as e}from"./jsx-runtime-AgcCsxC8.js";import"./blocks-i5o0VK9R.js";import{useMDXComponents as t}from"./index-7MmEg4M7.js";import{M as r}from"./index-4ISXnWYO.js";import"./index-XiNr8FW2.js";import"./_commonjsHelpers-5-cIlDoe.js";import"./iframe-JGpUAcxS.js";import"../sb-preview/runtime.js";import"./index-9vG4XYWr.js";import"./index-ogXoivrg.js";import"./index-mLPG47JP.js";import"./index-PPLHz8o0.js";function i(o){const n=Object.assign({h1:"h1",h2:"h2",p:"p",code:"code",ul:"ul",li:"li",strong:"strong",pre:"pre",h3:"h3",a:"a"},t(),o.components);return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Documentation/Introduction"}),`
`,e.jsx(n.h1,{id:"react-bounded-overlay-manager",children:"React Bounded Overlay Manager"}),`
`,e.jsx(n.h2,{id:"overview",children:"Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"React Bounded Overlay Manager"})," is a React library designed to create and manage overlay components within a specified bounding container. It offers flexible positioning, dynamic show/hide behavior, customizable event handling, and an API for extended control."]}),`
`,e.jsx(n.h2,{id:"key-features",children:"Key Features"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Flexible Positioning"}),": Utilize ",e.jsx(n.code,{children:"position"})," and ",e.jsx(n.code,{children:"offset"})," parameters within the Overlay component to achieve precise and strategic placement of overlays."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Dynamic Visibility"}),": Effortlessly configure the appearance and disappearance of overlays in response to user interactions, enhancing user experience and interface responsiveness."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Customizable Event Handling"}),": Tailor overlay visibility to align with specific application requirements. This includes the ability to control when overlays appear or disappear based on user interactions, system events, or custom triggers. Configure these settings to suit your application's behavior and user experience needs."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Extended Control via API"}),": Access the API for comprehensive control over overlay behavior, extending beyond the capabilities offered by component properties."]}),`
`]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install react-bounded-overlay-manager
`})}),`
`,e.jsx(n.h2,{id:"basic-example",children:"Basic Example"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-jsx",children:`import React, { useRef } from 'react';
import BoundedOverlayManager, { Overlay, PredefinedPosition } from 'react-bounded-overlay-manager';

const BasicExample = () => {
  const boundingComponentRef = useRef(null);

  return (
    <div>
      <div ref={boundingComponentRef} style={{ width: '70vw', height: '50vh', border: '1px solid black' }}>
        Hover over this div to display overlays.
      </div>
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef}>
        <Overlay position={PredefinedPosition.BOTTOM_CENTER}>
          <button>Overlay Button</button>
        </Overlay>
        <!-- more overlays here -->
      </BoundedOverlayManager>
    </div>
  );
};
`})}),`
`,e.jsx(n.h2,{id:"learn-more",children:"Learn More"}),`
`,e.jsxs(n.p,{children:["For more detailed information on how to utilize ",e.jsx(n.code,{children:"React Bounded Overlay Manager"})," to its fullest, explore the following sections:"]}),`
`,e.jsx(n.h3,{id:"components",children:"Components"}),`
`,e.jsx(n.p,{children:"Dive into our interactive stories to uncover in-depth information on each component, complete with examples you can explore and interact with. These stories focus on advanced customization and control techniques, offering hands-on experience with the components:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"./?path=/docs/components-boundedoverlaymanager--docs",children:"BoundedOverlayManager"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"./?path=/docs/components-overlay--docs",children:"Overlay"})}),`
`]}),`
`,e.jsx(n.h3,{id:"api-documentation",children:"API Documentation"}),`
`,e.jsx(n.p,{children:"For a deeper dive into the specific methods and how they can be employed in your application, visit the API documentation."}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"./?path=/docs/documentation-api-documentation--docs",children:"API Documentation"})})]})}function f(o={}){const{wrapper:n}=Object.assign({},t(),o.components);return n?e.jsx(n,Object.assign({},o,{children:e.jsx(i,o)})):i(o)}export{f as default};
