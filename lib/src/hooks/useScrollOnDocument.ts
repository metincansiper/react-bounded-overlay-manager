import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

type Options = {
    handleScroll: () => void;
};

const useScrollOnDocument = ({ handleScroll }: Options) => {
    const debouncedHandleScroll = useDebouncedCallback(handleScroll, 1);
    useEffect(() => {
        document.addEventListener('scroll', debouncedHandleScroll);

        return () => {
            document.removeEventListener('scroll', debouncedHandleScroll);
        };
    }, [debouncedHandleScroll]);
};

export default useScrollOnDocument;
