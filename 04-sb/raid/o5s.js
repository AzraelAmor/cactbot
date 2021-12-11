// O5S - Sigmascape 1.0 Savage
Options.Triggers.push({
    zoneId: ZoneId.SigmascapeV10Savage,
    timelineFile: 'o5s.txt',
    resetWhenOutOfCombat: false,
    triggers: [
        {
            id: 'O5S Stop Combat',
            type: 'RemovedCombatant',
            netRegex: NetRegexes.removingCombatant({ name: 'Phantom Train', capture: false }),
            netRegexDe: NetRegexes.removingCombatant({ name: 'Phantomzug', capture: false }),
            netRegexFr: NetRegexes.removingCombatant({ name: 'Train Fantôme', capture: false }),
            netRegexJa: NetRegexes.removingCombatant({ name: '魔列車', capture: false }),
            netRegexCn: NetRegexes.removingCombatant({ name: '魔列车', capture: false }),
            netRegexKo: NetRegexes.removingCombatant({ name: '마열차', capture: false }),
            run: (data) => data.StopCombat(),
        },
        {
            id: 'O5S Doom Strike',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '28B1', source: 'Phantom Train' }),
            netRegexDe: NetRegexes.startsUsing({ id: '28B1', source: 'Phantomzug' }),
            netRegexFr: NetRegexes.startsUsing({ id: '28B1', source: 'Train Fantôme' }),
            netRegexJa: NetRegexes.startsUsing({ id: '28B1', source: '魔列車' }),
            netRegexCn: NetRegexes.startsUsing({ id: '28B1', source: '魔列车' }),
            netRegexKo: NetRegexes.startsUsing({ id: '28B1', source: '마열차' }),
            response: Responses.tankBuster(),
        },
        {
            id: 'O5S Head On',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '28A4', source: 'Phantom Train', capture: false }),
            netRegexDe: NetRegexes.startsUsing({ id: '28A4', source: 'Phantomzug', capture: false }),
            netRegexFr: NetRegexes.startsUsing({ id: '28A4', source: 'Train Fantôme', capture: false }),
            netRegexJa: NetRegexes.startsUsing({ id: '28A4', source: '魔列車', capture: false }),
            netRegexCn: NetRegexes.startsUsing({ id: '28A4', source: '魔列车', capture: false }),
            netRegexKo: NetRegexes.startsUsing({ id: '28A4', source: '마열차', capture: false }),
            response: Responses.getOut(),
        },
        {
            id: 'O5S Diabolic Headlamp',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '28B2', source: 'Phantom Train', capture: false }),
            netRegexDe: NetRegexes.startsUsing({ id: '28B2', source: 'Phantomzug', capture: false }),
            netRegexFr: NetRegexes.startsUsing({ id: '28B2', source: 'Train Fantôme', capture: false }),
            netRegexJa: NetRegexes.startsUsing({ id: '28B2', source: '魔列車', capture: false }),
            netRegexCn: NetRegexes.startsUsing({ id: '28B2', source: '魔列车', capture: false }),
            netRegexKo: NetRegexes.startsUsing({ id: '28B2', source: '마열차', capture: false }),
            response: Responses.stackMiddle(),
        },
        {
            id: 'O5S Diabolic Light',
            type: 'HeadMarker',
            netRegex: NetRegexes.headMarker({ id: '0001' }),
            condition: Conditions.targetIsYou(),
            infoText: (_data, _matches, output) => output.text(),
            outputStrings: {
                text: {
                    en: 'Light',
                    de: 'Licht',
                    fr: 'Lumière',
                    ja: '魔界の光',
                    cn: '光点名',
                    ko: '빛장판',
                },
            },
        },
        {
            id: 'O5S Diabolic Wind',
            type: 'HeadMarker',
            netRegex: NetRegexes.headMarker({ id: '0046' }),
            condition: Conditions.targetIsYou(),
            infoText: (_data, _matches, output) => output.text(),
            outputStrings: {
                text: {
                    en: 'Wind',
                    de: 'Wind',
                    fr: 'Vent',
                    ja: '魔界の風',
                    cn: '圆圈点名',
                    ko: '초록징',
                },
            },
        },
        {
            id: 'O5S Remorse',
            type: 'AddedCombatant',
            netRegex: NetRegexes.addedCombatant({ name: 'Remorse', capture: false }),
            netRegexDe: NetRegexes.addedCombatant({ name: 'Melancholisch(?:e|er|es|en) Geist', capture: false }),
            netRegexFr: NetRegexes.addedCombatant({ name: 'Fantôme Mélancolique', capture: false }),
            netRegexJa: NetRegexes.addedCombatant({ name: '未練のゴースト', capture: false }),
            netRegexCn: NetRegexes.addedCombatant({ name: '留恋幽灵', capture: false }),
            netRegexKo: NetRegexes.addedCombatant({ name: '미련이 남은 유령', capture: false }),
            response: Responses.knockback(),
        },
    ],
    timelineReplace: [
        {
            'locale': 'de',
            'replaceSync': {
                'Agony': 'Gequälter Geist',
                'Malice': 'Boshaftigkeit',
                'Phantom Train': 'Phantomzug',
                'Remorse': 'melancholisch(?:e|er|es|en) Geist',
                'Wroth Ghost': 'erzürnt(?:e|er|es|en) Geist',
            },
            'replaceText': {
                ' Ghosts': ' Geister',
                'Acid Rain': 'Säureregen',
                'Add Wave': 'Add Welle',
                'All In The Mind': 'Psychokinese',
                'Crossing Whistle': 'Kreuzend Pfeife',
                'Diabolic Headlamp': 'Diabolische Leuchte',
                'Diabolic Light': 'Diabolisches Licht',
                'Diabolic Wind': 'Diabolischer Wind',
                'Doom Strike': 'Vernichtungsschlag',
                'Encumber': 'Wegsperrung',
                'Ghosts spawn': 'Geister erscheinen',
                'Head On': 'Frontalangriff',
                'Knockback Whistle': 'Rückstoß Pfeife',
                'Saintly Beam': 'Heiligenstrahl',
                'Tether Whistle': 'Verfolger Pfeife',
            },
        },
        {
            'locale': 'fr',
            'missingTranslations': true,
            'replaceSync': {
                'Agony': 'Fantôme Souffrant',
                'Malice': 'Malveillance',
                'Phantom Train': 'train fantôme',
                'Remorse': 'fantôme mélancolique',
                'Wroth Ghost': 'fantôme furieux',
            },
            'replaceText': {
                ' Ghosts': ' Fantômes',
                'Acid Rain': 'Pluie acide',
                'Add Wave': 'Vague d\'Adds',
                'All In The Mind': 'Force de volonté',
                'Crossing Whistle': 'Sifflet traversée',
                'Diabolic Headlamp': 'Phare diabolique',
                'Diabolic Light': 'Lueur diabolique',
                'Diabolic Wind': 'Vent diabolique',
                'Doom Strike': 'Frappe létale',
                'Encumber': 'Encombrement',
                'Ghosts spawn': 'Pop des Fantômes',
                'Head On': 'Plein fouet',
                'Saintly Beam': 'Faisceaux sacrés',
                'Tether Whistle': 'Sifflet liens',
            },
        },
        {
            'locale': 'ja',
            'replaceSync': {
                'Agony': '苦悶のゴースト',
                'Malice': '怨念',
                'Phantom Train': '魔列車',
                'Remorse': '未練のゴースト',
                'Wroth Ghost': 'ロスゴースト',
            },
            'replaceText': {
                ' Ghosts': ' ゴースト',
                'Acid Rain': '酸性雨',
                'Add Wave': '雑魚いっぱい',
                'All In The Mind': '念力',
                'Crossing Whistle': '魔界の汽笛: 通路ゴースト',
                'Diabolic Headlamp': '魔界の前照灯',
                'Diabolic Light': '魔界の光',
                'Diabolic Wind': '魔界の風',
                'Doom Strike': '魔霊撃',
                'Encumber': '進路妨害',
                'Ghosts spawn': '雑魚: ゴースト',
                'Head On': '追突',
                'Knockback Whistle': '魔界の汽笛: ノックバック',
                'Saintly Beam': 'セイントビーム',
                'Tether Whistle': '魔界の汽笛: 線繋ぐゴースト',
            },
        },
        {
            'locale': 'cn',
            'replaceSync': {
                'Agony': '苦闷幽灵',
                'Malice': '怨念',
                'Phantom Train': '魔列车',
                'Remorse': '留恋幽灵',
                'Wroth Ghost': '怒灵',
            },
            'replaceText': {
                ' Ghosts': ' 幽灵',
                'Acid Rain': '酸雨',
                'Add Wave': '一波小怪',
                'All In The Mind': '念力',
                'Crossing Whistle': '交叉汽笛',
                'Diabolic Headlamp': '魔界前照灯',
                'Diabolic Light': '魔界光',
                'Diabolic Wind': '魔界风',
                'Doom Strike': '魔灵击',
                'Encumber': '挡路',
                'Ghosts spawn': '幽灵出现',
                'Head On': '追尾',
                'Knockback Whistle': '击退汽笛',
                'Saintly Beam': '圣光射线',
                'Tether Whistle': '连线汽笛',
            },
        },
        {
            'locale': 'ko',
            'replaceSync': {
                'Agony': '고뇌하는 유령',
                'Malice': '원한',
                'Phantom Train': '마열차',
                'Remorse': '미련이 남은 유령',
                'Wroth Ghost': '격노하는 유령',
            },
            'replaceText': {
                'DPS': '딜러',
                'T/H': '탱/힐',
                ' Ghosts': ' 유령',
                'Acid Rain': '산성비',
                'Add Wave': '쫄 소환',
                'All In The Mind': '염력',
                'Crossing Whistle': '행진 유령',
                'Diabolic Headlamp': '마계의 전조등',
                'Diabolic Light': '마계의 빛',
                'Diabolic Wind': '마계의 바람',
                'Doom Strike': '마령격',
                'Encumber': '진로 방해',
                'Ghosts spawn': '유령 소환',
                'Head On': '추돌',
                'Knockback Whistle': '넉백 유령',
                'Saintly Beam': '성스러운 광선',
                'Tether Whistle': '선 연결 유령',
            },
        },
    ],
});
