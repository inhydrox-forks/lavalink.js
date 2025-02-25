/// <reference types="node" />
import BaseNode, { VoiceServerUpdate, VoiceStateUpdate } from '../base/Node';
import { Track } from './Http';
import { EventEmitter } from 'events';
export declare enum Status {
    INSTANTIATED = 0,
    PLAYING = 1,
    PAUSED = 2,
    ENDED = 3,
    ERRORED = 4,
    STUCK = 5,
    UNKNOWN = 6
}
export declare enum EventType {
    TRACK_START = "TrackStartEvent",
    TRACK_END = "TrackEndEvent",
    TRACK_EXCEPTION = "TrackExceptionEvent",
    TRACK_STUCK = "TrackStuckEvent",
    WEBSOCKET_CLOSED = "WebSocketClosedEvent"
}
export interface PlayerOptions {
    start?: number;
    end?: number;
    noReplace?: boolean;
    pause?: boolean;
}
export interface FilterOptions {
    volume?: number;
    equalizer?: EqualizerBand[];
    karaoke?: KaraokeOptions;
    timescale?: TimescaleOptions;
    tremolo?: FrequencyDepthOptions;
    vibrato?: FrequencyDepthOptions;
    rotation?: RotationOptions;
    distortion?: DistortionOptions;
    channelMix?: ChannelMixOptions;
    lowPass?: LowPassOptions;
}
export interface RotationOptions {
    rotationHz?: number;
}
export interface DistortionOptions {
    sinOffset?: number;
    sinScale?: number;
    cosOffset?: number;
    cosScale?: number;
    tanOffset?: number;
    tanScale?: number;
    offset?: number;
    scale?: number;
}
export interface ChannelMixOptions {
    leftToLeft: number;
    leftToRight: number;
    rightToLeft: number;
    rightToRight: number;
}
export interface LowPassOptions {
    smoothing: number;
}
export interface KaraokeOptions {
    level?: number;
    monoLevel?: number;
    filterBand?: number;
    filterWidth?: number;
}
export interface TimescaleOptions {
    speed?: number;
    pitch?: number;
    rate?: number;
}
export interface FrequencyDepthOptions {
    frequency?: number;
    depth?: number;
}
export interface EqualizerBand {
    band: number;
    gain: number;
}
export interface JoinOptions {
    mute?: boolean;
    deaf?: boolean;
}
export default class Player<T extends BaseNode = BaseNode> extends EventEmitter {
    readonly node: T;
    guildID: string;
    shardId: number | null;
    status: Status;
    constructor(node: T, guildID: string);
    get playing(): boolean;
    get paused(): boolean;
    get voiceState(): VoiceStateUpdate | undefined;
    get voiceServer(): VoiceServerUpdate | undefined;
    moveTo(node: BaseNode): Promise<void>;
    leave(): Promise<any>;
    setShard(shardId: number): void;
    join(channelId: string | null, { deaf, mute }?: JoinOptions): Promise<any>;
    play(track: string | Track, { start, end, noReplace, pause }?: PlayerOptions): Promise<void>;
    setVolume(vol: number): Promise<void>;
    setEqualizer(bands: EqualizerBand[]): Promise<void>;
    setFilters(options: FilterOptions): Promise<void>;
    seek(position: number): Promise<void>;
    pause(paused?: boolean): Promise<void>;
    stop(): Promise<void>;
    destroy(): Promise<void>;
    voiceUpdate(sessionId: string, event: VoiceServerUpdate): Promise<void>;
    send(op: string, d?: object): Promise<void>;
}
