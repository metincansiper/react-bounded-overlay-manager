import { useEffect } from "react";

type Options = {
    handleFullscreenChange: () => void;
}

const useFullscreenChange = ({ handleFullscreenChange }: Options) => {
    const fullScreenChange = () => {
        handleFullscreenChange();
    };

    useEffect(() => {
        const events = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"];
        events.forEach(event => {
            document.addEventListener(event, fullScreenChange);
        });

        return () => {
            events.forEach(event => {
                document.removeEventListener(event, fullScreenChange);
            });
        }
    }, []);
};

export default useFullscreenChange;