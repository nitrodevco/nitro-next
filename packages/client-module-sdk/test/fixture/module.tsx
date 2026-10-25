import { useState } from 'react';

import { assetUrl, defineModule, useApi } from '../../src/index';
import { Button, Frame, ThemeText } from '../../src/theme';

const Counter = ({ close }: { close: () => void }) => {
    const api = useApi();
    const [ clicks, setClicks ] = useState(0);

    return (
        <Frame
            id={`${api.key}-counter`}
            caption={api.texts.get('counter.title', 'Counter')}
            onClose={close}
        >
            <ThemeText text={String(clicks)} />
            <Button
                variant="101"
                onPointerTap={() => setClicks(clicks + 1)}
            >
                +1
            </Button>
        </Frame>
    );
};

export default defineModule({
    activate(api) {
        api.windows.register('counter', Counter);
        api.toolbar.add({ id: 'counter', icon: assetUrl('icon.png'), onClick: () => api.windows.toggle('counter') });
    },
});
