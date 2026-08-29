import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Named region `slots` of RecyclerWidgetLayout - configured through the parent's `slots` prop. */
export interface RecyclerWidgetLayoutSlotsProps {
    layout?: BoxLayout;
    srcSlotBg1?: string;
    srcSlotBg10?: string;
    srcSlotBg11?: string;
    srcSlotBg12?: string;
    srcSlotBg2?: string;
    srcSlotBg3?: string;
    srcSlotBg4?: string;
    srcSlotBg5?: string;
    srcSlotBg6?: string;
    srcSlotBg7?: string;
    srcSlotBg8?: string;
    srcSlotBg9?: string;
    srcSlotImg1?: string;
    srcSlotImg10?: string;
    srcSlotImg11?: string;
    srcSlotImg12?: string;
    srcSlotImg2?: string;
    srcSlotImg3?: string;
    srcSlotImg4?: string;
    srcSlotImg5?: string;
    srcSlotImg6?: string;
    srcSlotImg7?: string;
    srcSlotImg8?: string;
    srcSlotImg9?: string;
    tintSlotBg1?: string;
    tintSlotBg10?: string;
    tintSlotBg11?: string;
    tintSlotBg12?: string;
    tintSlotBg2?: string;
    tintSlotBg3?: string;
    tintSlotBg4?: string;
    tintSlotBg5?: string;
    tintSlotBg6?: string;
    tintSlotBg7?: string;
    tintSlotBg8?: string;
    tintSlotBg9?: string;
    tintSlotImg1?: string;
    tintSlotImg10?: string;
    tintSlotImg11?: string;
    tintSlotImg12?: string;
    tintSlotImg2?: string;
    tintSlotImg3?: string;
    tintSlotImg4?: string;
    tintSlotImg5?: string;
    tintSlotImg6?: string;
    tintSlotImg7?: string;
    tintSlotImg8?: string;
    tintSlotImg9?: string;
}

export const RecyclerWidgetLayoutSlots = ({ layout, srcSlotBg1, srcSlotBg10, srcSlotBg11, srcSlotBg12, srcSlotBg2, srcSlotBg3, srcSlotBg4, srcSlotBg5, srcSlotBg6, srcSlotBg7, srcSlotBg8, srcSlotBg9, srcSlotImg1, srcSlotImg10, srcSlotImg11, srcSlotImg12, srcSlotImg2, srcSlotImg3, srcSlotImg4, srcSlotImg5, srcSlotImg6, srcSlotImg7, srcSlotImg8, srcSlotImg9, tintSlotBg1, tintSlotBg10, tintSlotBg11, tintSlotBg12, tintSlotBg2, tintSlotBg3, tintSlotBg4, tintSlotBg5, tintSlotBg6, tintSlotBg7, tintSlotBg8, tintSlotBg9, tintSlotImg1, tintSlotImg10, tintSlotImg11, tintSlotImg12, tintSlotImg2, tintSlotImg3, tintSlotImg4, tintSlotImg5, tintSlotImg6, tintSlotImg7, tintSlotImg8, tintSlotImg9 }: RecyclerWidgetLayoutSlotsProps) => {
    return (
        <Region
            name="slots"
            layout={{ position: 'absolute', left: 21, width: 145, top: 16, height: 124, ...layout }}
        >
            <ThemeImage
                name="slot_bg_1"
                src={srcSlotBg1}
                tint={tintSlotBg1}
                layout={{ position: 'absolute', left: 0, width: 34, top: 0, height: 34 }}
            />
            <ThemeImage
                name="slot_bg_2"
                src={srcSlotBg2}
                tint={tintSlotBg2}
                layout={{ position: 'absolute', left: 37, width: 34, top: 0, height: 34 }}
            />
            <ThemeImage
                name="slot_bg_3"
                src={srcSlotBg3}
                tint={tintSlotBg3}
                layout={{ position: 'absolute', left: 74, width: 34, top: 0, height: 34 }}
            />
            <ThemeImage
                name="slot_bg_4"
                src={srcSlotBg4}
                tint={tintSlotBg4}
                layout={{ position: 'absolute', left: 111, width: 34, top: 0, height: 34 }}
            />
            <ThemeImage
                name="slot_img_1"
                src={srcSlotImg1}
                tint={tintSlotImg1}
                layout={{ position: 'absolute', left: 0, width: 34, top: 0, height: 34 }}
            />
            <ThemeImage
                name="slot_img_2"
                src={srcSlotImg2}
                tint={tintSlotImg2}
                layout={{ position: 'absolute', left: 37, width: 34, top: 0, height: 34 }}
            />
            <ThemeImage
                name="slot_img_3"
                src={srcSlotImg3}
                tint={tintSlotImg3}
                layout={{ position: 'absolute', left: 74, width: 34, top: 0, height: 34 }}
            />
            <ThemeImage
                name="slot_img_4"
                src={srcSlotImg4}
                tint={tintSlotImg4}
                layout={{ position: 'absolute', left: 111, width: 34, top: 0, height: 34 }}
            />
            <ThemeImage
                name="slot_bg_5"
                src={srcSlotBg5}
                tint={tintSlotBg5}
                layout={{ position: 'absolute', left: 0, width: 34, top: 44, height: 34 }}
            />
            <ThemeImage
                name="slot_bg_6"
                src={srcSlotBg6}
                tint={tintSlotBg6}
                layout={{ position: 'absolute', left: 37, width: 34, top: 44, height: 34 }}
            />
            <ThemeImage
                name="slot_bg_7"
                src={srcSlotBg7}
                tint={tintSlotBg7}
                layout={{ position: 'absolute', left: 74, width: 34, top: 44, height: 34 }}
            />
            <ThemeImage
                name="slot_bg_8"
                src={srcSlotBg8}
                tint={tintSlotBg8}
                layout={{ position: 'absolute', left: 111, width: 34, top: 44, height: 34 }}
            />
            <ThemeImage
                name="slot_img_5"
                src={srcSlotImg5}
                tint={tintSlotImg5}
                layout={{ position: 'absolute', left: 0, width: 34, top: 44, height: 34 }}
            />
            <ThemeImage
                name="slot_img_6"
                src={srcSlotImg6}
                tint={tintSlotImg6}
                layout={{ position: 'absolute', left: 37, width: 34, top: 44, height: 34 }}
            />
            <ThemeImage
                name="slot_img_7"
                src={srcSlotImg7}
                tint={tintSlotImg7}
                layout={{ position: 'absolute', left: 74, width: 34, top: 44, height: 34 }}
            />
            <ThemeImage
                name="slot_img_8"
                src={srcSlotImg8}
                tint={tintSlotImg8}
                layout={{ position: 'absolute', left: 111, width: 34, top: 44, height: 34 }}
            />
            <ThemeImage
                name="slot_bg_9"
                src={srcSlotBg9}
                tint={tintSlotBg9}
                layout={{ position: 'absolute', left: 0, width: 34, top: 90, height: 34 }}
            />
            <ThemeImage
                name="slot_bg_10"
                src={srcSlotBg10}
                tint={tintSlotBg10}
                layout={{ position: 'absolute', left: 37, width: 34, top: 90, height: 34 }}
            />
            <ThemeImage
                name="slot_bg_11"
                src={srcSlotBg11}
                tint={tintSlotBg11}
                layout={{ position: 'absolute', left: 74, width: 34, top: 90, height: 34 }}
            />
            <ThemeImage
                name="slot_bg_12"
                src={srcSlotBg12}
                tint={tintSlotBg12}
                layout={{ position: 'absolute', left: 111, width: 34, top: 90, height: 34 }}
            />
            <ThemeImage
                name="slot_img_9"
                src={srcSlotImg9}
                tint={tintSlotImg9}
                layout={{ position: 'absolute', left: 0, width: 34, top: 90, height: 34 }}
            />
            <ThemeImage
                name="slot_img_10"
                src={srcSlotImg10}
                tint={tintSlotImg10}
                layout={{ position: 'absolute', left: 37, width: 34, top: 90, height: 34 }}
            />
            <ThemeImage
                name="slot_img_11"
                src={srcSlotImg11}
                tint={tintSlotImg11}
                layout={{ position: 'absolute', left: 74, width: 34, top: 90, height: 34 }}
            />
            <ThemeImage
                name="slot_img_12"
                src={srcSlotImg12}
                tint={tintSlotImg12}
                layout={{ position: 'absolute', left: 111, width: 34, top: 90, height: 34 }}
            />
        </Region>
    );
};
