import type { AvatarGenderType } from "@nitrodevco/nitro-api";
import { AvatarScaleType, AvatarSetType } from "@nitrodevco/nitro-api";
import { GetAvatarRenderManager } from "@nitrodevco/nitro-renderer";
import { forwardRef, useEffect, useState } from "react";

import { useImageState } from "#base/hooks";

import { SpriteImage } from "./SpriteImage";

type AvatarImageProps = {
    figure: string;
    gender: AvatarGenderType;
    headOnly?: boolean;
    direction?: number;
}

export const AvatarImage = forwardRef<HTMLDivElement, AvatarImageProps>((props, ref) => {
    const { figure, gender, headOnly = false, direction = 0 } = props;
    const [randomValue, setRandomValue] = useState<number>(-1);
    const { imageState, setImageState, disposed } = useImageState();

    useEffect(() => {
        if (!figure) return;

        const avatarImage = GetAvatarRenderManager().createAvatarImage(figure, AvatarScaleType.Large, gender, {
            resetFigure: () => {
                if (disposed.current) return;

                setRandomValue(Math.random());
            }
        }, {
            resetEffect: () => {
                if (disposed.current) return;

                setRandomValue(Math.random());
            }
        });

        if (!avatarImage) return;

        const setType = headOnly ? AvatarSetType.Head : AvatarSetType.Full;

        avatarImage.setDirection(setType, direction);

        const load = async () => {
            const image = await avatarImage.getCroppedImageAsync(setType, false, 1);

            if (!image || disposed.current) return;

            setImageState({
                width: image.width,
                height: image.height,
                url: image.src
            });
        }

        void load();
    }, [figure, gender, headOnly, direction, randomValue, disposed, setImageState]);

    return <SpriteImage ref={ref} image={imageState} backgroundPosition="center -8px" style={{ pointerEvents: 'none' }} />;
});

AvatarImage.displayName = 'AvatarImage';