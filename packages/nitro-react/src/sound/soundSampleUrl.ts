import { GetConfigValue } from '@nitrodevco/nitro-api';

/**
 * Where a numbered sample is downloaded from - the url `FurniSamplePlaybackManager.loadSample` and
 * `TraxSampleManager.loadSample` both build: `flash.dynamic.download.url` followed by
 * `flash.dynamic.download.samples.template`, whose `%typeid%` is the sample's number. The furni
 * sound blocks and the trax songs draw on the same `sound_machine_sample_<n>.mp3` files.
 */
export const getSoundSampleUrl = (sampleId: number): string => {
    const base = GetConfigValue<string>('flash.dynamic.download.url') ?? '';
    const template = GetConfigValue<string>('flash.dynamic.download.samples.template') ?? '';

    return (base + template).replace(/%typeid%/, sampleId.toString());
};
