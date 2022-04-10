import {LinuxActions} from "../../types";
import TopBar from "../../Components/TopBar/TopBar";
import React from "react";
import Background from "../../Assets/Images/Kali-Desktop.jpg";
import Dock from "../../Components/Dock/Dock";

interface DesktopState {
  showApps: {
    [key: string]: boolean;
  };
  appsZ: {
    [key: string]: number;
  };
  maxApps: {
    [key: string]: boolean;
  };
  minApps: {
    [key: string]: boolean;
  };
  maxZ: number;
  showLaunchpad: boolean;
  currentTitle: string;
  hideDockAndTopbar: boolean;
  spotlight: boolean;
  spotlightBtnRef: any;
}

var divStyle = {
  filter: "brightness(100%)",
  backgroundImage: `url(${Background})`
};


export default function Desktop(props: LinuxActions, state: DesktopState) {

  state = {
    showApps: {},
    appsZ: {},
    maxApps: {},
    minApps: {},
    maxZ: 2,
    showLaunchpad: false,
    currentTitle: "Finder",
    hideDockAndTopbar: false,
    spotlight: false,
    spotlightBtnRef: null
  };

  return (
    <div className={"w-full h-full overflow-hidden bg-center bg-cover"} style={divStyle}>
      <TopBar hide={false} login={false} setLogin={props.setLogin}/>
      <Dock
        showApps={state.showApps}
        showLaunchpad={state.showLaunchpad}
        hide={state.hideDockAndTopbar}
      />
    </div>
  )
}