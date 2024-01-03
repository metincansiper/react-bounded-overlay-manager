import{j as e}from"./jsx-runtime-AgcCsxC8.js";import{r as u}from"./index-XiNr8FW2.js";import{B as l,O as t,P as s,D as v,a as p,b as c,c as m,d as y,e as O}from"./Overlay-Gmu5WiNu.js";import"./_commonjsHelpers-5-cIlDoe.js";import"./index-9vG4XYWr.js";const w={title:"Components/BoundedOverlayManager",component:l,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{persistentlyShowOverlays:{description:"When set to true, overlays are always shown independent of the other factors."},boundingComponentRef:{control:!1,description:"Reference to the component relative to which overlays will be positioned."},overlaysShowTimeout:{description:"Time (in milliseconds) after which overlays will automatically hide, unless persistently shown. Set to NO_TIMEOUT or -1 to disable."},hideOverlaysOnMouseLeave:{description:"When enabled (true), overlays will hide as soon as the mouse leaves the bounding component."},showOverlaysOnMouseMove:{description:"When enabled (true), overlays will appear when the mouse moves on the bounding component."},skipAllSystemEvents:{description:"When set to true, all system events (like mouse movement) will be ignored in overlay behavior."},onApiUpdated:{control:!1,description:"Callback function that is called when the API updates. The updated API is passed as an argument to this function."},unmountContentWhenHidden:{description:"When set to true, the content of the overlay will be unmounted when the overlay is hidden."}}},f=d=>{const o=u.useRef(null),h={width:"70vw",height:"50vh",border:"1px solid black",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"large"};return e.jsxs(e.Fragment,{children:[e.jsx("div",{ref:o,style:h,children:"Move the mouse over this div to show the overlays"}),e.jsxs(l,{boundingComponentRef:o,...d,children:[e.jsx(t,{position:s.BOTTOM_CENTER,offset:{bottom:"2vh"},children:e.jsx("button",{children:"Overlay Button"})}),e.jsx(t,{position:s.BOTTOM_RIGHT,offset:{bottom:"2vh",right:"2vw"},children:e.jsx("div",{style:{border:"2px solid black",padding:"2px"},children:"Overlay Div"})})]})]})},b={persistentlyShowOverlays:v,overlaysShowTimeout:p,hideOverlaysOnMouseLeave:c,showOverlaysOnMouseMove:m,skipAllSystemEvents:y,unmountContentWhenHidden:O},n=f.bind({});n.args={...b};var r,i,a;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`args => {
  const boundingComponentRef = useRef(null);
  const boundingComponentStyle: CSSProperties = {
    width: '70vw',
    height: '50vh',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 'large'
  };
  return <>
      <div ref={boundingComponentRef} style={boundingComponentStyle}>
        Move the mouse over this div to show the overlays
      </div>
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} {...args}>
        <Overlay position={PredefinedPosition.BOTTOM_CENTER} offset={{
        bottom: '2vh'
      }}>
          <button>Overlay Button</button>
        </Overlay>
        <Overlay position={PredefinedPosition.BOTTOM_RIGHT} offset={{
        bottom: '2vh',
        right: '2vw'
      }}>
          <div style={{
          border: '2px solid black',
          padding: '2px'
        }}>Overlay Div</div>
        </Overlay>
      </BoundedOverlayManager>
    </>;
}`,...(a=(i=n.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};const M=["Default"];export{n as Default,M as __namedExportsOrder,w as default};
