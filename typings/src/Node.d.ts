import BaseNode, { BaseNodeOptions } from './base/Node';
export interface NodeOptions extends BaseNodeOptions {
    send: (shardId: number, packet: any, important: boolean) => any;
}
export default class Node extends BaseNode {
    send: (shardId: number, packet: any, important: boolean) => any;
    constructor(options: NodeOptions);
}
