import React from "react";
import ContentLoader from "react-content-loader";

const Profile_Skel = (props) => (
  <ContentLoader 
    speed={1}
    width={window.innerWidth / 2}
    height={window.innerHeight}
    viewBox="0 0 476 124"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
    <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
    <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
    <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
    <circle cx="20" cy="20" r="20" />
  </ContentLoader>
);

const Username_skell = (props) => (
  <ContentLoader 
    speed={1}
    width={100}
    height={80}
    viewBox="0 0 476 124"
    backgroundColor="#111827"
    foregroundColor="#1f2937"
    {...props}
  >
    <rect x="0" y="0" rx="30" ry="30" width="100%" height="56" /> 
    {/* <rect x="0" y="59" rx="3" ry="3" width="400" height="56" />  */}
  </ContentLoader>
);

const Bio_skel = (props) => (
  <ContentLoader 
    speed={1}
    
    height={60}
    viewBox="0 0 476 224"
    backgroundColor="#111827"
    foregroundColor="#1f2937"
    {...props}
  >
    <rect x="0" y="0" rx="25" ry="25" width="100%" height="46" /> 
    <rect x="0" y="60" rx="25" ry="25" width="70%" height="46" /> 
    <rect x="0" y="116" rx="25" ry="25" width="30%" height="46" /> 
    {/* <rect x="0" y="59" rx="3" ry="3" width="400" height="56" />  */}
  </ContentLoader>
);

const Cat_skel = (props) => (
  <ContentLoader 
    speed={1}
    
    height={15}
    viewBox="0 0 476 124"
    backgroundColor="#111827"
    foregroundColor="#1f2937"
    {...props}
  >
    <rect x="0" y="0" rx="25" ry="25" width="100%" height="100%" /> 
    {/* <rect x="0" y="60" rx="25" ry="25" width="100%" height="46" />  */}
    {/* <rect x="0" y="59" rx="3" ry="3" width="400" height="56" />  */}
  </ContentLoader>
);
const Pff_skel = (props) => (
  <ContentLoader 
    speed={1}
    
    height={15}
    viewBox="0 0 476 124"
    backgroundColor="#111827"
    foregroundColor="#1f2937"
    {...props}
  >
    <rect x="0" y="0" rx="25" ry="25" width="100%" height="100%"  /> 
    {/* <rect x="0" y="60" rx="25" ry="25" width="100%" height="46" />  */}
    {/* <rect x="0" y="59" rx="3" ry="3" width="400" height="56" />  */}
  </ContentLoader>
);

const Post_skel = (props) => (
    <>
        <ContentLoader 
            speed={1}
            width={400}
            height={460}
            viewBox="0 0 400 460"
            backgroundColor="#111827"
            foregroundColor="##1f2937"
            {...props}
        >
            <circle cx="17" cy="20" r="15" /> 
            <rect x="39" y="14" rx="5" ry="5" width="140" height="10" /> 
            <rect x="6" y="41" rx="4" ry="4" width="82" height="9" /> 
            <rect x="1" y="57" rx="13" ry="13" width="400" height="400" />
        </ContentLoader>
    
    </>
)

const People_skel = (props) => (
    <ContentLoader 
    speed={1}
    // width={400}
    height={170}
    viewBox="0 0 300 170"
    backgroundColor="#111827"
    foregroundColor="##1f2937"
    {...props}
>
    <rect x="112" y="5" rx="3" ry="3" width="88" height="13" /> 
    <rect x="9" y="101" rx="3" ry="3" width="82" height="15" /> 
    <circle cx="43" cy="37" r="37" /> 
    <rect x="112" y="56" rx="3" ry="3" width="223" height="7" /> 
    <rect x="139" y="100" rx="3" ry="3" width="82" height="15" /> 
    <rect x="112" y="40" rx="3" ry="3" width="223" height="7" /> 
    <rect x="112" y="25" rx="3" ry="3" width="223" height="7" />
    
  </ContentLoader>
)



export { Profile_Skel, Username_skell, Bio_skel, Cat_skel, Pff_skel, Post_skel, People_skel  };
