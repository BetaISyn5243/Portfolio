import React, {forwardRef, ReactNode, RefObject, useRef, useState} from "react";
import {IoMenu} from "react-icons/io5";
import {MdAccessibility, MdOutlinePowerSettingsNew} from "react-icons/md";
import moment from "moment/moment";
import {LinuxActions} from "../../types";
import {RiArrowDownSFill} from "react-icons/ri";
import {BsFillCameraReelsFill} from "react-icons/bs";
import {CgEthernet} from "react-icons/cg";
import {GiSpeaker} from "react-icons/gi";

interface TopBarItemProps {
  hide?: boolean;
  forceHover?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

const TopBarItem = forwardRef((props: TopBarItemProps, ref: any) => {
      const hide = props.hide ? "hidden sm:inline-flex" : "inline-flex";
      const hover = props.forceHover
        ? "bg-white bg-opacity-30"
        : "hover:bg-black hover:bg-opacity-25 rounded";
      return (
        <div

          className={`${hide} h-6 cursor-default flex-row space-x-1 ${hover} p-1 items-center`}
          onClick={props.onClick}
        >
          {props.children}

        </div>
      );
    }
  )
;

interface TopBarProps extends LinuxActions {
  hide: boolean;
  login: boolean;
}

interface TopBarState {
  date: Date;
  showControlCenter: boolean;
  showWifiMenu: boolean;
  showAppleMenu: boolean;
}

export default function TopBar(props: TopBarProps) {
  const powerButtonBtnRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLDivElement>(null);
  const langBtnRef = useRef<HTMLDivElement>(null);
  const accessibilityBtnRef = useRef<HTMLDivElement>(null);
  const cameraBtnRef = useRef<HTMLDivElement>(null);
  const calenderBtnRef = useRef<HTMLDivElement>(null);
  const networkBtnRef = useRef<HTMLDivElement>(null);
  const soundBtnRef = useRef<HTMLDivElement>(null);
  const applicationsBtnRef = useRef<HTMLDivElement>(null);
  const placesBtnRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<TopBarState>({
    date: new Date(),
    showControlCenter: false,
    showWifiMenu: false,
    showAppleMenu: false
  });

  const toggleControlCenter = (): void => {
    setState({
      ...state,
      showControlCenter: !state.showControlCenter
    });
  };

  const toggleAppleMenu = (): void => {
    setState({
      ...state,
      showAppleMenu: !state.showAppleMenu
    });
  };

  const toggleWifiMenu = (): void => {
    setState({
      ...state,
      showWifiMenu: !state.showWifiMenu
    });
  };
  const hideLogin = !props.login ? "hidden sm:inline-flex" : "inline-flex";

  return (
    <div
      className={`flex-1 nightwind-prevent w-full h-6 px-2 fixed top-0 flex flex-row justify-between items-center z-20 text-sm text-white bg-black ${props.login ? "bg-opacity-50" : "bg-opacity-100"} backdrop-blur-2xl shadow transition`}
    >
      <div className={`flex flex-row items-center space-x-4 cursor-default`}>{props.login ? "kali" : <div>
        <TopBarItem ref={applicationsBtnRef}>Applications <RiArrowDownSFill/></TopBarItem><TopBarItem
        ref={placesBtnRef}>Places <RiArrowDownSFill/></TopBarItem>
      </div>}</div>
      {props.login ? "" : <div className={`flex flex-row justify-center`}>{moment().format("ddd h:mm")}</div>}
      <div className="flex flex-row justify-end items-center space-x-2">
        <TopBarItem forceHover={false} ref={props.login ? menuBtnRef : cameraBtnRef}>
          {props.login ? <IoMenu size={16}/> : <BsFillCameraReelsFill/>}
        </TopBarItem>
        {props.login ? <TopBarItem forceHover={false} ref={langBtnRef}>
          en_IN.utf8
        </TopBarItem> : ""}
        <TopBarItem forceHover={false} ref={props.login ? accessibilityBtnRef : networkBtnRef}>
          {props.login ? <MdAccessibility size={18}/> : <CgEthernet/>}
        </TopBarItem>
        {props.login ? <TopBarItem forceHover={false} ref={calenderBtnRef}>
          {moment().format("DD MMM, h:mm")}
        </TopBarItem> : <TopBarItem forceHover={false} ref={soundBtnRef}><GiSpeaker size={20}/></TopBarItem>}
        <TopBarItem forceHover={false} ref={powerButtonBtnRef}>
          <MdOutlinePowerSettingsNew size={18}/>
          {props.login ? "" : <RiArrowDownSFill/>}
        </TopBarItem>
      </div>
    </div>
  );
}
