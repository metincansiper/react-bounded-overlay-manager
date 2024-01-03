import{j as o}from"./jsx-runtime-AgcCsxC8.js";import{r as xe}from"./index-XiNr8FW2.js";import{O as Be,P as n,B as Ee}from"./Overlay-Gmu5WiNu.js";import"./_commonjsHelpers-5-cIlDoe.js";import"./index-9vG4XYWr.js";const je={title:"Components/Overlay",component:Be,parameters:{layout:"left"},tags:["autodocs"],argTypes:{position:{description:` Defines the anchor point for both the overlay and the bounding component. 
      This prop establishes a fixed point on the overlay that is directly anchored to a 
      corresponding point on the bounding component. For example, when the position is set to 
      BOTTOM_CENTER, it means that the bottom center point of the overlay will be anchored to the 
      bottom center of the bounding component.`},offset:{description:`Modifies the overlay's anchored position by adjusting its coordinates 
      relative to the anchor point set by the 'position' prop. The accepted values for 'offset' 
      mirror those of corresponding CSS properties when it corresponds to edge-alligned positions 
      ('top', 'bottom', 'left', 'right'). For instance, the 'top' property of 'offset' can be assigned any value that is valid for CSSProperties['top'],
      such as '50px', '20%', etc. For center-aligned positions, use properties ending in 'InPercent' (e.g., 'topInPercent'), 
      accepting numeric values for precise adjustment. The specific 'offset' properties that are applicable vary based 
      on the selected 'position', allowing for targeted adjustments in different directions:


      - TOP_LEFT: Adjust using 'top' and 'left'
      - TOP_CENTER: Adjust using 'top' and 'leftInPercent'
      - TOP_RIGHT: Adjust using 'top' and 'right'
      - MID_LEFT: Adjust using 'topInPercent' and 'left'
      - CENTER: Adjust using 'topInPercent' and 'leftInPercent'
      - MID_RIGHT: Adjust using 'topInPercent' and 'right'
      - BOTTOM_LEFT: Adjust using 'bottom' and 'left'
      - BOTTOM_CENTER: Adjust using 'bottom' and 'leftInPercent'
      - BOTTOM_RIGHT: Adjust using 'bottom' and 'right'
      `}}},e=Se=>{const C=xe.useRef(null);return o.jsxs(o.Fragment,{children:[o.jsx("div",{ref:C,style:{width:"70vw",height:"50vh",border:"1px solid black"}}),o.jsx(Ee,{boundingComponentRef:C,persistentlyShowOverlays:!0,children:o.jsx(Be,{...Se,children:o.jsx("div",{children:"Overlay Content"})})})]})},r=e.bind({});r.args={};const t=e.bind({});t.args={position:n.TOP_LEFT};const a=e.bind({});a.args={position:n.TOP_LEFT,offset:{top:"10px",left:"10%"}};const s=e.bind({});s.args={position:n.TOP_CENTER};const i=e.bind({});i.args={position:n.TOP_CENTER,offset:{top:"10px",leftInPercent:10}};const d=e.bind({});d.args={position:n.TOP_RIGHT};const l=e.bind({});l.args={position:n.TOP_RIGHT,offset:{top:"10px",right:"10%"}};const p=e.bind({});p.args={position:n.MID_LEFT};const u=e.bind({});u.args={position:n.MID_LEFT,offset:{topInPercent:10,left:"10px"}};const g=e.bind({});g.args={position:n.CENTER};const c=e.bind({});c.args={position:n.CENTER,offset:{topInPercent:10,leftInPercent:10}};const v=e.bind({});v.args={position:n.MID_RIGHT};const f=e.bind({});f.args={position:n.MID_RIGHT,offset:{topInPercent:10,right:"10px"}};const m=e.bind({});m.args={position:n.BOTTOM_LEFT};const y=e.bind({});y.args={position:n.BOTTOM_LEFT,offset:{bottom:"10px",left:"10%"}};const h=e.bind({});h.args={position:n.BOTTOM_CENTER};const O=e.bind({});O.args={position:n.BOTTOM_CENTER,offset:{bottom:"10px",leftInPercent:10}};const b=e.bind({});b.args={position:n.BOTTOM_RIGHT};const R=e.bind({});R.args={position:n.BOTTOM_RIGHT,offset:{bottom:"10px",right:"10%"}};var T,w,M;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`(args: any) => {
  const boundingComponentRef = useRef(null);
  return <>
      <div ref={boundingComponentRef} style={{
      width: '70vw',
      height: '50vh',
      border: '1px solid black'
    }} />
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
        <Overlay {...args}>
          <div>Overlay Content</div>
        </Overlay>
      </BoundedOverlayManager>
    </>;
}`,...(M=(w=r.parameters)==null?void 0:w.docs)==null?void 0:M.source}}};var B,S,x;t.parameters={...t.parameters,docs:{...(B=t.parameters)==null?void 0:B.docs,source:{originalSource:`(args: any) => {
  const boundingComponentRef = useRef(null);
  return <>
      <div ref={boundingComponentRef} style={{
      width: '70vw',
      height: '50vh',
      border: '1px solid black'
    }} />
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
        <Overlay {...args}>
          <div>Overlay Content</div>
        </Overlay>
      </BoundedOverlayManager>
    </>;
}`,...(x=(S=t.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var E,I,P;a.parameters={...a.parameters,docs:{...(E=a.parameters)==null?void 0:E.docs,source:{originalSource:`(args: any) => {
  const boundingComponentRef = useRef(null);
  return <>
      <div ref={boundingComponentRef} style={{
      width: '70vw',
      height: '50vh',
      border: '1px solid black'
    }} />
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
        <Overlay {...args}>
          <div>Overlay Content</div>
        </Overlay>
      </BoundedOverlayManager>
    </>;
}`,...(P=(I=a.parameters)==null?void 0:I.docs)==null?void 0:P.source}}};var _,L,k;s.parameters={...s.parameters,docs:{...(_=s.parameters)==null?void 0:_.docs,source:{originalSource:`(args: any) => {
  const boundingComponentRef = useRef(null);
  return <>
      <div ref={boundingComponentRef} style={{
      width: '70vw',
      height: '50vh',
      border: '1px solid black'
    }} />
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
        <Overlay {...args}>
          <div>Overlay Content</div>
        </Overlay>
      </BoundedOverlayManager>
    </>;
}`,...(k=(L=s.parameters)==null?void 0:L.docs)==null?void 0:k.source}}};var j,W,F;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`(args: any) => {
  const boundingComponentRef = useRef(null);
  return <>
      <div ref={boundingComponentRef} style={{
      width: '70vw',
      height: '50vh',
      border: '1px solid black'
    }} />
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
        <Overlay {...args}>
          <div>Overlay Content</div>
        </Overlay>
      </BoundedOverlayManager>
    </>;
}`,...(F=(W=i.parameters)==null?void 0:W.docs)==null?void 0:F.source}}};var N,A,D;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`(args: any) => {
  const boundingComponentRef = useRef(null);
  return <>
      <div ref={boundingComponentRef} style={{
      width: '70vw',
      height: '50vh',
      border: '1px solid black'
    }} />
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
        <Overlay {...args}>
          <div>Overlay Content</div>
        </Overlay>
      </BoundedOverlayManager>
    </>;
}`,...(D=(A=d.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var G,H,q;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`(args: any) => {
  const boundingComponentRef = useRef(null);
  return <>
      <div ref={boundingComponentRef} style={{
      width: '70vw',
      height: '50vh',
      border: '1px solid black'
    }} />
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
        <Overlay {...args}>
          <div>Overlay Content</div>
        </Overlay>
      </BoundedOverlayManager>
    </>;
}`,...(q=(H=l.parameters)==null?void 0:H.docs)==null?void 0:q.source}}};var z,J,K;p.parameters={...p.parameters,docs:{...(z=p.parameters)==null?void 0:z.docs,source:{originalSource:`(args: any) => {
  const boundingComponentRef = useRef(null);
  return <>
      <div ref={boundingComponentRef} style={{
      width: '70vw',
      height: '50vh',
      border: '1px solid black'
    }} />
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
        <Overlay {...args}>
          <div>Overlay Content</div>
        </Overlay>
      </BoundedOverlayManager>
    </>;
}`,...(K=(J=p.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,U,V;u.parameters={...u.parameters,docs:{...(Q=u.parameters)==null?void 0:Q.docs,source:{originalSource:`(args: any) => {
  const boundingComponentRef = useRef(null);
  return <>
      <div ref={boundingComponentRef} style={{
      width: '70vw',
      height: '50vh',
      border: '1px solid black'
    }} />
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
        <Overlay {...args}>
          <div>Overlay Content</div>
        </Overlay>
      </BoundedOverlayManager>
    </>;
}`,...(V=(U=u.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};var X,Y,Z;g.parameters={...g.parameters,docs:{...(X=g.parameters)==null?void 0:X.docs,source:{originalSource:`(args: any) => {
  const boundingComponentRef = useRef(null);
  return <>
      <div ref={boundingComponentRef} style={{
      width: '70vw',
      height: '50vh',
      border: '1px solid black'
    }} />
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
        <Overlay {...args}>
          <div>Overlay Content</div>
        </Overlay>
      </BoundedOverlayManager>
    </>;
}`,...(Z=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,ee,ne;c.parameters={...c.parameters,docs:{...($=c.parameters)==null?void 0:$.docs,source:{originalSource:`(args: any) => {
  const boundingComponentRef = useRef(null);
  return <>
      <div ref={boundingComponentRef} style={{
      width: '70vw',
      height: '50vh',
      border: '1px solid black'
    }} />
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
        <Overlay {...args}>
          <div>Overlay Content</div>
        </Overlay>
      </BoundedOverlayManager>
    </>;
}`,...(ne=(ee=c.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var oe,re,te;v.parameters={...v.parameters,docs:{...(oe=v.parameters)==null?void 0:oe.docs,source:{originalSource:`(args: any) => {
  const boundingComponentRef = useRef(null);
  return <>
      <div ref={boundingComponentRef} style={{
      width: '70vw',
      height: '50vh',
      border: '1px solid black'
    }} />
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
        <Overlay {...args}>
          <div>Overlay Content</div>
        </Overlay>
      </BoundedOverlayManager>
    </>;
}`,...(te=(re=v.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};var ae,se,ie;f.parameters={...f.parameters,docs:{...(ae=f.parameters)==null?void 0:ae.docs,source:{originalSource:`(args: any) => {
  const boundingComponentRef = useRef(null);
  return <>
      <div ref={boundingComponentRef} style={{
      width: '70vw',
      height: '50vh',
      border: '1px solid black'
    }} />
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
        <Overlay {...args}>
          <div>Overlay Content</div>
        </Overlay>
      </BoundedOverlayManager>
    </>;
}`,...(ie=(se=f.parameters)==null?void 0:se.docs)==null?void 0:ie.source}}};var de,le,pe;m.parameters={...m.parameters,docs:{...(de=m.parameters)==null?void 0:de.docs,source:{originalSource:`(args: any) => {
  const boundingComponentRef = useRef(null);
  return <>
      <div ref={boundingComponentRef} style={{
      width: '70vw',
      height: '50vh',
      border: '1px solid black'
    }} />
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
        <Overlay {...args}>
          <div>Overlay Content</div>
        </Overlay>
      </BoundedOverlayManager>
    </>;
}`,...(pe=(le=m.parameters)==null?void 0:le.docs)==null?void 0:pe.source}}};var ue,ge,ce;y.parameters={...y.parameters,docs:{...(ue=y.parameters)==null?void 0:ue.docs,source:{originalSource:`(args: any) => {
  const boundingComponentRef = useRef(null);
  return <>
      <div ref={boundingComponentRef} style={{
      width: '70vw',
      height: '50vh',
      border: '1px solid black'
    }} />
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
        <Overlay {...args}>
          <div>Overlay Content</div>
        </Overlay>
      </BoundedOverlayManager>
    </>;
}`,...(ce=(ge=y.parameters)==null?void 0:ge.docs)==null?void 0:ce.source}}};var ve,fe,me;h.parameters={...h.parameters,docs:{...(ve=h.parameters)==null?void 0:ve.docs,source:{originalSource:`(args: any) => {
  const boundingComponentRef = useRef(null);
  return <>
      <div ref={boundingComponentRef} style={{
      width: '70vw',
      height: '50vh',
      border: '1px solid black'
    }} />
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
        <Overlay {...args}>
          <div>Overlay Content</div>
        </Overlay>
      </BoundedOverlayManager>
    </>;
}`,...(me=(fe=h.parameters)==null?void 0:fe.docs)==null?void 0:me.source}}};var ye,he,Oe;O.parameters={...O.parameters,docs:{...(ye=O.parameters)==null?void 0:ye.docs,source:{originalSource:`(args: any) => {
  const boundingComponentRef = useRef(null);
  return <>
      <div ref={boundingComponentRef} style={{
      width: '70vw',
      height: '50vh',
      border: '1px solid black'
    }} />
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
        <Overlay {...args}>
          <div>Overlay Content</div>
        </Overlay>
      </BoundedOverlayManager>
    </>;
}`,...(Oe=(he=O.parameters)==null?void 0:he.docs)==null?void 0:Oe.source}}};var be,Re,Ce;b.parameters={...b.parameters,docs:{...(be=b.parameters)==null?void 0:be.docs,source:{originalSource:`(args: any) => {
  const boundingComponentRef = useRef(null);
  return <>
      <div ref={boundingComponentRef} style={{
      width: '70vw',
      height: '50vh',
      border: '1px solid black'
    }} />
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
        <Overlay {...args}>
          <div>Overlay Content</div>
        </Overlay>
      </BoundedOverlayManager>
    </>;
}`,...(Ce=(Re=b.parameters)==null?void 0:Re.docs)==null?void 0:Ce.source}}};var Te,we,Me;R.parameters={...R.parameters,docs:{...(Te=R.parameters)==null?void 0:Te.docs,source:{originalSource:`(args: any) => {
  const boundingComponentRef = useRef(null);
  return <>
      <div ref={boundingComponentRef} style={{
      width: '70vw',
      height: '50vh',
      border: '1px solid black'
    }} />
      <BoundedOverlayManager boundingComponentRef={boundingComponentRef} persistentlyShowOverlays={true}>
        <Overlay {...args}>
          <div>Overlay Content</div>
        </Overlay>
      </BoundedOverlayManager>
    </>;
}`,...(Me=(we=R.parameters)==null?void 0:we.docs)==null?void 0:Me.source}}};const We=["Default","TopLeft","TopLeftWithOffset","TopCenter","TopCenterWithOffset","TopRight","TopRightWithOffset","MidLeft","MidLeftWithOffset","Center","CenterWithOffset","MidRight","MidRightWithOffset","BottomLeft","BottomLeftWithOffset","BottomCenter","BottomCenterWithOffset","BottomRight","BottomRightWithOffset"];export{h as BottomCenter,O as BottomCenterWithOffset,m as BottomLeft,y as BottomLeftWithOffset,b as BottomRight,R as BottomRightWithOffset,g as Center,c as CenterWithOffset,r as Default,p as MidLeft,u as MidLeftWithOffset,v as MidRight,f as MidRightWithOffset,s as TopCenter,i as TopCenterWithOffset,t as TopLeft,a as TopLeftWithOffset,d as TopRight,l as TopRightWithOffset,We as __namedExportsOrder,je as default};
