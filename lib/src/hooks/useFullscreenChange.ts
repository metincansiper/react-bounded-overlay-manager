import { useEffect } from "react";

type Options = {
    handleFullscreenChange: () => void;
}

const useFullscreenChange = ({ handleFullscreenChange }: Options) => {
    useEffect(() => {
        const events = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"];
        events.forEach(event => {
            document.addEventListener(event, handleFullscreenChange);
        });

        return () => {
            events.forEach(event => {
                document.removeEventListener(event, handleFullscreenChange);
            });
        }
    }, [handleFullscreenChange]);
};

export default useFullscreenChange;