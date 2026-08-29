import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `catalog.header.background.border` of CatalogUbuntuWithTabsLayout - configured through the parent's `catalogHeaderBackgroundBorder` prop. */
export interface CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBorderProps {
    captionBuilderHeaderStatusLimit?: string;
    captionBuilderHeaderStatusMembership?: string;
    captionBuilderHeaderTitle?: string;
    captionCatalogHeaderDescription?: string;
    captionCatalogHeaderTitle?: string;
    catalogHeaderBackgroundBody?: ReactNode;
    layout?: BoxLayout;
    srcCatalogHeaderIcon?: string;
    srcCatalogHeaderImage?: string;
    visibleCatalogModeHeader?: boolean;
}

export const CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBorder = ({ captionBuilderHeaderStatusLimit, captionBuilderHeaderStatusMembership, captionBuilderHeaderTitle, captionCatalogHeaderDescription, captionCatalogHeaderTitle, catalogHeaderBackgroundBody, layout, srcCatalogHeaderIcon, srcCatalogHeaderImage, visibleCatalogModeHeader }: CatalogUbuntuWithTabsLayoutCatalogHeaderBackgroundBorderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="catalog.header.background.border"
            backgroundColor="#376275"
            layout={{ position: 'absolute', left: 1, right: 1, top: 35, height: 90, ...layout }}
        >
            <Region
                name="catalog.header.background.body"
                backgroundColor="#0e3f52"
                layout={{ position: 'absolute', left: 2, right: 2, top: 2, height: 86 }}
            >
                {catalogHeaderBackgroundBody}
            </Region>
            <ThemeImage
                name="catalog.header.image"
                src={srcCatalogHeaderImage ?? '${image.library.url}catalogue/catalog_header_roombuilder.gif'}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 90 }}
            />
            <ThemeImage
                name="catalog.header.icon"
                src={srcCatalogHeaderIcon ?? '${image.library.url}catalogue/icon_1.png'}
                layout={{ position: 'absolute', left: 24, width: 40, top: 30, height: 35 }}
            />
            {(visibleCatalogModeHeader ?? false) && (
                <Region
                    name="catalog.mode.header"
                    layout={{ position: 'absolute', left: 0, width: 570, top: 0, height: 90 }}
                >
                    <Region
                        name="catalog.header.title"
                        layout={{ position: 'absolute', left: 80, width: 133, top: 11, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCatalogHeaderTitle ?? t('catalog.header')}
                            textStyle="text-style-u-headline-big"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="catalog.header.description"
                        layout={{ position: 'absolute', left: 80, width: 475, top: 34, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCatalogHeaderDescription ?? t('catalog.description')}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 475 }}
                        />
                    </Region>
                </Region>
            )}
            <Region
                name="builder.mode.header"
                layout={{ position: 'absolute', left: 0, width: 570, top: 0, height: 90 }}
            >
                <Region
                    name="builder.header.title"
                    layout={{ position: 'absolute', left: 80, width: 226, top: 11, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionBuilderHeaderTitle ?? t('builder.header.title')}
                        textStyle="text-style-u-headline-big"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="builder.header.status.membership"
                    layout={{ position: 'absolute', left: 80, width: 475, top: 41, height: 19, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionBuilderHeaderStatusMembership ?? t('builder.header.status.membership')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 475 }}
                    />
                </Region>
                <Region
                    name="builder.header.status.limit"
                    layout={{ position: 'absolute', left: 80, width: 475, top: 56, height: 19, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionBuilderHeaderStatusLimit ?? t('builder.header.status.limit')}
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 475 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
