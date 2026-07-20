import { RoomGeometryScaleType, Vector3d } from "@nitrodevco/nitro-api";
import { GetRoomEngine } from "@nitrodevco/nitro-renderer";
import { forwardRef, useEffect } from "react";

import { useImageState } from "#base/hooks";

import { SpriteImage } from "./SpriteImage";

type FurnitureImageProps = {
    type: string;
    colorIndex?: number;
    direction?: number;
    scale?: RoomGeometryScaleType;
    extra?: number;
}

export const FurnitureImage = forwardRef<HTMLDivElement, FurnitureImageProps>((props, ref) => {
    const { type, colorIndex = 0, direction = 2, scale = RoomGeometryScaleType.ZoomedIn, extra = 0 } = props;
    const { imageState, setImageState, disposed } = useImageState();

    useEffect(() => {
        if (!type) return;

        const load = async () => {
            const image = await GetRoomEngine().getGenericRoomObjectImage(type, colorIndex.toString(), new Vector3d(direction), scale, extra);

            if (!image || disposed.current) return;

            setImageState({
                width: image.width,
                height: image.height,
                url: image.src
            });
        }

        void load();
    }, [type, colorIndex, direction, scale, extra, disposed, setImageState]);

    return <SpriteImage ref={ref} image={imageState} />;
});

FurnitureImage.displayName = 'FurnitureImage';