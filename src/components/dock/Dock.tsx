import { useMotionValue } from "framer-motion";
import {useSelector} from "react-redux";
import {RootReduxState} from "../../types";
import DockItem from "./DockItem";
import apps from "../../Config/apps";

interface DockProps {
  showApps: {
    [key: string]: boolean;
  };
  showLaunchpad: boolean;
  hide: boolean;
}
export default function Dock({showApps,hide}:DockProps){
  const { dockSize, dockMag } = useSelector((state: RootReduxState) => ({
    dockSize: state.dockSize,
    dockMag: state.dockMag
  }));
  const mouseX = useMotionValue<number | null>(null);
  return (
    <div
      className={`justify-center content-center bg-center items-center grid grid-col object-center justify-items-center justify-self-center dock w-16  fixed left-0 right-0 bottom-0 h-full ${
        hide ? "z-0" : "z-50"
      } overflow-y-scroll sm:overflow-y-visible`}
    >
      <ul
        className="my-auto h-auto  px-2 space-h-2 flex flex-col justify-center justify-between bg-white bg-opacity-25 border-t border-l border-b border-r border-gray-400 border-opacity-30 backdrop-blur-2xl rounded "
        onMouseMove={(e) => mouseX.set(e.nativeEvent.x)}
        onMouseLeave={() => mouseX.set(null)}
        style={{
          width : `${(dockSize as number) + 15}px`
        }}
      >
        {apps.map((app) => (
          <DockItem
            key={`dock-${app.id}`}
            id={app.id}
            title={app.title}
            img={app.img}
            mouseX={mouseX}
            desktop={app.desktop}
            isOpen={app.desktop && showApps[app.id]}
            link={app.link}
            dockSize={dockSize as number}
            dockMag={dockMag as number}
          />
        ))}
      </ul>
    </div>
  );
}