import Conditions from '../../../../../resources/conditions';
import NetRegexes from '../../../../../resources/netregexes';
import { callOverlayHandler } from '../../../../../resources/overlay_plugin_api';
import { Responses } from '../../../../../resources/responses';
import ZoneId from '../../../../../resources/zone_id';
import { RaidbossData } from '../../../../../types/data';
import { PluginCombatantState } from '../../../../../types/event';
import { NetMatches } from '../../../../../types/net_matches';
import { TriggerSet } from '../../../../../types/trigger';

export interface Data extends RaidbossData {
  combatantData: PluginCombatantState[];
  torches: NetMatches['StartsUsing'][];
}

// TODO: Cthonic Vent is tricky; the initial cast is ~5s, but the next two explosions are ~2s.
//       There's no map events.  There's two Suneater adds that are added immediately before
//       the first 78F5 cast, and these same two combatants are used for the next two circles.
//       It seems like these adds that are doing damage are moved only at the last second.
//       It's possible there's some other hidden combatants moving around, or this is
//       just a case of missing some animation data in network logs that would tell us.
// TODO: how to detect/what to say for Blazing Footfalls knockbacks?

const triggerSet: TriggerSet<Data> = {
  zoneId: ZoneId.AbyssosTheEighthCircle,
  timelineFile: 'p8n.txt',
  initData: () => {
    return {
      combatantData: [],
      torches: [],
    };
  },
  triggers: [
    {
      id: 'P8N Genesis of Flame',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '7095', source: 'Hephaistos', capture: false }),
      response: Responses.aoe(),
    },
    {
      id: 'P8N Scorching Fang',
      type: 'StartsUsing',
      // has 78EC Sunforge castbar
      netRegex: NetRegexes.startsUsing({ id: '78EE', source: 'Hephaistos', capture: false }),
      response: Responses.goSides(),
    },
    {
      id: 'P8N Sun\'s Pinion',
      type: 'StartsUsing',
      // also has 78EC Sunforge castbar
      netRegex: NetRegexes.startsUsing({ id: '78EF', source: 'Hephaistos', capture: false }),
      // There are two casts, one for each side.
      suppressSeconds: 1,
      response: Responses.goMiddle(),
    },
    {
      id: 'P8N Flameviper',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '7908', source: 'Hephaistos' }),
      // This is a "line" tank cleave that leaves a bleed.
      response: Responses.tankCleave(),
    },
    {
      id: 'P8N Petrifaction',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '78FC', source: 'Gorgon', capture: false }),
      // There are two casts, one for each Gorgon.
      suppressSeconds: 1,
      response: Responses.lookAway(),
    },
    {
      id: 'P8N Gorgon Add',
      type: 'Ability',
      // We could use addedCombatant({ npcNameId: '11517' }), but this also fires on the
      // spawn of the lookaway eyeballs.
      netRegex: NetRegexes.ability({ id: '78FC', source: 'Gorgon', capture: false }),
      suppressSeconds: 1,
      response: Responses.killAdds(),
    },
    {
      id: 'P8N Ektothermos',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '78FE', source: 'Hephaistos', capture: false }),
      response: Responses.aoe(),
    },
    {
      id: 'P8N Abyssal Fires',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '78F1', source: 'Hephaistos', capture: false }),
      // There are four of these, one for each fire.
      suppressSeconds: 1,
      response: Responses.goMiddle(),
    },
    {
      id: 'P8N Rearing Rampage',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '79AB', source: 'Hephaistos', capture: false }),
      response: Responses.aoe(),
    },
    {
      id: 'P8N Volcanic Torches Cleanup',
      type: 'StartsUsing',
      // This always precedes 78F8 Torch Flame casts.
      netRegex: NetRegexes.startsUsing({ id: ['78F7', '71DE'], source: 'Hephaistos', capture: false }),
      run: (data) => data.torches = [],
    },
    {
      id: 'P8N Torch Flame Collect',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '78F8', source: 'Hephaistos' }),
      run: (data, matches) => data.torches.push(matches),
    },
    {
      id: 'P8N Torch Flame',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '78F8', source: 'Hephaistos', capture: false }),
      delaySeconds: 0.5,
      suppressSeconds: 1,
      promise: async (data: Data) => {
        data.combatantData = [];

        const ids = data.torches.map((torch) => parseInt(torch.sourceId, 16));
        data.combatantData = (await callOverlayHandler({
          call: 'getCombatants',
          ids: ids,
        })).combatants;
      },
      alertText: (data, _matches, output) => {
        if (data.combatantData.length === 0)
          return;

        const safe = {
          outsideNorth: true,
          insideNorth: true,
          outsideEast: true,
          insideEast: true,
          outsideSouth: true,
          insideSouth: true,
          outsideWest: true,
          insideWest: true,
        };

        // Loop through all torches, remove any rows/columns it intersects with
        // to find safe lanes.
        for (const torch of data.combatantData) {
          // x, y = 85, 95, 105, 115
          // map to ([0, 3], [0, 3])
          const x = Math.floor((torch.PosX - 85) / 10);
          const y = Math.floor((torch.PosY - 85) / 10);

          const xMap: { [tile: number]: keyof typeof safe } = {
            0: 'outsideWest',
            1: 'insideWest',
            2: 'insideEast',
            3: 'outsideEast',
          } as const;
          const xKey = xMap[x];
          if (xKey === undefined)
            return;
          delete safe[xKey];

          const yMap: { [tile: number]: keyof typeof safe } = {
            0: 'outsideNorth',
            1: 'insideNorth',
            2: 'insideSouth',
            3: 'outsideSouth',
          } as const;
          const yKey = yMap[y];
          if (yKey === undefined)
            return;
          delete safe[yKey];
        }

        const [safe0, safe1, safe2] = Object.keys(safe);

        // Unexpectedly zero safe zones.
        if (safe0 === undefined)
          return;
        // Not set up to handle more than two safe zones.
        if (safe2 !== undefined)
          return;
        if (safe1 === undefined)
          return output[safe0]!();

        const dir1 = output[safe0]!();
        const dir2 = output[safe1]!();
        return output.combo!({ dir1: dir1, dir2: dir2 });
      },
      outputStrings: {
        combo: {
          en: '${dir1} / ${dir2}',
          de: '${dir1} / ${dir2}',
          ja: '${dir1} / ${dir2}',
          ko: '${dir1} / ${dir2}',
        },
        outsideNorth: {
          en: 'Outside North',
          de: 'Im Norden raus',
          fr: 'Nord Extérieur',
          ja: '北、外側',
          ko: '북쪽, 바깥',
        },
        insideNorth: {
          en: 'Inside North',
          de: 'Im Norden rein',
          fr: 'Nord Intérieur',
          ja: '北、内側',
          ko: '북쪽, 안',
        },
        outsideEast: {
          en: 'Outside East',
          de: 'Im Osten raus',
          fr: 'Est Extérieur',
          ja: '東、外側',
          ko: '동쪽, 바깥',
        },
        insideEast: {
          en: 'Inside East',
          de: 'Im Osten rein',
          fr: 'Est Intérieur',
          ja: '東、内側',
          ko: '동쪽, 안',
        },
        outsideSouth: {
          en: 'Outside South',
          de: 'Im Süden raus',
          fr: 'Sud Extérieur',
          ja: '南、外側',
          ko: '남쪽, 바깥',
        },
        insideSouth: {
          en: 'Inside South',
          de: 'Im Süden rein',
          fr: 'Sud Intérieur',
          ja: '南、内側',
          ko: '남쪽, 안',
        },
        outsideWest: {
          en: 'Outside West',
          de: 'Im Westen raus',
          fr: 'Ouest Extérieur',
          ja: '西、外側',
          ko: '서쪽, 바깥',
        },
        insideWest: {
          en: 'Inside West',
          de: 'Im Westen rein',
          fr: 'Ouest Intérieur',
          ja: '西、内側',
          ko: '서쪽, 안',
        },
      },
    },
    {
      id: 'P8N Hemitheos\'s Flare',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '7907', source: 'Hephaistos' }),
      condition: Conditions.targetIsYou(),
      response: Responses.spread(),
    },
  ],
  timelineReplace: [
    {
      'locale': 'de',
      'missingTranslations': true,
      'replaceSync': {
        'Gorgon': 'Gorgone',
        '(?<!Illusory )Hephaistos': 'Hephaistos',
        'Illusory Hephaistos': 'Hephaistos-Phantom',
        'Suneater': 'Schlund des Phoinix',
      },
      'replaceText': {
        'Abyssal Fires': 'Feuersturm',
        'Blazing Footfalls': 'Fackelnde Füße',
        'Cthonic Vent': 'Lodernde Schlange',
        'Ektothermos': 'Ektothermos',
        'Flameviper': 'Flammenviper',
        'Fourfold Fires': 'Vierfacher Feuersturm',
        'Genesis of Flame': 'Flammende Genesis',
        'Gorgospit': 'Gorgons Speichel',
        'Hemitheos\'s Flare': 'Hemitheos-Flare',
        'Into the Shadows': 'In die Schatten',
        'Petrifaction': 'Versteinerung',
        'Quadrupedal Crush': 'Fußmalmer',
        'Quadrupedal Impact': 'Fußstampfer',
        'Rearing Rampage': 'Gleißender Amok',
        'Reforged Reflection': 'Mutierte Schöpfung',
        'Scorching Fang': 'Flammender Zahn',
        'Sun\'s Pinion': 'Versengte Schwinge',
        'Sunforge': 'Flammenreigen der Schöpfung',
        'Torch Flame': 'Glutfeuer',
        'Trailblaze': 'Flammender Pfad',
        'Volcanic Torches': 'Vulkanfackel',
      },
    },
    {
      'locale': 'fr',
      'missingTranslations': true,
      'replaceSync': {
        'Gorgon': 'gorgone',
        '(?<!Illusory )Hephaistos': 'Héphaïstos',
        'Illusory Hephaistos': 'spectre d\'Héphaïstos',
        'Suneater': 'serpent en flammes',
      },
      'replaceText': {
        'Abyssal Fires': 'Tempête enflammée',
        'Blazing Footfalls': 'Pas ardents',
        'Cthonic Vent': 'Serpents de flammes ascendants',
        'Ektothermos': 'Vague d\'énergie explosive',
        'Flameviper': 'Serpent-canon',
        'Fourfold Fires': 'Quadruple tempête enflammée',
        'Genesis of Flame': 'Flammes de la création',
        'Gorgospit': 'Crachat de gorgone',
        'Hemitheos\'s Flare': 'Brasier d\'hémithéos',
        'Into the Shadows': 'Dans l\'ombre',
        'Petrifaction': 'Pétrification',
        'Quadrupedal Crush': 'Écrasement quadrupède',
        'Quadrupedal Impact': 'Impact quadrupède',
        'Rearing Rampage': 'Cabrage ravageur',
        'Reforged Reflection': 'Mutation corporelle',
        'Scorching Fang': 'Crocs embrasants',
        'Sun\'s Pinion': 'Aile embrasante',
        'Sunforge': 'Bête enflammée',
        'Torch Flame': 'Explosion de braises',
        'Trailblaze': 'Traînée ardente',
        'Volcanic Torches': 'Boutefeux magiques',
      },
    },
    {
      'locale': 'ja',
      'missingTranslations': true,
      'replaceSync': {
        'Gorgon': 'ゴルゴン',
        '(?<!Illusory )Hephaistos': 'ヘファイストス',
        'Illusory Hephaistos': 'ヘファイストスの幻影',
        'Suneater': '炎霊蛇',
      },
      'replaceText': {
        'Abyssal Fires': '炎嵐',
        'Blazing Footfalls': 'ブレイジングフィート',
        'Cthonic Vent': '噴炎昇蛇',
        'Ektothermos': '爆炎波動',
        'Flameviper': '炎蛇砲',
        'Fourfold Fires': '四重炎嵐',
        'Genesis of Flame': '創世の真炎',
        'Gorgospit': 'ゴルゴンスピット',
        'Hemitheos\'s Flare': 'ヘーミテオス・フレア',
        'Into the Shadows': 'イントゥシャドウ',
        'Petrifaction': 'ペトリファクション',
        'Quadrupedal Crush': 'フィートクラッシュ',
        'Quadrupedal Impact': 'フィートインパクト',
        'Rearing Rampage': 'リアリングランページ',
        'Reforged Reflection': '変異創身',
        'Scorching Fang': '炎の牙',
        'Sun\'s Pinion': '炎の翼',
        'Sunforge': '創獣炎舞',
        'Torch Flame': '熾炎',
        'Trailblaze': 'トレイルブレイズ',
        'Volcanic Torches': '熾炎創火',
      },
    },
  ],
};

export default triggerSet;
