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


export const CopyIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <Rect width={10} height={14} x={6} y={6} rx={1.5} />
    <Path d="M8.064 5.064A1.5 1.5 0 0 1 8.5 5h7A1.5 1.5 0 0 1 17 6.5v11a1.5 1.5 0 0 1-.064.436A1.5 1.5 0 0 0 18 16.5v-11A1.5 1.5 0 0 0 16.5 4h-7a1.5 1.5 0 0 0-1.436 1.064z" />
  </Svg>
)

export const XIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M5.47 5.47a.75.75 0 0 1 1.06 0l12 12a.75.75 0 1 1-1.06 1.06l-12-12a.75.75 0 0 1 0-1.06z"
      clipRule="evenodd"
    />
    <Path
      fillRule="evenodd"
      d="M18.53 5.47a.75.75 0 0 1 0 1.06l-12 12a.75.75 0 0 1-1.06-1.06l12-12a.75.75 0 0 1 1.06 0z"
      clipRule="evenodd"
    />
  </Svg>
)

export const CheckIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M18.381 5.354a.75.75 0 0 1 .265 1.027l-7.087 12a.75.75 0 0 1-1.164.16L5.48 13.838a.75.75 0 0 1 1.038-1.084l4.23 4.051L17.353 5.62a.75.75 0 0 1 1.027-.265z"
      clipRule="evenodd"
    />
  </Svg>
)