/**
 * The folded "bubble width" section `Chat`, `BotTalk` and `BotTalkDirectToAvatar` each build
 * inline: a `DropdownParam("${wiredfurni.params.show_message.bubble_width.title}", ...)` over the
 * ids -1 (the room's default) to 2, each captioned `wiredfurni.params.show_message.bubble_width.<id>`,
 * in a `SectionParam.COLLAPSED` section of the same title.
 */
import { WiredDropdown } from '#base/views/wired-setup/kit/WiredDropdown';
import { WiredSection } from '#base/views/wired-setup/kit/WiredSection';
import { CHAT_BUBBLE_WIDTHS } from '#base/wired';

const WIDTH_OPTIONS = CHAT_BUBBLE_WIDTHS.map(id => ({ id, label: `\${wiredfurni.params.show_message.bubble_width.${id}}` }));

export interface WiredBubbleWidthSectionProps {
    value: number;
    onChange: (value: number) => void;
}

export const WiredBubbleWidthSection = ({ value, onChange }: WiredBubbleWidthSectionProps) => (
    <WiredSection
        title="${wiredfurni.params.show_message.bubble_width.title}"
        collapsible
        defaultCollapsed
    >
        <WiredDropdown
            options={WIDTH_OPTIONS}
            selected={value}
            onSelect={onChange}
            caption="${wiredfurni.params.show_message.bubble_width.title}"
        />
    </WiredSection>
);
