/**
 * The sanction status window - `SanctionInfo` over `habbo-help-com/sanction_info_xml`
 * (`getXmlWindow("sanction_info")`, `center()`ed), opened by `HabboHelp.onMySanctionStatusMessageEvent`
 * with the `SanctionStatusEvent` that answers the help window's "My sanction status".
 *
 * `openWindow` empties `main_contents_list` and fills it with clones of its `sanction_info` text, each
 * as high as its text plus 10, with a clone of `divider` between two: one per sanction that has a
 * description (`buildSanctionDescriptions`), every one but the last ending in an empty line, or a
 * single `settings.help.sanction_information.description` when there is none. A gradual sanction
 * adds the probation reminder, the days of probation left and the next sanction
 * (`appendGradualSanctionDetails`). `faq_link` opens `cfh.faq.url`; `ok_button` and the frame's
 * close dispose the window.
 */
import { ISanctionStatusEntry, ISanctionStatusType } from '@nitrodevco/nitro-packets';

import { useConfigValue, useTranslation } from '#base/context/system';
import { TemplateBindings, TemplateItem, TemplateWindow, TemplateWindows, useTemplateFrame } from '#base/theme';

const TEMPLATE = 'habbo-help-com/sanction_info_xml';

/** `openWindow`: a description's text is its lines plus this. */
const TEXT_PADDING = 10;

type Translate = ReturnType<typeof useTranslation>;

/** `getNextSanctionDescription`. */
const nextSanctionDescription = (t: Translate, type: ISanctionStatusType): string => {
    if (!type.name) return '';

    switch (type.name) {
        case 'ALERT':
            return t('help.sanction.next.alert');
        case 'MUTE':
            return t('help.sanction.next.mute', '', { hours: String(type.sanctionLengthHours) });
        case 'BAN_PERMANENT':
            return t('help.sanction.next.permban');
        default:
            if (type.sanctionLengthHours > 24) return t('help.sanction.next.ban.days', '', { days: String(Math.trunc(type.sanctionLengthHours / 24)) });

            return t('help.sanction.next.ban', '', { hours: String(type.sanctionLengthHours) });
    }
};

/** `appendGradualSanctionDetails`. */
const gradualSanctionDetails = (t: Translate, sanction: ISanctionStatusEntry): string[] => {
    const onProbation = sanction.probationHoursLeft > 0;
    const nextName = sanction.nextSanctionType.name;

    if (!onProbation && !nextName) return [];

    const lines = [ '', t('help.sanction.probation.reminder') ];

    // `getProbationDaysLeft`.
    if (onProbation) lines.push(`${t('help.sanction.probation.days.left')} ${Math.ceil(sanction.probationHoursLeft / 24)}`);

    if (nextName) lines.push('', nextSanctionDescription(t, sanction.nextSanctionType), '');

    return lines;
};

/** `buildSanctionDescriptions`: one text per sanction that has a description. */
const sanctionDescriptions = (t: Translate, sanctions: readonly ISanctionStatusEntry[]): string[] => sanctions
    .filter(sanction => sanction.description)
    .map(sanction => [ sanction.description, ...(sanction.gradual ? gradualSanctionDetails(t, sanction) : []) ].join('\n'));

export interface SanctionInfoViewProps {
    sanctions: readonly ISanctionStatusEntry[];
    onClose: () => void;
}

export const SanctionInfoView = ({ sanctions, onClose }: SanctionInfoViewProps) => {
    const t = useTranslation();
    const faqUrl = useConfigValue<string>('cfh.faq.url');
    const frame = useTemplateFrame({ id: 'help_sanction_info', centered: true, rememberPosition: false, resizeDirection: 'none', onClose });

    const descriptions = sanctionDescriptions(t, sanctions);
    const texts = descriptions.length ? descriptions.map((text, index) => ((index < descriptions.length - 1) ? `${text}\n` : text)) : [ t('settings.help.sanction_information.description') ];

    /** The text clone's height: its lines plus 10. */
    const fitText = ({ root }: TemplateWindows) => {
        const text = root();

        if (text) text.setHeight(text.textHeight + TEXT_PADDING);
    };

    const items: TemplateItem[] = [];

    texts.forEach((text, index) => {
        items.push({ key: `text_${index}`, from: 'sanction_info', bindings: { '': { caption: text } }, arrange: fitText });

        if (descriptions.length && (index < texts.length - 1)) items.push({ key: `divider_${index}`, from: 'divider' });
    });

    const bindings: TemplateBindings = {
        main_contents_list: { items },
        faq_link: { onPointerTap: () => { if (faqUrl?.length) window.open(faqUrl, 'habboMain'); } },
        ok_button: { onPointerTap: onClose },
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={bindings}
        />
    );
};
