import { RoomGeometryScaleType, Vector3d } from '@nitrodevco/nitro-api';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';
import { forwardRef, useEffect, useState } from 'react';

type FurnitureImageProps = {
    type: string;
    colorIndex?: number;
    direction?: number;
    scale?: RoomGeometryScaleType;
    extra?: number;
};

export const FurnitureImage = forwardRef<HTMLDivElement, FurnitureImageProps>((props, ref) => {
    const { type, colorIndex = 0, direction = 2, scale = RoomGeometryScaleType.ZoomedIn, extra = 0 } = props;
    const [ imageData, setImageData ] = useState<{ width: number; height: number; url: string }>({ width: 0, height: 0, url: '' });

    useEffect(() => {
        if (!type) return;

        const load = async () => {
            const result = await GetRoomEngine().getGenericRoomObjectImage(
                type,
                colorIndex.toString(),
                new Vector3d(direction),
                scale,
                {
                    imageReady: (result) => {
                        if (!result) return;

                        setImageData({
                            width: result.width,
                            height: result.height,
                            url: result.src,
                        });
                    },
                    imageFailed: () => { },
                },
                extra,
            );

            if (!result) return;

            setImageData({
                width: result.width,
                height: result.height,
                url: result.src,
            });
        };

        void load();
    }, [ type, colorIndex, direction, scale, extra ]);

    return (
        <div
            ref={ref}
            style={{
                width: imageData.width,
                height: imageData.height,
                backgroundImage: `url(${imageData.url})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        />
    );
});
