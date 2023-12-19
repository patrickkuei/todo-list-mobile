import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 9H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 10.52 3 11.08 3 12.2v5.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 21 5.08 21 6.2 21h11.587c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874c.218-.428.218-.988.218-2.108V12M6 15h.01M10 15h.01m1.509-2.105 1.315-.26c.71-.14 1.064-.21 1.395-.34.293-.114.572-.263.831-.443.291-.203.547-.459 1.058-.97l5.149-5.149a1.76 1.76 0 1 0-2.489-2.489l-5.236 5.237c-.48.479-.72.719-.913.99-.171.241-.316.5-.43.774-.13.307-.207.637-.362 1.297l-.318 1.353Z"
    />
  </Svg>
);
export default SvgComponent;
