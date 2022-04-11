import {LinuxActions} from "../../types";
import TopBar from "../../Components/TopBar/TopBar";
import React, {Component} from "react";
import Background from "../../Assets/Images/Kali-Desktop.jpg";
import Dock from "../../Components/Dock/Dock";
import apps from "../../Config/apps";
import Window from "../../Components/Window/Window";
import {connect} from "react-redux";
import Spotlight from "../../Components/Spotlight/Spotlight";
import Launchpad from "../../Components/Launchpad/Launchpad";

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

type DesktopRedux = {
  dark?: boolean;
  brightness?: number;
};
type DesktopProps = DesktopRedux & LinuxActions;

var divStyle = {
  filter: "brightness(100%)",
  backgroundImage: `url(${Background})`
};
let style1 = {
  top: "minMarginY",
  flex:30
};

class Desktop extends Component<DesktopProps, DesktopState> {
  constructor(props: DesktopProps) {
    super(props);
    this.state = {
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
  }

  componentDidMount() {
    this.getAppsData();
  }

  getAppsData = (): void => {
    let showApps = {},
      appsZ = {},
      maxApps = {},
      minApps = {};

    apps.forEach((app) => {
      showApps = {
        ...showApps,
        [app.id]: app.show
      };
      appsZ = {
        ...appsZ,
        [app.id]: 2
      };
      maxApps = {
        ...maxApps,
        [app.id]: false
      };
      minApps = {
        ...minApps,
        [app.id]: false
      };
    });

    this.setState({showApps});
  };
  toggleLaunchpad = (target: boolean): void => {
    const r = document.querySelector(`#launchpad`) as HTMLElement;
    if (target) {
      r.style.transform = "scale(1)";
      r.style.transition = "ease-in 0.2s";
    } else {
      r.style.transform = "scale(1.1)";
      r.style.transition = "ease-out 0.2s";
    }

    this.setState({showLaunchpad: target});
  };

  toggleSpotlight = (): void => {
    this.setState({spotlight: !this.state.spotlight});
  };

  setWinowsPosition = (id: string): void => {
    const r = document.querySelector(`#window-${id}`) as HTMLElement;
    const rect = r.getBoundingClientRect();
    r.style.setProperty(
      "--window-transform-x",
      // "+ window.innerWidth" because of the boundary for windows
      (window.innerWidth + rect.x).toFixed(1).toString() + "px"
    );
    r.style.setProperty(
      "--window-transform-y",
      // "- minMarginY" because of the boundary for windows
      (rect.y).toFixed(1).toString() + "px"
    );
  };

  closeApp = (id: string): void => {
    this.setAppMax(id, false);
    const showApps = this.state.showApps;
    showApps[id] = false;
    this.setState({
      showApps: showApps,
      hideDockAndTopbar: false
    });
  };

  openApp = (id: string): void => {
    // add it to the shown app list
    const showApps = this.state.showApps;
    showApps[id] = true;

    // move to the top (use a maximum z-index)
    const appsZ = this.state.appsZ;
    const maxZ = this.state.maxZ + 1;
    appsZ[id] = maxZ;

    // get the title of the currently opened app
    const currentApp = apps.find((app) => {
      return app.id === id;
    });
    if (currentApp === undefined) {
      throw new TypeError(`App ${id} is undefined.`);
    }

    this.setState({
      showApps: showApps,
      appsZ: appsZ,
      maxZ: maxZ,
      currentTitle: currentApp.title
    });
    const minApps = this.state.minApps;
    // if the app has already been shown but minimized
    if (minApps[id]) {
      // move to window's last position
      const r = document.querySelector(`#window-${id}`) as HTMLElement;
      r.style.transform = `translate(${r.style.getPropertyValue(
        "--window-transform-x"
      )}, ${r.style.getPropertyValue("--window-transform-y")}) scale(1)`;
      r.style.transition = "ease-in 0.3s";
      // remove it from the minimized app list
      minApps[id] = false;
      this.setState({minApps});
    }
  };

  setAppMax = (id: string, target?: boolean): void => {
    const maxApps = this.state.maxApps;
    if (target === undefined) target = !maxApps[id];
    maxApps[id] = target;
    this.setState({
      maxApps: maxApps,
      hideDockAndTopbar: target
    });
  };

  setAppMin = (id: string, target?: boolean): void => {
    const minApps = this.state.minApps;
    if (target === undefined) target = !minApps[id];
    minApps[id] = target;
    this.setState({
      minApps: minApps
    });
  };

  minimizeApp = (id: string): void => {
    this.setWinowsPosition(id);

    // get the corrosponding dock icon's position
    let r = document.querySelector(`#dock-${id}`) as HTMLElement;
    const dockAppRect = r.getBoundingClientRect();

    r = document.querySelector(`#window-${id}`) as HTMLElement;
    // const appRect = r.getBoundingClientRect();
    const posY = window.innerHeight - r.offsetHeight / 2;
    // "+ window.innerWidth" because of the boundary for windows
    const posX = window.innerWidth + dockAppRect.x - r.offsetWidth / 2 + 25;

    // translate the window to that position
    r.style.transform = `translate(${posX}px, ${posY}px) scale(0.2)`;
    r.style.transition = "ease-out 0.3s";

    // add it to the minimized app list
    this.setAppMin(id, true);
  };
  renderAppWindows = () => {
    return apps.map((app) => {
      if (app.desktop && this.state.showApps[app.id]) {
        const props = {
          title: app.title,
          id: app.id,
          width: app.width,
          height: app.height,
          minWidth: app.minWidth,
          minHeight: app.minHeight,
          z: this.state.appsZ[app.id],
          max: this.state.maxApps[app.id],
          min: this.state.minApps[app.id],
          close: this.closeApp,
          setMax: this.setAppMax,
          setMin: this.minimizeApp,
          focus: this.openApp
        };

        return (
          <Window key={`desktop-app-${app.id}`} {...props}>
            {app.content}
          </Window>
        );
      } else {
        return <div key={`desktop-app-${app.id}`}/>;
      }
    });
  };

  render() {
    return (
      <div className={"w-full h-full flex flex-col overflow-hidden bg-center bg-cover"} style={divStyle}>
        <div className={"flex flex-1 h-auto"}>
          <TopBar hide={false} login={false}
                     setLogin={this.props.setLogin}
                     shutLinux={this.props.shutLinux}
                     sleepLinux={this.props.sleepLinux}
                     restartLinux={this.props.restartLinux}/>
        </div>
        <div className="window-bound w-16 align-middle h-auto w-full flex flex-1 flex-row" style={style1}>
          <Dock
            open={this.openApp}
            showApps={this.state.showApps}
            showLaunchpad={this.state.showLaunchpad}
            toggleLaunchpad={this.toggleLaunchpad}
            hide={this.state.hideDockAndTopbar}
          />
          <Launchpad
            show={this.state.showLaunchpad}
            toggleLaunchpad={this.toggleLaunchpad}
          />
          {this.renderAppWindows()}

        </div>
        {this.state.spotlight && (
          <Spotlight
            openApp={this.openApp}
            toggleLaunchpad={this.toggleLaunchpad}
            toggleSpotlight={this.toggleSpotlight}
            btnRef={this.state.spotlightBtnRef}
          />
        )}

      </div>
    )
  }
}

const mapStateToProps = (state: DesktopRedux): DesktopRedux => {
  return {
    dark: state.dark,
    brightness: state.brightness
  };
};

export default connect(mapStateToProps, null)(Desktop);
