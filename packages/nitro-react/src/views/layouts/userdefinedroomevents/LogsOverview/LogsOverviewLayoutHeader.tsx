import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, CheckBox, Dropmenu, Region, TextInput, ThemeText } from '#base/theme';

/** Named region `header` of LogsOverviewLayout - configured through the parent's `header` prop. */
export interface LogsOverviewLayoutHeaderProps {
    captionFilterKey?: string;
    captionInfoText?: string;
    captionLogLevelKey?: string;
    captionLogSourceKey?: string;
    layout?: BoxLayout;
    onAutoRefreshCbx?: () => void;
    onLogLevelMenu?: () => void;
    onLogSourceMenu?: () => void;
}

export const LogsOverviewLayoutHeader = ({ captionFilterKey, captionInfoText, captionLogLevelKey, captionLogSourceKey, layout, onAutoRefreshCbx, onLogLevelMenu, onLogSourceMenu }: LogsOverviewLayoutHeaderProps) => {
    const t = useTranslation();
    const [ filterInputValue, setFilterInputValue ] = useState('');

    return (
        <Region
            name="header"
            layout={{ position: 'absolute', left: 0, right: -12, top: 0, height: 117, ...layout }}
        >
            <Border
                variant="4"
                layout={{ position: 'absolute', left: 8, width: 580, top: 7, height: 38 }}
            >
                <Region
                    name="info_text"
                    layout={{ position: 'absolute', left: 1, right: 1, top: 3, bottom: 3, minWidth: 578, maxWidth: 578, minHeight: 32, maxHeight: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionInfoText ?? t('wiredmenu.logs_overview.info')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 578, align: 'center' }}
                    />
                </Region>
            </Border>
            <Region
                name="filter_cont"
                layout={{ position: 'absolute', left: 15, width: 314, top: 60, height: 25 }}
            >
                <Region
                    name="filter_key"
                    layout={{ position: 'absolute', left: 0, width: 38, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionFilterKey ?? t('wiredmenu.logs_overview.filter')}
                </Region>
                <Border
                    variant="4"
                    layout={{ position: 'absolute', left: 45, width: 269, top: 0, bottom: 0 }}
                >
                    <TextInput
                        value={filterInputValue}
                        onChange={setFilterInputValue}
                        maxLength={400}
                        layout={{ position: 'absolute', left: 6, width: 257, top: 4, height: 18 }}
                    />
                </Border>
            </Region>
            <CheckBox
                variant="3"
                name="auto_refresh_cbx"
                onPointerTap={onAutoRefreshCbx}
                layout={{ position: 'absolute', left: 596, width: 15, top: 19, height: 15 }}
            />
            <Region layout={{ position: 'absolute', left: 614, width: 90, top: 18, height: 29, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                {t('wiredmenu.logs_overview.auto_refresh')}
            </Region>
            <Region
                name="log_source_cont"
                layout={{ position: 'absolute', left: 349, width: 164, top: 60, height: 25 }}
            >
                <Region
                    name="log_source_key"
                    layout={{ position: 'absolute', left: 0, width: 68, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionLogSourceKey ?? t('wiredmenu.logs_overview.log_source')}
                </Region>
                <Dropmenu
                    variant="3"
                    name="log_source_menu"
                    onPointerTap={onLogSourceMenu}
                    layout={{ position: 'absolute', left: 74, width: 90, top: 0, bottom: 0 }}
                />
            </Region>
            <Region
                name="log_level_cont"
                layout={{ position: 'absolute', left: 534, width: 154, top: 60, height: 25 }}
            >
                <Region
                    name="log_level_key"
                    layout={{ position: 'absolute', left: 0, width: 56, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionLogLevelKey ?? t('wiredmenu.logs_overview.log_level')}
                </Region>
                <Dropmenu
                    variant="3"
                    name="log_level_menu"
                    onPointerTap={onLogLevelMenu}
                    layout={{ position: 'absolute', left: 62, width: 90, top: 0, bottom: 0 }}
                />
            </Region>
        </Region>
    );
};
