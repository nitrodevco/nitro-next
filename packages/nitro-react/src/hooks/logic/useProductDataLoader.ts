import { NitroLogger } from '@nitrodevco/nitro-api';
import { useEffect, useState } from 'react';

import { useConfigValue, useFurnitureDataActions } from '#base/context/system';

/**
 * The boot's product data step: loads `productdata.url` once the config names it, and says when
 * it is in for the loading screen.
 */
export const useProductDataLoader = () => {
    const [ needsUpdate, setNeedsUpdate ] = useState(true);
    const { parseProductData } = useFurnitureDataActions();
    const productdataUrl = useConfigValue<string>('productdata.url') ?? '';

    const isProductDataReady = () => {
        return !needsUpdate;
    };

    useEffect(() => {
        if (!needsUpdate || !productdataUrl || !productdataUrl.length) return;

        const loadAsync = async (url: string) => {
            if (!url || !url.length) return;

            try {
                const response = await fetch(url);

                if (response.status !== 200) throw new Error('Invalid productdata url');

                const responseData = await response.json();

                parseProductData(responseData.productdata.product);
                setNeedsUpdate(false);
            } catch (e) {
                NitroLogger.error(e);
            }
        };

        void loadAsync(productdataUrl);
    }, [ needsUpdate, productdataUrl ]);

    return { isProductDataReady };
};
