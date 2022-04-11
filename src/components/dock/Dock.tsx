import { useSelector } from "react-redux";
import { useMotionValue } from "framer-motion";
import apps from "../../Config/apps";
import DockItem from "./DockItem";
import type { RootReduxState } from "../../types";

interface DockProps {
  open: (id: string) => void;
  showApps: {
    [key: string]: boolean;
  };
  showLaunchpad: boolean;
  toggleLaunchpad: (target: boolean) => void;
  hide: boolean;
}

export default function Dock({
                               open,
                               showApps,
                               showLaunchpad,
                               toggleLaunchpad,
                               hide
                             }: DockProps) {
  const { dockSize, dockMag } = useSelector((state: RootReduxState) => ({
    dockSize: state.dockSize,
    dockMag: state.dockMag
  }));

  const openApp = (id: string) => {
    if (id === "launchpad") toggleLaunchpad(!showLaunchpad);
    else {
      toggleLaunchpad(false);
      open(id);
    }
  };

  const mouseX = useMotionValue<number | null>(null);

  return (
    <div
      className={`dock h-auto w-auto sm:h-max overflow-visible over relative grid my-auto overflow-x-visible  ${
        hide ? "z-0" : "z-50"
      } overflow-x-scroll sm:overflow-x-visible`}
    >
      <ul
        className=" h-auto py-2 space-y-2 flex flex-col justify-center justify-between bg-white bg-opacity-25 border-t border-b border-r border-gray-400 border-opacity-30 backdrop-blur-2xl rounded-"
        onMouseMove={(e) => mouseX.set(e.nativeEvent.x)}
        onMouseLeave={() => mouseX.set(null)}
        style={{
          width: `${(dockSize as number) + 15}px`
        }}
      >
        {apps.map((app) => (
          <DockItem
            key={`dock-${app.id}`}
            id={app.id}
            title={app.title}
            imgSource={app.imgSource?app.imgSource.toString():app.imgSource}
            imgElement={app.imgElement}
            desktop={app.desktop}
            openApp={openApp}
            isOpen={app.desktop && showApps[app.id]}
            link={app.link}
          />
        ))}
      </ul>
    </div>
  );
}
