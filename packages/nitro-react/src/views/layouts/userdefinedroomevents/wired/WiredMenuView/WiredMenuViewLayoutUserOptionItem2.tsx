import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `user_option` of WiredMenuViewLayout - pass real rows through its `items…` slot. */
export interface WiredMenuViewLayoutUserOptionItem2Props {
    layout?: BoxLayout;
    onTypeUserButton?: () => void;
    visibleTypeUserButton?: boolean;
}

export const WiredMenuViewLayoutUserOptionItem2 = ({ layout, onTypeUserButton, visibleTypeUserButton }: WiredMenuViewLayoutUserOptionItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="user_option"
            layout={{ width: 37, height: 37, flexShrink: 0, ...layout }}
        >
            {(visibleTypeUserButton ?? true) && (
                <Button
                    variant="3"
                    name="type_user_button"
                    tooltip={t('wiredfurni.params.sourcetype.users')}
                    onPointerTap={onTypeUserButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 36 }}
                />
            )}
            <ThemeImage
                src={layoutImage('icon_wired_variable_user_large.png')}
                layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 37 }}
            />
        </Region>
    );
};
