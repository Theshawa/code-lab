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
