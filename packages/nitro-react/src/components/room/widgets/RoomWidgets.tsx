import { Box } from '#base/theme';

import { RoomObjectInfostandWidget } from './object-infostand';
import { RoomObjectMenuWidget } from './object-menu';

export const RoomWidgets = () => {
    return (
        <>
            <RoomObjectMenuWidget />
            <Box layout={{ position: 'absolute', right: 4, bottom: 58 }}>
                <RoomObjectInfostandWidget />
            </Box>
        </>
    );
};
