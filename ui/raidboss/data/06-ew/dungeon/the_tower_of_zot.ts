import NetRegexes from '../../../../../resources/netregexes';
import { Responses } from '../../../../../resources/responses';
import ZoneId from '../../../../../resources/zone_id';
import { RaidbossData } from '../../../../../types/data';
import { TriggerSet } from '../../../../../types/trigger';

export type Data = RaidbossData;

const triggerSet: TriggerSet<Data> = {
  zoneId: ZoneId.TheTowerOfZot,
  timelineFile: 'the_tower_of_zot.txt',
  triggers: [
    {
      id: 'ToZ Cinduruva Isitva Siddhi',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '62A9', source: 'Cinduruva', capture: true }),
      netRegexDe: NetRegexes.startsUsing({ id: '62A9', source: 'Mug', capture: true }),
      netRegexFr: NetRegexes.startsUsing({ id: '62A9', source: 'Maria', capture: true }),
      netRegexJa: NetRegexes.startsUsing({ id: '62A9', source: 'マグ', capture: true }),
      response: Responses.tankBuster(),
    },
    {
      id: 'ToZ Sanduruva Isitva Siddhi',
      type: 'StartsUsing',
      netRegex: NetRegexes.startsUsing({ id: '62C0', source: 'Sanduruva', capture: true }),
      netRegexDe: NetRegexes.startsUsing({ id: '62C0', source: 'Dug', capture: true }),
      netRegexFr: NetRegexes.startsUsing({ id: '62C0', source: 'Samanta', capture: true }),
      netRegexJa: NetRegexes.startsUsing({ id: '62C0', source: 'ドグ', capture: true }),
      response: Responses.tankBuster(),
    },
  ],
  timelineReplace: [
    {
      'locale': 'de',
      'replaceSync': {
        'Berserker Sphere': 'Tollwutssphäre',
        'Cinduruva': 'Mug',
        'Ingenuity\'s Ingress': 'Gelass der Finesse',
        'Minduruva': 'Rug',
        'Prosperity\'S Promise': 'Gelass des Reichtums',
        'Sanduruva': 'Dug',
        'Wisdom\'S Ward': 'Gelass der Weisheit',
      },
      'replaceText': {
        'Cinduruva': 'Mug',
        'Sanduruva': 'Dug',
        'Delayed Element III': 'Verzögertes Element-ga',
        'Delayed Thunder III': 'Verzögertes Blitzga',
        'Delta Attack': 'Delta-Attacke',
        'Delta Blizzard/Fire/Thunder III': 'DeltaEisga/Feuga/Blitzga',
        'Dhrupad': 'Dhrupad',
        'Explosive Force': 'Zündung',
        'Isitva Siddhi': 'Isitva Siddhi',
        'Manusya Berserk': 'Manusya-Tollwut',
        'Manusya Bio(?! )': 'Manusya-Bio',
        'Manusya Bio III': 'Manusya-Bioga',
        'Manusya Blizzard(?! )': 'Manusya-Eis',
        'Manusya Blizzard III': 'Manusya-Eisga',
        'Manusya Confuse': 'Manusya-Konfus',
        'Manusya Element III': 'Manusya Element-ga',
        'Manusya Faith': 'Manusya-Ener',
        'Manusya Fire(?! )': 'Manusya-Feuer',
        'Manusya Fire III': 'Manusya-Feuga',
        'Manusya Reflect': 'Manusya-Reflektion',
        'Manusya Stop': 'Manusya-Stopp',
        'Manusya Thunder(?! )': 'Manusya-Blitz',
        'Manusya Thunder III': 'Manusya-Blitzga',
        'Prakamya Siddhi': 'Prakamya Siddhi',
        'Prapti Siddhi': 'Prapti Siddhi',
        'Samsara': 'Samsara',
        'Sphere Shatter': 'Sphärensplitterung',
        'Transmute Thunder III': 'Manipuliertes Blitzga',
        'Transmute Element III': 'Manipuliertes Element-ga',
      },
    },
    {
      'locale': 'fr',
      'missingTranslations': true,
      'replaceSync': {
        'Berserker Sphere': 'sphère berserk',
        'Cinduruva': 'Maria',
        'Ingenuity\'s Ingress': 'Chambre de l\'habileté',
        'Minduruva': 'Anabella',
        'Prosperity\'S Promise': 'Chambre de la fortune',
        'Sanduruva': 'Samanta',
        'Wisdom\'S Ward': 'Chambre de la sagesse',
      },
      'replaceText': {
        'Delta Attack': 'Attaque Delta',
        'Dhrupad': 'Dhrupad',
        'Explosive Force': 'Détonation',
        'Isitva Siddhi': 'Isitva Siddhi',
        'Manusya Berserk': 'Berserk manusya',
        'Manusya Bio(?! )': 'Bactérie manusya',
        'Manusya Bio III': 'Méga Bactérie manusya',
        'Manusya Blizzard(?! )': 'Glace manusya',
        'Manusya Blizzard III': 'Méga Glace manusya',
        'Manusya Confuse': 'Confusion manusya',
        'Manusya Faith': 'Foi manusya',
        'Manusya Fire(?! )': 'Feu manusya',
        'Manusya Fire III': 'Méga Feu manusya',
        'Manusya Reflect': 'Reflet manusya',
        'Manusya Stop': 'Stop manusya',
        'Manusya Thunder(?! )': 'Foudre manusya',
        'Manusya Thunder III': 'Méga Foudre manusya',
        'Prakamya Siddhi': 'Prakamya Siddhi',
        'Prapti Siddhi': 'Prapti Siddhi',
        'Samsara': 'Samsara',
        'Sphere Shatter': 'Rupture',
        'Transmute Thunder III': 'Manipulation magique : Méga Foudre',
      },
    },
    {
      'locale': 'ja',
      'missingTranslations': true,
      'replaceSync': {
        'Berserker Sphere': 'バーサクスフィア',
        'Cinduruva': 'マグ',
        'Ingenuity\'s Ingress': '技巧の間',
        'Minduruva': 'ラグ',
        'Prosperity\'S Promise': '富の間',
        'Sanduruva': 'ドグ',
        'Wisdom\'S Ward': '知恵の間',
      },
      'replaceText': {
        'Delta Attack': 'デルタアタック',
        'Dhrupad': 'ドゥルパド',
        'Explosive Force': '起爆',
        'Isitva Siddhi': 'イシトヴァシッディ',
        'Manusya Berserk': 'マヌシャ・バーサク',
        'Manusya Bio(?! )': 'マヌシャ・バイオ',
        'Manusya Bio III': 'マヌシャ・バイオガ',
        'Manusya Blizzard(?! )': 'マヌシャ・ブリザド',
        'Manusya Blizzard III': 'マヌシャ・ブリザガ',
        'Manusya Confuse': 'マヌシャ・コンフュ',
        'Manusya Faith': 'マヌシャ・フェイス',
        'Manusya Fire(?! )': 'マヌシャ・ファイア',
        'Manusya Fire III': 'マヌシャ・ファイガ',
        'Manusya Reflect': 'マヌシャ・リフレク',
        'Manusya Stop': 'マヌシャ・ストップ',
        'Manusya Thunder(?! )': 'マヌシャ・サンダー',
        'Manusya Thunder III': 'マヌシャ・サンダガ',
        'Prakamya Siddhi': 'プラカーミャシッディ',
        'Prapti Siddhi': 'プラプティシッディ',
        'Samsara': 'サンサーラ',
        'Sphere Shatter': '破裂',
        'Transmute Thunder III': '魔力操作：サンダガ',
      },
    },
  ],
};

export default triggerSet;
