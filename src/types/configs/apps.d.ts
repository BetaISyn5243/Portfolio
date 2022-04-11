export interface AppsData {
  id: string;
  title: string;
  desktop: boolean;
  imgElement?: JSX.Element;
  imgSource?: String;
  show?: boolean;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  content?: JSX.Element;
  link?: string;
}
