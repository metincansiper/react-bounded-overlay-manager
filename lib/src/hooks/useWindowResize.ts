import { useEffect } from 'react';
import { useDebounceCallback } from '@react-hook/debounce';

type Options = {
    handleResize: () => void;
};

const useWindowResize = ({ handleResize }: Options) => {
    const debouncedHandleResize = useDebounceCallback(handleResize, 100);
    useEffect(() => {
        window.addEventListener('resize', debouncedHandleResize);

        return () => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
    }, [debouncedHandleResize]);
};

export default useWindowResize;
