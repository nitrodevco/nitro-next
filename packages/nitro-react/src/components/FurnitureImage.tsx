import { RoomGeometryScaleType, Vector3d } from "@nitrodevco/nitro-api";
import { GetRoomEngine } from "@nitrodevco/nitro-renderer";
import { forwardRef, useEffect, useRef, useState } from "react";

type FurnitureImageProps = {
    type: string;
    colorIndex?: number;
    direction?: number;
    scale?: RoomGeometryScaleType;
    extra?: number;
}

export const FurnitureImage = forwardRef<HTMLDivElement, FurnitureImageProps>((props, ref) => {
    const { type, colorIndex = 0, direction = 2, scale = RoomGeometryScaleType.ZoomedIn, extra = 0 } = props;
    const [randomValue, setRandomValue] = useState<number>(-1);
    const [imageData, setImageData] = useState<{ width: number, height: number, url: string }>({ width: 0, height: 0, url: '' });
    const disposed = useRef<boolean>(false);

    useEffect(() => {
        if (!type) return;

        const load = async () => {
            const image = await GetRoomEngine().getGenericRoomObjectImage(type, colorIndex.toString(), new Vector3d(direction), scale, extra);

            if (!image || disposed.current) return;

            setImageData({
                width: image.width,
                height: image.height,
                url: image.src
            });
        }

        void load();
    }, [type, colorIndex, direction, scale, extra]);

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
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }} />
    )
});