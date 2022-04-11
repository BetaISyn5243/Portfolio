import React from "react";

export interface LinuxActions {
  setLogin: (value: boolean | ((preVar: boolean) => boolean)) => void;
  shutLinux: (e: React.MouseEvent) => void;
  restartLinux: (e: React.MouseEvent) => void;
  sleepLinux: (e: React.MouseEvent) => void;
}
export interface RootReduxState {
  dark: boolean;
  volume: number;
  brightness: number;
  wifi: boolean;
  bluetooth: boolean;
  airdrop: boolean;
  fullscreen: boolean;
  dockSize: number;
  dockMag: number;
}
export {
  AppsData,
  BearMdData,
  BearData,
  LaunchpadData,
  MusicData,
  TerminalData,
  UserData,
  WallpaperData,
  WebsitesData,
  SiteSectionData,
  SiteData
} from "./configs";
