import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Union(props) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 42 48" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 0C9.402 0 0 9.402 0 21c0 9.026 5.694 16.721 13.686 19.691l6.607 6.603a1 1 0 001.414 0l6.607-6.603C36.306 37.721 42 30.026 42 21 42 9.402 32.598 0 21 0z"
        fill="#fff"
      />
    </Svg>
  );
}

const MemoUnion = React.memo(Union);
export default MemoUnion;
