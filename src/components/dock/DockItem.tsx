import {useRef, useState} from "react";
import {useWindowSize} from "../../hooks";

// Hover effect is adopted from https://github.com/PuruVJ/macos-web/blob/main/src/components/dock/DockItem.tsx
interface DockItemProps {
  id: string;
  title: string;
  imgSource?: string;
  imgElement?: JSX.Element;
  desktop: boolean;
  openApp: (id: string) => void;
  isOpen: boolean;
  link?: string;

}

export default function DockItem({
                                   id,
                                   title,
                                   imgSource,
                                   imgElement,
                                   desktop,
                                   openApp,
                                   isOpen,
                                   link,
                                 }: DockItemProps) {
  const [showTitle, setShowTitle] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);
  return (
    <li
      id={`dock-${id}`}
      onClick={desktop || id === "launchpad" ? () => openApp(id) : () => {console.log("deneme")}}
      className="flex flex-col items-center justify-end mb-1 transition duration-150 ease-in origin-bottom"
      onMouseEnter={() => setShowTitle(true)}
      onMouseLeave={() => setShowTitle(false)}

    >
      {showTitle ? <p className="tooltip text-black text-sm ml-32 mb-3 absolute  px-1 py-1 bg-gray-300 bg-opacity-80 rounded-md">
        {title}
      </p> : ""}

      {
        link ?
          (
            <a href={link} target="_blank" rel="noreferrer">
              {imgSource ?
                <img className="h-12" ref={imgRef} src={imgSource} alt={title} draggable={false}/> : imgElement
              }
            </a>
          )
          : (
            imgSource ?
              <img className="h-12" ref={imgRef} src={imgSource} alt={title} draggable={false}/> : imgElement
          )
      }



      <div
        className={`h-1 w-1 m-0 rounded-full bg-gray-800 ${
          isOpen ? "" : "invisible"
        }`}
      />
    </li>
  );
}
