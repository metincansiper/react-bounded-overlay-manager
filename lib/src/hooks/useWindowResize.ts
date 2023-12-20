import { useEffect } from 'react';

// TODO: use debounce?

type Options = {
    handleResize: () => void;
};

const useWindowResize = ({ handleResize }: Options) => {
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);
};

export default useWindowResize;
