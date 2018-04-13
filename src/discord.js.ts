import { Guild, Client } from 'discord.js';
import Player from './core/Player';
import Lavalink, { ClientOptions } from './core/Client';

declare module 'discord.js' {
  interface Client {
    lavalink: Lavalink;
  }

  interface Guild {
    player: Player;
  }
}

export default (client: Client, options: ClientOptions) => {
  client.lavalink = new class extends Lavalink {
    constructor() {
      super(options);

      client.on('raw', (pk: any) => {
        if (pk.t === 'VOICE_STATE_UPDATE') this.voiceStateUpdate(pk.d);
        if (pk.t === 'VOICE_SERVER_UPDATE') this.voiceServerUpdate(pk.d);
      });
    }

    public send(guildID: string, pk: any) {
      if (client.guilds.has(guildID)) return (client as any).ws.send(pk);
      return Promise.resolve();
    }
  };

  Object.defineProperty(Guild.prototype, 'player', {
    get(this: Guild) {
      return this.client.lavalink.players.get(this.id);
    },
  });
}
