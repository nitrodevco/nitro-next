import { TargetedOfferDialogTimeLeft as TimeLeft } from '#base/hooks';
import { Border, Region, ThemeText } from '#base/theme';

export interface TargetedOfferDialogTimeLeftProps {
    timeLeft: TimeLeft;
    /** The border's width: 579 in the dialog, 641 in the variation. */
    width: number;
    /** The centre of the texts' list in the inner container: 270 in the dialog, 316 in the variation. */
    listCentre: number;
}

/**
 * `cnt_time_left`, the red (`0xfc5046`) style 3 border both targeted offer dialog layouts lay over
 * the top of the frame at -3, -5 (40 high), drawn last so it is on top. In it, a container at 5, 7
 * holds a horizontal list of `txt_time_left_label_1`, `txt_time_left` and `txt_time_left_label_2`
 * (white Ubuntu 16, 24 and 16, the labels 5 lower). The list resizes to its texts
 * (`resize_to_accommodate_children`) around its centre (`on_accommodate_align_center`), which the
 * layout puts at `x + width / 2` - so the texts are centred on that point, not on the border.
 */
export const TargetedOfferDialogTimeLeft = ({ timeLeft, width, listCentre }: TargetedOfferDialogTimeLeftProps) => (
    <Border
        variant="3"
        name="cnt_time_left"
        tintColor="#fc5046"
        layout={{ position: 'absolute', left: -3, width, top: -5, height: 40 }}
    >
        <Region layout={{ position: 'absolute', left: 5, width: width - 10, top: 7, height: 30 }}>
            <Region layout={{ position: 'absolute', left: 0, width: listCentre * 2, top: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                <ThemeText
                    name="txt_time_left_label_1"
                    text={timeLeft.label1}
                    textStyle="u_regular"
                    textOptions={{ fill: '#ffffff', fontSize: 16 }}
                    verticalAlign="top"
                    layout={{ marginTop: 5, flexShrink: 0 }}
                />
                <ThemeText
                    name="txt_time_left"
                    text={timeLeft.time}
                    textStyle="u_regular"
                    textOptions={{ fill: '#ffffff', fontSize: 24 }}
                    verticalAlign="top"
                    layout={{ flexShrink: 0 }}
                />
                <ThemeText
                    name="txt_time_left_label_2"
                    text={timeLeft.label2}
                    textStyle="u_regular"
                    textOptions={{ fill: '#ffffff', fontSize: 16 }}
                    verticalAlign="top"
                    layout={{ marginTop: 5, flexShrink: 0 }}
                />
            </Region>
        </Region>
    </Border>
);
