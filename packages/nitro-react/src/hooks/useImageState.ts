import { useEffect, useRef, useState } from 'react';

export type ImageState = {
    width: number;
    height: number;
    url: string;
};

const EMPTY_IMAGE_STATE: ImageState = { width: 0, height: 0, url: '' };

export const useImageState = () => {
    const [imageState, setImageState] = useState<ImageState>(EMPTY_IMAGE_STATE);
    const disposed = useRef<boolean>(false);

    useEffect(() => {
        disposed.current = false;

        return () => {
            disposed.current = true;
        };
    }, []);

    return { imageState, setImageState, disposed };
};
