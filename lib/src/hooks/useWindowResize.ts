import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type Options = {
    handleResize: () => void;
};

const useWindowResize = ({ handleResize }: Options) => {
    const debouncedHandleResize = useDebouncedCallback(handleResize, 1);
    useEffect(() => {
        window.addEventListener('resize', debouncedHandleResize);

        return () => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
    }, [debouncedHandleResize]);
};

export default useWindowResize;
