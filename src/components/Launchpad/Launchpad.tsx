import {useState} from "react";

interface LaunchpadProps {
  show: boolean;
}

export default function Launchpad({show}: LaunchpadProps) {
  const [searchText, setSearchText] = useState("");
  const close = show
    ? ""
    : "opacity-0 invisible transition-opacity duration-200";
  return (
    <div
      className={`nightwind-prevent-block ${close} z-30 transform scale-110 w-full h-full fixed overflow-hidden bg-center bg-cover bg-green-300`}
      id="launchpad"

    >
      adsfasd
    </div>);
}