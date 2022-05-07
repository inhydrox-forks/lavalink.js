import BaseCluster from './base/Cluster';
import ClusterNode, { ClusterNodeOptions } from './ClusterNode';

export interface ClusterOptions {
  filter?: (node: ClusterNode, guildID: string) => boolean;
  send: (shardId: number, packet: any, important: boolean) => any;
  nodes?: ClusterNodeOptions[];
}

export default class Cluster extends BaseCluster {
  public filter: (node: ClusterNode, guildID: string) => boolean;
  public send: (shardId: number, packet: any, important: boolean) => any;

  constructor(options: ClusterOptions) {
    super(options.nodes);
    this.filter = options.filter || (() => true);
    this.send = options.send;
  }
}
