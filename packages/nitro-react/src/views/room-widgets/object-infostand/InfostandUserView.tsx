import { ISimpleRoomObjectData } from '@nitrodevco/nitro-api';
import { ChangeMottoComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useTranslation } from '#base/context/system';
import { useRoomUserData } from '#base/hooks';
import { Border, Box, CloseButton, ColorLayer, NitroIcon, TextInput, ThemeText, useAvatarImageTexture } from '#base/theme';

export interface InfostandUserViewProps {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
}

/** Pixi port of views/room-widgets/object-infostand/InfostandUserView.tsx. */
export const InfostandUserView = ({ objectData, onClose }: InfostandUserViewProps) => {
    const userData = useRoomUserData(objectData.objectId)!;
    // Which object's motto is being edited: selecting someone else simply stops matching, so no effect has to close the editor.
    const [ editingObjectId, setEditingObjectId ] = useState<number | undefined>(undefined);
    const isEditingMotto = editingObjectId === objectData.objectId;
    const [ motto, setMotto ] = useState<string>(userData?.motto ?? '');
    const mottoMaxLength = useConfigValue<number>('motto.max.length') ?? 38;
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const { texture: avatarTexture, width: avatarWidth, height: avatarHeight } = useAvatarImageTexture(userData?.figure, userData?.gender, { direction: 4 });

    const submitMotto = () => {
        if (!isEditingMotto || (motto.length > mottoMaxLength)) return;

        send(new ChangeMottoComposer({ text: motto }));

        setEditingObjectId(undefined);
    };

    if (!userData) return null;

    return (
        <Box layout={{ flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <Border
                variant="1"
                layout={{ flexDirection: 'column', minWidth: 190, maxWidth: 190, gap: 5, padding: 10 }}
            >
                <Box layout={{ flexDirection: 'row', alignItems: 'center', width: '100%', gap: 8 }}>
                    <Box layout={{ flexDirection: 'row', flex: 1, alignItems: 'center', gap: 5 }}>
                        <NitroIcon
                            icon="icon-profile-house"
                            layout={{}}
                        />
                        <ThemeText
                            text={userData.name}
                            textStyle="text-style-button-bold"
                        />
                    </Box>
                    <CloseButton
                        variant="1"
                        onPointerTap={onClose}
                        layout={{ flexShrink: 0 }}
                    />
                </Box>
                <Box layout={{ width: '100%', height: 1 }} />
                <Box layout={{ flexDirection: 'row', width: '100%', gap: 8 }}>
                    <Border
                        variant="0"
                        tintColor="#666666"
                        layout={{ width: 67, height: 130, justifyContent: 'center', alignItems: 'center' }}
                    >
                        {avatarTexture && (
                            <pixiSprite
                                texture={avatarTexture}
                                width={avatarWidth}
                                height={avatarHeight}
                                layout={{}}
                            />
                        )}
                    </Border>
                    <Box layout={{ flexDirection: 'column', width: '100%', gap: 4 }}>
                        <Box layout={{ flexDirection: 'row', width: '100%', height: 42, gap: 4 }}>
                            <ColorLayer
                                color="#000000"
                                layout={{ width: 42, height: 42 }}
                            />
                            <ColorLayer
                                color="#000000"
                                layout={{ width: 42, height: 42 }}
                            />
                        </Box>
                        <Box layout={{ flexDirection: 'row', width: '100%', height: 42, gap: 4 }}>
                            <ColorLayer
                                color="#000000"
                                layout={{ width: 42, height: 42 }}
                            />
                            <ColorLayer
                                color="#000000"
                                layout={{ width: 42, height: 42 }}
                            />
                        </Box>
                        <Box layout={{ flexDirection: 'row', width: '100%', height: 42, gap: 4 }}>
                            <ColorLayer
                                color="#000000"
                                layout={{ width: 42, height: 42 }}
                            />
                            <ColorLayer
                                color="#000000"
                                layout={{ width: 42, height: 42 }}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box layout={{ width: '100%', height: 1 }} />
                <Border
                    variant="0"
                    tintColor="#666666"
                    layout={{ flexDirection: 'row', alignItems: 'center', gap: 4, width: '100%', minHeight: 25, paddingLeft: 8, paddingRight: 8, paddingTop: 2, paddingBottom: 2 }}
                >
                    {!userData.isOwnUser && (
                        <ThemeText
                            layout={{ flex: 1 }}
                            text={motto.length === 0 ? t('infostand.motto.change') : motto}
                            textStyle="text-style-regular"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    )}
                    {userData.isOwnUser && (
                        <>
                            <Box
                                cursor="pointer"
                                onPointerTap={() => setEditingObjectId(objectData.objectId)}
                                layout={{ flexShrink: 0 }}
                            >
                                <NitroIcon
                                    icon="pencil-icon"
                                    layout={{}}
                                />
                            </Box>
                            {!isEditingMotto && (
                                <ThemeText
                                    layout={{ flex: 1 }}
                                    text={motto}
                                    textStyle="text-style-regular"
                                    textOptions={{ fill: '#ffffff' }}
                                />
                            )}
                            {isEditingMotto && (
                                <TextInput
                                    value={motto}
                                    onChange={setMotto}
                                    onEnter={submitMotto}
                                    maxLength={mottoMaxLength}
                                    fontSize={9}
                                    textColor="#ffffff"
                                    backgroundColor="#666666"
                                    layout={{ flex: 1, height: 20 }}
                                />
                            )}
                        </>
                    )}
                </Border>
                <Box layout={{ width: '100%', height: 1 }} />
                <Box layout={{ flexDirection: 'row', width: '100%' }}>
                    <ThemeText
                        text={`${t('infostand.text.achievement_score')}\n${userData.achievementScore}`}
                        textStyle="text-style-frame-title"
                    />
                </Box>
            </Border>
        </Box>
    );
};
