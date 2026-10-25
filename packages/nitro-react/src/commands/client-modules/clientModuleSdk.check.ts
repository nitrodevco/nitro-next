/**
 * Not Flash's: the client module SDK (`packages/client-module-sdk`) types the API for module authors
 * without the client's internals. This file only type-checks: it fails `tsc` when the API here and
 * the SDK's differ, so a member added to or changed in `ClientModuleApi` is added to the SDK in the
 * same change. Each part of the API must be the same both ways, except where the SDK types less than
 * the client takes (theme props, template patches and bindings): there the client must take every
 * field the SDK lets a module pass, and give back what the SDK says it does.
 */
import type * as Sdk from '@nitrodevco/client-module-sdk/types';
import type { TemplateBinding, TemplateContext, TemplatePatchOp, TemplatePatchReport, TemplateWindows } from '@nitrodevco/nitro-theme';
import type { ComponentProps } from 'react';

import type * as Theme from '#base/theme';

import type { ClientModuleApi } from './ClientModuleApi';

type Same<A, B> = [ A ] extends [ B ] ? ([ B ] extends [ A ] ? true : false) : false;
type SameKeys<A, B> = Same<keyof A, keyof B>;
type Assert<T extends true> = T;

type Parts = Exclude<keyof ClientModuleApi, 'libs' | 'templates'>;

/** Every part of the API, member by member, and no part the SDK lacks or has extra. */
export type ClientModuleSdkConformance = [
    Assert<SameKeys<ClientModuleApi, Sdk.ClientModuleApi>>,
    Assert<Same<{ [P in Parts]: SameKeys<ClientModuleApi[P], Sdk.ClientModuleApi[P]> }, { [P in Parts]: true }>>,
    Assert<Same<{ [P in Parts]: Same<ClientModuleApi[P], Sdk.ClientModuleApi[P]> }, { [P in Parts]: true }>>,
    Assert<SameKeys<ClientModuleApi['templates'], Sdk.ClientModuleApi['templates']>>,
    Assert<Sdk.ClientModuleTemplatePatchOp extends TemplatePatchOp ? true : false>,
    Assert<Sdk.ClientModuleTemplateBinding extends TemplateBinding ? true : false>,
    Assert<Same<TemplatePatchReport, Sdk.ClientModuleTemplatePatchReport>>,
    Assert<Same<TemplateContext, Sdk.ClientModuleTemplateContext>>,
    Assert<TemplateWindows extends Sdk.ClientModuleTemplateWindows ? true : false>,
    Assert<SameKeys<ClientModuleApi['libs'], Sdk.ClientModuleApi['libs']>>,
    Assert<Same<ClientModuleApi['libs']['react'], Sdk.ClientModuleLibraries['react']>>,
    Assert<Sdk.ClientModuleBoxProps extends ComponentProps<typeof Theme.Box> ? true : false>,
    Assert<Sdk.ClientModuleButtonProps extends ComponentProps<typeof Theme.Button> ? true : false>,
    Assert<Sdk.ClientModuleFrameProps extends ComponentProps<typeof Theme.Frame> ? true : false>,
    Assert<Sdk.ClientModuleThemeTextProps extends ComponentProps<typeof Theme.ThemeText> ? true : false>,
    Assert<Sdk.ClientModuleTemplateWindowProps extends ComponentProps<typeof Theme.TemplateWindow> ? true : false>,
];
