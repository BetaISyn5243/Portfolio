import type { AppsData } from "../types";
import {GrFirefox} from "react-icons/gr";
import {BsFolderFill,BsFillTerminalFill} from "react-icons/bs";
import Bear from "../Components/apps/Bear";

let firefoxStyle={
  backgroundColor:"rgb(240, 157, 102)",
  color:"rgb(255, 255, 255)",
  borderRadius:5,
  padding:5
}
let folderStyle={
  color:"rgb(128, 168, 213)",
  borderRadius:5,
  padding:5
}
let terminalStyle={
  color:"rgb(23, 28, 32)",
  borderRadius:5,
  padding:5
}
const apps: AppsData[] = [
  {
    id: "launchpad",
    title: "Launchpad",
    desktop: false,
    imgSource: "img/icons/launchpad.png"
  },

  {
    id: "bear",
    title: "Bear",
    desktop: true,
    show: true,
    width: 860,
    height: 500,
    imgElement: <GrFirefox/>,
    content: <Bear/>
  },
  {
    id: "firefox",
    title: "Firefox",
    desktop: true,
    show: false,
    width: 1024,
    minWidth: 375,
    minHeight: 200,
    imgElement: <GrFirefox size={40} style={firefoxStyle}/>,
    content: <div>Firefox</div>
  },
  {
    id: "vscode",
    title: "VSCode",
    desktop: true,
    show: false,
    imgSource: "img/icons/vscode.png",
    content: <div>VsCode</div>
  },
  {
    id: "folder",
    title: "Folder",
    desktop: true,
    show: false,
    imgElement: <BsFolderFill size={45} style={folderStyle}/>,
    height: 530,
    content: <div>Folder</div>
  },
  {
    id: "terminal",
    title: "Terminal",
    desktop: true,
    show: false,
    imgElement: <BsFillTerminalFill size={45} style={terminalStyle}/>,
    content: <div>Terminal</div>
  },
  {
    id: "email",
    title: "Mail",
    desktop: false,
    imgSource: "img/icons/mail.png",
    link: "mailto:renovamenzxh@gmail.com"
  },
  {
    id: "github",
    title: "Github",
    desktop: false,
    imgSource: "img/icons/github.png",
    link: "https://github.com/Renovamen/playground-macos"
  }
];

export default apps;
