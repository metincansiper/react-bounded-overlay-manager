import { useEffect } from 'react';

type Props = {
    handleResize: () => void;
};

const useWindowResize = ({ handleResize }: Props) => {
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);
};

export default useWindowResize;
