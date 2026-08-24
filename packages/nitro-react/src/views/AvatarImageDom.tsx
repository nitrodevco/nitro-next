import { AvatarGenderType, AvatarScaleType, AvatarSetType } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager } from '@nitrodevco/nitro-renderer';
import { useEffect, useRef, useState } from 'react';

import { ThemeImage } from '#base/theme';

type AvatarImageDomProps = {
    figure: string;
    gender: AvatarGenderType;
    headOnly?: boolean;
    direction?: number;
    scale?: number;
};

export const AvatarImageDom = (props: AvatarImageDomProps) => {
    const { figure, gender, headOnly = false, direction = 0, scale = 1 } = props;
    const [ randomValue, setRandomValue ] = useState<number>(-1);
    const [ imageData, setImageData ] = useState<{
        width: number;
        height: number;
        url: string;
    }>({ width: 0, height: 0, url: '' });
    const disposed = useRef<boolean>(false);

    useEffect(() => {
        if (!figure) return;

        const avatarImage = GetAvatarRenderManager().createAvatarImage(
            figure,
            AvatarScaleType.Large,
            gender,
            { resetFigure: () => { if (!disposed.current) setRandomValue(Math.random()); } },
            { resetEffect: () => { if (!disposed.current) setRandomValue(Math.random()); } },
        );

        if (!avatarImage) return;

        let setType = AvatarSetType.Full;

        if (headOnly) setType = AvatarSetType.Head;

        avatarImage?.setDirection(setType, direction);

        const load = async () => {
            const image = await avatarImage.getCroppedImageAsync(setType, false, 1);

            if (!image) return;

            setImageData({
                width: image.width,
                height: image.height,
                url: image.src,
            });
        };

        void load();
    }, [ figure, direction, randomValue ]);

    useEffect(() => {
        return () => {
            disposed.current = true;
        };
    }, []);

    return (
        <ThemeImage
            src={imageData.url}
            width={imageData.width}
            height={imageData.height}
        />
    );
};
