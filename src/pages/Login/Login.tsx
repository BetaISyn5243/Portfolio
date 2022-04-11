import React, {useState} from "react";
import Background from '../../Assets/Images/Kali-Login.png';
import TopBar from "../../Components/TopBar/TopBar";
import {SiKalilinux} from "react-icons/si";
import {LinuxActions} from "../../types";

var divStyle = {
  filter: "brightness(100%)",
  backgroundImage: `url(${Background})`
};


export default function Login(props: LinuxActions) {
  const [password, setPassword] = useState("");
  const [sign, setSign] = useState("Click to enter");
  const loginHandle = () => {
    props.setLogin(true);
  };
  return (
    <div className={"w-full h-full overflow-hidden bg-center bg-cover"} style={divStyle}>
      <TopBar hide={false}
              setLogin={()=>props.setLogin}
              login={true}
              shutLinux={props.shutLinux}
              sleepLinux={props.sleepLinux}
              restartLinux={props.restartLinux}
      />

      <div
        className="nightwind-prevent w-full h-full  relative top-0 flex flex-col justify-center  items-center text-sm text-white"
        onClick={() => loginHandle()}>
        <div>
          <div className={"flex-row flex justify-around bg-black bg-opacity-75 rounded shadow-2xl p-2 w-auto"}>
            <SiKalilinux size={100} className={"  my-auto resize"}/>
            <div>
              <div
                className="nightwind-prevent mx-auto grid grid-cols-4 w-44 h-8 mt-4 rounded-md bg-black backdrop-blur-2xl bg-opacity-50 resize">
                <input
                  className="nightwind-prevent text-sm col-start-1 col-span-4 outline-none focus:outline-none bg-transparent px-2 text-white "
                  type="email"
                  placeholder="Enter Username"
                  onClick={(e) => e.stopPropagation()}
                />

              </div>
              <div
                className="nightwind-prevent mx-auto grid grid-cols-4 w-44 h-8 mt-4 rounded-md bg-black backdrop-blur-2xl bg-opacity-50">
                <input
                  className="nightwind-prevent text-sm col-start-1 col-span-4 outline-none focus:outline-none bg-transparent px-2 text-white"
                  type="password"
                  placeholder="Enter Password"
                  onClick={(e) => e.stopPropagation()}
                />

              </div>
            </div>
          </div>
          <div className="flex-row flex justify-around bg-black bg-opacity-100 rounded -mt-1 shadow-2xl p-2 ">
            <div
              className={"my-auto rounded bg-opacity-25 bg-gray-500 w-1/5 h-8 content-center justify-center flex grid  cursor-pointer"}>Cancel
            </div>
            <div
              className={"my-auto rounded  bg-blue-700 w-1/5 h-8 content-center justify-center flex grid  cursor-pointer"}
              onClick={() => loginHandle()}>Log In
            </div>
          </div>
        </div>

      </div>
    </div>

  )
}