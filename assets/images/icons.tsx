import Svg, { SvgProps, Path, Rect } from 'react-native-svg';

export const PhotoIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <Path
      fillRule="evenodd"
      d="M6 5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm3.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-2.022 4.735 1.598-2.557a.5.5 0 0 1 .848 0l1.305 2.088 2.09-3.537a.5.5 0 0 1 .861 0l2.374 4.017a.5.5 0 0 1-.43.754h-4.748a.508.508 0 0 1-.139-.02.508.508 0 0 1-.14.02H7.903a.5.5 0 0 1-.424-.765z"
      clipRule="evenodd"
    />
  </Svg>
);


export const PadlockIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <Rect width={14} height={10} x={5} y={11.225} rx={2} />
    <Path
      fillRule="evenodd"
      d="M10 5.75a.75.75 0 0 0-.75.75V12a.75.75 0 0 1-1.5 0V6.5A2.25 2.25 0 0 1 10 4.25h4a2.25 2.25 0 0 1 2.25 2.25v2.522a.75.75 0 0 1-1.5 0V6.5a.75.75 0 0 0-.75-.75h-4z"
      clipRule="evenodd"
    />
  </Svg>
)
