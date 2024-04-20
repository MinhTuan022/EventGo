import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

function Statistics(props) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 146 146" {...props}>
      <Path fill="none" d="M.5.5h145v145H.5z" />
      <Circle cx={23.35} cy={69.53} r={4.8} fill="#a8cbeb" />
      <Circle cx={109.75} cy={34.33} r={4.8} fill="#a8cbeb" />
      <Circle cx={80.95} cy={58.33} r={4.8} fill="#a8cbeb" />
      <Path
        d="M48 49.61a4.67 4.67 0 01-.7-2.48 4.81 4.81 0 11.7 2.48z"
        fill="#a8cbeb"
      />
      <Path
        d="M118.55 53.53v52.8h-17.6v-52.8a3.2 3.2 0 013.2-3.2h11.2a3.2 3.2 0 013.2 3.2z"
        fill="#ea9080"
      />
      <Path
        d="M60.95 66.33v40h-17.6v-40a3.2 3.2 0 013.2-3.2h11.2a3.2 3.2 0 013.2 3.2z"
        fill="#7bd489"
      />
      <Path
        d="M14.55 106.33v-17.6a3.2 3.2 0 013.2-3.2h11.2a3.2 3.2 0 013.2 3.2v17.6"
        fill="none"
        stroke="#515f76"
        strokeMiterlimit={10}
        strokeWidth={2.4}
      />
      <Path
        d="M72.15 106.33v-28.8a3.2 3.2 0 013.2-3.2h11.2a3.2 3.2 0 013.2 3.2v28.8"
        fill="#fff"
        stroke="#515f76"
        strokeMiterlimit={10}
        strokeWidth={2.4}
      />
      <Path
        d="M56.95 47.13A4.8 4.8 0 0148 49.61a4.67 4.67 0 01-.7-2.48 4.8 4.8 0 119.65 0z"
        fill="none"
        stroke="#515f76"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={2.4}
      />
      <Circle
        cx={109.75}
        cy={34.33}
        r={4.8}
        fill="none"
        stroke="#515f76"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={2.4}
      />
      <Circle
        cx={80.95}
        cy={58.33}
        r={4.8}
        fill="none"
        stroke="#515f76"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={2.4}
      />
      <Circle
        cx={23.35}
        cy={69.53}
        r={4.8}
        fill="none"
        stroke="#515f76"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={2.4}
      />
      <Path
        fill="none"
        stroke="#515f76"
        strokeMiterlimit={10}
        strokeWidth={2.4}
        d="M27.5 66.33L48.04 49.6l.11-.08M56.95 48.73l19.2 7.86M85.19 55.79l20.49-17.95"
      />
      <Path
        d="M115.35 50.4h-11.2a3.54 3.54 0 00-3.53 3.53v52.39l2.4.07.36-49.39a2.4 2.4 0 012-2.36l13-1.12a3 3 0 00-3.03-3.12z"
        fill="#eeb8a9"
        opacity={0.8}
      />
      <Path
        d="M100.95 106.33v-52.8a3.2 3.2 0 013.2-3.2h11.2a3.2 3.2 0 013.2 3.2v52.8"
        fill="none"
        stroke="#515f76"
        strokeMiterlimit={10}
        strokeWidth={2.4}
      />
      <Path
        d="M57.75 63.2h-11.2A3.41 3.41 0 0043 66.29v40.11h2.43V70.46a2.4 2.4 0 012.39-2.4l13-1.7a3.19 3.19 0 00-3.07-3.16z"
        fill="#a4e0b3"
        opacity={0.8}
      />
      <Path
        d="M43.35 106.33v-40a3.2 3.2 0 013.2-3.2h11.2a3.2 3.2 0 013.2 3.2v40"
        fill="none"
        stroke="#515f76"
        strokeMiterlimit={10}
        strokeWidth={2.4}
      />
      <Path
        fill="none"
        stroke="#b8b9ba"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={1.6}
        d="M2.75 113.67l3.2 3.2M5.95 113.67l-3.2 3.2"
      />
      <Circle cx={121.15} cy={115.27} r={1.6} fill="#b8b9ba" />
      <Circle
        cx={8.75}
        cy={69.27}
        r={2}
        fill="none"
        stroke="#b8b9ba"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={1.6}
      />
      <Circle cx={13.95} cy={60.07} r={1.6} fill="#b8b9ba" />
      <Path
        d="M140.05 99.36l2.33-1.22a.08.08 0 01.12.08l-.44 2.59 2 1.95-2.76.4-1.24 2.5-1.24-2.5-2.6-.38a.08.08 0 010-.14l1.88-1.84-.47-2.75z"
        fill="#a8cbeb"
      />
      <Circle cx={134.75} cy={89.67} r={1.6} fill="#b8b9ba" />
      <Circle
        cx={133.55}
        cy={114.87}
        r={2}
        fill="none"
        stroke="#b8b9ba"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={1.6}
      />
      <Path
        fill="none"
        stroke="#515f76"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={2.4}
        d="M8.15 106.33h118.4"
      />
    </Svg>
  );
}

const MemoStatistics = React.memo(Statistics);
export default MemoStatistics;
