import { CodePage } from "../components/CodePage";
import useBlurPanel from "./useBlurPanel";

export const BlurPanel = () => {
  const { panel, trigger, setShowing, showing } = useBlurPanel<
    HTMLDivElement,
    HTMLButtonElement
  >();
  return (
    <>
      <CodePage
        code={`

// useBlurPanel.ts

import { useState, useRef, useEffect } from "react";

function useBlurPanel<
  PanelType extends HTMLElement,
  TriggerType extends HTMLElement
>() {
  const [showing, setShowing] = useState(false);

  const panel = useRef<PanelType>(null);
  const trigger = useRef<TriggerType>(null);

  useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      const isPanel = panel.current && panel.current.contains(e.target as Node);
      const isTrigger =
        trigger.current && trigger.current.contains(e.target as Node);

      if (!isPanel && !isTrigger) {
        setShowing(false);
      }
    };

    document.addEventListener("click", handleDocClick);

    return () => {
      document.removeEventListener("click", handleDocClick);
    };
  }, []);

  return { panel, trigger, showing, setShowing };
}

export default useBlurPanel;    


// Usage

const { panel, trigger, setShowing, showing } = useBlurPanel<HTMLDivElement,HTMLButtonElement>();

        
        `}
        title="React Blur Panel"
        githubLink="https://github.com/Theshawa/code-lab/tree/main/src/BlurPanel"
        technologies={["React", "TypeScript"]}
      >
        <div className="relative w-max pt-[100px] mb-[100px] mx-auto max-w-full">
          <button
            ref={trigger}
            onClick={() => {
              setShowing(!showing);
            }}
            className="px-[20px] py-[10px] bg-blue text-white shadow-lg rounded-[4px] font-medium"
          >
            Click Me
          </button>
          {showing ? (
            <div
              ref={panel}
              className="absolute min-w-[300px] p-[20px] text-center max-w-[calc(100vw-40px)] h-[200px] flex flex-col items-center justify-center bg-white shadow-2xl rounded-[20px] left-0 top-full mt-[10px] z-10"
            >
              Click button or anywhere else to hide this panel
            </div>
          ) : (
            ""
          )}
        </div>
      </CodePage>
    </>
  );
};
