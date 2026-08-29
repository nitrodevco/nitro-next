import { Border, BoxLayout, ContainerButton, Icon, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `28_bar_xml` (layout "bar", 420x48) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BarLayoutProps {
    border?: BarLayoutBorderProps;
    layout?: BoxLayout;
}

export const BarLayout = ({ border, layout }: BarLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 420, height: 48, ...layout }}>
            <BarLayoutBorder {...border} />
        </Region>
    );
};

/** Named region `border` of BarLayout - configured through the parent's `border` prop. */
export interface BarLayoutBorderProps {
    layout?: BoxLayout;
    onBorder?: () => void;
    onButtonLeftPage?: () => void;
    onButtonRightPage?: () => void;
    onContainer?: () => void;
    onMessenger?: () => void;
    srcIcon?: string;
}

export const BarLayoutBorder = ({ layout, onBorder, onButtonLeftPage, onButtonRightPage, onContainer, onMessenger, srcIcon }: BarLayoutBorderProps) => {
    return (
        <Region
            name="border"
            onPointerTap={onBorder}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 420, top: 0, height: 48, ...layout }}
        >
            <Border
                variant="6"
                tintColor="#403c35"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Region
                name="friendtools"
                layout={{ position: 'absolute', left: 10, width: 270, top: 5, height: 32 }}
            />
            <Region
                name="messenger"
                onPointerTap={onMessenger}
                cursor="pointer"
                layout={{ position: 'absolute', left: 280, width: 42, top: 5, height: 42 }}
            >
                <ThemeImage
                    name="icon"
                    src={srcIcon ?? layoutImage('messenger.png')}
                    layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                />
            </Region>
            <Region
                name="container"
                onPointerTap={onContainer}
                cursor="pointer"
                layout={{ position: 'absolute', left: 330, right: 10, top: 5, height: 42, justifyContent: 'center' }}
            >
                <Region
                    name="wrapper"
                    layout={{ position: 'absolute', width: 48, top: 0, height: 38 }}
                >
                    <Region
                        name="list"
                        layout={{ position: 'absolute', left: 24, width: 0, top: 0, height: 38, flexDirection: 'row', gap: 3 }}
                    />
                    <ContainerButton
                        variant="3"
                        name="button_left_page"
                        onPointerTap={onButtonLeftPage}
                        layout={{ position: 'absolute', left: 0, width: 24, top: 7, height: 24 }}
                    >
                        <Icon
                            variant="2"
                            tintColor="#333333"
                            layout={{ position: 'absolute', left: 7, width: 10, top: 7, height: 10 }}
                        />
                    </ContainerButton>
                    <ContainerButton
                        variant="3"
                        name="button_right_page"
                        onPointerTap={onButtonRightPage}
                        layout={{ position: 'absolute', right: 0, width: 24, top: 7, height: 24 }}
                    >
                        <Icon
                            variant="3"
                            tintColor="#333333"
                            layout={{ position: 'absolute', left: 7, width: 10, top: 7, height: 10 }}
                        />
                    </ContainerButton>
                </Region>
            </Region>
        </Region>
    );
};
