import { useState } from 'react';

import { giveDefaultSanction, MOD_ACTIONS, requestUserSanction, sendModAction } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useHelpStore } from '#base/context/help';
import { moderationFrame, moderationWindowKey, useModerationActions, useModerationStore } from '#base/context/moderation';
import { useTranslation, useWindowActions } from '#base/context/system';
import { TemplateWindow } from '#base/theme';

/**
 * Flash's `moderation/ModActionCtrl`: the `modact_summary` window ("Mod action on: name"), opened
 * from the user info. A CFH topic (every topic of every category, `${help.cfh.topic.<id>}`) and a
 * sanction are picked; picking a topic clears the sanction (the topic-to-sanction map is never
 * filled, `initializeTopicToSanctionTypeMapping`) and asks the account's default sanction
 * (`ModToolSanction(-1, userId, topic)`), whose `CfhSanction` labels and enables "Default
 * sanction". "Custom sanction" refuses without a topic or a sanction, holds alert, ban and kick to
 * the init's permissions ("You have insufficient permissions.") and a message to text, then sends
 * the action's message (`onCustomSanctionButton`, `ModActionCtrl.as:233-300`) and closes. Both
 * sanctions carry the call for help the window was opened from (`getIssueId`), if any.
 */
export const ModActionView = ({ userId, userName, issueId }: { userId: number; userName: string; issueId?: number }) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const init = useModerationStore(x => x.init);
    const defaultSanction = useModerationStore(x => x.defaultSanctions[userId]);
    const categories = useHelpStore(x => x.callForHelpCategories);
    const { showSimpleAlert } = useWindowActions();
    const { closeWindow } = useModerationActions();
    const [ topic, setTopic ] = useState(-1);
    const [ action, setAction ] = useState(-1);
    const [ text, setText ] = useState('');
    const close = () => closeWindow({ kind: 'modAction', userId, userName });
    const [ frame ] = useState(() => moderationFrame(moderationWindowKey({ kind: 'modAction', userId, userName }), close));

    const topicIds = categories.flatMap(category => category.topics.map(x => x.id));
    const alert = (message: string) => showSimpleAlert({ caption: 'Alert', message });

    const selectTopic = (index: number) => {
        setTopic(index);
        setAction(-1);
        requestUserSanction(send, userId, topicIds[index]);
    };

    const giveDefault = () => {
        if (topic < 0) return alert('Please select a topic.');

        giveDefaultSanction(send, userId, topicIds[topic], text, issueId);
        close();
    };

    const giveCustom = () => {
        if (topic < 0) return alert('Please select a topic.');
        if (action < 0) return alert('Please select a sanction.');
        if (!init) return;

        const refused = sendModAction(send, init, MOD_ACTIONS[action], userId, topicIds[topic], text, issueId);

        if (refused) return alert(refused);

        close();
    };

    return (
        <TemplateWindow
            id="habbo-moderation-com/modact_summary_xml"
            frame={frame}
            bindings={{
                '': { caption: `Mod action on: ${userName}` },
                cfh_topics: { options: topicIds.map(id => t(`help.cfh.topic.${id}`)), selection: topic, onSelect: selectTopic },
                sanction_type: { options: MOD_ACTIONS.map(x => x.name), selection: action, onSelect: setAction },
                message_input: { onChange: setText },
                default_sanction_label: defaultSanction ? { caption: defaultSanction } : {},
                default_sanction_button: { disabled: !defaultSanction, onPointerTap: () => defaultSanction && giveDefault() },
                custom_sanction_button: { onPointerTap: giveCustom },
            }}
        />
    );
};
