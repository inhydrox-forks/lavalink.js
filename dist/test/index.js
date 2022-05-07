"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const util_1 = require("util");
const gateway_1 = require("@spectacles/gateway");
if (!process.env.TOKEN)
    throw new Error('token not provided');
if (!process.env.USER_ID)
    throw new Error('user id not provided');
const gateway = new gateway_1.Client(process.env.TOKEN);
const client = new src_1.Node({
    password: 'youshallnotpass',
    userID: process.env.USER_ID,
    hosts: {
        rest: 'http://localhost:8081',
        ws: 'ws://localhost:8081',
    },
    send(guild, packet) {
        const conn = gateway.connections.get(0);
        if (conn)
            return conn.send(packet);
        throw new Error('no gateway connection available');
    },
});
gateway.on('READY', console.log);
client.on('event', console.log);
gateway.on('MESSAGE_CREATE', async (shard, m) => {
    console.log(m.content);
    const player = client.players.get('281630801660215296');
    if (m.content === 'join')
        await player.join('281630801660215297');
    if (m.content === 'leave')
        await player.leave();
    if (m.content === 'pause')
        await player.pause();
    if (m.content === 'decode') {
        const trackResponse = await client.load('https://www.youtube.com/playlist?list=PLe8jmEHFkvsaDOOWcREvkgFoj6MD0pQ67');
        const decoded = await client.decode(trackResponse.tracks.map(t => t.track));
        console.log(decoded.every((e, i) => typeof e === 'object'));
    }
    if (m.content === 'play') {
        const trackResponse = await client.load('https://www.youtube.com/playlist?list=PLe8jmEHFkvsaDOOWcREvkgFoj6MD0pQ67');
        client.players.get('281630801660215296').play(trackResponse.tracks[0]);
    }
    if (m.content.startsWith('eval'))
        console.log(eval(m.content.slice(4).trim()));
    if (m.content === 'reconnect') {
        const conn = gateway.connections.get(0);
        if (conn)
            conn.reconnect();
    }
    console.log('finished');
});
gateway.on('VOICE_STATE_UPDATE', (shard, s) => client.voiceStateUpdate(s));
gateway.on('VOICE_SERVER_UPDATE', (shard, s) => client.voiceServerUpdate(s));
gateway.on('close', console.log);
gateway.on('error', (shard, err) => console.log((0, util_1.inspect)(err, { depth: 2 })));
let i = 0;
client.on('error', e => console.error(i++, e));
client.on('open', () => console.log('ll open'));
client.on('close', () => console.log('ll close'));
(async () => {
    try {
        await gateway.spawn();
    }
    catch (e) {
        console.error(e);
    }
})();
//# sourceMappingURL=index.js.map