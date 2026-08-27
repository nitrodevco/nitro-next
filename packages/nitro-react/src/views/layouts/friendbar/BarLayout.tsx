import { Border, BoxLayout, ContainerButton, Icon, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `28_bar_xml` (layout "bar", 420x48) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BarLayoutProps {
    layout?: BoxLayout;
    onButtonLeftPage?: () => void;
    onButtonRightPage?: () => void;
    onMessenger?: () => void;
    srcIcon?: string;
}

export const BarLayout = ({ layout, onButtonLeftPage, onButtonRightPage, onMessenger, srcIcon }: BarLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 420, height: 48, ...layout }}>
            <Region
                name="border"
                params={1}
                layout={{ position: 'absolute', left: 0, width: 420, top: 0, height: 48 }}
            >
                <Border
                    variant="6"
                    params={2176}
                    tintColor="#403c35"
                    layout={{ position: 'absolute', left: 0, width: 420, top: 0, height: 48 }}
                />
                <Region
                    name="friendtools"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 270, top: 5, height: 32 }}
                />
                <Region
                    name="messenger"
                    params={17}
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
                    params={145}
                    layout={{ position: 'absolute', left: 330, width: 80, top: 5, height: 42 }}
                >
                    <Region
                        name="wrapper"
                        params={208}
                        layout={{ position: 'absolute', left: 16, width: 48, top: 0, height: 38 }}
                    >
                        <Region
                            name="list"
                            params={4194320}
                            layout={{ position: 'absolute', left: 24, width: 0, top: 0, height: 38, flexDirection: 'row', gap: 3 }}
                        />
                        <ContainerButton
                            variant="3"
                            name="button_left_page"
                            tags={[ 'arrow', 'left' ]}
                            params={1}
                            onPointerTap={onButtonLeftPage}
                            layout={{ position: 'absolute', left: 0, width: 24, top: 7, height: 24 }}
                        >
                            <Icon
                                variant="2"
                                params={16}
                                tintColor="#333333"
                                layout={{ position: 'absolute', left: 7, width: 10, top: 7, height: 10 }}
                            />
                        </ContainerButton>
                        <ContainerButton
                            variant="3"
                            name="button_right_page"
                            tags={[ 'arrow', 'right' ]}
                            params={65}
                            onPointerTap={onButtonRightPage}
                            layout={{ position: 'absolute', left: 24, width: 24, top: 7, height: 24 }}
                        >
                            <Icon
                                variant="3"
                                params={16}
                                tintColor="#333333"
                                layout={{ position: 'absolute', left: 7, width: 10, top: 7, height: 10 }}
                            />
                        </ContainerButton>
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
