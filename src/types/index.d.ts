import React from "react";

export interface LinuxActions {
  setLogin: (value: boolean | ((preVar: boolean) => boolean)) => void;
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