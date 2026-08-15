import { useState } from "react";

import { useTranslation } from "#base/context";
import { Border, NitroIcon } from "#base/theme";

export const CatalogSearchView = () => {
    const [searchValue, setSearchValue] = useState('');
    const t = useTranslation();

    const onIconClick = () => {
        if (searchValue.length > 0) setSearchValue('');
    }

    return (
        <Border variant="105" className="catalog-search">
            <input type="text" className="catalog-search-input" aria-label={t('catalog.search')} placeholder={t('catalog.search')} value={searchValue} onChange={e => setSearchValue(e.target.value)} />
            <NitroIcon icon={searchValue.length > 0 ? "catalog-icon-clear" : "pencil-icon"} className="cursor-pointer shrink-0" onClick={onIconClick} />
        </Border>
    );
}
