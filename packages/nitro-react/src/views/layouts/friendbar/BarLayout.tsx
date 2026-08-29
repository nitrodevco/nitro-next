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

/** Named region `friendtools` of BarLayout - configured through the parent's `friendtools` prop. */
export interface BarLayoutFriendtoolsProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const BarLayoutFriendtools = ({ layout, tags }: BarLayoutFriendtoolsProps) => {
    return (
        <Region
            name="friendtools"
            tags={tags}
            layout={{ position: 'absolute', left: 10, width: 270, top: 5, height: 32, ...layout }}
        />
    );
};

/** Named region `messenger` of BarLayout - configured through the parent's `messenger` prop. */
export interface BarLayoutMessengerProps {
    layout?: BoxLayout;
    onMessenger?: () => void;
    srcIcon?: string;
    tags?: string[];
}

export const BarLayoutMessenger = ({ layout, onMessenger, srcIcon, tags }: BarLayoutMessengerProps) => {
    return (
        <Region
            name="messenger"
            tags={tags}
            onPointerTap={onMessenger}
            cursor="pointer"
            layout={{ position: 'absolute', left: 280, width: 42, top: 5, height: 42, ...layout }}
        >
            <ThemeImage
                name="icon"
                src={srcIcon ?? layoutImage('messenger.png')}
                layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
            />
        </Region>
    );
};

/** Named region `list` of BarLayout - configured through the parent's `list` prop. */
export interface BarLayoutListProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const BarLayoutList = ({ layout, tags }: BarLayoutListProps) => {
    return (
        <Region
            name="list"
            tags={tags}
            layout={{ position: 'absolute', left: 24, width: 0, top: 0, height: 38, flexDirection: 'row', gap: 3, ...layout }}
        />
    );
};

/** Named region `wrapper` of BarLayout - configured through the parent's `wrapper` prop. */
export interface BarLayoutWrapperProps {
    layout?: BoxLayout;
    list?: BarLayoutListProps;
    onButtonLeftPage?: () => void;
    onButtonRightPage?: () => void;
    tags?: string[];
}

export const BarLayoutWrapper = ({ layout, list, onButtonLeftPage, onButtonRightPage, tags }: BarLayoutWrapperProps) => {
    return (
        <Region
            name="wrapper"
            tags={tags}
            layout={{ position: 'absolute', width: 48, top: 0, height: 38, ...layout }}
        >
            <BarLayoutList {...list} />
            <ContainerButton
                variant="3"
                name="button_left_page"
                tags={[ 'arrow', 'left' ]}
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
                tags={[ 'arrow', 'right' ]}
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
    );
};

/** Named region `container` of BarLayout - configured through the parent's `container` prop. */
export interface BarLayoutContainerProps {
    layout?: BoxLayout;
    onContainer?: () => void;
    tags?: string[];
    wrapper?: BarLayoutWrapperProps;
}

export const BarLayoutContainer = ({ layout, onContainer, tags, wrapper }: BarLayoutContainerProps) => {
    return (
        <Region
            name="container"
            tags={tags}
            onPointerTap={onContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 330, right: 10, top: 5, height: 42, justifyContent: 'center', ...layout }}
        >
            <BarLayoutWrapper {...wrapper} />
        </Region>
    );
};

/** Named region `border` of BarLayout - configured through the parent's `border` prop. */
export interface BarLayoutBorderProps {
    container?: BarLayoutContainerProps;
    friendtools?: BarLayoutFriendtoolsProps;
    layout?: BoxLayout;
    messenger?: BarLayoutMessengerProps;
    onBorder?: () => void;
    tags?: string[];
}

export const BarLayoutBorder = ({ container, friendtools, layout, messenger, onBorder, tags }: BarLayoutBorderProps) => {
    return (
        <Region
            name="border"
            tags={tags}
            onPointerTap={onBorder}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 420, top: 0, height: 48, ...layout }}
        >
            <Border
                variant="6"
                tintColor="#403c35"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <BarLayoutFriendtools {...friendtools} />
            <BarLayoutMessenger {...messenger} />
            <BarLayoutContainer {...container} />
        </Region>
    );
};
