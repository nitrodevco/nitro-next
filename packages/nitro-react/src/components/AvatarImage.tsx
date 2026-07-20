import type { AvatarGenderType } from "@nitrodevco/nitro-api";
import { AvatarScaleType, AvatarSetType } from "@nitrodevco/nitro-api";
import { GetAvatarRenderManager } from "@nitrodevco/nitro-renderer";
import { forwardRef, useEffect, useRef, useState } from "react";

type AvatarImageProps = {
    figure: string;
    gender: AvatarGenderType;
    headOnly?: boolean;
    direction?: number;
}

export const AvatarImage = forwardRef<HTMLDivElement, AvatarImageProps>((props, ref) => {
    const { figure, gender, headOnly = false, direction = 0 } = props;
    const [randomValue, setRandomValue] = useState<number>(-1);
    const [imageData, setImageData] = useState<{ width: number, height: number, url: string }>({ width: 0, height: 0, url: '' });
    const disposed = useRef<boolean>(false);

    useEffect(() => {
        if (!figure) return;

        const avatarImage = GetAvatarRenderManager().createAvatarImage(figure, AvatarScaleType.Large, gender, {
            resetFigure: (figure: string) => {
                if (disposed.current) return;

                setRandomValue(Math.random());
            }
        }, {
            resetEffect: (effect: number) => {
                if (disposed.current) return;

                setRandomValue(Math.random());
            }
        });

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
                url: image.src
            });
        }

        void load();
    }, [figure, direction, randomValue]);

    useEffect(() => {
        return () => {
            disposed.current = true;
        }
    }, []);

    return (
        <div ref={ref} style={{
            width: imageData.width,
            height: imageData.height,
            backgroundImage: `url(${imageData.url})`,
            backgroundPosition: 'center -8px',
            backgroundRepeat: 'no-repeat',
            pointerEvents: 'none'
        }} />
    )
});