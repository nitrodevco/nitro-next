import { forwardRef, type HTMLAttributes } from 'react';

import { type FrameResizeDirection, useFrameDrag, useFrameResize } from '#base/hooks';

import { ContentArea } from './ContentArea';
import { Header } from './Header';
import { Scaler } from './Scaler';
import { cn, cva, useCascadedVariant, useTintedVars, VariantCascadeProvider, type VariantProps } from './utils';
import { VARIANT_CASCADE_CONFIG } from './VariantConfig';

const frameVariantsConfig = {
    variant: {
        // blue
        '0': '[border-image-source:var(--frame-0-default-src)] [border-image-slice:13_13_13_13_fill] [border-image-width:13px_13px_13px_13px] nine-slice-border min-w-10 min-h-10 text-[#000000]',
        // black
        '1': '[border-image-source:var(--frame-0-default-src)] [border-image-slice:13_13_13_13_fill] [border-image-width:13px_13px_13px_13px] nine-slice-border min-w-10 min-h-10 text-[#000000]',
        // yellow
        '2': '[border-image-source:var(--frame-0-default-src)] [border-image-slice:13_13_13_13_fill] [border-image-width:13px_13px_13px_13px] nine-slice-border min-w-10 min-h-10 text-[#000000]',
        // default
        '3': '[border-image-source:var(--frame-3-default-src)] [border-image-slice:33_10_10_10_fill] [border-image-width:33px_10px_10px_10px] nine-slice-border min-w-16 min-h-16 text-[#000000]',
        // light
        '4': '[border-image-source:var(--frame-3-default-src)] [border-image-slice:33_10_10_10_fill] [border-image-width:33px_10px_10px_10px] nine-slice-border min-w-16 min-h-16 text-[#000000]',
        // bubble
        '7': '[border-image-source:var(--frame-3-default-src)] [border-image-slice:33_10_10_10_fill] [border-image-width:33px_10px_10px_10px] nine-slice-border min-w-16 min-h-18.25 text-[#000000]',
        // default
        '100': '[background-image:var(--border-101-default-top-left-src),_var(--border-101-default-top-center-src),_var(--border-101-default-top-right-src),_var(--border-101-default-center-left-src),_var(--border-101-default-center-center-src),_var(--border-101-default-center-left-src),_var(--border-101-default-bottom-left-src),_var(--border-101-default-bottom-center-src),_var(--border-101-default-bottom-right-src)] [background-position:left_0px_top_0px,_left_4px_top_0px,_right_0px_top_0px,_left_0px_top_4px,_left_1px_top_4px,_right_0px_top_4px,_left_0px_bottom_0px,_left_4px_bottom_0px,_right_0px_bottom_0px] [background-size:4px_4px,_calc(100%_-_4px_-_4px)_4px,_4px_4px,_1px_calc(100%_-_4px_-_7px),_calc(100%_-_1px_-_1px)_calc(100%_-_4px_-_7px),_1px_calc(100%_-_4px_-_7px),_4px_7px,_calc(100%_-_4px_-_4px)_7px,_4px_7px] bg-no-repeat pixel-art min-w-[50px] min-h-[50px] text-[#000000] text-style-il-frame-title',
        // modal
        '101': 'min-w-12.5 min-h-20 text-[#000000] text-style-il-frame-modal-title',
        // default
        '200': '[border-image-source:var(--frame-200-default-src)] [border-image-slice:4_4_5_4_fill] [border-image-width:4px_4px_5px_4px] nine-slice-border min-w-12.5 min-h-12.5 text-[#000000] text-style-id-frame-title',
    },
} as const;

const frameOverlayVariantsConfig = {
    variant: {
        // blue
        '0': '[background-image:var(--frame-0-default-shine-top-left-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-top-right-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-bottom-left-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-bottom-right-src)] [background-position:left_1px_top_1px,_left_8px_top_2px,_right_1px_top_1px,_left_2px_top_8px,_right_2px_top_8px,_left_1px_bottom_1px,_left_8px_bottom_2px,_right_1px_bottom_1px] [background-size:7px_7px,_calc(100%_-_8px_-_8px)_1px,_7px_7px,_1px_calc(100%_-_8px_-_8px),_1px_calc(100%_-_8px_-_7px),_7px_7px,_calc(100%_-_8px_-_7px)_1px,_6px_6px] bg-no-repeat pixel-art',
        // black
        '1': '[background-image:var(--frame-0-default-shine-top-left-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-top-right-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-bottom-left-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-bottom-right-src)] [background-position:left_1px_top_1px,_left_8px_top_2px,_right_1px_top_1px,_left_2px_top_8px,_right_2px_top_8px,_left_1px_bottom_1px,_left_8px_bottom_2px,_right_1px_bottom_1px] [background-size:7px_7px,_calc(100%_-_8px_-_8px)_1px,_7px_7px,_1px_calc(100%_-_8px_-_8px),_1px_calc(100%_-_8px_-_7px),_7px_7px,_calc(100%_-_8px_-_7px)_1px,_6px_6px] bg-no-repeat pixel-art',
        // yellow
        '2': '[background-image:var(--frame-0-default-shine-top-left-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-top-right-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-bottom-left-src),_var(--frame-0-default-shine-top-center-src),_var(--frame-0-default-shine-bottom-right-src)] [background-position:left_1px_top_1px,_left_8px_top_2px,_right_1px_top_1px,_left_2px_top_8px,_right_2px_top_8px,_left_1px_bottom_1px,_left_8px_bottom_2px,_right_1px_bottom_1px] [background-size:7px_7px,_calc(100%_-_8px_-_8px)_1px,_7px_7px,_1px_calc(100%_-_8px_-_8px),_1px_calc(100%_-_8px_-_7px),_7px_7px,_calc(100%_-_8px_-_7px)_1px,_6px_6px] bg-no-repeat pixel-art',
        // default
        '3': '[border-image-source:var(--frame-3-default-shine-src)] [border-image-slice:33_10_10_10_fill] [border-image-width:33px_10px_10px_10px] nine-slice-border',
        // light
        '4': '[border-image-source:var(--frame-3-default-shine-src)] [border-image-slice:33_10_10_10_fill] [border-image-width:33px_10px_10px_10px] nine-slice-border',
        // bubble
        '7': '[border-image-source:var(--frame-3-default-shine-src)] [border-image-slice:33_10_10_10_fill] [border-image-width:33px_10px_10px_10px] nine-slice-border',
        // default
        '100': '',
        // modal
        '101': '',
        // default
        '200': '',
    },
} as const;

const frameTintColors: Partial<Record<string, string>> = {
    '0': '#418db0',
    '1': '#4c4c4c',
    '2': '#fac200',
    '3': '#418db0',
    '4': '#67a3bf',
};

const frameTintableVars: Partial<Record<string, string[]>> = {
    '0': ['frame-0-default-src'],
    '1': ['frame-0-default-src'],
    '2': ['frame-0-default-src'],
    '3': ['frame-3-default-src'],
    '4': ['frame-3-default-src'],
    '7': ['frame-3-default-src'],
};

const frameVariants = cva('absolute flex flex-col pointer-events-auto overflow-hidden will-change-transform drop-shadow-[2.83px_2.83px_4px_rgba(0,0,0,0.349)]', { variants: frameVariantsConfig, defaultVariants: { variant: '0' } });
const frameOverlayVariants = cva('will-change-transform', { variants: frameOverlayVariantsConfig, defaultVariants: { variant: '0' } });

type FrameVariantProps = VariantProps<typeof frameVariantsConfig>;

interface FrameProps extends HTMLAttributes<HTMLDivElement>, FrameVariantProps {
    id?: string;
    caption?: string;
    onClose?: () => void;
    closable?: boolean;

    className?: string;
    contentClassName?: string;
    tintColor?: string;
    defaultVariant?: string;
    resizeDirection?: FrameResizeDirection;
}

export const Frame = forwardRef<HTMLDivElement, FrameProps>(
    ({ id, caption, onClose, closable, className, contentClassName, variant, defaultVariant, tintColor, resizeDirection = 'all', style, children, ...props }, ref) => {
        const cascadedVariant = useCascadedVariant('frame');
        const resolvedVariant = (variant ?? cascadedVariant ?? defaultVariant ?? '0') as never;
        const ownCascade = VARIANT_CASCADE_CONFIG['frame']?.[resolvedVariant as string];
        const resolvedTint = tintColor || frameTintColors[resolvedVariant as string];
        const overlayClassName = frameOverlayVariants({ variant: resolvedVariant });
        const tintStyle = useTintedVars(frameTintableVars[resolvedVariant as string], resolvedTint);
        const { frameRef, style: dragStyle, onPointerDown, onHeaderPointerDown } = useFrameDrag(id);
        const { style: resizeStyle, onScalerPointerDown, onScalerPointerMove, onScalerPointerUp, onScalerPointerCancel } = useFrameResize(id, frameRef, resizeDirection);

        const setRefs = (node: HTMLDivElement | null) => {
            frameRef.current = node;

            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
        }

        return (
            <div
                id={id}
                ref={setRefs}
                className={cn(frameVariants({ variant: resolvedVariant }), className)}
                style={{ ...style, ...tintStyle, ...dragStyle, ...resizeStyle }}
                onPointerDown={onPointerDown}
                {...props}
            >
                {overlayClassName && <div aria-hidden className={cn('pointer-events-none absolute inset-0', overlayClassName)} />}
                <VariantCascadeProvider map={ownCascade}>
                    <Header caption={caption} onClose={onClose} closable={closable} onPointerDown={onHeaderPointerDown} className="cursor-grab active:cursor-grabbing" />
                    <div className={cn('flex px-0.75 pt-px pb-1 size-full overflow-hidden', contentClassName)}>
                        <ContentArea>
                            {children}
                            {/* the scaler only exists on windows with WINDOW_PARAM_MOUSE_SCALING_TARGET
                                (65536) in their params — non-resizable windows draw no grip */}
                            {resizeDirection !== 'none' && <Scaler
                                tintColor={resolvedTint}
                                direction={resizeDirection}
                                onPointerDown={onScalerPointerDown}
                                onPointerMove={onScalerPointerMove}
                                onPointerUp={onScalerPointerUp}
                                onPointerCancel={onScalerPointerCancel}
                            />}
                        </ContentArea>
                    </div>
                </VariantCascadeProvider>
            </div>
        );
    }
);

Frame.displayName = 'Frame';
