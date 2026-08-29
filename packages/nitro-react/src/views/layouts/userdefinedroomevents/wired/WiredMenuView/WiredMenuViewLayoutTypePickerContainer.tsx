import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region } from '#base/theme';

import { WiredMenuViewLayoutButtons, WiredMenuViewLayoutButtonsProps } from './WiredMenuViewLayoutButtons';

/** Named region `type_picker_container` of WiredMenuViewLayout - configured through the parent's `typePickerContainer` prop. */
export interface WiredMenuViewLayoutTypePickerContainerProps {
    buttons?: WiredMenuViewLayoutButtonsProps;
    captionTitle?: string;
    layout?: BoxLayout;
}

export const WiredMenuViewLayoutTypePickerContainer = ({ buttons, captionTitle, layout }: WiredMenuViewLayoutTypePickerContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="type_picker_container"
            layout={{ position: 'absolute', left: 14, width: 197, top: 18, height: 70, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionTitle ?? t('wiredmenu.variable_overview.type')}
            </Region>
            <Border
                variant="3"
                name="type_options"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 0, width: 188, top: 20, height: 47 }}
            >
                <WiredMenuViewLayoutButtons {...buttons} />
            </Border>
        </Region>
    );
};
