import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={props.width || '800px'}
      height={props.height || '800px'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        stroke={props.color || '#000'}
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.905 13.475c.035-.176.053-.265.085-.347a.997.997 0 01.111-.207c.05-.073.114-.136.242-.264L13.5 8.5a1.414 1.414 0 012 2l-4.157 4.157a2.098 2.098 0 01-.264.242.994.994 0 01-.207.11c-.082.033-.17.05-.347.086L8.5 15.5l.405-2.025z"
        stroke={props.color || '#000'}
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
