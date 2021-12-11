Options.Triggers.push({
    zoneId: ZoneId.Vanaspati,
    timelineFile: 'vanaspati.txt',
    triggers: [
        {
            id: 'Vanaspati Terminus Snatcher Note of Despair',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '6238', source: 'Terminus Snatcher', capture: false }),
            netRegexDe: NetRegexes.startsUsing({ id: '6238', source: 'Terminus-Häscher', capture: false }),
            netRegexFr: NetRegexes.startsUsing({ id: '6238', source: 'Pillard De L\'Apocalypse', capture: false }),
            netRegexJa: NetRegexes.startsUsing({ id: '6238', source: 'ターミナス・スナッチャー', capture: false }),
            response: Responses.aoe(),
        },
        {
            id: 'Vanaspati Terminus Snatcher Mouth Off',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '6231', source: 'Terminus Snatcher', capture: false }),
            netRegexDe: NetRegexes.startsUsing({ id: '6231', source: 'Terminus-Häscher', capture: false }),
            netRegexFr: NetRegexes.startsUsing({ id: '6231', source: 'Pillard De L\'Apocalypse', capture: false }),
            netRegexJa: NetRegexes.startsUsing({ id: '6231', source: 'ターミナス・スナッチャー', capture: false }),
            infoText: (_data, _matches, output) => output.text(),
            outputStrings: {
                text: {
                    en: 'Go To Silent Mouth',
                    de: 'Geh zum geschlossenen Mund',
                    fr: 'Allez vers une bouche silencieuse',
                    ko: '말이 없는 입 쪽으로',
                },
            },
        },
        {
            id: 'Vanaspati Terminus Snatcher Last Gasp',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '6235', source: 'Terminus Snatcher' }),
            netRegexDe: NetRegexes.startsUsing({ id: '6235', source: 'Terminus-Häscher' }),
            netRegexFr: NetRegexes.startsUsing({ id: '6235', source: 'Pillard De L\'Apocalypse' }),
            netRegexJa: NetRegexes.startsUsing({ id: '6235', source: 'ターミナス・スナッチャー' }),
            response: Responses.tankBuster(),
        },
        {
            id: 'Vanaspati Terminus Snatcher What Is Right',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '6233', source: 'Terminus Snatcher', capture: false }),
            netRegexDe: NetRegexes.startsUsing({ id: '6233', source: 'Terminus-Häscher', capture: false }),
            netRegexFr: NetRegexes.startsUsing({ id: '6233', source: 'Pillard De L\'Apocalypse', capture: false }),
            netRegexJa: NetRegexes.startsUsing({ id: '6233', source: 'ターミナス・スナッチャー', capture: false }),
            response: Responses.goLeft(),
        },
        {
            id: 'Vanaspati Terminus Snatcher What Is Left',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '6234', source: 'Terminus Snatcher', capture: false }),
            netRegexDe: NetRegexes.startsUsing({ id: '6234', source: 'Terminus-Häscher', capture: false }),
            netRegexFr: NetRegexes.startsUsing({ id: '6234', source: 'Pillard De L\'Apocalypse', capture: false }),
            netRegexJa: NetRegexes.startsUsing({ id: '6234', source: 'ターミナス・スナッチャー', capture: false }),
            response: Responses.goRight(),
        },
        {
            id: 'Vanaspati Terminus Snatcher Wallow',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '6236', source: 'Terminus Snatcher' }),
            netRegexDe: NetRegexes.startsUsing({ id: '6236', source: 'Terminus-Häscher' }),
            netRegexFr: NetRegexes.startsUsing({ id: '6236', source: 'Pillard De L\'Apocalypse' }),
            netRegexJa: NetRegexes.startsUsing({ id: '6236', source: 'ターミナス・スナッチャー' }),
            condition: Conditions.targetIsYou(),
            response: Responses.spread(),
        },
        {
            id: 'Vanaspati Terminus Wrecker Meaningless Destruction',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '6241', source: 'Terminus Wrecker', capture: false }),
            netRegexDe: NetRegexes.startsUsing({ id: '6241', source: 'Terminus-Verwüster', capture: false }),
            netRegexFr: NetRegexes.startsUsing({ id: '6241', source: 'Destructeur De L\'Apocalypse', capture: false }),
            netRegexJa: NetRegexes.startsUsing({ id: '6241', source: 'ターミナス・レッカー', capture: false }),
            response: Responses.aoe(),
        },
        {
            id: 'Vanaspati Terminus Wrecker Total Wreck',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '6242', source: 'Terminus Wrecker' }),
            netRegexDe: NetRegexes.startsUsing({ id: '6242', source: 'Terminus-Verwüster' }),
            netRegexFr: NetRegexes.startsUsing({ id: '6242', source: 'Destructeur De L\'Apocalypse' }),
            netRegexJa: NetRegexes.startsUsing({ id: '6242', source: 'ターミナス・レッカー' }),
            response: Responses.tankBuster(),
        },
        {
            id: 'Vanaspati Terminus Wrecker Aether Spray Knockback',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '623C', source: 'Terminus Wrecker' }),
            netRegexDe: NetRegexes.startsUsing({ id: '623C', source: 'Terminus-Verwüster' }),
            netRegexFr: NetRegexes.startsUsing({ id: '623C', source: 'Destructeur De L\'Apocalypse' }),
            netRegexJa: NetRegexes.startsUsing({ id: '623C', source: 'ターミナス・レッカー' }),
            delaySeconds: (_data, matches) => parseFloat(matches.castTime) - 5,
            response: Responses.knockback(),
        },
        {
            id: 'Vanaspati Terminus Wrecker Aether Spray Bubble',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '623B', source: 'Terminus Wrecker', capture: false }),
            netRegexDe: NetRegexes.startsUsing({ id: '623B', source: 'Terminus-Verwüster', capture: false }),
            netRegexFr: NetRegexes.startsUsing({ id: '623B', source: 'Destructeur De L\'Apocalypse', capture: false }),
            netRegexJa: NetRegexes.startsUsing({ id: '623B', source: 'ターミナス・レッカー', capture: false }),
            infoText: (_data, _matches, output) => output.text(),
            outputStrings: {
                text: {
                    en: 'Get In Bubble',
                    de: 'Geh in die Blase',
                    fr: 'Allez dans une bulle',
                    ko: '구슬 안에 들어가기',
                },
            },
        },
        {
            id: 'Vanaspati Terminus Twitcher Double Hex Eye',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '6C21', source: 'Terminus Twitcher', capture: false }),
            netRegexDe: NetRegexes.startsUsing({ id: '6C21', source: 'Terminus-Zerrer', capture: false }),
            netRegexFr: NetRegexes.startsUsing({ id: '6C21', source: 'Picoreur De L\'Apocalypse', capture: false }),
            netRegexJa: NetRegexes.startsUsing({ id: '6C21', source: 'ターミナス・ツイッチャー', capture: false }),
            response: Responses.lookAway(),
        },
        {
            id: 'Vanaspati Svarbhanu Cosmic Kiss Spread',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '6250', source: 'Svarbhanu' }),
            netRegexDe: NetRegexes.startsUsing({ id: '6250', source: 'Svarbhanu' }),
            netRegexFr: NetRegexes.startsUsing({ id: '6250', source: 'Svarbhanu' }),
            netRegexJa: NetRegexes.startsUsing({ id: '6250', source: 'スヴァーバーヌ' }),
            condition: Conditions.targetIsYou(),
            response: Responses.spread(),
        },
        {
            id: 'Vanaspati Svarbhanu Gnashing Of Teeth',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '6253', source: 'Svarbhanu' }),
            netRegexDe: NetRegexes.startsUsing({ id: '6253', source: 'Svarbhanu' }),
            netRegexFr: NetRegexes.startsUsing({ id: '6253', source: 'Svarbhanu' }),
            netRegexJa: NetRegexes.startsUsing({ id: '6253', source: 'スヴァーバーヌ' }),
            response: Responses.tankBuster(),
        },
        {
            id: 'Vanaspati Svarbhanu Aetherial Disruption',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({ id: '6248', source: 'Svarbhanu', capture: false }),
            netRegexDe: NetRegexes.startsUsing({ id: '6248', source: 'Svarbhanu', capture: false }),
            netRegexFr: NetRegexes.startsUsing({ id: '6248', source: 'Svarbhanu', capture: false }),
            netRegexJa: NetRegexes.startsUsing({ id: '6248', source: 'スヴァーバーヌ', capture: false }),
            infoText: (_data, _matches, output) => output.text(),
            outputStrings: {
                text: {
                    en: 'Go To Opposite Color',
                    de: 'Geh zur andere Farbe',
                    fr: 'Allez à la couleur opposée',
                    ko: '화면과 색이 다른 바닥으로',
                },
            },
        },
    ],
    timelineReplace: [
        {
            'locale': 'en',
            'replaceText': {
                'What Is Left/What Is Right': 'What Is Left/Right',
            },
        },
        {
            'locale': 'de',
            'replaceSync': {
                'Devatagara': 'Devatagara',
                'Insight': 'Vor dem Haus des Weisen',
                'Svarbhanu': 'Svarbhanu',
                'Terminus Snatcher': 'Terminus-Häscher',
                'Terminus Wrecker': 'Terminus-Verwüster',
                'Trnakiya': 'Bucht im Meer der Bäume',
            },
            'replaceText': {
                '\\(Knockback\\)': '(Rückstoß)',
                '\\(Spread\\)': '(Verteilen)',
                '--meteor': '--Meteor',
                'Aether Siphon': 'Elementarer Sog',
                'Aether Spray': 'Elementarer Auswurf',
                'Aetherial Disruption': 'Erdwallung',
                'Chaotic Pulse': 'Erdlabung',
                'Chaotic Undercurrent': 'Venenströme',
                'Cosmic Kiss': 'Einschlag',
                'Crumbling Sky': 'Meteorruf',
                'Flames of Decay': 'Lohen des Leids',
                'Gnashing of Teeth': 'Verbeißen',
                'Last Gasp': 'Verzweifeltes Flehen',
                'Lost Hope': 'Klage der Ohnmächtigen',
                'Meaningless Destruction': 'Rasender Kummer',
                'Mouth Off': 'Reden ist Silber',
                'Note of Despair': 'Klage der Hoffnungslosen',
                'Poison Heart': 'Toxischer Ausfluss',
                'Total Wreck': 'Blinde Zerstörung',
                'Unholy Water': 'Wasserfolter',
                'Vitriol': 'Schweigen ist Gold',
                'Wallow': 'Schluchzen',
                'What Is Left': 'Schändliche Linke',
                'What Is Right': 'Schändliche Rechte',
            },
        },
        {
            'locale': 'fr',
            'replaceSync': {
                'Devatagara': 'Temple de Devata',
                'Insight': 'Résidence du doyen',
                'Svarbhanu': 'Svarbhanu',
                'Terminus Snatcher': 'pillard de l\'apocalypse',
                'Terminus Wrecker': 'destructeur de l\'apocalypse',
                'Trnakiya': 'Clairière de Vanaspati',
            },
            'replaceText': {
                '\\(Knockback\\)': '(Poussée)',
                '\\(Spread\\)': '(Dispersion)',
                '--meteor': '--météore',
                'Aether Siphon': 'Absorption élémentaire',
                'Aether Spray': 'Déjection élémentaire',
                'Aetherial Disruption': 'Désolation terrestre',
                'Chaotic Pulse': 'Revivification terrestre',
                'Chaotic Undercurrent': 'Turbulence terrestre',
                'Cosmic Kiss': 'Impact',
                'Crumbling Sky': 'Appel des météores',
                'Flames of Decay': 'Désespoir brûlant',
                'Gnashing of Teeth': 'Grignotement',
                'Last Gasp': 'Supplication',
                'Lost Hope': 'Cri hébété',
                'Meaningless Destruction': 'Chagrin enragé',
                'Mouth Off': 'Parole d\'argent',
                'Note of Despair': 'Cri de désespoir',
                'Poison Heart': 'Décharge toxique',
                'Total Wreck': 'Destruction aveugle',
                'Unholy Water': 'Torture aqueuse',
                'Vitriol': 'Silence d\'or',
                'Wallow': 'Sanglot',
                'What Is Left/What Is Right': 'Main gauche/droite purulente',
            },
        },
        {
            'locale': 'ja',
            'missingTranslations': true,
            'replaceSync': {
                'Devatagara': 'デーヴァター寺院',
                'Insight': '里長邸前',
                'Svarbhanu': 'スヴァーバーヌ',
                'Terminus Snatcher': 'ターミナス・スナッチャー',
                'Terminus Wrecker': 'ターミナス・レッカー',
                'Trnakiya': '樹海の空地',
            },
            'replaceText': {
                'Aether Siphon': '属性吸収',
                'Aether Spray': '属性放出',
                'Aetherial Disruption': '地脈暴走',
                'Chaotic Pulse': '地脈活性',
                'Chaotic Undercurrent': '地脈乱流',
                'Cosmic Kiss': '着弾',
                'Crumbling Sky': '流星招来',
                'Flames of Decay': '絶望の炎',
                'Gnashing of Teeth': '噛みつき',
                'Last Gasp': '哀訴',
                'Lost Hope': '自失の叫び',
                'Meaningless Destruction': '絶望の狂乱',
                'Mouth Off': '有口無行',
                'Note of Despair': '絶望の叫び',
                'Poison Heart': '毒液塊',
                'Total Wreck': '打ち壊し',
                'Unholy Water': '水牢弾',
                'Vitriol': '有言実行',
                'Wallow': '嗚咽',
                'What Is Left': '穢れた左手',
                'What Is Right': '穢れた右手',
            },
        },
    ],
});
