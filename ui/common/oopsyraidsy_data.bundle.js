(self["webpackChunkcactbot"] = self["webpackChunkcactbot"] || []).push([[727],{

/***/ 46:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ oopsy_manifest)
});

// EXTERNAL MODULE: ./resources/netregexes.ts
var netregexes = __webpack_require__(622);
// EXTERNAL MODULE: ./resources/zone_id.ts
var zone_id = __webpack_require__(5588);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/00-misc/general.ts


// General mistakes; these apply everywhere.
const triggerSet = {
  zoneId: zone_id/* default.MatchAll */.Z.MatchAll,
  triggers: [{
    // Trigger id for internally generated early pull warning.
    id: 'General Early Pull'
  }, {
    id: 'General Food Buff',
    type: 'LosesEffect',
    // Well Fed
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '48'
    }),
    condition: (_data, matches) => {
      // Prevent "Eos loses the effect of Well Fed from Critlo Mcgee"
      return matches.target === matches.source;
    },
    mistake: (data, matches) => {
      var _data$lostFood;

      (_data$lostFood = data.lostFood) !== null && _data$lostFood !== void 0 ? _data$lostFood : data.lostFood = {}; // Well Fed buff happens repeatedly when it falls off (WHY),
      // so suppress multiple occurrences.

      if (!data.inCombat || data.lostFood[matches.target]) return;
      data.lostFood[matches.target] = true;
      return {
        type: 'warn',
        blame: matches.target,
        text: {
          en: 'lost food buff',
          de: 'Nahrungsbuff verloren',
          fr: 'Buff nourriture terminée',
          ja: '飯効果が失った',
          cn: '失去食物BUFF',
          ko: '음식 버프 해제'
        }
      };
    }
  }, {
    id: 'General Well Fed',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '48'
    }),
    run: (data, matches) => {
      if (!data.lostFood) return;
      delete data.lostFood[matches.target];
    }
  }, {
    id: 'General Rabbit Medium',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '8E0'
    }),
    condition: (data, matches) => data.IsPlayerId(matches.sourceId),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.source,
        text: {
          en: 'bunny',
          de: 'Hase',
          fr: 'lapin',
          ja: 'うさぎ',
          cn: '兔子',
          ko: '토끼'
        }
      };
    }
  }]
};
/* harmony default export */ const general = (triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/00-misc/test.ts


// Test mistake triggers.
const test_triggerSet = {
  zoneId: zone_id/* default.MiddleLaNoscea */.Z.MiddleLaNoscea,
  triggers: [{
    id: 'Test Bow',
    type: 'GameLog',
    netRegex: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: 'You bow courteously to the striking dummy.*?'
    }),
    netRegexFr: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: 'Vous vous inclinez devant le mannequin d\'entraînement.*?'
    }),
    netRegexJa: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*は木人にお辞儀した.*?'
    }),
    netRegexCn: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*恭敬地对木人行礼.*?'
    }),
    netRegexKo: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*나무인형에게 공손하게 인사합니다.*?'
    }),
    mistake: data => {
      return {
        type: 'pull',
        blame: data.me,
        text: {
          en: 'Bow',
          de: 'Bogen',
          fr: 'Saluer',
          ja: 'お辞儀',
          cn: '鞠躬',
          ko: '인사'
        }
      };
    }
  }, {
    id: 'Test Wipe',
    type: 'GameLog',
    netRegex: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: 'You bid farewell to the striking dummy.*?'
    }),
    netRegexFr: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: 'Vous faites vos adieux au mannequin d\'entraînement.*?'
    }),
    netRegexJa: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*は木人に別れの挨拶をした.*?'
    }),
    netRegexCn: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*向木人告别.*?'
    }),
    netRegexKo: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*나무인형에게 작별 인사를 합니다.*?'
    }),
    mistake: data => {
      return {
        type: 'wipe',
        blame: data.me,
        text: {
          en: 'Party Wipe',
          de: 'Gruppenwipe',
          fr: 'Party Wipe',
          ja: 'ワイプ',
          cn: '团灭',
          ko: '파티 전멸'
        }
      };
    }
  }, {
    id: 'Test Bootshine',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '35'
    }),
    condition: (data, matches) => {
      if (matches.source !== data.me) return false;
      const strikingDummyByLocale = {
        en: 'Striking Dummy',
        de: 'Trainingspuppe',
        fr: 'Mannequin d\'entraînement',
        ja: '木人',
        cn: '木人',
        ko: '나무인형'
      };
      const strikingDummyNames = Object.values(strikingDummyByLocale);
      return strikingDummyNames.includes(matches.target);
    },
    mistake: (data, matches) => {
      var _data$bootCount;

      (_data$bootCount = data.bootCount) !== null && _data$bootCount !== void 0 ? _data$bootCount : data.bootCount = 0;
      data.bootCount++;
      const text = `${matches.ability} (${data.bootCount}): ${data.DamageFromMatches(matches)}`;
      return {
        type: 'warn',
        blame: data.me,
        text: text
      };
    }
  }, {
    id: 'Test Leaden Fist',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '745'
    }),
    condition: (data, matches) => matches.source === data.me,
    mistake: (data, matches) => {
      return {
        type: 'good',
        blame: data.me,
        text: matches.effect
      };
    }
  }, {
    id: 'Test Oops',
    type: 'GameLog',
    netRegex: netregexes/* default.echo */.Z.echo({
      line: '.*oops.*'
    }),
    suppressSeconds: 10,
    mistake: (data, matches) => {
      return {
        type: 'fail',
        blame: data.me,
        text: matches.line
      };
    }
  }, {
    id: 'Test Poke Collect',
    type: 'GameLog',
    netRegex: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: 'You poke the striking dummy.*?'
    }),
    netRegexFr: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: 'Vous touchez légèrement le mannequin d\'entraînement du doigt.*?'
    }),
    netRegexJa: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*は木人をつついた.*?'
    }),
    netRegexCn: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*用手指戳向木人.*?'
    }),
    netRegexKo: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*나무인형을 쿡쿡 찌릅니다.*?'
    }),
    run: data => {
      var _data$pokeCount;

      data.pokeCount = ((_data$pokeCount = data.pokeCount) !== null && _data$pokeCount !== void 0 ? _data$pokeCount : 0) + 1;
    }
  }, {
    id: 'Test Poke',
    type: 'GameLog',
    netRegex: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: 'You poke the striking dummy.*?'
    }),
    netRegexFr: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: 'Vous touchez légèrement le mannequin d\'entraînement du doigt.*?'
    }),
    netRegexJa: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*は木人をつついた.*?'
    }),
    netRegexCn: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*用手指戳向木人.*?'
    }),
    netRegexKo: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*나무인형을 쿡쿡 찌릅니다.*?'
    }),
    delaySeconds: 5,
    mistake: data => {
      // 1 poke at a time is fine, but more than one in 5 seconds is (OBVIOUSLY) a mistake.
      if (!data.pokeCount || data.pokeCount <= 1) return;
      return {
        type: 'fail',
        blame: data.me,
        text: {
          en: `Too many pokes (${data.pokeCount})`,
          de: `Zu viele Piekser (${data.pokeCount})`,
          fr: `Trop de touches (${data.pokeCount})`,
          ja: `いっぱいつついた (${data.pokeCount})`,
          cn: `戳太多下啦 (${data.pokeCount})`,
          ko: `너무 많이 찌름 (${data.pokeCount}번)`
        }
      };
    },
    run: data => delete data.pokeCount
  }]
};
/* harmony default export */ const test = (test_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/02-arr/trial/ifrit-nm.ts

// Ifrit Story Mode
const ifrit_nm_triggerSet = {
  zoneId: zone_id/* default.TheBowlOfEmbers */.Z.TheBowlOfEmbers,
  damageWarn: {
    'IfritNm Radiant Plume': '2DE'
  },
  shareWarn: {
    'IfritNm Incinerate': '1C5',
    'IfritNm Eruption': '2DD'
  }
};
/* harmony default export */ const ifrit_nm = (ifrit_nm_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/02-arr/trial/titan-nm.ts

// Titan Story Mode
const titan_nm_triggerSet = {
  zoneId: zone_id/* default.TheNavel */.Z.TheNavel,
  damageWarn: {
    'TitanNm Weight Of The Land': '3CD'
  },
  damageFail: {
    'TitanNm Landslide': '28A'
  },
  shareWarn: {
    'TitanNm Rock Buster': '281'
  }
};
/* harmony default export */ const titan_nm = (titan_nm_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/02-arr/trial/levi-ex.ts


// It's hard to capture the reflection abilities from Leviathan's Head and Tail if you use
// ranged physical attacks / magic attacks respectively, as the ability names are the
// ability you used and don't appear to show up in the log as normal "ability" lines.
// That said, dots still tick independently on both so it's likely that people will atack
// them anyway.
// TODO: Figure out why Dread Tide / Waterspout appear like shares (i.e. 0x16 id).
// Dread Tide = 823/824/825, Waterspout = 829
// Leviathan Extreme
const levi_ex_triggerSet = {
  zoneId: zone_id/* default.TheWhorleaterExtreme */.Z.TheWhorleaterExtreme,
  damageWarn: {
    'LeviEx Grand Fall': '82F',
    // very large circular aoe before spinny dives, applies heavy
    'LeviEx Hydro Shot': '748',
    // Wavespine Sahagin aoe that gives Dropsy effect
    'LeviEx Dreadstorm': '749' // Wavetooth Sahagin aoe that gives Hysteria effect

  },
  damageFail: {
    'LeviEx Body Slam': '82A',
    // levi slam that tilts the boat
    'LeviEx Spinning Dive 1': '88A',
    // levi dash across the boat with knockback
    'LeviEx Spinning Dive 2': '88B',
    // levi dash across the boat with knockback
    'LeviEx Spinning Dive 3': '82C' // levi dash across the boat with knockback

  },
  gainsEffectWarn: {
    'LeviEx Dropsy': '110' // standing in the hydro shot from the Wavespine Sahagin

  },
  gainsEffectFail: {
    'LeviEx Hysteria': '128' // standing in the dreadstorm from the Wavetooth Sahagin

  },
  triggers: [{
    id: 'LeviEx Body Slam Knocked Off',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '82A'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const levi_ex = (levi_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/02-arr/trial/shiva-hm.ts


// Shiva Hard
const shiva_hm_triggerSet = {
  zoneId: zone_id/* default.TheAkhAfahAmphitheatreHard */.Z.TheAkhAfahAmphitheatreHard,
  damageWarn: {
    // Large white circles.
    'ShivaHm Icicle Impact': '993',
    // Avoidable tank stun.
    'ShivaHm Glacier Bash': '9A1'
  },
  shareWarn: {
    // Knockback tank cleave.
    'ShivaHm Heavenly Strike': '9A0',
    // Hailstorm spread marker.
    'ShivaHm Hailstorm': '998'
  },
  shareFail: {
    // Tankbuster.  This is Shiva Hard mode, not Shiva Extreme.  Please!
    'ShivaHm Icebrand': '996'
  },
  triggers: [{
    id: 'ShivaHm Diamond Dust',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '98A'
    }),
    run: data => {
      data.seenDiamondDust = true;
    }
  }, {
    id: 'ShivaHm Deep Freeze',
    type: 'GainsEffect',
    // Shiva also uses ability 9A3 on you, but it has the untranslated name
    // 透明：シヴァ：凍結レクト：ノックバック用. So, use the effect instead for free translation.
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '1E7'
    }),
    condition: data => {
      // The intermission also gets this effect, so only a mistake after that.
      // Unlike extreme, this has the same 20 second duration as the intermission.
      return data.seenDiamondDust;
    },
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.effect
      };
    }
  }]
};
/* harmony default export */ const shiva_hm = (shiva_hm_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/02-arr/trial/shiva-ex.ts


// Shiva Extreme
const shiva_ex_triggerSet = {
  zoneId: zone_id/* default.TheAkhAfahAmphitheatreExtreme */.Z.TheAkhAfahAmphitheatreExtreme,
  damageWarn: {
    // Large white circles.
    'ShivaEx Icicle Impact': 'BEB',
    // "get in" aoe
    'ShivaEx Whiteout': 'BEC',
    // Avoidable tank stun.
    'ShivaEx Glacier Bash': 'BE9'
  },
  damageFail: {
    // 270 degree attack.
    'ShivaEx Glass Dance': 'BDF'
  },
  shareWarn: {
    // Hailstorm spread marker.
    'ShivaEx Hailstorm': 'BE2'
  },
  shareFail: {
    // Laser.  TODO: maybe blame the person it's on??
    'ShivaEx Avalanche': 'BE0'
  },
  soloWarn: {
    // Party shared tankbuster
    'ShivaEx Icebrand': 'BE1'
  },
  triggers: [{
    id: 'ShivaEx Deep Freeze',
    type: 'GainsEffect',
    // Shiva also uses ability C8A on you, but it has the untranslated name
    // 透明：シヴァ：凍結レクト：ノックバック用/ヒロイック. So, use the effect instead for free translation.
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '1E7'
    }),
    condition: (_data, matches) => {
      // The intermission also gets this effect, but for a shorter duration.
      return parseFloat(matches.duration) > 20;
    },
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.effect
      };
    }
  }]
};
/* harmony default export */ const shiva_ex = (shiva_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/02-arr/trial/titan-hm.ts

// Titan Hard
const titan_hm_triggerSet = {
  zoneId: zone_id/* default.TheNavelHard */.Z.TheNavelHard,
  damageWarn: {
    'TitanHm Weight Of The Land': '553',
    'TitanHm Burst': '41C'
  },
  damageFail: {
    'TitanHm Landslide': '554'
  },
  shareWarn: {
    'TitanHm Rock Buster': '550'
  },
  shareFail: {
    'TitanHm Mountain Buster': '283'
  }
};
/* harmony default export */ const titan_hm = (titan_hm_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/02-arr/trial/titan-ex.ts

// Titan Extreme
const titan_ex_triggerSet = {
  zoneId: zone_id/* default.TheNavelExtreme */.Z.TheNavelExtreme,
  damageWarn: {
    'TitanEx Weight Of The Land': '5BE',
    'TitanEx Burst': '5BF'
  },
  damageFail: {
    'TitanEx Landslide': '5BB',
    'TitanEx Gaoler Landslide': '5C3'
  },
  shareWarn: {
    'TitanEx Rock Buster': '5B7'
  },
  shareFail: {
    'TitanEx Mountain Buster': '5B8'
  }
};
/* harmony default export */ const titan_ex = (titan_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/03-hw/alliance/weeping_city.ts


const weeping_city_triggerSet = {
  zoneId: zone_id/* default.TheWeepingCityOfMhach */.Z.TheWeepingCityOfMhach,
  damageWarn: {
    'Weeping Critical Bite': '1848',
    // Sarsuchus cone aoe
    'Weeping Realm Shaker': '183E',
    // First Daughter circle aoe
    'Weeping Silkscreen': '183C',
    // First Daughter line aoe
    'Weeping Silken Spray': '1824',
    // Arachne Eve rear conal aoe
    'Weeping Tremblor 1': '1837',
    // Arachne Eve disappear circle aoe 1
    'Weeping Tremblor 2': '1836',
    // Arachne Eve disappear circle aoe 2
    'Weeping Tremblor 3': '1835',
    // Arachne Eve disappear circle aoe 3
    'Weeping Spider Thread': '1839',
    // Arachne Eve spider line aoe
    'Weeping Fire II': '184E',
    // Black Mage Corpse circle aoe
    'Weeping Necropurge': '17D7',
    // Forgall Shriveled Talon line aoe
    'Weeping Rotten Breath': '17D0',
    // Forgall Dahak cone aoe
    'Weeping Mow': '17D2',
    // Forgall Haagenti unmarked cleave
    'Weeping Dark Eruption': '17C3',
    // Forgall puddle marker
    // 1806 is also Flare Star, but if you get by 1805 you also get hit by 1806?
    'Weeping Flare Star': '1805',
    // Ozma cube phase donut
    'Weeping Execration': '1829',
    // Ozma triangle laser
    'Weeping Haircut 1': '180B',
    // Calofisteri 180 cleave 1
    'Weeping Haircut 2': '180F',
    // Calofisteri 180 cleave 2
    'Weeping Entanglement': '181D',
    // Calofisteri landmine puddle proc
    'Weeping Evil Curl': '1816',
    // Calofisteri axe
    'Weeping Evil Tress': '1817',
    // Calofisteri bulb
    'Weeping Depth Charge': '1820',
    // Calofisteri charge to edge
    'Weeping Feint Particle Beam': '1928',
    // Calofisteri sky laser
    'Weeping Evil Switch': '1815' // Calofisteri lasers

  },
  gainsEffectWarn: {
    'Weeping Hysteria': '128',
    // Arachne Eve Frond Affeard
    'Weeping Zombification': '173',
    // Forgall too many zombie puddles
    'Weeping Toad': '1B7',
    // Forgall Brand of the Fallen failure
    'Weeping Doom': '38E',
    // Forgall Haagenti Mortal Ray
    'Weeping Assimilation': '42C',
    // Ozmashade Assimilation look-away
    'Weeping Stun': '95' // Calofisteri Penetration look-away

  },
  shareWarn: {
    'Weeping Arachne Web': '185E',
    // Arachne Eve headmarker web aoe
    'Weeping Earth Aether': '1841',
    // Arachne Eve orbs
    'Weeping Epigraph': '1852',
    // Headstone untelegraphed laser line tank attack
    // This is too noisy.  Better to pop the balloons than worry about friends.
    // 'Weeping Explosion': '1807', // Ozmasphere Cube orb explosion
    'Weeping Split End 1': '180C',
    // Calofisteri tank cleave 1
    'Weeping Split End 2': '1810',
    // Calofisteri tank cleave 2
    'Weeping Bloodied Nail': '181F' // Calofisteri axe/bulb appearing

  },
  triggers: [{
    id: 'Weeping Forgall Gradual Zombification Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '415'
    }),
    run: (data, matches) => {
      var _data$zombie;

      (_data$zombie = data.zombie) !== null && _data$zombie !== void 0 ? _data$zombie : data.zombie = {};
      data.zombie[matches.target] = true;
    }
  }, {
    id: 'Weeping Forgall Gradual Zombification Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '415'
    }),
    run: (data, matches) => {
      data.zombie = data.zombie || {};
      data.zombie[matches.target] = false;
    }
  }, {
    id: 'Weeping Forgall Mega Death',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '17CA'
    }),
    condition: (data, matches) => data.zombie && !data.zombie[matches.target],
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'Weeping Headstone Shield Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '15E'
    }),
    run: (data, matches) => {
      var _data$shield;

      (_data$shield = data.shield) !== null && _data$shield !== void 0 ? _data$shield : data.shield = {};
      data.shield[matches.target] = true;
    }
  }, {
    id: 'Weeping Headstone Shield Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '15E'
    }),
    run: (data, matches) => {
      data.shield = data.shield || {};
      data.shield[matches.target] = false;
    }
  }, {
    id: 'Weeping Flaring Epigraph',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '1856'
    }),
    condition: (data, matches) => data.shield && !data.shield[matches.target],
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    // This ability name is helpfully called "Attack" so name it something else.
    id: 'Weeping Ozma Tank Laser',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      type: '22',
      id: '1831'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: {
          en: 'Tank Laser',
          de: 'Tank Laser',
          fr: 'Tank Laser',
          ja: 'タンクレザー',
          cn: '坦克激光',
          ko: '탱커 레이저'
        }
      };
    }
  }, {
    id: 'Weeping Ozma Holy',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '182E'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Slid off!',
          de: 'ist runtergerutscht!',
          fr: 'A glissé(e) !',
          ja: 'ノックバック',
          cn: '击退！',
          ko: '넉백됨!'
        }
      };
    }
  }]
};
/* harmony default export */ const weeping_city = (weeping_city_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/03-hw/dungeon/aetherochemical_research_facility.ts


// Aetherochemical Research Facility
const aetherochemical_research_facility_triggerSet = {
  zoneId: zone_id/* default.TheAetherochemicalResearchFacility */.Z.TheAetherochemicalResearchFacility,
  damageWarn: {
    'ARF Grand Sword': '216',
    // Conal AoE, Scrambled Iron Giant trash
    'ARF Cermet Drill': '20E',
    // Line AoE, 6th Legion Magitek Vanguard trash
    'ARF Magitek Slug': '10DB',
    // Line AoE, boss 1
    'ARF Aetherochemical Grenado': '10E2',
    // Large targeted circle AoE, Magitek Turret II, boss 1
    'ARF Magitek Spread': '10DC',
    // 270-degree roomwide AoE, boss 1
    'ARF Eerie Soundwave': '1170',
    // Targeted circle AoE, Cultured Empusa trash, before boss 2
    'ARF Tail Slap': '125F',
    // Conal AoE, Cultured Dancer trash, before boss 2
    'ARF Calcifying Mist': '123A',
    // Conal AoE, Cultured Naga trash, before boss 2
    'ARF Puncture': '1171',
    // Short line AoE, Cultured Empusa trash, before boss 2
    'ARF Sideswipe': '11A7',
    // Conal AoE, Cultured Reptoid trash, before boss 2
    'ARF Gust': '395',
    // Targeted small circle AoE, Cultured Mirrorknight trash, before boss 2
    'ARF Marrow Drain': 'D0E',
    // Conal AoE, Cultured Chimera trash, before boss 2
    'ARF Riddle Of The Sphinx': '10E4',
    // Targeted circle AoE, boss 2
    'ARF Ka': '106E',
    // Conal AoE, boss 2
    'ARF Rotoswipe': '11CC',
    // Conal AoE, Facility Dreadnought trash, before boss 3
    'ARF Auto-cannons': '12D9',
    // Line AoE, Monitoring Drone trash, before boss 3
    'ARF Death\'s Door': '4EC',
    // Line AoE, Cultured Shabti trash, before boss 3
    'ARF Spellsword': '4EB',
    // Conal AoE, Cultured Shabti trash, before boss 3
    'ARF End Of Days': '10FD',
    // Line AoE, boss 3
    'ARF Blizzard Burst': '10FE',
    // Fixed circle AoEs, Igeyorhm, boss 3
    'ARF Fire Burst': '10FF',
    // Fixed circle AoEs, Lahabrea, boss 3
    'ARF Sea Of Pitch': '12DE',
    // Targeted persistent circle AoEs, boss 3
    'ARF Dark Blizzard II': '10F3',
    // Random circle AoEs, Igeyorhm, boss 3
    'ARF Dark Fire II': '10F8',
    // Random circle AoEs, Lahabrea, boss 3
    'ARF Ancient Eruption': '1104',
    // Self-targeted circle AoE, boss 4
    'ARF Entropic Flame': '1108' // Line AoEs,  boss 4

  },
  shareWarn: {
    'ARF Chthonic Hush': '10E7',
    // Instant tank cleave, boss 2
    'ARF Height Of Chaos': '1101',
    // Tank cleave, boss 4
    'ARF Ancient Circle': '1102' // Targeted donut AoEs, boss 4

  },
  triggers: [{
    id: 'ARF Petrifaction',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '01'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }]
};
/* harmony default export */ const aetherochemical_research_facility = (aetherochemical_research_facility_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/03-hw/dungeon/fractal_continuum.ts

// Fractal Continuum
const fractal_continuum_triggerSet = {
  zoneId: zone_id/* default.TheFractalContinuum */.Z.TheFractalContinuum,
  damageWarn: {
    'Fractal Double Sever': 'F7D',
    // Conals, boss 1
    'Fractal Aetheric Compression': 'F80',
    // Ground AoE circles, boss 1
    'Fractal 11-Tonze Swipe': 'F81',
    // Frontal cone, boss 2
    'Fractal 10-Tonze Slash': 'F83',
    // Frontal line, boss 2
    'Fractal 111-Tonze Swing': 'F87',
    // Get-out AoE, boss 2
    'Fractal Broken Glass': 'F8E',
    // Glowing panels, boss 3
    'Fractal Mines': 'F90',
    'Fractal Seed of the Rivers': 'F91' // Ground AoE circles, boss 3

  },
  shareWarn: {
    'Fractal Sanctification': 'F89' // Instant conal buster, boss 3

  }
};
/* harmony default export */ const fractal_continuum = (fractal_continuum_triggerSet);
// EXTERNAL MODULE: ./ui/oopsyraidsy/oopsy_common.ts
var oopsy_common = __webpack_require__(4416);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/03-hw/dungeon/gubal_library_hard.ts



const gubal_library_hard_triggerSet = {
  zoneId: zone_id/* default.TheGreatGubalLibraryHard */.Z.TheGreatGubalLibraryHard,
  damageWarn: {
    'GubalHm Terror Eye': '930',
    // Circle AoE, Spine Breaker trash
    'GubalHm Batter': '198A',
    // Circle AoE, trash before boss 1
    'GubalHm Condemnation': '390',
    // Conal AoE, Bibliovore trash
    'GubalHm Discontinue 1': '1943',
    // Falling book shadow, boss 1
    'GubalHm Discontinue 2': '1940',
    // Rush AoE from ends, boss 1
    'GubalHm Discontinue 3': '1942',
    // Rush AoE across, boss 1
    'GubalHm Frightful Roar': '193B',
    // Get-Out AoE, boss 1
    'GubalHm Issue 1': '193D',
    // Initial end book warning AoE, boss 1
    'GubalHm Issue 2': '193F',
    // Initial end book warning AoE, boss 1
    'GubalHm Issue 3': '1941',
    // Initial side book warning AoE, boss 1
    'GubalHm Desolation': '198C',
    // Line AoE, Biblioclast trash
    'GubalHm Double Smash': '26A',
    // Conal AoE, Biblioclast trash
    'GubalHm Darkness': '3A0',
    // Conal AoE, Inkstain trash
    'GubalHm Firewater': '3BA',
    // Circle AoE, Biblioclast trash
    'GubalHm Elbow Drop': 'CBA',
    // Conal AoE, Biblioclast trash
    'GubalHm Dark': '19DF',
    // Large circle AoE, Inkstain trash
    'GubalHm Seals': '194A',
    // Sun/Moonseal failure, boss 2
    'GubalHm Water III': '1C67',
    // Large circle AoE, Porogo Pegist trash
    'GubalHm Raging Axe': '1703',
    // Small conal AoE, Mechanoservitor trash
    'GubalHm Magic Hammer': '1990',
    // Large circle AoE, Apanda mini-boss
    'GubalHm Properties Of Gravity': '1950',
    // Circle AoE from gravity puddles, boss 3
    'GubalHm Properties Of Levitation': '194F',
    // Circle AoE from levitation puddles, boss 3
    'GubalHm Comet': '1969' // Small circle AoE, intermission, boss 3

  },
  damageFail: {
    'GubalHm Ecliptic Meteor': '195C' // LoS mechanic, boss 3

  },
  shareWarn: {
    'GubalHm Searing Wind': '1944',
    // Tank cleave, boss 2
    'GubalHm Thunder': '19[AB]' // Spread marker, boss 3

  },
  triggers: [{
    // Fire gate in hallway to boss 2, magnet failure on boss 2
    id: 'GubalHm Burns',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '10B'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    // Helper for Thunder 3 failures
    id: 'GubalHm Imp Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '46E'
    }),
    run: (data, matches) => {
      var _data$hasImp;

      (_data$hasImp = data.hasImp) !== null && _data$hasImp !== void 0 ? _data$hasImp : data.hasImp = {};
      data.hasImp[matches.target] = true;
    }
  }, {
    id: 'GubalHm Imp Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '46E'
    }),
    run: (data, matches) => {
      data.hasImp = data.hasImp || {};
      data.hasImp[matches.target] = false;
    }
  }, {
    // Targets with Imp when Thunder III resolves receive a vulnerability stack and brief stun
    id: 'GubalHm Imp Thunder',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '195[AB]',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => {
      var _data$hasImp2;

      return (_data$hasImp2 = data.hasImp) === null || _data$hasImp2 === void 0 ? void 0 : _data$hasImp2[matches.target];
    },
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: {
          en: 'Shocked Imp',
          de: 'Schockierter Imp',
          ja: 'カッパを解除しなかった',
          cn: '河童状态吃了暴雷'
        }
      };
    }
  }, {
    id: 'GubalHm Quake',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '1956',
      ...oopsy_common/* playerDamageFields */.np
    }),
    // Always hits target, but if correctly resolved will deal 0 damage
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'GubalHm Tornado',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '195[78]',
      ...oopsy_common/* playerDamageFields */.np
    }),
    // Always hits target, but if correctly resolved will deal 0 damage
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const gubal_library_hard = (gubal_library_hard_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/03-hw/dungeon/sohm_al_hard.ts


const sohm_al_hard_triggerSet = {
  zoneId: zone_id/* default.SohmAlHard */.Z.SohmAlHard,
  damageWarn: {
    'SohmAlHm Deadly Vapor': '1DC9',
    // Environmental circle AoEs
    'SohmAlHm Deeproot': '1CDA',
    // Targeted circle AoE, Blooming Chichu trash
    'SohmAlHm Odious Air': '1CDB',
    // Conal AoE, Blooming Chichu trash
    'SohmAlHm Glorious Blaze': '1C33',
    // Circle AoE, Small Spore Sac, boss 1
    'SohmAlHm Foul Waters': '118A',
    // Conal AoE, Mountaintop Opken trash
    'SohmAlHm Plain Pound': '1187',
    // Targeted circle AoE, Mountaintop Hropken trash
    'SohmAlHm Palsynyxis': '1161',
    // Conal AoE, Overgrown Difflugia trash
    'SohmAlHm Surface Breach': '1E80',
    // Circle AoE, Giant Netherworm trash
    'SohmAlHm Freshwater Cannon': '119F',
    // Line AoE, Giant Netherworm trash
    'SohmAlHm Tail Smash': '1C35',
    // Untelegraphed rear conal AoE, Gowrow, boss 2
    'SohmAlHm Tail Swing': '1C36',
    // Untelegraphed circle AoE, Gowrow, boss 2
    'SohmAlHm Ripper Claw': '1C37',
    // Untelegraphed frontal AoE, Gowrow, boss 2
    'SohmAlHm Wind Slash': '1C38',
    // Circle AoE, Gowrow, boss 2
    'SohmAlHm Wild Charge': '1C39',
    // Dash attack, Gowrow, boss 2
    'SohmAlHm Hot Charge': '1C3A',
    // Dash attack, Gowrow, boss 2
    'SohmAlHm Fireball': '1C3B',
    // Untelegraphed targeted circle AoE, Gowrow, boss 2
    'SohmAlHm Lava Flow': '1C3C',
    // Untelegraphed conal AoE, Gowrow, boss 2
    'SohmAlHm Wild Horn': '1507',
    // Conal AoE, Abalathian Clay Golem trash
    'SohmAlHm Lava Breath': '1C4D',
    // Conal AoE, Lava Crab trash
    'SohmAlHm Ring of Fire': '1C4C',
    // Targeted circle AoE, Volcano Anala trash
    'SohmAlHm Molten Silk 1': '1C43',
    // 270-degree frontal AoE, Lava Scorpion, boss 3
    'SohmAlHm Molten Silk 2': '1C44',
    // 270-degree rear AoE, Lava Scorpion, boss 3
    'SohmAlHm Molten Silk 3': '1C42',
    // Ring AoE, Lava Scorpion, boss 3
    'SohmAlHm Realm Shaker': '1C41' // Circle AoE, Lava Scorpion, boss 3

  },
  triggers: [{
    // Warns if players step into the lava puddles. There is unfortunately no direct damage event.
    id: 'SohmAlHm Burns',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '11C'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }]
};
/* harmony default export */ const sohm_al_hard = (sohm_al_hard_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/03-hw/raid/a6n.ts

const a6n_triggerSet = {
  zoneId: zone_id/* default.AlexanderTheCuffOfTheSon */.Z.AlexanderTheCuffOfTheSon,
  damageWarn: {
    'Minefield': '170D',
    // Circle AoE, mines.
    'Mine': '170E',
    // Mine explosion.
    'Supercharge': '1713',
    // Mirage charge.
    'Height Error': '171D',
    // Incorrect panel for Height.
    'Earth Missile': '1726' // Circle AoE, fire puddles.

  },
  damageFail: {
    'Ultra Flash': '1722' // Room-wide death AoE, if not LoS'd.

  },
  shareWarn: {
    'Ice Missile': '1727' // Ice headmarker AoE circles.

  },
  shareFail: {
    'Single Buster': '1717' // Single laser Attachment. Non-tanks are *probably* dead.

  },
  soloWarn: {
    'Double Buster': '1718',
    // Twin laser Attachment.
    'Enumeration': '171E' // Enumeration circle.

  }
};
/* harmony default export */ const a6n = (a6n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/03-hw/raid/a12n.ts



const a12n_triggerSet = {
  zoneId: zone_id/* default.AlexanderTheSoulOfTheCreator */.Z.AlexanderTheSoulOfTheCreator,
  damageWarn: {
    'A12N Sacrament': '1AE6',
    // Cross Lasers
    'A12N Gravitational Anomaly': '1AEB' // Gravity Puddles

  },
  shareWarn: {
    'A12N Divine Spear': '1AE3',
    // Instant conal tank cleave
    'A12N Blazing Scourge': '1AE9',
    // Orange head marker splash damage
    'A12N Plaint Of Severity': '1AF1',
    // Aggravated Assault splash damage
    'A12N Communion': '1AFC' // Tether Puddles

  },
  triggers: [{
    id: 'A12N Assault Collect',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '461'
    }),
    run: (data, matches) => {
      var _data$assault;

      (_data$assault = data.assault) !== null && _data$assault !== void 0 ? _data$assault : data.assault = [];
      data.assault.push(matches.target);
    }
  }, {
    // It is a failure for a Severity marker to stack with the Solidarity group.
    id: 'A12N Assault Failure',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '1AF2',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => {
      var _data$assault2;

      return (_data$assault2 = data.assault) === null || _data$assault2 === void 0 ? void 0 : _data$assault2.includes(matches.target);
    },
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: {
          en: 'Didn\'t Spread!',
          de: 'Nicht verteilt!',
          fr: 'Ne s\'est pas dispersé(e) !',
          ja: '散開しなかった!',
          cn: '没有散开!'
        }
      };
    }
  }, {
    id: 'A12N Assault Cleanup',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '461'
    }),
    delaySeconds: 20,
    suppressSeconds: 5,
    run: data => {
      delete data.assault;
    }
  }]
};
/* harmony default export */ const a12n = (a12n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/dungeon/ala_mhigo.ts


const ala_mhigo_triggerSet = {
  zoneId: zone_id/* default.AlaMhigo */.Z.AlaMhigo,
  damageWarn: {
    'Ala Mhigo Magitek Ray': '24CE',
    // Line AoE, Legion Predator trash, before boss 1
    'Ala Mhigo Lock On': '2047',
    // Homing circles, boss 1
    'Ala Mhigo Tail Laser 1': '2049',
    // Frontal line AoE, boss 1
    'Ala Mhigo Tail Laser 2': '204B',
    // Rear line AoE, boss 1
    'Ala Mhigo Tail Laser 3': '204C',
    // Rear line AoE, boss 1
    'Ala Mhigo Shoulder Cannon': '24D0',
    // Circle AoE, Legion Avenger trash, before boss 2
    'Ala Mhigo Cannonfire': '23ED',
    // Environmental circle AoE, path to boss 2
    'Ala Mhigo Aetherochemical Grenado': '205A',
    // Circle AoE, boss 2
    'Ala Mhigo Integrated Aetheromodulator': '205B',
    // Ring AoE, boss 2
    'Ala Mhigo Circle Of Death': '24D4',
    // Proximity circle AoE, Hexadrone trash, before boss 3
    'Ala Mhigo Exhaust': '24D3',
    // Line AoE, Legion Colossus trash, before boss 3
    'Ala Mhigo Grand Sword': '24D2',
    // Conal AoE, Legion Colossus trash, before boss 3
    'Ala Mhigo Art Of The Storm 1': '2066',
    // Proximity circle AoE, pre-intermission, boss 3
    'Ala Mhigo Art Of The Storm 2': '2587',
    // Proximity circle AoE, intermission, boss 3
    'Ala Mhigo Vein Splitter 1': '24B6',
    // Proximity circle AoE, primary entity, boss 3
    'Ala Mhigo Vein Splitter 2': '206C',
    // Proximity circle AoE, helper entity, boss 3
    'Ala Mhigo Lightless Spark': '206B' // Conal AoE, boss 3

  },
  shareWarn: {
    'Ala Mhigo Demimagicks': '205E',
    'Ala Mhigo Unmoving Troika': '2060',
    'Ala Mhigo Art Of The Sword 1': '2069',
    'Ala Mhigo Art Of The Sword 2': '2589'
  },
  triggers: [{
    // It's possible players might just wander into the bad on the outside,
    // but normally people get pushed into it.
    id: 'Ala Mhigo Art Of The Swell',
    type: 'GainsEffect',
    // Damage Down
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '2B8'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }]
};
/* harmony default export */ const ala_mhigo = (ala_mhigo_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/dungeon/bardams_mettle.ts



// For reasons not completely understood at the time this was merged,
// but likely related to the fact that no nameplates are visible during the encounter,
// and that nothing in the encounter actually does damage,
// we can't use damageWarn or gainsEffect helpers on the Bardam fight.
// Instead, we use this helper function to look for failure flags.
// If the flag is present,a full trigger object is returned that drops in seamlessly.
const abilityWarn = args => {
  if (!args.abilityId) console.error('Missing ability ' + JSON.stringify(args));
  const trigger = {
    id: args.id,
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: args.abilityId
    }),
    condition: (_data, matches) => matches.flags.substr(-2) === '0E',
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  };
  return trigger;
};

const bardams_mettle_triggerSet = {
  zoneId: zone_id/* default.BardamsMettle */.Z.BardamsMettle,
  damageWarn: {
    'Bardam Dirty Claw': '21A8',
    // Frontal cleave, Gulo Gulo trash
    'Bardam Epigraph': '23AF',
    // Line AoE, Wall of Bardam trash
    'Bardam The Dusk Star': '2187',
    // Circle AoE, environment before first boss
    'Bardam The Dawn Star': '2186',
    // Circle AoE, environment before first boss
    'Bardam Crumbling Crust': '1F13',
    // Circle AoEs, Garula, first boss
    'Bardam Ram Rush': '1EFC',
    // Line AoEs, Steppe Yamaa, first boss.
    'Bardam Lullaby': '24B2',
    // Circle AoEs, Steppe Sheep, first boss.
    'Bardam Heave': '1EF7',
    // Frontal cleave, Garula, first boss
    'Bardam Wide Blaster': '24B3',
    // Enormous frontal cleave, Steppe Coeurl, first boss
    'Bardam Double Smash': '26A',
    // Circle AoE, Mettling Dhara trash
    'Bardam Transonic Blast': '1262',
    // Circle AoE, Steppe Eagle trash
    'Bardam Wild Horn': '2208',
    // Frontal cleave, Khun Gurvel trash
    'Bardam Heavy Strike 1': '2578',
    // 1 of 3 270-degree ring AoEs, Bardam, second boss
    'Bardam Heavy Strike 2': '2579',
    // 2 of 3 270-degree ring AoEs, Bardam, second boss
    'Bardam Heavy Strike 3': '257A',
    // 3 of 3 270-degree ring AoEs, Bardam, second boss
    'Bardam Tremblor 1': '257B',
    // 1 of 2 concentric ring AoEs, Bardam, second boss
    'Bardam Tremblor 2': '257C',
    // 2 of 2 concentric ring AoEs, Bardam, second boss
    'Bardam Throwing Spear': '257F',
    // Checkerboard AoE, Throwing Spear, second boss
    'Bardam Bardam\'s Ring': '2581',
    // Donut AoE headmarkers, Bardam, second boss
    'Bardam Comet': '257D',
    // Targeted circle AoEs, Bardam, second boss
    'Bardam Comet Impact': '2580',
    // Circle AoEs, Star Shard, second boss
    'Bardam Iron Sphere Attack': '16B6',
    // Contact damage, Iron Sphere trash, before third boss
    'Bardam Tornado': '247E',
    // Circle AoE, Khun Shavara trash
    'Bardam Pinion': '1F11',
    // Line AoE, Yol Feather, third boss
    'Bardam Feather Squall': '1F0E',
    // Dash attack, Yol, third boss
    'Bardam Flutterfall Untargeted': '1F12' // Rotating circle AoEs, Yol, third boss

  },
  gainsEffectWarn: {
    'Bardam Confused': '0B' // Failed gaze attack, Yol, third boss

  },
  gainsEffectFail: {
    'Bardam Fetters': '56F' // Failing two mechanics in any one phase on Bardam, second boss.

  },
  shareWarn: {
    'Bardam Garula Rush': '1EF9',
    // Line AoE, Garula, first boss.
    'Bardam Flutterfall Targeted': '1F0C',
    // Circle AoE headmarker, Yol, third boss
    'Bardam Wingbeat': '1F0F' // Conal AoE headmarker, Yol, third boss

  },
  triggers: [// 1 of 3 270-degree ring AoEs, Bardam, second boss
  abilityWarn({
    id: 'Bardam Heavy Strike 1',
    abilityId: '2578'
  }), // 2 of 3 270-degree ring AoEs, Bardam, second boss
  abilityWarn({
    id: 'Bardam Heavy Strike 2',
    abilityId: '2579'
  }), // 3 of 3 270-degree ring AoEs, Bardam, second boss
  abilityWarn({
    id: 'Bardam Heavy Strike 3',
    abilityId: '257A'
  }), // 1 of 2 concentric ring AoEs, Bardam, second boss
  abilityWarn({
    id: 'Bardam Tremblor 1',
    abilityId: '257B'
  }), // 2 of 2 concentric ring AoEs, Bardam, second boss
  abilityWarn({
    id: 'Bardam Tremblor 2',
    abilityId: '257C'
  }), // Checkerboard AoE, Throwing Spear, second boss
  abilityWarn({
    id: 'Bardam Throwing Spear',
    abilityId: '257F'
  }), // Gaze attack, Warrior of Bardam, second boss
  abilityWarn({
    id: 'Bardam Empty Gaze',
    abilityId: '1F04'
  }), // Donut AoE headmarkers, Bardam, second boss
  abilityWarn({
    id: 'Bardam\'s Ring',
    abilityId: '2581'
  }), // Targeted circle AoEs, Bardam, second boss
  abilityWarn({
    id: 'Bardam Comet',
    abilityId: '257D'
  }), // Circle AoEs, Star Shard, second boss
  abilityWarn({
    id: 'Bardam Comet Impact',
    abilityId: '2580'
  })]
};
/* harmony default export */ const bardams_mettle = (bardams_mettle_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/dungeon/drowned_city_of_skalla.ts

const drowned_city_of_skalla_triggerSet = {
  zoneId: zone_id/* default.TheDrownedCityOfSkalla */.Z.TheDrownedCityOfSkalla,
  damageWarn: {
    'Hydrocannon': '2697',
    // Line AoE, Salt Swallow trash, before boss 1
    'Stagnant Spray': '2699',
    // Conal AoE, Skalla Nanka trash, before boss 1
    'Bubble Burst': '261B',
    // Bubble explosion, Hydrosphere, boss 1
    'Plain Pound': '269A',
    // Large circle AoE, Dhara Sentinel trash, before boss 2
    'Boulder Toss': '269B',
    // Small circle AoE, Stone Phoebad trash, before boss 2
    'Landslip': '269C',
    // Conal AoE, Stone Phoebad trash, before boss 2
    'Mystic Light': '2657',
    // Conal AoE, The Old One, boss 2
    'Mystic Flame': '2659',
    // Large circle AoE, The Old One, boss 2. 2658 is the cast-time ability.
    'Dark II': '110E',
    // Thin cone AoE, Lightless Homunculus trash, after boss 2
    'Implosive Curse': '269E',
    // Conal AoE, Zangbeto trash, after boss 2
    'Undying FIre': '269F',
    // Circle AoE, Zangbeto trash, after boss 2
    'Fire II': '26A0',
    // Circle AoE, Accursed Idol trash, after boss 2
    'Rusting Claw': '2661',
    // Frontal cleave, Hrodric Poisontongue, boss 3
    'Words Of Woe': '2662',
    // Eye lasers, Hrodric Poisontongue, boss 3
    'Tail Drive': '2663',
    // Rear cleave, Hrodric Poisontongue, boss 3
    'Ring Of Chaos': '2667' // Ring headmarker, Hrodric Poisontongue, boss 3

  },
  damageFail: {
    'Self-Detonate': '265C' // Roomwide explosion, Subservient, boss 2

  },
  gainsEffectWarn: {
    'Dropsy': '11B',
    // Standing in Bloody Puddles, or being knocked outside the arena, boss 1
    'Confused': '0B' // Failing the gaze attack, boss 3

  },
  shareWarn: {
    'Bloody Puddle': '2655',
    // Large watery spread circles, Kelpie, boss 1
    'Cross Of Chaos': '2668',
    // Cross headmarker, Hrodric Poisontongue, boss 3
    'Circle Of Chaos': '2669' // Spread circle headmarker, Hrodric Poisontongue, boss 3

  }
};
/* harmony default export */ const drowned_city_of_skalla = (drowned_city_of_skalla_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/dungeon/kugane_castle.ts


const kugane_castle_triggerSet = {
  zoneId: zone_id/* default.KuganeCastle */.Z.KuganeCastle,
  damageWarn: {
    'Kugane Castle Tenka Gokken': '2329',
    // Frontal cone AoE,  Joi Blade trash, before boss 1
    'Kugane Castle Kenki Release Trash': '2330',
    // Chariot AoE, Joi Kiyofusa trash, before boss 1
    'Kugane Castle Clearout': '1E92',
    // Frontal cone AoE, Zuiko-Maru, boss 1
    'Kugane Castle Hara-Kiri 1': '1E96',
    // Giant circle AoE, Harakiri Kosho, boss 1
    'Kugane Castle Hara-Kiri 2': '24F9',
    // Giant circle AoE, Harakiri Kosho, boss 1
    'Kugane Castle Juji Shuriken 1': '232D',
    // Line AoE, Karakuri Onmitsu trash, before boss 2
    'Kugane Castle 1000 Barbs': '2198',
    // Line AoE, Joi Koja trash, before boss 2
    'Kugane Castle Juji Shuriken 2': '1E98',
    // Line AoE, Dojun Maru, boss 2
    'Kugane Castle Tatami-Gaeshi': '1E9D',
    // Floor tile line attack, Elkite Onmitsu, boss 2
    'Kugane Castle Juji Shuriken 3': '1EA0',
    // Line AoE, Elite Onmitsu, boss 2
    'Kugane Castle Auto Crossbow': '2333',
    // Frontal cone AoE, Karakuri Hanya trash, after boss 2
    'Kugane Castle Harakiri 3': '23C9',
    // Giant Circle AoE, Harakiri  Hanya trash, after boss 2
    'Kugane Castle Iai-Giri': '1EA2',
    // Chariot AoE, Yojimbo, boss 3
    'Kugane Castle Fragility': '1EAA',
    // Chariot AoE, Inoshikacho, boss 3
    'Kugane Castle Dragonfire': '1EAB' // Line AoE, Dragon Head, boss 3

  },
  shareWarn: {
    'Kugane Castle Issen': '1E97',
    // Instant frontal cleave, Dojun Maru, boss 2
    'Kugane Castle Clockwork Raiton': '1E9B' // Large lightning spread circles, Dojun Maru, boss 2

  },
  triggers: [{
    // Stack marker, Zuiko Maru, boss 1
    id: 'Kugane Castle Helm Crack',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '1E94'
    }),
    condition: (_data, matches) => matches.type === '21',
    // Taking the stack solo is *probably* a mistake.
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: {
          en: `${matches.ability} (alone)`,
          de: `${matches.ability} (allein)`,
          fr: `${matches.ability} (seul(e))`,
          ja: `${matches.ability} (一人)`,
          cn: `${matches.ability} (单吃)`,
          ko: `${matches.ability} (혼자 맞음)`
        }
      };
    }
  }]
};
/* harmony default export */ const kugane_castle = (kugane_castle_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/dungeon/sirensong_sea.ts

const sirensong_sea_triggerSet = {
  zoneId: zone_id/* default.TheSirensongSea */.Z.TheSirensongSea,
  damageWarn: {
    'Sirensong Ancient Ymir Head Snatch': '2353',
    // frontal conal
    'Sirensong Reflection of Karlabos Tail Screw': '12B7',
    // targeted circle
    'Sirensong Lugat Amorphous Applause': '1F56',
    // frontal 180 cleave
    'Sirensong Lugat Concussive Oscillation': '1F5B',
    // 5 or 7 circles
    'Sirensong The Jane Guy Ball of Malice': '1F6A',
    // ambient cannon circle
    'Sirensong Dark': '19DF',
    // Skinless Skipper / Fleshless Captive targeted circle
    'Sirensong The Governor Shadowstrike': '1F5D',
    // standing in shadows
    'Sirensong Undead Warden March of the Dead': '2351',
    // frontal conal
    'Sirensong Fleshless Captive Flood': '218B',
    // centered circle after seductive scream
    'Sirensong Lorelei Void Water III': '1F68' // large targeted circle

  }
};
/* harmony default export */ const sirensong_sea = (sirensong_sea_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/dungeon/st_mocianne_hard.ts

const st_mocianne_hard_triggerSet = {
  zoneId: zone_id/* default.SaintMociannesArboretumHard */.Z.SaintMociannesArboretumHard,
  damageWarn: {
    'St Mocianne Hard Mudstream': '30D9',
    // Targeted circle AoE, Immaculate Apa trash, before boss 1
    'St Mocianne Hard Silken Spray': '3385',
    // Rear cone AoE, Withered Belladonna trash, before boss 1
    'St Mocianne Hard Muddy Puddles': '30DA',
    // Small targeted circle AoEs, Dorpokkur trash, before boss 1
    'St Mocianne Hard Odious Air': '2E49',
    // Frontal cone AoE, Nullchu, boss 1
    'St Mocianne Hard SLudge Bomb': '2E4E',
    // Targeted circle AoEs, Nullchu, boss 1
    'St Mocianne Hard Odious Atmosphere': '2E51',
    // Channeled 3/4 arena cleave, Nullchu, boss 1
    'St Mocianne Hard Creeping Ivy': '31A5',
    // Frontal cone AoE, Withered Kulak trash, before boss 2
    'St Mocianne Hard Rockslide': '3134',
    // Line AoE, Silt Golem, boss 2
    'St Mocianne Hard Earthquake Inner': '312E',
    // Chariot AoE, Lakhamu, boss 2
    'St Mocianne Hard Earthquake Outer': '312F',
    // Dynamo AoE, Lakhamu, boss 2
    'St Mocianne Hard Embalming Earth': '31A6',
    // Large Chariot AoE, Muddy Mata, after boss 2
    'St Mocianne Hard Quickmire': '3136',
    // Sewage surge avoided on platforms, Tokkapchi, boss 3
    'St Mocianne Hard Quagmire Platforms': '3139',
    // Quagmire explosion on platforms, Tokkapchi, boss 3
    'St Mocianne Hard Feculent Flood': '313C',
    // Targeted thin cone AoE, Tokkapchi, boss 3
    'St Mocianne Hard Corrupture': '33A0' // Mud Slime explosion, boss 3. (No explosion if done correctly.)

  },
  gainsEffectWarn: {
    'St Mocianne Hard Seduced': '3DF',
    // Gaze failure, Withered Belladonna trash, before boss 1
    'St Mocianne Hard Pollen': '13',
    // Sludge puddles, Nullchu, boss 1
    'St Mocianne Hard Transfiguration': '648',
    // Roly-Poly AoE circle failure, BLooming Biloko trash, before boss 2
    'St Mocianne Hard Hysteria': '128',
    // Gaze failure, Lakhamu, boss 2
    'St Mocianne Hard Stab Wound': '45D' // Arena outer wall effect, boss 2

  },
  shareWarn: {
    'St Mocianne Hard Taproot': '2E4C',
    // Large orange spread circles, Nullchu, boss 1
    'St Mocianne Hard Earth Shaker': '3131' // Earth Shaker, Lakhamu, boss 2

  },
  soloFail: {
    'St Mocianne Hard Fault Warren': '2E4A' // Stack marker, Nullchu, boss 1

  }
};
/* harmony default export */ const st_mocianne_hard = (st_mocianne_hard_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/dungeon/swallows_compass.ts


const swallows_compass_triggerSet = {
  zoneId: zone_id/* default.TheSwallowsCompass */.Z.TheSwallowsCompass,
  damageWarn: {
    'Swallows Compass Ivy Fetters': '2C04',
    // Circle ground AoE, Sai Taisui trash, before boss 1
    'Swallows Compass Wildswind 1': '2C05',
    // Tornado ground AoE, placed by Sai Taisui trash, before boss 1
    'Swallows Compass Yama-Kagura': '2B96',
    // Frontal line AoE, Otengu, boss 1
    'Swallows Compass Flames Of Hate': '2B98',
    // Fire orb explosions, boss 1
    'Swallows Compass Conflagrate': '2B99',
    // Collision with fire orb, boss 1
    'Swallows Compass Upwell': '2C06',
    // Targeted circle ground AoE, Sai Taisui trash, before boss 2
    'Swallows Compass Bad Breath': '2C07',
    // Frontal cleave, Jinmenju trash, before boss 2
    'Swallows Compass Greater Palm 1': '2B9D',
    // Half arena right cleave, Daidarabotchi, boss 2
    'Swallows Compass Greater Palm 2': '2B9E',
    // Half arena left cleave, Daidarabotchi, boss 2
    'Swallows Compass Tributary': '2BA0',
    // Targeted thin conal ground AoEs, Daidarabotchi, boss 2
    'Swallows Compass Wildswind 2': '2C06',
    // Circle ground AoE, environment, after boss 2
    'Swallows Compass Wildswind 3': '2C07',
    // Circle ground AoE, placed by Sai Taisui trash, after boss 2
    'Swallows Compass Filoplumes': '2C76',
    // Frontal rectangle AoE, Dragon Bi Fang trash, after boss 2
    'Swallows Compass Both Ends 1': '2BA8',
    // Chariot AoE, Qitian Dasheng, boss 3
    'Swallows Compass Both Ends 2': '2BA9',
    // Dynamo AoE, Qitian Dasheng, boss 3
    'Swallows Compass Both Ends 3': '2BAE',
    // Chariot AoE, Shadow Of The Sage, boss 3
    'Swallows Compass Both Ends 4': '2BAF',
    // Dynamo AoE, Shadow Of The Sage, boss 3
    'Swallows Compass Equal Of Heaven': '2BB4' // Small circle ground AoEs, Qitian Dasheng, boss 3

  },
  gainsEffectWarn: {
    'Swallows Compass Hysteria': '128',
    // Gaze attack failure, Otengu, boss 1
    'Swallows Compass Bleeding': '112F' // Stepping outside the arena, boss 3

  },
  shareWarn: {
    'Swallows Compass Mirage': '2BA2',
    // Prey-chasing puddles, Daidarabotchi, boss 2
    'Swallows Compass Mountain Falls': '2BA5',
    // Circle spread markers, Daidarabotchi, boss 2
    'Swallows Compass The Long End': '2BA7',
    // Laser tether, Qitian Dasheng  boss 3
    'Swallows Compass The Long End 2': '2BAD' // Laser Tether, Shadows Of The Sage, boss 3

  },
  triggers: [{
    // Standing in the lake, Diadarabotchi, boss 2
    id: 'Swallows Compass Six Fulms Under',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '237'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: matches.effect
      };
    }
  }, {
    // Stack marker, boss 3
    id: 'Swallows Compass Five Fingered Punishment',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: ['2BAB', '2BB0'],
      source: ['Qitian Dasheng', 'Shadow Of The Sage']
    }),
    condition: (_data, matches) => matches.type === '21',
    // Taking the stack solo is *probably* a mistake.
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: {
          en: `${matches.ability} (alone)`,
          de: `${matches.ability} (allein)`,
          fr: `${matches.ability} (seul(e))`,
          ja: `${matches.ability} (一人)`,
          cn: `${matches.ability} (单吃)`,
          ko: `${matches.ability} (혼자 맞음)`
        }
      };
    }
  }]
};
/* harmony default export */ const swallows_compass = (swallows_compass_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/dungeon/temple_of_the_fist.ts

const temple_of_the_fist_triggerSet = {
  zoneId: zone_id/* default.TheTempleOfTheFist */.Z.TheTempleOfTheFist,
  damageWarn: {
    'Temple Fire Break': '21ED',
    // Conal AoE, Bloodglider Monk trash
    'Temple Radial Blaster': '1FD3',
    // Circle AoE, boss 1
    'Temple Wide Blaster': '1FD4',
    // Conal AoE, boss 1
    'Temple Crippling Blow': '2016',
    // Line AoEs, environmental, before boss 2
    'Temple Broken Earth': '236E',
    // Circle AoE, Singha trash
    'Temple Shear': '1FDD',
    // Dual conal AoE, boss 2
    'Temple Counter Parry': '1FE0',
    // Retaliation for incorrect direction after Killer Instinct, boss 2
    'Temple Tapas': '',
    // Tracking circular ground AoEs, boss 2
    'Temple Hellseal': '200F',
    // Red/Blue symbol failure, boss 2
    'Temple Pure Will': '2017',
    // Circle AoE, Spirit Flame trash, before boss 3
    'Temple Megablaster': '163',
    // Conal AoE, Coeurl Prana trash, before boss 3
    'Temple Windburn': '1FE8',
    // Circle AoE, Twister wind, boss 3
    'Temple Hurricane Kick': '1FE5',
    // 270-degree frontal AoE, boss 3
    'Temple Silent Roar': '1FEB',
    // Frontal line AoE, boss 3
    'Temple Mighty Blow': '1FEA' // Contact with coeurl head, boss 3

  },
  shareWarn: {
    'Temple Heat Lightning': '1FD7' // Purple spread circles, boss 1

  }
};
/* harmony default export */ const temple_of_the_fist = (temple_of_the_fist_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/dungeon/the_burn.ts

const the_burn_triggerSet = {
  zoneId: zone_id/* default.TheBurn */.Z.TheBurn,
  damageWarn: {
    'The Burn Falling Rock': '31A3',
    // Environmental line AoE
    'The Burn Aetherial Blast': '328B',
    // Line AoE, Kukulkan trash
    'The Burn Mole-a-whack': '328D',
    // Circle AoE, Desert Desman trash
    'The Burn Head Butt': '328E',
    // Small conal AoE, Desert Desman trash
    'The Burn Shardfall': '3191',
    // Roomwide AoE, LoS for safety, Hedetet, boss 1
    'The Burn Dissonance': '3192',
    // Donut AoE, Hedetet, boss 1
    'The Burn Crystalline Fracture': '3197',
    // Circle AoE, Dim Crystal, boss 1
    'The Burn Resonant Frequency': '3198',
    // Circle AoE, Dim Crystal, boss 1
    'The Burn Rotoswipe': '3291',
    // Frontal cone AoE, Charred Dreadnaught trash
    'The Burn Wrecking Ball': '3292',
    // Circle AoE, Charred Dreadnaught trash
    'The Burn Shatter': '3294',
    // Large circle AoE, Charred Doblyn trash
    'The Burn Auto-Cannons': '3295',
    // Line AoE, Charred Drone trash
    'The Burn Self-Detonate': '3296',
    // Circle AoE, Charred Drone trash
    'The Burn Full Throttle': '2D75',
    // Line AoE, Defective Drone, boss 2
    'The Burn Throttle': '2D76',
    // Line AoE, Mining Drone adds, boss 2
    'The Burn Adit Driver': '2D78',
    // Line AoE, Rock Biter adds, boss 2
    'The Burn Tremblor': '3297',
    // Large circle AoE, Veiled Gigaworm trash
    'The Burn Desert Spice': '3298',
    // The frontal cleaves must flow
    'The Burn Toxic Spray': '329A',
    // Frontal cone AoE, Gigaworm Stalker trash
    'The Burn Venom Spray': '329B',
    // Targeted circle AoE, Gigaworm Stalker trash
    'The Burn White Death': '3143',
    // Reactive during invulnerability, Mist Dragon, boss 3
    'The Burn Fog Plume 1': '3145',
    // Star AoE, Mist Dragon, boss 3
    'The Burn Fog Plume 2': '3146',
    // Line AoEs after stars, Mist Dragon, boss 3
    'The Burn Cauterize': '3148' // Line/Swoop AoE, Mist Dragon, boss 3

  },
  damageFail: {
    'The Burn Cold Fog': '3142' // Growing circle AoE, Mist Dragon, boss 3

  },
  gainsEffectWarn: {
    'The Burn Leaden': '43',
    // Puddle effect, boss 2. (Also inflicts 11F, Sludge.)
    'The Burn Puddle Frostbite': '11D' // Ice puddle effect, boss 3. (NOT the conal-inflicted one, 10C.)

  },
  shareWarn: {
    'The Burn Hailfire': '3194',
    // Head marker line AoE, Hedetet, boss 1
    'The Burn Shardstrike': '3195',
    // Orange spread head markers, Hedetet, boss 1
    'The Burn Chilling Aspiration': '314D',
    // Head marker cleave, Mist Dragon, boss 3
    'The Burn Frost Breath': '314C' // Tank cleave, Mist Dragon, boss 3

  }
};
/* harmony default export */ const the_burn = (the_burn_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o1n.ts

// O1N - Deltascape 1.0 Normal
const o1n_triggerSet = {
  zoneId: zone_id/* default.DeltascapeV10 */.Z.DeltascapeV10,
  damageWarn: {
    'O1N Burn': '23D5',
    // Fireball explosion circle AoEs
    'O1N Clamp': '23E2' // Frontal rectangle knockback AoE, Alte Roite

  },
  shareWarn: {
    'O1N Levinbolt': '23DA' // small spread circles

  }
};
/* harmony default export */ const o1n = (o1n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o1s.ts

// O1S - Deltascape 1.0 Savage
const o1s_triggerSet = {
  zoneId: zone_id/* default.DeltascapeV10Savage */.Z.DeltascapeV10Savage,
  damageWarn: {
    'O1S Turbulence': '2584',
    // standing under the boss before downburst
    'O1S Ball Of Fire Burn': '1ECB' // fireball explosion

  },
  damageFail: {
    'O1S Clamp': '1EDE' // large frontal line aoe

  },
  shareWarn: {
    'O1S Levinbolt': '1ED2' // lightning spread

  }
};
/* harmony default export */ const o1s = (o1s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o2n.ts



// O2N - Deltascape 2.0 Normal
const o2n_triggerSet = {
  zoneId: zone_id/* default.DeltascapeV20 */.Z.DeltascapeV20,
  damageWarn: {
    'O2N Main Quake': '24A5',
    // Non-telegraphed circle AoE, Fleshy Member
    'O2N Erosion': '2590' // Small circle AoEs, Fleshy Member

  },
  shareWarn: {
    'O2N Paranormal Wave': '250E' // Instant tank cleave

  },
  triggers: [{
    // We could try to separate out the mistake that led to the player being petrified.
    // However, it's Normal mode, why overthink it?
    id: 'O2N Petrification',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '262'
    }),
    // The user might get hit by another petrifying ability before the effect ends.
    // There's no point in notifying for that.
    suppressSeconds: 10,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'O2N Earthquake',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '2515',
      ...oopsy_common/* playerDamageFields */.np
    }),
    // This deals damage only to non-floating targets.
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const o2n = (o2n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o2s.ts



// O2S - Deltascape 2.0 Savage
const o2s_triggerSet = {
  zoneId: zone_id/* default.DeltascapeV20Savage */.Z.DeltascapeV20Savage,
  damageWarn: {
    'O2S Weighted Wing': '23EF',
    // Unstable Gravity explosions on players (after Long Drop)
    'O2S Gravitational Explosion 1': '2367',
    // failing Four Fold Sacrifice 4 person stack
    'O2S Gravitational Explosion 2': '2368',
    // failing Four Fold Sacrifice 4 person stack
    'O2S Main Quake': '2359' // untelegraphed explosions from epicenter tentacles

  },
  gainsEffectFail: {
    'O2S Stone Curse': '589' // failing Death's Gaze or taking too many tankbuster stacks

  },
  triggers: [{
    // ground blue arena circles; (probably?) only do damage if not floating
    // TODO: usually this just doesn't hit anybody at all, due to patterns.
    // Floating over one is untested.
    id: 'O2S Petrosphere Explosion',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '245D',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    // floating yellow arena circles; only do damage if floating
    id: 'O2S Potent Petrosphere Explosion',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '2362',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    // Must be floating to survive; hits everyone but only does damage if not floating.
    id: 'O2S Earthquake',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '247A',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const o2s = (o2s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o3n.ts


// O3N - Deltascape 3.0 Normal
const o3n_triggerSet = {
  zoneId: zone_id/* default.DeltascapeV30 */.Z.DeltascapeV30,
  damageWarn: {
    'O3N Spellblade Fire III': '2460',
    // Donut AoE, Halicarnassus
    'O3N Spellblade Blizzard III': '2461',
    // Circle AoE, Halicarnassus
    'O3N Spellblade Thunder III': '2462',
    // Line AoE, Halicarnassus
    'O3N Cross Reaper': '246B',
    // Circle AoE, Soul Reaper
    'O3N Gusting Gouge': '246C',
    // Green line AoE, Soul Reaper
    'O3N Sword Dance': '2470',
    // Targeted thin cone AoE, Halicarnassus
    'O3N Uplift': '2473' // Ground spears, Queen's Waltz effect, Halicarnassus

  },
  damageFail: {
    'O3N Ultimum': '2477' // Instant kill. Used if the player does not exit the sand maze fast enough.

  },
  shareWarn: {
    'O3N Holy Blur': '2463' // Spread circles.

  },
  triggers: [{
    id: 'O3N Phase Tracker',
    type: 'StartsUsing',
    netRegex: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '2304',
      source: 'Halicarnassus',
      capture: false
    }),
    netRegexDe: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '2304',
      source: 'Halikarnassos',
      capture: false
    }),
    netRegexFr: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '2304',
      source: 'Halicarnasse',
      capture: false
    }),
    netRegexJa: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '2304',
      source: 'ハリカルナッソス',
      capture: false
    }),
    netRegexCn: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '2304',
      source: '哈利卡纳苏斯',
      capture: false
    }),
    netRegexKo: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '2304',
      source: '할리카르나소스',
      capture: false
    }),
    run: data => {
      var _data$phaseNumber;

      return data.phaseNumber = ((_data$phaseNumber = data.phaseNumber) !== null && _data$phaseNumber !== void 0 ? _data$phaseNumber : 0) + 1;
    }
  }, {
    // There's a lot to track, and in order to make it all clean, it's safest just to
    // initialize it all up front instead of trying to guard against undefined comparisons.
    id: 'O3N Initializing',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '367',
      source: 'Halicarnassus',
      capture: false
    }),
    netRegexDe: netregexes/* default.ability */.Z.ability({
      id: '367',
      source: 'Halikarnassos',
      capture: false
    }),
    netRegexFr: netregexes/* default.ability */.Z.ability({
      id: '367',
      source: 'Halicarnasse',
      capture: false
    }),
    netRegexJa: netregexes/* default.ability */.Z.ability({
      id: '367',
      source: 'ハリカルナッソス',
      capture: false
    }),
    netRegexCn: netregexes/* default.ability */.Z.ability({
      id: '367',
      source: '哈利卡纳苏斯',
      capture: false
    }),
    netRegexKo: netregexes/* default.ability */.Z.ability({
      id: '367',
      source: '할리카르나소스',
      capture: false
    }),
    condition: data => !data.initialized,
    run: data => {
      data.gameCount = 0; // Indexing phases at 1 so as to make phases match what humans expect.
      // 1: We start here.
      // 2: Cave phase with Uplifts.
      // 3: Post-intermission, with good and bad frogs.

      data.phaseNumber = 1;
      data.initialized = true;
    }
  }, {
    id: 'O3N Ribbit',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '2466'
    }),
    condition: (data, matches) => {
      var _data$gameCount;

      // We DO want to be hit by Toad/Ribbit if the next cast of The Game
      // is 4x toad panels.
      const gameCount = (_data$gameCount = data.gameCount) !== null && _data$gameCount !== void 0 ? _data$gameCount : 0;
      return !(data.phaseNumber === 3 && gameCount % 2 === 0) && matches.targetId !== 'E0000000';
    },
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    // There's a lot we could do to track exactly how the player failed The Game.
    // Why overthink Normal mode, however?
    id: 'O3N The Game',
    type: 'Ability',
    // Guess what you just lost?
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '246D'
    }),
    // If the player takes no damage, they did the mechanic correctly.
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    },
    run: data => {
      var _data$gameCount2;

      return data.gameCount = ((_data$gameCount2 = data.gameCount) !== null && _data$gameCount2 !== void 0 ? _data$gameCount2 : 0) + 1;
    }
  }]
};
/* harmony default export */ const o3n = (o3n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o3s.ts



// TODO: handle Ribbit (22F7), Oink (22F9, if damage), Squelch (22F8, if damage)
//       which is an error except during the second game
// O3S - Deltascape 3.0 Savage
const o3s_triggerSet = {
  zoneId: zone_id/* default.DeltascapeV30Savage */.Z.DeltascapeV30Savage,
  damageWarn: {
    'O3S Spellblade Fire III': '22EC',
    // donut
    'O3S Spellblade Thunder III': '22EE',
    // line
    'O3S Spellblade Blizzard III': '22ED',
    // circle
    'O3S Uplift': '230D',
    // not standing on blue square
    'O3S Soul Reaper Gusting Gouge': '22FF',
    // reaper line aoe during cave phase
    'O3S Soul Reaper Cross Reaper': '22FD',
    // middle reaper circle
    'O3S Soul Reaper Stench of Death': '22FE',
    // outside reapers (during final phase)
    'O3S Apanda Magic Hammer': '2315',
    // books phase magic hammer circle
    'O3S Briar Thorn': '2309' // not breaking tethers fast enough

  },
  shareWarn: {
    'O3S Holy Edge': '22F0',
    // Spellblade Holy spread
    'O3S Sword Dance': '2307',
    // protean wave
    'O3S Great Dragon Frost Breath': '2312',
    // tank cleave from Great Dragon
    'O3S Iron Giant Grand Sword': '2316' // tank cleave from Iron Giant

  },
  shareFail: {
    'O3S Folio': '230F' // books books books

  },
  soloWarn: {
    'O3S Holy Blur': '22F1' // Spellblade Holy stack

  },
  triggers: [{
    // Everybody gets hits by this, but it's only a failure if it does damage.
    id: 'O3S The Game',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '2301',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const o3s = (o3s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o4n.ts



// O4N - Deltascape 4.0 Normal
const o4n_triggerSet = {
  zoneId: zone_id/* default.DeltascapeV40 */.Z.DeltascapeV40,
  damageWarn: {
    'O4N Blizzard III': '24BC',
    // Targeted circle AoEs, Exdeath
    'O4N Empowered Thunder III': '24C1',
    // Untelegraphed large circle AoE, Exdeath
    'O4N Zombie Breath': '24CB',
    // Conal, tree head after Decisive Battle
    'O4N Clearout': '24CC',
    // Overlapping cone AoEs, Deathly Vine (tentacles alongside tree head)
    'O4N Black Spark': '24C9' // Exploding Black Hole

  },
  shareWarn: {
    // Empowered Fire III inflicts the Pyretic debuff, which deals damage if the player
    // moves or acts before the debuff falls. Unfortunately it doesn't look like there's
    // currently a log line for this, so the only way to check for this is to collect
    // the debuffs and then warn if a player takes an action during that time. Not worth it
    // for Normal.
    'O4N Standard Fire': '24BA',
    'O4N Buster Thunder': '24BE' // A cleaving tank buster

  },
  triggers: [{
    // Kills target if not cleansed
    id: 'O4N Doom',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '38E'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Cleansers missed Doom!',
          de: 'Doom-Reinigung vergessen!',
          fr: 'N\'a pas été dissipé(e) du Glas !',
          ja: '死の宣告',
          cn: '没解死宣'
        }
      };
    }
  }, {
    // Short knockback from Exdeath
    id: 'O4N Vacuum Wave',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '24B8',
      ...oopsy_common/* playerDamageFields */.np
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Pushed off!',
          de: 'Runter geschubst!',
          fr: 'A été poussé(e) !',
          ja: '落ちた',
          cn: '击退坠落'
        }
      };
    }
  }, {
    // Room-wide AoE, freezes non-moving targets
    id: 'O4N Empowered Blizzard',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '4E6'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }]
};
/* harmony default export */ const o4n = (o4n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o4s.ts


 // TODO: taking the wrong color white/black antilight

// O4S - Deltascape 4.0 Savage
const o4s_triggerSet = {
  zoneId: zone_id/* default.DeltascapeV40Savage */.Z.DeltascapeV40Savage,
  damageWarn: {
    'O4S1 Vine Clearout': '240C',
    // circle of vines
    'O4S1 Zombie Breath': '240B',
    // tree exdeath conal
    'O4S1 Vacuum Wave': '23FE',
    // circle centered on exdeath
    'O4S2 Neo Vacuum Wave': '241D',
    // "out of melee"
    'O4S2 Death Bomb': '2431',
    // failed acceleration bomb
    'O4S2 Emptiness 1': '2421',
    // exaflares initial
    'O4S2 Emptiness 2': '2422' // exaflares moving

  },
  damageFail: {
    'O4S1 Black Hole Black Spark': '2407',
    // black hole catching you
    'O4S2 Edge Of Death': '2415',
    // standing between the two color lasers
    'O4S2 Inner Antilight': '244C',
    // inner laser
    'O4S2 Outer Antilight': '2410' // outer laser

  },
  shareWarn: {
    'O4S1 Fire III': '23F6' // spread explosion

  },
  shareFail: {
    'O4S1 Thunder III': '23FA' // tankbuster

  },
  triggers: [{
    id: 'O4S2 Decisive Battle',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '2408',
      capture: false
    }),
    run: data => {
      data.isDecisiveBattleElement = true;
    }
  }, {
    id: 'O4S1 Vacuum Wave',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '23FE',
      capture: false
    }),
    run: data => {
      data.isDecisiveBattleElement = false;
    }
  }, {
    id: 'O4S2 Almagest',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '2417',
      capture: false
    }),
    run: data => {
      data.isNeoExdeath = true;
    }
  }, {
    id: 'O4S2 Blizzard III',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '23F8',
      ...oopsy_common/* playerDamageFields */.np
    }),
    // Ignore unavoidable raid aoe Blizzard III.
    condition: data => !data.isDecisiveBattleElement,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'O4S2 Thunder III',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '23FD',
      ...oopsy_common/* playerDamageFields */.np
    }),
    // Only consider this during random mechanic after decisive battle.
    condition: data => data.isDecisiveBattleElement,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'O4S2 Petrified',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '262'
    }),
    mistake: (data, matches) => {
      // On Neo, being petrified is because you looked at Shriek, so your fault.
      if (data.isNeoExdeath) return {
        type: 'fail',
        blame: matches.target,
        text: matches.effect
      }; // On normal ExDeath, this is due to White Hole.

      return {
        type: 'warn',
        name: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'O4S2 Forked Lightning',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '242E',
      ...oopsy_common/* playerDamageFields */.np
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'O4S2 Beyond Death Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '566'
    }),
    run: (data, matches) => {
      var _data$hasBeyondDeath;

      (_data$hasBeyondDeath = data.hasBeyondDeath) !== null && _data$hasBeyondDeath !== void 0 ? _data$hasBeyondDeath : data.hasBeyondDeath = {};
      data.hasBeyondDeath[matches.target] = true;
    }
  }, {
    id: 'O4S2 Beyond Death Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '566'
    }),
    run: (data, matches) => {
      var _data$hasBeyondDeath2;

      (_data$hasBeyondDeath2 = data.hasBeyondDeath) !== null && _data$hasBeyondDeath2 !== void 0 ? _data$hasBeyondDeath2 : data.hasBeyondDeath = {};
      data.hasBeyondDeath[matches.target] = false;
    }
  }, {
    id: 'O4S2 Beyond Death',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '566'
    }),
    delaySeconds: (_data, matches) => parseFloat(matches.duration) - 0.5,
    deathReason: (data, matches) => {
      if (!data.hasBeyondDeath) return;
      if (!data.hasBeyondDeath[matches.target]) return;
      return {
        name: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'O4S2 Double Attack Collect',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '241C',
      ...oopsy_common/* playerDamageFields */.np
    }),
    run: (data, matches) => {
      data.doubleAttackMatches = data.doubleAttackMatches || [];
      data.doubleAttackMatches.push(matches);
    }
  }, {
    id: 'O4S2 Double Attack',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '241C',
      ...oopsy_common/* playerDamageFields */.np
    }),
    mistake: data => {
      var _arr$0$ability, _arr$;

      const arr = data.doubleAttackMatches;
      if (!arr) return;
      if (arr.length <= 2) return; // Hard to know who should be in this and who shouldn't, but
      // it should never hit 3 people.

      return {
        type: 'fail',
        text: `${(_arr$0$ability = (_arr$ = arr[0]) === null || _arr$ === void 0 ? void 0 : _arr$.ability) !== null && _arr$0$ability !== void 0 ? _arr$0$ability : ''} x ${arr.length}`
      };
    },
    run: data => delete data.doubleAttackMatches
  }]
};
/* harmony default export */ const o4s = (o4s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o5n.ts


 // TODO: Diabolic Wind (28B9) always seems to be 0x16 not 0x15.

// O5N - Sigmascape 1.0 Normal
const o5n_triggerSet = {
  zoneId: zone_id/* default.SigmascapeV10 */.Z.SigmascapeV10,
  damageWarn: {
    'O5N Wroth Ghost Encumber': '28AE',
    // squares that ghosts appear in
    'O5N Saintly Beam': '28AA' // chasing circles that destroy ghosts

  },
  triggers: [{
    id: 'O5N Throttle Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '3AA'
    }),
    run: (data, matches) => {
      var _data$hasThrottle;

      ((_data$hasThrottle = data.hasThrottle) !== null && _data$hasThrottle !== void 0 ? _data$hasThrottle : data.hasThrottle = {})[matches.target] = true;
      console.log(JSON.stringify(data.hasThrottle));
    }
  }, {
    id: 'O5N Throttle Death',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '3AA'
    }),
    delaySeconds: (_data, matches) => parseFloat(matches.duration) - 1,
    deathReason: (data, matches) => {
      var _data$hasThrottle2;

      if ((_data$hasThrottle2 = data.hasThrottle) !== null && _data$hasThrottle2 !== void 0 && _data$hasThrottle2[matches.target]) return {
        name: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'O5N Throttle Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '3AA'
    }),
    run: (data, matches) => {
      var _data$hasThrottle3;

      ((_data$hasThrottle3 = data.hasThrottle) !== null && _data$hasThrottle3 !== void 0 ? _data$hasThrottle3 : data.hasThrottle = {})[matches.target] = false;
      console.log(JSON.stringify(data.hasThrottle));
    }
  }, {
    // Getting hit by a ghost without throttle (the mandatory post-chimney one).
    id: 'O5N Possess',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '28AC',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => {
      var _data$hasThrottle4;

      return !((_data$hasThrottle4 = data.hasThrottle) !== null && _data$hasThrottle4 !== void 0 && _data$hasThrottle4[matches.target]);
    },
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const o5n = (o5n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o5s.ts


 // TODO: Diabolic Wind (28BD) always seems to be 0x16 not 0x15.

// O5S - Sigmascape 1.0 Savage
const o5s_triggerSet = {
  zoneId: zone_id/* default.SigmascapeV10Savage */.Z.SigmascapeV10Savage,
  damageWarn: {
    'O5S Wroth Ghost Encumber': '28B6',
    // squares appearing
    'O5S Saintly Bean': '28B4' // chasing lights

  },
  triggers: [{
    id: 'O5S Throttle Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '3AA'
    }),
    run: (data, matches) => {
      var _data$hasThrottle;

      return ((_data$hasThrottle = data.hasThrottle) !== null && _data$hasThrottle !== void 0 ? _data$hasThrottle : data.hasThrottle = {})[matches.target] = true;
    }
  }, {
    id: 'O5S Throttle Death',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '3AA'
    }),
    delaySeconds: (_data, matches) => parseFloat(matches.duration) - 1,
    deathReason: (data, matches) => {
      var _data$hasThrottle2;

      if ((_data$hasThrottle2 = data.hasThrottle) !== null && _data$hasThrottle2 !== void 0 && _data$hasThrottle2[matches.target]) return {
        name: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'O5S Throttle Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '3AA'
    }),
    run: (data, matches) => {
      var _data$hasThrottle3;

      return ((_data$hasThrottle3 = data.hasThrottle) !== null && _data$hasThrottle3 !== void 0 ? _data$hasThrottle3 : data.hasThrottle = {})[matches.target] = false;
    }
  }, {
    // Getting hit by a ghost without throttle (the mandatory post-chimney one).
    id: 'O5S Possess',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '28AC',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => {
      var _data$hasThrottle4;

      return !((_data$hasThrottle4 = data.hasThrottle) !== null && _data$hasThrottle4 !== void 0 && _data$hasThrottle4[matches.target]);
    },
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const o5s = (o5s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o6n.ts


// O6N - Sigmascape 2.0 Normal
const o6n_triggerSet = {
  zoneId: zone_id/* default.SigmascapeV20 */.Z.SigmascapeV20,
  damageWarn: {
    'O6N Earthquake': '2811',
    // failing to be in a plane
    'O6N Demonic Stone': '2847',
    // chasing circles
    'O6N Demonic Wave': '2831',
    // failing to be behind rock
    'O6N Demonic Spout 1': '2835',
    // pair of targeted circles (#1)
    'O6N Demonic Spout 2': '2837',
    // pair of targeted circles (#2)
    'O6N Featherlance': '2AE8',
    // blown away Easterly circles
    'O6N Intense Pain': '2AE7' // failing to spread for Demonic Pain tether

  },
  triggers: [{
    id: 'O6N Fire Resistance Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '5ED'
    }),
    run: (data, matches) => {
      var _data$hasFireResist;

      return ((_data$hasFireResist = data.hasFireResist) !== null && _data$hasFireResist !== void 0 ? _data$hasFireResist : data.hasFireResist = {})[matches.target] = true;
    }
  }, {
    id: 'O6N Fire Resistance Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '5ED'
    }),
    run: (data, matches) => {
      var _data$hasFireResist2;

      return ((_data$hasFireResist2 = data.hasFireResist) !== null && _data$hasFireResist2 !== void 0 ? _data$hasFireResist2 : data.hasFireResist = {})[matches.target] = false;
    }
  }, {
    // Flash Fire without Fire Resistance.
    id: 'O6N Flash Fire',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '280B'
    }),
    condition: (data, matches) => {
      var _data$hasFireResist3;

      return !((_data$hasFireResist3 = data.hasFireResist) !== null && _data$hasFireResist3 !== void 0 && _data$hasFireResist3[matches.target]);
    },
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const o6n = (o6n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o6s.ts



// O6S - Sigmascape 2.0 Savage
const o6s_triggerSet = {
  zoneId: zone_id/* default.SigmascapeV20Savage */.Z.SigmascapeV20Savage,
  damageWarn: {
    'O6S Earthquake': '2810',
    // failing to be in a plane
    'O6S Rock Hard': '2812',
    // from portrayal of earth?
    'O6S Flash Torrent 1': '2AB9',
    // from portrayal of water??
    'O6S Flash Torrent 2': '280F',
    // from portrayal of water??
    'O6S Easterly Featherlance': '283E',
    // blown away Easterly circles
    'O6S Demonic Wave': '2830',
    // failing to be behind rock
    'O6S Demonic Spout': '2836',
    // pair of targeted circle'
    'O6S Demonic Stone 1': '2844',
    // chasing circle initial
    'O6S Demonic Stone 2': '2845',
    // chasing circle repeated
    'O6S Intense Pain': '283A' // failing to spread for Demonic Pain tether

  },
  shareWarn: {
    'O6S The Price': '2826' // exploding Last Kiss tankbuster debuff

  },
  triggers: [{
    id: 'O6S Fire Resistance Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '5ED'
    }),
    run: (data, matches) => {
      var _data$hasFireResist;

      return ((_data$hasFireResist = data.hasFireResist) !== null && _data$hasFireResist !== void 0 ? _data$hasFireResist : data.hasFireResist = {})[matches.target] = true;
    }
  }, {
    id: 'O6S Fire Resistance Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '5ED'
    }),
    run: (data, matches) => {
      var _data$hasFireResist2;

      return ((_data$hasFireResist2 = data.hasFireResist) !== null && _data$hasFireResist2 !== void 0 ? _data$hasFireResist2 : data.hasFireResist = {})[matches.target] = false;
    }
  }, {
    // Flash Fire without Fire Resistance.
    id: 'O6S Flash Fire',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '280A'
    }),
    condition: (data, matches) => {
      var _data$hasFireResist3;

      return !((_data$hasFireResist3 = data.hasFireResist) !== null && _data$hasFireResist3 !== void 0 && _data$hasFireResist3[matches.target]);
    },
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    // Look away; does damage if failed.
    id: 'O6S Divine Lure',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '2822',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const o6s = (o6s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o7n.ts

// O7N - Sigmascape 3.0 Normal
const o7n_triggerSet = {
  zoneId: zone_id/* default.SigmascapeV30 */.Z.SigmascapeV30,
  damageWarn: {
    'O7N Magitek Ray': '276B',
    // untelegraphed frontal line
    'O7N Ink': '275D',
    // Initial Ultros targeted circles
    'O7N Tentacle': '275F',
    // Tentacle simulation targeted circles
    'O7N Wallop': '2760',
    // Ultros tentacles attacking
    'O7N Chain Cannon': '2770',
    // baited airship add cannon
    'O7N Missile Explosion': '2765',
    // Hitting a missile
    'O7N Bibliotaph Deep Darkness': '29BF',
    // giant donut
    'O7N Dadaluma Aura Cannon': '2767',
    // large line aoe
    'O7N Guardian Diffractive Laser': '2761',
    // initial Air Force centered circle on Guardian
    'O7N Air Force Diffractive Laser': '273F',
    // Air Force add large conal
    'O7N Interdimensional Explosion': '2763' // Failed bomb (either wrong side or ignored)

  },
  damageFail: {
    'O7N Super Chakra Burst': '2769' // Missed Dadaluma tower (hits everybody)

  },
  gainsEffectFail: {
    'O7N Shocked': '5DA' // touching arena edge

  }
};
/* harmony default export */ const o7n = (o7n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o7s.ts


// TODO: Ink (277D) seems to always be 0x16
// TODO: Failing Virus?
// TODO: failing Interdimensional Bombs?
// O7S - Sigmascape 3.0 Savage
const o7s_triggerSet = {
  zoneId: zone_id/* default.SigmascapeV30Savage */.Z.SigmascapeV30Savage,
  damageWarn: {
    'O7S Magitek Ray': '2788',
    // front line laser
    'O7S Lightning Bomb Explosion': '278E',
    // baited orbs
    'O7S Chain Cannon': '278F',
    // damage from baited aerial attack
    'O7S Tentacle': '277E',
    // tentacles appearing
    'O7S Tentacle Wallop': '277F',
    // tentacles attacking
    'O7S Air Force Diffractive Laser': '2740',
    // Air Force adds conal
    'O7N Guardian Diffractive Laser': '2780',
    // initial Air Force centered circle on Guardian
    'O7S The Heat': '2777',
    // explosion from searing wind
    'O7S Super Chakra Burst': '2786' // failing Dadaluma towers

  },
  damageFail: {
    'O7S Missile': '2782'
  },
  gainsEffectFail: {
    'O7S Shocked': '5DA' // touching arena edge

  },
  shareWarn: {
    'O7S Aura Cannon': '2784' // Dadaluma line aoe

  },
  triggers: [{
    id: 'O7S Stoneskin',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '2AB5'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.source,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const o7s = (o7s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o8n.ts



// O8N - Sigmascape 4.0 Normal
const o8n_triggerSet = {
  zoneId: zone_id/* default.SigmascapeV40 */.Z.SigmascapeV40,
  damageWarn: {
    'O8N Blizzard Blitz 1': '2918',
    'O8N Blizzard Blitz 2': '2914',
    'O8N Thrumming Thunder 1': '291D',
    'O8N Thrumming Thunder 2': '291C',
    'O8N Thrumming Thunder 3': '291B',
    'O8N Wave Cannon': '2928',
    // telegraphed line aoes
    'O8N Revolting Ruin': '2923',
    // large 180 cleave after Timely Teleport
    'O8N Intemperate Will': '292A',
    // east 180 cleave
    'O8N Gravitational Wave': '292B' // west 180 cleave

  },
  shareWarn: {
    'O8N Flagrant Fire Spread': '291F' // true spread markers

  },
  soloWarn: {
    'O8N Flagrant Fire Stack': '2920' // fake spread marker

  },
  triggers: [{
    // Look away; does damage if failed.
    id: 'O8N Indolent Will',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '292C',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    // Look towards; does damage if failed.
    id: 'O8N Ave Maria',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '292B',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'O8N Shockwave',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '2927'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }, {
    id: 'O8N Aero Assault',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '2924'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const o8n = (o8n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o8s.ts



// TODO: failing meteor towers?
// O8S - Sigmascape 4.0 Savage
const o8s_triggerSet = {
  zoneId: zone_id/* default.SigmascapeV40Savage */.Z.SigmascapeV40Savage,
  damageWarn: {
    'O8S1 Thrumming Thunder 1': '28CB',
    'O8S1 Thrumming Thunder 2': '28CC',
    'O8S1 Thrumming Thunder 3': '28CD',
    'O8S1 Thrumming Thunder 4': '2B31',
    'O8S1 Thrumming Thunder 5': '2B2F',
    'O8S1 Thrumming Thunder 6': '2B30',
    'O8S1 Blizzard Blitz 1': '28C4',
    'O8S1 Blizzard Blitz 2': '2BCA',
    'O8S1 Inexorable Will': '28DA',
    // ground circles
    'O8S1 Revolting Ruin': '28D5',
    // large 180 cleave after Timely Teleport
    'O8S1 Intemperate Will': '28DF',
    // east 180 cleave
    'O8S1 Gravitational Wave': '28DE',
    // west 180 cleave
    'O8S2 Blizzard III 1': '2908',
    // celestriad center circle
    'O8S2 Blizzard III 2': '2909',
    // celestriad donut
    'O8S2 Thunder III': '290A',
    // celestriad cross lines
    'O8S2 Trine 1': '290E',
    // eating the golden dorito
    'O8S2 Trine 2': '290F',
    // eating the big golden dorito
    'O8S2 Meteor': '2903',
    // chasing puddles during 2nd forsaken (Meteor 2904 = tower)
    'O8S2 All Things Ending 1': '28F0',
    // Futures Numbered followup
    'O8S2 All Things Ending 2': '28F2',
    // Pasts Forgotten followup
    'O8S2 All Things Ending 3': '28F6',
    // Future's End followup
    'O8S2 All Things Ending 4': '28F9',
    // Past's End followup
    'O8S2 Wings Of Destruction 1': '28FF',
    // half cleave
    'O8S2 Wings Of Destruction 2': '28FE' // half cleave

  },
  damageFail: {
    'O8S2 The Mad Head Big Explosion': '28FD' // not touching skull

  },
  shareWarn: {
    'O8S1 Vitrophyre': '28E2',
    // yellow right tether that must be solo (or knockback)
    'O8S1 Flagrant Fire Spread': '28CF',
    'O8S2 Fire III Spread': '290B',
    // celestriad spread
    'O8S2 The Mad Head Explosion': '28FC' // skull tethers

  },
  shareFail: {
    'O8S1 Hyperdrive': '28E8',
    // phase 1 tankbuster
    'O8S2 Hyperdrive': '229128E8',
    // phase 2 tankbuster
    'O8S2 Wings Of Destruction': '2901' // close/far tank busters

  },
  soloWarn: {
    'O8S1 Flagrant Fire Stack': '28D0',
    'O8S1 Gravitas': '28E0',
    // purple left tether that must be shared, leaving a puddle
    'O8S1 Indomitable Will': '28D9',
    // 4x stack markers
    'O8S2 Fire III Stack': '290C' // celestriad stack

  },
  triggers: [{
    // Look away; does damage if failed.
    id: 'O8S Indolent Will',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '28E4',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    // Look towards; does damage if failed.
    id: 'O8S Ave Maria',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '28E3',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'O8S Shockwave',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '28DB'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }, {
    id: 'O8S Aero Assault',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '28D6'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const o8s = (o8s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o9n.ts

// O9N - Alphascape 1.0 Normal
const o9n_triggerSet = {
  zoneId: zone_id/* default.AlphascapeV10 */.Z.AlphascapeV10,
  damageWarn: {
    'O9N Damning Edict': '3150',
    // huge 180 frontal cleave
    'O9N Stray Spray': '316C',
    // Dynamic Fluid debuff donut explosion
    'O9N Stray Flames': '316B',
    // Entropy debuff circle explosion
    'O9N Knockdown Big Bang': '3160',
    // big circle where Knockdown marker dropped
    'O9N Fire Big Bang': '315F',
    // ground circles during fire phase
    'O9N Shockwave': '3153',
    // Longitudinal/Latiudinal Implosion
    'O9N Chaosphere Fiendish Orbs Orbshadow 1': '3162',
    // line aoes from Earth phase orbs
    'O9N Chaosphere Fiendish Orbs Orbshadow 2': '3163' // line aoes from Earth phase orbs

  }
};
/* harmony default export */ const o9n = (o9n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o10n.ts

// TODO: Akh Rhai (3624) is not unusual to take ~1 hit from, so don't list.
// O10N - Alphascape 2.0 Normal
const o10n_triggerSet = {
  zoneId: zone_id/* default.AlphascapeV20 */.Z.AlphascapeV20,
  damageWarn: {
    'O10N Azure Wings': '31CD',
    // Out
    'O10N Stygian Maw': '31CF',
    // In
    'O10N Horrid Roar': '31D3',
    // targeted circles
    'O10N Bloodied Maw': '31D0',
    // Corners
    'O10N Cauterize': '3241',
    // divebomb attack
    'O10N Scarlet Thread': '362B',
    // orb waffle lines
    'O10N Exaflare 1': '362D',
    'O10N Exaflare 2': '362F'
  },
  shareWarn: {
    'O10N Earth Shaker': '31D1',
    // as it says on the tin
    'O10N Frost Breath': '33EE',
    // Ancient Dragon frontal conal
    'O10N Thunderstorm': '31D2' // purple spread marker

  }
};
/* harmony default export */ const o10n = (o10n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o11n.ts

// O11N - Alphascape 3.0 Normal
const o11n_triggerSet = {
  zoneId: zone_id/* default.AlphascapeV30 */.Z.AlphascapeV30,
  damageWarn: {
    'O11N Starboard Wave Cannon 1': '3281',
    // initial right cleave
    'O11N Starboard Wave Cannon 2': '3282',
    // follow-up right cleave
    'O11N Larboard Wave Cannon 1': '3283',
    // initial left cleave
    'O11N Larboard Wave Cannon 2': '3284',
    // follow-up left cleave
    'O11N Flame Thrower': '327D',
    // pinwheel conals
    'O11N Critical Storage Violation': '3279',
    // missing midphase towers
    'O11N Level Checker Reset': '35AA',
    // "get out" circle
    'O11N Level Checker Reformat': '35A9',
    // "get in" donut
    'O11N Rocket Punch Rush': '3606' // giant hand 1/3 arena line aoes

  },
  gainsEffectWarn: {
    'O11N Burns': 'FA' // standing in ballistic missile fire puddle

  },
  gainsEffectFail: {
    'O11N Memory Loss': '65A' // failing to cleanse Looper in a tower

  },
  shareWarn: {
    'O11N Ballistic Impact': '327F' // spread markers

  },
  shareFail: {
    'O11N Blaster': '3280' // tank tether

  },
  soloFail: {
    'O11N Electric Slide': '3285' // stack marker

  }
};
/* harmony default export */ const o11n = (o11n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o12n.ts


// O12N - Alphascape 4.0 Normal
const o12n_triggerSet = {
  zoneId: zone_id/* default.AlphascapeV40 */.Z.AlphascapeV40,
  damageWarn: {
    'O12N Floodlight': '3309',
    // targeted circular aoes after Program Alpha
    'O12N Efficient Bladework': '32FF',
    // telegraphed centered circle
    'O12N Efficient Bladework Untelegraphed': '32F3',
    // centered circle after transformation
    'O12N Optimized Blizzard III': '3303',
    // cross aoe
    'O12N Superliminal Steel 1': '3306',
    // sides of the room
    'O12N Superliminal Steel 2': '3307',
    // sides of the room
    'O12N Beyond Strength': '3300',
    // donut
    'O12N Optical Laser': '3320',
    // line aoe from eye
    'O12N Optimized Sagittarius Arrow': '3323' // line aoe from Omega-M

  },
  shareWarn: {
    'O12N Solar Ray': '330F' // circular tankbuster

  },
  soloWarn: {
    'O12N Spotlight': '330A' // stack marker

  },
  triggers: [{
    id: 'O12N Discharger Knocked Off',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '32F6'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const o12n = (o12n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o12s.ts



// TODO: could add Patch warnings for double/unbroken tethers
// TODO: Hello World could have any warnings (sorry)
const o12s_triggerSet = {
  zoneId: zone_id/* default.AlphascapeV40Savage */.Z.AlphascapeV40Savage,
  damageWarn: {
    'O12S1 Superliminal Motion 1': '3334',
    // 300+ degree cleave with back safe area
    'O12S1 Efficient Bladework 1': '3329',
    // Omega-M "get out" centered aoe after split
    'O12S1 Efficient Bladework 2': '332A',
    // Omega-M "get out" centered aoe during blades
    'O12S1 Beyond Strength': '3328',
    // Omega-M "get in" centered aoe during shield
    'O12S1 Superliminal Steel 1': '3330',
    // Omega-F "get front/back" blades phase
    'O12S1 Superliminal Steel 2': '3331',
    // Omega-F "get front/back" blades phase
    'O12S1 Optimized Blizzard III': '3332',
    // Omega-F giant cross
    'O12S2 Diffuse Wave Cannon': '3369',
    // back/sides lasers
    'O12S2 Right Arm Unit Hyper Pulse 1': '335A',
    // Rotating Archive Peripheral lasers
    'O12S2 Right Arm Unit Hyper Pulse 2': '335B',
    // Rotating Archive Peripheral lasers
    'O12S2 Right Arm Unit Colossal Blow': '335F',
    // Exploding Archive All hands
    'O12S2 Left Arm Unit Colossal Blow': '3360' // Exploding Archive All hands

  },
  damageFail: {
    'O12S1 Optical Laser': '3347',
    // middle laser from eye
    'O12S1 Advanced Optical Laser': '334A',
    // giant circle centered on eye
    'O12S2 Rear Power Unit Rear Lasers 1': '3361',
    // Archive All initial laser
    'O12S2 Rear Power Unit Rear Lasers 2': '3362' // Archive All rotating laser

  },
  shareWarn: {
    'O12S1 Optimized Fire III': '3337',
    // fire spread
    'O12S2 Hyper Pulse Tether': '335C',
    // Index And Archive Peripheral tethers
    'O12S2 Wave Cannon': '336B',
    // Index And Archive Peripheral baited lasers
    'O12S2 Optimized Fire III': '3379' // Archive All spread

  },
  shareFail: {
    'O12S1 Optimized Sagittarius Arrow': '334D',
    // Omega-M bard limit break
    'O12S2 Oversampled Wave Cannon': '3366',
    // Monitor tank busters
    'O12S2 Savage Wave Cannon': '336D' // Tank buster with the vuln first

  },
  triggers: [{
    id: 'O12S1 Discharger Knocked Off',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '3327'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }, {
    id: 'O12S1 Magic Vulnerability Up Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '472'
    }),
    run: (data, matches) => {
      var _data$vuln;

      (_data$vuln = data.vuln) !== null && _data$vuln !== void 0 ? _data$vuln : data.vuln = {};
      data.vuln[matches.target] = true;
    }
  }, {
    id: 'O12S1 Magic Vulnerability Up Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '472'
    }),
    run: (data, matches) => {
      data.vuln = data.vuln || {};
      data.vuln[matches.target] = false;
    }
  }, {
    id: 'O12S1 Magic Vulnerability Damage',
    type: 'Ability',
    // 332E = Pile Pitch stack
    // 333E = Electric Slide (Omega-M square 1-4 dashes)
    // 333F = Electric Slide (Omega-F triangle 1-4 dashes)
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: ['332E', '333E', '333F'],
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.vuln && data.vuln[matches.target],
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: {
          en: `${matches.ability} (with vuln)`,
          de: `${matches.ability} (mit Verwundbarkeit)`,
          ja: `${matches.ability} (被ダメージ上昇)`,
          cn: `${matches.ability} (带易伤)`
        }
      };
    }
  }]
};
/* harmony default export */ const o12s = (o12s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/trial/byakko-ex.ts



// Byakko Extreme
const byakko_ex_triggerSet = {
  zoneId: zone_id/* default.TheJadeStoaExtreme */.Z.TheJadeStoaExtreme,
  damageWarn: {
    // Popping Unrelenting Anguish bubbles
    'ByaEx Aratama': '27F6',
    // Stepping in growing orb
    'ByaEx Vacuum Claw': '27E9',
    // Lightning Puddles
    'ByaEx Hunderfold Havoc 1': '27E5',
    'ByaEx Hunderfold Havoc 2': '27E6'
  },
  damageFail: {
    'ByaEx Sweep The Leg': '27DB',
    'ByaEx Fire and Lightning': '27DE',
    'ByaEx Distant Clap': '27DD',
    // Midphase line attack
    'ByaEx Imperial Guard': '27F1'
  },
  triggers: [{
    // Pink bubble collision
    id: 'ByaEx Ominous Wind',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '27EC',
      ...oopsy_common/* playerDamageFields */.np
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: {
          en: 'bubble collision',
          de: 'Blasen sind zusammengestoßen',
          fr: 'collision de bulles',
          ja: '衝突',
          cn: '相撞',
          ko: '장판 겹쳐서 터짐'
        }
      };
    }
  }]
};
/* harmony default export */ const byakko_ex = (byakko_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/trial/shinryu.ts



// Shinryu Normal
const shinryu_triggerSet = {
  zoneId: zone_id/* default.TheRoyalMenagerie */.Z.TheRoyalMenagerie,
  damageWarn: {
    'Shinryu Akh Rhai': '1FA6',
    // Sky lasers alongside Akh Morn.
    'Shinryu Blazing Trail': '221A',
    // Rectangle AoEs, intermission adds.
    'Shinryu Collapse': '2218',
    // Circle AoEs, intermission adds
    'Shinryu Dragonfist': '24F0',
    // Giant punchy circle in the center.
    'Shinryu Earth Breath': '1F9D',
    // Conal attacks that aren't actually Earth Shakers.
    'Shinryu Gyre Charge': '1FA8',
    // Green dive bomb attack.
    'Shinryu Spikesicle': '1FA`',
    // Blue-green line attacks from behind.
    'Shinryu Tail Slap': '1F93' // Red squares indicating the tail's landing spots.

  },
  shareWarn: {
    'Shinryu Levinbolt': '1F9C'
  },
  triggers: [{
    // Icy floor attack.
    id: 'Shinryu Diamond Dust',
    type: 'GainsEffect',
    // Thin Ice
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '38F'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Slid off!',
          de: 'Runter gerutscht!',
          fr: 'A glissé(e) !',
          ja: '滑った',
          cn: '滑落'
        }
      };
    }
  }, {
    id: 'Shinryu Tidal Wave',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '1F8B',
      ...oopsy_common/* playerDamageFields */.np
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Pushed off!',
          de: 'Runter geschubst!',
          fr: 'A été poussé(e) !',
          ja: '落ちた',
          cn: '击退坠落'
        }
      };
    }
  }, {
    // Knockback from center.
    id: 'Shinryu Aerial Blast',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '1F90',
      ...oopsy_common/* playerDamageFields */.np
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Pushed off!',
          de: 'Runter geschubst!',
          fr: 'A été pousser !',
          ja: '落ちた',
          cn: '击退坠落'
        }
      };
    }
  }]
};
/* harmony default export */ const shinryu = (shinryu_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/trial/susano-ex.ts

// Susano Extreme
const susano_ex_triggerSet = {
  zoneId: zone_id/* default.ThePoolOfTributeExtreme */.Z.ThePoolOfTributeExtreme,
  damageWarn: {
    'SusEx Churning': '203F'
  },
  damageFail: {
    'SusEx Rasen Kaikyo': '202E'
  }
};
/* harmony default export */ const susano_ex = (susano_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/trial/suzaku.ts



// Suzaku Normal
const suzaku_triggerSet = {
  zoneId: zone_id/* default.HellsKier */.Z.HellsKier,
  damageWarn: {
    'Suzaku Normal Ashes To Ashes': '321F',
    // Scarlet Lady add, raidwide explosion if not killed in time
    'Suzaku Normal Fleeting Summer': '3223',
    // Cone AoE (randomly targeted)
    'Suzaku Normal Wing And A Prayer': '3225',
    // Circle AoEs from unkilled plumes
    'Suzaku Normal Phantom Half': '3233',
    // Giant half-arena AoE follow-up after tank buster
    'Suzaku Normal Well Of Flame': '3236',
    // Large rectangle AoE (randomly targeted)
    'Suzaku Normal Hotspot': '3238',
    // Platform fire when the runes are activated
    'Suzaku Normal Swoop': '323B',
    // Star cross line AoEs
    'Suzaku Normal Burn': '323D' // Tower mechanic failure on Incandescent Interlude (party failure, not personal)

  },
  shareWarn: {
    'Suzaku Normal Rekindle': '3235' // Purple spread circles

  },
  triggers: [{
    id: 'Suzaku Normal Ruthless Refrain',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '3230',
      ...oopsy_common/* playerDamageFields */.np
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Pushed off!',
          de: 'Runter geschubst!',
          fr: 'A été poussé(e) !',
          ja: '落ちた',
          cn: '击退坠落'
        }
      };
    }
  }]
};
/* harmony default export */ const suzaku = (suzaku_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/ultimate/ultima_weapon_ultimate.ts



// Ultima Weapon Ultimate
const ultima_weapon_ultimate_triggerSet = {
  zoneId: zone_id/* default.TheWeaponsRefrainUltimate */.Z.TheWeaponsRefrainUltimate,
  damageWarn: {
    'UWU Searing Wind': '2B5C',
    'UWU Eruption': '2B5A',
    'UWU Weight': '2B65',
    'UWU Landslide1': '2B70',
    'UWU Landslide2': '2B71'
  },
  damageFail: {
    'UWU Great Whirlwind': '2B41',
    'UWU Slipstream': '2B53',
    'UWU Wicked Wheel': '2B4E',
    'UWU Wicked Tornado': '2B4F'
  },
  triggers: [{
    id: 'UWU Windburn',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: 'EB'
    }),
    suppressSeconds: 2,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    // Featherlance explosion.  It seems like the person who pops it is the
    // first person listed damage-wise, so they are likely the culprit.
    id: 'UWU Featherlance',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '2B43',
      ...oopsy_common/* playerDamageFields */.np
    }),
    suppressSeconds: 5,
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.source
      };
    }
  }]
};
/* harmony default export */ const ultima_weapon_ultimate = (ultima_weapon_ultimate_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/ultimate/unending_coil_ultimate.ts



// UCU - The Unending Coil Of Bahamut (Ultimate)
const unending_coil_ultimate_triggerSet = {
  zoneId: zone_id/* default.TheUnendingCoilOfBahamutUltimate */.Z.TheUnendingCoilOfBahamutUltimate,
  damageFail: {
    'UCU Lunar Dynamo': '26BC',
    'UCU Iron Chariot': '26BB',
    'UCU Exaflare': '26EF',
    'UCU Wings Of Salvation': '26CA'
  },
  triggers: [{
    id: 'UCU Twister Death',
    type: 'Ability',
    // Instant death has a special flag value, differentiating
    // from the explosion damage you take when somebody else
    // pops one.
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '26AB',
      ...oopsy_common/* playerDamageFields */.np,
      flags: oopsy_common/* kFlagInstantDeath */.hm
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: {
          en: 'Twister Pop',
          de: 'Wirbelsturm berührt',
          fr: 'Apparition des tornades',
          ja: 'ツイスター',
          cn: '旋风',
          ko: '회오리 밟음'
        }
      };
    }
  }, {
    id: 'UCU Thermionic Burst',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '26B9',
      ...oopsy_common/* playerDamageFields */.np
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: {
          en: 'Pizza Slice',
          de: 'Pizzastück',
          fr: 'Parts de pizza',
          ja: 'サーミオニックバースト',
          cn: '天崩地裂',
          ko: '장판에 맞음'
        }
      };
    }
  }, {
    id: 'UCU Chain Lightning',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '26C8',
      ...oopsy_common/* playerDamageFields */.np
    }),
    mistake: (_data, matches) => {
      // It's hard to assign blame for lightning.  The debuffs
      // go out and then explode in order, but the attacker is
      // the dragon and not the player.
      return {
        type: 'warn',
        name: matches.target,
        text: {
          en: 'hit by lightning',
          de: 'vom Blitz getroffen',
          fr: 'frappé(e) par la foudre',
          ja: 'チェインライトニング',
          cn: '雷光链',
          ko: '번개 맞음'
        }
      };
    }
  }, {
    id: 'UCU Burns',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: 'FA'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'UCU Sludge',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '11F'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'UCU Doom Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: 'D2'
    }),
    run: (data, matches) => {
      var _data$hasDoom;

      (_data$hasDoom = data.hasDoom) !== null && _data$hasDoom !== void 0 ? _data$hasDoom : data.hasDoom = {};
      data.hasDoom[matches.target] = true;
    }
  }, {
    id: 'UCU Doom Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: 'D2'
    }),
    run: (data, matches) => {
      var _data$hasDoom2;

      (_data$hasDoom2 = data.hasDoom) !== null && _data$hasDoom2 !== void 0 ? _data$hasDoom2 : data.hasDoom = {};
      data.hasDoom[matches.target] = false;
    }
  }, {
    // There is no callout for "you forgot to clear doom".  The logs look
    // something like this:
    //   [20:02:30.564] 1A:Okonomi Yaki gains the effect of Doom from  for 6.00 Seconds.
    //   [20:02:36.443] 1E:Okonomi Yaki loses the effect of Protect from Tako Yaki.
    //   [20:02:36.443] 1E:Okonomi Yaki loses the effect of Doom from .
    //   [20:02:38.525] 19:Okonomi Yaki was defeated by Firehorn.
    // In other words, doom effect is removed +/- network latency, but can't
    // tell until later that it was a death.  Arguably, this could have been a
    // close-but-successful clearing of doom as well.  It looks the same.
    // Strategy: if you haven't cleared doom with 1 second to go then you probably
    // died to doom.  You can get non-fatally iceballed or auto'd in between,
    // but what can you do.
    id: 'UCU Doom Death',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: 'D2'
    }),
    delaySeconds: (_data, matches) => parseFloat(matches.duration) - 1,
    deathReason: (data, matches) => {
      if (!data.hasDoom || !data.hasDoom[matches.target]) return;
      let text;
      const duration = parseFloat(matches.duration);
      if (duration < 9) text = matches.effect + ' #1';else if (duration < 14) text = matches.effect + ' #2';else text = matches.effect + ' #3';
      return {
        name: matches.target,
        text: text
      };
    }
  }]
};
/* harmony default export */ const unending_coil_ultimate = (unending_coil_ultimate_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/alliance/the_copied_factory.ts

// The Copied Factory
const the_copied_factory_triggerSet = {
  zoneId: zone_id/* default.TheCopiedFactory */.Z.TheCopiedFactory,
  damageWarn: {
    'Copied Serial Energy Bomb': '48B4',
    // Make sure enemies are ignored on these
    'Copied Serial Energy Bombardment': '48B8',
    'Copied Serial Energy Assault': '48B6',
    'Copied Serial High-Powered Laser': '48C5',
    'Copied Serial Sidestriking Spin Spin 1': '48CB',
    'Copied Serial Sidestriking Spin 2': '48CC',
    'Copied Serial Centrifugal Spin': '48C9',
    'Copied Serial Air-To-Surface Energy': '48BA',
    'Copied Serial High-Caliber Laser': '48FA',
    'Copied Serial Energy Ring 1': '48BC',
    'Copied Serial Energy Ring 2': '48BD',
    'Copied Serial Energy Ring 3': '48BE',
    'Copied Serial Energy Ring 4': '48C0',
    'Copied Serial Energy Ring 5': '48C1',
    'Copied Serial Energy Ring 6': '48C2',
    'Copied Trash Energy Bomb': '491D',
    'Copied Trash Frontal Somersault': '491B',
    'Copied Trash High-Frequency Laser': '491E',
    'Copied Hobbes Shocking Discharge': '480B',
    'Copied Hobbes Variable Combat Test 1': '49C5',
    'Copied Hobbes Variable Combat Test 2': '49C6',
    'Copied Hobbes Variable Combat Test 3': '49C7',
    'Copied Hobbes Variable Combat Test 4': '480F',
    'Copied Hobbes Variable Combat Test 5': '4810',
    'Copied Hobbes Variable Combat Test 6': '4811',
    'Copied Hobbes Ring Laser 1': '4802',
    'Copied Hobbes Ring Laser 2': '4803',
    'Copied Hobbes Ring Laser 3': '4804',
    'Copied Hobbes Towerfall': '4813',
    'Copied Hobbes Fire-Reistance Test 1': '4816',
    'Copied Hobbes Fire-Reistance Test 2': '4817',
    'Copied Hobbes Fire-Reistance Test 3': '4818',
    'Copied Hobbes Oil Well': '481B',
    'Copied Hobbes Electromagnetic Pulse': '4819',
    // TODO: what's the electrified floor with conveyor belts?
    'Copied Goliath Energy Ring 1': '4937',
    'Copied Goliath Energy Ring 2': '4938',
    'Copied Goliath Energy Ring 3': '4939',
    'Copied Goliath Energy Ring 4': '493A',
    'Copied Goliath Energy Ring 5': '4937',
    'Copied Goliath Laser Turret': '48E6',
    'Copied Flight Unit Area Bombing': '4943',
    'Copied Flight Unit Lightfast Blade': '4940',
    'Copied Engels Marx Smash 1': '4729',
    'Copied Engels Marx Smash 2': '4728',
    'Copied Engels Marx Smash 3': '472F',
    'Copied Engels Marx Smash 4': '4731',
    'Copied Engels Marx Smash 5': '472B',
    'Copied Engels Marx Smash 6': '472D',
    'Copied Engels Marx Smash 7': '4732',
    'Copied Engels Incendiary Bombing': '4739',
    'Copied Engels Guided Missile': '4736',
    'Copied Engels Surface Missile': '4734',
    'Copied Engels Laser Sight': '473B',
    'Copied Engels Frack': '474D',
    'Copied Engels Marx Crush': '48FC',
    'Copied Engels Crushing Wheel': '474B',
    'Copied Engels Marx Thrust': '48FC',
    'Copied 9S Laser Suppression': '48E0',
    // Cannons
    'Copied 9S Ballistic Impact 1': '4974',
    'Copied 9S Ballistic Impact 2': '48DC',
    'Copied 9S Ballistic Impact 3': '48E4',
    'Copied 9S Ballistic Impact 4': '48E0',
    'Copied 9S Marx Impact': '48D4',
    'Copied 9S Tank Destruction 1': '48E8',
    'Copied 9S Tank Destruction 2': '48E9',
    'Copied 9S Serial Spin 1': '48A5',
    'Copied 9S Serial Spin 2': '48A7'
  },
  shareWarn: {
    'Copied Hobbes Short-Range Missile': '4815'
  }
};
/* harmony default export */ const the_copied_factory = (the_copied_factory_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/alliance/the_puppets_bunker.ts

// TODO: 5093 taking High-Powered Laser with a vuln (because of taking two)
// TODO: 4FB5 taking High-Powered Laser with a vuln (because of taking two)
// TODO: 50D3 Aerial Support: Bombardment going off from add
// TODO: 5211 Maneuver: Volt Array not getting interrupted
// TODO: 4FF4/4FF5 One of these is failing chemical conflagration
// TODO: standing in wrong teleporter?? maybe 5363?
const the_puppets_bunker_triggerSet = {
  zoneId: zone_id/* default.ThePuppetsBunker */.Z.ThePuppetsBunker,
  damageWarn: {
    'Puppet Aegis Beam Cannons 1': '5074',
    // rotating separating white ground aoe
    'Puppet Aegis Beam Cannons 2': '5075',
    // rotating separating white ground aoe
    'Puppet Aegis Beam Cannons 3': '5076',
    // rotating separating white ground aoe
    'Puppet Aegis Collider Cannons': '507E',
    // rotating red ground aoe pinwheel
    'Puppet Aegis Surface Laser 1': '5091',
    // chasing laser initial
    'Puppet Aegis Surface Laser 2': '5092',
    // chasing laser chasing
    'Puppet Aegis Flight Path': '508C',
    // blue line aoe from flying untargetable adds
    'Puppet Aegis Refraction Cannons 1': '5081',
    // refraction cannons between wings
    'Puppet Aegis Life\'s Last Song': '53B3',
    // ring aoe with gap
    'Puppet Light Long-Barreled Laser': '5212',
    // line aoe from add
    'Puppet Light Surface Missile Impact': '520F',
    // untargeted ground aoe from No Restrictions
    'Puppet Superior Incendiary Bombing': '4FB9',
    // fire puddle initial
    'Puppet Superior Sharp Turn': '506D',
    // sharp turn dash
    'Puppet Superior Standard Surface Missile 1': '4FB1',
    // Lethal Revolution circles
    'Puppet Superior Standard Surface Missile 2': '4FB2',
    // Lethal Revolution circles
    'Puppet Superior Standard Surface Missile 3': '4FB3',
    // Lethal Revolution circles
    'Puppet Superior Sliding Swipe 1': '506F',
    // right-handed sliding swipe
    'Puppet Superior Sliding Swipe 2': '5070',
    // left-handed sliding swipe
    'Puppet Superior Guided Missile': '4FB8',
    // ground aoe during Area Bombardment
    'Puppet Superior High-Order Explosive Blast 1': '4FC0',
    // star aoe
    'Puppet Superior High-Order Explosive Blast 2': '4FC1',
    // star aoe
    'Puppet Heavy Energy Bombardment': '4FFC',
    // colored magic hammer-y ground aoe
    'Puppet Heavy Revolving Laser': '5000',
    // get under laser
    'Puppet Heavy Energy Bomb': '4FFA',
    // getting hit by ball during Active Suppressive Unit
    'Puppet Heavy R010 Laser': '4FF0',
    // laser pod
    'Puppet Heavy R030 Hammer': '4FF1',
    // circle aoe pod
    'Puppet Hallway High-Powered Laser': '50B1',
    // long aoe in the hallway section
    'Puppet Hallway Energy Bomb': '50B2',
    // running into a floating orb
    'Puppet Compound Mechanical Dissection': '51B3',
    // spinning vertical laser
    'Puppet Compound Mechanical Decapitation': '51B4',
    // get under laser
    'Puppet Compound Mechnical Contusion Untargeted': '51B7',
    // untargeted ground aoe
    'Puppet Compound 2P Relentless Spiral 1': '51AA',
    // triple untargeted ground aoes
    'Puppet Compound 2P Relentless Spiral 2': '51CB',
    // triple untargeted ground aoes
    'Puppet Compound 2P Prime Blade Out 1': '541F',
    // 2P prime blade get out
    'Puppet Compound 2P Prime Blade Out 2': '5198',
    // 2P/puppet teleporting/reproduce prime blade get out
    'Puppet Compound 2P Prime Blade Behind 1': '5420',
    // 2P prime blade get behind
    'Puppet Compound 2P Prime Blade Behind 2': '5199',
    // 2P teleporting prime blade get behind
    'Puppet Compound 2P Prime Blade In 1': '5421',
    // 2P prime blade get in
    'Puppet Compound 2P Prime Blade In 2': '519A',
    // 2P/puppet teleporting/reproduce prime blade get in
    'Puppet Compound 2P R012 Laser Ground': '51AE' // untargeted ground circle
    // This is... too noisy.
    // 'Puppet Compound 2P Four Parts Resolve 1': '51A0', // four parts resolve jump
    // 'Puppet Compound 2P Four Parts Resolve 2': '519F', // four parts resolve cleave

  },
  damageFail: {
    'Puppet Heavy Upper Laser 1': '5087',
    // upper laser initial
    'Puppet Heavy Upper Laser 2': '4FF7',
    // upper laser continuous
    'Puppet Heavy Lower Laser 1': '5086',
    // lower laser first section initial
    'Puppet Heavy Lower Laser 2': '4FF6',
    // lower laser first section continuous
    'Puppet Heavy Lower Laser 3': '5088',
    // lower laser second section initial
    'Puppet Heavy Lower Laser 4': '4FF8',
    // lower laser second section continuous
    'Puppet Heavy Lower Laser 5': '5089',
    // lower laser third section initial
    'Puppet Heavy Lower Laser 6': '4FF9',
    // lower laser third section continuous
    'Puppet Compound Incongruous Spin': '51B2' // find the safe spot double dash

  },
  gainsEffectWarn: {
    'Puppet Burns': '10B' // standing in many various fire aoes

  },
  shareWarn: {
    // This is pretty large and getting hit by initial without burns seems fine.
    // 'Puppet Light Homing Missile Impact': '5210', // targeted fire aoe from No Restrictions
    'Puppet Heavy Unconventional Voltage': '5004',
    // Pretty noisy.
    'Puppet Maneuver High-Powered Laser': '5002',
    // tank laser
    'Puppet Compound Mechnical Contusion Targeted': '51B6',
    // targeted spread marker
    'Puppet Compound 2P R012 Laser Tank': '51AE' // targeted spread pod laser on non-tank

  },
  shareFail: {
    'Puppet Aegis Anti-Personnel Laser': '5090',
    // tank buster marker
    'Puppet Superior Precision-Guided Missile': '4FC5',
    'Puppet Compound 2P R012 Laser Tank': '51AD' // targeted pod laser on tank

  }
};
/* harmony default export */ const the_puppets_bunker = (the_puppets_bunker_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/alliance/the_tower_at_paradigms_breach.ts


// TODO: missing Shock Black 2?
// TODO: White/Black Dissonance damage is maybe when flags end in 03?
const the_tower_at_paradigms_breach_triggerSet = {
  zoneId: zone_id/* default.TheTowerAtParadigmsBreach */.Z.TheTowerAtParadigmsBreach,
  damageWarn: {
    'Tower Knave Colossal Impact Center 1': '5EA7',
    // Center aoe from Knave and clones
    'Tower Knave Colossal Impact Center 2': '60C8',
    // Center aoe from Knave during lunge
    'Tower Knave Colossal Impact Side 1': '5EA5',
    // Side aoes from Knave and clones
    'Tower Knave Colossal Impact Side 2': '5EA6',
    // Side aoes from Knave and clones
    'Tower Knave Colossal Impact Side 3': '60C6',
    // Side aoes from Knave during lunge
    'Tower Knave Colossal Impact Side 4': '60C7',
    // Side aoes from Knave during lunge
    'Tower Knave Burst': '5ED4',
    // Spheroid Knavish Bullets collision
    'Tower Knave Magic Barrage': '5EAC',
    // Spheroid line aoes
    'Tower Hansel Repay': '5C70',
    // Shield damage
    'Tower Hansel Explosion': '5C67',
    // Being hit by Magic Bullet during Passing Lance
    'Tower Hansel Impact': '5C5C',
    // Being hit by Magical Confluence during Wandering Trail
    'Tower Hansel Bloody Sweep 1': '5C6C',
    // Dual cleaves without tether
    'Tower Hansel Bloody Sweep 2': '5C6D',
    // Dual cleaves without tether
    'Tower Hansel Bloody Sweep 3': '5C6E',
    // Dual cleaves with tether
    'Tower Hansel Bloody Sweep 4': '5C6F',
    // Dual cleaves with tether
    'Tower Hansel Passing Lance': '5C66',
    // The Passing Lance charge itself
    'Tower Hansel Breaththrough 1': '55B3',
    // half room cleave during Wandering Trail
    'Tower Hansel Breaththrough 2': '5C5D',
    // half room cleave during Wandering Trail
    'Tower Hansel Breaththrough 3': '5C5E',
    // half room cleave during Wandering Trail
    'Tower Hansel Hungry Lance 1': '5C71',
    // 2xlarge conal cleave during Wandering Trail
    'Tower Hansel Hungry Lance 2': '5C72',
    // 2xlarge conal cleave during Wandering Trail
    'Tower Flight Unit Lightfast Blade': '5BFE',
    // large room cleave
    'Tower Flight Unit Standard Laser': '5BFF',
    // tracking laser
    'Tower 2P Whirling Assault': '5BFB',
    // line aoe from 2P clones
    'Tower 2P Balanced Edge': '5BFA',
    // circular aoe on 2P clones
    'Tower Red Girl Generate Barrier 1': '6006',
    // being hit by barriers appearing
    'Tower Red Girl Generate Barrier 2': '6007',
    // being hit by barriers appearing
    'Tower Red Girl Generate Barrier 3': '6008',
    // being hit by barriers appearing
    'Tower Red Girl Generate Barrier 4': '6009',
    // being hit by barriers appearing
    'Tower Red Girl Generate Barrier 5': '6310',
    // being hit by barriers appearing
    'Tower Red Girl Generate Barrier 6': '6311',
    // being hit by barriers appearing
    'Tower Red Girl Generate Barrier 7': '6312',
    // being hit by barriers appearing
    'Tower Red Girl Generate Barrier 8': '6313',
    // being hit by barriers appearing
    'Tower Red Girl Shock White 1': '600F',
    // white shockwave circle not dropped on black
    'Tower Red Girl Shock White 2': '6010',
    // white shockwave circle not dropped on black
    'Tower Red Girl Shock Black 1': '6011',
    // black shockwave circle not dropped on white
    'Tower Red Girl Point White 1': '601F',
    // being hit by a white laser
    'Tower Red Girl Point White 2': '6021',
    // being hit by a white laser
    'Tower Red Girl Point Black 1': '6020',
    // being hit by a black laser
    'Tower Red Girl Point Black 2': '6022',
    // being hit by a black laser
    'Tower Red Girl Wipe White': '600C',
    // not line of sighting the white meteor
    'Tower Red Girl Wipe Black': '600D',
    // not line of sighting the black meteor
    'Tower Red Girl Diffuse Energy': '6056',
    // rotating clone bubble cleaves
    'Tower Red Girl Pylon Big Explosion': '6027',
    // not killing a pylon during hacking phase
    'Tower Red Girl Pylon Explosion': '6026',
    // pylon during Child's play
    'Tower Philosopher Deploy Armaments Middle': '5C02',
    // middle laser
    'Tower Philosopher Deploy Armaments Sides': '5C05',
    // sides laser
    'Tower Philosopher Deploy Armaments 3': '6078',
    // goes with 5C01
    'Tower Philosopher Deploy Armaments 4': '6079',
    // goes with 5C04
    'Tower Philosopher Energy Bomb': '5C05',
    // pink bubble
    'Tower False Idol Made Magic Right': '5BD7',
    // rotating wheel going right
    'Tower False Idol Made Magic Left': '5BD6',
    // rotating wheel going left
    'Tower False Idol Lighter Note': '5BDA',
    // lighter note moving aoes
    'Tower False Idol Magical Interference': '5BD5',
    // lasers during Rhythm Rings
    'Tower False Idol Scattered Magic': '5BDF',
    // circle aoes from Seed Of Magic
    'Tower Her Inflorescence Uneven Fotting': '5BE2',
    // building from Recreate Structure
    'Tower Her Inflorescence Crash': '5BE5',
    // trains from Mixed Signals
    'Tower Her Inflorescence Heavy Arms 1': '5BED',
    // heavy arms front/back attack
    'Tower Her Inflorescence Heavy Arms 2': '5BEF',
    // heavy arms sides attack
    'Tower Her Inflorescence Energy Scattered Magic': '5BE8' // orbs from Red Girl by train

  },
  damageFail: {
    'Tower Her Inflorescence Place Of Power': '5C0D' // instadeath middle circle before black/white rings

  },
  shareWarn: {
    'Tower Knave Magic Artillery Alpha': '5EAB',
    // Spread
    'Tower Hansel Seed Of Magic Alpha': '5C61' // Spread

  },
  shareFail: {
    'Tower Knave Magic Artillery Beta': '5EB3',
    // Tankbuster
    'Tower Red Girl Manipulate Energy': '601A',
    // Tankbuster
    'Tower False Idol Darker Note': '5BDC' // Tankbuster

  },
  triggers: [{
    id: 'Tower Knocked Off',
    type: 'Ability',
    // 5EB1 = Knave Lunge
    // 5BF2 = Her Infloresence Shockwave
    netRegex: netregexes/* default.ability */.Z.ability({
      id: ['5EB1', '5BF2']
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const the_tower_at_paradigms_breach = (the_tower_at_paradigms_breach_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/akadaemia_anyder.ts

const akadaemia_anyder_triggerSet = {
  zoneId: zone_id/* default.AkadaemiaAnyder */.Z.AkadaemiaAnyder,
  damageWarn: {
    'Anyder Acrid Stream': '4304',
    'Anyder Waterspout': '4306',
    'Anyder Raging Waters': '4302',
    'Anyder Violent Breach': '4305',
    'Anyder Tidal Guillotine 1': '3E08',
    'Anyder Tidal Guillotine 2': '3E0A',
    'Anyder Pelagic Cleaver 1': '3E09',
    'Anyder Pelagic Cleaver 2': '3E0B',
    'Anyder Aquatic Lance': '3E05',
    'Anyder Syrup Spout': '4308',
    'Anyder Needle Storm': '4309',
    'Anyder Extensible Tendrils 1': '3E10',
    'Anyder Extensible Tendrils 2': '3E11',
    'Anyder Putrid Breath': '3E12',
    'Anyder Detonator': '430F',
    'Anyder Dominion Slash': '430D',
    'Anyder Quasar': '430B',
    'Anyder Dark Arrivisme': '430E',
    'Anyder Thunderstorm': '3E1C',
    'Anyder Winding Current': '3E1F' // 3E20 is being hit by the growing orbs, maybe?

  }
};
/* harmony default export */ const akadaemia_anyder = (akadaemia_anyder_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/amaurot.ts

const amaurot_triggerSet = {
  zoneId: zone_id/* default.Amaurot */.Z.Amaurot,
  damageWarn: {
    'Amaurot Burning Sky': '354A',
    'Amaurot Whack': '353C',
    'Amaurot Aetherspike': '353B',
    'Amaurot Venemous Breath': '3CCE',
    'Amaurot Cosmic Shrapnel': '4D26',
    'Amaurot Earthquake': '3CCD',
    'Amaurot Meteor Rain': '3CC6',
    'Amaurot Final Sky': '3CCB',
    'Amaurot Malevolence': '3541',
    'Amaurot Turnabout': '3542',
    'Amaurot Sickly Inferno': '3DE3',
    'Amaurot Disquieting Gleam': '3546',
    'Amaurot Black Death': '3543',
    'Amaurot Force of Loathing': '3544',
    'Amaurot Damning Ray 1': '3E00',
    'Amaurot Damning Ray 2': '3E01',
    'Amaurot Deadly Tentacles': '3547',
    'Amaurot Misfortune': '3CE2'
  },
  damageFail: {
    'Amaurot Apokalypsis': '3CD7'
  }
};
/* harmony default export */ const amaurot = (amaurot_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/anamnesis_anyder.ts

const anamnesis_anyder_triggerSet = {
  zoneId: zone_id/* default.AnamnesisAnyder */.Z.AnamnesisAnyder,
  damageWarn: {
    'Anamnesis Trench Phuabo Spine Lash': '4D1A',
    // frontal conal
    'Anamnesis Trench Anemone Falling Rock': '4E37',
    // ground circle aoe from Trench Anemone showing up
    'Anamnesis Trench Dagonite Sewer Water': '4D1C',
    // frontal conal from Trench Anemone (?!)
    'Anamnesis Trench Yovra Rock Hard': '4D21',
    // targeted circle aoe
    'Anamnesis Trench Yovra Torrential Torment': '4D21',
    // frontal conal
    'Anamnesis Unknown Luminous Ray': '4E27',
    // Unknown line aoe
    'Anamnesis Unknown Sinster Bubble Explosion': '4B6E',
    // Unknown explosions during Scrutiny
    'Anamnesis Unknown Reflection': '4B6F',
    // Unknown conal attack during Scrutiny
    'Anamnesis Unknown Clearout 1': '4B74',
    // Unknown frontal cone
    'Anamnesis Unknown Clearout 2': '4B6B',
    // Unknown frontal cone
    'Anamnesis Unknown Setback 1': '4B75',
    // Unknown rear cone
    'Anamnesis Unknown Setback 2': '5B6C',
    // Unknown rear cone
    'Anamnesis Anyder Clionid Acrid Stream': '4D24',
    // targeted circle aoe
    'Anamnesis Anyder Diviner Dreadstorm': '4D28',
    // ground circle aoe
    'Anamnesis Kyklops 2000-Mina Swing': '4B55',
    // Kyklops get out mechanic
    'Anamnesis Kyklops Terrible Hammer': '4B5D',
    // Kyklops Hammer/Blade alternating squares
    'Anamnesis Kyklops Terrible Blade': '4B5E',
    // Kyklops Hammer/Blade alternating squares
    'Anamnesis Kyklops Raging Glower': '4B56',
    // Kyklops line aoe
    'Anamnesis Kyklops Eye Of The Cyclone': '4B57',
    // Kyklops donut
    'Anamnesis Anyder Harpooner Hydroball': '4D26',
    // frontal conal
    'Anamnesis Rukshs Swift Shift': '4B83',
    // Rukshs Deem teleport N/S
    'Anamnesis Rukshs Depth Grip Wavebreaker': '33D4',
    // Rukshs Deem hand attacks
    'Anamnesis Rukshs Rising Tide': '4B8B',
    // Rukshs Deem cross aoe
    'Anamnesis Rukshs Command Current': '4B82' // Rukshs Deem protean-ish ground aoes

  },
  shareWarn: {
    'Anamnesis Trench Xzomit Mantle Drill': '4D19',
    // charge attack
    'Anamnesis Io Ousia Barreling Smash': '4E24',
    // charge attack
    'Anamnesis Kyklops Wanderer\'s Pyre': '4B5F' // Kyklops spread attack

  }
};
/* harmony default export */ const anamnesis_anyder = (anamnesis_anyder_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/dohn_mheg.ts


// TODO: Missing Growing tethers on boss 2.
// (Maybe gather party member names on the previous TIIIIMBEEEEEER cast for comparison?)
// TODO: Failing to interrupt Dohnfaust Fuath on Watering Wheel casts?
// (15:........:Dohnfast Fuath:3DAA:Watering Wheel:........:(\y{Name}):)
const dohn_mheg_triggerSet = {
  zoneId: zone_id/* default.DohnMheg */.Z.DohnMheg,
  damageWarn: {
    'Dohn Mheg Geyser': '2260',
    // Water eruptions, boss 1
    'Dohn Mheg Hydrofall': '22BD',
    // Ground AoE marker, boss 1
    'Dohn Mheg Laughing Leap': '2294',
    // Ground AoE marker, boss 1
    'Dohn Mheg Swinge': '22CA',
    // Frontal cone, boss 2
    'Dohn Mheg Canopy': '3DB0',
    // Frontal cone, Dohnfaust Rowans throughout instance
    'Dohn Mheg Pinecone Bomb': '3DB1',
    // Circular ground AoE marker, Dohnfaust Rowans throughout instance
    'Dohn Mheg Bile Bombardment': '34EE',
    // Ground AoE marker, boss 3
    'Dohn Mheg Corrosive Bile': '34EC',
    // Frontal cone, boss 3
    'Dohn Mheg Flailing Tentacles': '3681'
  },
  triggers: [{
    id: 'Dohn Mheg Imp Choir',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '46E'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'Dohn Mheg Toad Choir',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '1B7'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'Dohn Mheg Fool\'s Tumble',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '183'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }]
};
/* harmony default export */ const dohn_mheg = (dohn_mheg_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/heroes_gauntlet.ts



// TODO: Berserker 2nd/3rd wild anguish should be shared with just a rock
const heroes_gauntlet_triggerSet = {
  zoneId: zone_id/* default.TheHeroesGauntlet */.Z.TheHeroesGauntlet,
  damageWarn: {
    'THG Blade\'s Benison': '5228',
    // pld conal
    'THG Absolute Holy': '524B',
    // whm very large aoe
    'THG Hissatsu: Goka': '523D',
    // sam line aoe
    'THG Whole Self': '522D',
    // mnk wide line aoe
    'THG Randgrith': '5232',
    // drg very big line aoe
    'THG Vacuum Blade 1': '5061',
    // Spectral Thief circular ground aoe from marker
    'THG Vacuum Blade 2': '5062',
    // Spectral Thief circular ground aoe from marker
    'THG Coward\'s Cunning': '4FD7',
    // Spectral Thief Chicken Knife laser
    'THG Papercutter 1': '4FD1',
    // Spectral Thief line aoe from marker
    'THG Papercutter 2': '4FD2',
    // Spectral Thief line aoe from marker
    'THG Ring of Death': '5236',
    // drg circular aoe
    'THG Lunar Eclipse': '5227',
    // pld circular aoe
    'THG Absolute Gravity': '5248',
    // ink mage circular
    'THG Rain of Light': '5242',
    // bard large circule aoe
    'THG Dooming Force': '5239',
    // drg line aoe
    'THG Absolute Dark II': '4F61',
    // Necromancer 120 degree conal
    'THG Burst': '53B7',
    // Necromancer necroburst small zombie explosion
    'THG Pain Mire': '4FA4',
    // Necromancer very large green bleed puddle
    'THG Dark Deluge': '4F5D',
    // Necromancer ground aoe
    'THG Tekka Gojin': '523E',
    // sam 90 degree conal
    'THG Raging Slice 1': '520A',
    // Berserker line cleave
    'THG Raging Slice 2': '520B',
    // Berserker line cleave
    'THG Wild Rage': '5203' // Berserker blue knockback puck

  },
  gainsEffectWarn: {
    'THG Bleeding': '828' // Standing in the Necromancer puddle or outside the Berserker arena

  },
  gainsEffectFail: {
    'THG Truly Berserk': '906' // Standing in the crater too long

  },
  shareWarn: {
    'THG Absolute Thunder IV': '5245',
    // headmarker aoe from blm
    'THG Moondiver': '5233',
    // headmarker aoe from drg
    'THG Spectral Gust': '53CF' // Spectral Thief headmarker aoe

  },
  shareFail: {
    'THG Falling Rock': '5205' // Berserker headmarker aoe that creates rubble

  },
  soloWarn: {
    // This should always be shared.  On all times but the 2nd and 3rd, it's a party share.
    // TODO: on the 2nd and 3rd time this should only be shared with a rock.
    // TODO: alternatively warn on taking one of these with a 472 Magic Vulnerability Up effect
    'THG Wild Anguish': '5209'
  },
  triggers: [{
    id: 'THG Wild Rampage',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '5207',
      ...oopsy_common/* playerDamageFields */.np
    }),
    // This is zero damage if you are in the crater.
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const heroes_gauntlet = (heroes_gauntlet_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/holminster_switch.ts

const holminster_switch_triggerSet = {
  zoneId: zone_id/* default.HolminsterSwitch */.Z.HolminsterSwitch,
  damageWarn: {
    'Holminster Thumbscrew': '3DC6',
    'Holminster Wooden horse': '3DC7',
    'Holminster Light Shot': '3DC8',
    'Holminster Heretic\'s Fork': '3DCE',
    'Holminster Holy Water': '3DD4',
    'Holminster Fierce Beating 1': '3DDD',
    'Holminster Fierce Beating 2': '3DDE',
    'Holminster Fierce Beating 3': '3DDF',
    'Holminster Cat O\' Nine Tails': '3DE1',
    'Holminster Right Knout': '3DE6',
    'Holminster Left Knout': '3DE7'
  },
  damageFail: {
    'Holminster Aethersup': '3DE9'
  },
  shareWarn: {
    'Holminster Flagellation': '3DD6'
  },
  shareFail: {
    'Holminster Taphephobia': '4181'
  }
};
/* harmony default export */ const holminster_switch = (holminster_switch_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/malikahs_well.ts

const malikahs_well_triggerSet = {
  zoneId: zone_id/* default.MalikahsWell */.Z.MalikahsWell,
  damageWarn: {
    'Malikah Falling Rock': '3CEA',
    'Malikah Wellbore': '3CED',
    'Malikah Geyser Eruption': '3CEE',
    'Malikah Swift Spill': '3CF0',
    'Malikah Breaking Wheel 1': '3CF5',
    'Malikah Crystal Nail': '3CF7',
    'Malikah Heretic\'s Fork 1': '3CF9',
    'Malikah Breaking Wheel 2': '3CFA',
    'Malikah Heretic\'s Fork 2': '3E0E',
    'Malikah Earthshake': '3E39'
  }
};
/* harmony default export */ const malikahs_well = (malikahs_well_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/matoyas_relict.ts

// TODO: could include 5484 Mudman Rocky Roll as a shareWarn, but it's low damage and common.
const matoyas_relict_triggerSet = {
  zoneId: zone_id/* default.MatoyasRelict */.Z.MatoyasRelict,
  damageWarn: {
    'Matoya Relict Werewood Ovation': '5518',
    // line aoe
    'Matoya Cave Tarantula Hawk Apitoxin': '5519',
    // big circle aoe
    'Matoya Spriggan Stonebearer Romp': '551A',
    // conal aoe
    'Matoya Sonny Of Ziggy Jittering Glare': '551C',
    // long narrow conal aoe
    'Matoya Mudman Quagmire': '5481',
    // Mudman aoe puddles
    'Matoya Mudman Brittle Breccia 1': '548E',
    // expanding circle aoe
    'Matoya Mudman Brittle Breccia 2': '548F',
    // expanding circle aoe
    'Matoya Mudman Brittle Breccia 3': '5490',
    // expanding circle aoe
    'Matoya Mudman Mud Bubble': '5487',
    // standing in mud puddle?
    'Matoya Cave Pugil Screwdriver': '551E',
    // conal aoe
    'Matoya Nixie Gurgle': '5992',
    // Nixie wall flush
    'Matoya Relict Molten Phoebad Pyroclastic Shot': '57EB',
    // the line aoes as you run to trash
    'Matoya Relict Flan Flood': '5523',
    // big circle aoe
    'Matoya Pyroduct Eldthurs Mash': '5527',
    // line aoe
    'Matyoa Pyroduct Eldthurs Spin': '5528',
    // very large circle aoe
    'Matoya Relict Bavarois Thunder III': '5525',
    // circle aoe
    'Matoya Relict Marshmallow Ancient Aero': '5524',
    // very large line groaoe
    'Matoya Relict Pudding Fire II': '5522',
    // circle aoe
    'Matoya Relict Molten Phoebad Hot Lava': '57E9',
    // conal aoe
    'Matoya Relict Molten Phoebad Volcanic Drop': '57E8',
    // circle aoe
    'Matoya Mother Porxie Medium Rear': '591D',
    // knockback into safe circle aoe
    'Matoya Mother Porxie Barbeque Line': '5917',
    // line aoe during bbq
    'Matoya Mother Porxie Barbeque Circle': '5918',
    // circle aoe during bbq
    'Matoya Mother Porxie To A Crisp': '5925',
    // getting to close to boss during bbq
    'Matoya Mother Proxie Buffet': '5926' // Aeolian Cave Sprite line aoe (is this a pun?)

  },
  damageFail: {
    'Matoya Nixie Sea Shanty': '598C' // Not taking the puddle up to the top? Failing add enrage?

  },
  shareWarn: {
    'Matoya Nixie Crack': '5990',
    // Nixie Crash-Smash tank tethers
    'Matoya Nixie Sputter': '5993' // Nixie spread marker

  }
};
/* harmony default export */ const matoyas_relict = (matoyas_relict_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/mt_gulg.ts

const mt_gulg_triggerSet = {
  zoneId: zone_id/* default.MtGulg */.Z.MtGulg,
  damageWarn: {
    'Gulg Immolation': '41AA',
    'Gulg Tail Smash': '41AB',
    'Gulg Heavenslash': '41A9',
    'Gulg Typhoon Wing 1': '3D00',
    'Gulg Typhoon Wing 2': '3D01',
    'Gulg Hurricane Wing': '3D03',
    'Gulg Earth Shaker': '37F5',
    'Gulg Sanctification': '41AE',
    'Gulg Exegesis': '3D07',
    'Gulg Perfect Contrition': '3D0E',
    'Gulg Sanctified Aero': '41AD',
    'Gulg Divine Diminuendo 1': '3D16',
    'Gulg Divine Diminuendo 2': '3D18',
    'Gulg Divine Diminuendo 3': '4669',
    'Gulg Divine Diminuendo 4': '3D19',
    'Gulg Divine Diminuendo 5': '3D21',
    'Gulg Conviction Marcato 1': '3D1A',
    'Gulg Conviction Marcato 2': '3D1B',
    'Gulg Conviction Marcato 3': '3D20',
    'Gulg Vena Amoris': '3D27'
  },
  damageFail: {
    'Gulg Lumen Infinitum': '41B2',
    'Gulg Right Palm': '37F8',
    'Gulg Left Palm': '37FA'
  }
};
/* harmony default export */ const mt_gulg = (mt_gulg_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/paglthan.ts

// TODO: What to do about Kahn Rai 5B50?
// It seems impossible for the marked person to avoid entirely.
const paglthan_triggerSet = {
  zoneId: zone_id/* default.Paglthan */.Z.Paglthan,
  damageWarn: {
    'Paglthan Telovouivre Plague Swipe': '60FC',
    // frontal conal cleave
    'Paglthan Lesser Telodragon Engulfing Flames': '60F5',
    // frontal conal cleave
    'Paglthan Amhuluk Lightning Bolt': '5C4C',
    // circular lightning aoe (on self or post)
    'Paglthan Amhuluk Ball Of Levin Shock': '5C52',
    // pulsing small circular aoes
    'Paglthan Amhuluk Supercharged Ball Of Levin Shock': '5C53',
    // pulsing large circular aoe
    'Paglthan Amhuluk Wide Blaster': '60C5',
    // rear conal cleave
    'Paglthan Telobrobinyak Fall Of Man': '6148',
    // circular aoe
    'Paglthan Telotek Reaper Magitek Cannon': '6121',
    // circular aoe
    'Paglthan Telodragon Sheet of Ice': '60F8',
    // circular aoe
    'Paglthan Telodragon Frost Breath': '60F7',
    // very large conal cleave
    'Paglthan Magitek Core Stable Cannon': '5C94',
    // large line aoes
    'Paglthan Magitek Core 2-Tonze Magitek Missile': '5C95',
    // large circular aoe
    'Paglthan Telotek Sky Armor Aethershot': '5C9C',
    // circular aoe
    'Paglthan Mark II Telotek Colossus Exhaust': '5C99',
    // large line aoe
    'Paglthan Magitek Missile Explosive Force': '5C98',
    // slow moving horizontal missiles
    'Paglthan Tiamat Flamisphere': '610F',
    // very long line aoe
    'Paglthan Armored Telodragon Tortoise Stomp': '614B',
    // large circular aoe from turtle
    'Paglthan Telodragon Thunderous Breath': '6149',
    // large conal cleave
    'Paglthan Lunar Bahamut Lunar Nail Upburst': '605B',
    // small aoes before Big Burst
    'Paglthan Lunar Bahamut Lunar Nail Big Burst': '5B48',
    // large circular aoes from nails
    'Paglthan Lunar Bahamut Perigean Breath': '5B59',
    // large conal cleave
    'Paglthan Lunar Bahamut Megaflare': '5B4E',
    // megaflare pepperoni
    'Paglthan Lunar Bahamut Megaflare Dive': '5B52',
    // megaflare line aoe across the arena
    'Paglthan Lunar Bahamut Lunar Flare': '5B4A' // large purple shrinking circles

  },
  shareWarn: {
    'Paglthan Lunar Bahamut Megaflare': '5B4D' // megaflare spread markers

  }
};
/* harmony default export */ const paglthan = (paglthan_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/qitana_ravel.ts

const qitana_ravel_triggerSet = {
  zoneId: zone_id/* default.TheQitanaRavel */.Z.TheQitanaRavel,
  damageWarn: {
    'Qitana Sun Toss': '3C8A',
    // Ground AoE, boss one
    'Qitana Ronkan Light 1': '3C8C',
    // Statue attack, boss one
    'Qitana Lozatl\'s Fury 1': '3C8F',
    // Semicircle cleave, boss one
    'Qitana Lozatl\'s Fury 2': '3C90',
    // Semicircle cleave, boss one
    'Qitana Falling Rock': '3C96',
    // Small ground AoE, boss two
    'Qitana Falling Boulder': '3C97',
    // Large ground AoE, boss two
    'Qitana Towerfall': '3C98',
    // Pillar collapse, boss two
    'Qitana Viper Poison 2': '3C9E',
    // Stationary poison puddles, boss three
    'Qitana Confession of Faith 1': '3CA2',
    // Dangerous middle during spread circles, boss three
    'Qitana Confession of Faith 3': '3CA6',
    // Dangerous sides during stack marker, boss three
    'Qitana Confession of Faith 4': '3CA7',
    // Dangerous sides during stack marker, boss three
    'Qitana Ronkan Light 2': '3D6D',
    // Statue attack, boss one
    'Qitana Wrath of the Ronka': '3E2C',
    // Statue line attack from mini-bosses before first boss
    'Qitana Sinspitter': '3E36',
    // Gorilla boulder toss AoE before third boss
    'Qitana Hound out of Heaven': '42B8',
    // Tether extension failure, boss three; 42B7 is correct execution
    'Qitana Ronkan Abyss': '43EB' // Ground AoE from mini-bosses before first boss

  },
  shareWarn: {
    'Qitana Viper Poison 1': '3C9D',
    // AoE from the 00AB poison head marker, boss three
    'Qitana Confession of Faith 2': '3CA3' // Overlapped circles failure on the spread circles version of the mechanic

  }
};
/* harmony default export */ const qitana_ravel = (qitana_ravel_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/the_grand_cosmos.ts

// The Grand Cosmos
const the_grand_cosmos_triggerSet = {
  zoneId: zone_id/* default.TheGrandCosmos */.Z.TheGrandCosmos,
  damageWarn: {
    'Cosmos Iron Justice': '491F',
    'Cosmos Smite Of Rage': '4921',
    'Cosmos Tribulation': '49A4',
    'Cosmos Dark Shock': '476F',
    'Cosmos Sweep': '4770',
    'Cosmos Deep Clean': '4771',
    'Cosmos Shadow Burst': '4924',
    'Cosmos Bloody Caress': '4927',
    'Cosmos Nepenthic Plunge': '4928',
    'Cosmos Brewing Storm': '4929',
    'Cosmos Ode To Fallen Petals': '4950',
    'Cosmos Far Wind Ground': '4273',
    'Cosmos Fire Breath': '492B',
    'Cosmos Ronkan Freeze': '492E',
    'Cosmos Overpower': '492D',
    'Cosmos Scorching Left': '4763',
    'Cosmos Scorching Right': '4762',
    'Cosmos Otherwordly Heat': '475C',
    'Cosmos Fire\'s Ire': '4761',
    'Cosmos Plummet': '4767',
    'Cosmos Fire\'s Domain Tether': '475F'
  },
  shareWarn: {
    'Cosmos Dark Well': '476D',
    'Cosmos Far Wind Spread': '4724',
    'Cosmos Black Flame': '475D',
    'Cosmos Fire\'s Domain': '4760'
  }
};
/* harmony default export */ const the_grand_cosmos = (the_grand_cosmos_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/twinning.ts

const twinning_triggerSet = {
  zoneId: zone_id/* default.TheTwinning */.Z.TheTwinning,
  damageWarn: {
    'Twinning Auto Cannons': '43A9',
    'Twinning Heave': '3DB9',
    'Twinning 32 Tonze Swipe': '3DBB',
    'Twinning Sideswipe': '3DBF',
    'Twinning Wind Spout': '3DBE',
    'Twinning Shock': '3DF1',
    'Twinning Laserblade': '3DEC',
    'Twinning Vorpal Blade': '3DC2',
    'Twinning Thrown Flames': '3DC3',
    'Twinning Magitek Ray': '3DF3',
    'Twinning High Gravity': '3DFA'
  },
  damageFail: {
    'Twinning 128 Tonze Swipe': '3DBA'
  }
};
/* harmony default export */ const twinning = (twinning_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/eureka/delubrum_reginae.ts



// TODO: Dead Iron 5AB0 (earthshakers, but only if you take two?)
const delubrum_reginae_triggerSet = {
  zoneId: zone_id/* default.DelubrumReginae */.Z.DelubrumReginae,
  damageWarn: {
    'Delubrum Seeker Mercy Fourfold': '5B34',
    // Four glowing sword half room cleaves
    'Delubrum Seeker Baleful Swathe': '5AB4',
    // Ground aoe to either side of boss
    'Delubrum Seeker Baleful Blade': '5B28',
    // Hide behind pillars attack
    'Delubrum Seeker Iron Splitter Blue 1': '5AA4',
    // Blue ring explosion
    'Delubrum Seeker Iron Splitter Blue 2': '5AA5',
    // Blue ring explosion
    'Delubrum Seeker Iron Splitter Blue 3': '5AA6',
    // Blue ring explosion
    'Delubrum Seeker Iron Splitter White 1': '5AA7',
    // White ring explosion
    'Delubrum Seeker Iron Splitter White 2': '5AA8',
    // White ring explosion
    'Delubrum Seeker Iron Splitter White 3': '5AA9',
    // White ring explosion
    'Delubrum Seeker Scorching Shackle': '5AAE',
    // Chain damage
    'Delubrum Seeker Merciful Breeze': '5AAB',
    // Waffle criss-cross floor markers
    'Delubrum Seeker Merciful Blooms': '5AAD',
    // Purple growing circle
    'Delubrum Dahu Right-Sided Shockwave': '5761',
    // Right circular cleave
    'Delubrum Dahu Left-Sided Shockwave': '5762',
    // Left circular cleave
    'Delubrum Dahu Firebreathe': '5765',
    // Conal breath
    'Delubrum Dahu Firebreathe Rotating': '575A',
    // Conal breath, rotating
    'Delubrum Dahu Head Down': '5756',
    // line aoe charge from Marchosias add
    'Delubrum Dahu Hunter\'s Claw': '5757',
    // circular ground aoe centered on Marchosias add
    'Delubrum Dahu Falling Rock': '575C',
    // ground aoe from Reverberating Roar
    'Delubrum Dahu Hot Charge': '5764',
    // double charge
    'Delubrum Dahu Ripper Claw': '575D',
    // frontal cleave
    'Delubrum Dahu Tail Swing': '575F',
    // tail swing ;)
    'Delubrum Guard Pawn Off': '5806',
    // Queen's Soldier Secrets Revealed tethered clone aoe
    'Delubrum Guard Turret\'s Tour 1': '580D',
    // Queen's Gunner reflective turret shot
    'Delubrum Guard Turret\'s Tour 2': '580E',
    // Queen's Gunner reflective turret shot
    'Delubrum Guard Turret\'s Tour 3': '580F',
    // Queen's Gunner reflective turret shot
    'Delubrum Guard Optimal Play Shield': '57F3',
    // Queen's Knight shield get under
    'Delubrum Guard Optimal Play Sword': '57F2',
    // Queen's Knight sword get out
    'Delubrum Guard Counterplay': '57F6',
    // Hitting aetherial ward directional barrier
    'Delubrum Phantom Swirling Miasma 1': '57A9',
    // Initial phantom donut aoe from circle
    'Delubrum Phantom Swirling Miasma 2': '57AA',
    // Moving phantom donut aoes from circle
    'Delubrum Phantom Creeping Miasma': '57A5',
    // phantom line aoe from square
    'Delubrum Phantom Vile Wave': '57B1',
    // phantom conal aoe
    'Delubrum Avowed Fury Of Bozja': '5973',
    // Trinity Avowed Allegiant Arsenal "out"
    'Delubrum Avowed Flashvane': '5972',
    // Trinity Avowed Allegiant Arsenal "get behind"
    'Delubrum Avowed Infernal Slash': '5971',
    // Trinity Avowed Allegiant Arsenal "get front"
    'Delubrum Avowed Flames Of Bozja': '5968',
    // 80% floor aoe before shimmering shot swords
    'Delubrum Avowed Gleaming Arrow': '5974',
    // Trinity Avatar line aoes from outside
    'Delubrum Queen The Means 1': '59BB',
    // The Queen's Beck and Call cross aoe from adds
    'Delubrum Queen The Means 2': '59BD',
    // The Queen's Beck and Call cross aoe from adds
    'Delubrum Queen The End 1': '59BA',
    // Also The Queen's Beck and Call cross aoe from adds
    'Delubrum Queen The End 2': '59BC',
    // Also The Queen's Beck and Call cross aoe from adds
    'Delubrum Queen Northswain\'s Glow': '59C4',
    // expanding lines with explosion intersections
    'Delubrum Queen Judgment Blade Left': '5B83',
    // dash across room with left cleave
    'Delubrum Queen Judgment Blade Right': '5B83',
    // dash across room with right cleave
    'Delubrum Queen Queen\'s Justice': '59BF',
    // failing to walk the right number of squares
    'Delubrum Queen Turret\'s Tour 1': '59E0',
    // reflective turret shot during Queen
    'Delubrum Queen Turret\'s Tour 2': '59E1',
    // reflective turret shot during Queen
    'Delubrum Queen Turret\'s Tour 3': '59E2',
    // reflective turret shot during Queen
    'Delubrum Queen Pawn Off': '59DA',
    // Secrets Revealed tethered clone aoe during Queen
    'Delubrum Queen Optimal Play Shield': '59CE',
    // Queen's Knight shield get under during Queen
    'Delubrum Queen Optimal Play Sword': '59CC' // Queen's Knight sword get out during Queen

  },
  damageFail: {
    'Delubrum Hidden Trap Massive Explosion': '5A6E',
    // explosion trap
    'Delubrum Hidden Trap Poison Trap': '5A6F',
    // poison trap
    'Delubrum Avowed Heat Shock': '595E',
    // too much heat or failing to regulate temperature
    'Delubrum Avowed Cold Shock': '595F' // too much cold or failing to regulate temperature

  },
  gainsEffectWarn: {
    'Delubrum Seeker Merciful Moon': '262' // "Petrification" from Aetherial Orb lookaway

  },
  shareFail: {
    'Delubrum Dahu Heat Breath': '5766',
    // tank cleave
    'Delubrum Avowed Wrath Of Bozja': '5975' // tank cleave

  },
  triggers: [{
    // At least during The Queen, these ability ids can be ordered differently,
    // and the first explosion "hits" everyone, although with "1B" flags.
    id: 'Delubrum Lots Cast',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: ['565A', '565B', '57FD', '57FE', '5B86', '5B87', '59D2', '5D93'],
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (_data, matches) => matches.flags.slice(-2) === '03',
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const delubrum_reginae = (delubrum_reginae_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/eureka/delubrum_reginae_savage.ts



// TODO: Dahu 5776 Spit Flame should always hit a Marchosias
// TODO: hitting phantom with ice spikes with anything but dispel?
// TODO: failing icy/fiery portent (guard and queen)
//       `18:Pyretic DoT Tick on ${name} for ${damage} damage.`
// TODO: Winds Of Fate / Weight Of Fortune?
// TODO: Turret's Tour?
// general traps: explosion: 5A71, poison trap: 5A72, mini: 5A73
// duel traps: mini: 57A1, ice: 579F, toad: 57A0
// TODO: taking mana flame without reflect
// TODO: taking Maelstrom's Bolt without lightning buff
const delubrum_reginae_savage_triggerSet = {
  zoneId: zone_id/* default.DelubrumReginaeSavage */.Z.DelubrumReginaeSavage,
  damageWarn: {
    'DelubrumSav Seeker Slimes Hellish Slash': '57EA',
    // Bozjan Soldier cleave
    'DelubrumSav Seeker Slimes Viscous Rupture': '5016',
    // Fully merged viscous slime aoe
    'DelubrumSav Seeker Golems Demolish': '5880',
    // interruptible Ruins Golem cast
    'DelubrumSav Seeker Baleful Swathe': '5AD1',
    // Ground aoe to either side of boss
    'DelubrumSav Seeker Baleful Blade': '5B2A',
    // Hide behind pillars attack
    'DelubrumSav Seeker Scorching Shackle': '5ACB',
    // Chains
    'DelubrumSav Seeker Mercy Fourfold 1': '5B94',
    // Four glowing sword half room cleaves
    'DelubrumSav Seeker Mercy Fourfold 2': '5AB9',
    // Four glowing sword half room cleaves
    'DelubrumSav Seeker Mercy Fourfold 3': '5ABA',
    // Four glowing sword half room cleaves
    'DelubrumSav Seeker Mercy Fourfold 4': '5ABB',
    // Four glowing sword half room cleaves
    'DelubrumSav Seeker Mercy Fourfold 5': '5ABC',
    // Four glowing sword half room cleaves
    'DelubrumSav Seeker Merciful Breeze': '5AC8',
    // Waffle criss-cross floor markers
    'DelubrumSav Seeker Baleful Comet': '5AD7',
    // Clone meteor dropping before charges
    'DelubrumSav Seeker Baleful Firestorm': '5AD8',
    // Clone charge after Baleful Comet
    'DelubrumSav Seeker Iron Rose': '5AD9',
    // Clone line aoes
    'DelubrumSav Seeker Iron Splitter Blue 1': '5AC1',
    // Blue rin g explosion
    'DelubrumSav Seeker Iron Splitter Blue 2': '5AC2',
    // Blue ring explosion
    'DelubrumSav Seeker Iron Splitter Blue 3': '5AC3',
    // Blue ring explosion
    'DelubrumSav Seeker Iron Splitter White 1': '5AC4',
    // White ring explosion
    'DelubrumSav Seeker Iron Splitter White 2': '5AC5',
    // White ring explosion
    'DelubrumSav Seeker Iron Splitter White 3': '5AC6',
    // White ring explosion
    'DelubrumSav Seeker Act Of Mercy': '5ACF',
    // cross-shaped line aoes
    'DelubrumSav Dahu Right-Sided Shockwave 1': '5770',
    // Right circular cleave
    'DelubrumSav Dahu Right-Sided Shockwave 2': '5772',
    // Right circular cleave
    'DelubrumSav Dahu Left-Sided Shockwave 1': '576F',
    // Left circular cleave
    'DelubrumSav Dahu Left-Sided Shockwave 2': '5771',
    // Left circular cleave
    'DelubrumSav Dahu Firebreathe': '5774',
    // Conal breath
    'DelubrumSav Dahu Firebreathe Rotating': '576C',
    // Conal breath, rotating
    'DelubrumSav Dahu Head Down': '5768',
    // line aoe charge from Marchosias add
    'DelubrumSav Dahu Hunter\'s Claw': '5769',
    // circular ground aoe centered on Marchosias add
    'DelubrumSav Dahu Falling Rock': '576E',
    // ground aoe from Reverberating Roar
    'DelubrumSav Dahu Hot Charge': '5773',
    // double charge
    'DelubrumSav Duel Massive Explosion': '579E',
    // bombs being cleared
    'DelubrumSav Duel Vicious Swipe': '5797',
    // circular aoe around boss
    'DelubrumSav Duel Focused Tremor 1': '578F',
    // square floor aoes
    'DelubrumSav Duel Focused Tremor 2': '5791',
    // square floor aoes
    'DelubrumSav Duel Devour': '5789',
    // conal aoe after withering curse
    'DelubrumSav Duel Flailing Strike 1': '578C',
    // initial rotating cleave
    'DelubrumSav Duel Flailing Strike 2': '578D',
    // rotating cleaves
    'DelubrumSav Guard Optimal Offensive Sword': '5819',
    // middle explosion
    'DelubrumSav Guard Optimal Offensive Shield': '581A',
    // middle explosion
    'DelubrumSav Guard Optimal Play Sword': '5816',
    // Optimal Play Sword "get out"
    'DelubrumSav Guard Optimal Play Shield': '5817',
    // Optimal play shield "get in"
    'DelubrumSav Guard Optimal Play Cleave': '5818',
    // Optimal Play cleaves for sword/shield
    'DelubrumSav Guard Unlucky Lot': '581D',
    // Queen's Knight orb explosion
    'DelubrumSav Guard Burn 1': '583D',
    // small fire adds
    'DelubrumSav Guard Burn 2': '583E',
    // large fire adds
    'DelubrumSav Guard Pawn Off': '583A',
    // Queen's Soldier Secrets Revealed tethered clone aoe
    'DelubrumSav Guard Turret\'s Tour Normal 1': '5847',
    // "normal mode" turrets, initial lines 1
    'DelubrumSav Guard Turret\'s Tour Normal 2': '5848',
    // "normal mode" turrets, initial lines 2
    'DelubrumSav Guard Turret\'s Tour Normal 3': '5849',
    // "normal mode" turrets, second lines
    'DelubrumSav Guard Counterplay': '58F5',
    // Hitting aetherial ward directional barrier
    'DelubrumSav Phantom Swirling Miasma 1': '57B8',
    // Initial phantom donut aoe
    'DelubrumSav Phantom Swirling Miasma 2': '57B9',
    // Moving phantom donut aoes
    'DelubrumSav Phantom Creeping Miasma 1': '57B4',
    // Initial phantom line aoe
    'DelubrumSav Phantom Creeping Miasma 2': '57B5',
    // Later phantom line aoe
    'DelubrumSav Phantom Lingering Miasma 1': '57B6',
    // Initial phantom circle aoe
    'DelubrumSav Phantom Lingering Miasma 2': '57B7',
    // Moving phantom circle aoe
    'DelubrumSav Phantom Vile Wave': '57BF',
    // phantom conal aoe
    'DelubrumSav Avowed Fury Of Bozja': '594C',
    // Trinity Avowed Allegiant Arsenal "out"
    'DelubrumSav Avowed Flashvane': '594B',
    // Trinity Avowed Allegiant Arsenal "get behind"
    'DelubrumSav Avowed Infernal Slash': '594A',
    // Trinity Avowed Allegiant Arsenal "get front"
    'DelubrumSav Avowed Flames Of Bozja': '5939',
    // 80% floor aoe before shimmering shot swords
    'DelubrumSav Avowed Gleaming Arrow': '594D',
    // Trinity Avatar line aoes from outside
    'DelubrumSav Lord Whack': '57D0',
    // cleave
    'DelubrumSav Lord Devastating Bolt 1': '57C5',
    // lightning rings
    'DelubrumSav Lord Devastating Bolt 2': '57C6',
    // lightning rings
    'DelubrumSav Lord Electrocution': '57CC',
    // random circle aoes
    'DelubrumSav Lord Rapid Bolts': '57C3',
    // dropped lightning aoes
    'DelubrumSav Lord 1111-Tonze Swing': '57D8',
    // very large "get out" swing
    'DelubrumSav Lord Monk Attack': '55A6',
    // Monk add auto-attack
    'DelubrumSav Queen Northswain\'s Glow': '59F4',
    // expanding lines with explosion intersections
    'DelubrumSav Queen The Means 1': '59E7',
    // The Queen's Beck and Call cross aoe from adds
    'DelubrumSav Queen The Means 2': '59EA',
    // The Queen's Beck and Call cross aoe from adds
    'DelubrumSav Queen The End 1': '59E8',
    // Also The Queen's Beck and Call cross aoe from adds
    'DelubrumSav Queen The End 2': '59E9',
    // Also The Queen's Beck and Call cross aoe from adds
    'DelubrumSav Queen Optimal Offensive Sword': '5A02',
    // middle explosion
    'DelubrumSav Queen Optimal Offensive Shield': '5A03',
    // middle explosion
    'DelubrumSav Queen Judgment Blade Left 1': '59F2',
    // dash across room with left cleave
    'DelubrumSav Queen Judgment Blade Left 2': '5B85',
    // dash across room with left cleave
    'DelubrumSav Queen Judgment Blade Right 1': '59F1',
    // dash across room with right cleave
    'DelubrumSav Queen Judgment Blade Right 2': '5B84',
    // dash across room with right cleave
    'DelubrumSav Queen Pawn Off': '5A1D',
    // Queen's Soldier Secrets Revealed tethered clone aoe
    'DelubrumSav Queen Optimal Play Sword': '59FF',
    // Optimal Play Sword "get out"
    'DelubrumSav Queen Optimal Play Shield': '5A00',
    // Optimal play shield "get in"
    'DelubrumSav Queen Optimal Play Cleave': '5A01',
    // Optimal Play cleaves for sword/shield
    'DelubrumSav Queen Turret\'s Tour Normal 1': '5A28',
    // "normal mode" turrets, initial lines 1
    'DelubrumSav Queen Turret\'s Tour Normal 2': '5A2A',
    // "normal mode" turrets, initial lines 2
    'DelubrumSav Queen Turret\'s Tour Normal 3': '5A29' // "normal mode" turrets, second lines

  },
  damageFail: {
    'DelubrumSav Avowed Heat Shock': '5927',
    // too much heat or failing to regulate temperature
    'DelubrumSav Avowed Cold Shock': '5928',
    // too much cold or failing to regulate temperature
    'DelubrumSav Queen Queen\'s Justice': '59EB',
    // failing to walk the right number of squares
    'DelubrumSav Queen Gunnhildr\'s Blades': '5B22',
    // not being in the chess blue safe square
    'DelubrumSav Queen Unlucky Lot': '55B6' // lightning orb attack

  },
  gainsEffectWarn: {
    'DelubrumSav Seeker Merciful Moon': '262' // "Petrification" from Aetherial Orb lookaway

  },
  shareWarn: {
    'DelubrumSav Seeker Phantom Baleful Onslaught': '5AD6',
    // solo tank cleave
    'DelubrumSav Lord Foe Splitter': '57D7' // tank cleave

  },
  triggers: [{
    // These ability ids can be ordered differently and "hit" people when levitating.
    id: 'DelubrumSav Guard Lots Cast',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: ['5827', '5828', '5B6C', '5B6D', '5BB6', '5BB7', '5B88', '5B89'],
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (_data, matches) => matches.flags.slice(-2) === '03',
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'DelubrumSav Golem Compaction',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '5746'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        text: `${matches.source}: ${matches.ability}`
      };
    }
  }, {
    id: 'DelubrumSav Slime Sanguine Fusion',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '554D'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        text: `${matches.source}: ${matches.ability}`
      };
    }
  }]
};
/* harmony default export */ const delubrum_reginae_savage = (delubrum_reginae_savage_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e1n.ts

const e1n_triggerSet = {
  zoneId: zone_id/* default.EdensGateResurrection */.Z.EdensGateResurrection,
  damageWarn: {
    'E1N Eden\'s Thunder III': '44ED',
    'E1N Eden\'s Blizzard III': '44EC',
    'E1N Pure Beam': '3D9E',
    'E1N Paradise Lost': '3DA0'
  },
  damageFail: {
    'E1N Eden\'s Flare': '3D97',
    'E1N Pure Light': '3DA3'
  },
  shareFail: {
    'E1N Fire III': '44EB',
    'E1N Vice Of Vanity': '44E7',
    // tank lasers
    'E1N Vice Of Apathy': '44E8' // dps puddles

  }
};
/* harmony default export */ const e1n = (e1n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e1s.ts

// TODO: failing to interrupt Mana Boost (3D8D)
// TODO: failing to pass healer debuff?
// TODO: what happens if you don't kill a meteor during four orbs?
const e1s_triggerSet = {
  zoneId: zone_id/* default.EdensGateResurrectionSavage */.Z.EdensGateResurrectionSavage,
  damageWarn: {
    'E1S Eden\'s Thunder III': '44F7',
    'E1S Eden\'s Blizzard III': '44F6',
    'E1S Eden\'s Regained Blizzard III': '44FA',
    'E1S Pure Beam Trident 1': '3D83',
    'E1S Pure Beam Trident 2': '3D84',
    'E1S Paradise Lost': '3D87'
  },
  damageFail: {
    'E1S Eden\'s Flare': '3D73',
    'E1S Pure Light': '3D8A'
  },
  shareFail: {
    'E1S Fire/Thunder III': '44FB',
    'E1S Pure Beam Single': '3D81',
    'E1S Vice Of Vanity': '44F1',
    // tank lasers
    'E1S Vice of Apathy': '44F2' // dps puddles

  }
};
/* harmony default export */ const e1s = (e1s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e2n.ts



// TODO: shadoweye failure (top line fail, bottom line success, effect there too)
// [16:17:35.966] 16:400110FE:Voidwalker:40B7:Shadoweye:10612345:Tini Poutini:F:10000:100190F:
// [16:17:35.966] 16:400110FE:Voidwalker:40B7:Shadoweye:1067890A:Potato Chippy:1:0:1C:8000:
// gains the effect of Petrification from Voidwalker for 10.00 Seconds.
// TODO: puddle failure?
const e2n_triggerSet = {
  zoneId: zone_id/* default.EdensGateDescent */.Z.EdensGateDescent,
  damageWarn: {
    'E2N Doomvoid Slicer': '3E3C',
    'E2N Doomvoid Guillotine': '3E3B'
  },
  triggers: [{
    id: 'E2N Nyx',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '3E3D',
      ...oopsy_common/* playerDamageFields */.np
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: {
          en: 'Booped',
          de: 'Nyx berührt',
          fr: 'Malus de dégâts',
          ja: matches.ability,
          // FIXME
          cn: matches.ability,
          // FIXME
          ko: '닉스'
        }
      };
    }
  }]
};
/* harmony default export */ const e2n = (e2n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e2s.ts



// TODO: shadoweye failure
// TODO: Empty Hate (3E59/3E5A) hits everybody, so hard to tell about knockback
// TODO: maybe mark hell wind people who got clipped by stack?
// TODO: missing puddles?
// TODO: missing light/dark circle stack
const e2s_triggerSet = {
  zoneId: zone_id/* default.EdensGateDescentSavage */.Z.EdensGateDescentSavage,
  damageWarn: {
    'E2S Doomvoid Slicer': '3E50',
    'E3S Empty Rage': '3E6C',
    'E3S Doomvoid Guillotine': '3E4F'
  },
  shareWarn: {
    'E2S Doomvoid Cleaver': '3E64'
  },
  triggers: [{
    id: 'E2S Shadoweye',
    type: 'GainsEffect',
    // Stone Curse
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '589'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'E2S Nyx',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '3E51',
      ...oopsy_common/* playerDamageFields */.np
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: {
          en: 'Booped',
          de: 'Nyx berührt',
          fr: 'Malus de dégâts',
          ja: matches.ability,
          // FIXME
          cn: matches.ability,
          // FIXME
          ko: '닉스'
        }
      };
    }
  }]
};
/* harmony default export */ const e2s = (e2s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e3n.ts

const e3n_triggerSet = {
  zoneId: zone_id/* default.EdensGateInundation */.Z.EdensGateInundation,
  damageWarn: {
    'E3N Monster Wave 1': '3FCA',
    'E3N Monster Wave 2': '3FE9',
    'E3N Maelstrom': '3FD9',
    'E3N Swirling Tsunami': '3FD5'
  },
  damageFail: {
    'E3N Temporary Current 1': '3FCE',
    'E3N Temporary Current 2': '3FCD',
    'E3N Spinning Dive': '3FDB'
  },
  shareFail: {
    'E3N Rip Current': '3FC7'
  }
};
/* harmony default export */ const e3n = (e3n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e3s.ts

// TODO: Scouring Tsunami (3CE0) on somebody other than target
// TODO: Sweeping Tsunami (3FF5) on somebody other than tanks
// TODO: Rip Current (3FE0, 3FE1) on somebody other than target/tanks
// TODO: Boiled Alive (4006) is failing puddles???
// TODO: failing to cleanse Splashing Waters
// TODO: does getting hit by undersea quake cause an ability?
const e3s_triggerSet = {
  zoneId: zone_id/* default.EdensGateInundationSavage */.Z.EdensGateInundationSavage,
  damageWarn: {
    'E3S Monster Wave 1': '3FE5',
    'E3S Monster Wave 2': '3FE9',
    'E3S Maelstrom': '3FFB',
    'E3S Swirling Tsunami': '3FF4'
  },
  damageFail: {
    'E3S Temporary Current 1': '3FEA',
    'E3S Temporary Current 2': '3FEB',
    'E3S Temporary Current 3': '3FEC',
    'E3S Temporary Current 4': '3FED',
    'E3S Spinning Dive': '3FFD'
  }
};
/* harmony default export */ const e3s = (e3s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e4n.ts

const e4n_triggerSet = {
  zoneId: zone_id/* default.EdensGateSepulture */.Z.EdensGateSepulture,
  damageWarn: {
    'E4N Weight of the Land': '40EB',
    'E4N Evil Earth': '40EF',
    'E4N Aftershock 1': '41B4',
    'E4N Aftershock 2': '40F0',
    'E4N Explosion 1': '40ED',
    'E4N Explosion 2': '40F5',
    'E4N Landslide': '411B',
    'E4N Rightward Landslide': '4100',
    'E4N Leftward Landslide': '40FF',
    'E4N Massive Landslide': '40FC',
    'E4N Seismic Wave': '40F3',
    'E4N Fault Line': '4101'
  }
};
/* harmony default export */ const e4n = (e4n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e4s.ts



// TODO: could track people get hitting by markers they shouldn't
// TODO: could track non-tanks getting hit by tankbusters, megaliths
// TODO: could track non-target getting hit by tankbuster
const e4s_triggerSet = {
  zoneId: zone_id/* default.EdensGateSepultureSavage */.Z.EdensGateSepultureSavage,
  damageWarn: {
    'E4S Weight of the Land': '4108',
    'E4S Evil Earth': '410C',
    'E4S Aftershock 1': '41B5',
    'E4S Aftershock 2': '410D',
    'E4S Explosion': '410A',
    'E4S Landslide': '411B',
    'E4S Rightward Landslide': '411D',
    'E4S Leftward Landslide': '411C',
    'E4S Massive Landslide 1': '4118',
    'E4S Massive Landslide 2': '4119',
    'E4S Seismic Wave': '4110'
  },
  damageFail: {
    'E4S Dual Earthen Fists 1': '4135',
    'E4S Dual Earthen Fists 2': '4687',
    'E4S Plate Fracture': '43EA',
    'E4S Earthen Fist 1': '43CA',
    'E4S Earthen Fist 2': '43C9'
  },
  triggers: [{
    id: 'E4S Fault Line Collect',
    type: 'StartsUsing',
    netRegex: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '411E',
      source: 'Titan'
    }),
    netRegexDe: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '411E',
      source: 'Titan'
    }),
    netRegexFr: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '411E',
      source: 'Titan'
    }),
    netRegexJa: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '411E',
      source: 'タイタン'
    }),
    netRegexCn: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '411E',
      source: '泰坦'
    }),
    netRegexKo: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '411E',
      source: '타이탄'
    }),
    run: (data, matches) => {
      data.faultLineTarget = matches.target;
    }
  }, {
    id: 'E4S Fault Line',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '411E',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.faultLineTarget !== matches.target,
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: {
          en: 'Run Over',
          de: 'Wurde überfahren',
          fr: 'A été écrasé(e)',
          ja: matches.ability,
          // FIXME
          cn: matches.ability,
          // FIXME
          ko: matches.ability // FIXME

        }
      };
    }
  }]
};
/* harmony default export */ const e4s = (e4s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e5n.ts



const e5n_triggerSet = {
  zoneId: zone_id/* default.EdensVerseFulmination */.Z.EdensVerseFulmination,
  damageWarn: {
    'E5N Impact': '4E3A',
    // Stratospear landing AoE
    'E5N Lightning Bolt': '4B9C',
    // Stormcloud standard attack
    'E5N Gallop': '4B97',
    // Sideways add charge
    'E5N Shock Strike': '4BA1',
    // Small AoE circles during Thunderstorm
    'E5N Volt Strike': '4CF2' // Large AoE circles during Thunderstorm

  },
  damageFail: {
    'E5N Judgment Jolt': '4B8F' // Stratospear explosions

  },
  triggers: [{
    // This happens when a player gets 4+ stacks of orbs. Don't be greedy!
    id: 'E5N Static Condensation',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '8B5'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    // Helper for orb pickup failures
    id: 'E5N Orb Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '8B4'
    }),
    run: (data, matches) => {
      var _data$hasOrb;

      (_data$hasOrb = data.hasOrb) !== null && _data$hasOrb !== void 0 ? _data$hasOrb : data.hasOrb = {};
      data.hasOrb[matches.target] = true;
    }
  }, {
    id: 'E5N Orb Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '8B4'
    }),
    run: (data, matches) => {
      var _data$hasOrb2;

      (_data$hasOrb2 = data.hasOrb) !== null && _data$hasOrb2 !== void 0 ? _data$hasOrb2 : data.hasOrb = {};
      data.hasOrb[matches.target] = false;
    }
  }, {
    id: 'E5N Divine Judgement Volts',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4B9A',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => !data.hasOrb || !data.hasOrb[matches.target],
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: {
          en: `${matches.ability} (no orb)`,
          de: `${matches.ability} (kein Orb)`,
          fr: `${matches.ability} (pas d'orbe)`,
          ja: `${matches.ability} (雷玉無し)`,
          cn: `${matches.ability} (没吃球)`
        }
      };
    }
  }, {
    id: 'E5N Stormcloud Target Tracking',
    type: 'HeadMarker',
    netRegex: netregexes/* default.headMarker */.Z.headMarker({
      id: '006E'
    }),
    run: (data, matches) => {
      var _data$cloudMarkers;

      (_data$cloudMarkers = data.cloudMarkers) !== null && _data$cloudMarkers !== void 0 ? _data$cloudMarkers : data.cloudMarkers = [];
      data.cloudMarkers.push(matches.target);
    }
  }, {
    // This ability is seen only if players stacked the clouds instead of spreading them.
    id: 'E5N The Parting Clouds',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4B9D',
      ...oopsy_common/* playerDamageFields */.np
    }),
    suppressSeconds: 30,
    mistake: (data, matches) => {
      for (const name of (_data$cloudMarkers2 = data.cloudMarkers) !== null && _data$cloudMarkers2 !== void 0 ? _data$cloudMarkers2 : []) {
        var _data$cloudMarkers2;

        return {
          type: 'fail',
          blame: name,
          text: {
            en: `${matches.ability} (clouds too close)`,
            de: `${matches.ability} (Wolken zu nahe)`,
            fr: `${matches.ability} (nuages trop proches)`,
            ja: `${matches.ability} (雲近すぎ)`,
            cn: `${matches.ability} (雷云重叠)`
          }
        };
      }
    }
  }, {
    id: 'E5N Stormcloud cleanup',
    type: 'HeadMarker',
    netRegex: netregexes/* default.headMarker */.Z.headMarker({
      id: '006E'
    }),
    delaySeconds: 30,
    // Stormclouds resolve well before this.
    run: data => {
      delete data.cloudMarkers;
    }
  }]
};
/* harmony default export */ const e5n = (e5n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e5s.ts




// TODO: is there a different ability if the shield duty action isn't used properly?
// TODO: is there an ability from Raiden (the bird) if you get eaten?
// TODO: maybe chain lightning warning if you get hit while you have system shock (8B8)
const noOrb = str => {
  return {
    en: str + ' (no orb)',
    de: str + ' (kein Orb)',
    fr: str + ' (pas d\'orbe)',
    ja: str + ' (雷玉無し)',
    cn: str + ' (没吃球)',
    ko: str + ' (구슬 없음)'
  };
};

const e5s_triggerSet = {
  zoneId: zone_id/* default.EdensVerseFulminationSavage */.Z.EdensVerseFulminationSavage,
  damageWarn: {
    'E5S Impact': '4E3B',
    // Stratospear landing AoE
    'E5S Gallop': '4BB4',
    // Sideways add charge
    'E5S Shock Strike': '4BC1',
    // Small AoE circles during Thunderstorm
    'E5S Stepped Leader Twister': '4BC7',
    // Twister stepped leader
    'E5S Stepped Leader Donut': '4BC8',
    // Donut stepped leader
    'E5S Shock': '4E3D' // Hated of Levin Stormcloud-cleansable exploding debuff

  },
  damageFail: {
    'E5S Judgment Jolt': '4BA7' // Stratospear explosions

  },
  shareWarn: {
    'E5S Volt Strike Double': '4BC3',
    // Large AoE circles during Thunderstorm
    'E5S Crippling Blow': '4BCA',
    'E5S Chain Lightning Double': '4BC5'
  },
  triggers: [{
    // Helper for orb pickup failures
    id: 'E5S Orb Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '8B4'
    }),
    run: (data, matches) => {
      var _data$hasOrb;

      (_data$hasOrb = data.hasOrb) !== null && _data$hasOrb !== void 0 ? _data$hasOrb : data.hasOrb = {};
      data.hasOrb[matches.target] = true;
    }
  }, {
    id: 'E5S Orb Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '8B4'
    }),
    run: (data, matches) => {
      var _data$hasOrb2;

      (_data$hasOrb2 = data.hasOrb) !== null && _data$hasOrb2 !== void 0 ? _data$hasOrb2 : data.hasOrb = {};
      data.hasOrb[matches.target] = false;
    }
  }, {
    id: 'E5S Divine Judgement Volts',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4BB7',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => !data.hasOrb || !data.hasOrb[matches.target],
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: noOrb(matches.ability)
      };
    }
  }, {
    id: 'E5S Volt Strike Orb',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4BC3',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => !data.hasOrb || !data.hasOrb[matches.target],
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: noOrb(matches.ability)
      };
    }
  }, {
    id: 'E5S Deadly Discharge Big Knockback',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4BB2',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => !data.hasOrb || !data.hasOrb[matches.target],
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: noOrb(matches.ability)
      };
    }
  }, {
    id: 'E5S Lightning Bolt',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4BB9',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => {
      // Having a non-idempotent condition function is a bit <_<
      // Only consider lightning bolt damage if you have a debuff to clear.
      if (!data.hated || !data.hated[matches.target]) return true;
      delete data.hated[matches.target];
      return false;
    },
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'E5S Hated of Levin',
    type: 'HeadMarker',
    netRegex: netregexes/* default.headMarker */.Z.headMarker({
      id: '00D2'
    }),
    run: (data, matches) => {
      var _data$hated;

      (_data$hated = data.hated) !== null && _data$hated !== void 0 ? _data$hated : data.hated = {};
      data.hated[matches.target] = true;
    }
  }, {
    id: 'E5S Stormcloud Target Tracking',
    type: 'HeadMarker',
    netRegex: netregexes/* default.headMarker */.Z.headMarker({
      id: '006E'
    }),
    run: (data, matches) => {
      var _data$cloudMarkers;

      (_data$cloudMarkers = data.cloudMarkers) !== null && _data$cloudMarkers !== void 0 ? _data$cloudMarkers : data.cloudMarkers = [];
      data.cloudMarkers.push(matches.target);
    }
  }, {
    // This ability is seen only if players stacked the clouds instead of spreading them.
    id: 'E5S The Parting Clouds',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4BBA',
      ...oopsy_common/* playerDamageFields */.np
    }),
    suppressSeconds: 30,
    mistake: (data, matches) => {
      for (const name of (_data$cloudMarkers2 = data.cloudMarkers) !== null && _data$cloudMarkers2 !== void 0 ? _data$cloudMarkers2 : []) {
        var _data$cloudMarkers2;

        return {
          type: 'fail',
          blame: name,
          text: {
            en: `${matches.ability} (clouds too close)`,
            de: `${matches.ability} (Wolken zu nahe)`,
            fr: `${matches.ability} (nuages trop proches)`,
            ja: `${matches.ability} (雲近すぎ)`,
            cn: `${matches.ability} (雷云重叠)`
          }
        };
      }
    }
  }, {
    id: 'E5S Stormcloud cleanup',
    type: 'HeadMarker',
    netRegex: netregexes/* default.headMarker */.Z.headMarker({
      id: '006E'
    }),
    // Stormclouds resolve well before this.
    delaySeconds: 30,
    run: data => {
      delete data.cloudMarkers;
      delete data.hated;
    }
  }]
};
/* harmony default export */ const e5s = (e5s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e6n.ts

const e6n_triggerSet = {
  zoneId: zone_id/* default.EdensVerseFuror */.Z.EdensVerseFuror,
  damageWarn: {
    'E6N Thorns': '4BDA',
    // AoE markers after Enumeration
    'E6N Ferostorm 1': '4BDD',
    'E6N Ferostorm 2': '4BE5',
    'E6N Storm Of Fury 1': '4BE0',
    // Circle AoE during tethers--Garuda
    'E6N Storm Of Fury 2': '4BE6',
    // Circle AoE during tethers--Raktapaksa
    'E6N Explosion': '4BE2',
    // AoE circles, Garuda orbs
    'E6N Heat Burst': '4BEC',
    'E6N Conflag Strike': '4BEE',
    // 270-degree frontal AoE
    'E6N Spike Of Flame': '4BF0',
    // Orb explosions after Strike Spark
    'E6N Radiant Plume': '4BF2',
    'E6N Eruption': '4BF4'
  },
  damageFail: {
    'E6N Vacuum Slice': '4BD5',
    // Dark line AoE from Garuda
    'E6N Downburst': '4BDB' // Blue knockback circle. Actual knockback is unknown ability 4C20

  },
  shareFail: {
    // Kills non-tanks who get hit by it.
    'E6N Instant Incineration': '4BED'
  }
};
/* harmony default export */ const e6n = (e6n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e6s.ts

// TODO: check tethers being cut (when they shouldn't)
// TODO: check for concussed debuff
// TODO: check for taking tankbuster with lightheaded
// TODO: check for one person taking multiple Storm Of Fury Tethers (4C01/4C08)
const e6s_triggerSet = {
  zoneId: zone_id/* default.EdensVerseFurorSavage */.Z.EdensVerseFurorSavage,
  damageWarn: {
    // It's common to just ignore futbol mechanics, so don't warn on Strike Spark.
    // 'Spike Of Flame': '4C13', // Orb explosions after Strike Spark
    'E6S Thorns': '4BFA',
    // AoE markers after Enumeration
    'E6S Ferostorm 1': '4BFD',
    'E6S Ferostorm 2': '4C06',
    'E6S Storm Of Fury 1': '4C00',
    // Circle AoE during tethers--Garuda
    'E6S Storm Of Fury 2': '4C07',
    // Circle AoE during tethers--Raktapaksa
    'E6S Explosion': '4C03',
    // AoE circles, Garuda orbs
    'E6S Heat Burst': '4C1F',
    'E6S Conflag Strike': '4C10',
    // 270-degree frontal AoE
    'E6S Radiant Plume': '4C15',
    'E6S Eruption': '4C17',
    'E6S Wind Cutter': '4C02' // Tether-cutting line aoe

  },
  damageFail: {
    'E6S Vacuum Slice': '4BF5',
    // Dark line AoE from Garuda
    'E6S Downburst 1': '4BFB',
    // Blue knockback circle (Garuda).
    'E6S Downburst 2': '4BFC',
    // Blue knockback circle (Raktapaksa).
    'E6S Meteor Strike': '4C0F' // Frontal avoidable tank buster

  },
  shareWarn: {
    'E6S Hands of Hell': '4C0[BC]',
    // Tether charge
    'E6S Hands of Flame': '4C0A',
    // First Tankbuster
    'E6S Instant Incineration': '4C0E',
    // Second Tankbuster
    'E6S Blaze': '4C1B' // Flame Tornado Cleave

  },
  soloFail: {
    'E6S Air Bump': '4BF9'
  }
};
/* harmony default export */ const e6s = (e6s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e7n.ts




const wrongBuff = str => {
  return {
    en: str + ' (wrong buff)',
    de: str + ' (falscher Buff)',
    fr: str + ' (mauvais buff)',
    ja: str + ' (不適切なバフ)',
    cn: str + ' (Buff错了)',
    ko: str + ' (버프 틀림)'
  };
};

const noBuff = str => {
  return {
    en: str + ' (no buff)',
    de: str + ' (kein Buff)',
    fr: str + ' (pas de buff)',
    ja: str + ' (バフ無し)',
    cn: str + ' (没有Buff)',
    ko: str + '(버프 없음)'
  };
};

const e7n_triggerSet = {
  zoneId: zone_id/* default.EdensVerseIconoclasm */.Z.EdensVerseIconoclasm,
  damageWarn: {
    'E7N Stygian Sword': '4C55',
    // Circle ground AoEs after False Twilight
    'E7N Strength In Numbers Donut': '4C4C',
    // Large donut ground AoEs, intermission
    'E7N Strength In Numbers 2': '4C4D' // Large circle ground AoEs, intermission

  },
  shareWarn: {
    'E7N Stygian Stake': '4C33',
    // Laser tank buster, outside intermission phase
    'E5N Silver Shot': '4E7D' // Spread markers, intermission

  },
  triggers: [{
    id: 'E7N Astral Effect Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '8BE'
    }),
    run: (data, matches) => {
      var _data$hasAstral;

      (_data$hasAstral = data.hasAstral) !== null && _data$hasAstral !== void 0 ? _data$hasAstral : data.hasAstral = {};
      data.hasAstral[matches.target] = true;
    }
  }, {
    id: 'E7N Astral Effect Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '8BE'
    }),
    run: (data, matches) => {
      var _data$hasAstral2;

      (_data$hasAstral2 = data.hasAstral) !== null && _data$hasAstral2 !== void 0 ? _data$hasAstral2 : data.hasAstral = {};
      data.hasAstral[matches.target] = false;
    }
  }, {
    id: 'E7N Umbral Effect Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '8BF'
    }),
    run: (data, matches) => {
      var _data$hasUmbral;

      (_data$hasUmbral = data.hasUmbral) !== null && _data$hasUmbral !== void 0 ? _data$hasUmbral : data.hasUmbral = {};
      data.hasUmbral[matches.target] = true;
    }
  }, {
    id: 'E7N Umbral Effect Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '8BF'
    }),
    run: (data, matches) => {
      var _data$hasUmbral2;

      (_data$hasUmbral2 = data.hasUmbral) !== null && _data$hasUmbral2 !== void 0 ? _data$hasUmbral2 : data.hasUmbral = {};
      data.hasUmbral[matches.target] = false;
    }
  }, {
    id: 'E7N Light\'s Course',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: ['4C3E', '4C40', '4C22', '4C3C', '4E63'],
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => {
      return !data.hasUmbral || !data.hasUmbral[matches.target];
    },
    mistake: (data, matches) => {
      if (data.hasAstral && data.hasAstral[matches.target]) return {
        type: 'fail',
        blame: matches.target,
        text: wrongBuff(matches.ability)
      };
      return {
        type: 'warn',
        blame: matches.target,
        text: noBuff(matches.ability)
      };
    }
  }, {
    id: 'E7N Darks\'s Course',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: ['4C3D', '4C23', '4C41', '4C43'],
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => {
      return !data.hasAstral || !data.hasAstral[matches.target];
    },
    mistake: (data, matches) => {
      if (data.hasUmbral && data.hasUmbral[matches.target]) return {
        type: 'fail',
        blame: matches.target,
        text: wrongBuff(matches.ability)
      }; // This case is probably impossible, as the debuff ticks after death,
      // but leaving it here in case there's some rez or disconnect timing
      // that could lead to this.

      return {
        type: 'warn',
        blame: matches.target,
        text: noBuff(matches.ability)
      };
    }
  }]
};
/* harmony default export */ const e7n = (e7n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e7s.ts


 // TODO: missing an orb during tornado phase
// TODO: jumping in the tornado damage??
// TODO: taking sungrace(4C80) or moongrace(4C82) with wrong debuff
// TODO: stygian spear/silver spear with the wrong debuff
// TODO: taking explosion from the wrong Chiaro/Scuro orb
// TODO: handle 4C89 Silver Stake tankbuster 2nd hit, as it's ok to have two in.

const e7s_wrongBuff = str => {
  return {
    en: str + ' (wrong buff)',
    de: str + ' (falscher Buff)',
    fr: str + ' (mauvais buff)',
    ja: str + ' (不適切なバフ)',
    cn: str + ' (Buff错了)',
    ko: str + ' (버프 틀림)'
  };
};

const e7s_noBuff = str => {
  return {
    en: str + ' (no buff)',
    de: str + ' (kein Buff)',
    fr: str + ' (pas de buff)',
    ja: str + ' (バフ無し)',
    cn: str + ' (没有Buff)',
    ko: str + ' (버프 없음)'
  };
};

const e7s_triggerSet = {
  zoneId: zone_id/* default.EdensVerseIconoclasmSavage */.Z.EdensVerseIconoclasmSavage,
  damageWarn: {
    'E7S Silver Sword': '4C8E',
    // ground aoe
    'E7S Overwhelming Force': '4C73',
    // add phase ground aoe
    'E7S Strength in Numbers 1': '4C70',
    // add get under
    'E7S Strength in Numbers 2': '4C71',
    // add get out
    'E7S Paper Cut': '4C7D',
    // tornado ground aoes
    'E7S Buffet': '4C77' // tornado ground aoes also??

  },
  damageFail: {
    'E7S Betwixt Worlds': '4C6B',
    // purple ground line aoes
    'E7S Crusade': '4C58',
    // blue knockback circle (standing in it)
    'E7S Explosion': '4C6F' // didn't kill an add

  },
  shareWarn: {
    'E7S Stygian Stake': '4C34',
    // Laser tank buster 1
    'E7S Silver Shot': '4C92',
    // Spread markers
    'E7S Silver Scourge': '4C93',
    // Ice markers
    'E7S Chiaro Scuro Explosion 1': '4D14',
    // orb explosion
    'E7S Chiaro Scuro Explosion 2': '4D15' // orb explosion

  },
  triggers: [{
    // Interrupt
    id: 'E7S Advent Of Light',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '4C6E'
    }),
    mistake: (_data, matches) => {
      // TODO: is this blame correct? does this have a target?
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'E7S Astral Effect Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '8BE'
    }),
    run: (data, matches) => {
      data.hasAstral = data.hasAstral || {};
      data.hasAstral[matches.target] = true;
    }
  }, {
    id: 'E7S Astral Effect Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '8BE'
    }),
    run: (data, matches) => {
      data.hasAstral = data.hasAstral || {};
      data.hasAstral[matches.target] = false;
    }
  }, {
    id: 'E7S Umbral Effect Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '8BF'
    }),
    run: (data, matches) => {
      data.hasUmbral = data.hasUmbral || {};
      data.hasUmbral[matches.target] = true;
    }
  }, {
    id: 'E7S Umbral Effect Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '8BF'
    }),
    run: (data, matches) => {
      data.hasUmbral = data.hasUmbral || {};
      data.hasUmbral[matches.target] = false;
    }
  }, {
    id: 'E7S Light\'s Course',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: ['4C62', '4C63', '4C64', '4C5B', '4C5F'],
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => {
      return !data.hasUmbral || !data.hasUmbral[matches.target];
    },
    mistake: (data, matches) => {
      if (data.hasAstral && data.hasAstral[matches.target]) return {
        type: 'fail',
        blame: matches.target,
        text: e7s_wrongBuff(matches.ability)
      };
      return {
        type: 'warn',
        blame: matches.target,
        text: e7s_noBuff(matches.ability)
      };
    }
  }, {
    id: 'E7S Darks\'s Course',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: ['4C65', '4C66', '4C67', '4C5A', '4C60'],
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => {
      return !data.hasAstral || !data.hasAstral[matches.target];
    },
    mistake: (data, matches) => {
      if (data.hasUmbral && data.hasUmbral[matches.target]) return {
        type: 'fail',
        blame: matches.target,
        text: e7s_wrongBuff(matches.ability)
      }; // This case is probably impossible, as the debuff ticks after death,
      // but leaving it here in case there's some rez or disconnect timing
      // that could lead to this.

      return {
        type: 'warn',
        blame: matches.target,
        text: e7s_noBuff(matches.ability)
      };
    }
  }, {
    id: 'E7S Crusade Knockback',
    type: 'Ability',
    // 4C76 is the knockback damage, 4C58 is the damage for standing on the puck.
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4C76',
      ...oopsy_common/* playerDamageFields */.np
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落'
        }
      };
    }
  }]
};
/* harmony default export */ const e7s = (e7s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e8n.ts



const e8n_triggerSet = {
  zoneId: zone_id/* default.EdensVerseRefulgence */.Z.EdensVerseRefulgence,
  damageWarn: {
    'E8N Biting Frost': '4DDB',
    // 270-degree frontal AoE, Shiva
    'E8N Driving Frost': '4DDC',
    // Rear cone AoE, Shiva
    'E8N Frigid Stone': '4E66',
    // Small spread circles, phase 1
    'E8N Reflected Axe Kick': '4E00',
    // Large circle AoE, Frozen Mirror
    'E8N Reflected Scythe Kick': '4E01',
    // Donut AoE, Frozen Mirror
    'E8N Frigid Eruption': '4E09',
    // Small circle AoE puddles, phase 1
    'E8N Icicle Impact': '4E0A',
    // Large circle AoE puddles, phase 1
    'E8N Axe Kick': '4DE2',
    // Large circle AoE, Shiva
    'E8N Scythe Kick': '4DE3',
    // Donut AoE, Shiva
    'E8N Reflected Biting Frost': '4DFE',
    // 270-degree frontal AoE, Frozen Mirror
    'E8N Reflected Driving Frost': '4DFF' // Cone AoE, Frozen Mirror

  },
  damageFail: {},
  triggers: [{
    id: 'E8N Shining Armor',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '95'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'E8N Heavenly Strike',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4DD8',
      ...oopsy_common/* playerDamageFields */.np
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Pushed off!',
          de: 'Runter gestoßen!',
          fr: 'A été poussé(e) !',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백됨!'
        }
      };
    }
  }, {
    id: 'E8N Frost Armor',
    type: 'GainsEffect',
    // Thin Ice
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '38F'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Slid off!',
          de: 'runtergerutscht!',
          fr: 'A glissé(e) !',
          ja: '滑った',
          cn: '滑落',
          ko: '미끄러짐!'
        }
      };
    }
  }]
};
/* harmony default export */ const e8n = (e8n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e8s.ts


// TODO: rush hitting the crystal
// TODO: adds not being killed
// TODO: taking the rush twice (when you have debuff)
// TODO: not hitting the dragon four times during wyrm's lament
// TODO: death reasons for not picking up puddle
// TODO: not being in the tower when you should
// TODO: picking up too many stacks
// Note: Banish III (4DA8) and Banish Iii Divided (4DA9) both are type=0x16 lines.
// The same is true for Banish (4DA6) and Banish Divided (4DA7).
// I'm not sure this makes any sense? But can't tell if the spread was a mistake or not.
// Maybe we could check for "Magic Vulnerability Up"?
const e8s_triggerSet = {
  zoneId: zone_id/* default.EdensVerseRefulgenceSavage */.Z.EdensVerseRefulgenceSavage,
  damageWarn: {
    'E8S Biting Frost': '4D66',
    // 270-degree frontal AoE, Shiva
    'E8S Driving Frost': '4D67',
    // Rear cone AoE, Shiva
    'E8S Axe Kick': '4D6D',
    // Large circle AoE, Shiva
    'E8S Scythe Kick': '4D6E',
    // Donut AoE, Shiva
    'E8S Reflected Axe Kick': '4DB9',
    // Large circle AoE, Frozen Mirror
    'E8S Reflected Scythe Kick': '4DBA',
    // Donut AoE, Frozen Mirror
    'E8S Frigid Eruption': '4D9F',
    // Small circle AoE puddles, phase 1
    'E8S Frigid Needle': '4D9D',
    // 8-way "flower" explosion
    'E8S Icicle Impact': '4DA0',
    // Large circle AoE puddles, phase 1
    'E8S Reflected Biting Frost 1': '4DB7',
    // 270-degree frontal AoE, Frozen Mirror
    'E8S Reflected Biting Frost 2': '4DC3',
    // 270-degree frontal AoE, Frozen Mirror
    'E8S Reflected Driving Frost 1': '4DB8',
    // Cone AoE, Frozen Mirror
    'E8S Reflected Driving Frost 2': '4DC4',
    // Cone AoE, Frozen Mirror
    'E8S Hallowed Wings 1': '4D75',
    // Left cleave
    'E8S Hallowed Wings 2': '4D76',
    // Right cleave
    'E8S Hallowed Wings 3': '4D77',
    // Knockback frontal cleave
    'E8S Reflected Hallowed Wings 1': '4D90',
    // Reflected left 2
    'E8S Reflected Hallowed Wings 2': '4DBB',
    // Reflected left 1
    'E8S Reflected Hallowed Wings 3': '4DC7',
    // Reflected right 2
    'E8S Reflected Hallowed Wings 4': '4D91',
    // Reflected right 1
    'E8S Twin Stillness 1': '4D68',
    'E8S Twin Stillness 2': '4D6B',
    'E8S Twin Silence 1': '4D69',
    'E8S Twin Silence 2': '4D6A',
    'E8S Akh Rhai': '4D99',
    'E8S Embittered Dance 1': '4D70',
    'E8S Embittered Dance 2': '4D71',
    'E8S Spiteful Dance 1': '4D6F',
    'E8S Spiteful Dance 2': '4D72'
  },
  damageFail: {
    // Broken tether.
    'E8S Refulgent Fate': '4DA4',
    // Shared orb, correct is Bright Pulse (4D95)
    'E8S Blinding Pulse': '4D96'
  },
  shareFail: {
    'E8S Path of Light': '4DA1' // Protean

  },
  triggers: [{
    id: 'E8S Shining Armor',
    type: 'GainsEffect',
    // Stun
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '95'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    // Interrupt
    id: 'E8S Stoneskin',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '4D85'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const e8s = (e8s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e9n.ts

const e9n_triggerSet = {
  zoneId: zone_id/* default.EdensPromiseUmbra */.Z.EdensPromiseUmbra,
  damageWarn: {
    'E9N The Art Of Darkness 1': '5223',
    // left-right cleave
    'E9N The Art Of Darkness 2': '5224',
    // left-right cleave
    'E9N Wide-Angle Particle Beam': '5AFF',
    // frontal cleave tutorial mechanic
    'E9N Wide-Angle Phaser': '55E1',
    // wide-angle "sides"
    'E9N Bad Vibrations': '55E6',
    // tethered outside giant tree ground aoes
    'E9N Earth-Shattering Particle Beam': '5225',
    // missing towers?
    'E9N Anti-Air Particle Beam': '55DC',
    // "get out" during panels
    'E9N Zero-Form Particle Beam 2': '55DB' // Clone line aoes w/ Anti-Air Particle Beam

  },
  damageFail: {
    'E9N Withdraw': '5534',
    // Slow to break seed chain, get sucked back in yikes
    'E9N Aetherosynthesis': '5535' // Standing on seeds during explosion (possibly via Withdraw)

  },
  shareWarn: {
    'E9N Zero-Form Particle Beam 1': '55EB' // tank laser with marker

  }
};
/* harmony default export */ const e9n = (e9n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e9s.ts



// TODO: 561D Evil Seed hits everyone, hard to know if there's a double tap
// TODO: falling through panel just does damage with no ability name, like a death wall
// TODO: what happens if you jump in seed thorns?
const e9s_triggerSet = {
  zoneId: zone_id/* default.EdensPromiseUmbraSavage */.Z.EdensPromiseUmbraSavage,
  damageWarn: {
    'E9S Bad Vibrations': '561C',
    // tethered outside giant tree ground aoes
    'E9S Wide-Angle Particle Beam': '5B00',
    // anti-air "sides"
    'E9S Wide-Angle Phaser Unlimited': '560E',
    // wide-angle "sides"
    'E9S Anti-Air Particle Beam': '5B01',
    // wide-angle "out"
    'E9S The Second Art Of Darkness 1': '5601',
    // left-right cleave
    'E9S The Second Art Of Darkness 2': '5602',
    // left-right cleave
    'E9S The Art Of Darkness 1': '5A95',
    // boss left-right summon/panel cleave
    'E9S The Art Of Darkness 2': '5A96',
    // boss left-right summon/panel cleave
    'E9S The Art Of Darkness Clone 1': '561E',
    // clone left-right summon cleave
    'E9S The Art Of Darkness Clone 2': '561F',
    // clone left-right summon cleave
    'E9S The Third Art Of Darkness 1': '5603',
    // third art left-right cleave initial
    'E9S The Third Art Of Darkness 2': '5604',
    // third art left-right cleave initial
    'E9S Art Of Darkness': '5606',
    // third art left-right cleave final
    'E9S Full-Perimiter Particle Beam': '5629',
    // panel "get in"
    'E9S Dark Chains': '5FAC' // Slow to break partner chains

  },
  damageFail: {
    'E9S Withdraw': '561A',
    // Slow to break seed chain, get sucked back in yikes
    'E9S Aetherosynthesis': '561B' // Standing on seeds during explosion (possibly via Withdraw)

  },
  gainsEffectWarn: {
    'E9S Stygian Tendrils': '952' // standing in the brambles

  },
  shareWarn: {
    'E9S Hyper-Focused Particle Beam': '55FD' // Art Of Darkness protean

  },
  shareFail: {
    'E9S Condensed Wide-Angle Particle Beam': '5610' // wide-angle "tank laser"

  },
  soloWarn: {
    'E9S Multi-Pronged Particle Beam': '5600' // Art Of Darkness Partner Stack

  },
  triggers: [{
    // Anti-air "tank spread".  This can be stacked by two tanks invulning.
    // Note: this will still show something for holmgang/living, but
    // arguably a healer might need to do something about that, so maybe
    // it's ok to still show as a warning??
    id: 'E9S Condensed Anti-Air Particle Beam',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      type: '22',
      id: '5615',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    // Anti-air "out".  This can be invulned by a tank along with the spread above.
    id: 'E9S Anti-Air Phaser Unlimited',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '5612',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const e9s = (e9s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e10n.ts

const e10n_triggerSet = {
  zoneId: zone_id/* default.EdensPromiseLitany */.Z.EdensPromiseLitany,
  damageWarn: {
    'E10N Forward Implosion': '56B4',
    // howl boss implosion
    'E10N Forward Shadow Implosion': '56B5',
    // howl shadow implosion
    'E10N Backward Implosion': '56B7',
    // tail boss implosion
    'E10N Backward Shadow Implosion': '56B8',
    // tail shadow implosion
    'E10N Barbs Of Agony 1': '56D9',
    // Shadow Warrior 3 dog room cleave
    'E10N Barbs Of Agony 2': '5B26',
    // Shadow Warrior 3 dog room cleave
    'E10N Cloak Of Shadows': '5B11',
    // non-squiggly line explosions
    'E10N Throne Of Shadow': '56C7',
    // standing up get out
    'E10N Right Giga Slash': '56AE',
    // boss right giga slash
    'E10N Right Shadow Slash': '56AF',
    // giga slash from shadow
    'E10N Left Giga Slash': '56B1',
    // boss left giga slash
    'E10N Left Shadow Slash': '56BD',
    // giga slash from shadow
    'E10N Shadowy Eruption': '56E1' // baited ground aoe markers paired with barbs

  },
  shareWarn: {
    'E10N Shadow\'s Edge': '56DB' // Tankbuster single target followup

  }
};
/* harmony default export */ const e10n = (e10n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e10s.ts



// TODO: hitting shadow of the hero with abilities can cause you to take damage, list those?
//       e.g. picking up your first pitch bog puddle will cause you to die to the damage
//       your shadow takes from Deepshadow Nova or Distant Scream.
// TODO: 573B Blighting Blitz issues during limit cut numbers
const e10s_triggerSet = {
  zoneId: zone_id/* default.EdensPromiseLitanySavage */.Z.EdensPromiseLitanySavage,
  damageWarn: {
    'E10S Implosion Single 1': '56F2',
    // single tail up shadow implosion
    'E10S Implosion Single 2': '56EF',
    // single howl shadow implosion
    'E10S Implosion Quadruple 1': '56EF',
    // quadruple set of shadow implosions
    'E10S Implosion Quadruple 2': '56F2',
    // quadruple set of shadow implosions
    'E10S Giga Slash Single 1': '56EC',
    // Giga slash single from shadow
    'E10S Giga Slash Single 2': '56ED',
    // Giga slash single from shadow
    'E10S Giga Slash Box 1': '5709',
    // Giga slash box from four ground shadows
    'E10S Giga Slash Box 2': '570D',
    // Giga slash box from four ground shadows
    'E10S Giga Slash Quadruple 1': '56EC',
    // quadruple set of giga slash cleaves
    'E10S Giga Slash Quadruple 2': '56E9',
    // quadruple set of giga slash cleaves
    'E10S Cloak Of Shadows 1': '5B13',
    // initial non-squiggly line explosions
    'E10S Cloak Of Shadows 2': '5B14',
    // second squiggly line explosions
    'E10S Throne Of Shadow': '5717',
    // standing up get out
    'E10S Shadowy Eruption': '5738' // baited ground aoe during amplifier

  },
  damageFail: {
    'E10S Swath Of Silence 1': '571A',
    // Shadow clone cleave (too close)
    'E10S Swath Of Silence 2': '5BBF' // Shadow clone cleave (timed)

  },
  shareWarn: {
    'E10S Shadefire': '5732',
    // purple tank umbral orbs
    'E10S Pitch Bog': '5722' // marker spread that drops a shadow puddle

  },
  shareFail: {
    'E10S Shadow\'s Edge': '5725' // Tankbuster single target followup

  },
  triggers: [{
    id: 'E10S Damage Down Orbs',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      source: 'Flameshadow',
      effectId: '82C'
    }),
    netRegexDe: netregexes/* default.gainsEffect */.Z.gainsEffect({
      source: 'Schattenflamme',
      effectId: '82C'
    }),
    netRegexFr: netregexes/* default.gainsEffect */.Z.gainsEffect({
      source: 'Flamme ombrale',
      effectId: '82C'
    }),
    netRegexJa: netregexes/* default.gainsEffect */.Z.gainsEffect({
      source: 'シャドウフレイム',
      effectId: '82C'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'damage',
        blame: matches.target,
        text: `${matches.effect} (partial stack)`
      };
    }
  }, {
    id: 'E10S Damage Down Boss',
    type: 'GainsEffect',
    // Shackles being messed up appear to just give the Damage Down, with nothing else.
    // Messing up towers is the Thrice-Come Ruin effect (9E2), but also Damage Down.
    // TODO: some of these will be duplicated with others, like `E10S Throne Of Shadow`.
    // Maybe it'd be nice to figure out how to put the damage marker on that?
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      source: 'Shadowkeeper',
      effectId: '82C'
    }),
    netRegexDe: netregexes/* default.gainsEffect */.Z.gainsEffect({
      source: 'Schattenkönig',
      effectId: '82C'
    }),
    netRegexFr: netregexes/* default.gainsEffect */.Z.gainsEffect({
      source: 'Roi De L\'Ombre',
      effectId: '82C'
    }),
    netRegexJa: netregexes/* default.gainsEffect */.Z.gainsEffect({
      source: '影の王',
      effectId: '82C'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'damage',
        blame: matches.target,
        text: `${matches.effect}`
      };
    }
  }, {
    // Shadow Warrior 4 dog room cleave
    // This can be mitigated by the whole group, so add a damage condition.
    id: 'E10S Barbs Of Agony',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: ['572A', '5B27'],
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const e10s = (e10s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e11n.ts


const e11n_triggerSet = {
  zoneId: zone_id/* default.EdensPromiseAnamorphosis */.Z.EdensPromiseAnamorphosis,
  damageWarn: {
    'E11N Burnt Strike Lightning': '562E',
    // Line cleave
    'E11N Burnt Strike Fire': '562C',
    // Line cleave
    'E11N Burnt Strike Holy': '5630',
    // Line cleave
    'E11N Burnout': '562F',
    // Burnt Strike lightning expansion
    'E11N Shining Blade': '5631',
    // Baited explosion
    'E11N Halo Of Flame Brightfire': '563B',
    // Red circle intermission explosion
    'E11N Halo Of Levin Brightfire': '563C',
    // Blue circle intermission explosion
    'E11N Resounding Crack': '564D',
    // Demi-Gukumatz 270 degree frontal cleave
    'E11N Image Burnt Strike Lightning': '5645',
    // Fate Breaker's Image line cleave
    'E11N Image Burnt Strike Fire': '5643',
    // Fate Breaker's Image line cleave
    'E11N Image Burnout': '5646' // Fate Breaker's Image lightning expansion

  },
  damageFail: {
    'E11N Blasting Zone': '563E' // Prismatic Deception charges

  },
  shareWarn: {
    'E11N Burn Mark': '564F' // Powder Mark debuff explosion

  },
  triggers: [{
    id: 'E11N Blastburn Knocked Off',
    type: 'Ability',
    // 562D = Burnt Strike fire followup during most of the fight
    // 5644 = same thing, but from Fatebreaker's Image
    netRegex: netregexes/* default.ability */.Z.ability({
      id: ['562D', '5644']
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const e11n = (e11n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e11s.ts


// 565A/568D Sinsmoke Bound Of Faith share
// 565E/5699 Bowshock hits target of 565D (twice) and two others
const e11s_triggerSet = {
  zoneId: zone_id/* default.EdensPromiseAnamorphosisSavage */.Z.EdensPromiseAnamorphosisSavage,
  damageWarn: {
    'E11S Burnt Strike Fire': '5652',
    // Line cleave
    'E11S Burnt Strike Lightning': '5654',
    // Line cleave
    'E11S Burnt Strike Holy': '5656',
    // Line cleave
    'E11S Shining Blade': '5657',
    // Baited explosion
    'E11S Burnt Strike Cycle Fire': '568E',
    // Line cleave during Cycle
    'E11S Burnt Strike Cycle Lightning': '5695',
    // Line cleave during Cycle
    'E11S Burnt Strike Cycle Holy': '569D',
    // Line cleave during Cycle
    'E11S Shining Blade Cycle': '569E',
    // Baited explosion during Cycle
    'E11S Halo Of Flame Brightfire': '566D',
    // Red circle intermission explosion
    'E11S Halo Of Levin Brightfire': '566C',
    // Blue circle intermission explosion
    'E11S Portal Of Flame Bright Pulse': '5671',
    // Red card intermission explosion
    'E11S Portal Of Levin Bright Pulse': '5670',
    // Blue card intermission explosion
    'E11S Resonant Winds': '5689',
    // Demi-Gukumatz "get in"
    'E11S Resounding Crack': '5688',
    // Demi-Gukumatz 270 degree frontal cleave
    'E11S Image Burnt Strike Lightning': '567B',
    // Fate Breaker's Image line cleave
    'E11N Image Burnout': '567C',
    // Fate Breaker's Image lightning expansion
    'E11N Image Burnt Strike Fire': '5679',
    // Fate Breaker's Image line cleave
    'E11N Image Burnt Strike Holy': '567B',
    // Fate Breaker's Image line cleave
    'E11N Image Shining Blade': '567E' // Fate Breaker's Image baited explosion

  },
  damageFail: {
    'E11S Burnout': '5655',
    // Burnt Strike lightning expansion
    'E11S Burnout Cycle': '5696',
    // Burnt Strike lightning expansion
    'E11S Blasting Zone': '5674' // Prismatic Deception charges

  },
  shareWarn: {
    'E11S Elemental Break': '5664',
    // Elemental Break protean
    'E11S Elemental Break Cycle': '568C',
    // Elemental Break protean during Cycle
    'E11S Sinsmite': '5667',
    // Lightning Elemental Break spread
    'E11S Sinsmite Cycle': '5694' // Lightning Elemental Break spread during Cycle

  },
  shareFail: {
    'E11S Burn Mark': '56A3',
    // Powder Mark debuff explosion
    'E11S Sinsight 1': '5661',
    // Holy Bound Of Faith tether
    'E11S Sinsight 2': '5BC7',
    // Holy Bound Of Faith tether from Fatebreaker's Image
    'E11S Sinsight 3': '56A0' // Holy Bound Of Faith tether during Cycle

  },
  soloFail: {
    'E11S Holy Sinsight Group Share': '5669'
  },
  triggers: [{
    id: 'E11S Blastburn Knocked Off',
    type: 'Ability',
    // 5653 = Burnt Strike fire followup during most of the fight
    // 567A = same thing, but from Fatebreaker's Image
    // 568F = same thing, but during Cycle of Faith
    netRegex: netregexes/* default.ability */.Z.ability({
      id: ['5653', '567A', '568F']
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const e11s = (e11s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e12n.ts

const e12n_triggerSet = {
  zoneId: zone_id/* default.EdensPromiseEternity */.Z.EdensPromiseEternity,
  damageWarn: {
    'E12N Judgment Jolt Single': '585F',
    // Ramuh get out cast
    'E12N Judgment Jolt': '4E30',
    // Ramuh get out cast
    'E12N Temporary Current Single': '585C',
    // Levi get under cast
    'E12N Temporary Current': '4E2D',
    // Levi get under cast
    'E12N Conflag Strike Single': '585D',
    // Ifrit get sides cast
    'E12N Conflag Strike': '4E2E',
    // Ifrit get sides cast
    'E12N Ferostorm Single': '585E',
    // Garuda get intercardinals cast
    'E12N Ferostorm': '4E2F',
    // Garuda get intercardinals cast
    'E12N Rapturous Reach 1': '5878',
    // Haircut
    'E12N Rapturous Reach 2': '5877',
    // Haircut
    'E12N Bomb Explosion': '586D',
    // Small bomb explosion
    'E12N Titanic Bomb Explosion': '586F' // Large bomb explosion

  },
  shareWarn: {
    'E12N Earthshaker': '5885',
    // Earthshaker on first platform
    'E12N Promise Frigid Stone 1': '5867',
    // Shiva spread with sliding
    'E12N Promise Frigid Stone 2': '5869' // Shiva spread with Rapturous Reach

  }
};
/* harmony default export */ const e12n = (e12n_triggerSet);
// EXTERNAL MODULE: ./resources/not_reached.ts
var not_reached = __webpack_require__(3062);
// EXTERNAL MODULE: ./resources/outputs.ts
var outputs = __webpack_require__(1081);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e12s.ts





// TODO: add separate damageWarn-esque icon for damage downs?
// TODO: 58A6 Under The Weight / 58B2 Classical Sculpture missing somebody in party warning?
// TODO: 58CA Dark Water III / 58C5 Shell Crusher should hit everyone in party
// TODO: Dark Aero III 58D4 should not be a share except on advanced relativity for double aero.
// (for gains effect, single aero = ~23 seconds, double aero = ~31 seconds duration)
// Due to changes introduced in patch 5.2, overhead markers now have a random offset
// added to their ID. This offset currently appears to be set per instance, so
// we can determine what it is from the first overhead marker we see.
// The first 1B marker in the encounter is the formless tankbuster, ID 004F.
const firstHeadmarker = parseInt('00DA', 16);

const getHeadmarkerId = (data, matches) => {
  // If we naively just check !data.decOffset and leave it, it breaks if the first marker is 00DA.
  // (This makes the offset 0, and !0 is true.)
  if (typeof data.decOffset === 'undefined') data.decOffset = parseInt(matches.id, 16) - firstHeadmarker; // The leading zeroes are stripped when converting back to string, so we re-add them here.
  // Fortunately, we don't have to worry about whether or not this is robust,
  // since we know all the IDs that will be present in the encounter.

  return (parseInt(matches.id, 16) - data.decOffset).toString(16).toUpperCase().padStart(4, '0');
};

const e12s_triggerSet = {
  zoneId: zone_id/* default.EdensPromiseEternitySavage */.Z.EdensPromiseEternitySavage,
  damageWarn: {
    'E12S Promise Rapturous Reach Left': '58AD',
    // Haircut with left safe side
    'E12S Promise Rapturous Reach Right': '58AE',
    // Haircut with right safe side
    'E12S Promise Temporary Current': '4E44',
    // Levi get under cast (damage down)
    'E12S Promise Conflag Strike': '4E45',
    // Ifrit get sides cast (damage down)
    'E12S Promise Ferostorm': '4E46',
    // Garuda get intercardinals cast (damage down)
    'E12S Promise Judgment Jolt': '4E47',
    // Ramuh get out cast (damage down)
    'E12S Promise Shatter': '589C',
    // Ice Pillar explosion if tether not gotten
    'E12S Promise Impact': '58A1',
    // Titan bomb drop
    'E12S Oracle Dark Blizzard III': '58D3',
    // Relativity donut mechanic
    'E12S Oracle Apocalypse': '58E6' // Light up circle explosions (damage down)

  },
  damageFail: {
    'E12S Oracle Maelstrom': '58DA' // Advanced Relativity traffic light aoe

  },
  gainsEffectFail: {
    'E12S Oracle Doom': '9D4' // Relativity punishment for multiple mistakes

  },
  shareWarn: {
    'E12S Promise Frigid Stone': '589E',
    // Shiva spread
    'E12S Oracle Darkest Dance': '4E33',
    // Farthest target bait + jump before knockback
    'E12S Oracle Dark Current': '58D8',
    // Baited traffic light lasers
    'E12S Oracle Spirit Taker': '58C6',
    // Random jump spread mechanic after Shell Crusher
    'E12S Oracle Somber Dance 1': '58BF',
    // Farthest target bait for Dual Apocalypse
    'E12S Oracle Somber Dance 2': '58C0' // Second somber dance jump

  },
  shareFail: {
    'E12S Promise Weight Of The World': '58A5',
    // Titan bomb blue marker
    'E12S Promise Pulse Of The Land': '58A3',
    // Titan bomb yellow marker
    'E12S Oracle Dark Eruption 1': '58CE',
    // Initial warmup spread mechanic
    'E12S Oracle Dark Eruption 2': '58CD',
    // Relativity spread mechanic
    'E12S Oracle Black Halo': '58C7' // Tankbuster cleave

  },
  soloWarn: {
    'E12S Promise Force Of The Land': '58A4'
  },
  triggers: [{
    // Big circle ground aoes during Shiva junction.
    // This can be shielded through as long as that person doesn't stack.
    id: 'E12S Icicle Impact',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4E5A',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'E12S Headmarker',
    type: 'HeadMarker',
    netRegex: netregexes/* default.headMarker */.Z.headMarker({}),
    run: (data, matches) => {
      const id = getHeadmarkerId(data, matches);
      const firstLaserMarker = '0091';
      const lastLaserMarker = '0098';

      if (id >= firstLaserMarker && id <= lastLaserMarker) {
        var _data$laserNameToNum;

        // ids are sequential: #1 square, #2 square, #3 square, #4 square, #1 triangle etc
        const decOffset = parseInt(id, 16) - parseInt(firstLaserMarker, 16); // decOffset is 0-7, so map 0-3 to 1-4 and 4-7 to 1-4.

        (_data$laserNameToNum = data.laserNameToNum) !== null && _data$laserNameToNum !== void 0 ? _data$laserNameToNum : data.laserNameToNum = {};
        data.laserNameToNum[matches.target] = decOffset % 4 + 1;
      }
    }
  }, {
    // These sculptures are added at the start of the fight, so we need to check where they
    // use the "Classical Sculpture" ability and end up on the arena for real.
    id: 'E12S Promise Chiseled Sculpture Classical Sculpture',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      source: 'Chiseled Sculpture',
      id: '58B2'
    }),
    run: (data, matches) => {
      var _data$sculptureYPosit;

      // This will run per person that gets hit by the same sculpture, but that's fine.
      // Record the y position of each sculpture so we can use it for better text later.
      (_data$sculptureYPosit = data.sculptureYPositions) !== null && _data$sculptureYPosit !== void 0 ? _data$sculptureYPosit : data.sculptureYPositions = {};
      data.sculptureYPositions[matches.sourceId.toUpperCase()] = parseFloat(matches.y);
    }
  }, {
    // The source of the tether is the player, the target is the sculpture.
    id: 'E12S Promise Chiseled Sculpture Tether',
    type: 'Tether',
    netRegex: netregexes/* default.tether */.Z.tether({
      target: 'Chiseled Sculpture',
      id: '0011'
    }),
    run: (data, matches) => {
      var _data$sculptureTether;

      (_data$sculptureTether = data.sculptureTetherNameToId) !== null && _data$sculptureTether !== void 0 ? _data$sculptureTether : data.sculptureTetherNameToId = {};
      data.sculptureTetherNameToId[matches.source] = matches.targetId.toUpperCase();
    }
  }, {
    id: 'E12S Promise Blade Of Flame Counter',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      source: 'Chiseled Sculpture',
      id: '58B3'
    }),
    delaySeconds: 1,
    suppressSeconds: 1,
    run: data => {
      data.bladeOfFlameCount = data.bladeOfFlameCount || 0;
      data.bladeOfFlameCount++;
    }
  }, {
    // This is the Chiseled Sculpture laser with the limit cut dots.
    id: 'E12S Promise Blade Of Flame',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      type: '22',
      source: 'Chiseled Sculpture',
      id: '58B3'
    }),
    mistake: (data, matches) => {
      if (!data.laserNameToNum || !data.sculptureTetherNameToId || !data.sculptureYPositions) return; // Find the person who has this laser number and is tethered to this statue.

      const number = (data.bladeOfFlameCount || 0) + 1;
      const sourceId = matches.sourceId.toUpperCase();
      const names = Object.keys(data.laserNameToNum);
      const withNum = names.filter(name => {
        var _data$laserNameToNum2;

        return ((_data$laserNameToNum2 = data.laserNameToNum) === null || _data$laserNameToNum2 === void 0 ? void 0 : _data$laserNameToNum2[name]) === number;
      });
      const owners = withNum.filter(name => {
        var _data$sculptureTether2;

        return ((_data$sculptureTether2 = data.sculptureTetherNameToId) === null || _data$sculptureTether2 === void 0 ? void 0 : _data$sculptureTether2[name]) === sourceId;
      }); // if some logic error, just abort.

      if (owners.length !== 1) return; // The owner hitting themselves isn't a mistake...technically.

      if (owners[0] === matches.target) return; // Now try to figure out which statue is which.
      // People can put these wherever.  They could go sideways, or diagonal, or whatever.
      // It seems mooooost people put these north / south (on the south edge of the arena).
      // Let's say a minimum of 2 yalms apart in the y direction to consider them "north/south".

      const minimumYalmsForStatues = 2;
      let isStatuePositionKnown = false;
      let isStatueNorth = false;
      const sculptureIds = Object.keys(data.sculptureYPositions);

      if (sculptureIds.length === 2 && sculptureIds.includes(sourceId)) {
        const otherId = sculptureIds[0] === sourceId ? sculptureIds[1] : sculptureIds[0];
        const sourceY = data.sculptureYPositions[sourceId];
        const otherY = data.sculptureYPositions[otherId !== null && otherId !== void 0 ? otherId : ''];
        if (sourceY === undefined || otherY === undefined || otherId === undefined) throw new not_reached/* UnreachableCode */.$();
        const yDiff = Math.abs(sourceY - otherY);

        if (yDiff > minimumYalmsForStatues) {
          isStatuePositionKnown = true;
          isStatueNorth = sourceY < otherY;
        }
      }

      const owner = owners[0];
      const ownerNick = data.ShortName(owner);
      let text = {
        en: `${matches.ability} (from ${ownerNick}, #${number})`,
        de: `${matches.ability} (von ${ownerNick}, #${number})`,
        ja: `${matches.ability} (${ownerNick}から、#${number})`,
        cn: `${matches.ability} (来自${ownerNick}，#${number})`,
        ko: `${matches.ability} (대상자 "${ownerNick}", ${number}번)`
      };

      if (isStatuePositionKnown && isStatueNorth) {
        text = {
          en: `${matches.ability} (from ${ownerNick}, #${number} north)`,
          de: `${matches.ability} (von ${ownerNick}, #${number} norden)`,
          ja: `${matches.ability} (北の${ownerNick}から、#${number})`,
          cn: `${matches.ability} (来自北方${ownerNick}，#${number})`,
          ko: `${matches.ability} (대상자 "${ownerNick}", ${number}번 북쪽)`
        };
      } else if (isStatuePositionKnown && !isStatueNorth) {
        text = {
          en: `${matches.ability} (from ${ownerNick}, #${number} south)`,
          de: `${matches.ability} (von ${ownerNick}, #${number} Süden)`,
          ja: `${matches.ability} (南の${ownerNick}から、#${number})`,
          cn: `${matches.ability} (来自南方${ownerNick}，#${number})`,
          ko: `${matches.ability} (대상자 "${ownerNick}", ${number}번 남쪽)`
        };
      }

      return {
        type: 'fail',
        name: matches.target,
        blame: owner,
        text: text
      };
    }
  }, {
    id: 'E12S Promise Ice Pillar Tracker',
    type: 'Tether',
    netRegex: netregexes/* default.tether */.Z.tether({
      source: 'Ice Pillar',
      id: ['0001', '0039']
    }),
    run: (data, matches) => {
      var _data$pillarIdToOwner;

      (_data$pillarIdToOwner = data.pillarIdToOwner) !== null && _data$pillarIdToOwner !== void 0 ? _data$pillarIdToOwner : data.pillarIdToOwner = {};
      data.pillarIdToOwner[matches.sourceId] = matches.target;
    }
  }, {
    id: 'E12S Promise Ice Pillar Mistake',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      source: 'Ice Pillar',
      id: '589B'
    }),
    condition: (data, matches) => {
      if (!data.pillarIdToOwner) return false;
      return matches.target !== data.pillarIdToOwner[matches.sourceId];
    },
    mistake: (data, matches) => {
      var _data$pillarIdToOwner2;

      const pillarOwner = data.ShortName((_data$pillarIdToOwner2 = data.pillarIdToOwner) === null || _data$pillarIdToOwner2 === void 0 ? void 0 : _data$pillarIdToOwner2[matches.sourceId]);
      return {
        type: 'fail',
        blame: matches.target,
        text: {
          en: `${matches.ability} (from ${pillarOwner})`,
          de: `${matches.ability} (von ${pillarOwner})`,
          fr: `${matches.ability} (de ${pillarOwner})`,
          ja: `${matches.ability} (${pillarOwner}から)`,
          cn: `${matches.ability} (来自${pillarOwner})`,
          ko: `${matches.ability} (대상자 "${pillarOwner}")`
        }
      };
    }
  }, {
    id: 'E12S Promise Gain Fire Resistance Down II',
    type: 'GainsEffect',
    // The Beastly Sculpture gives a 3 second debuff, the Regal Sculpture gives a 14s one.
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '832'
    }),
    run: (data, matches) => {
      var _data$fire;

      (_data$fire = data.fire) !== null && _data$fire !== void 0 ? _data$fire : data.fire = {};
      data.fire[matches.target] = true;
    }
  }, {
    id: 'E12S Promise Lose Fire Resistance Down II',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '832'
    }),
    run: (data, matches) => {
      var _data$fire2;

      (_data$fire2 = data.fire) !== null && _data$fire2 !== void 0 ? _data$fire2 : data.fire = {};
      data.fire[matches.target] = false;
    }
  }, {
    id: 'E12S Promise Small Lion Tether',
    type: 'Tether',
    netRegex: netregexes/* default.tether */.Z.tether({
      source: 'Beastly Sculpture',
      id: '0011'
    }),
    netRegexDe: netregexes/* default.tether */.Z.tether({
      source: 'Abbild Eines Löwen',
      id: '0011'
    }),
    netRegexFr: netregexes/* default.tether */.Z.tether({
      source: 'Création Léonine',
      id: '0011'
    }),
    netRegexJa: netregexes/* default.tether */.Z.tether({
      source: '創られた獅子',
      id: '0011'
    }),
    run: (data, matches) => {
      var _data$smallLionIdToOw, _data$smallLionOwners;

      (_data$smallLionIdToOw = data.smallLionIdToOwner) !== null && _data$smallLionIdToOw !== void 0 ? _data$smallLionIdToOw : data.smallLionIdToOwner = {};
      data.smallLionIdToOwner[matches.sourceId.toUpperCase()] = matches.target;
      (_data$smallLionOwners = data.smallLionOwners) !== null && _data$smallLionOwners !== void 0 ? _data$smallLionOwners : data.smallLionOwners = [];
      data.smallLionOwners.push(matches.target);
    }
  }, {
    id: 'E12S Promise Small Lion Lionsblaze',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      source: 'Beastly Sculpture',
      id: '58B9'
    }),
    netRegexDe: netregexes/* default.abilityFull */.Z.abilityFull({
      source: 'Abbild Eines Löwen',
      id: '58B9'
    }),
    netRegexFr: netregexes/* default.abilityFull */.Z.abilityFull({
      source: 'Création Léonine',
      id: '58B9'
    }),
    netRegexJa: netregexes/* default.abilityFull */.Z.abilityFull({
      source: '創られた獅子',
      id: '58B9'
    }),
    mistake: (data, matches) => {
      var _data$smallLionIdToOw2;

      // Folks baiting the big lion second can take the first small lion hit,
      // so it's not sufficient to check only the owner.
      if (!data.smallLionOwners) return;
      const owner = (_data$smallLionIdToOw2 = data.smallLionIdToOwner) === null || _data$smallLionIdToOw2 === void 0 ? void 0 : _data$smallLionIdToOw2[matches.sourceId.toUpperCase()];
      if (!owner) return;
      if (matches.target === owner) return; // If the target also has a small lion tether, that is always a mistake.
      // Otherwise, it's only a mistake if the target has a fire debuff.

      const hasSmallLion = data.smallLionOwners.includes(matches.target);
      const hasFireDebuff = data.fire && data.fire[matches.target];

      if (hasSmallLion || hasFireDebuff) {
        const ownerNick = data.ShortName(owner);
        const centerY = -75;
        const x = parseFloat(matches.x);
        const y = parseFloat(matches.y);
        let dirObj = null;

        if (y < centerY) {
          if (x > 0) dirObj = outputs/* default.dirNE */.Z.dirNE;else dirObj = outputs/* default.dirNW */.Z.dirNW;
        } else {
          if (x > 0) dirObj = outputs/* default.dirSE */.Z.dirSE;else dirObj = outputs/* default.dirSW */.Z.dirSW;
        }

        return {
          type: 'fail',
          blame: owner,
          name: matches.target,
          text: {
            en: `${matches.ability} (from ${ownerNick}, ${dirObj['en']})`,
            de: `${matches.ability} (von ${ownerNick}, ${dirObj['de']})`,
            fr: `${matches.ability} (de ${ownerNick}, ${dirObj['fr']})`,
            ja: `${matches.ability} (${ownerNick}から, ${dirObj['ja']})`,
            cn: `${matches.ability} (来自${ownerNick}, ${dirObj['cn']}`,
            ko: `${matches.ability} (대상자 "${ownerNick}", ${dirObj['ko']})`
          }
        };
      }
    }
  }, {
    id: 'E12S Promise North Big Lion',
    type: 'AddedCombatant',
    netRegex: netregexes/* default.addedCombatantFull */.Z.addedCombatantFull({
      name: 'Regal Sculpture'
    }),
    run: (data, matches) => {
      const y = parseFloat(matches.y);
      const centerY = -75;
      if (y < centerY) data.northBigLion = matches.id.toUpperCase();
    }
  }, {
    id: 'E12S Promise Big Lion Kingsblaze',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      source: 'Regal Sculpture',
      id: '4F9E'
    }),
    netRegexDe: netregexes/* default.ability */.Z.ability({
      source: 'Abbild eines großen Löwen',
      id: '4F9E'
    }),
    netRegexFr: netregexes/* default.ability */.Z.ability({
      source: 'création léonine royale',
      id: '4F9E'
    }),
    netRegexJa: netregexes/* default.ability */.Z.ability({
      source: '創られた獅子王',
      id: '4F9E'
    }),
    mistake: (data, matches) => {
      var _shared$lang, _fireDebuff$lang;

      const singleTarget = matches.type === '21';
      const hasFireDebuff = data.fire && data.fire[matches.target]; // Success if only one person takes it and they have no fire debuff.

      if (singleTarget && !hasFireDebuff) return;
      const northBigLion = {
        en: 'north big lion',
        de: 'Nordem, großer Löwe',
        ja: '大ライオン(北)',
        cn: '北方大狮子',
        ko: '북쪽 큰 사자'
      };
      const southBigLion = {
        en: 'south big lion',
        de: 'Süden, großer Löwe',
        ja: '大ライオン(南)',
        cn: '南方大狮子',
        ko: '남쪽 큰 사자'
      };
      const shared = {
        en: 'shared',
        de: 'geteilt',
        ja: '重ねた',
        cn: '重叠',
        ko: '같이 맞음'
      };
      const fireDebuff = {
        en: 'had fire',
        de: 'hatte Feuer',
        ja: '炎付き',
        cn: '火Debuff',
        ko: '화염 디버프 받음'
      };
      const labels = [];
      const lang = data.options.ParserLanguage;

      if (data.northBigLion) {
        var _northBigLion$lang, _southBigLion$lang;

        if (data.northBigLion === matches.sourceId) labels.push((_northBigLion$lang = northBigLion[lang]) !== null && _northBigLion$lang !== void 0 ? _northBigLion$lang : northBigLion['en']);else labels.push((_southBigLion$lang = southBigLion[lang]) !== null && _southBigLion$lang !== void 0 ? _southBigLion$lang : southBigLion['en']);
      }

      if (!singleTarget) labels.push((_shared$lang = shared[lang]) !== null && _shared$lang !== void 0 ? _shared$lang : shared['en']);
      if (hasFireDebuff) labels.push((_fireDebuff$lang = fireDebuff[lang]) !== null && _fireDebuff$lang !== void 0 ? _fireDebuff$lang : fireDebuff['en']);
      return {
        type: 'fail',
        name: matches.target,
        text: `${matches.ability} (${labels.join(', ')})`
      };
    }
  }, {
    id: 'E12S Knocked Off',
    type: 'Ability',
    // 589A = Ice Pillar (promise shiva phase)
    // 58B6 = Palm Of Temperance (promise statue hand)
    // 58B7 = Laser Eye (promise lion phase)
    // 58C1 = Darkest Dance (oracle tank jump + knockback in beginning and triple apoc)
    netRegex: netregexes/* default.ability */.Z.ability({
      id: ['589A', '58B6', '58B7', '58C1']
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }, {
    id: 'E12S Oracle Shadoweye',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '58D2',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const e12s = (e12s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/diamond_weapon-ex.ts


// TODO: warning for taking Diamond Flash (5FA1) stack on your own?
// Diamond Weapon Extreme
const diamond_weapon_ex_triggerSet = {
  zoneId: zone_id/* default.TheCloudDeckExtreme */.Z.TheCloudDeckExtreme,
  damageWarn: {
    'DiamondEx Auri Arts 1': '5FAF',
    // Auri Arts dashes/explosions
    'DiamondEx Auri Arts 2': '5FB2',
    // Auri Arts dashes/explosions
    'DiamondEx Auri Arts 3': '5FCD',
    // Auri Arts dashes/explosions
    'DiamondEx Auri Arts 4': '5FCE',
    // Auri Arts dashes/explosions
    'DiamondEx Auri Arts 5': '5FCF',
    // Auri Arts dashes/explosions
    'DiamondEx Auri Arts 6': '5FF8',
    // Auri Arts dashes/explosions
    'DiamondEx Auri Arts 7': '6159',
    // Auri Arts dashes/explosions
    'DiamondEx Articulated Bit Aetherial Bullet': '5FAB',
    // bit lasers during all phases
    'DiamondEx Diamond Shrapnel 1': '5FCB',
    // chasing circles
    'DiamondEx Diamond Shrapnel 2': '5FCC' // chasing circles

  },
  damageFail: {
    'DiamondEx Claw Swipe Left': '5FC2',
    // Adamant Purge platform cleave
    'DiamondEx Claw Swipe Right': '5FC3',
    // Adamant Purge platform cleave
    'DiamondEx Auri Cyclone 1': '5FD1',
    // standing on the blue knockback puck
    'DiamondEx Auri Cyclone 2': '5FD2',
    // standing on the blue knockback puck
    'DiamondEx Airship\'s Bane 1': '5FFE',
    // destroying one of the platforms after Auri Cyclone
    'DiamondEx Airship\'s Bane 2': '5FD3' // destroying one of the platforms after Auri Cyclone

  },
  shareWarn: {
    'DiamondEx Tank Lasers': '5FC8',
    // cleaving yellow lasers on top two enmity
    'DiamondEx Homing Laser': '5FC4' // Adamante Purge spread

  },
  shareFail: {
    'DiamondEx Flood Ray': '5FC7' // "limit cut" cleaves

  },
  triggers: [{
    id: 'DiamondEx Vertical Cleave Knocked Off',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '5FD0'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const diamond_weapon_ex = (diamond_weapon_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/diamond_weapon.ts


// Diamond Weapon Normal
const diamond_weapon_triggerSet = {
  zoneId: zone_id/* default.TheCloudDeck */.Z.TheCloudDeck,
  damageWarn: {
    'Diamond Weapon Auri Arts': '5FE3',
    // Auri Arts dashes
    'Diamond Weapon Diamond Shrapnel Initial': '5FE1',
    // initial circle of Diamond Shrapnel
    'Diamond Weapon Diamond Shrapnel Chasing': '5FE2',
    // followup circles from Diamond Shrapnel
    'Diamond Weapon Aetherial Bullet': '5FD5' // bit lasers

  },
  damageFail: {
    'Diamond Weapon Claw Swipe Left': '5FD9',
    // Adamant Purge platform cleave
    'Diamond Weapon Claw Swipe Right': '5FDA',
    // Adamant Purge platform cleave
    'Diamond Weapon Auri Cyclone 1': '5FE6',
    // standing on the blue knockback puck
    'Diamond Weapon Auri Cyclone 2': '5FE7',
    // standing on the blue knockback puck
    'Diamond Weapon Airship\'s Bane 1': '5FE8',
    // destroying one of the platforms after Auri Cyclone
    'Diamond Weapon Airship\'s Bane 2': '5FFE' // destroying one of the platforms after Auri Cyclone

  },
  shareWarn: {
    'Diamond Weapon Homing Laser': '5FDB' // spread markers

  },
  triggers: [{
    id: 'Diamond Weapon Vertical Cleave Knocked Off',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '5FE5'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const diamond_weapon = (diamond_weapon_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/emerald_weapon-ex.ts

const emerald_weapon_ex_triggerSet = {
  zoneId: zone_id/* default.CastrumMarinumExtreme */.Z.CastrumMarinumExtreme,
  damageWarn: {
    'EmeraldEx Heat Ray': '5BD3',
    // Emerald Beam initial conal
    'EmeraldEx Photon Laser 1': '557B',
    // Emerald Beam inside circle
    'EmeraldEx Photon Laser 2': '557D',
    // Emerald Beam outside circle
    'EmeraldEx Heat Ray 1': '557A',
    // Emerald Beam rotating pulsing laser
    'EmeraldEx Heat Ray 2': '5579',
    // Emerald Beam rotating pulsing laser
    'EmeraldEx Explosion': '5596',
    // Magitek Mine explosion
    'EmeraldEx Tertius Terminus Est Initial': '55CD',
    // sword initial puddles
    'EmeraldEx Tertius Terminus Est Explosion': '55CE',
    // sword explosions
    'EmeraldEx Airborne Explosion': '55BD',
    // exaflare
    'EmeraldEx Sidescathe 1': '55D4',
    // left/right cleave
    'EmeraldEx Sidescathe 2': '55D5',
    // left/right cleave
    'EmeraldEx Shots Fired': '55B7',
    // rank and file soldiers
    'EmeraldEx Secundus Terminus Est': '55CB',
    // dropped + and x headmarkers
    'EmeraldEx Expire': '55D1',
    // ground aoe on boss "get out"
    'EmeraldEx Aire Tam Storm': '55D0' // expanding red and black ground aoe

  },
  shareWarn: {
    'EmeraldEx Divide Et Impera': '55D9',
    // non-tank protean spread
    'EmeraldEx Primus Terminus Est 1': '55C4',
    // knockback arrow
    'EmeraldEx Primus Terminus Est 2': '55C5',
    // knockback arrow
    'EmeraldEx Primus Terminus Est 3': '55C6',
    // knockback arrow
    'EmeraldEx Primus Terminus Est 4': '55C7' // knockback arrow

  }
};
/* harmony default export */ const emerald_weapon_ex = (emerald_weapon_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/emerald_weapon.ts


const emerald_weapon_triggerSet = {
  zoneId: zone_id/* default.CastrumMarinum */.Z.CastrumMarinum,
  damageWarn: {
    'Emerald Weapon Heat Ray': '4F9D',
    // Emerald Beam initial conal
    'Emerald Weapon Photon Laser 1': '5534',
    // Emerald Beam inside circle
    'Emerald Weapon Photon Laser 2': '5536',
    // Emerald Beam middle circle
    'Emerald Weapon Photon Laser 3': '5538',
    // Emerald Beam outside circle
    'Emerald Weapon Heat Ray 1': '5532',
    // Emerald Beam rotating pulsing laser
    'Emerald Weapon Heat Ray 2': '5533',
    // Emerald Beam rotating pulsing laser
    'Emerald Weapon Magnetic Mine Explosion': '5B04',
    // repulsing mine explosions
    'Emerald Weapon Sidescathe 1': '553F',
    // left/right cleave
    'Emerald Weapon Sidescathe 2': '5540',
    // left/right cleave
    'Emerald Weapon Sidescathe 3': '5541',
    // left/right cleave
    'Emerald Weapon Sidescathe 4': '5542',
    // left/right cleave
    'Emerald Weapon Bit Storm': '554A',
    // "get in"
    'Emerald Weapon Emerald Crusher': '553C',
    // blue knockback puck
    'Emerald Weapon Pulse Laser': '5548',
    // line aoe
    'Emerald Weapon Energy Aetheroplasm': '5551',
    // hitting a glowy orb
    'Emerald Weapon Divide Et Impera Ground': '556F',
    // party targeted ground cones
    'Emerald Weapon Primus Terminus Est': '4B3E',
    // ground circle during arrow headmarkers
    'Emerald Weapon Secundus Terminus Est': '556A',
    // X / + headmarkers
    'Emerald Weapon Tertius Terminus Est': '556D',
    // triple swords
    'Emerald Weapon Shots Fired': '555F' // line aoes from soldiers

  },
  shareWarn: {
    'Emerald Weapon Divide Et Impera P1': '554E',
    // tankbuster, probably cleaves, phase 1
    'Emerald Weapon Divide Et Impera P2': '5570' // tankbuster, probably cleaves, phase 2

  },
  triggers: [{
    id: 'Emerald Weapon Emerald Crusher Knocked Off',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '553E'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }, {
    // Getting knocked into a wall from the arrow headmarker.
    id: 'Emerald Weapon Primus Terminus Est Wall',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: ['5563', '5564']
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Pushed into wall',
          de: 'Rückstoß in die Wand',
          ja: '壁へノックバック',
          cn: '击退至墙',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const emerald_weapon = (emerald_weapon_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/hades-ex.ts



// Hades Ex
const hades_ex_triggerSet = {
  zoneId: zone_id/* default.TheMinstrelsBalladHadessElegy */.Z.TheMinstrelsBalladHadessElegy,
  damageWarn: {
    'HadesEx Shadow Spread 2': '47AA',
    'HadesEx Shadow Spread 3': '47E4',
    'HadesEx Shadow Spread 4': '47E5',
    // Everybody stacks in good faith for Bad Faith, so don't call it a mistake.
    // 'HadesEx Bad Faith 1': '47AD',
    // 'HadesEx Bad Faith 2': '47B0',
    // 'HadesEx Bad Faith 3': '47AE',
    // 'HadesEx Bad Faith 4': '47AF',
    'HadesEx Broken Faith': '47B2',
    'HadesEx Magic Spear': '47B6',
    'HadesEx Magic Chakram': '47B5',
    'HadesEx Forked Lightning': '47C9',
    'HadesEx Dark Current 1': '47F1',
    'HadesEx Dark Current 2': '47F2'
  },
  damageFail: {
    'HadesEx Comet': '47B9',
    // missed tower
    'HadesEx Ancient Eruption': '47D3',
    'HadesEx Purgation 1': '47EC',
    'HadesEx Purgation 2': '47ED',
    'HadesEx Shadow Stream': '47EA',
    'HadesEx Dead Space': '47EE'
  },
  shareWarn: {
    'HadesEx Shadow Spread Initial': '47A9',
    'HadesEx Ravenous Assault': '(?:47A6|47A7)',
    'HadesEx Dark Flame 1': '47C6',
    'HadesEx Dark Freeze 1': '47C4',
    'HadesEx Dark Freeze 2': '47DF'
  },
  triggers: [{
    id: 'HadesEx Dark II Tether',
    type: 'Tether',
    netRegex: netregexes/* default.tether */.Z.tether({
      source: 'Shadow of the Ancients',
      id: '0011'
    }),
    run: (data, matches) => {
      var _data$hasDark;

      (_data$hasDark = data.hasDark) !== null && _data$hasDark !== void 0 ? _data$hasDark : data.hasDark = [];
      data.hasDark.push(matches.target);
    }
  }, {
    id: 'HadesEx Dark II',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      type: '22',
      id: '47BA',
      ...oopsy_common/* playerDamageFields */.np
    }),
    // Don't blame people who don't have tethers.
    condition: (data, matches) => data.hasDark && data.hasDark.includes(matches.target),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'HadesEx Boss Tether',
    type: 'Tether',
    netRegex: netregexes/* default.tether */.Z.tether({
      source: ['Igeyorhm\'s Shade', 'Lahabrea\'s Shade'],
      id: '000E',
      capture: false
    }),
    mistake: {
      type: 'warn',
      text: {
        en: 'Bosses Too Close',
        de: 'Bosses zu Nahe',
        fr: 'Boss trop proches',
        ja: 'ボス近すぎる',
        cn: 'BOSS靠太近了',
        ko: '쫄들이 너무 가까움'
      }
    }
  }, {
    id: 'HadesEx Death Shriek',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '47CB',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'HadesEx Beyond Death Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '566'
    }),
    run: (data, matches) => {
      var _data$hasBeyondDeath;

      (_data$hasBeyondDeath = data.hasBeyondDeath) !== null && _data$hasBeyondDeath !== void 0 ? _data$hasBeyondDeath : data.hasBeyondDeath = {};
      data.hasBeyondDeath[matches.target] = true;
    }
  }, {
    id: 'HadesEx Beyond Death Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '566'
    }),
    run: (data, matches) => {
      var _data$hasBeyondDeath2;

      (_data$hasBeyondDeath2 = data.hasBeyondDeath) !== null && _data$hasBeyondDeath2 !== void 0 ? _data$hasBeyondDeath2 : data.hasBeyondDeath = {};
      data.hasBeyondDeath[matches.target] = false;
    }
  }, {
    id: 'HadesEx Beyond Death',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '566'
    }),
    delaySeconds: (_data, matches) => parseFloat(matches.duration) - 0.5,
    deathReason: (data, matches) => {
      if (!data.hasBeyondDeath) return;
      if (!data.hasBeyondDeath[matches.target]) return;
      return {
        name: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'HadesEx Doom Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '6E9'
    }),
    run: (data, matches) => {
      var _data$hasDoom;

      (_data$hasDoom = data.hasDoom) !== null && _data$hasDoom !== void 0 ? _data$hasDoom : data.hasDoom = {};
      data.hasDoom[matches.target] = true;
    }
  }, {
    id: 'HadesEx Doom Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '6E9'
    }),
    run: (data, matches) => {
      var _data$hasDoom2;

      (_data$hasDoom2 = data.hasDoom) !== null && _data$hasDoom2 !== void 0 ? _data$hasDoom2 : data.hasDoom = {};
      data.hasDoom[matches.target] = false;
    }
  }, {
    id: 'HadesEx Doom',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '6E9'
    }),
    delaySeconds: (_data, matches) => parseFloat(matches.duration) - 0.5,
    deathReason: (data, matches) => {
      if (!data.hasDoom) return;
      if (!data.hasDoom[matches.target]) return;
      return {
        name: matches.target,
        text: matches.effect
      };
    }
  }]
};
/* harmony default export */ const hades_ex = (hades_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/hades.ts

// Hades Normal
const hades_triggerSet = {
  zoneId: zone_id/* default.TheDyingGasp */.Z.TheDyingGasp,
  damageWarn: {
    'Hades Bad Faith 1': '414B',
    'Hades Bad Faith 2': '414C',
    'Hades Dark Eruption': '4152',
    'Hades Shadow Spread 1': '4156',
    'Hades Shadow Spread 2': '4157',
    'Hades Broken Faith': '414E',
    'Hades Hellborn Yawp': '416F',
    'Hades Purgation': '4172',
    'Hades Shadow Stream': '415C',
    'Hades Aero': '4595',
    'Hades Echo 1': '4163',
    'Hades Echo 2': '4164'
  },
  shareFail: {
    'Hades Nether Blast': '4163',
    'Hades Ravenous Assault': '4158',
    'Hades Ancient Darkness': '4593',
    'Hades Dual Strike': '4162'
  }
};
/* harmony default export */ const hades = (hades_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/innocence-ex.ts

// Innocence Extreme
const innocence_ex_triggerSet = {
  zoneId: zone_id/* default.TheCrownOfTheImmaculateExtreme */.Z.TheCrownOfTheImmaculateExtreme,
  damageWarn: {
    'InnoEx Duel Descent': '3ED2',
    'InnoEx Reprobation 1': '3EE0',
    'InnoEx Reprobation 2': '3ECC',
    'InnoEx Sword of Condemnation 1': '3EDE',
    'InnoEx Sword of Condemnation 2': '3EDF',
    'InnoEx Dream of the Rood 1': '3ED3',
    'InnoEx Dream of the Rood 2': '3ED4',
    'InnoEx Dream of the Rood 3': '3ED5',
    'InnoEx Dream of the Rood 4': '3ED6',
    'InnoEx Dream of the Rood 5': '3EFB',
    'InnoEx Dream of the Rood 6': '3EFC',
    'InnoEx Dream of the Rood 7': '3EFD',
    'InnoEx Dream of the Rood 8': '3EFE',
    'InnoEx Holy Trinity': '3EDB',
    'InnoEx Soul and Body 1': '3ED7',
    'InnoEx Soul and Body 2': '3ED8',
    'InnoEx Soul and Body 3': '3ED9',
    'InnoEx Soul and Body 4': '3EDA',
    'InnoEx Soul and Body 5': '3EFF',
    'InnoEx Soul and Body 6': '3F00',
    'InnoEx Soul and Body 7': '3F01',
    'InnoEx Soul and Body 8': '3F02',
    'InnoEx God Ray 1': '3EE6',
    'InnoEx God Ray 2': '3EE7',
    'InnoEx God Ray 3': '3EE8',
    'InnoEx Explosion': '3EF0'
  }
};
/* harmony default export */ const innocence_ex = (innocence_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/innocence.ts

// Innocence Normal
const innocence_triggerSet = {
  zoneId: zone_id/* default.TheCrownOfTheImmaculate */.Z.TheCrownOfTheImmaculate,
  damageWarn: {
    'Inno Daybreak': '3E9D',
    'Inno Holy Trinity': '3EB3',
    'Inno Reprobation 1': '3EB6',
    'Inno Reprobation 2': '3EB8',
    'Inno Reprobation 3': '3ECB',
    'Inno Reprobation 4': '3EB7',
    'Inno Soul and Body 1': '3EB1',
    'Inno Soul and Body 2': '3EB2',
    'Inno Soul and Body 3': '3EF9',
    'Inno Soul and Body 4': '3EFA',
    'Inno God Ray 1': '3EBD',
    'Inno God Ray 2': '3EBE',
    'Inno God Ray 3': '3EBF',
    'Inno God Ray 4': '3EC0'
  }
};
/* harmony default export */ const innocence = (innocence_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/levi-un.ts


// It's hard to capture the reflection abilities from Leviathan's Head and Tail if you use
// ranged physical attacks / magic attacks respectively, as the ability names are the
// ability you used and don't appear to show up in the log as normal "ability" lines.
// That said, dots still tick independently on both so it's likely that people will atack
// them anyway.
// TODO: Figure out why Dread Tide / Waterspout appear like shares (i.e. 0x16 id).
// Dread Tide = 5CCA/5CCB/5CCC, Waterspout = 5CD1
// Leviathan Unreal
const levi_un_triggerSet = {
  zoneId: zone_id/* default.TheWhorleaterUnreal */.Z.TheWhorleaterUnreal,
  damageWarn: {
    'LeviUn Grand Fall': '5CDF',
    // very large circular aoe before spinny dives, applies heavy
    'LeviUn Hydroshot': '5CD5',
    // Wavespine Sahagin aoe that gives Dropsy effect
    'LeviUn Dreadstorm': '5CD6' // Wavetooth Sahagin aoe that gives Hysteria effect

  },
  damageFail: {
    'LeviUn Body Slam': '5CD2',
    // levi slam that tilts the boat
    'LeviUn Spinning Dive 1': '5CDB',
    // levi dash across the boat with knockback
    'LeviUn Spinning Dive 2': '5CE3',
    // levi dash across the boat with knockback
    'LeviUn Spinning Dive 3': '5CE8',
    // levi dash across the boat with knockback
    'LeviUn Spinning Dive 4': '5CE9' // levi dash across the boat with knockback

  },
  gainsEffectWarn: {
    'LeviUn Dropsy': '110' // standing in the hydro shot from the Wavespine Sahagin

  },
  gainsEffectFail: {
    'LeviUn Hysteria': '128' // standing in the dreadstorm from the Wavetooth Sahagin

  },
  triggers: [{
    id: 'LeviUn Body Slam Knocked Off',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '5CD2'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const levi_un = (levi_un_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/ruby_weapon-ex.ts


// TODO: taking two different High-Powered Homing Lasers (4AD8)
// TODO: could blame the tethered player for White Agony / White Fury failures?
// Ruby Weapon Extreme
const ruby_weapon_ex_triggerSet = {
  zoneId: zone_id/* default.CinderDriftExtreme */.Z.CinderDriftExtreme,
  damageWarn: {
    'RubyEx Ruby Bit Magitek Ray': '4AD2',
    // line aoes during helicoclaw
    'RubyEx Spike Of Flame 1': '4AD3',
    // initial explosion during helicoclaw
    'RubyEx Spike Of Flame 2': '4B2F',
    // followup helicoclaw explosions
    'RubyEx Spike Of Flame 3': '4D04',
    // ravensclaw explosion at ends of lines
    'RubyEx Spike Of Flame 4': '4D05',
    // ravensclaw explosion at ends of lines
    'RubyEx Spike Of Flame 5': '4ACD',
    // ravensclaw explosion at ends of lines
    'RubyEx Spike Of Flame 6': '4ACE',
    // ravensclaw explosion at ends of lines
    'RubyEx Undermine': '4AD0',
    // ground aoes under the ravensclaw patches
    'RubyEx Ruby Ray': '4B02',
    // frontal laser
    'RubyEx Ravensflight 1': '4AD9',
    // dash around the arena
    'RubyEx Ravensflight 2': '4ADA',
    // dash around the arena
    'RubyEx Ravensflight 3': '4ADD',
    // dash around the arena
    'RubyEx Ravensflight 4': '4ADE',
    // dash around the arena
    'RubyEx Ravensflight 5': '4ADF',
    // dash around the arena
    'RubyEx Ravensflight 6': '4AE0',
    // dash around the arena
    'RubyEx Ravensflight 7': '4AE1',
    // dash around the arena
    'RubyEx Ravensflight 8': '4AE2',
    // dash around the arena
    'RubyEx Ravensflight 9': '4AE3',
    // dash around the arena
    'RubyEx Ravensflight 10': '4AE4',
    // dash around the arena
    'RubyEx Ravensflight 11': '4AE5',
    // dash around the arena
    'RubyEx Ravensflight 12': '4AE6',
    // dash around the arena
    'RubyEx Ravensflight 13': '4AE7',
    // dash around the arena
    'RubyEx Ravensflight 14': '4AE8',
    // dash around the arena
    'RubyEx Ravensflight 15': '4AE9',
    // dash around the arena
    'RubyEx Ravensflight 16': '4AEA',
    // dash around the arena
    'RubyEx Ravensflight 17': '4E6B',
    // dash around the arena
    'RubyEx Ravensflight 18': '4E6C',
    // dash around the arena
    'RubyEx Ravensflight 19': '4E6D',
    // dash around the arena
    'RubyEx Ravensflight 20': '4E6E',
    // dash around the arena
    'RubyEx Ravensflight 21': '4E6F',
    // dash around the arena
    'RubyEx Ravensflight 22': '4E70',
    // dash around the arena
    'RubyEx Cut And Run 1': '4B05',
    // slow charge across arena after stacks
    'RubyEx Cut And Run 2': '4B06',
    // slow charge across arena after stacks
    'RubyEx Cut And Run 3': '4B07',
    // slow charge across arena after stacks
    'RubyEx Cut And Run 4': '4B08',
    // slow charge across arena after stacks
    'RubyEx Cut And Run 5': '4DOD',
    // slow charge across arena after stacks
    'RubyEx Meteor Burst': '4AF2',
    // meteor exploding
    'RubyEx Bradamante': '4E38',
    // headmarkers with line aoes
    'RubyEx Comet Heavy Impact': '4AF6' // letting a tank comet land

  },
  damageFail: {
    'RubyEx Ruby Sphere Burst': '4ACB',
    // exploding the red mine
    'RubyEx Lunar Dynamo': '4EB0',
    // "get in" from Raven's Image
    'RubyEx Iron Chariot': '4EB1',
    // "get out" from Raven's Image
    'RubyEx Heart In The Machine': '4AFA' // White Agony/Fury skull hitting players

  },
  gainsEffectFail: {
    'RubyEx Hysteria': '128' // Negative Aura lookaway failure

  },
  shareWarn: {
    'RubyEx Homing Lasers': '4AD6',
    // spread markers during cut and run
    'RubyEx Meteor Stream': '4E68' // spread markers during P2

  },
  triggers: [{
    id: 'RubyEx Screech',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '4AEE'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked into wall',
          de: 'Rückstoß in die Wand',
          ja: '壁へノックバック',
          cn: '击退至墙',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const ruby_weapon_ex = (ruby_weapon_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/ruby_weapon.ts

// Ruby Normal
const ruby_weapon_triggerSet = {
  zoneId: zone_id/* default.CinderDrift */.Z.CinderDrift,
  damageWarn: {
    'Ruby Ravensclaw': '4A93',
    // centered circle aoe for ravensclaw
    'Ruby Spike Of Flame 1': '4A9A',
    // initial explosion during helicoclaw
    'Ruby Spike Of Flame 2': '4B2E',
    // followup helicoclaw explosions
    'Ruby Spike Of Flame 3': '4A94',
    // ravensclaw explosion at ends of lines
    'Ruby Spike Of Flame 4': '4A95',
    // ravensclaw explosion at ends of lines
    'Ruby Spike Of Flame 5': '4D02',
    // ravensclaw explosion at ends of lines
    'Ruby Spike Of Flame 6': '4D03',
    // ravensclaw explosion at ends of lines
    'Ruby Ruby Ray': '4AC6',
    // frontal laser
    'Ruby Undermine': '4A97',
    // ground aoes under the ravensclaw patches
    'Ruby Ravensflight 1': '4E69',
    // dash around the arena
    'Ruby Ravensflight 2': '4E6A',
    // dash around the arena
    'Ruby Ravensflight 3': '4AA1',
    // dash around the arena
    'Ruby Ravensflight 4': '4AA2',
    // dash around the arena
    'Ruby Ravensflight 5': '4AA3',
    // dash around the arena
    'Ruby Ravensflight 6': '4AA4',
    // dash around the arena
    'Ruby Ravensflight 7': '4AA5',
    // dash around the arena
    'Ruby Ravensflight 8': '4AA6',
    // dash around the arena
    'Ruby Ravensflight 9': '4AA7',
    // dash around the arena
    'Ruby Ravensflight 10': '4C21',
    // dash around the arena
    'Ruby Ravensflight 11': '4C2A',
    // dash around the arena
    'Ruby Comet Burst': '4AB4',
    // meteor exploding
    'Ruby Bradamante': '4ABC' // headmarkers with line aoes

  },
  shareWarn: {
    'Ruby Homing Laser': '4AC5',
    // spread markers in P1
    'Ruby Meteor Stream': '4E67' // spread markers in P2

  }
};
/* harmony default export */ const ruby_weapon = (ruby_weapon_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/shiva-un.ts


// Shiva Unreal
const shiva_un_triggerSet = {
  zoneId: zone_id/* default.TheAkhAfahAmphitheatreUnreal */.Z.TheAkhAfahAmphitheatreUnreal,
  damageWarn: {
    // Large white circles.
    'ShivaEx Icicle Impact': '537B',
    // "get in" aoe
    'ShivaEx Whiteout': '5376',
    // Avoidable tank stun.
    'ShivaEx Glacier Bash': '5375'
  },
  damageFail: {
    // 270 degree attack.
    'ShivaEx Glass Dance': '5378'
  },
  shareWarn: {
    // Hailstorm spread marker.
    'ShivaEx Hailstorm': '536F'
  },
  shareFail: {
    // Laser.  TODO: maybe blame the person it's on??
    'ShivaEx Avalanche': '5379'
  },
  soloWarn: {
    // Party shared tank buster.
    'ShivaEx Icebrand': '5373'
  },
  triggers: [{
    id: 'ShivaEx Deep Freeze',
    type: 'GainsEffect',
    // Shiva also uses ability 537A on you, but it has an unknown name.
    // So, use the effect instead for free translation.
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '1E7'
    }),
    condition: (_data, matches) => {
      // The intermission also gets this effect, but for a shorter duration.
      return parseFloat(matches.duration) > 20;
    },
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.effect
      };
    }
  }]
};
/* harmony default export */ const shiva_un = (shiva_un_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/titania.ts

const titania_triggerSet = {
  zoneId: zone_id/* default.TheDancingPlague */.Z.TheDancingPlague,
  damageWarn: {
    'Titania Wood\'s Embrace': '3D50',
    // 'Titania Frost Rune': '3D4E',
    'Titania Gentle Breeze': '3F83',
    'Titania Leafstorm 1': '3D55',
    'Titania Puck\'s Rebuke': '3D58',
    'Titania Leafstorm 2': '3E03'
  },
  damageFail: {
    'Titania Phantom Rune 1': '3D5D',
    'Titania Phantom Rune 2': '3D5E'
  },
  shareFail: {
    'Titania Divination Rune': '3D5B'
  }
};
/* harmony default export */ const titania = (titania_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/titania-ex.ts

const titania_ex_triggerSet = {
  zoneId: zone_id/* default.TheDancingPlagueExtreme */.Z.TheDancingPlagueExtreme,
  damageWarn: {
    'TitaniaEx Wood\'s Embrace': '3D2F',
    // 'TitaniaEx Frost Rune': '3D2B',
    'TitaniaEx Gentle Breeze': '3F82',
    'TitaniaEx Leafstorm 1': '3D39',
    'TitaniaEx Puck\'s Rebuke': '3D43',
    'TitaniaEx Wallop': '3D3B',
    'TitaniaEx Leafstorm 2': '3D49'
  },
  damageFail: {
    'TitaniaEx Phantom Rune 1': '3D4C',
    'TitaniaEx Phantom Rune 2': '3D4D'
  },
  shareFail: {
    // TODO: This could maybe blame the person with the tether?
    'TitaniaEx Thunder Rune': '3D29',
    'TitaniaEx Divination Rune': '3D4A'
  }
};
/* harmony default export */ const titania_ex = (titania_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/titan-un.ts

// Titan Unreal
const titan_un_triggerSet = {
  zoneId: zone_id/* default.TheNavelUnreal */.Z.TheNavelUnreal,
  damageWarn: {
    'TitanUn Weight Of The Land': '58FE',
    'TitanUn Burst': '5ADF'
  },
  damageFail: {
    'TitanUn Landslide': '5ADC',
    'TitanUn Gaoler Landslide': '5902'
  },
  shareWarn: {
    'TitanUn Rock Buster': '58F6'
  },
  shareFail: {
    'TitanUn Mountain Buster': '58F7'
  }
};
/* harmony default export */ const titan_un = (titan_un_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/varis-ex.ts



const varis_ex_triggerSet = {
  zoneId: zone_id/* default.MemoriaMiseraExtreme */.Z.MemoriaMiseraExtreme,
  damageWarn: {
    'VarisEx Alea Iacta Est 1': '4CD2',
    'VarisEx Alea Iacta Est 2': '4CD3',
    'VarisEx Alea Iacta Est 3': '4CD4',
    'VarisEx Alea Iacta Est 4': '4CD5',
    'VarisEx Alea Iacta Est 5': '4CD6',
    'VarisEx Ignis Est 1': '4CB5',
    'VarisEx Ignis Est 2': '4CC5',
    'VarisEx Ventus Est 1': '4CC7',
    'VarisEx Ventus Est 2': '4CC8',
    'VarisEx Assault Cannon': '4CE5',
    'VarisEx Fortius Rotating': '4CE9'
  },
  damageFail: {
    // Don't hit the shields!
    'VarisEx Repay': '4CDD'
  },
  shareWarn: {
    // This is the "protean" fortius.
    'VarisEx Fortius Protean': '4CE7'
  },
  shareFail: {
    'VarisEx Magitek Burst': '4CDF',
    'VarisEx Aetherochemical Grenado': '4CED'
  },
  triggers: [{
    id: 'VarisEx Terminus Est',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4CB4',
      ...oopsy_common/* playerDamageFields */.np
    }),
    suppressSeconds: 1,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const varis_ex = (varis_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/wol.ts


// TODO: Radiant Braver is 4F16/4F17(x2), shouldn't get hit by both?
// TODO: Radiant Desperado is 4F18/4F19, shouldn't get hit by both?
// TODO: Radiant Meteor is 4F1A, and shouldn't get hit by more than 1?
// TODO: missing a tower?
// Note: Deliberately not including pyretic damage as an error.
// Note: It doesn't appear that there's any way to tell who failed the cutscene.
const wol_triggerSet = {
  zoneId: zone_id/* default.TheSeatOfSacrifice */.Z.TheSeatOfSacrifice,
  damageWarn: {
    'WOL Solemn Confiteor': '4F2A',
    // ground puddles
    'WOL Coruscant Saber In': '4F10',
    // saber in
    'WOL Coruscant Saber Out': '4F11',
    // saber out
    'WOL Imbued Corusance Out': '4F4B',
    // saber out
    'WOL Imbued Corusance In': '4F4C',
    // saber in
    'WOL Shining Wave': '4F26',
    // sword triangle
    'WOL Cauterize': '4F25',
    'WOL Brimstone Earth 1': '4F1E',
    // corner growing circles, initial
    'WOL Brimstone Earth 2': '4F1F',
    // corner growing circles, growing
    'WOL Flare Breath': '4F24',
    'WOL Decimation': '4F23'
  },
  gainsEffectWarn: {
    'WOL Deep Freeze': '4E6'
  },
  triggers: [{
    id: 'WOL True Walking Dead',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '38E'
    }),
    delaySeconds: (_data, matches) => parseFloat(matches.duration) - 0.5,
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: matches.effect
      };
    }
  }]
};
/* harmony default export */ const wol = (wol_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/wol-ex.ts


// TODO: Radiant Braver is 4EF7/4EF8(x2), shouldn't get hit by both?
// TODO: Radiant Desperado is 4EF9/4EFA, shouldn't get hit by both?
// TODO: Radiant Meteor is 4EFC, and shouldn't get hit by more than 1?
// TODO: Absolute Holy should be shared?
// TODO: intersecting brimstones?
const wol_ex_triggerSet = {
  zoneId: zone_id/* default.TheSeatOfSacrificeExtreme */.Z.TheSeatOfSacrificeExtreme,
  damageWarn: {
    'WOLEx Solemn Confiteor': '4F0C',
    // ground puddles
    'WOLEx Coruscant Saber In': '4EF2',
    // saber in
    'WOLEx Coruscant Saber Out': '4EF1',
    // saber out
    'WOLEx Imbued Corusance Out': '4F49',
    // saber out
    'WOLEx Imbued Corusance In': '4F4A',
    // saber in
    'WOLEx Shining Wave': '4F08',
    // sword triangle
    'WOLEx Cauterize': '4F07',
    'WOLEx Brimstone Earth': '4F00' // corner growing circles, growing

  },
  gainsEffectWarn: {
    'WOLEx Deep Freeze': '4E6',
    // failing Absolute Blizzard III
    'WOLEx Damage Down': '274' // failing Absolute Flash

  },
  shareWarn: {
    'WOLEx Absolute Stone III': '4EEB',
    // protean wave imbued magic
    'WOLEx Flare Breath': '4F06',
    // tether from summoned bahamuts
    'WOLEx Perfect Decimation': '4F05' // smn/war phase marker

  },
  soloWarn: {
    'WolEx Katon San Share': '4EFE'
  },
  triggers: [{
    id: 'WOLEx True Walking Dead',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '8FF'
    }),
    delaySeconds: (_data, matches) => parseFloat(matches.duration) - 0.5,
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'WOLEx Tower',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '4F04',
      capture: false
    }),
    mistake: {
      type: 'fail',
      text: {
        en: 'Missed Tower',
        de: 'Turm verpasst',
        fr: 'Tour manquée',
        ja: '塔を踏まなかった',
        cn: '没踩塔',
        ko: '장판 실수'
      }
    }
  }, {
    id: 'WOLEx True Hallowed Ground',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '4F44'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        text: matches.ability
      };
    }
  }, {
    // For Berserk and Deep Darkside
    id: 'WOLEx Missed Interrupt',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: ['5156', '5158']
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const wol_ex = (wol_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/ultimate/the_epic_of_alexander.ts



// TODO: FIX luminous aetheroplasm warning not working
// TODO: FIX doll death not working
// TODO: failing hand of pain/parting (check for high damage?)
// TODO: make sure everybody takes exactly one protean (rather than watching double hits)
// TODO: thunder not hitting exactly 2?
// TODO: person with water/thunder debuff dying
// TODO: bad nisi pass
// TODO: failed gavel mechanic
// TODO: double rocket punch not hitting exactly 2? (or tanks)
// TODO: standing in sludge puddles before hidden mine?
// TODO: hidden mine failure?
// TODO: failures of ordained motion / stillness
// TODO: failures of plaint of severity (tethers)
// TODO: failures of plaint of solidarity (shared sentence)
// TODO: ordained capital punishment hitting non-tanks
const the_epic_of_alexander_triggerSet = {
  zoneId: zone_id/* default.TheEpicOfAlexanderUltimate */.Z.TheEpicOfAlexanderUltimate,
  damageWarn: {
    'TEA Sluice': '49B1',
    'TEA Protean Wave 1': '4824',
    'TEA Protean Wave 2': '49B5',
    'TEA Spin Crusher': '4A72',
    'TEA Sacrament': '485F',
    'TEA Radiant Sacrament': '4886',
    'TEA Almighty Judgment': '4890'
  },
  damageFail: {
    'TEA Hawk Blaster': '4830',
    'TEA Chakram': '4855',
    'TEA Enumeration': '4850',
    'TEA Apocalyptic Ray': '484C',
    'TEA Propeller Wind': '4832'
  },
  shareWarn: {
    'TEA Protean Wave Double 1': '49B6',
    'TEA Protean Wave Double 2': '4825',
    'TEA Fluid Swing': '49B0',
    'TEA Fluid Strike': '49B7',
    'TEA Hidden Mine': '4852',
    'TEA Alpha Sword': '486B',
    'TEA Flarethrower': '486B',
    'TEA Chastening Heat': '4A80',
    'TEA Divine Spear': '4A82',
    'TEA Ordained Punishment': '4891',
    // Optical Spread
    'TEA Individual Reprobation': '488C'
  },
  soloFail: {
    // Optical Stack
    'TEA Collective Reprobation': '488D'
  },
  triggers: [{
    // "too much luminous aetheroplasm"
    // When this happens, the target explodes, hitting nearby people
    // but also themselves.
    id: 'TEA Exhaust',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '481F',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (_data, matches) => matches.target === matches.source,
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: {
          en: 'luminous aetheroplasm',
          de: 'Luminiszentes Ätheroplasma',
          fr: 'Éthéroplasma lumineux',
          ja: '光性爆雷',
          cn: '光性爆雷'
        }
      };
    }
  }, {
    id: 'TEA Dropsy',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '121'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'TEA Tether Tracking',
    type: 'Tether',
    netRegex: netregexes/* default.tether */.Z.tether({
      source: 'Jagd Doll',
      id: '0011'
    }),
    run: (data, matches) => {
      var _data$jagdTether;

      (_data$jagdTether = data.jagdTether) !== null && _data$jagdTether !== void 0 ? _data$jagdTether : data.jagdTether = {};
      data.jagdTether[matches.sourceId] = matches.target;
    }
  }, {
    id: 'TEA Reducible Complexity',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4821',
      ...oopsy_common/* playerDamageFields */.np
    }),
    mistake: (data, matches) => {
      return {
        type: 'fail',
        // This may be undefined, which is fine.
        name: data.jagdTether ? data.jagdTether[matches.sourceId] : undefined,
        text: {
          en: 'Doll Death',
          de: 'Puppe Tot',
          fr: 'Poupée morte',
          ja: 'ドールが死んだ',
          cn: '浮士德死亡'
        }
      };
    }
  }, {
    id: 'TEA Drainage',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4827',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => !data.party.isTank(matches.target),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'TEA Throttle Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '2BC'
    }),
    run: (data, matches) => {
      var _data$hasThrottle;

      (_data$hasThrottle = data.hasThrottle) !== null && _data$hasThrottle !== void 0 ? _data$hasThrottle : data.hasThrottle = {};
      data.hasThrottle[matches.target] = true;
    }
  }, {
    id: 'TEA Throttle Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '2BC'
    }),
    run: (data, matches) => {
      var _data$hasThrottle2;

      (_data$hasThrottle2 = data.hasThrottle) !== null && _data$hasThrottle2 !== void 0 ? _data$hasThrottle2 : data.hasThrottle = {};
      data.hasThrottle[matches.target] = false;
    }
  }, {
    id: 'TEA Throttle',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '2BC'
    }),
    delaySeconds: (_data, matches) => parseFloat(matches.duration) - 0.5,
    deathReason: (data, matches) => {
      if (!data.hasThrottle) return;
      if (!data.hasThrottle[matches.target]) return;
      return {
        name: matches.target,
        text: matches.effect
      };
    }
  }, {
    // Balloon Popping.  It seems like the person who pops it is the
    // first person listed damage-wise, so they are likely the culprit.
    id: 'TEA Outburst',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '482A',
      ...oopsy_common/* playerDamageFields */.np
    }),
    suppressSeconds: 5,
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.source
      };
    }
  }]
};
/* harmony default export */ const the_epic_of_alexander = (the_epic_of_alexander_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/oopsy_manifest.txt


















































































































/* harmony default export */ const oopsy_manifest = ({'00-misc/general.ts': general,'00-misc/test.ts': test,'02-arr/trial/ifrit-nm.ts': ifrit_nm,'02-arr/trial/titan-nm.ts': titan_nm,'02-arr/trial/levi-ex.ts': levi_ex,'02-arr/trial/shiva-hm.ts': shiva_hm,'02-arr/trial/shiva-ex.ts': shiva_ex,'02-arr/trial/titan-hm.ts': titan_hm,'02-arr/trial/titan-ex.ts': titan_ex,'03-hw/alliance/weeping_city.ts': weeping_city,'03-hw/dungeon/aetherochemical_research_facility.ts': aetherochemical_research_facility,'03-hw/dungeon/fractal_continuum.ts': fractal_continuum,'03-hw/dungeon/gubal_library_hard.ts': gubal_library_hard,'03-hw/dungeon/sohm_al_hard.ts': sohm_al_hard,'03-hw/raid/a6n.ts': a6n,'03-hw/raid/a12n.ts': a12n,'04-sb/dungeon/ala_mhigo.ts': ala_mhigo,'04-sb/dungeon/bardams_mettle.ts': bardams_mettle,'04-sb/dungeon/drowned_city_of_skalla.ts': drowned_city_of_skalla,'04-sb/dungeon/kugane_castle.ts': kugane_castle,'04-sb/dungeon/sirensong_sea.ts': sirensong_sea,'04-sb/dungeon/st_mocianne_hard.ts': st_mocianne_hard,'04-sb/dungeon/swallows_compass.ts': swallows_compass,'04-sb/dungeon/temple_of_the_fist.ts': temple_of_the_fist,'04-sb/dungeon/the_burn.ts': the_burn,'04-sb/raid/o1n.ts': o1n,'04-sb/raid/o1s.ts': o1s,'04-sb/raid/o2n.ts': o2n,'04-sb/raid/o2s.ts': o2s,'04-sb/raid/o3n.ts': o3n,'04-sb/raid/o3s.ts': o3s,'04-sb/raid/o4n.ts': o4n,'04-sb/raid/o4s.ts': o4s,'04-sb/raid/o5n.ts': o5n,'04-sb/raid/o5s.ts': o5s,'04-sb/raid/o6n.ts': o6n,'04-sb/raid/o6s.ts': o6s,'04-sb/raid/o7n.ts': o7n,'04-sb/raid/o7s.ts': o7s,'04-sb/raid/o8n.ts': o8n,'04-sb/raid/o8s.ts': o8s,'04-sb/raid/o9n.ts': o9n,'04-sb/raid/o10n.ts': o10n,'04-sb/raid/o11n.ts': o11n,'04-sb/raid/o12n.ts': o12n,'04-sb/raid/o12s.ts': o12s,'04-sb/trial/byakko-ex.ts': byakko_ex,'04-sb/trial/shinryu.ts': shinryu,'04-sb/trial/susano-ex.ts': susano_ex,'04-sb/trial/suzaku.ts': suzaku,'04-sb/ultimate/ultima_weapon_ultimate.ts': ultima_weapon_ultimate,'04-sb/ultimate/unending_coil_ultimate.ts': unending_coil_ultimate,'05-shb/alliance/the_copied_factory.ts': the_copied_factory,'05-shb/alliance/the_puppets_bunker.ts': the_puppets_bunker,'05-shb/alliance/the_tower_at_paradigms_breach.ts': the_tower_at_paradigms_breach,'05-shb/dungeon/akadaemia_anyder.ts': akadaemia_anyder,'05-shb/dungeon/amaurot.ts': amaurot,'05-shb/dungeon/anamnesis_anyder.ts': anamnesis_anyder,'05-shb/dungeon/dohn_mheg.ts': dohn_mheg,'05-shb/dungeon/heroes_gauntlet.ts': heroes_gauntlet,'05-shb/dungeon/holminster_switch.ts': holminster_switch,'05-shb/dungeon/malikahs_well.ts': malikahs_well,'05-shb/dungeon/matoyas_relict.ts': matoyas_relict,'05-shb/dungeon/mt_gulg.ts': mt_gulg,'05-shb/dungeon/paglthan.ts': paglthan,'05-shb/dungeon/qitana_ravel.ts': qitana_ravel,'05-shb/dungeon/the_grand_cosmos.ts': the_grand_cosmos,'05-shb/dungeon/twinning.ts': twinning,'05-shb/eureka/delubrum_reginae.ts': delubrum_reginae,'05-shb/eureka/delubrum_reginae_savage.ts': delubrum_reginae_savage,'05-shb/raid/e1n.ts': e1n,'05-shb/raid/e1s.ts': e1s,'05-shb/raid/e2n.ts': e2n,'05-shb/raid/e2s.ts': e2s,'05-shb/raid/e3n.ts': e3n,'05-shb/raid/e3s.ts': e3s,'05-shb/raid/e4n.ts': e4n,'05-shb/raid/e4s.ts': e4s,'05-shb/raid/e5n.ts': e5n,'05-shb/raid/e5s.ts': e5s,'05-shb/raid/e6n.ts': e6n,'05-shb/raid/e6s.ts': e6s,'05-shb/raid/e7n.ts': e7n,'05-shb/raid/e7s.ts': e7s,'05-shb/raid/e8n.ts': e8n,'05-shb/raid/e8s.ts': e8s,'05-shb/raid/e9n.ts': e9n,'05-shb/raid/e9s.ts': e9s,'05-shb/raid/e10n.ts': e10n,'05-shb/raid/e10s.ts': e10s,'05-shb/raid/e11n.ts': e11n,'05-shb/raid/e11s.ts': e11s,'05-shb/raid/e12n.ts': e12n,'05-shb/raid/e12s.ts': e12s,'05-shb/trial/diamond_weapon-ex.ts': diamond_weapon_ex,'05-shb/trial/diamond_weapon.ts': diamond_weapon,'05-shb/trial/emerald_weapon-ex.ts': emerald_weapon_ex,'05-shb/trial/emerald_weapon.ts': emerald_weapon,'05-shb/trial/hades-ex.ts': hades_ex,'05-shb/trial/hades.ts': hades,'05-shb/trial/innocence-ex.ts': innocence_ex,'05-shb/trial/innocence.ts': innocence,'05-shb/trial/levi-un.ts': levi_un,'05-shb/trial/ruby_weapon-ex.ts': ruby_weapon_ex,'05-shb/trial/ruby_weapon.ts': ruby_weapon,'05-shb/trial/shiva-un.ts': shiva_un,'05-shb/trial/titania.ts': titania,'05-shb/trial/titania-ex.ts': titania_ex,'05-shb/trial/titan-un.ts': titan_un,'05-shb/trial/varis-ex.ts': varis_ex,'05-shb/trial/wol.ts': wol,'05-shb/trial/wol-ex.ts': wol_ex,'05-shb/ultimate/the_epic_of_alexander.ts': the_epic_of_alexander,});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wMC1taXNjL2dlbmVyYWwudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDAtbWlzYy90ZXN0LnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzAyLWFyci90cmlhbC9pZnJpdC1ubS50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wMi1hcnIvdHJpYWwvdGl0YW4tbm0udHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDItYXJyL3RyaWFsL2xldmktZXgudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDItYXJyL3RyaWFsL3NoaXZhLWhtLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzAyLWFyci90cmlhbC9zaGl2YS1leC50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wMi1hcnIvdHJpYWwvdGl0YW4taG0udHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDItYXJyL3RyaWFsL3RpdGFuLWV4LnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzAzLWh3L2FsbGlhbmNlL3dlZXBpbmdfY2l0eS50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wMy1ody9kdW5nZW9uL2FldGhlcm9jaGVtaWNhbF9yZXNlYXJjaF9mYWNpbGl0eS50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wMy1ody9kdW5nZW9uL2ZyYWN0YWxfY29udGludXVtLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzAzLWh3L2R1bmdlb24vZ3ViYWxfbGlicmFyeV9oYXJkLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzAzLWh3L2R1bmdlb24vc29obV9hbF9oYXJkLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzAzLWh3L3JhaWQvYTZuLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzAzLWh3L3JhaWQvYTEybi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9kdW5nZW9uL2FsYV9taGlnby50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9kdW5nZW9uL2JhcmRhbXNfbWV0dGxlLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA0LXNiL2R1bmdlb24vZHJvd25lZF9jaXR5X29mX3NrYWxsYS50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9kdW5nZW9uL2t1Z2FuZV9jYXN0bGUudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDQtc2IvZHVuZ2Vvbi9zaXJlbnNvbmdfc2VhLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA0LXNiL2R1bmdlb24vc3RfbW9jaWFubmVfaGFyZC50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9kdW5nZW9uL3N3YWxsb3dzX2NvbXBhc3MudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDQtc2IvZHVuZ2Vvbi90ZW1wbGVfb2ZfdGhlX2Zpc3QudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDQtc2IvZHVuZ2Vvbi90aGVfYnVybi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL28xbi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL28xcy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL28ybi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL28ycy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL28zbi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL28zcy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL280bi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL280cy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL281bi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL281cy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL282bi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL282cy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL283bi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL283cy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL284bi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL284cy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL285bi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL28xMG4udHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDQtc2IvcmFpZC9vMTFuLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA0LXNiL3JhaWQvbzEybi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL28xMnMudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDQtc2IvdHJpYWwvYnlha2tvLWV4LnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA0LXNiL3RyaWFsL3NoaW5yeXUudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDQtc2IvdHJpYWwvc3VzYW5vLWV4LnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA0LXNiL3RyaWFsL3N1emFrdS50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi91bHRpbWF0ZS91bHRpbWFfd2VhcG9uX3VsdGltYXRlLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA0LXNiL3VsdGltYXRlL3VuZW5kaW5nX2NvaWxfdWx0aW1hdGUudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL2FsbGlhbmNlL3RoZV9jb3BpZWRfZmFjdG9yeS50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvYWxsaWFuY2UvdGhlX3B1cHBldHNfYnVua2VyLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9hbGxpYW5jZS90aGVfdG93ZXJfYXRfcGFyYWRpZ21zX2JyZWFjaC50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvZHVuZ2Vvbi9ha2FkYWVtaWFfYW55ZGVyLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9kdW5nZW9uL2FtYXVyb3QudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL2R1bmdlb24vYW5hbW5lc2lzX2FueWRlci50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvZHVuZ2Vvbi9kb2huX21oZWcudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL2R1bmdlb24vaGVyb2VzX2dhdW50bGV0LnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9kdW5nZW9uL2hvbG1pbnN0ZXJfc3dpdGNoLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9kdW5nZW9uL21hbGlrYWhzX3dlbGwudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL2R1bmdlb24vbWF0b3lhc19yZWxpY3QudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL2R1bmdlb24vbXRfZ3VsZy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvZHVuZ2Vvbi9wYWdsdGhhbi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvZHVuZ2Vvbi9xaXRhbmFfcmF2ZWwudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL2R1bmdlb24vdGhlX2dyYW5kX2Nvc21vcy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvZHVuZ2Vvbi90d2lubmluZy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvZXVyZWthL2RlbHVicnVtX3JlZ2luYWUudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL2V1cmVrYS9kZWx1YnJ1bV9yZWdpbmFlX3NhdmFnZS50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvcmFpZC9lMW4udHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3JhaWQvZTFzLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9yYWlkL2Uybi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvcmFpZC9lMnMudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3JhaWQvZTNuLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9yYWlkL2Uzcy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvcmFpZC9lNG4udHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3JhaWQvZTRzLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9yYWlkL2U1bi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvcmFpZC9lNXMudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3JhaWQvZTZuLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9yYWlkL2U2cy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvcmFpZC9lN24udHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3JhaWQvZTdzLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9yYWlkL2U4bi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvcmFpZC9lOHMudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3JhaWQvZTluLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9yYWlkL2U5cy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvcmFpZC9lMTBuLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9yYWlkL2UxMHMudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3JhaWQvZTExbi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvcmFpZC9lMTFzLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9yYWlkL2UxMm4udHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3JhaWQvZTEycy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvdHJpYWwvZGlhbW9uZF93ZWFwb24tZXgudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3RyaWFsL2RpYW1vbmRfd2VhcG9uLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi90cmlhbC9lbWVyYWxkX3dlYXBvbi1leC50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvdHJpYWwvZW1lcmFsZF93ZWFwb24udHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3RyaWFsL2hhZGVzLWV4LnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi90cmlhbC9oYWRlcy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvdHJpYWwvaW5ub2NlbmNlLWV4LnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi90cmlhbC9pbm5vY2VuY2UudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3RyaWFsL2xldmktdW4udHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3RyaWFsL3J1Ynlfd2VhcG9uLWV4LnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi90cmlhbC9ydWJ5X3dlYXBvbi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvdHJpYWwvc2hpdmEtdW4udHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3RyaWFsL3RpdGFuaWEudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3RyaWFsL3RpdGFuaWEtZXgudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3RyaWFsL3RpdGFuLXVuLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi90cmlhbC92YXJpcy1leC50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvdHJpYWwvd29sLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi90cmlhbC93b2wtZXgudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3VsdGltYXRlL3RoZV9lcGljX29mX2FsZXhhbmRlci50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS9vb3BzeV9tYW5pZmVzdC50eHQiXSwibmFtZXMiOlsidHJpZ2dlclNldCIsInpvbmVJZCIsIlpvbmVJZCIsInRyaWdnZXJzIiwiaWQiLCJ0eXBlIiwibmV0UmVnZXgiLCJOZXRSZWdleGVzIiwiZWZmZWN0SWQiLCJjb25kaXRpb24iLCJfZGF0YSIsIm1hdGNoZXMiLCJ0YXJnZXQiLCJzb3VyY2UiLCJtaXN0YWtlIiwiZGF0YSIsImxvc3RGb29kIiwiaW5Db21iYXQiLCJibGFtZSIsInRleHQiLCJlbiIsImRlIiwiZnIiLCJqYSIsImNuIiwia28iLCJydW4iLCJJc1BsYXllcklkIiwic291cmNlSWQiLCJsaW5lIiwibmV0UmVnZXhGciIsIm5ldFJlZ2V4SmEiLCJuZXRSZWdleENuIiwibmV0UmVnZXhLbyIsIm1lIiwic3RyaWtpbmdEdW1teUJ5TG9jYWxlIiwic3RyaWtpbmdEdW1teU5hbWVzIiwiT2JqZWN0IiwidmFsdWVzIiwiaW5jbHVkZXMiLCJib290Q291bnQiLCJhYmlsaXR5IiwiRGFtYWdlRnJvbU1hdGNoZXMiLCJlZmZlY3QiLCJzdXBwcmVzc1NlY29uZHMiLCJwb2tlQ291bnQiLCJkZWxheVNlY29uZHMiLCJkYW1hZ2VXYXJuIiwic2hhcmVXYXJuIiwiZGFtYWdlRmFpbCIsImdhaW5zRWZmZWN0V2FybiIsImdhaW5zRWZmZWN0RmFpbCIsImRlYXRoUmVhc29uIiwibmFtZSIsInNoYXJlRmFpbCIsInNlZW5EaWFtb25kRHVzdCIsInNvbG9XYXJuIiwicGFyc2VGbG9hdCIsImR1cmF0aW9uIiwiem9tYmllIiwic2hpZWxkIiwiaGFzSW1wIiwicGxheWVyRGFtYWdlRmllbGRzIiwiYXNzYXVsdCIsInB1c2giLCJhYmlsaXR5V2FybiIsImFyZ3MiLCJhYmlsaXR5SWQiLCJjb25zb2xlIiwiZXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwidHJpZ2dlciIsImZsYWdzIiwic3Vic3RyIiwic29sb0ZhaWwiLCJjYXB0dXJlIiwibmV0UmVnZXhEZSIsInBoYXNlTnVtYmVyIiwiaW5pdGlhbGl6ZWQiLCJnYW1lQ291bnQiLCJ0YXJnZXRJZCIsImlzRGVjaXNpdmVCYXR0bGVFbGVtZW50IiwiaXNOZW9FeGRlYXRoIiwiaGFzQmV5b25kRGVhdGgiLCJkb3VibGVBdHRhY2tNYXRjaGVzIiwiYXJyIiwibGVuZ3RoIiwiaGFzVGhyb3R0bGUiLCJsb2ciLCJoYXNGaXJlUmVzaXN0IiwidnVsbiIsImtGbGFnSW5zdGFudERlYXRoIiwiaGFzRG9vbSIsInNsaWNlIiwiZmF1bHRMaW5lVGFyZ2V0IiwiaGFzT3JiIiwiY2xvdWRNYXJrZXJzIiwibm9PcmIiLCJzdHIiLCJoYXRlZCIsIndyb25nQnVmZiIsIm5vQnVmZiIsImhhc0FzdHJhbCIsImhhc1VtYnJhbCIsImZpcnN0SGVhZG1hcmtlciIsInBhcnNlSW50IiwiZ2V0SGVhZG1hcmtlcklkIiwiZGVjT2Zmc2V0IiwidG9TdHJpbmciLCJ0b1VwcGVyQ2FzZSIsInBhZFN0YXJ0IiwiZmlyc3RMYXNlck1hcmtlciIsImxhc3RMYXNlck1hcmtlciIsImxhc2VyTmFtZVRvTnVtIiwic2N1bHB0dXJlWVBvc2l0aW9ucyIsInkiLCJzY3VscHR1cmVUZXRoZXJOYW1lVG9JZCIsImJsYWRlT2ZGbGFtZUNvdW50IiwibnVtYmVyIiwibmFtZXMiLCJrZXlzIiwid2l0aE51bSIsImZpbHRlciIsIm93bmVycyIsIm1pbmltdW1ZYWxtc0ZvclN0YXR1ZXMiLCJpc1N0YXR1ZVBvc2l0aW9uS25vd24iLCJpc1N0YXR1ZU5vcnRoIiwic2N1bHB0dXJlSWRzIiwib3RoZXJJZCIsInNvdXJjZVkiLCJvdGhlclkiLCJ1bmRlZmluZWQiLCJVbnJlYWNoYWJsZUNvZGUiLCJ5RGlmZiIsIk1hdGgiLCJhYnMiLCJvd25lciIsIm93bmVyTmljayIsIlNob3J0TmFtZSIsInBpbGxhcklkVG9Pd25lciIsInBpbGxhck93bmVyIiwiZmlyZSIsInNtYWxsTGlvbklkVG9Pd25lciIsInNtYWxsTGlvbk93bmVycyIsImhhc1NtYWxsTGlvbiIsImhhc0ZpcmVEZWJ1ZmYiLCJjZW50ZXJZIiwieCIsImRpck9iaiIsIk91dHB1dHMiLCJub3J0aEJpZ0xpb24iLCJzaW5nbGVUYXJnZXQiLCJzb3V0aEJpZ0xpb24iLCJzaGFyZWQiLCJmaXJlRGVidWZmIiwibGFiZWxzIiwibGFuZyIsIm9wdGlvbnMiLCJQYXJzZXJMYW5ndWFnZSIsImpvaW4iLCJoYXNEYXJrIiwiamFnZFRldGhlciIsInBhcnR5IiwiaXNUYW5rIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFRQTtBQUNBLE1BQU1BLFVBQWlDLEdBQUc7QUFDeENDLFFBQU0sRUFBRUMsd0NBRGdDO0FBRXhDQyxVQUFRLEVBQUUsQ0FDUjtBQUNFO0FBQ0FDLE1BQUUsRUFBRTtBQUZOLEdBRFEsRUFLUjtBQUNFQSxNQUFFLEVBQUUsbUJBRE47QUFFRUMsUUFBSSxFQUFFLGFBRlI7QUFHRTtBQUNBQyxZQUFRLEVBQUVDLGlEQUFBLENBQXVCO0FBQUVDLGNBQVEsRUFBRTtBQUFa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NkMsdUJBQU0sdUJBQXVCLEdBQU0sdUJBQXVCLEdBQU0sdUJBQXVCLEdBQU0sdUJBQXVCLEdBQU0sdUJBQXVCLEdBQU0sdUJBQXVCLEdBQU0sdUJBQXVCLEdBQU0sdUJBQXVCLEdBQU0sdUJBQXVCLEdBQU0sdUJBQXVCLEdBQU0sdUJBQXVCLEdBQU0sdUJBQXVCLEdBQU0sdUJBQXVCLEdBQU0sdUJBQXVCLEdBQU0sdUJBQXVCLEdBQU0sdUJBQXVCLEdBQU0sdUJBQXVCLEdBQU0sdUJBQXVCLEdBQU0sd0JBQXdCLElBQU0sd0JBQXdCLElBQU0sd0JBQXdCLElBQU0sd0JBQXdCLElBQU0sd0JBQXdCLElBQU0sd0JBQXdCLElBQU0sc0NBQXNDLGlCQUFNLG1DQUFtQyxjQUFNLHNDQUFzQyxpQkFBTSxtQ0FBbUMsY0FBTSw2QkFBNkIsUUFBTSwwQkFBMEIsS0FBTSxpQ0FBaUMsWUFBTyw4QkFBOEIsU0FBTyw0QkFBNEIsT0FBTyxtQ0FBbUMsY0FBTyxnQ0FBZ0MsV0FBTyw2QkFBNkIsUUFBTyw0QkFBNEIsT0FBTywrQkFBK0IsVUFBTyw2QkFBNkIsUUFBTyw2QkFBNkIsUUFBTyx3QkFBd0IsR0FBTywyQkFBMkIsTUFBTyw2Q0FBNkMscUJBQU8sRUFBRSxFIiwiZmlsZSI6InVpL2NvbW1vbi9vb3BzeXJhaWRzeV9kYXRhLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERhdGEgZXh0ZW5kcyBPb3BzeURhdGEge1xyXG4gIGxvc3RGb29kPzogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG59XHJcblxyXG4vLyBHZW5lcmFsIG1pc3Rha2VzOyB0aGVzZSBhcHBseSBldmVyeXdoZXJlLlxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuTWF0Y2hBbGwsXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgLy8gVHJpZ2dlciBpZCBmb3IgaW50ZXJuYWxseSBnZW5lcmF0ZWQgZWFybHkgcHVsbCB3YXJuaW5nLlxyXG4gICAgICBpZDogJ0dlbmVyYWwgRWFybHkgUHVsbCcsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0dlbmVyYWwgRm9vZCBCdWZmJyxcclxuICAgICAgdHlwZTogJ0xvc2VzRWZmZWN0JyxcclxuICAgICAgLy8gV2VsbCBGZWRcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMubG9zZXNFZmZlY3QoeyBlZmZlY3RJZDogJzQ4JyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICAvLyBQcmV2ZW50IFwiRW9zIGxvc2VzIHRoZSBlZmZlY3Qgb2YgV2VsbCBGZWQgZnJvbSBDcml0bG8gTWNnZWVcIlxyXG4gICAgICAgIHJldHVybiBtYXRjaGVzLnRhcmdldCA9PT0gbWF0Y2hlcy5zb3VyY2U7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1pc3Rha2U6IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5sb3N0Rm9vZCA/Pz0ge307XHJcbiAgICAgICAgLy8gV2VsbCBGZWQgYnVmZiBoYXBwZW5zIHJlcGVhdGVkbHkgd2hlbiBpdCBmYWxscyBvZmYgKFdIWSksXHJcbiAgICAgICAgLy8gc28gc3VwcHJlc3MgbXVsdGlwbGUgb2NjdXJyZW5jZXMuXHJcbiAgICAgICAgaWYgKCFkYXRhLmluQ29tYmF0IHx8IGRhdGEubG9zdEZvb2RbbWF0Y2hlcy50YXJnZXRdKVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGRhdGEubG9zdEZvb2RbbWF0Y2hlcy50YXJnZXRdID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ3dhcm4nLFxyXG4gICAgICAgICAgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ2xvc3QgZm9vZCBidWZmJyxcclxuICAgICAgICAgICAgZGU6ICdOYWhydW5nc2J1ZmYgdmVybG9yZW4nLFxyXG4gICAgICAgICAgICBmcjogJ0J1ZmYgbm91cnJpdHVyZSB0ZXJtaW7DqWUnLFxyXG4gICAgICAgICAgICBqYTogJ+mjr+WKueaenOOBjOWkseOBo+OBnycsXHJcbiAgICAgICAgICAgIGNuOiAn5aSx5Y676aOf54mpQlVGRicsXHJcbiAgICAgICAgICAgIGtvOiAn7J2M7IudIOuyhO2UhCDtlbTsoJwnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdHZW5lcmFsIFdlbGwgRmVkJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzQ4JyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGlmICghZGF0YS5sb3N0Rm9vZClcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBkZWxldGUgZGF0YS5sb3N0Rm9vZFttYXRjaGVzLnRhcmdldF07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0dlbmVyYWwgUmFiYml0IE1lZGl1bScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnOEUwJyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS5Jc1BsYXllcklkKG1hdGNoZXMuc291cmNlSWQpLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ3dhcm4nLFxyXG4gICAgICAgICAgYmxhbWU6IG1hdGNoZXMuc291cmNlLFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ2J1bm55JyxcclxuICAgICAgICAgICAgZGU6ICdIYXNlJyxcclxuICAgICAgICAgICAgZnI6ICdsYXBpbicsXHJcbiAgICAgICAgICAgIGphOiAn44GG44GV44GOJyxcclxuICAgICAgICAgICAgY246ICflhZTlrZAnLFxyXG4gICAgICAgICAgICBrbzogJ+2GoOuBvCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEYXRhIGV4dGVuZHMgT29wc3lEYXRhIHtcclxuICBib290Q291bnQ/OiBudW1iZXI7XHJcbiAgcG9rZUNvdW50PzogbnVtYmVyO1xyXG59XHJcblxyXG4vLyBUZXN0IG1pc3Rha2UgdHJpZ2dlcnMuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5NaWRkbGVMYU5vc2NlYSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ1Rlc3QgQm93JyxcclxuICAgICAgdHlwZTogJ0dhbWVMb2cnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYW1lTmFtZUxvZyh7IGxpbmU6ICdZb3UgYm93IGNvdXJ0ZW91c2x5IHRvIHRoZSBzdHJpa2luZyBkdW1teS4qPycgfSksXHJcbiAgICAgIG5ldFJlZ2V4RnI6IE5ldFJlZ2V4ZXMuZ2FtZU5hbWVMb2coeyBsaW5lOiAnVm91cyB2b3VzIGluY2xpbmV6IGRldmFudCBsZSBtYW5uZXF1aW4gZFxcJ2VudHJhw65uZW1lbnQuKj8nIH0pLFxyXG4gICAgICBuZXRSZWdleEphOiBOZXRSZWdleGVzLmdhbWVOYW1lTG9nKHsgbGluZTogJy4q44Gv5pyo5Lq644Gr44GK6L6e5YSA44GX44GfLio/JyB9KSxcclxuICAgICAgbmV0UmVnZXhDbjogTmV0UmVnZXhlcy5nYW1lTmFtZUxvZyh7IGxpbmU6ICcuKuaBreaVrOWcsOWvueacqOS6uuihjOekvC4qPycgfSksXHJcbiAgICAgIG5ldFJlZ2V4S286IE5ldFJlZ2V4ZXMuZ2FtZU5hbWVMb2coeyBsaW5lOiAnLirrgpjrrLTsnbjtmJXsl5Dqsowg6rO17IaQ7ZWY6rKMIOyduOyCrO2VqeuLiOuLpC4qPycgfSksXHJcbiAgICAgIG1pc3Rha2U6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdwdWxsJyxcclxuICAgICAgICAgIGJsYW1lOiBkYXRhLm1lLFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ0JvdycsXHJcbiAgICAgICAgICAgIGRlOiAnQm9nZW4nLFxyXG4gICAgICAgICAgICBmcjogJ1NhbHVlcicsXHJcbiAgICAgICAgICAgIGphOiAn44GK6L6e5YSAJyxcclxuICAgICAgICAgICAgY246ICfpnqDouqwnLFxyXG4gICAgICAgICAgICBrbzogJ+yduOyCrCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ1Rlc3QgV2lwZScsXHJcbiAgICAgIHR5cGU6ICdHYW1lTG9nJyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FtZU5hbWVMb2coeyBsaW5lOiAnWW91IGJpZCBmYXJld2VsbCB0byB0aGUgc3RyaWtpbmcgZHVtbXkuKj8nIH0pLFxyXG4gICAgICBuZXRSZWdleEZyOiBOZXRSZWdleGVzLmdhbWVOYW1lTG9nKHsgbGluZTogJ1ZvdXMgZmFpdGVzIHZvcyBhZGlldXggYXUgbWFubmVxdWluIGRcXCdlbnRyYcOubmVtZW50Lio/JyB9KSxcclxuICAgICAgbmV0UmVnZXhKYTogTmV0UmVnZXhlcy5nYW1lTmFtZUxvZyh7IGxpbmU6ICcuKuOBr+acqOS6uuOBq+WIpeOCjOOBruaMqOaLtuOCkuOBl+OBny4qPycgfSksXHJcbiAgICAgIG5ldFJlZ2V4Q246IE5ldFJlZ2V4ZXMuZ2FtZU5hbWVMb2coeyBsaW5lOiAnLirlkJHmnKjkurrlkYrliKsuKj8nIH0pLFxyXG4gICAgICBuZXRSZWdleEtvOiBOZXRSZWdleGVzLmdhbWVOYW1lTG9nKHsgbGluZTogJy4q64KY66y07J247ZiV7JeQ6rKMIOyekeuzhCDsnbjsgqzrpbwg7ZWp64uI64ukLio/JyB9KSxcclxuICAgICAgbWlzdGFrZTogKGRhdGEpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ3dpcGUnLFxyXG4gICAgICAgICAgYmxhbWU6IGRhdGEubWUsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnUGFydHkgV2lwZScsXHJcbiAgICAgICAgICAgIGRlOiAnR3J1cHBlbndpcGUnLFxyXG4gICAgICAgICAgICBmcjogJ1BhcnR5IFdpcGUnLFxyXG4gICAgICAgICAgICBqYTogJ+ODr+OCpOODlycsXHJcbiAgICAgICAgICAgIGNuOiAn5Zui54GtJyxcclxuICAgICAgICAgICAga286ICftjIzti7Ag7KCE66m4JyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnVGVzdCBCb290c2hpbmUnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICczNScgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBpZiAobWF0Y2hlcy5zb3VyY2UgIT09IGRhdGEubWUpXHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgY29uc3Qgc3RyaWtpbmdEdW1teUJ5TG9jYWxlID0ge1xyXG4gICAgICAgICAgZW46ICdTdHJpa2luZyBEdW1teScsXHJcbiAgICAgICAgICBkZTogJ1RyYWluaW5nc3B1cHBlJyxcclxuICAgICAgICAgIGZyOiAnTWFubmVxdWluIGRcXCdlbnRyYcOubmVtZW50JyxcclxuICAgICAgICAgIGphOiAn5pyo5Lq6JyxcclxuICAgICAgICAgIGNuOiAn5pyo5Lq6JyxcclxuICAgICAgICAgIGtvOiAn64KY66y07J247ZiVJyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHN0cmlraW5nRHVtbXlOYW1lcyA9IE9iamVjdC52YWx1ZXMoc3RyaWtpbmdEdW1teUJ5TG9jYWxlKTtcclxuICAgICAgICByZXR1cm4gc3RyaWtpbmdEdW1teU5hbWVzLmluY2x1ZGVzKG1hdGNoZXMudGFyZ2V0KTtcclxuICAgICAgfSxcclxuICAgICAgbWlzdGFrZTogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmJvb3RDb3VudCA/Pz0gMDtcclxuICAgICAgICBkYXRhLmJvb3RDb3VudCsrO1xyXG4gICAgICAgIGNvbnN0IHRleHQgPSBgJHttYXRjaGVzLmFiaWxpdHl9ICgke2RhdGEuYm9vdENvdW50fSk6ICR7ZGF0YS5EYW1hZ2VGcm9tTWF0Y2hlcyhtYXRjaGVzKX1gO1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IGRhdGEubWUsIHRleHQ6IHRleHQgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnVGVzdCBMZWFkZW4gRmlzdCcsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICc3NDUnIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiBtYXRjaGVzLnNvdXJjZSA9PT0gZGF0YS5tZSxcclxuICAgICAgbWlzdGFrZTogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnZ29vZCcsIGJsYW1lOiBkYXRhLm1lLCB0ZXh0OiBtYXRjaGVzLmVmZmVjdCB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdUZXN0IE9vcHMnLFxyXG4gICAgICB0eXBlOiAnR2FtZUxvZycsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmVjaG8oeyBsaW5lOiAnLipvb3BzLionIH0pLFxyXG4gICAgICBzdXBwcmVzc1NlY29uZHM6IDEwLFxyXG4gICAgICBtaXN0YWtlOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IGRhdGEubWUsIHRleHQ6IG1hdGNoZXMubGluZSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdUZXN0IFBva2UgQ29sbGVjdCcsXHJcbiAgICAgIHR5cGU6ICdHYW1lTG9nJyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FtZU5hbWVMb2coeyBsaW5lOiAnWW91IHBva2UgdGhlIHN0cmlraW5nIGR1bW15Lio/JyB9KSxcclxuICAgICAgbmV0UmVnZXhGcjogTmV0UmVnZXhlcy5nYW1lTmFtZUxvZyh7IGxpbmU6ICdWb3VzIHRvdWNoZXogbMOpZ8OocmVtZW50IGxlIG1hbm5lcXVpbiBkXFwnZW50cmHDrm5lbWVudCBkdSBkb2lndC4qPycgfSksXHJcbiAgICAgIG5ldFJlZ2V4SmE6IE5ldFJlZ2V4ZXMuZ2FtZU5hbWVMb2coeyBsaW5lOiAnLirjga/mnKjkurrjgpLjgaTjgaTjgYTjgZ8uKj8nIH0pLFxyXG4gICAgICBuZXRSZWdleENuOiBOZXRSZWdleGVzLmdhbWVOYW1lTG9nKHsgbGluZTogJy4q55So5omL5oyH5oiz5ZCR5pyo5Lq6Lio/JyB9KSxcclxuICAgICAgbmV0UmVnZXhLbzogTmV0UmVnZXhlcy5nYW1lTmFtZUxvZyh7IGxpbmU6ICcuKuuCmOustOyduO2YleydhCDsv6Hsv6Eg7LCM66aF64uI64ukLio/JyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgIGRhdGEucG9rZUNvdW50ID0gKGRhdGEucG9rZUNvdW50ID8/IDApICsgMTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnVGVzdCBQb2tlJyxcclxuICAgICAgdHlwZTogJ0dhbWVMb2cnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYW1lTmFtZUxvZyh7IGxpbmU6ICdZb3UgcG9rZSB0aGUgc3RyaWtpbmcgZHVtbXkuKj8nIH0pLFxyXG4gICAgICBuZXRSZWdleEZyOiBOZXRSZWdleGVzLmdhbWVOYW1lTG9nKHsgbGluZTogJ1ZvdXMgdG91Y2hleiBsw6lnw6hyZW1lbnQgbGUgbWFubmVxdWluIGRcXCdlbnRyYcOubmVtZW50IGR1IGRvaWd0Lio/JyB9KSxcclxuICAgICAgbmV0UmVnZXhKYTogTmV0UmVnZXhlcy5nYW1lTmFtZUxvZyh7IGxpbmU6ICcuKuOBr+acqOS6uuOCkuOBpOOBpOOBhOOBny4qPycgfSksXHJcbiAgICAgIG5ldFJlZ2V4Q246IE5ldFJlZ2V4ZXMuZ2FtZU5hbWVMb2coeyBsaW5lOiAnLirnlKjmiYvmjIfmiLPlkJHmnKjkurouKj8nIH0pLFxyXG4gICAgICBuZXRSZWdleEtvOiBOZXRSZWdleGVzLmdhbWVOYW1lTG9nKHsgbGluZTogJy4q64KY66y07J247ZiV7J2EIOy/oey/oSDssIzrpoXri4jri6QuKj8nIH0pLFxyXG4gICAgICBkZWxheVNlY29uZHM6IDUsXHJcbiAgICAgIG1pc3Rha2U6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgLy8gMSBwb2tlIGF0IGEgdGltZSBpcyBmaW5lLCBidXQgbW9yZSB0aGFuIG9uZSBpbiA1IHNlY29uZHMgaXMgKE9CVklPVVNMWSkgYSBtaXN0YWtlLlxyXG4gICAgICAgIGlmICghZGF0YS5wb2tlQ291bnQgfHwgZGF0YS5wb2tlQ291bnQgPD0gMSlcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgYmxhbWU6IGRhdGEubWUsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiBgVG9vIG1hbnkgcG9rZXMgKCR7ZGF0YS5wb2tlQ291bnR9KWAsXHJcbiAgICAgICAgICAgIGRlOiBgWnUgdmllbGUgUGlla3NlciAoJHtkYXRhLnBva2VDb3VudH0pYCxcclxuICAgICAgICAgICAgZnI6IGBUcm9wIGRlIHRvdWNoZXMgKCR7ZGF0YS5wb2tlQ291bnR9KWAsXHJcbiAgICAgICAgICAgIGphOiBg44GE44Gj44Gx44GE44Gk44Gk44GE44GfICgke2RhdGEucG9rZUNvdW50fSlgLFxyXG4gICAgICAgICAgICBjbjogYOaIs+WkquWkmuS4i+WVpiAoJHtkYXRhLnBva2VDb3VudH0pYCxcclxuICAgICAgICAgICAga286IGDrhIjrrLQg66eO7J20IOywjOumhCAoJHtkYXRhLnBva2VDb3VudH3rsogpYCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgICAgcnVuOiAoZGF0YSkgPT4gZGVsZXRlIGRhdGEucG9rZUNvdW50LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gSWZyaXQgU3RvcnkgTW9kZVxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlQm93bE9mRW1iZXJzLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdJZnJpdE5tIFJhZGlhbnQgUGx1bWUnOiAnMkRFJyxcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0lmcml0Tm0gSW5jaW5lcmF0ZSc6ICcxQzUnLFxyXG4gICAgJ0lmcml0Tm0gRXJ1cHRpb24nOiAnMkREJyxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gVGl0YW4gU3RvcnkgTW9kZVxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlTmF2ZWwsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ1RpdGFuTm0gV2VpZ2h0IE9mIFRoZSBMYW5kJzogJzNDRCcsXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnVGl0YW5ObSBMYW5kc2xpZGUnOiAnMjhBJyxcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ1RpdGFuTm0gUm9jayBCdXN0ZXInOiAnMjgxJyxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBJdCdzIGhhcmQgdG8gY2FwdHVyZSB0aGUgcmVmbGVjdGlvbiBhYmlsaXRpZXMgZnJvbSBMZXZpYXRoYW4ncyBIZWFkIGFuZCBUYWlsIGlmIHlvdSB1c2VcclxuLy8gcmFuZ2VkIHBoeXNpY2FsIGF0dGFja3MgLyBtYWdpYyBhdHRhY2tzIHJlc3BlY3RpdmVseSwgYXMgdGhlIGFiaWxpdHkgbmFtZXMgYXJlIHRoZVxyXG4vLyBhYmlsaXR5IHlvdSB1c2VkIGFuZCBkb24ndCBhcHBlYXIgdG8gc2hvdyB1cCBpbiB0aGUgbG9nIGFzIG5vcm1hbCBcImFiaWxpdHlcIiBsaW5lcy5cclxuLy8gVGhhdCBzYWlkLCBkb3RzIHN0aWxsIHRpY2sgaW5kZXBlbmRlbnRseSBvbiBib3RoIHNvIGl0J3MgbGlrZWx5IHRoYXQgcGVvcGxlIHdpbGwgYXRhY2tcclxuLy8gdGhlbSBhbnl3YXkuXHJcblxyXG4vLyBUT0RPOiBGaWd1cmUgb3V0IHdoeSBEcmVhZCBUaWRlIC8gV2F0ZXJzcG91dCBhcHBlYXIgbGlrZSBzaGFyZXMgKGkuZS4gMHgxNiBpZCkuXHJcbi8vIERyZWFkIFRpZGUgPSA4MjMvODI0LzgyNSwgV2F0ZXJzcG91dCA9IDgyOVxyXG5cclxuLy8gTGV2aWF0aGFuIEV4dHJlbWVcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZVdob3JsZWF0ZXJFeHRyZW1lLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdMZXZpRXggR3JhbmQgRmFsbCc6ICc4MkYnLCAvLyB2ZXJ5IGxhcmdlIGNpcmN1bGFyIGFvZSBiZWZvcmUgc3Bpbm55IGRpdmVzLCBhcHBsaWVzIGhlYXZ5XHJcbiAgICAnTGV2aUV4IEh5ZHJvIFNob3QnOiAnNzQ4JywgLy8gV2F2ZXNwaW5lIFNhaGFnaW4gYW9lIHRoYXQgZ2l2ZXMgRHJvcHN5IGVmZmVjdFxyXG4gICAgJ0xldmlFeCBEcmVhZHN0b3JtJzogJzc0OScsIC8vIFdhdmV0b290aCBTYWhhZ2luIGFvZSB0aGF0IGdpdmVzIEh5c3RlcmlhIGVmZmVjdFxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ0xldmlFeCBCb2R5IFNsYW0nOiAnODJBJywgLy8gbGV2aSBzbGFtIHRoYXQgdGlsdHMgdGhlIGJvYXRcclxuICAgICdMZXZpRXggU3Bpbm5pbmcgRGl2ZSAxJzogJzg4QScsIC8vIGxldmkgZGFzaCBhY3Jvc3MgdGhlIGJvYXQgd2l0aCBrbm9ja2JhY2tcclxuICAgICdMZXZpRXggU3Bpbm5pbmcgRGl2ZSAyJzogJzg4QicsIC8vIGxldmkgZGFzaCBhY3Jvc3MgdGhlIGJvYXQgd2l0aCBrbm9ja2JhY2tcclxuICAgICdMZXZpRXggU3Bpbm5pbmcgRGl2ZSAzJzogJzgyQycsIC8vIGxldmkgZGFzaCBhY3Jvc3MgdGhlIGJvYXQgd2l0aCBrbm9ja2JhY2tcclxuICB9LFxyXG4gIGdhaW5zRWZmZWN0V2Fybjoge1xyXG4gICAgJ0xldmlFeCBEcm9wc3knOiAnMTEwJywgLy8gc3RhbmRpbmcgaW4gdGhlIGh5ZHJvIHNob3QgZnJvbSB0aGUgV2F2ZXNwaW5lIFNhaGFnaW5cclxuICB9LFxyXG4gIGdhaW5zRWZmZWN0RmFpbDoge1xyXG4gICAgJ0xldmlFeCBIeXN0ZXJpYSc6ICcxMjgnLCAvLyBzdGFuZGluZyBpbiB0aGUgZHJlYWRzdG9ybSBmcm9tIHRoZSBXYXZldG9vdGggU2FoYWdpblxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdMZXZpRXggQm9keSBTbGFtIEtub2NrZWQgT2ZmJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICc4MkEnIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ0tub2NrZWQgb2ZmJyxcclxuICAgICAgICAgICAgZGU6ICdSdW50ZXJnZWZhbGxlbicsXHJcbiAgICAgICAgICAgIGZyOiAnQSDDqXTDqSBhc3NvbW3DqShlKScsXHJcbiAgICAgICAgICAgIGphOiAn44OO44OD44Kv44OQ44OD44KvJyxcclxuICAgICAgICAgICAgY246ICflh7vpgIDlnaDokL0nLFxyXG4gICAgICAgICAgICBrbzogJ+uEieuwsScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEYXRhIGV4dGVuZHMgT29wc3lEYXRhIHtcclxuICBzZWVuRGlhbW9uZER1c3Q/OiBib29sZWFuO1xyXG59XHJcblxyXG4vLyBTaGl2YSBIYXJkXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVBa2hBZmFoQW1waGl0aGVhdHJlSGFyZCxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAvLyBMYXJnZSB3aGl0ZSBjaXJjbGVzLlxyXG4gICAgJ1NoaXZhSG0gSWNpY2xlIEltcGFjdCc6ICc5OTMnLFxyXG4gICAgLy8gQXZvaWRhYmxlIHRhbmsgc3R1bi5cclxuICAgICdTaGl2YUhtIEdsYWNpZXIgQmFzaCc6ICc5QTEnLFxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAvLyBLbm9ja2JhY2sgdGFuayBjbGVhdmUuXHJcbiAgICAnU2hpdmFIbSBIZWF2ZW5seSBTdHJpa2UnOiAnOUEwJyxcclxuICAgIC8vIEhhaWxzdG9ybSBzcHJlYWQgbWFya2VyLlxyXG4gICAgJ1NoaXZhSG0gSGFpbHN0b3JtJzogJzk5OCcsXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgIC8vIFRhbmtidXN0ZXIuICBUaGlzIGlzIFNoaXZhIEhhcmQgbW9kZSwgbm90IFNoaXZhIEV4dHJlbWUuICBQbGVhc2UhXHJcbiAgICAnU2hpdmFIbSBJY2VicmFuZCc6ICc5OTYnLFxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdTaGl2YUhtIERpYW1vbmQgRHVzdCcsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnOThBJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgIGRhdGEuc2VlbkRpYW1vbmREdXN0ID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnU2hpdmFIbSBEZWVwIEZyZWV6ZScsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIC8vIFNoaXZhIGFsc28gdXNlcyBhYmlsaXR5IDlBMyBvbiB5b3UsIGJ1dCBpdCBoYXMgdGhlIHVudHJhbnNsYXRlZCBuYW1lXHJcbiAgICAgIC8vIOmAj+aYju+8muOCt+ODtOOCoe+8muWHjee1kOODrOOCr+ODiO+8muODjuODg+OCr+ODkOODg+OCr+eUqC4gU28sIHVzZSB0aGUgZWZmZWN0IGluc3RlYWQgZm9yIGZyZWUgdHJhbnNsYXRpb24uXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICcxRTcnIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhKSA9PiB7XHJcbiAgICAgICAgLy8gVGhlIGludGVybWlzc2lvbiBhbHNvIGdldHMgdGhpcyBlZmZlY3QsIHNvIG9ubHkgYSBtaXN0YWtlIGFmdGVyIHRoYXQuXHJcbiAgICAgICAgLy8gVW5saWtlIGV4dHJlbWUsIHRoaXMgaGFzIHRoZSBzYW1lIDIwIHNlY29uZCBkdXJhdGlvbiBhcyB0aGUgaW50ZXJtaXNzaW9uLlxyXG4gICAgICAgIHJldHVybiBkYXRhLnNlZW5EaWFtb25kRHVzdDtcclxuICAgICAgfSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuZWZmZWN0IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFNoaXZhIEV4dHJlbWVcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZUFraEFmYWhBbXBoaXRoZWF0cmVFeHRyZW1lLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgIC8vIExhcmdlIHdoaXRlIGNpcmNsZXMuXHJcbiAgICAnU2hpdmFFeCBJY2ljbGUgSW1wYWN0JzogJ0JFQicsXHJcbiAgICAvLyBcImdldCBpblwiIGFvZVxyXG4gICAgJ1NoaXZhRXggV2hpdGVvdXQnOiAnQkVDJyxcclxuICAgIC8vIEF2b2lkYWJsZSB0YW5rIHN0dW4uXHJcbiAgICAnU2hpdmFFeCBHbGFjaWVyIEJhc2gnOiAnQkU5JyxcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgIC8vIDI3MCBkZWdyZWUgYXR0YWNrLlxyXG4gICAgJ1NoaXZhRXggR2xhc3MgRGFuY2UnOiAnQkRGJyxcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgLy8gSGFpbHN0b3JtIHNwcmVhZCBtYXJrZXIuXHJcbiAgICAnU2hpdmFFeCBIYWlsc3Rvcm0nOiAnQkUyJyxcclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgLy8gTGFzZXIuICBUT0RPOiBtYXliZSBibGFtZSB0aGUgcGVyc29uIGl0J3Mgb24/P1xyXG4gICAgJ1NoaXZhRXggQXZhbGFuY2hlJzogJ0JFMCcsXHJcbiAgfSxcclxuICBzb2xvV2Fybjoge1xyXG4gICAgLy8gUGFydHkgc2hhcmVkIHRhbmtidXN0ZXJcclxuICAgICdTaGl2YUV4IEljZWJyYW5kJzogJ0JFMScsXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ1NoaXZhRXggRGVlcCBGcmVlemUnLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICAvLyBTaGl2YSBhbHNvIHVzZXMgYWJpbGl0eSBDOEEgb24geW91LCBidXQgaXQgaGFzIHRoZSB1bnRyYW5zbGF0ZWQgbmFtZVxyXG4gICAgICAvLyDpgI/mmI7vvJrjgrfjg7TjgqHvvJrlh43ntZDjg6zjgq/jg4jvvJrjg47jg4Pjgq/jg5Djg4Pjgq/nlKgv44OS44Ot44Kk44OD44KvLiBTbywgdXNlIHRoZSBlZmZlY3QgaW5zdGVhZCBmb3IgZnJlZSB0cmFuc2xhdGlvbi5cclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzFFNycgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgLy8gVGhlIGludGVybWlzc2lvbiBhbHNvIGdldHMgdGhpcyBlZmZlY3QsIGJ1dCBmb3IgYSBzaG9ydGVyIGR1cmF0aW9uLlxyXG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KG1hdGNoZXMuZHVyYXRpb24pID4gMjA7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmVmZmVjdCB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gVGl0YW4gSGFyZFxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlTmF2ZWxIYXJkLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdUaXRhbkhtIFdlaWdodCBPZiBUaGUgTGFuZCc6ICc1NTMnLFxyXG4gICAgJ1RpdGFuSG0gQnVyc3QnOiAnNDFDJyxcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdUaXRhbkhtIExhbmRzbGlkZSc6ICc1NTQnLFxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnVGl0YW5IbSBSb2NrIEJ1c3Rlcic6ICc1NTAnLFxyXG4gIH0sXHJcbiAgc2hhcmVGYWlsOiB7XHJcbiAgICAnVGl0YW5IbSBNb3VudGFpbiBCdXN0ZXInOiAnMjgzJyxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gVGl0YW4gRXh0cmVtZVxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlTmF2ZWxFeHRyZW1lLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdUaXRhbkV4IFdlaWdodCBPZiBUaGUgTGFuZCc6ICc1QkUnLFxyXG4gICAgJ1RpdGFuRXggQnVyc3QnOiAnNUJGJyxcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdUaXRhbkV4IExhbmRzbGlkZSc6ICc1QkInLFxyXG4gICAgJ1RpdGFuRXggR2FvbGVyIExhbmRzbGlkZSc6ICc1QzMnLFxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnVGl0YW5FeCBSb2NrIEJ1c3Rlcic6ICc1QjcnLFxyXG4gIH0sXHJcbiAgc2hhcmVGYWlsOiB7XHJcbiAgICAnVGl0YW5FeCBNb3VudGFpbiBCdXN0ZXInOiAnNUI4JyxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGF0YSBleHRlbmRzIE9vcHN5RGF0YSB7XHJcbiAgem9tYmllPzogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gIHNoaWVsZD86IHsgW25hbWU6IHN0cmluZ106IGJvb2xlYW4gfTtcclxufVxyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZVdlZXBpbmdDaXR5T2ZNaGFjaCxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnV2VlcGluZyBDcml0aWNhbCBCaXRlJzogJzE4NDgnLCAvLyBTYXJzdWNodXMgY29uZSBhb2VcclxuICAgICdXZWVwaW5nIFJlYWxtIFNoYWtlcic6ICcxODNFJywgLy8gRmlyc3QgRGF1Z2h0ZXIgY2lyY2xlIGFvZVxyXG4gICAgJ1dlZXBpbmcgU2lsa3NjcmVlbic6ICcxODNDJywgLy8gRmlyc3QgRGF1Z2h0ZXIgbGluZSBhb2VcclxuICAgICdXZWVwaW5nIFNpbGtlbiBTcHJheSc6ICcxODI0JywgLy8gQXJhY2huZSBFdmUgcmVhciBjb25hbCBhb2VcclxuICAgICdXZWVwaW5nIFRyZW1ibG9yIDEnOiAnMTgzNycsIC8vIEFyYWNobmUgRXZlIGRpc2FwcGVhciBjaXJjbGUgYW9lIDFcclxuICAgICdXZWVwaW5nIFRyZW1ibG9yIDInOiAnMTgzNicsIC8vIEFyYWNobmUgRXZlIGRpc2FwcGVhciBjaXJjbGUgYW9lIDJcclxuICAgICdXZWVwaW5nIFRyZW1ibG9yIDMnOiAnMTgzNScsIC8vIEFyYWNobmUgRXZlIGRpc2FwcGVhciBjaXJjbGUgYW9lIDNcclxuICAgICdXZWVwaW5nIFNwaWRlciBUaHJlYWQnOiAnMTgzOScsIC8vIEFyYWNobmUgRXZlIHNwaWRlciBsaW5lIGFvZVxyXG4gICAgJ1dlZXBpbmcgRmlyZSBJSSc6ICcxODRFJywgLy8gQmxhY2sgTWFnZSBDb3Jwc2UgY2lyY2xlIGFvZVxyXG4gICAgJ1dlZXBpbmcgTmVjcm9wdXJnZSc6ICcxN0Q3JywgLy8gRm9yZ2FsbCBTaHJpdmVsZWQgVGFsb24gbGluZSBhb2VcclxuICAgICdXZWVwaW5nIFJvdHRlbiBCcmVhdGgnOiAnMTdEMCcsIC8vIEZvcmdhbGwgRGFoYWsgY29uZSBhb2VcclxuICAgICdXZWVwaW5nIE1vdyc6ICcxN0QyJywgLy8gRm9yZ2FsbCBIYWFnZW50aSB1bm1hcmtlZCBjbGVhdmVcclxuICAgICdXZWVwaW5nIERhcmsgRXJ1cHRpb24nOiAnMTdDMycsIC8vIEZvcmdhbGwgcHVkZGxlIG1hcmtlclxyXG4gICAgLy8gMTgwNiBpcyBhbHNvIEZsYXJlIFN0YXIsIGJ1dCBpZiB5b3UgZ2V0IGJ5IDE4MDUgeW91IGFsc28gZ2V0IGhpdCBieSAxODA2P1xyXG4gICAgJ1dlZXBpbmcgRmxhcmUgU3Rhcic6ICcxODA1JywgLy8gT3ptYSBjdWJlIHBoYXNlIGRvbnV0XHJcbiAgICAnV2VlcGluZyBFeGVjcmF0aW9uJzogJzE4MjknLCAvLyBPem1hIHRyaWFuZ2xlIGxhc2VyXHJcbiAgICAnV2VlcGluZyBIYWlyY3V0IDEnOiAnMTgwQicsIC8vIENhbG9maXN0ZXJpIDE4MCBjbGVhdmUgMVxyXG4gICAgJ1dlZXBpbmcgSGFpcmN1dCAyJzogJzE4MEYnLCAvLyBDYWxvZmlzdGVyaSAxODAgY2xlYXZlIDJcclxuICAgICdXZWVwaW5nIEVudGFuZ2xlbWVudCc6ICcxODFEJywgLy8gQ2Fsb2Zpc3RlcmkgbGFuZG1pbmUgcHVkZGxlIHByb2NcclxuICAgICdXZWVwaW5nIEV2aWwgQ3VybCc6ICcxODE2JywgLy8gQ2Fsb2Zpc3RlcmkgYXhlXHJcbiAgICAnV2VlcGluZyBFdmlsIFRyZXNzJzogJzE4MTcnLCAvLyBDYWxvZmlzdGVyaSBidWxiXHJcbiAgICAnV2VlcGluZyBEZXB0aCBDaGFyZ2UnOiAnMTgyMCcsIC8vIENhbG9maXN0ZXJpIGNoYXJnZSB0byBlZGdlXHJcbiAgICAnV2VlcGluZyBGZWludCBQYXJ0aWNsZSBCZWFtJzogJzE5MjgnLCAvLyBDYWxvZmlzdGVyaSBza3kgbGFzZXJcclxuICAgICdXZWVwaW5nIEV2aWwgU3dpdGNoJzogJzE4MTUnLCAvLyBDYWxvZmlzdGVyaSBsYXNlcnNcclxuICB9LFxyXG4gIGdhaW5zRWZmZWN0V2Fybjoge1xyXG4gICAgJ1dlZXBpbmcgSHlzdGVyaWEnOiAnMTI4JywgLy8gQXJhY2huZSBFdmUgRnJvbmQgQWZmZWFyZFxyXG4gICAgJ1dlZXBpbmcgWm9tYmlmaWNhdGlvbic6ICcxNzMnLCAvLyBGb3JnYWxsIHRvbyBtYW55IHpvbWJpZSBwdWRkbGVzXHJcbiAgICAnV2VlcGluZyBUb2FkJzogJzFCNycsIC8vIEZvcmdhbGwgQnJhbmQgb2YgdGhlIEZhbGxlbiBmYWlsdXJlXHJcbiAgICAnV2VlcGluZyBEb29tJzogJzM4RScsIC8vIEZvcmdhbGwgSGFhZ2VudGkgTW9ydGFsIFJheVxyXG4gICAgJ1dlZXBpbmcgQXNzaW1pbGF0aW9uJzogJzQyQycsIC8vIE96bWFzaGFkZSBBc3NpbWlsYXRpb24gbG9vay1hd2F5XHJcbiAgICAnV2VlcGluZyBTdHVuJzogJzk1JywgLy8gQ2Fsb2Zpc3RlcmkgUGVuZXRyYXRpb24gbG9vay1hd2F5XHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdXZWVwaW5nIEFyYWNobmUgV2ViJzogJzE4NUUnLCAvLyBBcmFjaG5lIEV2ZSBoZWFkbWFya2VyIHdlYiBhb2VcclxuICAgICdXZWVwaW5nIEVhcnRoIEFldGhlcic6ICcxODQxJywgLy8gQXJhY2huZSBFdmUgb3Jic1xyXG4gICAgJ1dlZXBpbmcgRXBpZ3JhcGgnOiAnMTg1MicsIC8vIEhlYWRzdG9uZSB1bnRlbGVncmFwaGVkIGxhc2VyIGxpbmUgdGFuayBhdHRhY2tcclxuICAgIC8vIFRoaXMgaXMgdG9vIG5vaXN5LiAgQmV0dGVyIHRvIHBvcCB0aGUgYmFsbG9vbnMgdGhhbiB3b3JyeSBhYm91dCBmcmllbmRzLlxyXG4gICAgLy8gJ1dlZXBpbmcgRXhwbG9zaW9uJzogJzE4MDcnLCAvLyBPem1hc3BoZXJlIEN1YmUgb3JiIGV4cGxvc2lvblxyXG4gICAgJ1dlZXBpbmcgU3BsaXQgRW5kIDEnOiAnMTgwQycsIC8vIENhbG9maXN0ZXJpIHRhbmsgY2xlYXZlIDFcclxuICAgICdXZWVwaW5nIFNwbGl0IEVuZCAyJzogJzE4MTAnLCAvLyBDYWxvZmlzdGVyaSB0YW5rIGNsZWF2ZSAyXHJcbiAgICAnV2VlcGluZyBCbG9vZGllZCBOYWlsJzogJzE4MUYnLCAvLyBDYWxvZmlzdGVyaSBheGUvYnVsYiBhcHBlYXJpbmdcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnV2VlcGluZyBGb3JnYWxsIEdyYWR1YWwgWm9tYmlmaWNhdGlvbiBHYWluJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzQxNScgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLnpvbWJpZSA/Pz0ge307XHJcbiAgICAgICAgZGF0YS56b21iaWVbbWF0Y2hlcy50YXJnZXRdID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnV2VlcGluZyBGb3JnYWxsIEdyYWR1YWwgWm9tYmlmaWNhdGlvbiBMb3NlJyxcclxuICAgICAgdHlwZTogJ0xvc2VzRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMubG9zZXNFZmZlY3QoeyBlZmZlY3RJZDogJzQxNScgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLnpvbWJpZSA9IGRhdGEuem9tYmllIHx8IHt9O1xyXG4gICAgICAgIGRhdGEuem9tYmllW21hdGNoZXMudGFyZ2V0XSA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdXZWVwaW5nIEZvcmdhbGwgTWVnYSBEZWF0aCcsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnMTdDQScgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IGRhdGEuem9tYmllICYmICFkYXRhLnpvbWJpZVttYXRjaGVzLnRhcmdldF0sXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnV2VlcGluZyBIZWFkc3RvbmUgU2hpZWxkIEdhaW4nLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnMTVFJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuc2hpZWxkID8/PSB7fTtcclxuICAgICAgICBkYXRhLnNoaWVsZFttYXRjaGVzLnRhcmdldF0gPSB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdXZWVwaW5nIEhlYWRzdG9uZSBTaGllbGQgTG9zZScsXHJcbiAgICAgIHR5cGU6ICdMb3Nlc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmxvc2VzRWZmZWN0KHsgZWZmZWN0SWQ6ICcxNUUnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5zaGllbGQgPSBkYXRhLnNoaWVsZCB8fCB7fTtcclxuICAgICAgICBkYXRhLnNoaWVsZFttYXRjaGVzLnRhcmdldF0gPSBmYWxzZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnV2VlcGluZyBGbGFyaW5nIEVwaWdyYXBoJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICcxODU2JyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS5zaGllbGQgJiYgIWRhdGEuc2hpZWxkW21hdGNoZXMudGFyZ2V0XSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gVGhpcyBhYmlsaXR5IG5hbWUgaXMgaGVscGZ1bGx5IGNhbGxlZCBcIkF0dGFja1wiIHNvIG5hbWUgaXQgc29tZXRoaW5nIGVsc2UuXHJcbiAgICAgIGlkOiAnV2VlcGluZyBPem1hIFRhbmsgTGFzZXInLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyB0eXBlOiAnMjInLCBpZDogJzE4MzEnIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ3dhcm4nLFxyXG4gICAgICAgICAgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ1RhbmsgTGFzZXInLFxyXG4gICAgICAgICAgICBkZTogJ1RhbmsgTGFzZXInLFxyXG4gICAgICAgICAgICBmcjogJ1RhbmsgTGFzZXInLFxyXG4gICAgICAgICAgICBqYTogJ+OCv+ODs+OCr+ODrOOCtuODvCcsXHJcbiAgICAgICAgICAgIGNuOiAn5Z2m5YWL5r+A5YWJJyxcclxuICAgICAgICAgICAga286ICftg7Hsu6Qg66CI7J207KCAJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnV2VlcGluZyBPem1hIEhvbHknLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzE4MkUnIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ1NsaWQgb2ZmIScsXHJcbiAgICAgICAgICAgIGRlOiAnaXN0IHJ1bnRlcmdlcnV0c2NodCEnLFxyXG4gICAgICAgICAgICBmcjogJ0EgZ2xpc3PDqShlKSAhJyxcclxuICAgICAgICAgICAgamE6ICfjg47jg4Pjgq/jg5Djg4Pjgq8nLFxyXG4gICAgICAgICAgICBjbjogJ+WHu+mAgO+8gScsXHJcbiAgICAgICAgICAgIGtvOiAn64SJ67Cx65CoIScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIEFldGhlcm9jaGVtaWNhbCBSZXNlYXJjaCBGYWNpbGl0eVxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlQWV0aGVyb2NoZW1pY2FsUmVzZWFyY2hGYWNpbGl0eSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnQVJGIEdyYW5kIFN3b3JkJzogJzIxNicsIC8vIENvbmFsIEFvRSwgU2NyYW1ibGVkIElyb24gR2lhbnQgdHJhc2hcclxuICAgICdBUkYgQ2VybWV0IERyaWxsJzogJzIwRScsIC8vIExpbmUgQW9FLCA2dGggTGVnaW9uIE1hZ2l0ZWsgVmFuZ3VhcmQgdHJhc2hcclxuICAgICdBUkYgTWFnaXRlayBTbHVnJzogJzEwREInLCAvLyBMaW5lIEFvRSwgYm9zcyAxXHJcbiAgICAnQVJGIEFldGhlcm9jaGVtaWNhbCBHcmVuYWRvJzogJzEwRTInLCAvLyBMYXJnZSB0YXJnZXRlZCBjaXJjbGUgQW9FLCBNYWdpdGVrIFR1cnJldCBJSSwgYm9zcyAxXHJcbiAgICAnQVJGIE1hZ2l0ZWsgU3ByZWFkJzogJzEwREMnLCAvLyAyNzAtZGVncmVlIHJvb213aWRlIEFvRSwgYm9zcyAxXHJcbiAgICAnQVJGIEVlcmllIFNvdW5kd2F2ZSc6ICcxMTcwJywgLy8gVGFyZ2V0ZWQgY2lyY2xlIEFvRSwgQ3VsdHVyZWQgRW1wdXNhIHRyYXNoLCBiZWZvcmUgYm9zcyAyXHJcbiAgICAnQVJGIFRhaWwgU2xhcCc6ICcxMjVGJywgLy8gQ29uYWwgQW9FLCBDdWx0dXJlZCBEYW5jZXIgdHJhc2gsIGJlZm9yZSBib3NzIDJcclxuICAgICdBUkYgQ2FsY2lmeWluZyBNaXN0JzogJzEyM0EnLCAvLyBDb25hbCBBb0UsIEN1bHR1cmVkIE5hZ2EgdHJhc2gsIGJlZm9yZSBib3NzIDJcclxuICAgICdBUkYgUHVuY3R1cmUnOiAnMTE3MScsIC8vIFNob3J0IGxpbmUgQW9FLCBDdWx0dXJlZCBFbXB1c2EgdHJhc2gsIGJlZm9yZSBib3NzIDJcclxuICAgICdBUkYgU2lkZXN3aXBlJzogJzExQTcnLCAvLyBDb25hbCBBb0UsIEN1bHR1cmVkIFJlcHRvaWQgdHJhc2gsIGJlZm9yZSBib3NzIDJcclxuICAgICdBUkYgR3VzdCc6ICczOTUnLCAvLyBUYXJnZXRlZCBzbWFsbCBjaXJjbGUgQW9FLCBDdWx0dXJlZCBNaXJyb3JrbmlnaHQgdHJhc2gsIGJlZm9yZSBib3NzIDJcclxuICAgICdBUkYgTWFycm93IERyYWluJzogJ0QwRScsIC8vIENvbmFsIEFvRSwgQ3VsdHVyZWQgQ2hpbWVyYSB0cmFzaCwgYmVmb3JlIGJvc3MgMlxyXG4gICAgJ0FSRiBSaWRkbGUgT2YgVGhlIFNwaGlueCc6ICcxMEU0JywgLy8gVGFyZ2V0ZWQgY2lyY2xlIEFvRSwgYm9zcyAyXHJcbiAgICAnQVJGIEthJzogJzEwNkUnLCAvLyBDb25hbCBBb0UsIGJvc3MgMlxyXG4gICAgJ0FSRiBSb3Rvc3dpcGUnOiAnMTFDQycsIC8vIENvbmFsIEFvRSwgRmFjaWxpdHkgRHJlYWRub3VnaHQgdHJhc2gsIGJlZm9yZSBib3NzIDNcclxuICAgICdBUkYgQXV0by1jYW5ub25zJzogJzEyRDknLCAvLyBMaW5lIEFvRSwgTW9uaXRvcmluZyBEcm9uZSB0cmFzaCwgYmVmb3JlIGJvc3MgM1xyXG4gICAgJ0FSRiBEZWF0aFxcJ3MgRG9vcic6ICc0RUMnLCAvLyBMaW5lIEFvRSwgQ3VsdHVyZWQgU2hhYnRpIHRyYXNoLCBiZWZvcmUgYm9zcyAzXHJcbiAgICAnQVJGIFNwZWxsc3dvcmQnOiAnNEVCJywgLy8gQ29uYWwgQW9FLCBDdWx0dXJlZCBTaGFidGkgdHJhc2gsIGJlZm9yZSBib3NzIDNcclxuICAgICdBUkYgRW5kIE9mIERheXMnOiAnMTBGRCcsIC8vIExpbmUgQW9FLCBib3NzIDNcclxuICAgICdBUkYgQmxpenphcmQgQnVyc3QnOiAnMTBGRScsIC8vIEZpeGVkIGNpcmNsZSBBb0VzLCBJZ2V5b3JobSwgYm9zcyAzXHJcbiAgICAnQVJGIEZpcmUgQnVyc3QnOiAnMTBGRicsIC8vIEZpeGVkIGNpcmNsZSBBb0VzLCBMYWhhYnJlYSwgYm9zcyAzXHJcbiAgICAnQVJGIFNlYSBPZiBQaXRjaCc6ICcxMkRFJywgLy8gVGFyZ2V0ZWQgcGVyc2lzdGVudCBjaXJjbGUgQW9FcywgYm9zcyAzXHJcbiAgICAnQVJGIERhcmsgQmxpenphcmQgSUknOiAnMTBGMycsIC8vIFJhbmRvbSBjaXJjbGUgQW9FcywgSWdleW9yaG0sIGJvc3MgM1xyXG4gICAgJ0FSRiBEYXJrIEZpcmUgSUknOiAnMTBGOCcsIC8vIFJhbmRvbSBjaXJjbGUgQW9FcywgTGFoYWJyZWEsIGJvc3MgM1xyXG4gICAgJ0FSRiBBbmNpZW50IEVydXB0aW9uJzogJzExMDQnLCAvLyBTZWxmLXRhcmdldGVkIGNpcmNsZSBBb0UsIGJvc3MgNFxyXG4gICAgJ0FSRiBFbnRyb3BpYyBGbGFtZSc6ICcxMTA4JywgLy8gTGluZSBBb0VzLCAgYm9zcyA0XHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdBUkYgQ2h0aG9uaWMgSHVzaCc6ICcxMEU3JywgLy8gSW5zdGFudCB0YW5rIGNsZWF2ZSwgYm9zcyAyXHJcbiAgICAnQVJGIEhlaWdodCBPZiBDaGFvcyc6ICcxMTAxJywgLy8gVGFuayBjbGVhdmUsIGJvc3MgNFxyXG4gICAgJ0FSRiBBbmNpZW50IENpcmNsZSc6ICcxMTAyJywgLy8gVGFyZ2V0ZWQgZG9udXQgQW9FcywgYm9zcyA0XHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ0FSRiBQZXRyaWZhY3Rpb24nLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnMDEnIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5lZmZlY3QgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIEZyYWN0YWwgQ29udGludXVtXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVGcmFjdGFsQ29udGludXVtLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdGcmFjdGFsIERvdWJsZSBTZXZlcic6ICdGN0QnLCAvLyBDb25hbHMsIGJvc3MgMVxyXG4gICAgJ0ZyYWN0YWwgQWV0aGVyaWMgQ29tcHJlc3Npb24nOiAnRjgwJywgLy8gR3JvdW5kIEFvRSBjaXJjbGVzLCBib3NzIDFcclxuICAgICdGcmFjdGFsIDExLVRvbnplIFN3aXBlJzogJ0Y4MScsIC8vIEZyb250YWwgY29uZSwgYm9zcyAyXHJcbiAgICAnRnJhY3RhbCAxMC1Ub256ZSBTbGFzaCc6ICdGODMnLCAvLyBGcm9udGFsIGxpbmUsIGJvc3MgMlxyXG4gICAgJ0ZyYWN0YWwgMTExLVRvbnplIFN3aW5nJzogJ0Y4NycsIC8vIEdldC1vdXQgQW9FLCBib3NzIDJcclxuICAgICdGcmFjdGFsIEJyb2tlbiBHbGFzcyc6ICdGOEUnLCAvLyBHbG93aW5nIHBhbmVscywgYm9zcyAzXHJcbiAgICAnRnJhY3RhbCBNaW5lcyc6ICdGOTAnLFxyXG4gICAgJ0ZyYWN0YWwgU2VlZCBvZiB0aGUgUml2ZXJzJzogJ0Y5MScsIC8vIEdyb3VuZCBBb0UgY2lyY2xlcywgYm9zcyAzXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdGcmFjdGFsIFNhbmN0aWZpY2F0aW9uJzogJ0Y4OScsIC8vIEluc3RhbnQgY29uYWwgYnVzdGVyLCBib3NzIDNcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuaW1wb3J0IHsgcGxheWVyRGFtYWdlRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vb29wc3lfY29tbW9uJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGF0YSBleHRlbmRzIE9vcHN5RGF0YSB7XHJcbiAgaGFzSW1wPzogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG59XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlR3JlYXRHdWJhbExpYnJhcnlIYXJkLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdHdWJhbEhtIFRlcnJvciBFeWUnOiAnOTMwJywgLy8gQ2lyY2xlIEFvRSwgU3BpbmUgQnJlYWtlciB0cmFzaFxyXG4gICAgJ0d1YmFsSG0gQmF0dGVyJzogJzE5OEEnLCAvLyBDaXJjbGUgQW9FLCB0cmFzaCBiZWZvcmUgYm9zcyAxXHJcbiAgICAnR3ViYWxIbSBDb25kZW1uYXRpb24nOiAnMzkwJywgLy8gQ29uYWwgQW9FLCBCaWJsaW92b3JlIHRyYXNoXHJcbiAgICAnR3ViYWxIbSBEaXNjb250aW51ZSAxJzogJzE5NDMnLCAvLyBGYWxsaW5nIGJvb2sgc2hhZG93LCBib3NzIDFcclxuICAgICdHdWJhbEhtIERpc2NvbnRpbnVlIDInOiAnMTk0MCcsIC8vIFJ1c2ggQW9FIGZyb20gZW5kcywgYm9zcyAxXHJcbiAgICAnR3ViYWxIbSBEaXNjb250aW51ZSAzJzogJzE5NDInLCAvLyBSdXNoIEFvRSBhY3Jvc3MsIGJvc3MgMVxyXG4gICAgJ0d1YmFsSG0gRnJpZ2h0ZnVsIFJvYXInOiAnMTkzQicsIC8vIEdldC1PdXQgQW9FLCBib3NzIDFcclxuICAgICdHdWJhbEhtIElzc3VlIDEnOiAnMTkzRCcsIC8vIEluaXRpYWwgZW5kIGJvb2sgd2FybmluZyBBb0UsIGJvc3MgMVxyXG4gICAgJ0d1YmFsSG0gSXNzdWUgMic6ICcxOTNGJywgLy8gSW5pdGlhbCBlbmQgYm9vayB3YXJuaW5nIEFvRSwgYm9zcyAxXHJcbiAgICAnR3ViYWxIbSBJc3N1ZSAzJzogJzE5NDEnLCAvLyBJbml0aWFsIHNpZGUgYm9vayB3YXJuaW5nIEFvRSwgYm9zcyAxXHJcbiAgICAnR3ViYWxIbSBEZXNvbGF0aW9uJzogJzE5OEMnLCAvLyBMaW5lIEFvRSwgQmlibGlvY2xhc3QgdHJhc2hcclxuICAgICdHdWJhbEhtIERvdWJsZSBTbWFzaCc6ICcyNkEnLCAvLyBDb25hbCBBb0UsIEJpYmxpb2NsYXN0IHRyYXNoXHJcbiAgICAnR3ViYWxIbSBEYXJrbmVzcyc6ICczQTAnLCAvLyBDb25hbCBBb0UsIElua3N0YWluIHRyYXNoXHJcbiAgICAnR3ViYWxIbSBGaXJld2F0ZXInOiAnM0JBJywgLy8gQ2lyY2xlIEFvRSwgQmlibGlvY2xhc3QgdHJhc2hcclxuICAgICdHdWJhbEhtIEVsYm93IERyb3AnOiAnQ0JBJywgLy8gQ29uYWwgQW9FLCBCaWJsaW9jbGFzdCB0cmFzaFxyXG4gICAgJ0d1YmFsSG0gRGFyayc6ICcxOURGJywgLy8gTGFyZ2UgY2lyY2xlIEFvRSwgSW5rc3RhaW4gdHJhc2hcclxuICAgICdHdWJhbEhtIFNlYWxzJzogJzE5NEEnLCAvLyBTdW4vTW9vbnNlYWwgZmFpbHVyZSwgYm9zcyAyXHJcbiAgICAnR3ViYWxIbSBXYXRlciBJSUknOiAnMUM2NycsIC8vIExhcmdlIGNpcmNsZSBBb0UsIFBvcm9nbyBQZWdpc3QgdHJhc2hcclxuICAgICdHdWJhbEhtIFJhZ2luZyBBeGUnOiAnMTcwMycsIC8vIFNtYWxsIGNvbmFsIEFvRSwgTWVjaGFub3NlcnZpdG9yIHRyYXNoXHJcbiAgICAnR3ViYWxIbSBNYWdpYyBIYW1tZXInOiAnMTk5MCcsIC8vIExhcmdlIGNpcmNsZSBBb0UsIEFwYW5kYSBtaW5pLWJvc3NcclxuICAgICdHdWJhbEhtIFByb3BlcnRpZXMgT2YgR3Jhdml0eSc6ICcxOTUwJywgLy8gQ2lyY2xlIEFvRSBmcm9tIGdyYXZpdHkgcHVkZGxlcywgYm9zcyAzXHJcbiAgICAnR3ViYWxIbSBQcm9wZXJ0aWVzIE9mIExldml0YXRpb24nOiAnMTk0RicsIC8vIENpcmNsZSBBb0UgZnJvbSBsZXZpdGF0aW9uIHB1ZGRsZXMsIGJvc3MgM1xyXG4gICAgJ0d1YmFsSG0gQ29tZXQnOiAnMTk2OScsIC8vIFNtYWxsIGNpcmNsZSBBb0UsIGludGVybWlzc2lvbiwgYm9zcyAzXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnR3ViYWxIbSBFY2xpcHRpYyBNZXRlb3InOiAnMTk1QycsIC8vIExvUyBtZWNoYW5pYywgYm9zcyAzXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdHdWJhbEhtIFNlYXJpbmcgV2luZCc6ICcxOTQ0JywgLy8gVGFuayBjbGVhdmUsIGJvc3MgMlxyXG4gICAgJ0d1YmFsSG0gVGh1bmRlcic6ICcxOVtBQl0nLCAvLyBTcHJlYWQgbWFya2VyLCBib3NzIDNcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIC8vIEZpcmUgZ2F0ZSBpbiBoYWxsd2F5IHRvIGJvc3MgMiwgbWFnbmV0IGZhaWx1cmUgb24gYm9zcyAyXHJcbiAgICAgIGlkOiAnR3ViYWxIbSBCdXJucycsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICcxMEInIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5lZmZlY3QgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIEhlbHBlciBmb3IgVGh1bmRlciAzIGZhaWx1cmVzXHJcbiAgICAgIGlkOiAnR3ViYWxIbSBJbXAgR2FpbicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICc0NkUnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5oYXNJbXAgPz89IHt9O1xyXG4gICAgICAgIGRhdGEuaGFzSW1wW21hdGNoZXMudGFyZ2V0XSA9IHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0d1YmFsSG0gSW1wIExvc2UnLFxyXG4gICAgICB0eXBlOiAnTG9zZXNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5sb3Nlc0VmZmVjdCh7IGVmZmVjdElkOiAnNDZFJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuaGFzSW1wID0gZGF0YS5oYXNJbXAgfHwge307XHJcbiAgICAgICAgZGF0YS5oYXNJbXBbbWF0Y2hlcy50YXJnZXRdID0gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBUYXJnZXRzIHdpdGggSW1wIHdoZW4gVGh1bmRlciBJSUkgcmVzb2x2ZXMgcmVjZWl2ZSBhIHZ1bG5lcmFiaWxpdHkgc3RhY2sgYW5kIGJyaWVmIHN0dW5cclxuICAgICAgaWQ6ICdHdWJhbEhtIEltcCBUaHVuZGVyJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMTk1W0FCXScsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS5oYXNJbXA/LlttYXRjaGVzLnRhcmdldF0sXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnd2FybicsXHJcbiAgICAgICAgICBibGFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnU2hvY2tlZCBJbXAnLFxyXG4gICAgICAgICAgICBkZTogJ1NjaG9ja2llcnRlciBJbXAnLFxyXG4gICAgICAgICAgICBqYTogJ+OCq+ODg+ODkeOCkuino+mZpOOBl+OBquOBi+OBo+OBnycsXHJcbiAgICAgICAgICAgIGNuOiAn5rKz56ul54q25oCB5ZCD5LqG5pq06Zu3JyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnR3ViYWxIbSBRdWFrZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzE5NTYnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIC8vIEFsd2F5cyBoaXRzIHRhcmdldCwgYnV0IGlmIGNvcnJlY3RseSByZXNvbHZlZCB3aWxsIGRlYWwgMCBkYW1hZ2VcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS5EYW1hZ2VGcm9tTWF0Y2hlcyhtYXRjaGVzKSA+IDAsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnR3ViYWxIbSBUb3JuYWRvJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMTk1Wzc4XScsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgLy8gQWx3YXlzIGhpdHMgdGFyZ2V0LCBidXQgaWYgY29ycmVjdGx5IHJlc29sdmVkIHdpbGwgZGVhbCAwIGRhbWFnZVxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiBkYXRhLkRhbWFnZUZyb21NYXRjaGVzKG1hdGNoZXMpID4gMCxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuU29obUFsSGFyZCxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnU29obUFsSG0gRGVhZGx5IFZhcG9yJzogJzFEQzknLCAvLyBFbnZpcm9ubWVudGFsIGNpcmNsZSBBb0VzXHJcbiAgICAnU29obUFsSG0gRGVlcHJvb3QnOiAnMUNEQScsIC8vIFRhcmdldGVkIGNpcmNsZSBBb0UsIEJsb29taW5nIENoaWNodSB0cmFzaFxyXG4gICAgJ1NvaG1BbEhtIE9kaW91cyBBaXInOiAnMUNEQicsIC8vIENvbmFsIEFvRSwgQmxvb21pbmcgQ2hpY2h1IHRyYXNoXHJcbiAgICAnU29obUFsSG0gR2xvcmlvdXMgQmxhemUnOiAnMUMzMycsIC8vIENpcmNsZSBBb0UsIFNtYWxsIFNwb3JlIFNhYywgYm9zcyAxXHJcbiAgICAnU29obUFsSG0gRm91bCBXYXRlcnMnOiAnMTE4QScsIC8vIENvbmFsIEFvRSwgTW91bnRhaW50b3AgT3BrZW4gdHJhc2hcclxuICAgICdTb2htQWxIbSBQbGFpbiBQb3VuZCc6ICcxMTg3JywgLy8gVGFyZ2V0ZWQgY2lyY2xlIEFvRSwgTW91bnRhaW50b3AgSHJvcGtlbiB0cmFzaFxyXG4gICAgJ1NvaG1BbEhtIFBhbHN5bnl4aXMnOiAnMTE2MScsIC8vIENvbmFsIEFvRSwgT3Zlcmdyb3duIERpZmZsdWdpYSB0cmFzaFxyXG4gICAgJ1NvaG1BbEhtIFN1cmZhY2UgQnJlYWNoJzogJzFFODAnLCAvLyBDaXJjbGUgQW9FLCBHaWFudCBOZXRoZXJ3b3JtIHRyYXNoXHJcbiAgICAnU29obUFsSG0gRnJlc2h3YXRlciBDYW5ub24nOiAnMTE5RicsIC8vIExpbmUgQW9FLCBHaWFudCBOZXRoZXJ3b3JtIHRyYXNoXHJcbiAgICAnU29obUFsSG0gVGFpbCBTbWFzaCc6ICcxQzM1JywgLy8gVW50ZWxlZ3JhcGhlZCByZWFyIGNvbmFsIEFvRSwgR293cm93LCBib3NzIDJcclxuICAgICdTb2htQWxIbSBUYWlsIFN3aW5nJzogJzFDMzYnLCAvLyBVbnRlbGVncmFwaGVkIGNpcmNsZSBBb0UsIEdvd3JvdywgYm9zcyAyXHJcbiAgICAnU29obUFsSG0gUmlwcGVyIENsYXcnOiAnMUMzNycsIC8vIFVudGVsZWdyYXBoZWQgZnJvbnRhbCBBb0UsIEdvd3JvdywgYm9zcyAyXHJcbiAgICAnU29obUFsSG0gV2luZCBTbGFzaCc6ICcxQzM4JywgLy8gQ2lyY2xlIEFvRSwgR293cm93LCBib3NzIDJcclxuICAgICdTb2htQWxIbSBXaWxkIENoYXJnZSc6ICcxQzM5JywgLy8gRGFzaCBhdHRhY2ssIEdvd3JvdywgYm9zcyAyXHJcbiAgICAnU29obUFsSG0gSG90IENoYXJnZSc6ICcxQzNBJywgLy8gRGFzaCBhdHRhY2ssIEdvd3JvdywgYm9zcyAyXHJcbiAgICAnU29obUFsSG0gRmlyZWJhbGwnOiAnMUMzQicsIC8vIFVudGVsZWdyYXBoZWQgdGFyZ2V0ZWQgY2lyY2xlIEFvRSwgR293cm93LCBib3NzIDJcclxuICAgICdTb2htQWxIbSBMYXZhIEZsb3cnOiAnMUMzQycsIC8vIFVudGVsZWdyYXBoZWQgY29uYWwgQW9FLCBHb3dyb3csIGJvc3MgMlxyXG4gICAgJ1NvaG1BbEhtIFdpbGQgSG9ybic6ICcxNTA3JywgLy8gQ29uYWwgQW9FLCBBYmFsYXRoaWFuIENsYXkgR29sZW0gdHJhc2hcclxuICAgICdTb2htQWxIbSBMYXZhIEJyZWF0aCc6ICcxQzREJywgLy8gQ29uYWwgQW9FLCBMYXZhIENyYWIgdHJhc2hcclxuICAgICdTb2htQWxIbSBSaW5nIG9mIEZpcmUnOiAnMUM0QycsIC8vIFRhcmdldGVkIGNpcmNsZSBBb0UsIFZvbGNhbm8gQW5hbGEgdHJhc2hcclxuICAgICdTb2htQWxIbSBNb2x0ZW4gU2lsayAxJzogJzFDNDMnLCAvLyAyNzAtZGVncmVlIGZyb250YWwgQW9FLCBMYXZhIFNjb3JwaW9uLCBib3NzIDNcclxuICAgICdTb2htQWxIbSBNb2x0ZW4gU2lsayAyJzogJzFDNDQnLCAvLyAyNzAtZGVncmVlIHJlYXIgQW9FLCBMYXZhIFNjb3JwaW9uLCBib3NzIDNcclxuICAgICdTb2htQWxIbSBNb2x0ZW4gU2lsayAzJzogJzFDNDInLCAvLyBSaW5nIEFvRSwgTGF2YSBTY29ycGlvbiwgYm9zcyAzXHJcbiAgICAnU29obUFsSG0gUmVhbG0gU2hha2VyJzogJzFDNDEnLCAvLyBDaXJjbGUgQW9FLCBMYXZhIFNjb3JwaW9uLCBib3NzIDNcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIC8vIFdhcm5zIGlmIHBsYXllcnMgc3RlcCBpbnRvIHRoZSBsYXZhIHB1ZGRsZXMuIFRoZXJlIGlzIHVuZm9ydHVuYXRlbHkgbm8gZGlyZWN0IGRhbWFnZSBldmVudC5cclxuICAgICAgaWQ6ICdTb2htQWxIbSBCdXJucycsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICcxMUMnIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5lZmZlY3QgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PE9vcHN5RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuQWxleGFuZGVyVGhlQ3VmZk9mVGhlU29uLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdNaW5lZmllbGQnOiAnMTcwRCcsIC8vIENpcmNsZSBBb0UsIG1pbmVzLlxyXG4gICAgJ01pbmUnOiAnMTcwRScsIC8vIE1pbmUgZXhwbG9zaW9uLlxyXG4gICAgJ1N1cGVyY2hhcmdlJzogJzE3MTMnLCAvLyBNaXJhZ2UgY2hhcmdlLlxyXG4gICAgJ0hlaWdodCBFcnJvcic6ICcxNzFEJywgLy8gSW5jb3JyZWN0IHBhbmVsIGZvciBIZWlnaHQuXHJcbiAgICAnRWFydGggTWlzc2lsZSc6ICcxNzI2JywgLy8gQ2lyY2xlIEFvRSwgZmlyZSBwdWRkbGVzLlxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ1VsdHJhIEZsYXNoJzogJzE3MjInLCAvLyBSb29tLXdpZGUgZGVhdGggQW9FLCBpZiBub3QgTG9TJ2QuXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdJY2UgTWlzc2lsZSc6ICcxNzI3JywgLy8gSWNlIGhlYWRtYXJrZXIgQW9FIGNpcmNsZXMuXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgICdTaW5nbGUgQnVzdGVyJzogJzE3MTcnLCAvLyBTaW5nbGUgbGFzZXIgQXR0YWNobWVudC4gTm9uLXRhbmtzIGFyZSAqcHJvYmFibHkqIGRlYWQuXHJcbiAgfSxcclxuICBzb2xvV2Fybjoge1xyXG4gICAgJ0RvdWJsZSBCdXN0ZXInOiAnMTcxOCcsIC8vIFR3aW4gbGFzZXIgQXR0YWNobWVudC5cclxuICAgICdFbnVtZXJhdGlvbic6ICcxNzFFJywgLy8gRW51bWVyYXRpb24gY2lyY2xlLlxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEYXRhIGV4dGVuZHMgT29wc3lEYXRhIHtcclxuICBhc3NhdWx0Pzogc3RyaW5nW107XHJcbn1cclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5BbGV4YW5kZXJUaGVTb3VsT2ZUaGVDcmVhdG9yLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdBMTJOIFNhY3JhbWVudCc6ICcxQUU2JywgLy8gQ3Jvc3MgTGFzZXJzXHJcbiAgICAnQTEyTiBHcmF2aXRhdGlvbmFsIEFub21hbHknOiAnMUFFQicsIC8vIEdyYXZpdHkgUHVkZGxlc1xyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnQTEyTiBEaXZpbmUgU3BlYXInOiAnMUFFMycsIC8vIEluc3RhbnQgY29uYWwgdGFuayBjbGVhdmVcclxuICAgICdBMTJOIEJsYXppbmcgU2NvdXJnZSc6ICcxQUU5JywgLy8gT3JhbmdlIGhlYWQgbWFya2VyIHNwbGFzaCBkYW1hZ2VcclxuICAgICdBMTJOIFBsYWludCBPZiBTZXZlcml0eSc6ICcxQUYxJywgLy8gQWdncmF2YXRlZCBBc3NhdWx0IHNwbGFzaCBkYW1hZ2VcclxuICAgICdBMTJOIENvbW11bmlvbic6ICcxQUZDJywgLy8gVGV0aGVyIFB1ZGRsZXNcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnQTEyTiBBc3NhdWx0IENvbGxlY3QnLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnNDYxJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuYXNzYXVsdCA/Pz0gW107XHJcbiAgICAgICAgZGF0YS5hc3NhdWx0LnB1c2gobWF0Y2hlcy50YXJnZXQpO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gSXQgaXMgYSBmYWlsdXJlIGZvciBhIFNldmVyaXR5IG1hcmtlciB0byBzdGFjayB3aXRoIHRoZSBTb2xpZGFyaXR5IGdyb3VwLlxyXG4gICAgICBpZDogJ0ExMk4gQXNzYXVsdCBGYWlsdXJlJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMUFGMicsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS5hc3NhdWx0Py5pbmNsdWRlcyhtYXRjaGVzLnRhcmdldCksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBibGFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnRGlkblxcJ3QgU3ByZWFkIScsXHJcbiAgICAgICAgICAgIGRlOiAnTmljaHQgdmVydGVpbHQhJyxcclxuICAgICAgICAgICAgZnI6ICdOZSBzXFwnZXN0IHBhcyBkaXNwZXJzw6koZSkgIScsXHJcbiAgICAgICAgICAgIGphOiAn5pWj6ZaL44GX44Gq44GL44Gj44GfIScsXHJcbiAgICAgICAgICAgIGNuOiAn5rKh5pyJ5pWj5byAIScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0ExMk4gQXNzYXVsdCBDbGVhbnVwJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzQ2MScgfSksXHJcbiAgICAgIGRlbGF5U2Vjb25kczogMjAsXHJcbiAgICAgIHN1cHByZXNzU2Vjb25kczogNSxcclxuICAgICAgcnVuOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgIGRlbGV0ZSBkYXRhLmFzc2F1bHQ7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5BbGFNaGlnbyxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnQWxhIE1oaWdvIE1hZ2l0ZWsgUmF5JzogJzI0Q0UnLCAvLyBMaW5lIEFvRSwgTGVnaW9uIFByZWRhdG9yIHRyYXNoLCBiZWZvcmUgYm9zcyAxXHJcbiAgICAnQWxhIE1oaWdvIExvY2sgT24nOiAnMjA0NycsIC8vIEhvbWluZyBjaXJjbGVzLCBib3NzIDFcclxuICAgICdBbGEgTWhpZ28gVGFpbCBMYXNlciAxJzogJzIwNDknLCAvLyBGcm9udGFsIGxpbmUgQW9FLCBib3NzIDFcclxuICAgICdBbGEgTWhpZ28gVGFpbCBMYXNlciAyJzogJzIwNEInLCAvLyBSZWFyIGxpbmUgQW9FLCBib3NzIDFcclxuICAgICdBbGEgTWhpZ28gVGFpbCBMYXNlciAzJzogJzIwNEMnLCAvLyBSZWFyIGxpbmUgQW9FLCBib3NzIDFcclxuICAgICdBbGEgTWhpZ28gU2hvdWxkZXIgQ2Fubm9uJzogJzI0RDAnLCAvLyBDaXJjbGUgQW9FLCBMZWdpb24gQXZlbmdlciB0cmFzaCwgYmVmb3JlIGJvc3MgMlxyXG4gICAgJ0FsYSBNaGlnbyBDYW5ub25maXJlJzogJzIzRUQnLCAvLyBFbnZpcm9ubWVudGFsIGNpcmNsZSBBb0UsIHBhdGggdG8gYm9zcyAyXHJcbiAgICAnQWxhIE1oaWdvIEFldGhlcm9jaGVtaWNhbCBHcmVuYWRvJzogJzIwNUEnLCAvLyBDaXJjbGUgQW9FLCBib3NzIDJcclxuICAgICdBbGEgTWhpZ28gSW50ZWdyYXRlZCBBZXRoZXJvbW9kdWxhdG9yJzogJzIwNUInLCAvLyBSaW5nIEFvRSwgYm9zcyAyXHJcbiAgICAnQWxhIE1oaWdvIENpcmNsZSBPZiBEZWF0aCc6ICcyNEQ0JywgLy8gUHJveGltaXR5IGNpcmNsZSBBb0UsIEhleGFkcm9uZSB0cmFzaCwgYmVmb3JlIGJvc3MgM1xyXG4gICAgJ0FsYSBNaGlnbyBFeGhhdXN0JzogJzI0RDMnLCAvLyBMaW5lIEFvRSwgTGVnaW9uIENvbG9zc3VzIHRyYXNoLCBiZWZvcmUgYm9zcyAzXHJcbiAgICAnQWxhIE1oaWdvIEdyYW5kIFN3b3JkJzogJzI0RDInLCAvLyBDb25hbCBBb0UsIExlZ2lvbiBDb2xvc3N1cyB0cmFzaCwgYmVmb3JlIGJvc3MgM1xyXG4gICAgJ0FsYSBNaGlnbyBBcnQgT2YgVGhlIFN0b3JtIDEnOiAnMjA2NicsIC8vIFByb3hpbWl0eSBjaXJjbGUgQW9FLCBwcmUtaW50ZXJtaXNzaW9uLCBib3NzIDNcclxuICAgICdBbGEgTWhpZ28gQXJ0IE9mIFRoZSBTdG9ybSAyJzogJzI1ODcnLCAvLyBQcm94aW1pdHkgY2lyY2xlIEFvRSwgaW50ZXJtaXNzaW9uLCBib3NzIDNcclxuICAgICdBbGEgTWhpZ28gVmVpbiBTcGxpdHRlciAxJzogJzI0QjYnLCAvLyBQcm94aW1pdHkgY2lyY2xlIEFvRSwgcHJpbWFyeSBlbnRpdHksIGJvc3MgM1xyXG4gICAgJ0FsYSBNaGlnbyBWZWluIFNwbGl0dGVyIDInOiAnMjA2QycsIC8vIFByb3hpbWl0eSBjaXJjbGUgQW9FLCBoZWxwZXIgZW50aXR5LCBib3NzIDNcclxuICAgICdBbGEgTWhpZ28gTGlnaHRsZXNzIFNwYXJrJzogJzIwNkInLCAvLyBDb25hbCBBb0UsIGJvc3MgM1xyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnQWxhIE1oaWdvIERlbWltYWdpY2tzJzogJzIwNUUnLFxyXG4gICAgJ0FsYSBNaGlnbyBVbm1vdmluZyBUcm9pa2EnOiAnMjA2MCcsXHJcbiAgICAnQWxhIE1oaWdvIEFydCBPZiBUaGUgU3dvcmQgMSc6ICcyMDY5JyxcclxuICAgICdBbGEgTWhpZ28gQXJ0IE9mIFRoZSBTd29yZCAyJzogJzI1ODknLFxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgLy8gSXQncyBwb3NzaWJsZSBwbGF5ZXJzIG1pZ2h0IGp1c3Qgd2FuZGVyIGludG8gdGhlIGJhZCBvbiB0aGUgb3V0c2lkZSxcclxuICAgICAgLy8gYnV0IG5vcm1hbGx5IHBlb3BsZSBnZXQgcHVzaGVkIGludG8gaXQuXHJcbiAgICAgIGlkOiAnQWxhIE1oaWdvIEFydCBPZiBUaGUgU3dlbGwnLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICAvLyBEYW1hZ2UgRG93blxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnMkI4JyB9KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuZWZmZWN0IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyLCBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gRm9yIHJlYXNvbnMgbm90IGNvbXBsZXRlbHkgdW5kZXJzdG9vZCBhdCB0aGUgdGltZSB0aGlzIHdhcyBtZXJnZWQsXHJcbi8vIGJ1dCBsaWtlbHkgcmVsYXRlZCB0byB0aGUgZmFjdCB0aGF0IG5vIG5hbWVwbGF0ZXMgYXJlIHZpc2libGUgZHVyaW5nIHRoZSBlbmNvdW50ZXIsXHJcbi8vIGFuZCB0aGF0IG5vdGhpbmcgaW4gdGhlIGVuY291bnRlciBhY3R1YWxseSBkb2VzIGRhbWFnZSxcclxuLy8gd2UgY2FuJ3QgdXNlIGRhbWFnZVdhcm4gb3IgZ2FpbnNFZmZlY3QgaGVscGVycyBvbiB0aGUgQmFyZGFtIGZpZ2h0LlxyXG4vLyBJbnN0ZWFkLCB3ZSB1c2UgdGhpcyBoZWxwZXIgZnVuY3Rpb24gdG8gbG9vayBmb3IgZmFpbHVyZSBmbGFncy5cclxuLy8gSWYgdGhlIGZsYWcgaXMgcHJlc2VudCxhIGZ1bGwgdHJpZ2dlciBvYmplY3QgaXMgcmV0dXJuZWQgdGhhdCBkcm9wcyBpbiBzZWFtbGVzc2x5LlxyXG5jb25zdCBhYmlsaXR5V2FybiA9IChhcmdzOiB7IGFiaWxpdHlJZDogc3RyaW5nOyBpZDogc3RyaW5nIH0pOiBPb3BzeVRyaWdnZXI8RGF0YT4gPT4ge1xyXG4gIGlmICghYXJncy5hYmlsaXR5SWQpXHJcbiAgICBjb25zb2xlLmVycm9yKCdNaXNzaW5nIGFiaWxpdHkgJyArIEpTT04uc3RyaW5naWZ5KGFyZ3MpKTtcclxuICBjb25zdCB0cmlnZ2VyOiBPb3BzeVRyaWdnZXI8RGF0YT4gPSB7XHJcbiAgICBpZDogYXJncy5pZCxcclxuICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6IGFyZ3MuYWJpbGl0eUlkIH0pLFxyXG4gICAgY29uZGl0aW9uOiAoX2RhdGEsIG1hdGNoZXMpID0+IG1hdGNoZXMuZmxhZ3Muc3Vic3RyKC0yKSA9PT0gJzBFJyxcclxuICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICB9LFxyXG4gIH07XHJcbiAgcmV0dXJuIHRyaWdnZXI7XHJcbn07XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuQmFyZGFtc01ldHRsZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnQmFyZGFtIERpcnR5IENsYXcnOiAnMjFBOCcsIC8vIEZyb250YWwgY2xlYXZlLCBHdWxvIEd1bG8gdHJhc2hcclxuICAgICdCYXJkYW0gRXBpZ3JhcGgnOiAnMjNBRicsIC8vIExpbmUgQW9FLCBXYWxsIG9mIEJhcmRhbSB0cmFzaFxyXG4gICAgJ0JhcmRhbSBUaGUgRHVzayBTdGFyJzogJzIxODcnLCAvLyBDaXJjbGUgQW9FLCBlbnZpcm9ubWVudCBiZWZvcmUgZmlyc3QgYm9zc1xyXG4gICAgJ0JhcmRhbSBUaGUgRGF3biBTdGFyJzogJzIxODYnLCAvLyBDaXJjbGUgQW9FLCBlbnZpcm9ubWVudCBiZWZvcmUgZmlyc3QgYm9zc1xyXG4gICAgJ0JhcmRhbSBDcnVtYmxpbmcgQ3J1c3QnOiAnMUYxMycsIC8vIENpcmNsZSBBb0VzLCBHYXJ1bGEsIGZpcnN0IGJvc3NcclxuICAgICdCYXJkYW0gUmFtIFJ1c2gnOiAnMUVGQycsIC8vIExpbmUgQW9FcywgU3RlcHBlIFlhbWFhLCBmaXJzdCBib3NzLlxyXG4gICAgJ0JhcmRhbSBMdWxsYWJ5JzogJzI0QjInLCAvLyBDaXJjbGUgQW9FcywgU3RlcHBlIFNoZWVwLCBmaXJzdCBib3NzLlxyXG4gICAgJ0JhcmRhbSBIZWF2ZSc6ICcxRUY3JywgLy8gRnJvbnRhbCBjbGVhdmUsIEdhcnVsYSwgZmlyc3QgYm9zc1xyXG4gICAgJ0JhcmRhbSBXaWRlIEJsYXN0ZXInOiAnMjRCMycsIC8vIEVub3Jtb3VzIGZyb250YWwgY2xlYXZlLCBTdGVwcGUgQ29ldXJsLCBmaXJzdCBib3NzXHJcbiAgICAnQmFyZGFtIERvdWJsZSBTbWFzaCc6ICcyNkEnLCAvLyBDaXJjbGUgQW9FLCBNZXR0bGluZyBEaGFyYSB0cmFzaFxyXG4gICAgJ0JhcmRhbSBUcmFuc29uaWMgQmxhc3QnOiAnMTI2MicsIC8vIENpcmNsZSBBb0UsIFN0ZXBwZSBFYWdsZSB0cmFzaFxyXG4gICAgJ0JhcmRhbSBXaWxkIEhvcm4nOiAnMjIwOCcsIC8vIEZyb250YWwgY2xlYXZlLCBLaHVuIEd1cnZlbCB0cmFzaFxyXG4gICAgJ0JhcmRhbSBIZWF2eSBTdHJpa2UgMSc6ICcyNTc4JywgLy8gMSBvZiAzIDI3MC1kZWdyZWUgcmluZyBBb0VzLCBCYXJkYW0sIHNlY29uZCBib3NzXHJcbiAgICAnQmFyZGFtIEhlYXZ5IFN0cmlrZSAyJzogJzI1NzknLCAvLyAyIG9mIDMgMjcwLWRlZ3JlZSByaW5nIEFvRXMsIEJhcmRhbSwgc2Vjb25kIGJvc3NcclxuICAgICdCYXJkYW0gSGVhdnkgU3RyaWtlIDMnOiAnMjU3QScsIC8vIDMgb2YgMyAyNzAtZGVncmVlIHJpbmcgQW9FcywgQmFyZGFtLCBzZWNvbmQgYm9zc1xyXG4gICAgJ0JhcmRhbSBUcmVtYmxvciAxJzogJzI1N0InLCAvLyAxIG9mIDIgY29uY2VudHJpYyByaW5nIEFvRXMsIEJhcmRhbSwgc2Vjb25kIGJvc3NcclxuICAgICdCYXJkYW0gVHJlbWJsb3IgMic6ICcyNTdDJywgLy8gMiBvZiAyIGNvbmNlbnRyaWMgcmluZyBBb0VzLCBCYXJkYW0sIHNlY29uZCBib3NzXHJcbiAgICAnQmFyZGFtIFRocm93aW5nIFNwZWFyJzogJzI1N0YnLCAvLyBDaGVja2VyYm9hcmQgQW9FLCBUaHJvd2luZyBTcGVhciwgc2Vjb25kIGJvc3NcclxuICAgICdCYXJkYW0gQmFyZGFtXFwncyBSaW5nJzogJzI1ODEnLCAvLyBEb251dCBBb0UgaGVhZG1hcmtlcnMsIEJhcmRhbSwgc2Vjb25kIGJvc3NcclxuICAgICdCYXJkYW0gQ29tZXQnOiAnMjU3RCcsIC8vIFRhcmdldGVkIGNpcmNsZSBBb0VzLCBCYXJkYW0sIHNlY29uZCBib3NzXHJcbiAgICAnQmFyZGFtIENvbWV0IEltcGFjdCc6ICcyNTgwJywgLy8gQ2lyY2xlIEFvRXMsIFN0YXIgU2hhcmQsIHNlY29uZCBib3NzXHJcbiAgICAnQmFyZGFtIElyb24gU3BoZXJlIEF0dGFjayc6ICcxNkI2JywgLy8gQ29udGFjdCBkYW1hZ2UsIElyb24gU3BoZXJlIHRyYXNoLCBiZWZvcmUgdGhpcmQgYm9zc1xyXG4gICAgJ0JhcmRhbSBUb3JuYWRvJzogJzI0N0UnLCAvLyBDaXJjbGUgQW9FLCBLaHVuIFNoYXZhcmEgdHJhc2hcclxuICAgICdCYXJkYW0gUGluaW9uJzogJzFGMTEnLCAvLyBMaW5lIEFvRSwgWW9sIEZlYXRoZXIsIHRoaXJkIGJvc3NcclxuICAgICdCYXJkYW0gRmVhdGhlciBTcXVhbGwnOiAnMUYwRScsIC8vIERhc2ggYXR0YWNrLCBZb2wsIHRoaXJkIGJvc3NcclxuICAgICdCYXJkYW0gRmx1dHRlcmZhbGwgVW50YXJnZXRlZCc6ICcxRjEyJywgLy8gUm90YXRpbmcgY2lyY2xlIEFvRXMsIFlvbCwgdGhpcmQgYm9zc1xyXG4gIH0sXHJcbiAgZ2FpbnNFZmZlY3RXYXJuOiB7XHJcbiAgICAnQmFyZGFtIENvbmZ1c2VkJzogJzBCJywgLy8gRmFpbGVkIGdhemUgYXR0YWNrLCBZb2wsIHRoaXJkIGJvc3NcclxuICB9LFxyXG4gIGdhaW5zRWZmZWN0RmFpbDoge1xyXG4gICAgJ0JhcmRhbSBGZXR0ZXJzJzogJzU2RicsIC8vIEZhaWxpbmcgdHdvIG1lY2hhbmljcyBpbiBhbnkgb25lIHBoYXNlIG9uIEJhcmRhbSwgc2Vjb25kIGJvc3MuXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdCYXJkYW0gR2FydWxhIFJ1c2gnOiAnMUVGOScsIC8vIExpbmUgQW9FLCBHYXJ1bGEsIGZpcnN0IGJvc3MuXHJcbiAgICAnQmFyZGFtIEZsdXR0ZXJmYWxsIFRhcmdldGVkJzogJzFGMEMnLCAvLyBDaXJjbGUgQW9FIGhlYWRtYXJrZXIsIFlvbCwgdGhpcmQgYm9zc1xyXG4gICAgJ0JhcmRhbSBXaW5nYmVhdCc6ICcxRjBGJywgLy8gQ29uYWwgQW9FIGhlYWRtYXJrZXIsIFlvbCwgdGhpcmQgYm9zc1xyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIC8vIDEgb2YgMyAyNzAtZGVncmVlIHJpbmcgQW9FcywgQmFyZGFtLCBzZWNvbmQgYm9zc1xyXG4gICAgYWJpbGl0eVdhcm4oeyBpZDogJ0JhcmRhbSBIZWF2eSBTdHJpa2UgMScsIGFiaWxpdHlJZDogJzI1NzgnIH0pLFxyXG4gICAgLy8gMiBvZiAzIDI3MC1kZWdyZWUgcmluZyBBb0VzLCBCYXJkYW0sIHNlY29uZCBib3NzXHJcbiAgICBhYmlsaXR5V2Fybih7IGlkOiAnQmFyZGFtIEhlYXZ5IFN0cmlrZSAyJywgYWJpbGl0eUlkOiAnMjU3OScgfSksXHJcbiAgICAvLyAzIG9mIDMgMjcwLWRlZ3JlZSByaW5nIEFvRXMsIEJhcmRhbSwgc2Vjb25kIGJvc3NcclxuICAgIGFiaWxpdHlXYXJuKHsgaWQ6ICdCYXJkYW0gSGVhdnkgU3RyaWtlIDMnLCBhYmlsaXR5SWQ6ICcyNTdBJyB9KSxcclxuICAgIC8vIDEgb2YgMiBjb25jZW50cmljIHJpbmcgQW9FcywgQmFyZGFtLCBzZWNvbmQgYm9zc1xyXG4gICAgYWJpbGl0eVdhcm4oeyBpZDogJ0JhcmRhbSBUcmVtYmxvciAxJywgYWJpbGl0eUlkOiAnMjU3QicgfSksXHJcbiAgICAvLyAyIG9mIDIgY29uY2VudHJpYyByaW5nIEFvRXMsIEJhcmRhbSwgc2Vjb25kIGJvc3NcclxuICAgIGFiaWxpdHlXYXJuKHsgaWQ6ICdCYXJkYW0gVHJlbWJsb3IgMicsIGFiaWxpdHlJZDogJzI1N0MnIH0pLFxyXG4gICAgLy8gQ2hlY2tlcmJvYXJkIEFvRSwgVGhyb3dpbmcgU3BlYXIsIHNlY29uZCBib3NzXHJcbiAgICBhYmlsaXR5V2Fybih7IGlkOiAnQmFyZGFtIFRocm93aW5nIFNwZWFyJywgYWJpbGl0eUlkOiAnMjU3RicgfSksXHJcbiAgICAvLyBHYXplIGF0dGFjaywgV2FycmlvciBvZiBCYXJkYW0sIHNlY29uZCBib3NzXHJcbiAgICBhYmlsaXR5V2Fybih7IGlkOiAnQmFyZGFtIEVtcHR5IEdhemUnLCBhYmlsaXR5SWQ6ICcxRjA0JyB9KSxcclxuICAgIC8vIERvbnV0IEFvRSBoZWFkbWFya2VycywgQmFyZGFtLCBzZWNvbmQgYm9zc1xyXG4gICAgYWJpbGl0eVdhcm4oeyBpZDogJ0JhcmRhbVxcJ3MgUmluZycsIGFiaWxpdHlJZDogJzI1ODEnIH0pLFxyXG4gICAgLy8gVGFyZ2V0ZWQgY2lyY2xlIEFvRXMsIEJhcmRhbSwgc2Vjb25kIGJvc3NcclxuICAgIGFiaWxpdHlXYXJuKHsgaWQ6ICdCYXJkYW0gQ29tZXQnLCBhYmlsaXR5SWQ6ICcyNTdEJyB9KSxcclxuICAgIC8vIENpcmNsZSBBb0VzLCBTdGFyIFNoYXJkLCBzZWNvbmQgYm9zc1xyXG4gICAgYWJpbGl0eVdhcm4oeyBpZDogJ0JhcmRhbSBDb21ldCBJbXBhY3QnLCBhYmlsaXR5SWQ6ICcyNTgwJyB9KSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZURyb3duZWRDaXR5T2ZTa2FsbGEsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0h5ZHJvY2Fubm9uJzogJzI2OTcnLCAvLyBMaW5lIEFvRSwgU2FsdCBTd2FsbG93IHRyYXNoLCBiZWZvcmUgYm9zcyAxXHJcbiAgICAnU3RhZ25hbnQgU3ByYXknOiAnMjY5OScsIC8vIENvbmFsIEFvRSwgU2thbGxhIE5hbmthIHRyYXNoLCBiZWZvcmUgYm9zcyAxXHJcblxyXG4gICAgJ0J1YmJsZSBCdXJzdCc6ICcyNjFCJywgLy8gQnViYmxlIGV4cGxvc2lvbiwgSHlkcm9zcGhlcmUsIGJvc3MgMVxyXG5cclxuICAgICdQbGFpbiBQb3VuZCc6ICcyNjlBJywgLy8gTGFyZ2UgY2lyY2xlIEFvRSwgRGhhcmEgU2VudGluZWwgdHJhc2gsIGJlZm9yZSBib3NzIDJcclxuICAgICdCb3VsZGVyIFRvc3MnOiAnMjY5QicsIC8vIFNtYWxsIGNpcmNsZSBBb0UsIFN0b25lIFBob2ViYWQgdHJhc2gsIGJlZm9yZSBib3NzIDJcclxuICAgICdMYW5kc2xpcCc6ICcyNjlDJywgLy8gQ29uYWwgQW9FLCBTdG9uZSBQaG9lYmFkIHRyYXNoLCBiZWZvcmUgYm9zcyAyXHJcblxyXG4gICAgJ015c3RpYyBMaWdodCc6ICcyNjU3JywgLy8gQ29uYWwgQW9FLCBUaGUgT2xkIE9uZSwgYm9zcyAyXHJcbiAgICAnTXlzdGljIEZsYW1lJzogJzI2NTknLCAvLyBMYXJnZSBjaXJjbGUgQW9FLCBUaGUgT2xkIE9uZSwgYm9zcyAyLiAyNjU4IGlzIHRoZSBjYXN0LXRpbWUgYWJpbGl0eS5cclxuXHJcbiAgICAnRGFyayBJSSc6ICcxMTBFJywgLy8gVGhpbiBjb25lIEFvRSwgTGlnaHRsZXNzIEhvbXVuY3VsdXMgdHJhc2gsIGFmdGVyIGJvc3MgMlxyXG4gICAgJ0ltcGxvc2l2ZSBDdXJzZSc6ICcyNjlFJywgLy8gQ29uYWwgQW9FLCBaYW5nYmV0byB0cmFzaCwgYWZ0ZXIgYm9zcyAyXHJcbiAgICAnVW5keWluZyBGSXJlJzogJzI2OUYnLCAvLyBDaXJjbGUgQW9FLCBaYW5nYmV0byB0cmFzaCwgYWZ0ZXIgYm9zcyAyXHJcbiAgICAnRmlyZSBJSSc6ICcyNkEwJywgLy8gQ2lyY2xlIEFvRSwgQWNjdXJzZWQgSWRvbCB0cmFzaCwgYWZ0ZXIgYm9zcyAyXHJcblxyXG4gICAgJ1J1c3RpbmcgQ2xhdyc6ICcyNjYxJywgLy8gRnJvbnRhbCBjbGVhdmUsIEhyb2RyaWMgUG9pc29udG9uZ3VlLCBib3NzIDNcclxuICAgICdXb3JkcyBPZiBXb2UnOiAnMjY2MicsIC8vIEV5ZSBsYXNlcnMsIEhyb2RyaWMgUG9pc29udG9uZ3VlLCBib3NzIDNcclxuICAgICdUYWlsIERyaXZlJzogJzI2NjMnLCAvLyBSZWFyIGNsZWF2ZSwgSHJvZHJpYyBQb2lzb250b25ndWUsIGJvc3MgM1xyXG4gICAgJ1JpbmcgT2YgQ2hhb3MnOiAnMjY2NycsIC8vIFJpbmcgaGVhZG1hcmtlciwgSHJvZHJpYyBQb2lzb250b25ndWUsIGJvc3MgM1xyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ1NlbGYtRGV0b25hdGUnOiAnMjY1QycsIC8vIFJvb213aWRlIGV4cGxvc2lvbiwgU3Vic2VydmllbnQsIGJvc3MgMlxyXG4gIH0sXHJcbiAgZ2FpbnNFZmZlY3RXYXJuOiB7XHJcbiAgICAnRHJvcHN5JzogJzExQicsIC8vIFN0YW5kaW5nIGluIEJsb29keSBQdWRkbGVzLCBvciBiZWluZyBrbm9ja2VkIG91dHNpZGUgdGhlIGFyZW5hLCBib3NzIDFcclxuICAgICdDb25mdXNlZCc6ICcwQicsIC8vIEZhaWxpbmcgdGhlIGdhemUgYXR0YWNrLCBib3NzIDNcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0Jsb29keSBQdWRkbGUnOiAnMjY1NScsIC8vIExhcmdlIHdhdGVyeSBzcHJlYWQgY2lyY2xlcywgS2VscGllLCBib3NzIDFcclxuICAgICdDcm9zcyBPZiBDaGFvcyc6ICcyNjY4JywgLy8gQ3Jvc3MgaGVhZG1hcmtlciwgSHJvZHJpYyBQb2lzb250b25ndWUsIGJvc3MgM1xyXG4gICAgJ0NpcmNsZSBPZiBDaGFvcyc6ICcyNjY5JywgLy8gU3ByZWFkIGNpcmNsZSBoZWFkbWFya2VyLCBIcm9kcmljIFBvaXNvbnRvbmd1ZSwgYm9zcyAzXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkt1Z2FuZUNhc3RsZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnS3VnYW5lIENhc3RsZSBUZW5rYSBHb2trZW4nOiAnMjMyOScsIC8vIEZyb250YWwgY29uZSBBb0UsICBKb2kgQmxhZGUgdHJhc2gsIGJlZm9yZSBib3NzIDFcclxuICAgICdLdWdhbmUgQ2FzdGxlIEtlbmtpIFJlbGVhc2UgVHJhc2gnOiAnMjMzMCcsIC8vIENoYXJpb3QgQW9FLCBKb2kgS2l5b2Z1c2EgdHJhc2gsIGJlZm9yZSBib3NzIDFcclxuXHJcbiAgICAnS3VnYW5lIENhc3RsZSBDbGVhcm91dCc6ICcxRTkyJywgLy8gRnJvbnRhbCBjb25lIEFvRSwgWnVpa28tTWFydSwgYm9zcyAxXHJcbiAgICAnS3VnYW5lIENhc3RsZSBIYXJhLUtpcmkgMSc6ICcxRTk2JywgLy8gR2lhbnQgY2lyY2xlIEFvRSwgSGFyYWtpcmkgS29zaG8sIGJvc3MgMVxyXG4gICAgJ0t1Z2FuZSBDYXN0bGUgSGFyYS1LaXJpIDInOiAnMjRGOScsIC8vIEdpYW50IGNpcmNsZSBBb0UsIEhhcmFraXJpIEtvc2hvLCBib3NzIDFcclxuXHJcbiAgICAnS3VnYW5lIENhc3RsZSBKdWppIFNodXJpa2VuIDEnOiAnMjMyRCcsIC8vIExpbmUgQW9FLCBLYXJha3VyaSBPbm1pdHN1IHRyYXNoLCBiZWZvcmUgYm9zcyAyXHJcbiAgICAnS3VnYW5lIENhc3RsZSAxMDAwIEJhcmJzJzogJzIxOTgnLCAvLyBMaW5lIEFvRSwgSm9pIEtvamEgdHJhc2gsIGJlZm9yZSBib3NzIDJcclxuXHJcbiAgICAnS3VnYW5lIENhc3RsZSBKdWppIFNodXJpa2VuIDInOiAnMUU5OCcsIC8vIExpbmUgQW9FLCBEb2p1biBNYXJ1LCBib3NzIDJcclxuICAgICdLdWdhbmUgQ2FzdGxlIFRhdGFtaS1HYWVzaGknOiAnMUU5RCcsIC8vIEZsb29yIHRpbGUgbGluZSBhdHRhY2ssIEVsa2l0ZSBPbm1pdHN1LCBib3NzIDJcclxuICAgICdLdWdhbmUgQ2FzdGxlIEp1amkgU2h1cmlrZW4gMyc6ICcxRUEwJywgLy8gTGluZSBBb0UsIEVsaXRlIE9ubWl0c3UsIGJvc3MgMlxyXG5cclxuICAgICdLdWdhbmUgQ2FzdGxlIEF1dG8gQ3Jvc3Nib3cnOiAnMjMzMycsIC8vIEZyb250YWwgY29uZSBBb0UsIEthcmFrdXJpIEhhbnlhIHRyYXNoLCBhZnRlciBib3NzIDJcclxuICAgICdLdWdhbmUgQ2FzdGxlIEhhcmFraXJpIDMnOiAnMjNDOScsIC8vIEdpYW50IENpcmNsZSBBb0UsIEhhcmFraXJpICBIYW55YSB0cmFzaCwgYWZ0ZXIgYm9zcyAyXHJcblxyXG4gICAgJ0t1Z2FuZSBDYXN0bGUgSWFpLUdpcmknOiAnMUVBMicsIC8vIENoYXJpb3QgQW9FLCBZb2ppbWJvLCBib3NzIDNcclxuICAgICdLdWdhbmUgQ2FzdGxlIEZyYWdpbGl0eSc6ICcxRUFBJywgLy8gQ2hhcmlvdCBBb0UsIElub3NoaWthY2hvLCBib3NzIDNcclxuICAgICdLdWdhbmUgQ2FzdGxlIERyYWdvbmZpcmUnOiAnMUVBQicsIC8vIExpbmUgQW9FLCBEcmFnb24gSGVhZCwgYm9zcyAzXHJcbiAgfSxcclxuXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnS3VnYW5lIENhc3RsZSBJc3Nlbic6ICcxRTk3JywgLy8gSW5zdGFudCBmcm9udGFsIGNsZWF2ZSwgRG9qdW4gTWFydSwgYm9zcyAyXHJcbiAgICAnS3VnYW5lIENhc3RsZSBDbG9ja3dvcmsgUmFpdG9uJzogJzFFOUInLCAvLyBMYXJnZSBsaWdodG5pbmcgc3ByZWFkIGNpcmNsZXMsIERvanVuIE1hcnUsIGJvc3MgMlxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgLy8gU3RhY2sgbWFya2VyLCBadWlrbyBNYXJ1LCBib3NzIDFcclxuICAgICAgaWQ6ICdLdWdhbmUgQ2FzdGxlIEhlbG0gQ3JhY2snLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzFFOTQnIH0pLFxyXG4gICAgICBjb25kaXRpb246IChfZGF0YSwgbWF0Y2hlcykgPT4gbWF0Y2hlcy50eXBlID09PSAnMjEnLCAvLyBUYWtpbmcgdGhlIHN0YWNrIHNvbG8gaXMgKnByb2JhYmx5KiBhIG1pc3Rha2UuXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBibGFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiBgJHttYXRjaGVzLmFiaWxpdHl9IChhbG9uZSlgLFxyXG4gICAgICAgICAgICBkZTogYCR7bWF0Y2hlcy5hYmlsaXR5fSAoYWxsZWluKWAsXHJcbiAgICAgICAgICAgIGZyOiBgJHttYXRjaGVzLmFiaWxpdHl9IChzZXVsKGUpKWAsXHJcbiAgICAgICAgICAgIGphOiBgJHttYXRjaGVzLmFiaWxpdHl9ICjkuIDkuropYCxcclxuICAgICAgICAgICAgY246IGAke21hdGNoZXMuYWJpbGl0eX0gKOWNleWQgylgLFxyXG4gICAgICAgICAgICBrbzogYCR7bWF0Y2hlcy5hYmlsaXR5fSAo7Zi87J6QIOunnuydjClgLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZVNpcmVuc29uZ1NlYSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnU2lyZW5zb25nIEFuY2llbnQgWW1pciBIZWFkIFNuYXRjaCc6ICcyMzUzJywgLy8gZnJvbnRhbCBjb25hbFxyXG4gICAgJ1NpcmVuc29uZyBSZWZsZWN0aW9uIG9mIEthcmxhYm9zIFRhaWwgU2NyZXcnOiAnMTJCNycsIC8vIHRhcmdldGVkIGNpcmNsZVxyXG4gICAgJ1NpcmVuc29uZyBMdWdhdCBBbW9ycGhvdXMgQXBwbGF1c2UnOiAnMUY1NicsIC8vIGZyb250YWwgMTgwIGNsZWF2ZVxyXG4gICAgJ1NpcmVuc29uZyBMdWdhdCBDb25jdXNzaXZlIE9zY2lsbGF0aW9uJzogJzFGNUInLCAvLyA1IG9yIDcgY2lyY2xlc1xyXG4gICAgJ1NpcmVuc29uZyBUaGUgSmFuZSBHdXkgQmFsbCBvZiBNYWxpY2UnOiAnMUY2QScsIC8vIGFtYmllbnQgY2Fubm9uIGNpcmNsZVxyXG4gICAgJ1NpcmVuc29uZyBEYXJrJzogJzE5REYnLCAvLyBTa2lubGVzcyBTa2lwcGVyIC8gRmxlc2hsZXNzIENhcHRpdmUgdGFyZ2V0ZWQgY2lyY2xlXHJcbiAgICAnU2lyZW5zb25nIFRoZSBHb3Zlcm5vciBTaGFkb3dzdHJpa2UnOiAnMUY1RCcsIC8vIHN0YW5kaW5nIGluIHNoYWRvd3NcclxuICAgICdTaXJlbnNvbmcgVW5kZWFkIFdhcmRlbiBNYXJjaCBvZiB0aGUgRGVhZCc6ICcyMzUxJywgLy8gZnJvbnRhbCBjb25hbFxyXG4gICAgJ1NpcmVuc29uZyBGbGVzaGxlc3MgQ2FwdGl2ZSBGbG9vZCc6ICcyMThCJywgLy8gY2VudGVyZWQgY2lyY2xlIGFmdGVyIHNlZHVjdGl2ZSBzY3JlYW1cclxuICAgICdTaXJlbnNvbmcgTG9yZWxlaSBWb2lkIFdhdGVyIElJSSc6ICcxRjY4JywgLy8gbGFyZ2UgdGFyZ2V0ZWQgY2lyY2xlXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5TYWludE1vY2lhbm5lc0FyYm9yZXR1bUhhcmQsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ1N0IE1vY2lhbm5lIEhhcmQgTXVkc3RyZWFtJzogJzMwRDknLCAvLyBUYXJnZXRlZCBjaXJjbGUgQW9FLCBJbW1hY3VsYXRlIEFwYSB0cmFzaCwgYmVmb3JlIGJvc3MgMVxyXG4gICAgJ1N0IE1vY2lhbm5lIEhhcmQgU2lsa2VuIFNwcmF5JzogJzMzODUnLCAvLyBSZWFyIGNvbmUgQW9FLCBXaXRoZXJlZCBCZWxsYWRvbm5hIHRyYXNoLCBiZWZvcmUgYm9zcyAxXHJcbiAgICAnU3QgTW9jaWFubmUgSGFyZCBNdWRkeSBQdWRkbGVzJzogJzMwREEnLCAvLyBTbWFsbCB0YXJnZXRlZCBjaXJjbGUgQW9FcywgRG9ycG9ra3VyIHRyYXNoLCBiZWZvcmUgYm9zcyAxXHJcbiAgICAnU3QgTW9jaWFubmUgSGFyZCBPZGlvdXMgQWlyJzogJzJFNDknLCAvLyBGcm9udGFsIGNvbmUgQW9FLCBOdWxsY2h1LCBib3NzIDFcclxuICAgICdTdCBNb2NpYW5uZSBIYXJkIFNMdWRnZSBCb21iJzogJzJFNEUnLCAvLyBUYXJnZXRlZCBjaXJjbGUgQW9FcywgTnVsbGNodSwgYm9zcyAxXHJcbiAgICAnU3QgTW9jaWFubmUgSGFyZCBPZGlvdXMgQXRtb3NwaGVyZSc6ICcyRTUxJywgLy8gQ2hhbm5lbGVkIDMvNCBhcmVuYSBjbGVhdmUsIE51bGxjaHUsIGJvc3MgMVxyXG4gICAgJ1N0IE1vY2lhbm5lIEhhcmQgQ3JlZXBpbmcgSXZ5JzogJzMxQTUnLCAvLyBGcm9udGFsIGNvbmUgQW9FLCBXaXRoZXJlZCBLdWxhayB0cmFzaCwgYmVmb3JlIGJvc3MgMlxyXG4gICAgJ1N0IE1vY2lhbm5lIEhhcmQgUm9ja3NsaWRlJzogJzMxMzQnLCAvLyBMaW5lIEFvRSwgU2lsdCBHb2xlbSwgYm9zcyAyXHJcbiAgICAnU3QgTW9jaWFubmUgSGFyZCBFYXJ0aHF1YWtlIElubmVyJzogJzMxMkUnLCAvLyBDaGFyaW90IEFvRSwgTGFraGFtdSwgYm9zcyAyXHJcbiAgICAnU3QgTW9jaWFubmUgSGFyZCBFYXJ0aHF1YWtlIE91dGVyJzogJzMxMkYnLCAvLyBEeW5hbW8gQW9FLCBMYWtoYW11LCBib3NzIDJcclxuICAgICdTdCBNb2NpYW5uZSBIYXJkIEVtYmFsbWluZyBFYXJ0aCc6ICczMUE2JywgLy8gTGFyZ2UgQ2hhcmlvdCBBb0UsIE11ZGR5IE1hdGEsIGFmdGVyIGJvc3MgMlxyXG4gICAgJ1N0IE1vY2lhbm5lIEhhcmQgUXVpY2ttaXJlJzogJzMxMzYnLCAvLyBTZXdhZ2Ugc3VyZ2UgYXZvaWRlZCBvbiBwbGF0Zm9ybXMsIFRva2thcGNoaSwgYm9zcyAzXHJcbiAgICAnU3QgTW9jaWFubmUgSGFyZCBRdWFnbWlyZSBQbGF0Zm9ybXMnOiAnMzEzOScsIC8vIFF1YWdtaXJlIGV4cGxvc2lvbiBvbiBwbGF0Zm9ybXMsIFRva2thcGNoaSwgYm9zcyAzXHJcbiAgICAnU3QgTW9jaWFubmUgSGFyZCBGZWN1bGVudCBGbG9vZCc6ICczMTNDJywgLy8gVGFyZ2V0ZWQgdGhpbiBjb25lIEFvRSwgVG9ra2FwY2hpLCBib3NzIDNcclxuICAgICdTdCBNb2NpYW5uZSBIYXJkIENvcnJ1cHR1cmUnOiAnMzNBMCcsIC8vIE11ZCBTbGltZSBleHBsb3Npb24sIGJvc3MgMy4gKE5vIGV4cGxvc2lvbiBpZiBkb25lIGNvcnJlY3RseS4pXHJcbiAgfSxcclxuICBnYWluc0VmZmVjdFdhcm46IHtcclxuICAgICdTdCBNb2NpYW5uZSBIYXJkIFNlZHVjZWQnOiAnM0RGJywgLy8gR2F6ZSBmYWlsdXJlLCBXaXRoZXJlZCBCZWxsYWRvbm5hIHRyYXNoLCBiZWZvcmUgYm9zcyAxXHJcbiAgICAnU3QgTW9jaWFubmUgSGFyZCBQb2xsZW4nOiAnMTMnLCAvLyBTbHVkZ2UgcHVkZGxlcywgTnVsbGNodSwgYm9zcyAxXHJcbiAgICAnU3QgTW9jaWFubmUgSGFyZCBUcmFuc2ZpZ3VyYXRpb24nOiAnNjQ4JywgLy8gUm9seS1Qb2x5IEFvRSBjaXJjbGUgZmFpbHVyZSwgQkxvb21pbmcgQmlsb2tvIHRyYXNoLCBiZWZvcmUgYm9zcyAyXHJcbiAgICAnU3QgTW9jaWFubmUgSGFyZCBIeXN0ZXJpYSc6ICcxMjgnLCAvLyBHYXplIGZhaWx1cmUsIExha2hhbXUsIGJvc3MgMlxyXG4gICAgJ1N0IE1vY2lhbm5lIEhhcmQgU3RhYiBXb3VuZCc6ICc0NUQnLCAvLyBBcmVuYSBvdXRlciB3YWxsIGVmZmVjdCwgYm9zcyAyXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdTdCBNb2NpYW5uZSBIYXJkIFRhcHJvb3QnOiAnMkU0QycsIC8vIExhcmdlIG9yYW5nZSBzcHJlYWQgY2lyY2xlcywgTnVsbGNodSwgYm9zcyAxXHJcbiAgICAnU3QgTW9jaWFubmUgSGFyZCBFYXJ0aCBTaGFrZXInOiAnMzEzMScsIC8vIEVhcnRoIFNoYWtlciwgTGFraGFtdSwgYm9zcyAyXHJcbiAgfSxcclxuICBzb2xvRmFpbDoge1xyXG4gICAgJ1N0IE1vY2lhbm5lIEhhcmQgRmF1bHQgV2FycmVuJzogJzJFNEEnLCAvLyBTdGFjayBtYXJrZXIsIE51bGxjaHUsIGJvc3MgMVxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVTd2FsbG93c0NvbXBhc3MsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ1N3YWxsb3dzIENvbXBhc3MgSXZ5IEZldHRlcnMnOiAnMkMwNCcsIC8vIENpcmNsZSBncm91bmQgQW9FLCBTYWkgVGFpc3VpIHRyYXNoLCBiZWZvcmUgYm9zcyAxXHJcbiAgICAnU3dhbGxvd3MgQ29tcGFzcyBXaWxkc3dpbmQgMSc6ICcyQzA1JywgLy8gVG9ybmFkbyBncm91bmQgQW9FLCBwbGFjZWQgYnkgU2FpIFRhaXN1aSB0cmFzaCwgYmVmb3JlIGJvc3MgMVxyXG5cclxuICAgICdTd2FsbG93cyBDb21wYXNzIFlhbWEtS2FndXJhJzogJzJCOTYnLCAvLyBGcm9udGFsIGxpbmUgQW9FLCBPdGVuZ3UsIGJvc3MgMVxyXG4gICAgJ1N3YWxsb3dzIENvbXBhc3MgRmxhbWVzIE9mIEhhdGUnOiAnMkI5OCcsIC8vIEZpcmUgb3JiIGV4cGxvc2lvbnMsIGJvc3MgMVxyXG4gICAgJ1N3YWxsb3dzIENvbXBhc3MgQ29uZmxhZ3JhdGUnOiAnMkI5OScsIC8vIENvbGxpc2lvbiB3aXRoIGZpcmUgb3JiLCBib3NzIDFcclxuXHJcbiAgICAnU3dhbGxvd3MgQ29tcGFzcyBVcHdlbGwnOiAnMkMwNicsIC8vIFRhcmdldGVkIGNpcmNsZSBncm91bmQgQW9FLCBTYWkgVGFpc3VpIHRyYXNoLCBiZWZvcmUgYm9zcyAyXHJcbiAgICAnU3dhbGxvd3MgQ29tcGFzcyBCYWQgQnJlYXRoJzogJzJDMDcnLCAvLyBGcm9udGFsIGNsZWF2ZSwgSmlubWVuanUgdHJhc2gsIGJlZm9yZSBib3NzIDJcclxuXHJcbiAgICAnU3dhbGxvd3MgQ29tcGFzcyBHcmVhdGVyIFBhbG0gMSc6ICcyQjlEJywgLy8gSGFsZiBhcmVuYSByaWdodCBjbGVhdmUsIERhaWRhcmFib3RjaGksIGJvc3MgMlxyXG4gICAgJ1N3YWxsb3dzIENvbXBhc3MgR3JlYXRlciBQYWxtIDInOiAnMkI5RScsIC8vIEhhbGYgYXJlbmEgbGVmdCBjbGVhdmUsIERhaWRhcmFib3RjaGksIGJvc3MgMlxyXG4gICAgJ1N3YWxsb3dzIENvbXBhc3MgVHJpYnV0YXJ5JzogJzJCQTAnLCAvLyBUYXJnZXRlZCB0aGluIGNvbmFsIGdyb3VuZCBBb0VzLCBEYWlkYXJhYm90Y2hpLCBib3NzIDJcclxuXHJcbiAgICAnU3dhbGxvd3MgQ29tcGFzcyBXaWxkc3dpbmQgMic6ICcyQzA2JywgLy8gQ2lyY2xlIGdyb3VuZCBBb0UsIGVudmlyb25tZW50LCBhZnRlciBib3NzIDJcclxuICAgICdTd2FsbG93cyBDb21wYXNzIFdpbGRzd2luZCAzJzogJzJDMDcnLCAvLyBDaXJjbGUgZ3JvdW5kIEFvRSwgcGxhY2VkIGJ5IFNhaSBUYWlzdWkgdHJhc2gsIGFmdGVyIGJvc3MgMlxyXG4gICAgJ1N3YWxsb3dzIENvbXBhc3MgRmlsb3BsdW1lcyc6ICcyQzc2JywgLy8gRnJvbnRhbCByZWN0YW5nbGUgQW9FLCBEcmFnb24gQmkgRmFuZyB0cmFzaCwgYWZ0ZXIgYm9zcyAyXHJcblxyXG4gICAgJ1N3YWxsb3dzIENvbXBhc3MgQm90aCBFbmRzIDEnOiAnMkJBOCcsIC8vIENoYXJpb3QgQW9FLCBRaXRpYW4gRGFzaGVuZywgYm9zcyAzXHJcbiAgICAnU3dhbGxvd3MgQ29tcGFzcyBCb3RoIEVuZHMgMic6ICcyQkE5JywgLy8gRHluYW1vIEFvRSwgUWl0aWFuIERhc2hlbmcsIGJvc3MgM1xyXG4gICAgJ1N3YWxsb3dzIENvbXBhc3MgQm90aCBFbmRzIDMnOiAnMkJBRScsIC8vIENoYXJpb3QgQW9FLCBTaGFkb3cgT2YgVGhlIFNhZ2UsIGJvc3MgM1xyXG4gICAgJ1N3YWxsb3dzIENvbXBhc3MgQm90aCBFbmRzIDQnOiAnMkJBRicsIC8vIER5bmFtbyBBb0UsIFNoYWRvdyBPZiBUaGUgU2FnZSwgYm9zcyAzXHJcbiAgICAnU3dhbGxvd3MgQ29tcGFzcyBFcXVhbCBPZiBIZWF2ZW4nOiAnMkJCNCcsIC8vIFNtYWxsIGNpcmNsZSBncm91bmQgQW9FcywgUWl0aWFuIERhc2hlbmcsIGJvc3MgM1xyXG4gIH0sXHJcbiAgZ2FpbnNFZmZlY3RXYXJuOiB7XHJcbiAgICAnU3dhbGxvd3MgQ29tcGFzcyBIeXN0ZXJpYSc6ICcxMjgnLCAvLyBHYXplIGF0dGFjayBmYWlsdXJlLCBPdGVuZ3UsIGJvc3MgMVxyXG4gICAgJ1N3YWxsb3dzIENvbXBhc3MgQmxlZWRpbmcnOiAnMTEyRicsIC8vIFN0ZXBwaW5nIG91dHNpZGUgdGhlIGFyZW5hLCBib3NzIDNcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ1N3YWxsb3dzIENvbXBhc3MgTWlyYWdlJzogJzJCQTInLCAvLyBQcmV5LWNoYXNpbmcgcHVkZGxlcywgRGFpZGFyYWJvdGNoaSwgYm9zcyAyXHJcbiAgICAnU3dhbGxvd3MgQ29tcGFzcyBNb3VudGFpbiBGYWxscyc6ICcyQkE1JywgLy8gQ2lyY2xlIHNwcmVhZCBtYXJrZXJzLCBEYWlkYXJhYm90Y2hpLCBib3NzIDJcclxuICAgICdTd2FsbG93cyBDb21wYXNzIFRoZSBMb25nIEVuZCc6ICcyQkE3JywgLy8gTGFzZXIgdGV0aGVyLCBRaXRpYW4gRGFzaGVuZyAgYm9zcyAzXHJcbiAgICAnU3dhbGxvd3MgQ29tcGFzcyBUaGUgTG9uZyBFbmQgMic6ICcyQkFEJywgLy8gTGFzZXIgVGV0aGVyLCBTaGFkb3dzIE9mIFRoZSBTYWdlLCBib3NzIDNcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIC8vIFN0YW5kaW5nIGluIHRoZSBsYWtlLCBEaWFkYXJhYm90Y2hpLCBib3NzIDJcclxuICAgICAgaWQ6ICdTd2FsbG93cyBDb21wYXNzIFNpeCBGdWxtcyBVbmRlcicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICcyMzcnIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDogbWF0Y2hlcy5lZmZlY3QsXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIFN0YWNrIG1hcmtlciwgYm9zcyAzXHJcbiAgICAgIGlkOiAnU3dhbGxvd3MgQ29tcGFzcyBGaXZlIEZpbmdlcmVkIFB1bmlzaG1lbnQnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogWycyQkFCJywgJzJCQjAnXSwgc291cmNlOiBbJ1FpdGlhbiBEYXNoZW5nJywgJ1NoYWRvdyBPZiBUaGUgU2FnZSddIH0pLFxyXG4gICAgICBjb25kaXRpb246IChfZGF0YSwgbWF0Y2hlcykgPT4gbWF0Y2hlcy50eXBlID09PSAnMjEnLCAvLyBUYWtpbmcgdGhlIHN0YWNrIHNvbG8gaXMgKnByb2JhYmx5KiBhIG1pc3Rha2UuXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBibGFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiBgJHttYXRjaGVzLmFiaWxpdHl9IChhbG9uZSlgLFxyXG4gICAgICAgICAgICBkZTogYCR7bWF0Y2hlcy5hYmlsaXR5fSAoYWxsZWluKWAsXHJcbiAgICAgICAgICAgIGZyOiBgJHttYXRjaGVzLmFiaWxpdHl9IChzZXVsKGUpKWAsXHJcbiAgICAgICAgICAgIGphOiBgJHttYXRjaGVzLmFiaWxpdHl9ICjkuIDkuropYCxcclxuICAgICAgICAgICAgY246IGAke21hdGNoZXMuYWJpbGl0eX0gKOWNleWQgylgLFxyXG4gICAgICAgICAgICBrbzogYCR7bWF0Y2hlcy5hYmlsaXR5fSAo7Zi87J6QIOunnuydjClgLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZVRlbXBsZU9mVGhlRmlzdCxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnVGVtcGxlIEZpcmUgQnJlYWsnOiAnMjFFRCcsIC8vIENvbmFsIEFvRSwgQmxvb2RnbGlkZXIgTW9uayB0cmFzaFxyXG4gICAgJ1RlbXBsZSBSYWRpYWwgQmxhc3Rlcic6ICcxRkQzJywgLy8gQ2lyY2xlIEFvRSwgYm9zcyAxXHJcbiAgICAnVGVtcGxlIFdpZGUgQmxhc3Rlcic6ICcxRkQ0JywgLy8gQ29uYWwgQW9FLCBib3NzIDFcclxuICAgICdUZW1wbGUgQ3JpcHBsaW5nIEJsb3cnOiAnMjAxNicsIC8vIExpbmUgQW9FcywgZW52aXJvbm1lbnRhbCwgYmVmb3JlIGJvc3MgMlxyXG4gICAgJ1RlbXBsZSBCcm9rZW4gRWFydGgnOiAnMjM2RScsIC8vIENpcmNsZSBBb0UsIFNpbmdoYSB0cmFzaFxyXG4gICAgJ1RlbXBsZSBTaGVhcic6ICcxRkREJywgLy8gRHVhbCBjb25hbCBBb0UsIGJvc3MgMlxyXG4gICAgJ1RlbXBsZSBDb3VudGVyIFBhcnJ5JzogJzFGRTAnLCAvLyBSZXRhbGlhdGlvbiBmb3IgaW5jb3JyZWN0IGRpcmVjdGlvbiBhZnRlciBLaWxsZXIgSW5zdGluY3QsIGJvc3MgMlxyXG4gICAgJ1RlbXBsZSBUYXBhcyc6ICcnLCAvLyBUcmFja2luZyBjaXJjdWxhciBncm91bmQgQW9FcywgYm9zcyAyXHJcbiAgICAnVGVtcGxlIEhlbGxzZWFsJzogJzIwMEYnLCAvLyBSZWQvQmx1ZSBzeW1ib2wgZmFpbHVyZSwgYm9zcyAyXHJcbiAgICAnVGVtcGxlIFB1cmUgV2lsbCc6ICcyMDE3JywgLy8gQ2lyY2xlIEFvRSwgU3Bpcml0IEZsYW1lIHRyYXNoLCBiZWZvcmUgYm9zcyAzXHJcbiAgICAnVGVtcGxlIE1lZ2FibGFzdGVyJzogJzE2MycsIC8vIENvbmFsIEFvRSwgQ29ldXJsIFByYW5hIHRyYXNoLCBiZWZvcmUgYm9zcyAzXHJcbiAgICAnVGVtcGxlIFdpbmRidXJuJzogJzFGRTgnLCAvLyBDaXJjbGUgQW9FLCBUd2lzdGVyIHdpbmQsIGJvc3MgM1xyXG4gICAgJ1RlbXBsZSBIdXJyaWNhbmUgS2ljayc6ICcxRkU1JywgLy8gMjcwLWRlZ3JlZSBmcm9udGFsIEFvRSwgYm9zcyAzXHJcbiAgICAnVGVtcGxlIFNpbGVudCBSb2FyJzogJzFGRUInLCAvLyBGcm9udGFsIGxpbmUgQW9FLCBib3NzIDNcclxuICAgICdUZW1wbGUgTWlnaHR5IEJsb3cnOiAnMUZFQScsIC8vIENvbnRhY3Qgd2l0aCBjb2V1cmwgaGVhZCwgYm9zcyAzXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdUZW1wbGUgSGVhdCBMaWdodG5pbmcnOiAnMUZENycsIC8vIFB1cnBsZSBzcHJlYWQgY2lyY2xlcywgYm9zcyAxXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVCdXJuLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdUaGUgQnVybiBGYWxsaW5nIFJvY2snOiAnMzFBMycsIC8vIEVudmlyb25tZW50YWwgbGluZSBBb0VcclxuICAgICdUaGUgQnVybiBBZXRoZXJpYWwgQmxhc3QnOiAnMzI4QicsIC8vIExpbmUgQW9FLCBLdWt1bGthbiB0cmFzaFxyXG4gICAgJ1RoZSBCdXJuIE1vbGUtYS13aGFjayc6ICczMjhEJywgLy8gQ2lyY2xlIEFvRSwgRGVzZXJ0IERlc21hbiB0cmFzaFxyXG4gICAgJ1RoZSBCdXJuIEhlYWQgQnV0dCc6ICczMjhFJywgLy8gU21hbGwgY29uYWwgQW9FLCBEZXNlcnQgRGVzbWFuIHRyYXNoXHJcbiAgICAnVGhlIEJ1cm4gU2hhcmRmYWxsJzogJzMxOTEnLCAvLyBSb29td2lkZSBBb0UsIExvUyBmb3Igc2FmZXR5LCBIZWRldGV0LCBib3NzIDFcclxuICAgICdUaGUgQnVybiBEaXNzb25hbmNlJzogJzMxOTInLCAvLyBEb251dCBBb0UsIEhlZGV0ZXQsIGJvc3MgMVxyXG4gICAgJ1RoZSBCdXJuIENyeXN0YWxsaW5lIEZyYWN0dXJlJzogJzMxOTcnLCAvLyBDaXJjbGUgQW9FLCBEaW0gQ3J5c3RhbCwgYm9zcyAxXHJcbiAgICAnVGhlIEJ1cm4gUmVzb25hbnQgRnJlcXVlbmN5JzogJzMxOTgnLCAvLyBDaXJjbGUgQW9FLCBEaW0gQ3J5c3RhbCwgYm9zcyAxXHJcbiAgICAnVGhlIEJ1cm4gUm90b3N3aXBlJzogJzMyOTEnLCAvLyBGcm9udGFsIGNvbmUgQW9FLCBDaGFycmVkIERyZWFkbmF1Z2h0IHRyYXNoXHJcbiAgICAnVGhlIEJ1cm4gV3JlY2tpbmcgQmFsbCc6ICczMjkyJywgLy8gQ2lyY2xlIEFvRSwgQ2hhcnJlZCBEcmVhZG5hdWdodCB0cmFzaFxyXG4gICAgJ1RoZSBCdXJuIFNoYXR0ZXInOiAnMzI5NCcsIC8vIExhcmdlIGNpcmNsZSBBb0UsIENoYXJyZWQgRG9ibHluIHRyYXNoXHJcbiAgICAnVGhlIEJ1cm4gQXV0by1DYW5ub25zJzogJzMyOTUnLCAvLyBMaW5lIEFvRSwgQ2hhcnJlZCBEcm9uZSB0cmFzaFxyXG4gICAgJ1RoZSBCdXJuIFNlbGYtRGV0b25hdGUnOiAnMzI5NicsIC8vIENpcmNsZSBBb0UsIENoYXJyZWQgRHJvbmUgdHJhc2hcclxuICAgICdUaGUgQnVybiBGdWxsIFRocm90dGxlJzogJzJENzUnLCAvLyBMaW5lIEFvRSwgRGVmZWN0aXZlIERyb25lLCBib3NzIDJcclxuICAgICdUaGUgQnVybiBUaHJvdHRsZSc6ICcyRDc2JywgLy8gTGluZSBBb0UsIE1pbmluZyBEcm9uZSBhZGRzLCBib3NzIDJcclxuICAgICdUaGUgQnVybiBBZGl0IERyaXZlcic6ICcyRDc4JywgLy8gTGluZSBBb0UsIFJvY2sgQml0ZXIgYWRkcywgYm9zcyAyXHJcbiAgICAnVGhlIEJ1cm4gVHJlbWJsb3InOiAnMzI5NycsIC8vIExhcmdlIGNpcmNsZSBBb0UsIFZlaWxlZCBHaWdhd29ybSB0cmFzaFxyXG4gICAgJ1RoZSBCdXJuIERlc2VydCBTcGljZSc6ICczMjk4JywgLy8gVGhlIGZyb250YWwgY2xlYXZlcyBtdXN0IGZsb3dcclxuICAgICdUaGUgQnVybiBUb3hpYyBTcHJheSc6ICczMjlBJywgLy8gRnJvbnRhbCBjb25lIEFvRSwgR2lnYXdvcm0gU3RhbGtlciB0cmFzaFxyXG4gICAgJ1RoZSBCdXJuIFZlbm9tIFNwcmF5JzogJzMyOUInLCAvLyBUYXJnZXRlZCBjaXJjbGUgQW9FLCBHaWdhd29ybSBTdGFsa2VyIHRyYXNoXHJcbiAgICAnVGhlIEJ1cm4gV2hpdGUgRGVhdGgnOiAnMzE0MycsIC8vIFJlYWN0aXZlIGR1cmluZyBpbnZ1bG5lcmFiaWxpdHksIE1pc3QgRHJhZ29uLCBib3NzIDNcclxuICAgICdUaGUgQnVybiBGb2cgUGx1bWUgMSc6ICczMTQ1JywgLy8gU3RhciBBb0UsIE1pc3QgRHJhZ29uLCBib3NzIDNcclxuICAgICdUaGUgQnVybiBGb2cgUGx1bWUgMic6ICczMTQ2JywgLy8gTGluZSBBb0VzIGFmdGVyIHN0YXJzLCBNaXN0IERyYWdvbiwgYm9zcyAzXHJcbiAgICAnVGhlIEJ1cm4gQ2F1dGVyaXplJzogJzMxNDgnLCAvLyBMaW5lL1N3b29wIEFvRSwgTWlzdCBEcmFnb24sIGJvc3MgM1xyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ1RoZSBCdXJuIENvbGQgRm9nJzogJzMxNDInLCAvLyBHcm93aW5nIGNpcmNsZSBBb0UsIE1pc3QgRHJhZ29uLCBib3NzIDNcclxuICB9LFxyXG4gIGdhaW5zRWZmZWN0V2Fybjoge1xyXG4gICAgJ1RoZSBCdXJuIExlYWRlbic6ICc0MycsIC8vIFB1ZGRsZSBlZmZlY3QsIGJvc3MgMi4gKEFsc28gaW5mbGljdHMgMTFGLCBTbHVkZ2UuKVxyXG4gICAgJ1RoZSBCdXJuIFB1ZGRsZSBGcm9zdGJpdGUnOiAnMTFEJywgLy8gSWNlIHB1ZGRsZSBlZmZlY3QsIGJvc3MgMy4gKE5PVCB0aGUgY29uYWwtaW5mbGljdGVkIG9uZSwgMTBDLilcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ1RoZSBCdXJuIEhhaWxmaXJlJzogJzMxOTQnLCAvLyBIZWFkIG1hcmtlciBsaW5lIEFvRSwgSGVkZXRldCwgYm9zcyAxXHJcbiAgICAnVGhlIEJ1cm4gU2hhcmRzdHJpa2UnOiAnMzE5NScsIC8vIE9yYW5nZSBzcHJlYWQgaGVhZCBtYXJrZXJzLCBIZWRldGV0LCBib3NzIDFcclxuICAgICdUaGUgQnVybiBDaGlsbGluZyBBc3BpcmF0aW9uJzogJzMxNEQnLCAvLyBIZWFkIG1hcmtlciBjbGVhdmUsIE1pc3QgRHJhZ29uLCBib3NzIDNcclxuICAgICdUaGUgQnVybiBGcm9zdCBCcmVhdGgnOiAnMzE0QycsIC8vIFRhbmsgY2xlYXZlLCBNaXN0IERyYWdvbiwgYm9zcyAzXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIE8xTiAtIERlbHRhc2NhcGUgMS4wIE5vcm1hbFxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRGVsdGFzY2FwZVYxMCxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnTzFOIEJ1cm4nOiAnMjNENScsIC8vIEZpcmViYWxsIGV4cGxvc2lvbiBjaXJjbGUgQW9Fc1xyXG4gICAgJ08xTiBDbGFtcCc6ICcyM0UyJywgLy8gRnJvbnRhbCByZWN0YW5nbGUga25vY2tiYWNrIEFvRSwgQWx0ZSBSb2l0ZVxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnTzFOIExldmluYm9sdCc6ICcyM0RBJywgLy8gc21hbGwgc3ByZWFkIGNpcmNsZXNcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gTzFTIC0gRGVsdGFzY2FwZSAxLjAgU2F2YWdlXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5EZWx0YXNjYXBlVjEwU2F2YWdlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdPMVMgVHVyYnVsZW5jZSc6ICcyNTg0JywgLy8gc3RhbmRpbmcgdW5kZXIgdGhlIGJvc3MgYmVmb3JlIGRvd25idXJzdFxyXG4gICAgJ08xUyBCYWxsIE9mIEZpcmUgQnVybic6ICcxRUNCJywgLy8gZmlyZWJhbGwgZXhwbG9zaW9uXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnTzFTIENsYW1wJzogJzFFREUnLCAvLyBsYXJnZSBmcm9udGFsIGxpbmUgYW9lXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdPMVMgTGV2aW5ib2x0JzogJzFFRDInLCAvLyBsaWdodG5pbmcgc3ByZWFkXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gTzJOIC0gRGVsdGFzY2FwZSAyLjAgTm9ybWFsXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5EZWx0YXNjYXBlVjIwLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdPMk4gTWFpbiBRdWFrZSc6ICcyNEE1JywgLy8gTm9uLXRlbGVncmFwaGVkIGNpcmNsZSBBb0UsIEZsZXNoeSBNZW1iZXJcclxuICAgICdPMk4gRXJvc2lvbic6ICcyNTkwJywgLy8gU21hbGwgY2lyY2xlIEFvRXMsIEZsZXNoeSBNZW1iZXJcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ08yTiBQYXJhbm9ybWFsIFdhdmUnOiAnMjUwRScsIC8vIEluc3RhbnQgdGFuayBjbGVhdmVcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIC8vIFdlIGNvdWxkIHRyeSB0byBzZXBhcmF0ZSBvdXQgdGhlIG1pc3Rha2UgdGhhdCBsZWQgdG8gdGhlIHBsYXllciBiZWluZyBwZXRyaWZpZWQuXHJcbiAgICAgIC8vIEhvd2V2ZXIsIGl0J3MgTm9ybWFsIG1vZGUsIHdoeSBvdmVydGhpbmsgaXQ/XHJcbiAgICAgIGlkOiAnTzJOIFBldHJpZmljYXRpb24nLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnMjYyJyB9KSxcclxuICAgICAgLy8gVGhlIHVzZXIgbWlnaHQgZ2V0IGhpdCBieSBhbm90aGVyIHBldHJpZnlpbmcgYWJpbGl0eSBiZWZvcmUgdGhlIGVmZmVjdCBlbmRzLlxyXG4gICAgICAvLyBUaGVyZSdzIG5vIHBvaW50IGluIG5vdGlmeWluZyBmb3IgdGhhdC5cclxuICAgICAgc3VwcHJlc3NTZWNvbmRzOiAxMCxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuZWZmZWN0IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ08yTiBFYXJ0aHF1YWtlJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMjUxNScsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgLy8gVGhpcyBkZWFscyBkYW1hZ2Ugb25seSB0byBub24tZmxvYXRpbmcgdGFyZ2V0cy5cclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS5EYW1hZ2VGcm9tTWF0Y2hlcyhtYXRjaGVzKSA+IDAsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gTzJTIC0gRGVsdGFzY2FwZSAyLjAgU2F2YWdlXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5EZWx0YXNjYXBlVjIwU2F2YWdlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdPMlMgV2VpZ2h0ZWQgV2luZyc6ICcyM0VGJywgLy8gVW5zdGFibGUgR3Jhdml0eSBleHBsb3Npb25zIG9uIHBsYXllcnMgKGFmdGVyIExvbmcgRHJvcClcclxuICAgICdPMlMgR3Jhdml0YXRpb25hbCBFeHBsb3Npb24gMSc6ICcyMzY3JywgLy8gZmFpbGluZyBGb3VyIEZvbGQgU2FjcmlmaWNlIDQgcGVyc29uIHN0YWNrXHJcbiAgICAnTzJTIEdyYXZpdGF0aW9uYWwgRXhwbG9zaW9uIDInOiAnMjM2OCcsIC8vIGZhaWxpbmcgRm91ciBGb2xkIFNhY3JpZmljZSA0IHBlcnNvbiBzdGFja1xyXG4gICAgJ08yUyBNYWluIFF1YWtlJzogJzIzNTknLCAvLyB1bnRlbGVncmFwaGVkIGV4cGxvc2lvbnMgZnJvbSBlcGljZW50ZXIgdGVudGFjbGVzXHJcbiAgfSxcclxuICBnYWluc0VmZmVjdEZhaWw6IHtcclxuICAgICdPMlMgU3RvbmUgQ3Vyc2UnOiAnNTg5JywgLy8gZmFpbGluZyBEZWF0aCdzIEdhemUgb3IgdGFraW5nIHRvbyBtYW55IHRhbmtidXN0ZXIgc3RhY2tzXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICAvLyBncm91bmQgYmx1ZSBhcmVuYSBjaXJjbGVzOyAocHJvYmFibHk/KSBvbmx5IGRvIGRhbWFnZSBpZiBub3QgZmxvYXRpbmdcclxuICAgICAgLy8gVE9ETzogdXN1YWxseSB0aGlzIGp1c3QgZG9lc24ndCBoaXQgYW55Ym9keSBhdCBhbGwsIGR1ZSB0byBwYXR0ZXJucy5cclxuICAgICAgLy8gRmxvYXRpbmcgb3ZlciBvbmUgaXMgdW50ZXN0ZWQuXHJcbiAgICAgIGlkOiAnTzJTIFBldHJvc3BoZXJlIEV4cGxvc2lvbicsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzI0NUQnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IGRhdGEuRGFtYWdlRnJvbU1hdGNoZXMobWF0Y2hlcykgPiAwLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBmbG9hdGluZyB5ZWxsb3cgYXJlbmEgY2lyY2xlczsgb25seSBkbyBkYW1hZ2UgaWYgZmxvYXRpbmdcclxuICAgICAgaWQ6ICdPMlMgUG90ZW50IFBldHJvc3BoZXJlIEV4cGxvc2lvbicsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzIzNjInLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IGRhdGEuRGFtYWdlRnJvbU1hdGNoZXMobWF0Y2hlcykgPiAwLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBNdXN0IGJlIGZsb2F0aW5nIHRvIHN1cnZpdmU7IGhpdHMgZXZlcnlvbmUgYnV0IG9ubHkgZG9lcyBkYW1hZ2UgaWYgbm90IGZsb2F0aW5nLlxyXG4gICAgICBpZDogJ08yUyBFYXJ0aHF1YWtlJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMjQ3QScsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS5EYW1hZ2VGcm9tTWF0Y2hlcyhtYXRjaGVzKSA+IDAsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERhdGEgZXh0ZW5kcyBPb3BzeURhdGEge1xyXG4gIGluaXRpYWxpemVkPzogYm9vbGVhbjtcclxuICBwaGFzZU51bWJlcj86IG51bWJlcjtcclxuICBnYW1lQ291bnQ/OiBudW1iZXI7XHJcbn1cclxuXHJcbi8vIE8zTiAtIERlbHRhc2NhcGUgMy4wIE5vcm1hbFxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRGVsdGFzY2FwZVYzMCxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnTzNOIFNwZWxsYmxhZGUgRmlyZSBJSUknOiAnMjQ2MCcsIC8vIERvbnV0IEFvRSwgSGFsaWNhcm5hc3N1c1xyXG4gICAgJ08zTiBTcGVsbGJsYWRlIEJsaXp6YXJkIElJSSc6ICcyNDYxJywgLy8gQ2lyY2xlIEFvRSwgSGFsaWNhcm5hc3N1c1xyXG4gICAgJ08zTiBTcGVsbGJsYWRlIFRodW5kZXIgSUlJJzogJzI0NjInLCAvLyBMaW5lIEFvRSwgSGFsaWNhcm5hc3N1c1xyXG4gICAgJ08zTiBDcm9zcyBSZWFwZXInOiAnMjQ2QicsIC8vIENpcmNsZSBBb0UsIFNvdWwgUmVhcGVyXHJcbiAgICAnTzNOIEd1c3RpbmcgR291Z2UnOiAnMjQ2QycsIC8vIEdyZWVuIGxpbmUgQW9FLCBTb3VsIFJlYXBlclxyXG4gICAgJ08zTiBTd29yZCBEYW5jZSc6ICcyNDcwJywgLy8gVGFyZ2V0ZWQgdGhpbiBjb25lIEFvRSwgSGFsaWNhcm5hc3N1c1xyXG4gICAgJ08zTiBVcGxpZnQnOiAnMjQ3MycsIC8vIEdyb3VuZCBzcGVhcnMsIFF1ZWVuJ3MgV2FsdHogZWZmZWN0LCBIYWxpY2FybmFzc3VzXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnTzNOIFVsdGltdW0nOiAnMjQ3NycsIC8vIEluc3RhbnQga2lsbC4gVXNlZCBpZiB0aGUgcGxheWVyIGRvZXMgbm90IGV4aXQgdGhlIHNhbmQgbWF6ZSBmYXN0IGVub3VnaC5cclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ08zTiBIb2x5IEJsdXInOiAnMjQ2MycsIC8vIFNwcmVhZCBjaXJjbGVzLlxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdPM04gUGhhc2UgVHJhY2tlcicsXHJcbiAgICAgIHR5cGU6ICdTdGFydHNVc2luZycsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLnN0YXJ0c1VzaW5nKHsgaWQ6ICcyMzA0Jywgc291cmNlOiAnSGFsaWNhcm5hc3N1cycsIGNhcHR1cmU6IGZhbHNlIH0pLFxyXG4gICAgICBuZXRSZWdleERlOiBOZXRSZWdleGVzLnN0YXJ0c1VzaW5nKHsgaWQ6ICcyMzA0Jywgc291cmNlOiAnSGFsaWthcm5hc3NvcycsIGNhcHR1cmU6IGZhbHNlIH0pLFxyXG4gICAgICBuZXRSZWdleEZyOiBOZXRSZWdleGVzLnN0YXJ0c1VzaW5nKHsgaWQ6ICcyMzA0Jywgc291cmNlOiAnSGFsaWNhcm5hc3NlJywgY2FwdHVyZTogZmFsc2UgfSksXHJcbiAgICAgIG5ldFJlZ2V4SmE6IE5ldFJlZ2V4ZXMuc3RhcnRzVXNpbmcoeyBpZDogJzIzMDQnLCBzb3VyY2U6ICfjg4/jg6rjgqvjg6vjg4rjg4Pjgr3jgrknLCBjYXB0dXJlOiBmYWxzZSB9KSxcclxuICAgICAgbmV0UmVnZXhDbjogTmV0UmVnZXhlcy5zdGFydHNVc2luZyh7IGlkOiAnMjMwNCcsIHNvdXJjZTogJ+WTiOWIqeWNoee6s+iLj+aWrycsIGNhcHR1cmU6IGZhbHNlIH0pLFxyXG4gICAgICBuZXRSZWdleEtvOiBOZXRSZWdleGVzLnN0YXJ0c1VzaW5nKHsgaWQ6ICcyMzA0Jywgc291cmNlOiAn7ZWg66as7Lm066W064KY7IaM7IqkJywgY2FwdHVyZTogZmFsc2UgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEpID0+IGRhdGEucGhhc2VOdW1iZXIgPSAoZGF0YS5waGFzZU51bWJlciA/PyAwKSArIDEsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBUaGVyZSdzIGEgbG90IHRvIHRyYWNrLCBhbmQgaW4gb3JkZXIgdG8gbWFrZSBpdCBhbGwgY2xlYW4sIGl0J3Mgc2FmZXN0IGp1c3QgdG9cclxuICAgICAgLy8gaW5pdGlhbGl6ZSBpdCBhbGwgdXAgZnJvbnQgaW5zdGVhZCBvZiB0cnlpbmcgdG8gZ3VhcmQgYWdhaW5zdCB1bmRlZmluZWQgY29tcGFyaXNvbnMuXHJcbiAgICAgIGlkOiAnTzNOIEluaXRpYWxpemluZycsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnMzY3Jywgc291cmNlOiAnSGFsaWNhcm5hc3N1cycsIGNhcHR1cmU6IGZhbHNlIH0pLFxyXG4gICAgICBuZXRSZWdleERlOiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzM2NycsIHNvdXJjZTogJ0hhbGlrYXJuYXNzb3MnLCBjYXB0dXJlOiBmYWxzZSB9KSxcclxuICAgICAgbmV0UmVnZXhGcjogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICczNjcnLCBzb3VyY2U6ICdIYWxpY2FybmFzc2UnLCBjYXB0dXJlOiBmYWxzZSB9KSxcclxuICAgICAgbmV0UmVnZXhKYTogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICczNjcnLCBzb3VyY2U6ICfjg4/jg6rjgqvjg6vjg4rjg4Pjgr3jgrknLCBjYXB0dXJlOiBmYWxzZSB9KSxcclxuICAgICAgbmV0UmVnZXhDbjogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICczNjcnLCBzb3VyY2U6ICflk4jliKnljaHnurPoi4/mlq8nLCBjYXB0dXJlOiBmYWxzZSB9KSxcclxuICAgICAgbmV0UmVnZXhLbzogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICczNjcnLCBzb3VyY2U6ICftlaDrpqzsubTrpbTrgpjshozsiqQnLCBjYXB0dXJlOiBmYWxzZSB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSkgPT4gIWRhdGEuaW5pdGlhbGl6ZWQsXHJcbiAgICAgIHJ1bjogKGRhdGEpID0+IHtcclxuICAgICAgICBkYXRhLmdhbWVDb3VudCA9IDA7XHJcbiAgICAgICAgLy8gSW5kZXhpbmcgcGhhc2VzIGF0IDEgc28gYXMgdG8gbWFrZSBwaGFzZXMgbWF0Y2ggd2hhdCBodW1hbnMgZXhwZWN0LlxyXG4gICAgICAgIC8vIDE6IFdlIHN0YXJ0IGhlcmUuXHJcbiAgICAgICAgLy8gMjogQ2F2ZSBwaGFzZSB3aXRoIFVwbGlmdHMuXHJcbiAgICAgICAgLy8gMzogUG9zdC1pbnRlcm1pc3Npb24sIHdpdGggZ29vZCBhbmQgYmFkIGZyb2dzLlxyXG4gICAgICAgIGRhdGEucGhhc2VOdW1iZXIgPSAxO1xyXG4gICAgICAgIGRhdGEuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdPM04gUmliYml0JyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICcyNDY2JyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIC8vIFdlIERPIHdhbnQgdG8gYmUgaGl0IGJ5IFRvYWQvUmliYml0IGlmIHRoZSBuZXh0IGNhc3Qgb2YgVGhlIEdhbWVcclxuICAgICAgICAvLyBpcyA0eCB0b2FkIHBhbmVscy5cclxuICAgICAgICBjb25zdCBnYW1lQ291bnQgPSBkYXRhLmdhbWVDb3VudCA/PyAwO1xyXG4gICAgICAgIHJldHVybiAhKGRhdGEucGhhc2VOdW1iZXIgPT09IDMgJiYgZ2FtZUNvdW50ICUgMiA9PT0gMCkgJiYgbWF0Y2hlcy50YXJnZXRJZCAhPT0gJ0UwMDAwMDAwJztcclxuICAgICAgfSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gVGhlcmUncyBhIGxvdCB3ZSBjb3VsZCBkbyB0byB0cmFjayBleGFjdGx5IGhvdyB0aGUgcGxheWVyIGZhaWxlZCBUaGUgR2FtZS5cclxuICAgICAgLy8gV2h5IG92ZXJ0aGluayBOb3JtYWwgbW9kZSwgaG93ZXZlcj9cclxuICAgICAgaWQ6ICdPM04gVGhlIEdhbWUnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIC8vIEd1ZXNzIHdoYXQgeW91IGp1c3QgbG9zdD9cclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnMjQ2RCcgfSksXHJcbiAgICAgIC8vIElmIHRoZSBwbGF5ZXIgdGFrZXMgbm8gZGFtYWdlLCB0aGV5IGRpZCB0aGUgbWVjaGFuaWMgY29ycmVjdGx5LlxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiBkYXRhLkRhbWFnZUZyb21NYXRjaGVzKG1hdGNoZXMpID4gMCxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgICBydW46IChkYXRhKSA9PiBkYXRhLmdhbWVDb3VudCA9IChkYXRhLmdhbWVDb3VudCA/PyAwKSArIDEsXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFRPRE86IGhhbmRsZSBSaWJiaXQgKDIyRjcpLCBPaW5rICgyMkY5LCBpZiBkYW1hZ2UpLCBTcXVlbGNoICgyMkY4LCBpZiBkYW1hZ2UpXHJcbi8vICAgICAgIHdoaWNoIGlzIGFuIGVycm9yIGV4Y2VwdCBkdXJpbmcgdGhlIHNlY29uZCBnYW1lXHJcblxyXG4vLyBPM1MgLSBEZWx0YXNjYXBlIDMuMCBTYXZhZ2VcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkRlbHRhc2NhcGVWMzBTYXZhZ2UsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ08zUyBTcGVsbGJsYWRlIEZpcmUgSUlJJzogJzIyRUMnLCAvLyBkb251dFxyXG4gICAgJ08zUyBTcGVsbGJsYWRlIFRodW5kZXIgSUlJJzogJzIyRUUnLCAvLyBsaW5lXHJcbiAgICAnTzNTIFNwZWxsYmxhZGUgQmxpenphcmQgSUlJJzogJzIyRUQnLCAvLyBjaXJjbGVcclxuICAgICdPM1MgVXBsaWZ0JzogJzIzMEQnLCAvLyBub3Qgc3RhbmRpbmcgb24gYmx1ZSBzcXVhcmVcclxuICAgICdPM1MgU291bCBSZWFwZXIgR3VzdGluZyBHb3VnZSc6ICcyMkZGJywgLy8gcmVhcGVyIGxpbmUgYW9lIGR1cmluZyBjYXZlIHBoYXNlXHJcbiAgICAnTzNTIFNvdWwgUmVhcGVyIENyb3NzIFJlYXBlcic6ICcyMkZEJywgLy8gbWlkZGxlIHJlYXBlciBjaXJjbGVcclxuICAgICdPM1MgU291bCBSZWFwZXIgU3RlbmNoIG9mIERlYXRoJzogJzIyRkUnLCAvLyBvdXRzaWRlIHJlYXBlcnMgKGR1cmluZyBmaW5hbCBwaGFzZSlcclxuICAgICdPM1MgQXBhbmRhIE1hZ2ljIEhhbW1lcic6ICcyMzE1JywgLy8gYm9va3MgcGhhc2UgbWFnaWMgaGFtbWVyIGNpcmNsZVxyXG4gICAgJ08zUyBCcmlhciBUaG9ybic6ICcyMzA5JywgLy8gbm90IGJyZWFraW5nIHRldGhlcnMgZmFzdCBlbm91Z2hcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ08zUyBIb2x5IEVkZ2UnOiAnMjJGMCcsIC8vIFNwZWxsYmxhZGUgSG9seSBzcHJlYWRcclxuICAgICdPM1MgU3dvcmQgRGFuY2UnOiAnMjMwNycsIC8vIHByb3RlYW4gd2F2ZVxyXG4gICAgJ08zUyBHcmVhdCBEcmFnb24gRnJvc3QgQnJlYXRoJzogJzIzMTInLCAvLyB0YW5rIGNsZWF2ZSBmcm9tIEdyZWF0IERyYWdvblxyXG4gICAgJ08zUyBJcm9uIEdpYW50IEdyYW5kIFN3b3JkJzogJzIzMTYnLCAvLyB0YW5rIGNsZWF2ZSBmcm9tIElyb24gR2lhbnRcclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgJ08zUyBGb2xpbyc6ICcyMzBGJywgLy8gYm9va3MgYm9va3MgYm9va3NcclxuICB9LFxyXG4gIHNvbG9XYXJuOiB7XHJcbiAgICAnTzNTIEhvbHkgQmx1cic6ICcyMkYxJywgLy8gU3BlbGxibGFkZSBIb2x5IHN0YWNrXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICAvLyBFdmVyeWJvZHkgZ2V0cyBoaXRzIGJ5IHRoaXMsIGJ1dCBpdCdzIG9ubHkgYSBmYWlsdXJlIGlmIGl0IGRvZXMgZGFtYWdlLlxyXG4gICAgICBpZDogJ08zUyBUaGUgR2FtZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzIzMDEnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IGRhdGEuRGFtYWdlRnJvbU1hdGNoZXMobWF0Y2hlcykgPiAwLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnZmFpbCcsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIE80TiAtIERlbHRhc2NhcGUgNC4wIE5vcm1hbFxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRGVsdGFzY2FwZVY0MCxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnTzROIEJsaXp6YXJkIElJSSc6ICcyNEJDJywgLy8gVGFyZ2V0ZWQgY2lyY2xlIEFvRXMsIEV4ZGVhdGhcclxuICAgICdPNE4gRW1wb3dlcmVkIFRodW5kZXIgSUlJJzogJzI0QzEnLCAvLyBVbnRlbGVncmFwaGVkIGxhcmdlIGNpcmNsZSBBb0UsIEV4ZGVhdGhcclxuICAgICdPNE4gWm9tYmllIEJyZWF0aCc6ICcyNENCJywgLy8gQ29uYWwsIHRyZWUgaGVhZCBhZnRlciBEZWNpc2l2ZSBCYXR0bGVcclxuICAgICdPNE4gQ2xlYXJvdXQnOiAnMjRDQycsIC8vIE92ZXJsYXBwaW5nIGNvbmUgQW9FcywgRGVhdGhseSBWaW5lICh0ZW50YWNsZXMgYWxvbmdzaWRlIHRyZWUgaGVhZClcclxuICAgICdPNE4gQmxhY2sgU3BhcmsnOiAnMjRDOScsIC8vIEV4cGxvZGluZyBCbGFjayBIb2xlXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgIC8vIEVtcG93ZXJlZCBGaXJlIElJSSBpbmZsaWN0cyB0aGUgUHlyZXRpYyBkZWJ1ZmYsIHdoaWNoIGRlYWxzIGRhbWFnZSBpZiB0aGUgcGxheWVyXHJcbiAgICAvLyBtb3ZlcyBvciBhY3RzIGJlZm9yZSB0aGUgZGVidWZmIGZhbGxzLiBVbmZvcnR1bmF0ZWx5IGl0IGRvZXNuJ3QgbG9vayBsaWtlIHRoZXJlJ3NcclxuICAgIC8vIGN1cnJlbnRseSBhIGxvZyBsaW5lIGZvciB0aGlzLCBzbyB0aGUgb25seSB3YXkgdG8gY2hlY2sgZm9yIHRoaXMgaXMgdG8gY29sbGVjdFxyXG4gICAgLy8gdGhlIGRlYnVmZnMgYW5kIHRoZW4gd2FybiBpZiBhIHBsYXllciB0YWtlcyBhbiBhY3Rpb24gZHVyaW5nIHRoYXQgdGltZS4gTm90IHdvcnRoIGl0XHJcbiAgICAvLyBmb3IgTm9ybWFsLlxyXG4gICAgJ080TiBTdGFuZGFyZCBGaXJlJzogJzI0QkEnLFxyXG4gICAgJ080TiBCdXN0ZXIgVGh1bmRlcic6ICcyNEJFJywgLy8gQSBjbGVhdmluZyB0YW5rIGJ1c3RlclxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgLy8gS2lsbHMgdGFyZ2V0IGlmIG5vdCBjbGVhbnNlZFxyXG4gICAgICBpZDogJ080TiBEb29tJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzM4RScgfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnQ2xlYW5zZXJzIG1pc3NlZCBEb29tIScsXHJcbiAgICAgICAgICAgIGRlOiAnRG9vbS1SZWluaWd1bmcgdmVyZ2Vzc2VuIScsXHJcbiAgICAgICAgICAgIGZyOiAnTlxcJ2EgcGFzIMOpdMOpIGRpc3NpcMOpKGUpIGR1IEdsYXMgIScsXHJcbiAgICAgICAgICAgIGphOiAn5q2744Gu5a6j5ZGKJyxcclxuICAgICAgICAgICAgY246ICfmsqHop6PmrbvlrqMnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gU2hvcnQga25vY2tiYWNrIGZyb20gRXhkZWF0aFxyXG4gICAgICBpZDogJ080TiBWYWN1dW0gV2F2ZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzI0QjgnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnUHVzaGVkIG9mZiEnLFxyXG4gICAgICAgICAgICBkZTogJ1J1bnRlciBnZXNjaHVic3QhJyxcclxuICAgICAgICAgICAgZnI6ICdBIMOpdMOpIHBvdXNzw6koZSkgIScsXHJcbiAgICAgICAgICAgIGphOiAn6JC944Gh44GfJyxcclxuICAgICAgICAgICAgY246ICflh7vpgIDlnaDokL0nLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gUm9vbS13aWRlIEFvRSwgZnJlZXplcyBub24tbW92aW5nIHRhcmdldHNcclxuICAgICAgaWQ6ICdPNE4gRW1wb3dlcmVkIEJsaXp6YXJkJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzRFNicgfSksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmVmZmVjdCB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE5ldE1hdGNoZXMgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9uZXRfbWF0Y2hlcyc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuaW1wb3J0IHsgcGxheWVyRGFtYWdlRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vb29wc3lfY29tbW9uJztcclxuXHJcbi8vIFRPRE86IHRha2luZyB0aGUgd3JvbmcgY29sb3Igd2hpdGUvYmxhY2sgYW50aWxpZ2h0XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERhdGEgZXh0ZW5kcyBPb3BzeURhdGEge1xyXG4gIGlzRGVjaXNpdmVCYXR0bGVFbGVtZW50PzogYm9vbGVhbjtcclxuICBpc05lb0V4ZGVhdGg/OiBib29sZWFuO1xyXG4gIGhhc0JleW9uZERlYXRoPzogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gIGRvdWJsZUF0dGFja01hdGNoZXM/OiBOZXRNYXRjaGVzWydBYmlsaXR5J11bXTtcclxufVxyXG5cclxuLy8gTzRTIC0gRGVsdGFzY2FwZSA0LjAgU2F2YWdlXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5EZWx0YXNjYXBlVjQwU2F2YWdlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdPNFMxIFZpbmUgQ2xlYXJvdXQnOiAnMjQwQycsIC8vIGNpcmNsZSBvZiB2aW5lc1xyXG4gICAgJ080UzEgWm9tYmllIEJyZWF0aCc6ICcyNDBCJywgLy8gdHJlZSBleGRlYXRoIGNvbmFsXHJcbiAgICAnTzRTMSBWYWN1dW0gV2F2ZSc6ICcyM0ZFJywgLy8gY2lyY2xlIGNlbnRlcmVkIG9uIGV4ZGVhdGhcclxuICAgICdPNFMyIE5lbyBWYWN1dW0gV2F2ZSc6ICcyNDFEJywgLy8gXCJvdXQgb2YgbWVsZWVcIlxyXG4gICAgJ080UzIgRGVhdGggQm9tYic6ICcyNDMxJywgLy8gZmFpbGVkIGFjY2VsZXJhdGlvbiBib21iXHJcbiAgICAnTzRTMiBFbXB0aW5lc3MgMSc6ICcyNDIxJywgLy8gZXhhZmxhcmVzIGluaXRpYWxcclxuICAgICdPNFMyIEVtcHRpbmVzcyAyJzogJzI0MjInLCAvLyBleGFmbGFyZXMgbW92aW5nXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnTzRTMSBCbGFjayBIb2xlIEJsYWNrIFNwYXJrJzogJzI0MDcnLCAvLyBibGFjayBob2xlIGNhdGNoaW5nIHlvdVxyXG4gICAgJ080UzIgRWRnZSBPZiBEZWF0aCc6ICcyNDE1JywgLy8gc3RhbmRpbmcgYmV0d2VlbiB0aGUgdHdvIGNvbG9yIGxhc2Vyc1xyXG4gICAgJ080UzIgSW5uZXIgQW50aWxpZ2h0JzogJzI0NEMnLCAvLyBpbm5lciBsYXNlclxyXG4gICAgJ080UzIgT3V0ZXIgQW50aWxpZ2h0JzogJzI0MTAnLCAvLyBvdXRlciBsYXNlclxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnTzRTMSBGaXJlIElJSSc6ICcyM0Y2JywgLy8gc3ByZWFkIGV4cGxvc2lvblxyXG4gIH0sXHJcbiAgc2hhcmVGYWlsOiB7XHJcbiAgICAnTzRTMSBUaHVuZGVyIElJSSc6ICcyM0ZBJywgLy8gdGFua2J1c3RlclxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdPNFMyIERlY2lzaXZlIEJhdHRsZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnMjQwOCcsIGNhcHR1cmU6IGZhbHNlIH0pLFxyXG4gICAgICBydW46IChkYXRhKSA9PiB7XHJcbiAgICAgICAgZGF0YS5pc0RlY2lzaXZlQmF0dGxlRWxlbWVudCA9IHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ080UzEgVmFjdXVtIFdhdmUnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzIzRkUnLCBjYXB0dXJlOiBmYWxzZSB9KSxcclxuICAgICAgcnVuOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgIGRhdGEuaXNEZWNpc2l2ZUJhdHRsZUVsZW1lbnQgPSBmYWxzZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTzRTMiBBbG1hZ2VzdCcsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnMjQxNycsIGNhcHR1cmU6IGZhbHNlIH0pLFxyXG4gICAgICBydW46IChkYXRhKSA9PiB7XHJcbiAgICAgICAgZGF0YS5pc05lb0V4ZGVhdGggPSB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdPNFMyIEJsaXp6YXJkIElJSScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzIzRjgnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIC8vIElnbm9yZSB1bmF2b2lkYWJsZSByYWlkIGFvZSBCbGl6emFyZCBJSUkuXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEpID0+ICFkYXRhLmlzRGVjaXNpdmVCYXR0bGVFbGVtZW50LFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ080UzIgVGh1bmRlciBJSUknLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICcyM0ZEJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICAvLyBPbmx5IGNvbnNpZGVyIHRoaXMgZHVyaW5nIHJhbmRvbSBtZWNoYW5pYyBhZnRlciBkZWNpc2l2ZSBiYXR0bGUuXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEpID0+IGRhdGEuaXNEZWNpc2l2ZUJhdHRsZUVsZW1lbnQsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTzRTMiBQZXRyaWZpZWQnLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnMjYyJyB9KSxcclxuICAgICAgbWlzdGFrZTogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICAvLyBPbiBOZW8sIGJlaW5nIHBldHJpZmllZCBpcyBiZWNhdXNlIHlvdSBsb29rZWQgYXQgU2hyaWVrLCBzbyB5b3VyIGZhdWx0LlxyXG4gICAgICAgIGlmIChkYXRhLmlzTmVvRXhkZWF0aClcclxuICAgICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmVmZmVjdCB9O1xyXG4gICAgICAgIC8vIE9uIG5vcm1hbCBFeERlYXRoLCB0aGlzIGlzIGR1ZSB0byBXaGl0ZSBIb2xlLlxyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgbmFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuZWZmZWN0IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ080UzIgRm9ya2VkIExpZ2h0bmluZycsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzI0MkUnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTzRTMiBCZXlvbmQgRGVhdGggR2FpbicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICc1NjYnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5oYXNCZXlvbmREZWF0aCA/Pz0ge307XHJcbiAgICAgICAgZGF0YS5oYXNCZXlvbmREZWF0aFttYXRjaGVzLnRhcmdldF0gPSB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdPNFMyIEJleW9uZCBEZWF0aCBMb3NlJyxcclxuICAgICAgdHlwZTogJ0xvc2VzRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMubG9zZXNFZmZlY3QoeyBlZmZlY3RJZDogJzU2NicgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmhhc0JleW9uZERlYXRoID8/PSB7fTtcclxuICAgICAgICBkYXRhLmhhc0JleW9uZERlYXRoW21hdGNoZXMudGFyZ2V0XSA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdPNFMyIEJleW9uZCBEZWF0aCcsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICc1NjYnIH0pLFxyXG4gICAgICBkZWxheVNlY29uZHM6IChfZGF0YSwgbWF0Y2hlcykgPT4gcGFyc2VGbG9hdChtYXRjaGVzLmR1cmF0aW9uKSAtIDAuNSxcclxuICAgICAgZGVhdGhSZWFzb246IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgaWYgKCFkYXRhLmhhc0JleW9uZERlYXRoKVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICghZGF0YS5oYXNCZXlvbmREZWF0aFttYXRjaGVzLnRhcmdldF0pXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDogbWF0Y2hlcy5lZmZlY3QsXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTzRTMiBEb3VibGUgQXR0YWNrIENvbGxlY3QnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICcyNDFDJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5kb3VibGVBdHRhY2tNYXRjaGVzID0gZGF0YS5kb3VibGVBdHRhY2tNYXRjaGVzIHx8IFtdO1xyXG4gICAgICAgIGRhdGEuZG91YmxlQXR0YWNrTWF0Y2hlcy5wdXNoKG1hdGNoZXMpO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdPNFMyIERvdWJsZSBBdHRhY2snLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICcyNDFDJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFyciA9IGRhdGEuZG91YmxlQXR0YWNrTWF0Y2hlcztcclxuICAgICAgICBpZiAoIWFycilcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAoYXJyLmxlbmd0aCA8PSAyKVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIEhhcmQgdG8ga25vdyB3aG8gc2hvdWxkIGJlIGluIHRoaXMgYW5kIHdobyBzaG91bGRuJ3QsIGJ1dFxyXG4gICAgICAgIC8vIGl0IHNob3VsZCBuZXZlciBoaXQgMyBwZW9wbGUuXHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCB0ZXh0OiBgJHthcnJbMF0/LmFiaWxpdHkgPz8gJyd9IHggJHthcnIubGVuZ3RofWAgfTtcclxuICAgICAgfSxcclxuICAgICAgcnVuOiAoZGF0YSkgPT4gZGVsZXRlIGRhdGEuZG91YmxlQXR0YWNrTWF0Y2hlcyxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG4vLyBUT0RPOiBEaWFib2xpYyBXaW5kICgyOEI5KSBhbHdheXMgc2VlbXMgdG8gYmUgMHgxNiBub3QgMHgxNS5cclxuXHJcbmludGVyZmFjZSBEYXRhIGV4dGVuZHMgT29wc3lEYXRhIHtcclxuICBoYXNUaHJvdHRsZT86IHsgW25hbWU6IHN0cmluZ106IGJvb2xlYW4gfTtcclxufVxyXG5cclxuLy8gTzVOIC0gU2lnbWFzY2FwZSAxLjAgTm9ybWFsXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5TaWdtYXNjYXBlVjEwLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdPNU4gV3JvdGggR2hvc3QgRW5jdW1iZXInOiAnMjhBRScsIC8vIHNxdWFyZXMgdGhhdCBnaG9zdHMgYXBwZWFyIGluXHJcbiAgICAnTzVOIFNhaW50bHkgQmVhbSc6ICcyOEFBJywgLy8gY2hhc2luZyBjaXJjbGVzIHRoYXQgZGVzdHJveSBnaG9zdHNcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTzVOIFRocm90dGxlIEdhaW4nLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnM0FBJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIChkYXRhLmhhc1Rocm90dGxlID8/PSB7fSlbbWF0Y2hlcy50YXJnZXRdID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkYXRhLmhhc1Rocm90dGxlKSk7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ081TiBUaHJvdHRsZSBEZWF0aCcsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICczQUEnIH0pLFxyXG4gICAgICBkZWxheVNlY29uZHM6IChfZGF0YSwgbWF0Y2hlcykgPT4gcGFyc2VGbG9hdChtYXRjaGVzLmR1cmF0aW9uKSAtIDEsXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGlmIChkYXRhLmhhc1Rocm90dGxlPy5bbWF0Y2hlcy50YXJnZXRdKVxyXG4gICAgICAgICAgcmV0dXJuIHsgbmFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuZWZmZWN0IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ081TiBUaHJvdHRsZSBMb3NlJyxcclxuICAgICAgdHlwZTogJ0xvc2VzRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMubG9zZXNFZmZlY3QoeyBlZmZlY3RJZDogJzNBQScgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICAoZGF0YS5oYXNUaHJvdHRsZSA/Pz0ge30pW21hdGNoZXMudGFyZ2V0XSA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEuaGFzVGhyb3R0bGUpKTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIEdldHRpbmcgaGl0IGJ5IGEgZ2hvc3Qgd2l0aG91dCB0aHJvdHRsZSAodGhlIG1hbmRhdG9yeSBwb3N0LWNoaW1uZXkgb25lKS5cclxuICAgICAgaWQ6ICdPNU4gUG9zc2VzcycsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzI4QUMnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+ICFkYXRhLmhhc1Rocm90dGxlPy5bbWF0Y2hlcy50YXJnZXRdLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnZmFpbCcsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuLy8gVE9ETzogRGlhYm9saWMgV2luZCAoMjhCRCkgYWx3YXlzIHNlZW1zIHRvIGJlIDB4MTYgbm90IDB4MTUuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERhdGEgZXh0ZW5kcyBPb3BzeURhdGEge1xyXG4gIGhhc1Rocm90dGxlPzogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG59XHJcblxyXG4vLyBPNVMgLSBTaWdtYXNjYXBlIDEuMCBTYXZhZ2VcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlNpZ21hc2NhcGVWMTBTYXZhZ2UsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ081UyBXcm90aCBHaG9zdCBFbmN1bWJlcic6ICcyOEI2JywgLy8gc3F1YXJlcyBhcHBlYXJpbmdcclxuICAgICdPNVMgU2FpbnRseSBCZWFuJzogJzI4QjQnLCAvLyBjaGFzaW5nIGxpZ2h0c1xyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdPNVMgVGhyb3R0bGUgR2FpbicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICczQUEnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiAoZGF0YS5oYXNUaHJvdHRsZSA/Pz0ge30pW21hdGNoZXMudGFyZ2V0XSA9IHRydWUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ081UyBUaHJvdHRsZSBEZWF0aCcsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICczQUEnIH0pLFxyXG4gICAgICBkZWxheVNlY29uZHM6IChfZGF0YSwgbWF0Y2hlcykgPT4gcGFyc2VGbG9hdChtYXRjaGVzLmR1cmF0aW9uKSAtIDEsXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGlmIChkYXRhLmhhc1Rocm90dGxlPy5bbWF0Y2hlcy50YXJnZXRdKVxyXG4gICAgICAgICAgcmV0dXJuIHsgbmFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuZWZmZWN0IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ081UyBUaHJvdHRsZSBMb3NlJyxcclxuICAgICAgdHlwZTogJ0xvc2VzRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMubG9zZXNFZmZlY3QoeyBlZmZlY3RJZDogJzNBQScgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IChkYXRhLmhhc1Rocm90dGxlID8/PSB7fSlbbWF0Y2hlcy50YXJnZXRdID0gZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBHZXR0aW5nIGhpdCBieSBhIGdob3N0IHdpdGhvdXQgdGhyb3R0bGUgKHRoZSBtYW5kYXRvcnkgcG9zdC1jaGltbmV5IG9uZSkuXHJcbiAgICAgIGlkOiAnTzVTIFBvc3Nlc3MnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICcyOEFDJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiAhZGF0YS5oYXNUaHJvdHRsZT8uW21hdGNoZXMudGFyZ2V0XSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmludGVyZmFjZSBEYXRhIGV4dGVuZHMgT29wc3lEYXRhIHtcclxuICBoYXNGaXJlUmVzaXN0PzogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG59XHJcblxyXG4vLyBPNk4gLSBTaWdtYXNjYXBlIDIuMCBOb3JtYWxcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlNpZ21hc2NhcGVWMjAsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ082TiBFYXJ0aHF1YWtlJzogJzI4MTEnLCAvLyBmYWlsaW5nIHRvIGJlIGluIGEgcGxhbmVcclxuICAgICdPNk4gRGVtb25pYyBTdG9uZSc6ICcyODQ3JywgLy8gY2hhc2luZyBjaXJjbGVzXHJcbiAgICAnTzZOIERlbW9uaWMgV2F2ZSc6ICcyODMxJywgLy8gZmFpbGluZyB0byBiZSBiZWhpbmQgcm9ja1xyXG4gICAgJ082TiBEZW1vbmljIFNwb3V0IDEnOiAnMjgzNScsIC8vIHBhaXIgb2YgdGFyZ2V0ZWQgY2lyY2xlcyAoIzEpXHJcbiAgICAnTzZOIERlbW9uaWMgU3BvdXQgMic6ICcyODM3JywgLy8gcGFpciBvZiB0YXJnZXRlZCBjaXJjbGVzICgjMilcclxuICAgICdPNk4gRmVhdGhlcmxhbmNlJzogJzJBRTgnLCAvLyBibG93biBhd2F5IEVhc3Rlcmx5IGNpcmNsZXNcclxuICAgICdPNk4gSW50ZW5zZSBQYWluJzogJzJBRTcnLCAvLyBmYWlsaW5nIHRvIHNwcmVhZCBmb3IgRGVtb25pYyBQYWluIHRldGhlclxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdPNk4gRmlyZSBSZXNpc3RhbmNlIEdhaW4nLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnNUVEJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4gKGRhdGEuaGFzRmlyZVJlc2lzdCA/Pz0ge30pW21hdGNoZXMudGFyZ2V0XSA9IHRydWUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ082TiBGaXJlIFJlc2lzdGFuY2UgTG9zZScsXHJcbiAgICAgIHR5cGU6ICdMb3Nlc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmxvc2VzRWZmZWN0KHsgZWZmZWN0SWQ6ICc1RUQnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiAoZGF0YS5oYXNGaXJlUmVzaXN0ID8/PSB7fSlbbWF0Y2hlcy50YXJnZXRdID0gZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBGbGFzaCBGaXJlIHdpdGhvdXQgRmlyZSBSZXNpc3RhbmNlLlxyXG4gICAgICBpZDogJ082TiBGbGFzaCBGaXJlJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICcyODBCJyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gIWRhdGEuaGFzRmlyZVJlc2lzdD8uW21hdGNoZXMudGFyZ2V0XSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuaW50ZXJmYWNlIERhdGEgZXh0ZW5kcyBPb3BzeURhdGEge1xyXG4gIGhhc0ZpcmVSZXNpc3Q/OiB7IFtuYW1lOiBzdHJpbmddOiBib29sZWFuIH07XHJcbn1cclxuXHJcbi8vIE82UyAtIFNpZ21hc2NhcGUgMi4wIFNhdmFnZVxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuU2lnbWFzY2FwZVYyMFNhdmFnZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnTzZTIEVhcnRocXVha2UnOiAnMjgxMCcsIC8vIGZhaWxpbmcgdG8gYmUgaW4gYSBwbGFuZVxyXG4gICAgJ082UyBSb2NrIEhhcmQnOiAnMjgxMicsIC8vIGZyb20gcG9ydHJheWFsIG9mIGVhcnRoP1xyXG4gICAgJ082UyBGbGFzaCBUb3JyZW50IDEnOiAnMkFCOScsIC8vIGZyb20gcG9ydHJheWFsIG9mIHdhdGVyPz9cclxuICAgICdPNlMgRmxhc2ggVG9ycmVudCAyJzogJzI4MEYnLCAvLyBmcm9tIHBvcnRyYXlhbCBvZiB3YXRlcj8/XHJcbiAgICAnTzZTIEVhc3Rlcmx5IEZlYXRoZXJsYW5jZSc6ICcyODNFJywgLy8gYmxvd24gYXdheSBFYXN0ZXJseSBjaXJjbGVzXHJcbiAgICAnTzZTIERlbW9uaWMgV2F2ZSc6ICcyODMwJywgLy8gZmFpbGluZyB0byBiZSBiZWhpbmQgcm9ja1xyXG4gICAgJ082UyBEZW1vbmljIFNwb3V0JzogJzI4MzYnLCAvLyBwYWlyIG9mIHRhcmdldGVkIGNpcmNsZSdcclxuICAgICdPNlMgRGVtb25pYyBTdG9uZSAxJzogJzI4NDQnLCAvLyBjaGFzaW5nIGNpcmNsZSBpbml0aWFsXHJcbiAgICAnTzZTIERlbW9uaWMgU3RvbmUgMic6ICcyODQ1JywgLy8gY2hhc2luZyBjaXJjbGUgcmVwZWF0ZWRcclxuICAgICdPNlMgSW50ZW5zZSBQYWluJzogJzI4M0EnLCAvLyBmYWlsaW5nIHRvIHNwcmVhZCBmb3IgRGVtb25pYyBQYWluIHRldGhlclxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnTzZTIFRoZSBQcmljZSc6ICcyODI2JywgLy8gZXhwbG9kaW5nIExhc3QgS2lzcyB0YW5rYnVzdGVyIGRlYnVmZlxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdPNlMgRmlyZSBSZXNpc3RhbmNlIEdhaW4nLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnNUVEJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4gKGRhdGEuaGFzRmlyZVJlc2lzdCA/Pz0ge30pW21hdGNoZXMudGFyZ2V0XSA9IHRydWUsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ082UyBGaXJlIFJlc2lzdGFuY2UgTG9zZScsXHJcbiAgICAgIHR5cGU6ICdMb3Nlc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmxvc2VzRWZmZWN0KHsgZWZmZWN0SWQ6ICc1RUQnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiAoZGF0YS5oYXNGaXJlUmVzaXN0ID8/PSB7fSlbbWF0Y2hlcy50YXJnZXRdID0gZmFsc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBGbGFzaCBGaXJlIHdpdGhvdXQgRmlyZSBSZXNpc3RhbmNlLlxyXG4gICAgICBpZDogJ082UyBGbGFzaCBGaXJlJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICcyODBBJyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gIWRhdGEuaGFzRmlyZVJlc2lzdD8uW21hdGNoZXMudGFyZ2V0XSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gTG9vayBhd2F5OyBkb2VzIGRhbWFnZSBpZiBmYWlsZWQuXHJcbiAgICAgIGlkOiAnTzZTIERpdmluZSBMdXJlJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMjgyMicsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS5EYW1hZ2VGcm9tTWF0Y2hlcyhtYXRjaGVzKSA+IDAsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuLy8gVE9ETzogc3RhbmRpbmcgaW4gdGhlIHdyb25nIHNpZGUgb2YgSW50ZXJkaW1lbnNpb25hbCBCb21iIGNhdXNlc1xyXG4vLyAgICAgICBJbnRlcmRpbWVuc2lvbmFsIEV4cGxvc2lvbiAoMjc2MykgYW5kIGFsc28gZ2l2ZXMgeW91IGEgcmVkXHJcbi8vICAgICAgIFggaGVhZG1hcmtlciBsaWtlIEJhcmRhbSdzIE1ldHRsZSBib3NzIDIuICBIb3dldmVyLCB0aGlzXHJcbi8vICAgICAgIGlzbid0IGFuIGFjdHVhbCBoZWFkbWFya2VyIGxpbmUuICBTbywgdGhlcmUgaXMgbm8gd2F5IHRvXHJcbi8vICAgICAgIGRpZmZlcmVudGlhdGUgXCJzb21lYm9keSBmYWlsZWQgdGhpc1wiIHZzIFwibm9ib2R5IGdvdCBpdFwiLlxyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIE83TiAtIFNpZ21hc2NhcGUgMy4wIE5vcm1hbFxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuU2lnbWFzY2FwZVYzMCxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnTzdOIE1hZ2l0ZWsgUmF5JzogJzI3NkInLCAvLyB1bnRlbGVncmFwaGVkIGZyb250YWwgbGluZVxyXG4gICAgJ083TiBJbmsnOiAnMjc1RCcsIC8vIEluaXRpYWwgVWx0cm9zIHRhcmdldGVkIGNpcmNsZXNcclxuICAgICdPN04gVGVudGFjbGUnOiAnMjc1RicsIC8vIFRlbnRhY2xlIHNpbXVsYXRpb24gdGFyZ2V0ZWQgY2lyY2xlc1xyXG4gICAgJ083TiBXYWxsb3AnOiAnMjc2MCcsIC8vIFVsdHJvcyB0ZW50YWNsZXMgYXR0YWNraW5nXHJcbiAgICAnTzdOIENoYWluIENhbm5vbic6ICcyNzcwJywgLy8gYmFpdGVkIGFpcnNoaXAgYWRkIGNhbm5vblxyXG4gICAgJ083TiBNaXNzaWxlIEV4cGxvc2lvbic6ICcyNzY1JywgLy8gSGl0dGluZyBhIG1pc3NpbGVcclxuICAgICdPN04gQmlibGlvdGFwaCBEZWVwIERhcmtuZXNzJzogJzI5QkYnLCAvLyBnaWFudCBkb251dFxyXG4gICAgJ083TiBEYWRhbHVtYSBBdXJhIENhbm5vbic6ICcyNzY3JywgLy8gbGFyZ2UgbGluZSBhb2VcclxuICAgICdPN04gR3VhcmRpYW4gRGlmZnJhY3RpdmUgTGFzZXInOiAnMjc2MScsIC8vIGluaXRpYWwgQWlyIEZvcmNlIGNlbnRlcmVkIGNpcmNsZSBvbiBHdWFyZGlhblxyXG4gICAgJ083TiBBaXIgRm9yY2UgRGlmZnJhY3RpdmUgTGFzZXInOiAnMjczRicsIC8vIEFpciBGb3JjZSBhZGQgbGFyZ2UgY29uYWxcclxuICAgICdPN04gSW50ZXJkaW1lbnNpb25hbCBFeHBsb3Npb24nOiAnMjc2MycsIC8vIEZhaWxlZCBib21iIChlaXRoZXIgd3Jvbmcgc2lkZSBvciBpZ25vcmVkKVxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ083TiBTdXBlciBDaGFrcmEgQnVyc3QnOiAnMjc2OScsIC8vIE1pc3NlZCBEYWRhbHVtYSB0b3dlciAoaGl0cyBldmVyeWJvZHkpXHJcbiAgfSxcclxuICBnYWluc0VmZmVjdEZhaWw6IHtcclxuICAgICdPN04gU2hvY2tlZCc6ICc1REEnLCAvLyB0b3VjaGluZyBhcmVuYSBlZGdlXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gVE9ETzogSW5rICgyNzdEKSBzZWVtcyB0byBhbHdheXMgYmUgMHgxNlxyXG4vLyBUT0RPOiBGYWlsaW5nIFZpcnVzP1xyXG4vLyBUT0RPOiBmYWlsaW5nIEludGVyZGltZW5zaW9uYWwgQm9tYnM/XHJcblxyXG4vLyBPN1MgLSBTaWdtYXNjYXBlIDMuMCBTYXZhZ2VcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlNpZ21hc2NhcGVWMzBTYXZhZ2UsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ083UyBNYWdpdGVrIFJheSc6ICcyNzg4JywgLy8gZnJvbnQgbGluZSBsYXNlclxyXG4gICAgJ083UyBMaWdodG5pbmcgQm9tYiBFeHBsb3Npb24nOiAnMjc4RScsIC8vIGJhaXRlZCBvcmJzXHJcbiAgICAnTzdTIENoYWluIENhbm5vbic6ICcyNzhGJywgLy8gZGFtYWdlIGZyb20gYmFpdGVkIGFlcmlhbCBhdHRhY2tcclxuICAgICdPN1MgVGVudGFjbGUnOiAnMjc3RScsIC8vIHRlbnRhY2xlcyBhcHBlYXJpbmdcclxuICAgICdPN1MgVGVudGFjbGUgV2FsbG9wJzogJzI3N0YnLCAvLyB0ZW50YWNsZXMgYXR0YWNraW5nXHJcbiAgICAnTzdTIEFpciBGb3JjZSBEaWZmcmFjdGl2ZSBMYXNlcic6ICcyNzQwJywgLy8gQWlyIEZvcmNlIGFkZHMgY29uYWxcclxuICAgICdPN04gR3VhcmRpYW4gRGlmZnJhY3RpdmUgTGFzZXInOiAnMjc4MCcsIC8vIGluaXRpYWwgQWlyIEZvcmNlIGNlbnRlcmVkIGNpcmNsZSBvbiBHdWFyZGlhblxyXG4gICAgJ083UyBUaGUgSGVhdCc6ICcyNzc3JywgLy8gZXhwbG9zaW9uIGZyb20gc2VhcmluZyB3aW5kXHJcbiAgICAnTzdTIFN1cGVyIENoYWtyYSBCdXJzdCc6ICcyNzg2JywgLy8gZmFpbGluZyBEYWRhbHVtYSB0b3dlcnNcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdPN1MgTWlzc2lsZSc6ICcyNzgyJyxcclxuICB9LFxyXG4gIGdhaW5zRWZmZWN0RmFpbDoge1xyXG4gICAgJ083UyBTaG9ja2VkJzogJzVEQScsIC8vIHRvdWNoaW5nIGFyZW5hIGVkZ2VcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ083UyBBdXJhIENhbm5vbic6ICcyNzg0JywgLy8gRGFkYWx1bWEgbGluZSBhb2VcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTzdTIFN0b25lc2tpbicsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnMkFCNScgfSksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMuc291cmNlLCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gTzhOIC0gU2lnbWFzY2FwZSA0LjAgTm9ybWFsXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5TaWdtYXNjYXBlVjQwLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdPOE4gQmxpenphcmQgQmxpdHogMSc6ICcyOTE4JyxcclxuICAgICdPOE4gQmxpenphcmQgQmxpdHogMic6ICcyOTE0JyxcclxuICAgICdPOE4gVGhydW1taW5nIFRodW5kZXIgMSc6ICcyOTFEJyxcclxuICAgICdPOE4gVGhydW1taW5nIFRodW5kZXIgMic6ICcyOTFDJyxcclxuICAgICdPOE4gVGhydW1taW5nIFRodW5kZXIgMyc6ICcyOTFCJyxcclxuICAgICdPOE4gV2F2ZSBDYW5ub24nOiAnMjkyOCcsIC8vIHRlbGVncmFwaGVkIGxpbmUgYW9lc1xyXG4gICAgJ084TiBSZXZvbHRpbmcgUnVpbic6ICcyOTIzJywgLy8gbGFyZ2UgMTgwIGNsZWF2ZSBhZnRlciBUaW1lbHkgVGVsZXBvcnRcclxuICAgICdPOE4gSW50ZW1wZXJhdGUgV2lsbCc6ICcyOTJBJywgLy8gZWFzdCAxODAgY2xlYXZlXHJcbiAgICAnTzhOIEdyYXZpdGF0aW9uYWwgV2F2ZSc6ICcyOTJCJywgLy8gd2VzdCAxODAgY2xlYXZlXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdPOE4gRmxhZ3JhbnQgRmlyZSBTcHJlYWQnOiAnMjkxRicsIC8vIHRydWUgc3ByZWFkIG1hcmtlcnNcclxuICB9LFxyXG4gIHNvbG9XYXJuOiB7XHJcbiAgICAnTzhOIEZsYWdyYW50IEZpcmUgU3RhY2snOiAnMjkyMCcsIC8vIGZha2Ugc3ByZWFkIG1hcmtlclxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgLy8gTG9vayBhd2F5OyBkb2VzIGRhbWFnZSBpZiBmYWlsZWQuXHJcbiAgICAgIGlkOiAnTzhOIEluZG9sZW50IFdpbGwnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICcyOTJDJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiBkYXRhLkRhbWFnZUZyb21NYXRjaGVzKG1hdGNoZXMpID4gMCxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gTG9vayB0b3dhcmRzOyBkb2VzIGRhbWFnZSBpZiBmYWlsZWQuXHJcbiAgICAgIGlkOiAnTzhOIEF2ZSBNYXJpYScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzI5MkInLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IGRhdGEuRGFtYWdlRnJvbU1hdGNoZXMobWF0Y2hlcykgPiAwLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ084TiBTaG9ja3dhdmUnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzI5MjcnIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ0tub2NrZWQgb2ZmJyxcclxuICAgICAgICAgICAgZGU6ICdSdW50ZXJnZWZhbGxlbicsXHJcbiAgICAgICAgICAgIGZyOiAnQSDDqXTDqSBhc3NvbW3DqShlKScsXHJcbiAgICAgICAgICAgIGphOiAn44OO44OD44Kv44OQ44OD44KvJyxcclxuICAgICAgICAgICAgY246ICflh7vpgIDlnaDokL0nLFxyXG4gICAgICAgICAgICBrbzogJ+uEieuwsScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ084TiBBZXJvIEFzc2F1bHQnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzI5MjQnIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ0tub2NrZWQgb2ZmJyxcclxuICAgICAgICAgICAgZGU6ICdSdW50ZXJnZWZhbGxlbicsXHJcbiAgICAgICAgICAgIGZyOiAnQSDDqXTDqSBhc3NvbW3DqShlKScsXHJcbiAgICAgICAgICAgIGphOiAn44OO44OD44Kv44OQ44OD44KvJyxcclxuICAgICAgICAgICAgY246ICflh7vpgIDlnaDokL0nLFxyXG4gICAgICAgICAgICBrbzogJ+uEieuwsScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFRPRE86IGZhaWxpbmcgbWV0ZW9yIHRvd2Vycz9cclxuXHJcbi8vIE84UyAtIFNpZ21hc2NhcGUgNC4wIFNhdmFnZVxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuU2lnbWFzY2FwZVY0MFNhdmFnZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnTzhTMSBUaHJ1bW1pbmcgVGh1bmRlciAxJzogJzI4Q0InLFxyXG4gICAgJ084UzEgVGhydW1taW5nIFRodW5kZXIgMic6ICcyOENDJyxcclxuICAgICdPOFMxIFRocnVtbWluZyBUaHVuZGVyIDMnOiAnMjhDRCcsXHJcbiAgICAnTzhTMSBUaHJ1bW1pbmcgVGh1bmRlciA0JzogJzJCMzEnLFxyXG4gICAgJ084UzEgVGhydW1taW5nIFRodW5kZXIgNSc6ICcyQjJGJyxcclxuICAgICdPOFMxIFRocnVtbWluZyBUaHVuZGVyIDYnOiAnMkIzMCcsXHJcbiAgICAnTzhTMSBCbGl6emFyZCBCbGl0eiAxJzogJzI4QzQnLFxyXG4gICAgJ084UzEgQmxpenphcmQgQmxpdHogMic6ICcyQkNBJyxcclxuICAgICdPOFMxIEluZXhvcmFibGUgV2lsbCc6ICcyOERBJywgLy8gZ3JvdW5kIGNpcmNsZXNcclxuICAgICdPOFMxIFJldm9sdGluZyBSdWluJzogJzI4RDUnLCAvLyBsYXJnZSAxODAgY2xlYXZlIGFmdGVyIFRpbWVseSBUZWxlcG9ydFxyXG4gICAgJ084UzEgSW50ZW1wZXJhdGUgV2lsbCc6ICcyOERGJywgLy8gZWFzdCAxODAgY2xlYXZlXHJcbiAgICAnTzhTMSBHcmF2aXRhdGlvbmFsIFdhdmUnOiAnMjhERScsIC8vIHdlc3QgMTgwIGNsZWF2ZVxyXG4gICAgJ084UzIgQmxpenphcmQgSUlJIDEnOiAnMjkwOCcsIC8vIGNlbGVzdHJpYWQgY2VudGVyIGNpcmNsZVxyXG4gICAgJ084UzIgQmxpenphcmQgSUlJIDInOiAnMjkwOScsIC8vIGNlbGVzdHJpYWQgZG9udXRcclxuICAgICdPOFMyIFRodW5kZXIgSUlJJzogJzI5MEEnLCAvLyBjZWxlc3RyaWFkIGNyb3NzIGxpbmVzXHJcbiAgICAnTzhTMiBUcmluZSAxJzogJzI5MEUnLCAvLyBlYXRpbmcgdGhlIGdvbGRlbiBkb3JpdG9cclxuICAgICdPOFMyIFRyaW5lIDInOiAnMjkwRicsIC8vIGVhdGluZyB0aGUgYmlnIGdvbGRlbiBkb3JpdG9cclxuICAgICdPOFMyIE1ldGVvcic6ICcyOTAzJywgLy8gY2hhc2luZyBwdWRkbGVzIGR1cmluZyAybmQgZm9yc2FrZW4gKE1ldGVvciAyOTA0ID0gdG93ZXIpXHJcbiAgICAnTzhTMiBBbGwgVGhpbmdzIEVuZGluZyAxJzogJzI4RjAnLCAvLyBGdXR1cmVzIE51bWJlcmVkIGZvbGxvd3VwXHJcbiAgICAnTzhTMiBBbGwgVGhpbmdzIEVuZGluZyAyJzogJzI4RjInLCAvLyBQYXN0cyBGb3Jnb3R0ZW4gZm9sbG93dXBcclxuICAgICdPOFMyIEFsbCBUaGluZ3MgRW5kaW5nIDMnOiAnMjhGNicsIC8vIEZ1dHVyZSdzIEVuZCBmb2xsb3d1cFxyXG4gICAgJ084UzIgQWxsIFRoaW5ncyBFbmRpbmcgNCc6ICcyOEY5JywgLy8gUGFzdCdzIEVuZCBmb2xsb3d1cFxyXG4gICAgJ084UzIgV2luZ3MgT2YgRGVzdHJ1Y3Rpb24gMSc6ICcyOEZGJywgLy8gaGFsZiBjbGVhdmVcclxuICAgICdPOFMyIFdpbmdzIE9mIERlc3RydWN0aW9uIDInOiAnMjhGRScsIC8vIGhhbGYgY2xlYXZlXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnTzhTMiBUaGUgTWFkIEhlYWQgQmlnIEV4cGxvc2lvbic6ICcyOEZEJywgLy8gbm90IHRvdWNoaW5nIHNrdWxsXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdPOFMxIFZpdHJvcGh5cmUnOiAnMjhFMicsIC8vIHllbGxvdyByaWdodCB0ZXRoZXIgdGhhdCBtdXN0IGJlIHNvbG8gKG9yIGtub2NrYmFjaylcclxuICAgICdPOFMxIEZsYWdyYW50IEZpcmUgU3ByZWFkJzogJzI4Q0YnLFxyXG4gICAgJ084UzIgRmlyZSBJSUkgU3ByZWFkJzogJzI5MEInLCAvLyBjZWxlc3RyaWFkIHNwcmVhZFxyXG4gICAgJ084UzIgVGhlIE1hZCBIZWFkIEV4cGxvc2lvbic6ICcyOEZDJywgLy8gc2t1bGwgdGV0aGVyc1xyXG4gIH0sXHJcbiAgc2hhcmVGYWlsOiB7XHJcbiAgICAnTzhTMSBIeXBlcmRyaXZlJzogJzI4RTgnLCAvLyBwaGFzZSAxIHRhbmtidXN0ZXJcclxuICAgICdPOFMyIEh5cGVyZHJpdmUnOiAnMjI5MTI4RTgnLCAvLyBwaGFzZSAyIHRhbmtidXN0ZXJcclxuICAgICdPOFMyIFdpbmdzIE9mIERlc3RydWN0aW9uJzogJzI5MDEnLCAvLyBjbG9zZS9mYXIgdGFuayBidXN0ZXJzXHJcbiAgfSxcclxuICBzb2xvV2Fybjoge1xyXG4gICAgJ084UzEgRmxhZ3JhbnQgRmlyZSBTdGFjayc6ICcyOEQwJyxcclxuICAgICdPOFMxIEdyYXZpdGFzJzogJzI4RTAnLCAvLyBwdXJwbGUgbGVmdCB0ZXRoZXIgdGhhdCBtdXN0IGJlIHNoYXJlZCwgbGVhdmluZyBhIHB1ZGRsZVxyXG4gICAgJ084UzEgSW5kb21pdGFibGUgV2lsbCc6ICcyOEQ5JywgLy8gNHggc3RhY2sgbWFya2Vyc1xyXG4gICAgJ084UzIgRmlyZSBJSUkgU3RhY2snOiAnMjkwQycsIC8vIGNlbGVzdHJpYWQgc3RhY2tcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIC8vIExvb2sgYXdheTsgZG9lcyBkYW1hZ2UgaWYgZmFpbGVkLlxyXG4gICAgICBpZDogJ084UyBJbmRvbGVudCBXaWxsJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMjhFNCcsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS5EYW1hZ2VGcm9tTWF0Y2hlcyhtYXRjaGVzKSA+IDAsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIExvb2sgdG93YXJkczsgZG9lcyBkYW1hZ2UgaWYgZmFpbGVkLlxyXG4gICAgICBpZDogJ084UyBBdmUgTWFyaWEnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICcyOEUzJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiBkYXRhLkRhbWFnZUZyb21NYXRjaGVzKG1hdGNoZXMpID4gMCxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdPOFMgU2hvY2t3YXZlJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICcyOERCJyB9KSxcclxuICAgICAgZGVhdGhSZWFzb246IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdLbm9ja2VkIG9mZicsXHJcbiAgICAgICAgICAgIGRlOiAnUnVudGVyZ2VmYWxsZW4nLFxyXG4gICAgICAgICAgICBmcjogJ0Egw6l0w6kgYXNzb21tw6koZSknLFxyXG4gICAgICAgICAgICBqYTogJ+ODjuODg+OCr+ODkOODg+OCrycsXHJcbiAgICAgICAgICAgIGNuOiAn5Ye76YCA5Z2g6JC9JyxcclxuICAgICAgICAgICAga286ICfrhInrsLEnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdPOFMgQWVybyBBc3NhdWx0JyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICcyOEQ2JyB9KSxcclxuICAgICAgZGVhdGhSZWFzb246IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdLbm9ja2VkIG9mZicsXHJcbiAgICAgICAgICAgIGRlOiAnUnVudGVyZ2VmYWxsZW4nLFxyXG4gICAgICAgICAgICBmcjogJ0Egw6l0w6kgYXNzb21tw6koZSknLFxyXG4gICAgICAgICAgICBqYTogJ+ODjuODg+OCr+ODkOODg+OCrycsXHJcbiAgICAgICAgICAgIGNuOiAn5Ye76YCA5Z2g6JC9JyxcclxuICAgICAgICAgICAga286ICfrhInrsLEnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gTzlOIC0gQWxwaGFzY2FwZSAxLjAgTm9ybWFsXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5BbHBoYXNjYXBlVjEwLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdPOU4gRGFtbmluZyBFZGljdCc6ICczMTUwJywgLy8gaHVnZSAxODAgZnJvbnRhbCBjbGVhdmVcclxuICAgICdPOU4gU3RyYXkgU3ByYXknOiAnMzE2QycsIC8vIER5bmFtaWMgRmx1aWQgZGVidWZmIGRvbnV0IGV4cGxvc2lvblxyXG4gICAgJ085TiBTdHJheSBGbGFtZXMnOiAnMzE2QicsIC8vIEVudHJvcHkgZGVidWZmIGNpcmNsZSBleHBsb3Npb25cclxuICAgICdPOU4gS25vY2tkb3duIEJpZyBCYW5nJzogJzMxNjAnLCAvLyBiaWcgY2lyY2xlIHdoZXJlIEtub2NrZG93biBtYXJrZXIgZHJvcHBlZFxyXG4gICAgJ085TiBGaXJlIEJpZyBCYW5nJzogJzMxNUYnLCAvLyBncm91bmQgY2lyY2xlcyBkdXJpbmcgZmlyZSBwaGFzZVxyXG4gICAgJ085TiBTaG9ja3dhdmUnOiAnMzE1MycsIC8vIExvbmdpdHVkaW5hbC9MYXRpdWRpbmFsIEltcGxvc2lvblxyXG4gICAgJ085TiBDaGFvc3BoZXJlIEZpZW5kaXNoIE9yYnMgT3Jic2hhZG93IDEnOiAnMzE2MicsIC8vIGxpbmUgYW9lcyBmcm9tIEVhcnRoIHBoYXNlIG9yYnNcclxuICAgICdPOU4gQ2hhb3NwaGVyZSBGaWVuZGlzaCBPcmJzIE9yYnNoYWRvdyAyJzogJzMxNjMnLCAvLyBsaW5lIGFvZXMgZnJvbSBFYXJ0aCBwaGFzZSBvcmJzXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFRPRE86IEFraCBSaGFpICgzNjI0KSBpcyBub3QgdW51c3VhbCB0byB0YWtlIH4xIGhpdCBmcm9tLCBzbyBkb24ndCBsaXN0LlxyXG5cclxuLy8gTzEwTiAtIEFscGhhc2NhcGUgMi4wIE5vcm1hbFxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuQWxwaGFzY2FwZVYyMCxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnTzEwTiBBenVyZSBXaW5ncyc6ICczMUNEJywgLy8gT3V0XHJcbiAgICAnTzEwTiBTdHlnaWFuIE1hdyc6ICczMUNGJywgLy8gSW5cclxuICAgICdPMTBOIEhvcnJpZCBSb2FyJzogJzMxRDMnLCAvLyB0YXJnZXRlZCBjaXJjbGVzXHJcbiAgICAnTzEwTiBCbG9vZGllZCBNYXcnOiAnMzFEMCcsIC8vIENvcm5lcnNcclxuICAgICdPMTBOIENhdXRlcml6ZSc6ICczMjQxJywgLy8gZGl2ZWJvbWIgYXR0YWNrXHJcbiAgICAnTzEwTiBTY2FybGV0IFRocmVhZCc6ICczNjJCJywgLy8gb3JiIHdhZmZsZSBsaW5lc1xyXG4gICAgJ08xME4gRXhhZmxhcmUgMSc6ICczNjJEJyxcclxuICAgICdPMTBOIEV4YWZsYXJlIDInOiAnMzYyRicsXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdPMTBOIEVhcnRoIFNoYWtlcic6ICczMUQxJywgLy8gYXMgaXQgc2F5cyBvbiB0aGUgdGluXHJcbiAgICAnTzEwTiBGcm9zdCBCcmVhdGgnOiAnMzNFRScsIC8vIEFuY2llbnQgRHJhZ29uIGZyb250YWwgY29uYWxcclxuICAgICdPMTBOIFRodW5kZXJzdG9ybSc6ICczMUQyJywgLy8gcHVycGxlIHNwcmVhZCBtYXJrZXJcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gTzExTiAtIEFscGhhc2NhcGUgMy4wIE5vcm1hbFxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuQWxwaGFzY2FwZVYzMCxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnTzExTiBTdGFyYm9hcmQgV2F2ZSBDYW5ub24gMSc6ICczMjgxJywgLy8gaW5pdGlhbCByaWdodCBjbGVhdmVcclxuICAgICdPMTFOIFN0YXJib2FyZCBXYXZlIENhbm5vbiAyJzogJzMyODInLCAvLyBmb2xsb3ctdXAgcmlnaHQgY2xlYXZlXHJcbiAgICAnTzExTiBMYXJib2FyZCBXYXZlIENhbm5vbiAxJzogJzMyODMnLCAvLyBpbml0aWFsIGxlZnQgY2xlYXZlXHJcbiAgICAnTzExTiBMYXJib2FyZCBXYXZlIENhbm5vbiAyJzogJzMyODQnLCAvLyBmb2xsb3ctdXAgbGVmdCBjbGVhdmVcclxuICAgICdPMTFOIEZsYW1lIFRocm93ZXInOiAnMzI3RCcsIC8vIHBpbndoZWVsIGNvbmFsc1xyXG4gICAgJ08xMU4gQ3JpdGljYWwgU3RvcmFnZSBWaW9sYXRpb24nOiAnMzI3OScsIC8vIG1pc3NpbmcgbWlkcGhhc2UgdG93ZXJzXHJcbiAgICAnTzExTiBMZXZlbCBDaGVja2VyIFJlc2V0JzogJzM1QUEnLCAvLyBcImdldCBvdXRcIiBjaXJjbGVcclxuICAgICdPMTFOIExldmVsIENoZWNrZXIgUmVmb3JtYXQnOiAnMzVBOScsIC8vIFwiZ2V0IGluXCIgZG9udXRcclxuICAgICdPMTFOIFJvY2tldCBQdW5jaCBSdXNoJzogJzM2MDYnLCAvLyBnaWFudCBoYW5kIDEvMyBhcmVuYSBsaW5lIGFvZXNcclxuICB9LFxyXG4gIGdhaW5zRWZmZWN0V2Fybjoge1xyXG4gICAgJ08xMU4gQnVybnMnOiAnRkEnLCAvLyBzdGFuZGluZyBpbiBiYWxsaXN0aWMgbWlzc2lsZSBmaXJlIHB1ZGRsZVxyXG4gIH0sXHJcbiAgZ2FpbnNFZmZlY3RGYWlsOiB7XHJcbiAgICAnTzExTiBNZW1vcnkgTG9zcyc6ICc2NUEnLCAvLyBmYWlsaW5nIHRvIGNsZWFuc2UgTG9vcGVyIGluIGEgdG93ZXJcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ08xMU4gQmFsbGlzdGljIEltcGFjdCc6ICczMjdGJywgLy8gc3ByZWFkIG1hcmtlcnNcclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgJ08xMU4gQmxhc3Rlcic6ICczMjgwJywgLy8gdGFuayB0ZXRoZXJcclxuICB9LFxyXG4gIHNvbG9GYWlsOiB7XHJcbiAgICAnTzExTiBFbGVjdHJpYyBTbGlkZSc6ICczMjg1JywgLy8gc3RhY2sgbWFya2VyXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gTzEyTiAtIEFscGhhc2NhcGUgNC4wIE5vcm1hbFxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuQWxwaGFzY2FwZVY0MCxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnTzEyTiBGbG9vZGxpZ2h0JzogJzMzMDknLCAvLyB0YXJnZXRlZCBjaXJjdWxhciBhb2VzIGFmdGVyIFByb2dyYW0gQWxwaGFcclxuICAgICdPMTJOIEVmZmljaWVudCBCbGFkZXdvcmsnOiAnMzJGRicsIC8vIHRlbGVncmFwaGVkIGNlbnRlcmVkIGNpcmNsZVxyXG4gICAgJ08xMk4gRWZmaWNpZW50IEJsYWRld29yayBVbnRlbGVncmFwaGVkJzogJzMyRjMnLCAvLyBjZW50ZXJlZCBjaXJjbGUgYWZ0ZXIgdHJhbnNmb3JtYXRpb25cclxuICAgICdPMTJOIE9wdGltaXplZCBCbGl6emFyZCBJSUknOiAnMzMwMycsIC8vIGNyb3NzIGFvZVxyXG4gICAgJ08xMk4gU3VwZXJsaW1pbmFsIFN0ZWVsIDEnOiAnMzMwNicsIC8vIHNpZGVzIG9mIHRoZSByb29tXHJcbiAgICAnTzEyTiBTdXBlcmxpbWluYWwgU3RlZWwgMic6ICczMzA3JywgLy8gc2lkZXMgb2YgdGhlIHJvb21cclxuICAgICdPMTJOIEJleW9uZCBTdHJlbmd0aCc6ICczMzAwJywgLy8gZG9udXRcclxuICAgICdPMTJOIE9wdGljYWwgTGFzZXInOiAnMzMyMCcsIC8vIGxpbmUgYW9lIGZyb20gZXllXHJcbiAgICAnTzEyTiBPcHRpbWl6ZWQgU2FnaXR0YXJpdXMgQXJyb3cnOiAnMzMyMycsIC8vIGxpbmUgYW9lIGZyb20gT21lZ2EtTVxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnTzEyTiBTb2xhciBSYXknOiAnMzMwRicsIC8vIGNpcmN1bGFyIHRhbmtidXN0ZXJcclxuICB9LFxyXG4gIHNvbG9XYXJuOiB7XHJcbiAgICAnTzEyTiBTcG90bGlnaHQnOiAnMzMwQScsIC8vIHN0YWNrIG1hcmtlclxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdPMTJOIERpc2NoYXJnZXIgS25vY2tlZCBPZmYnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzMyRjYnIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ0tub2NrZWQgb2ZmJyxcclxuICAgICAgICAgICAgZGU6ICdSdW50ZXJnZWZhbGxlbicsXHJcbiAgICAgICAgICAgIGZyOiAnQSDDqXTDqSBhc3NvbW3DqShlKScsXHJcbiAgICAgICAgICAgIGphOiAn44OO44OD44Kv44OQ44OD44KvJyxcclxuICAgICAgICAgICAgY246ICflh7vpgIDlnaDokL0nLFxyXG4gICAgICAgICAgICBrbzogJ+uEieuwsScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEYXRhIGV4dGVuZHMgT29wc3lEYXRhIHtcclxuICB2dWxuPzogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG59XHJcblxyXG4vLyBUT0RPOiBjb3VsZCBhZGQgUGF0Y2ggd2FybmluZ3MgZm9yIGRvdWJsZS91bmJyb2tlbiB0ZXRoZXJzXHJcbi8vIFRPRE86IEhlbGxvIFdvcmxkIGNvdWxkIGhhdmUgYW55IHdhcm5pbmdzIChzb3JyeSlcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5BbHBoYXNjYXBlVjQwU2F2YWdlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdPMTJTMSBTdXBlcmxpbWluYWwgTW90aW9uIDEnOiAnMzMzNCcsIC8vIDMwMCsgZGVncmVlIGNsZWF2ZSB3aXRoIGJhY2sgc2FmZSBhcmVhXHJcbiAgICAnTzEyUzEgRWZmaWNpZW50IEJsYWRld29yayAxJzogJzMzMjknLCAvLyBPbWVnYS1NIFwiZ2V0IG91dFwiIGNlbnRlcmVkIGFvZSBhZnRlciBzcGxpdFxyXG4gICAgJ08xMlMxIEVmZmljaWVudCBCbGFkZXdvcmsgMic6ICczMzJBJywgLy8gT21lZ2EtTSBcImdldCBvdXRcIiBjZW50ZXJlZCBhb2UgZHVyaW5nIGJsYWRlc1xyXG4gICAgJ08xMlMxIEJleW9uZCBTdHJlbmd0aCc6ICczMzI4JywgLy8gT21lZ2EtTSBcImdldCBpblwiIGNlbnRlcmVkIGFvZSBkdXJpbmcgc2hpZWxkXHJcbiAgICAnTzEyUzEgU3VwZXJsaW1pbmFsIFN0ZWVsIDEnOiAnMzMzMCcsIC8vIE9tZWdhLUYgXCJnZXQgZnJvbnQvYmFja1wiIGJsYWRlcyBwaGFzZVxyXG4gICAgJ08xMlMxIFN1cGVybGltaW5hbCBTdGVlbCAyJzogJzMzMzEnLCAvLyBPbWVnYS1GIFwiZ2V0IGZyb250L2JhY2tcIiBibGFkZXMgcGhhc2VcclxuICAgICdPMTJTMSBPcHRpbWl6ZWQgQmxpenphcmQgSUlJJzogJzMzMzInLCAvLyBPbWVnYS1GIGdpYW50IGNyb3NzXHJcbiAgICAnTzEyUzIgRGlmZnVzZSBXYXZlIENhbm5vbic6ICczMzY5JywgLy8gYmFjay9zaWRlcyBsYXNlcnNcclxuICAgICdPMTJTMiBSaWdodCBBcm0gVW5pdCBIeXBlciBQdWxzZSAxJzogJzMzNUEnLCAvLyBSb3RhdGluZyBBcmNoaXZlIFBlcmlwaGVyYWwgbGFzZXJzXHJcbiAgICAnTzEyUzIgUmlnaHQgQXJtIFVuaXQgSHlwZXIgUHVsc2UgMic6ICczMzVCJywgLy8gUm90YXRpbmcgQXJjaGl2ZSBQZXJpcGhlcmFsIGxhc2Vyc1xyXG4gICAgJ08xMlMyIFJpZ2h0IEFybSBVbml0IENvbG9zc2FsIEJsb3cnOiAnMzM1RicsIC8vIEV4cGxvZGluZyBBcmNoaXZlIEFsbCBoYW5kc1xyXG4gICAgJ08xMlMyIExlZnQgQXJtIFVuaXQgQ29sb3NzYWwgQmxvdyc6ICczMzYwJywgLy8gRXhwbG9kaW5nIEFyY2hpdmUgQWxsIGhhbmRzXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnTzEyUzEgT3B0aWNhbCBMYXNlcic6ICczMzQ3JywgLy8gbWlkZGxlIGxhc2VyIGZyb20gZXllXHJcbiAgICAnTzEyUzEgQWR2YW5jZWQgT3B0aWNhbCBMYXNlcic6ICczMzRBJywgLy8gZ2lhbnQgY2lyY2xlIGNlbnRlcmVkIG9uIGV5ZVxyXG4gICAgJ08xMlMyIFJlYXIgUG93ZXIgVW5pdCBSZWFyIExhc2VycyAxJzogJzMzNjEnLCAvLyBBcmNoaXZlIEFsbCBpbml0aWFsIGxhc2VyXHJcbiAgICAnTzEyUzIgUmVhciBQb3dlciBVbml0IFJlYXIgTGFzZXJzIDInOiAnMzM2MicsIC8vIEFyY2hpdmUgQWxsIHJvdGF0aW5nIGxhc2VyXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdPMTJTMSBPcHRpbWl6ZWQgRmlyZSBJSUknOiAnMzMzNycsIC8vIGZpcmUgc3ByZWFkXHJcbiAgICAnTzEyUzIgSHlwZXIgUHVsc2UgVGV0aGVyJzogJzMzNUMnLCAvLyBJbmRleCBBbmQgQXJjaGl2ZSBQZXJpcGhlcmFsIHRldGhlcnNcclxuICAgICdPMTJTMiBXYXZlIENhbm5vbic6ICczMzZCJywgLy8gSW5kZXggQW5kIEFyY2hpdmUgUGVyaXBoZXJhbCBiYWl0ZWQgbGFzZXJzXHJcbiAgICAnTzEyUzIgT3B0aW1pemVkIEZpcmUgSUlJJzogJzMzNzknLCAvLyBBcmNoaXZlIEFsbCBzcHJlYWRcclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgJ08xMlMxIE9wdGltaXplZCBTYWdpdHRhcml1cyBBcnJvdyc6ICczMzREJywgLy8gT21lZ2EtTSBiYXJkIGxpbWl0IGJyZWFrXHJcbiAgICAnTzEyUzIgT3ZlcnNhbXBsZWQgV2F2ZSBDYW5ub24nOiAnMzM2NicsIC8vIE1vbml0b3IgdGFuayBidXN0ZXJzXHJcbiAgICAnTzEyUzIgU2F2YWdlIFdhdmUgQ2Fubm9uJzogJzMzNkQnLCAvLyBUYW5rIGJ1c3RlciB3aXRoIHRoZSB2dWxuIGZpcnN0XHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ08xMlMxIERpc2NoYXJnZXIgS25vY2tlZCBPZmYnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzMzMjcnIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ0tub2NrZWQgb2ZmJyxcclxuICAgICAgICAgICAgZGU6ICdSdW50ZXJnZWZhbGxlbicsXHJcbiAgICAgICAgICAgIGZyOiAnQSDDqXTDqSBhc3NvbW3DqShlKScsXHJcbiAgICAgICAgICAgIGphOiAn44OO44OD44Kv44OQ44OD44KvJyxcclxuICAgICAgICAgICAgY246ICflh7vpgIDlnaDokL0nLFxyXG4gICAgICAgICAgICBrbzogJ+uEieuwsScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ08xMlMxIE1hZ2ljIFZ1bG5lcmFiaWxpdHkgVXAgR2FpbicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICc0NzInIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS52dWxuID8/PSB7fTtcclxuICAgICAgICBkYXRhLnZ1bG5bbWF0Y2hlcy50YXJnZXRdID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTzEyUzEgTWFnaWMgVnVsbmVyYWJpbGl0eSBVcCBMb3NlJyxcclxuICAgICAgdHlwZTogJ0xvc2VzRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMubG9zZXNFZmZlY3QoeyBlZmZlY3RJZDogJzQ3MicgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLnZ1bG4gPSBkYXRhLnZ1bG4gfHwge307XHJcbiAgICAgICAgZGF0YS52dWxuW21hdGNoZXMudGFyZ2V0XSA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdPMTJTMSBNYWdpYyBWdWxuZXJhYmlsaXR5IERhbWFnZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgLy8gMzMyRSA9IFBpbGUgUGl0Y2ggc3RhY2tcclxuICAgICAgLy8gMzMzRSA9IEVsZWN0cmljIFNsaWRlIChPbWVnYS1NIHNxdWFyZSAxLTQgZGFzaGVzKVxyXG4gICAgICAvLyAzMzNGID0gRWxlY3RyaWMgU2xpZGUgKE9tZWdhLUYgdHJpYW5nbGUgMS00IGRhc2hlcylcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogWyczMzJFJywgJzMzM0UnLCAnMzMzRiddLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IGRhdGEudnVsbiAmJiBkYXRhLnZ1bG5bbWF0Y2hlcy50YXJnZXRdLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogYCR7bWF0Y2hlcy5hYmlsaXR5fSAod2l0aCB2dWxuKWAsXHJcbiAgICAgICAgICAgIGRlOiBgJHttYXRjaGVzLmFiaWxpdHl9IChtaXQgVmVyd3VuZGJhcmtlaXQpYCxcclxuICAgICAgICAgICAgamE6IGAke21hdGNoZXMuYWJpbGl0eX0gKOiiq+ODgOODoeODvOOCuOS4iuaYhylgLFxyXG4gICAgICAgICAgICBjbjogYCR7bWF0Y2hlcy5hYmlsaXR5fSAo5bim5piT5LykKWAsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIEJ5YWtrbyBFeHRyZW1lXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVKYWRlU3RvYUV4dHJlbWUsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgLy8gUG9wcGluZyBVbnJlbGVudGluZyBBbmd1aXNoIGJ1YmJsZXNcclxuICAgICdCeWFFeCBBcmF0YW1hJzogJzI3RjYnLFxyXG4gICAgLy8gU3RlcHBpbmcgaW4gZ3Jvd2luZyBvcmJcclxuICAgICdCeWFFeCBWYWN1dW0gQ2xhdyc6ICcyN0U5JyxcclxuICAgIC8vIExpZ2h0bmluZyBQdWRkbGVzXHJcbiAgICAnQnlhRXggSHVuZGVyZm9sZCBIYXZvYyAxJzogJzI3RTUnLFxyXG4gICAgJ0J5YUV4IEh1bmRlcmZvbGQgSGF2b2MgMic6ICcyN0U2JyxcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdCeWFFeCBTd2VlcCBUaGUgTGVnJzogJzI3REInLFxyXG4gICAgJ0J5YUV4IEZpcmUgYW5kIExpZ2h0bmluZyc6ICcyN0RFJyxcclxuICAgICdCeWFFeCBEaXN0YW50IENsYXAnOiAnMjdERCcsXHJcbiAgICAvLyBNaWRwaGFzZSBsaW5lIGF0dGFja1xyXG4gICAgJ0J5YUV4IEltcGVyaWFsIEd1YXJkJzogJzI3RjEnLFxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgLy8gUGluayBidWJibGUgY29sbGlzaW9uXHJcbiAgICAgIGlkOiAnQnlhRXggT21pbm91cyBXaW5kJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMjdFQycsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICd3YXJuJyxcclxuICAgICAgICAgIGJsYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdidWJibGUgY29sbGlzaW9uJyxcclxuICAgICAgICAgICAgZGU6ICdCbGFzZW4gc2luZCB6dXNhbW1lbmdlc3Rvw59lbicsXHJcbiAgICAgICAgICAgIGZyOiAnY29sbGlzaW9uIGRlIGJ1bGxlcycsXHJcbiAgICAgICAgICAgIGphOiAn6KGd56qBJyxcclxuICAgICAgICAgICAgY246ICfnm7jmkp4nLFxyXG4gICAgICAgICAgICBrbzogJ+yepe2MkCDqsrnss5DshJwg7YSw7KeQJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gU2hpbnJ5dSBOb3JtYWxcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZVJveWFsTWVuYWdlcmllLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdTaGlucnl1IEFraCBSaGFpJzogJzFGQTYnLCAvLyBTa3kgbGFzZXJzIGFsb25nc2lkZSBBa2ggTW9ybi5cclxuICAgICdTaGlucnl1IEJsYXppbmcgVHJhaWwnOiAnMjIxQScsIC8vIFJlY3RhbmdsZSBBb0VzLCBpbnRlcm1pc3Npb24gYWRkcy5cclxuICAgICdTaGlucnl1IENvbGxhcHNlJzogJzIyMTgnLCAvLyBDaXJjbGUgQW9FcywgaW50ZXJtaXNzaW9uIGFkZHNcclxuICAgICdTaGlucnl1IERyYWdvbmZpc3QnOiAnMjRGMCcsIC8vIEdpYW50IHB1bmNoeSBjaXJjbGUgaW4gdGhlIGNlbnRlci5cclxuICAgICdTaGlucnl1IEVhcnRoIEJyZWF0aCc6ICcxRjlEJywgLy8gQ29uYWwgYXR0YWNrcyB0aGF0IGFyZW4ndCBhY3R1YWxseSBFYXJ0aCBTaGFrZXJzLlxyXG4gICAgJ1NoaW5yeXUgR3lyZSBDaGFyZ2UnOiAnMUZBOCcsIC8vIEdyZWVuIGRpdmUgYm9tYiBhdHRhY2suXHJcbiAgICAnU2hpbnJ5dSBTcGlrZXNpY2xlJzogJzFGQWAnLCAvLyBCbHVlLWdyZWVuIGxpbmUgYXR0YWNrcyBmcm9tIGJlaGluZC5cclxuICAgICdTaGlucnl1IFRhaWwgU2xhcCc6ICcxRjkzJywgLy8gUmVkIHNxdWFyZXMgaW5kaWNhdGluZyB0aGUgdGFpbCdzIGxhbmRpbmcgc3BvdHMuXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdTaGlucnl1IExldmluYm9sdCc6ICcxRjlDJyxcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIC8vIEljeSBmbG9vciBhdHRhY2suXHJcbiAgICAgIGlkOiAnU2hpbnJ5dSBEaWFtb25kIER1c3QnLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICAvLyBUaGluIEljZVxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnMzhGJyB9KSxcclxuICAgICAgZGVhdGhSZWFzb246IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdTbGlkIG9mZiEnLFxyXG4gICAgICAgICAgICBkZTogJ1J1bnRlciBnZXJ1dHNjaHQhJyxcclxuICAgICAgICAgICAgZnI6ICdBIGdsaXNzw6koZSkgIScsXHJcbiAgICAgICAgICAgIGphOiAn5ruR44Gj44GfJyxcclxuICAgICAgICAgICAgY246ICfmu5HokL0nLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdTaGlucnl1IFRpZGFsIFdhdmUnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICcxRjhCJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ1B1c2hlZCBvZmYhJyxcclxuICAgICAgICAgICAgZGU6ICdSdW50ZXIgZ2VzY2h1YnN0IScsXHJcbiAgICAgICAgICAgIGZyOiAnQSDDqXTDqSBwb3Vzc8OpKGUpICEnLFxyXG4gICAgICAgICAgICBqYTogJ+iQveOBoeOBnycsXHJcbiAgICAgICAgICAgIGNuOiAn5Ye76YCA5Z2g6JC9JyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIEtub2NrYmFjayBmcm9tIGNlbnRlci5cclxuICAgICAgaWQ6ICdTaGlucnl1IEFlcmlhbCBCbGFzdCcsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzFGOTAnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnUHVzaGVkIG9mZiEnLFxyXG4gICAgICAgICAgICBkZTogJ1J1bnRlciBnZXNjaHVic3QhJyxcclxuICAgICAgICAgICAgZnI6ICdBIMOpdMOpIHBvdXNzZXIgIScsXHJcbiAgICAgICAgICAgIGphOiAn6JC944Gh44GfJyxcclxuICAgICAgICAgICAgY246ICflh7vpgIDlnaDokL0nLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gU3VzYW5vIEV4dHJlbWVcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZVBvb2xPZlRyaWJ1dGVFeHRyZW1lLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdTdXNFeCBDaHVybmluZyc6ICcyMDNGJyxcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdTdXNFeCBSYXNlbiBLYWlreW8nOiAnMjAyRScsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gU3V6YWt1IE5vcm1hbFxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuSGVsbHNLaWVyLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdTdXpha3UgTm9ybWFsIEFzaGVzIFRvIEFzaGVzJzogJzMyMUYnLCAvLyBTY2FybGV0IExhZHkgYWRkLCByYWlkd2lkZSBleHBsb3Npb24gaWYgbm90IGtpbGxlZCBpbiB0aW1lXHJcbiAgICAnU3V6YWt1IE5vcm1hbCBGbGVldGluZyBTdW1tZXInOiAnMzIyMycsIC8vIENvbmUgQW9FIChyYW5kb21seSB0YXJnZXRlZClcclxuICAgICdTdXpha3UgTm9ybWFsIFdpbmcgQW5kIEEgUHJheWVyJzogJzMyMjUnLCAvLyBDaXJjbGUgQW9FcyBmcm9tIHVua2lsbGVkIHBsdW1lc1xyXG4gICAgJ1N1emFrdSBOb3JtYWwgUGhhbnRvbSBIYWxmJzogJzMyMzMnLCAvLyBHaWFudCBoYWxmLWFyZW5hIEFvRSBmb2xsb3ctdXAgYWZ0ZXIgdGFuayBidXN0ZXJcclxuICAgICdTdXpha3UgTm9ybWFsIFdlbGwgT2YgRmxhbWUnOiAnMzIzNicsIC8vIExhcmdlIHJlY3RhbmdsZSBBb0UgKHJhbmRvbWx5IHRhcmdldGVkKVxyXG4gICAgJ1N1emFrdSBOb3JtYWwgSG90c3BvdCc6ICczMjM4JywgLy8gUGxhdGZvcm0gZmlyZSB3aGVuIHRoZSBydW5lcyBhcmUgYWN0aXZhdGVkXHJcbiAgICAnU3V6YWt1IE5vcm1hbCBTd29vcCc6ICczMjNCJywgLy8gU3RhciBjcm9zcyBsaW5lIEFvRXNcclxuICAgICdTdXpha3UgTm9ybWFsIEJ1cm4nOiAnMzIzRCcsIC8vIFRvd2VyIG1lY2hhbmljIGZhaWx1cmUgb24gSW5jYW5kZXNjZW50IEludGVybHVkZSAocGFydHkgZmFpbHVyZSwgbm90IHBlcnNvbmFsKVxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnU3V6YWt1IE5vcm1hbCBSZWtpbmRsZSc6ICczMjM1JywgLy8gUHVycGxlIHNwcmVhZCBjaXJjbGVzXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ1N1emFrdSBOb3JtYWwgUnV0aGxlc3MgUmVmcmFpbicsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzMyMzAnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnUHVzaGVkIG9mZiEnLFxyXG4gICAgICAgICAgICBkZTogJ1J1bnRlciBnZXNjaHVic3QhJyxcclxuICAgICAgICAgICAgZnI6ICdBIMOpdMOpIHBvdXNzw6koZSkgIScsXHJcbiAgICAgICAgICAgIGphOiAn6JC944Gh44GfJyxcclxuICAgICAgICAgICAgY246ICflh7vpgIDlnaDokL0nLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuaW1wb3J0IHsgcGxheWVyRGFtYWdlRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vb29wc3lfY29tbW9uJztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBVbHRpbWEgV2VhcG9uIFVsdGltYXRlXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVXZWFwb25zUmVmcmFpblVsdGltYXRlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdVV1UgU2VhcmluZyBXaW5kJzogJzJCNUMnLFxyXG4gICAgJ1VXVSBFcnVwdGlvbic6ICcyQjVBJyxcclxuICAgICdVV1UgV2VpZ2h0JzogJzJCNjUnLFxyXG4gICAgJ1VXVSBMYW5kc2xpZGUxJzogJzJCNzAnLFxyXG4gICAgJ1VXVSBMYW5kc2xpZGUyJzogJzJCNzEnLFxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ1VXVSBHcmVhdCBXaGlybHdpbmQnOiAnMkI0MScsXHJcbiAgICAnVVdVIFNsaXBzdHJlYW0nOiAnMkI1MycsXHJcbiAgICAnVVdVIFdpY2tlZCBXaGVlbCc6ICcyQjRFJyxcclxuICAgICdVV1UgV2lja2VkIFRvcm5hZG8nOiAnMkI0RicsXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ1VXVSBXaW5kYnVybicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICdFQicgfSksXHJcbiAgICAgIHN1cHByZXNzU2Vjb25kczogMixcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuZWZmZWN0IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBGZWF0aGVybGFuY2UgZXhwbG9zaW9uLiAgSXQgc2VlbXMgbGlrZSB0aGUgcGVyc29uIHdobyBwb3BzIGl0IGlzIHRoZVxyXG4gICAgICAvLyBmaXJzdCBwZXJzb24gbGlzdGVkIGRhbWFnZS13aXNlLCBzbyB0aGV5IGFyZSBsaWtlbHkgdGhlIGN1bHByaXQuXHJcbiAgICAgIGlkOiAnVVdVIEZlYXRoZXJsYW5jZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzJCNDMnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIHN1cHByZXNzU2Vjb25kczogNSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuc291cmNlIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBrRmxhZ0luc3RhbnREZWF0aCwgcGxheWVyRGFtYWdlRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vb29wc3lfY29tbW9uJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGF0YSBleHRlbmRzIE9vcHN5RGF0YSB7XHJcbiAgaGFzRG9vbT86IHsgW25hbWU6IHN0cmluZ106IGJvb2xlYW4gfTtcclxufVxyXG5cclxuLy8gVUNVIC0gVGhlIFVuZW5kaW5nIENvaWwgT2YgQmFoYW11dCAoVWx0aW1hdGUpXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVVbmVuZGluZ0NvaWxPZkJhaGFtdXRVbHRpbWF0ZSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnVUNVIEx1bmFyIER5bmFtbyc6ICcyNkJDJyxcclxuICAgICdVQ1UgSXJvbiBDaGFyaW90JzogJzI2QkInLFxyXG4gICAgJ1VDVSBFeGFmbGFyZSc6ICcyNkVGJyxcclxuICAgICdVQ1UgV2luZ3MgT2YgU2FsdmF0aW9uJzogJzI2Q0EnLFxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdVQ1UgVHdpc3RlciBEZWF0aCcsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgLy8gSW5zdGFudCBkZWF0aCBoYXMgYSBzcGVjaWFsIGZsYWcgdmFsdWUsIGRpZmZlcmVudGlhdGluZ1xyXG4gICAgICAvLyBmcm9tIHRoZSBleHBsb3Npb24gZGFtYWdlIHlvdSB0YWtlIHdoZW4gc29tZWJvZHkgZWxzZVxyXG4gICAgICAvLyBwb3BzIG9uZS5cclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzI2QUInLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMsIGZsYWdzOiBrRmxhZ0luc3RhbnREZWF0aCB9KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIGJsYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdUd2lzdGVyIFBvcCcsXHJcbiAgICAgICAgICAgIGRlOiAnV2lyYmVsc3R1cm0gYmVyw7xocnQnLFxyXG4gICAgICAgICAgICBmcjogJ0FwcGFyaXRpb24gZGVzIHRvcm5hZGVzJyxcclxuICAgICAgICAgICAgamE6ICfjg4TjgqTjgrnjgr/jg7wnLFxyXG4gICAgICAgICAgICBjbjogJ+aXi+mjjicsXHJcbiAgICAgICAgICAgIGtvOiAn7ZqM7Jik66asIOuwn+ydjCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ1VDVSBUaGVybWlvbmljIEJ1cnN0JyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMjZCOScsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIGJsYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdQaXp6YSBTbGljZScsXHJcbiAgICAgICAgICAgIGRlOiAnUGl6emFzdMO8Y2snLFxyXG4gICAgICAgICAgICBmcjogJ1BhcnRzIGRlIHBpenphJyxcclxuICAgICAgICAgICAgamE6ICfjgrXjg7zjg5/jgqrjg4vjg4Pjgq/jg5Djg7zjgrnjg4gnLFxyXG4gICAgICAgICAgICBjbjogJ+WkqeW0qeWcsOijgicsXHJcbiAgICAgICAgICAgIGtvOiAn7J6l7YyQ7JeQIOunnuydjCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ1VDVSBDaGFpbiBMaWdodG5pbmcnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICcyNkM4JywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICAvLyBJdCdzIGhhcmQgdG8gYXNzaWduIGJsYW1lIGZvciBsaWdodG5pbmcuICBUaGUgZGVidWZmc1xyXG4gICAgICAgIC8vIGdvIG91dCBhbmQgdGhlbiBleHBsb2RlIGluIG9yZGVyLCBidXQgdGhlIGF0dGFja2VyIGlzXHJcbiAgICAgICAgLy8gdGhlIGRyYWdvbiBhbmQgbm90IHRoZSBwbGF5ZXIuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICd3YXJuJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ2hpdCBieSBsaWdodG5pbmcnLFxyXG4gICAgICAgICAgICBkZTogJ3ZvbSBCbGl0eiBnZXRyb2ZmZW4nLFxyXG4gICAgICAgICAgICBmcjogJ2ZyYXBww6koZSkgcGFyIGxhIGZvdWRyZScsXHJcbiAgICAgICAgICAgIGphOiAn44OB44Kn44Kk44Oz44Op44Kk44OI44OL44Oz44KwJyxcclxuICAgICAgICAgICAgY246ICfpm7flhYnpk74nLFxyXG4gICAgICAgICAgICBrbzogJ+uyiOqwnCDrp57snYwnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdVQ1UgQnVybnMnLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnRkEnIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5lZmZlY3QgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnVUNVIFNsdWRnZScsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICcxMUYnIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnZmFpbCcsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5lZmZlY3QgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnVUNVIERvb20gR2FpbicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICdEMicgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmhhc0Rvb20gPz89IHt9O1xyXG4gICAgICAgIGRhdGEuaGFzRG9vbVttYXRjaGVzLnRhcmdldF0gPSB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdVQ1UgRG9vbSBMb3NlJyxcclxuICAgICAgdHlwZTogJ0xvc2VzRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMubG9zZXNFZmZlY3QoeyBlZmZlY3RJZDogJ0QyJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuaGFzRG9vbSA/Pz0ge307XHJcbiAgICAgICAgZGF0YS5oYXNEb29tW21hdGNoZXMudGFyZ2V0XSA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gVGhlcmUgaXMgbm8gY2FsbG91dCBmb3IgXCJ5b3UgZm9yZ290IHRvIGNsZWFyIGRvb21cIi4gIFRoZSBsb2dzIGxvb2tcclxuICAgICAgLy8gc29tZXRoaW5nIGxpa2UgdGhpczpcclxuICAgICAgLy8gICBbMjA6MDI6MzAuNTY0XSAxQTpPa29ub21pIFlha2kgZ2FpbnMgdGhlIGVmZmVjdCBvZiBEb29tIGZyb20gIGZvciA2LjAwIFNlY29uZHMuXHJcbiAgICAgIC8vICAgWzIwOjAyOjM2LjQ0M10gMUU6T2tvbm9taSBZYWtpIGxvc2VzIHRoZSBlZmZlY3Qgb2YgUHJvdGVjdCBmcm9tIFRha28gWWFraS5cclxuICAgICAgLy8gICBbMjA6MDI6MzYuNDQzXSAxRTpPa29ub21pIFlha2kgbG9zZXMgdGhlIGVmZmVjdCBvZiBEb29tIGZyb20gLlxyXG4gICAgICAvLyAgIFsyMDowMjozOC41MjVdIDE5Ok9rb25vbWkgWWFraSB3YXMgZGVmZWF0ZWQgYnkgRmlyZWhvcm4uXHJcbiAgICAgIC8vIEluIG90aGVyIHdvcmRzLCBkb29tIGVmZmVjdCBpcyByZW1vdmVkICsvLSBuZXR3b3JrIGxhdGVuY3ksIGJ1dCBjYW4ndFxyXG4gICAgICAvLyB0ZWxsIHVudGlsIGxhdGVyIHRoYXQgaXQgd2FzIGEgZGVhdGguICBBcmd1YWJseSwgdGhpcyBjb3VsZCBoYXZlIGJlZW4gYVxyXG4gICAgICAvLyBjbG9zZS1idXQtc3VjY2Vzc2Z1bCBjbGVhcmluZyBvZiBkb29tIGFzIHdlbGwuICBJdCBsb29rcyB0aGUgc2FtZS5cclxuICAgICAgLy8gU3RyYXRlZ3k6IGlmIHlvdSBoYXZlbid0IGNsZWFyZWQgZG9vbSB3aXRoIDEgc2Vjb25kIHRvIGdvIHRoZW4geW91IHByb2JhYmx5XHJcbiAgICAgIC8vIGRpZWQgdG8gZG9vbS4gIFlvdSBjYW4gZ2V0IG5vbi1mYXRhbGx5IGljZWJhbGxlZCBvciBhdXRvJ2QgaW4gYmV0d2VlbixcclxuICAgICAgLy8gYnV0IHdoYXQgY2FuIHlvdSBkby5cclxuICAgICAgaWQ6ICdVQ1UgRG9vbSBEZWF0aCcsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICdEMicgfSksXHJcbiAgICAgIGRlbGF5U2Vjb25kczogKF9kYXRhLCBtYXRjaGVzKSA9PiBwYXJzZUZsb2F0KG1hdGNoZXMuZHVyYXRpb24pIC0gMSxcclxuICAgICAgZGVhdGhSZWFzb246IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgaWYgKCFkYXRhLmhhc0Rvb20gfHwgIWRhdGEuaGFzRG9vbVttYXRjaGVzLnRhcmdldF0pXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IHRleHQ7XHJcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBwYXJzZUZsb2F0KG1hdGNoZXMuZHVyYXRpb24pO1xyXG4gICAgICAgIGlmIChkdXJhdGlvbiA8IDkpXHJcbiAgICAgICAgICB0ZXh0ID0gbWF0Y2hlcy5lZmZlY3QgKyAnICMxJztcclxuICAgICAgICBlbHNlIGlmIChkdXJhdGlvbiA8IDE0KVxyXG4gICAgICAgICAgdGV4dCA9IG1hdGNoZXMuZWZmZWN0ICsgJyAjMic7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgdGV4dCA9IG1hdGNoZXMuZWZmZWN0ICsgJyAjMyc7XHJcbiAgICAgICAgcmV0dXJuIHsgbmFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IHRleHQgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFRoZSBDb3BpZWQgRmFjdG9yeVxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlQ29waWVkRmFjdG9yeSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnQ29waWVkIFNlcmlhbCBFbmVyZ3kgQm9tYic6ICc0OEI0JyxcclxuICAgIC8vIE1ha2Ugc3VyZSBlbmVtaWVzIGFyZSBpZ25vcmVkIG9uIHRoZXNlXHJcbiAgICAnQ29waWVkIFNlcmlhbCBFbmVyZ3kgQm9tYmFyZG1lbnQnOiAnNDhCOCcsXHJcbiAgICAnQ29waWVkIFNlcmlhbCBFbmVyZ3kgQXNzYXVsdCc6ICc0OEI2JyxcclxuICAgICdDb3BpZWQgU2VyaWFsIEhpZ2gtUG93ZXJlZCBMYXNlcic6ICc0OEM1JyxcclxuICAgICdDb3BpZWQgU2VyaWFsIFNpZGVzdHJpa2luZyBTcGluIFNwaW4gMSc6ICc0OENCJyxcclxuICAgICdDb3BpZWQgU2VyaWFsIFNpZGVzdHJpa2luZyBTcGluIDInOiAnNDhDQycsXHJcbiAgICAnQ29waWVkIFNlcmlhbCBDZW50cmlmdWdhbCBTcGluJzogJzQ4QzknLFxyXG4gICAgJ0NvcGllZCBTZXJpYWwgQWlyLVRvLVN1cmZhY2UgRW5lcmd5JzogJzQ4QkEnLFxyXG4gICAgJ0NvcGllZCBTZXJpYWwgSGlnaC1DYWxpYmVyIExhc2VyJzogJzQ4RkEnLFxyXG4gICAgJ0NvcGllZCBTZXJpYWwgRW5lcmd5IFJpbmcgMSc6ICc0OEJDJyxcclxuICAgICdDb3BpZWQgU2VyaWFsIEVuZXJneSBSaW5nIDInOiAnNDhCRCcsXHJcbiAgICAnQ29waWVkIFNlcmlhbCBFbmVyZ3kgUmluZyAzJzogJzQ4QkUnLFxyXG4gICAgJ0NvcGllZCBTZXJpYWwgRW5lcmd5IFJpbmcgNCc6ICc0OEMwJyxcclxuICAgICdDb3BpZWQgU2VyaWFsIEVuZXJneSBSaW5nIDUnOiAnNDhDMScsXHJcbiAgICAnQ29waWVkIFNlcmlhbCBFbmVyZ3kgUmluZyA2JzogJzQ4QzInLFxyXG5cclxuICAgICdDb3BpZWQgVHJhc2ggRW5lcmd5IEJvbWInOiAnNDkxRCcsXHJcbiAgICAnQ29waWVkIFRyYXNoIEZyb250YWwgU29tZXJzYXVsdCc6ICc0OTFCJyxcclxuICAgICdDb3BpZWQgVHJhc2ggSGlnaC1GcmVxdWVuY3kgTGFzZXInOiAnNDkxRScsXHJcblxyXG4gICAgJ0NvcGllZCBIb2JiZXMgU2hvY2tpbmcgRGlzY2hhcmdlJzogJzQ4MEInLFxyXG4gICAgJ0NvcGllZCBIb2JiZXMgVmFyaWFibGUgQ29tYmF0IFRlc3QgMSc6ICc0OUM1JyxcclxuICAgICdDb3BpZWQgSG9iYmVzIFZhcmlhYmxlIENvbWJhdCBUZXN0IDInOiAnNDlDNicsXHJcbiAgICAnQ29waWVkIEhvYmJlcyBWYXJpYWJsZSBDb21iYXQgVGVzdCAzJzogJzQ5QzcnLFxyXG4gICAgJ0NvcGllZCBIb2JiZXMgVmFyaWFibGUgQ29tYmF0IFRlc3QgNCc6ICc0ODBGJyxcclxuICAgICdDb3BpZWQgSG9iYmVzIFZhcmlhYmxlIENvbWJhdCBUZXN0IDUnOiAnNDgxMCcsXHJcbiAgICAnQ29waWVkIEhvYmJlcyBWYXJpYWJsZSBDb21iYXQgVGVzdCA2JzogJzQ4MTEnLFxyXG5cclxuICAgICdDb3BpZWQgSG9iYmVzIFJpbmcgTGFzZXIgMSc6ICc0ODAyJyxcclxuICAgICdDb3BpZWQgSG9iYmVzIFJpbmcgTGFzZXIgMic6ICc0ODAzJyxcclxuICAgICdDb3BpZWQgSG9iYmVzIFJpbmcgTGFzZXIgMyc6ICc0ODA0JyxcclxuXHJcbiAgICAnQ29waWVkIEhvYmJlcyBUb3dlcmZhbGwnOiAnNDgxMycsXHJcblxyXG4gICAgJ0NvcGllZCBIb2JiZXMgRmlyZS1SZWlzdGFuY2UgVGVzdCAxJzogJzQ4MTYnLFxyXG4gICAgJ0NvcGllZCBIb2JiZXMgRmlyZS1SZWlzdGFuY2UgVGVzdCAyJzogJzQ4MTcnLFxyXG4gICAgJ0NvcGllZCBIb2JiZXMgRmlyZS1SZWlzdGFuY2UgVGVzdCAzJzogJzQ4MTgnLFxyXG5cclxuICAgICdDb3BpZWQgSG9iYmVzIE9pbCBXZWxsJzogJzQ4MUInLFxyXG4gICAgJ0NvcGllZCBIb2JiZXMgRWxlY3Ryb21hZ25ldGljIFB1bHNlJzogJzQ4MTknLFxyXG4gICAgLy8gVE9ETzogd2hhdCdzIHRoZSBlbGVjdHJpZmllZCBmbG9vciB3aXRoIGNvbnZleW9yIGJlbHRzP1xyXG5cclxuICAgICdDb3BpZWQgR29saWF0aCBFbmVyZ3kgUmluZyAxJzogJzQ5MzcnLFxyXG4gICAgJ0NvcGllZCBHb2xpYXRoIEVuZXJneSBSaW5nIDInOiAnNDkzOCcsXHJcbiAgICAnQ29waWVkIEdvbGlhdGggRW5lcmd5IFJpbmcgMyc6ICc0OTM5JyxcclxuICAgICdDb3BpZWQgR29saWF0aCBFbmVyZ3kgUmluZyA0JzogJzQ5M0EnLFxyXG4gICAgJ0NvcGllZCBHb2xpYXRoIEVuZXJneSBSaW5nIDUnOiAnNDkzNycsXHJcbiAgICAnQ29waWVkIEdvbGlhdGggTGFzZXIgVHVycmV0JzogJzQ4RTYnLFxyXG5cclxuICAgICdDb3BpZWQgRmxpZ2h0IFVuaXQgQXJlYSBCb21iaW5nJzogJzQ5NDMnLFxyXG4gICAgJ0NvcGllZCBGbGlnaHQgVW5pdCBMaWdodGZhc3QgQmxhZGUnOiAnNDk0MCcsXHJcblxyXG4gICAgJ0NvcGllZCBFbmdlbHMgTWFyeCBTbWFzaCAxJzogJzQ3MjknLFxyXG4gICAgJ0NvcGllZCBFbmdlbHMgTWFyeCBTbWFzaCAyJzogJzQ3MjgnLFxyXG4gICAgJ0NvcGllZCBFbmdlbHMgTWFyeCBTbWFzaCAzJzogJzQ3MkYnLFxyXG4gICAgJ0NvcGllZCBFbmdlbHMgTWFyeCBTbWFzaCA0JzogJzQ3MzEnLFxyXG4gICAgJ0NvcGllZCBFbmdlbHMgTWFyeCBTbWFzaCA1JzogJzQ3MkInLFxyXG4gICAgJ0NvcGllZCBFbmdlbHMgTWFyeCBTbWFzaCA2JzogJzQ3MkQnLFxyXG4gICAgJ0NvcGllZCBFbmdlbHMgTWFyeCBTbWFzaCA3JzogJzQ3MzInLFxyXG5cclxuICAgICdDb3BpZWQgRW5nZWxzIEluY2VuZGlhcnkgQm9tYmluZyc6ICc0NzM5JyxcclxuICAgICdDb3BpZWQgRW5nZWxzIEd1aWRlZCBNaXNzaWxlJzogJzQ3MzYnLFxyXG4gICAgJ0NvcGllZCBFbmdlbHMgU3VyZmFjZSBNaXNzaWxlJzogJzQ3MzQnLFxyXG4gICAgJ0NvcGllZCBFbmdlbHMgTGFzZXIgU2lnaHQnOiAnNDczQicsXHJcbiAgICAnQ29waWVkIEVuZ2VscyBGcmFjayc6ICc0NzREJyxcclxuXHJcbiAgICAnQ29waWVkIEVuZ2VscyBNYXJ4IENydXNoJzogJzQ4RkMnLFxyXG4gICAgJ0NvcGllZCBFbmdlbHMgQ3J1c2hpbmcgV2hlZWwnOiAnNDc0QicsXHJcbiAgICAnQ29waWVkIEVuZ2VscyBNYXJ4IFRocnVzdCc6ICc0OEZDJyxcclxuXHJcbiAgICAnQ29waWVkIDlTIExhc2VyIFN1cHByZXNzaW9uJzogJzQ4RTAnLCAvLyBDYW5ub25zXHJcbiAgICAnQ29waWVkIDlTIEJhbGxpc3RpYyBJbXBhY3QgMSc6ICc0OTc0JyxcclxuICAgICdDb3BpZWQgOVMgQmFsbGlzdGljIEltcGFjdCAyJzogJzQ4REMnLFxyXG4gICAgJ0NvcGllZCA5UyBCYWxsaXN0aWMgSW1wYWN0IDMnOiAnNDhFNCcsXHJcbiAgICAnQ29waWVkIDlTIEJhbGxpc3RpYyBJbXBhY3QgNCc6ICc0OEUwJyxcclxuXHJcbiAgICAnQ29waWVkIDlTIE1hcnggSW1wYWN0JzogJzQ4RDQnLFxyXG5cclxuICAgICdDb3BpZWQgOVMgVGFuayBEZXN0cnVjdGlvbiAxJzogJzQ4RTgnLFxyXG4gICAgJ0NvcGllZCA5UyBUYW5rIERlc3RydWN0aW9uIDInOiAnNDhFOScsXHJcblxyXG4gICAgJ0NvcGllZCA5UyBTZXJpYWwgU3BpbiAxJzogJzQ4QTUnLFxyXG4gICAgJ0NvcGllZCA5UyBTZXJpYWwgU3BpbiAyJzogJzQ4QTcnLFxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnQ29waWVkIEhvYmJlcyBTaG9ydC1SYW5nZSBNaXNzaWxlJzogJzQ4MTUnLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBUT0RPOiA1MDkzIHRha2luZyBIaWdoLVBvd2VyZWQgTGFzZXIgd2l0aCBhIHZ1bG4gKGJlY2F1c2Ugb2YgdGFraW5nIHR3bylcclxuLy8gVE9ETzogNEZCNSB0YWtpbmcgSGlnaC1Qb3dlcmVkIExhc2VyIHdpdGggYSB2dWxuIChiZWNhdXNlIG9mIHRha2luZyB0d28pXHJcbi8vIFRPRE86IDUwRDMgQWVyaWFsIFN1cHBvcnQ6IEJvbWJhcmRtZW50IGdvaW5nIG9mZiBmcm9tIGFkZFxyXG4vLyBUT0RPOiA1MjExIE1hbmV1dmVyOiBWb2x0IEFycmF5IG5vdCBnZXR0aW5nIGludGVycnVwdGVkXHJcbi8vIFRPRE86IDRGRjQvNEZGNSBPbmUgb2YgdGhlc2UgaXMgZmFpbGluZyBjaGVtaWNhbCBjb25mbGFncmF0aW9uXHJcbi8vIFRPRE86IHN0YW5kaW5nIGluIHdyb25nIHRlbGVwb3J0ZXI/PyBtYXliZSA1MzYzP1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZVB1cHBldHNCdW5rZXIsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ1B1cHBldCBBZWdpcyBCZWFtIENhbm5vbnMgMSc6ICc1MDc0JywgLy8gcm90YXRpbmcgc2VwYXJhdGluZyB3aGl0ZSBncm91bmQgYW9lXHJcbiAgICAnUHVwcGV0IEFlZ2lzIEJlYW0gQ2Fubm9ucyAyJzogJzUwNzUnLCAvLyByb3RhdGluZyBzZXBhcmF0aW5nIHdoaXRlIGdyb3VuZCBhb2VcclxuICAgICdQdXBwZXQgQWVnaXMgQmVhbSBDYW5ub25zIDMnOiAnNTA3NicsIC8vIHJvdGF0aW5nIHNlcGFyYXRpbmcgd2hpdGUgZ3JvdW5kIGFvZVxyXG4gICAgJ1B1cHBldCBBZWdpcyBDb2xsaWRlciBDYW5ub25zJzogJzUwN0UnLCAvLyByb3RhdGluZyByZWQgZ3JvdW5kIGFvZSBwaW53aGVlbFxyXG4gICAgJ1B1cHBldCBBZWdpcyBTdXJmYWNlIExhc2VyIDEnOiAnNTA5MScsIC8vIGNoYXNpbmcgbGFzZXIgaW5pdGlhbFxyXG4gICAgJ1B1cHBldCBBZWdpcyBTdXJmYWNlIExhc2VyIDInOiAnNTA5MicsIC8vIGNoYXNpbmcgbGFzZXIgY2hhc2luZ1xyXG4gICAgJ1B1cHBldCBBZWdpcyBGbGlnaHQgUGF0aCc6ICc1MDhDJywgLy8gYmx1ZSBsaW5lIGFvZSBmcm9tIGZseWluZyB1bnRhcmdldGFibGUgYWRkc1xyXG4gICAgJ1B1cHBldCBBZWdpcyBSZWZyYWN0aW9uIENhbm5vbnMgMSc6ICc1MDgxJywgLy8gcmVmcmFjdGlvbiBjYW5ub25zIGJldHdlZW4gd2luZ3NcclxuICAgICdQdXBwZXQgQWVnaXMgTGlmZVxcJ3MgTGFzdCBTb25nJzogJzUzQjMnLCAvLyByaW5nIGFvZSB3aXRoIGdhcFxyXG4gICAgJ1B1cHBldCBMaWdodCBMb25nLUJhcnJlbGVkIExhc2VyJzogJzUyMTInLCAvLyBsaW5lIGFvZSBmcm9tIGFkZFxyXG4gICAgJ1B1cHBldCBMaWdodCBTdXJmYWNlIE1pc3NpbGUgSW1wYWN0JzogJzUyMEYnLCAvLyB1bnRhcmdldGVkIGdyb3VuZCBhb2UgZnJvbSBObyBSZXN0cmljdGlvbnNcclxuICAgICdQdXBwZXQgU3VwZXJpb3IgSW5jZW5kaWFyeSBCb21iaW5nJzogJzRGQjknLCAvLyBmaXJlIHB1ZGRsZSBpbml0aWFsXHJcbiAgICAnUHVwcGV0IFN1cGVyaW9yIFNoYXJwIFR1cm4nOiAnNTA2RCcsIC8vIHNoYXJwIHR1cm4gZGFzaFxyXG4gICAgJ1B1cHBldCBTdXBlcmlvciBTdGFuZGFyZCBTdXJmYWNlIE1pc3NpbGUgMSc6ICc0RkIxJywgLy8gTGV0aGFsIFJldm9sdXRpb24gY2lyY2xlc1xyXG4gICAgJ1B1cHBldCBTdXBlcmlvciBTdGFuZGFyZCBTdXJmYWNlIE1pc3NpbGUgMic6ICc0RkIyJywgLy8gTGV0aGFsIFJldm9sdXRpb24gY2lyY2xlc1xyXG4gICAgJ1B1cHBldCBTdXBlcmlvciBTdGFuZGFyZCBTdXJmYWNlIE1pc3NpbGUgMyc6ICc0RkIzJywgLy8gTGV0aGFsIFJldm9sdXRpb24gY2lyY2xlc1xyXG4gICAgJ1B1cHBldCBTdXBlcmlvciBTbGlkaW5nIFN3aXBlIDEnOiAnNTA2RicsIC8vIHJpZ2h0LWhhbmRlZCBzbGlkaW5nIHN3aXBlXHJcbiAgICAnUHVwcGV0IFN1cGVyaW9yIFNsaWRpbmcgU3dpcGUgMic6ICc1MDcwJywgLy8gbGVmdC1oYW5kZWQgc2xpZGluZyBzd2lwZVxyXG4gICAgJ1B1cHBldCBTdXBlcmlvciBHdWlkZWQgTWlzc2lsZSc6ICc0RkI4JywgLy8gZ3JvdW5kIGFvZSBkdXJpbmcgQXJlYSBCb21iYXJkbWVudFxyXG4gICAgJ1B1cHBldCBTdXBlcmlvciBIaWdoLU9yZGVyIEV4cGxvc2l2ZSBCbGFzdCAxJzogJzRGQzAnLCAvLyBzdGFyIGFvZVxyXG4gICAgJ1B1cHBldCBTdXBlcmlvciBIaWdoLU9yZGVyIEV4cGxvc2l2ZSBCbGFzdCAyJzogJzRGQzEnLCAvLyBzdGFyIGFvZVxyXG4gICAgJ1B1cHBldCBIZWF2eSBFbmVyZ3kgQm9tYmFyZG1lbnQnOiAnNEZGQycsIC8vIGNvbG9yZWQgbWFnaWMgaGFtbWVyLXkgZ3JvdW5kIGFvZVxyXG4gICAgJ1B1cHBldCBIZWF2eSBSZXZvbHZpbmcgTGFzZXInOiAnNTAwMCcsIC8vIGdldCB1bmRlciBsYXNlclxyXG4gICAgJ1B1cHBldCBIZWF2eSBFbmVyZ3kgQm9tYic6ICc0RkZBJywgLy8gZ2V0dGluZyBoaXQgYnkgYmFsbCBkdXJpbmcgQWN0aXZlIFN1cHByZXNzaXZlIFVuaXRcclxuICAgICdQdXBwZXQgSGVhdnkgUjAxMCBMYXNlcic6ICc0RkYwJywgLy8gbGFzZXIgcG9kXHJcbiAgICAnUHVwcGV0IEhlYXZ5IFIwMzAgSGFtbWVyJzogJzRGRjEnLCAvLyBjaXJjbGUgYW9lIHBvZFxyXG4gICAgJ1B1cHBldCBIYWxsd2F5IEhpZ2gtUG93ZXJlZCBMYXNlcic6ICc1MEIxJywgLy8gbG9uZyBhb2UgaW4gdGhlIGhhbGx3YXkgc2VjdGlvblxyXG4gICAgJ1B1cHBldCBIYWxsd2F5IEVuZXJneSBCb21iJzogJzUwQjInLCAvLyBydW5uaW5nIGludG8gYSBmbG9hdGluZyBvcmJcclxuICAgICdQdXBwZXQgQ29tcG91bmQgTWVjaGFuaWNhbCBEaXNzZWN0aW9uJzogJzUxQjMnLCAvLyBzcGlubmluZyB2ZXJ0aWNhbCBsYXNlclxyXG4gICAgJ1B1cHBldCBDb21wb3VuZCBNZWNoYW5pY2FsIERlY2FwaXRhdGlvbic6ICc1MUI0JywgLy8gZ2V0IHVuZGVyIGxhc2VyXHJcbiAgICAnUHVwcGV0IENvbXBvdW5kIE1lY2huaWNhbCBDb250dXNpb24gVW50YXJnZXRlZCc6ICc1MUI3JywgLy8gdW50YXJnZXRlZCBncm91bmQgYW9lXHJcbiAgICAnUHVwcGV0IENvbXBvdW5kIDJQIFJlbGVudGxlc3MgU3BpcmFsIDEnOiAnNTFBQScsIC8vIHRyaXBsZSB1bnRhcmdldGVkIGdyb3VuZCBhb2VzXHJcbiAgICAnUHVwcGV0IENvbXBvdW5kIDJQIFJlbGVudGxlc3MgU3BpcmFsIDInOiAnNTFDQicsIC8vIHRyaXBsZSB1bnRhcmdldGVkIGdyb3VuZCBhb2VzXHJcbiAgICAnUHVwcGV0IENvbXBvdW5kIDJQIFByaW1lIEJsYWRlIE91dCAxJzogJzU0MUYnLCAvLyAyUCBwcmltZSBibGFkZSBnZXQgb3V0XHJcbiAgICAnUHVwcGV0IENvbXBvdW5kIDJQIFByaW1lIEJsYWRlIE91dCAyJzogJzUxOTgnLCAvLyAyUC9wdXBwZXQgdGVsZXBvcnRpbmcvcmVwcm9kdWNlIHByaW1lIGJsYWRlIGdldCBvdXRcclxuICAgICdQdXBwZXQgQ29tcG91bmQgMlAgUHJpbWUgQmxhZGUgQmVoaW5kIDEnOiAnNTQyMCcsIC8vIDJQIHByaW1lIGJsYWRlIGdldCBiZWhpbmRcclxuICAgICdQdXBwZXQgQ29tcG91bmQgMlAgUHJpbWUgQmxhZGUgQmVoaW5kIDInOiAnNTE5OScsIC8vIDJQIHRlbGVwb3J0aW5nIHByaW1lIGJsYWRlIGdldCBiZWhpbmRcclxuICAgICdQdXBwZXQgQ29tcG91bmQgMlAgUHJpbWUgQmxhZGUgSW4gMSc6ICc1NDIxJywgLy8gMlAgcHJpbWUgYmxhZGUgZ2V0IGluXHJcbiAgICAnUHVwcGV0IENvbXBvdW5kIDJQIFByaW1lIEJsYWRlIEluIDInOiAnNTE5QScsIC8vIDJQL3B1cHBldCB0ZWxlcG9ydGluZy9yZXByb2R1Y2UgcHJpbWUgYmxhZGUgZ2V0IGluXHJcbiAgICAnUHVwcGV0IENvbXBvdW5kIDJQIFIwMTIgTGFzZXIgR3JvdW5kJzogJzUxQUUnLCAvLyB1bnRhcmdldGVkIGdyb3VuZCBjaXJjbGVcclxuICAgIC8vIFRoaXMgaXMuLi4gdG9vIG5vaXN5LlxyXG4gICAgLy8gJ1B1cHBldCBDb21wb3VuZCAyUCBGb3VyIFBhcnRzIFJlc29sdmUgMSc6ICc1MUEwJywgLy8gZm91ciBwYXJ0cyByZXNvbHZlIGp1bXBcclxuICAgIC8vICdQdXBwZXQgQ29tcG91bmQgMlAgRm91ciBQYXJ0cyBSZXNvbHZlIDInOiAnNTE5RicsIC8vIGZvdXIgcGFydHMgcmVzb2x2ZSBjbGVhdmVcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdQdXBwZXQgSGVhdnkgVXBwZXIgTGFzZXIgMSc6ICc1MDg3JywgLy8gdXBwZXIgbGFzZXIgaW5pdGlhbFxyXG4gICAgJ1B1cHBldCBIZWF2eSBVcHBlciBMYXNlciAyJzogJzRGRjcnLCAvLyB1cHBlciBsYXNlciBjb250aW51b3VzXHJcbiAgICAnUHVwcGV0IEhlYXZ5IExvd2VyIExhc2VyIDEnOiAnNTA4NicsIC8vIGxvd2VyIGxhc2VyIGZpcnN0IHNlY3Rpb24gaW5pdGlhbFxyXG4gICAgJ1B1cHBldCBIZWF2eSBMb3dlciBMYXNlciAyJzogJzRGRjYnLCAvLyBsb3dlciBsYXNlciBmaXJzdCBzZWN0aW9uIGNvbnRpbnVvdXNcclxuICAgICdQdXBwZXQgSGVhdnkgTG93ZXIgTGFzZXIgMyc6ICc1MDg4JywgLy8gbG93ZXIgbGFzZXIgc2Vjb25kIHNlY3Rpb24gaW5pdGlhbFxyXG4gICAgJ1B1cHBldCBIZWF2eSBMb3dlciBMYXNlciA0JzogJzRGRjgnLCAvLyBsb3dlciBsYXNlciBzZWNvbmQgc2VjdGlvbiBjb250aW51b3VzXHJcbiAgICAnUHVwcGV0IEhlYXZ5IExvd2VyIExhc2VyIDUnOiAnNTA4OScsIC8vIGxvd2VyIGxhc2VyIHRoaXJkIHNlY3Rpb24gaW5pdGlhbFxyXG4gICAgJ1B1cHBldCBIZWF2eSBMb3dlciBMYXNlciA2JzogJzRGRjknLCAvLyBsb3dlciBsYXNlciB0aGlyZCBzZWN0aW9uIGNvbnRpbnVvdXNcclxuICAgICdQdXBwZXQgQ29tcG91bmQgSW5jb25ncnVvdXMgU3Bpbic6ICc1MUIyJywgLy8gZmluZCB0aGUgc2FmZSBzcG90IGRvdWJsZSBkYXNoXHJcbiAgfSxcclxuICBnYWluc0VmZmVjdFdhcm46IHtcclxuICAgICdQdXBwZXQgQnVybnMnOiAnMTBCJywgLy8gc3RhbmRpbmcgaW4gbWFueSB2YXJpb3VzIGZpcmUgYW9lc1xyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAvLyBUaGlzIGlzIHByZXR0eSBsYXJnZSBhbmQgZ2V0dGluZyBoaXQgYnkgaW5pdGlhbCB3aXRob3V0IGJ1cm5zIHNlZW1zIGZpbmUuXHJcbiAgICAvLyAnUHVwcGV0IExpZ2h0IEhvbWluZyBNaXNzaWxlIEltcGFjdCc6ICc1MjEwJywgLy8gdGFyZ2V0ZWQgZmlyZSBhb2UgZnJvbSBObyBSZXN0cmljdGlvbnNcclxuICAgICdQdXBwZXQgSGVhdnkgVW5jb252ZW50aW9uYWwgVm9sdGFnZSc6ICc1MDA0JyxcclxuICAgIC8vIFByZXR0eSBub2lzeS5cclxuICAgICdQdXBwZXQgTWFuZXV2ZXIgSGlnaC1Qb3dlcmVkIExhc2VyJzogJzUwMDInLCAvLyB0YW5rIGxhc2VyXHJcbiAgICAnUHVwcGV0IENvbXBvdW5kIE1lY2huaWNhbCBDb250dXNpb24gVGFyZ2V0ZWQnOiAnNTFCNicsIC8vIHRhcmdldGVkIHNwcmVhZCBtYXJrZXJcclxuICAgICdQdXBwZXQgQ29tcG91bmQgMlAgUjAxMiBMYXNlciBUYW5rJzogJzUxQUUnLCAvLyB0YXJnZXRlZCBzcHJlYWQgcG9kIGxhc2VyIG9uIG5vbi10YW5rXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgICdQdXBwZXQgQWVnaXMgQW50aS1QZXJzb25uZWwgTGFzZXInOiAnNTA5MCcsIC8vIHRhbmsgYnVzdGVyIG1hcmtlclxyXG4gICAgJ1B1cHBldCBTdXBlcmlvciBQcmVjaXNpb24tR3VpZGVkIE1pc3NpbGUnOiAnNEZDNScsXHJcbiAgICAnUHVwcGV0IENvbXBvdW5kIDJQIFIwMTIgTGFzZXIgVGFuayc6ICc1MUFEJywgLy8gdGFyZ2V0ZWQgcG9kIGxhc2VyIG9uIHRhbmtcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBUT0RPOiBtaXNzaW5nIFNob2NrIEJsYWNrIDI/XHJcbi8vIFRPRE86IFdoaXRlL0JsYWNrIERpc3NvbmFuY2UgZGFtYWdlIGlzIG1heWJlIHdoZW4gZmxhZ3MgZW5kIGluIDAzP1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZVRvd2VyQXRQYXJhZGlnbXNCcmVhY2gsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ1Rvd2VyIEtuYXZlIENvbG9zc2FsIEltcGFjdCBDZW50ZXIgMSc6ICc1RUE3JywgLy8gQ2VudGVyIGFvZSBmcm9tIEtuYXZlIGFuZCBjbG9uZXNcclxuICAgICdUb3dlciBLbmF2ZSBDb2xvc3NhbCBJbXBhY3QgQ2VudGVyIDInOiAnNjBDOCcsIC8vIENlbnRlciBhb2UgZnJvbSBLbmF2ZSBkdXJpbmcgbHVuZ2VcclxuICAgICdUb3dlciBLbmF2ZSBDb2xvc3NhbCBJbXBhY3QgU2lkZSAxJzogJzVFQTUnLCAvLyBTaWRlIGFvZXMgZnJvbSBLbmF2ZSBhbmQgY2xvbmVzXHJcbiAgICAnVG93ZXIgS25hdmUgQ29sb3NzYWwgSW1wYWN0IFNpZGUgMic6ICc1RUE2JywgLy8gU2lkZSBhb2VzIGZyb20gS25hdmUgYW5kIGNsb25lc1xyXG4gICAgJ1Rvd2VyIEtuYXZlIENvbG9zc2FsIEltcGFjdCBTaWRlIDMnOiAnNjBDNicsIC8vIFNpZGUgYW9lcyBmcm9tIEtuYXZlIGR1cmluZyBsdW5nZVxyXG4gICAgJ1Rvd2VyIEtuYXZlIENvbG9zc2FsIEltcGFjdCBTaWRlIDQnOiAnNjBDNycsIC8vIFNpZGUgYW9lcyBmcm9tIEtuYXZlIGR1cmluZyBsdW5nZVxyXG4gICAgJ1Rvd2VyIEtuYXZlIEJ1cnN0JzogJzVFRDQnLCAvLyBTcGhlcm9pZCBLbmF2aXNoIEJ1bGxldHMgY29sbGlzaW9uXHJcbiAgICAnVG93ZXIgS25hdmUgTWFnaWMgQmFycmFnZSc6ICc1RUFDJywgLy8gU3BoZXJvaWQgbGluZSBhb2VzXHJcbiAgICAnVG93ZXIgSGFuc2VsIFJlcGF5JzogJzVDNzAnLCAvLyBTaGllbGQgZGFtYWdlXHJcbiAgICAnVG93ZXIgSGFuc2VsIEV4cGxvc2lvbic6ICc1QzY3JywgLy8gQmVpbmcgaGl0IGJ5IE1hZ2ljIEJ1bGxldCBkdXJpbmcgUGFzc2luZyBMYW5jZVxyXG4gICAgJ1Rvd2VyIEhhbnNlbCBJbXBhY3QnOiAnNUM1QycsIC8vIEJlaW5nIGhpdCBieSBNYWdpY2FsIENvbmZsdWVuY2UgZHVyaW5nIFdhbmRlcmluZyBUcmFpbFxyXG4gICAgJ1Rvd2VyIEhhbnNlbCBCbG9vZHkgU3dlZXAgMSc6ICc1QzZDJywgLy8gRHVhbCBjbGVhdmVzIHdpdGhvdXQgdGV0aGVyXHJcbiAgICAnVG93ZXIgSGFuc2VsIEJsb29keSBTd2VlcCAyJzogJzVDNkQnLCAvLyBEdWFsIGNsZWF2ZXMgd2l0aG91dCB0ZXRoZXJcclxuICAgICdUb3dlciBIYW5zZWwgQmxvb2R5IFN3ZWVwIDMnOiAnNUM2RScsIC8vIER1YWwgY2xlYXZlcyB3aXRoIHRldGhlclxyXG4gICAgJ1Rvd2VyIEhhbnNlbCBCbG9vZHkgU3dlZXAgNCc6ICc1QzZGJywgLy8gRHVhbCBjbGVhdmVzIHdpdGggdGV0aGVyXHJcbiAgICAnVG93ZXIgSGFuc2VsIFBhc3NpbmcgTGFuY2UnOiAnNUM2NicsIC8vIFRoZSBQYXNzaW5nIExhbmNlIGNoYXJnZSBpdHNlbGZcclxuICAgICdUb3dlciBIYW5zZWwgQnJlYXRodGhyb3VnaCAxJzogJzU1QjMnLCAvLyBoYWxmIHJvb20gY2xlYXZlIGR1cmluZyBXYW5kZXJpbmcgVHJhaWxcclxuICAgICdUb3dlciBIYW5zZWwgQnJlYXRodGhyb3VnaCAyJzogJzVDNUQnLCAvLyBoYWxmIHJvb20gY2xlYXZlIGR1cmluZyBXYW5kZXJpbmcgVHJhaWxcclxuICAgICdUb3dlciBIYW5zZWwgQnJlYXRodGhyb3VnaCAzJzogJzVDNUUnLCAvLyBoYWxmIHJvb20gY2xlYXZlIGR1cmluZyBXYW5kZXJpbmcgVHJhaWxcclxuICAgICdUb3dlciBIYW5zZWwgSHVuZ3J5IExhbmNlIDEnOiAnNUM3MScsIC8vIDJ4bGFyZ2UgY29uYWwgY2xlYXZlIGR1cmluZyBXYW5kZXJpbmcgVHJhaWxcclxuICAgICdUb3dlciBIYW5zZWwgSHVuZ3J5IExhbmNlIDInOiAnNUM3MicsIC8vIDJ4bGFyZ2UgY29uYWwgY2xlYXZlIGR1cmluZyBXYW5kZXJpbmcgVHJhaWxcclxuICAgICdUb3dlciBGbGlnaHQgVW5pdCBMaWdodGZhc3QgQmxhZGUnOiAnNUJGRScsIC8vIGxhcmdlIHJvb20gY2xlYXZlXHJcbiAgICAnVG93ZXIgRmxpZ2h0IFVuaXQgU3RhbmRhcmQgTGFzZXInOiAnNUJGRicsIC8vIHRyYWNraW5nIGxhc2VyXHJcbiAgICAnVG93ZXIgMlAgV2hpcmxpbmcgQXNzYXVsdCc6ICc1QkZCJywgLy8gbGluZSBhb2UgZnJvbSAyUCBjbG9uZXNcclxuICAgICdUb3dlciAyUCBCYWxhbmNlZCBFZGdlJzogJzVCRkEnLCAvLyBjaXJjdWxhciBhb2Ugb24gMlAgY2xvbmVzXHJcbiAgICAnVG93ZXIgUmVkIEdpcmwgR2VuZXJhdGUgQmFycmllciAxJzogJzYwMDYnLCAvLyBiZWluZyBoaXQgYnkgYmFycmllcnMgYXBwZWFyaW5nXHJcbiAgICAnVG93ZXIgUmVkIEdpcmwgR2VuZXJhdGUgQmFycmllciAyJzogJzYwMDcnLCAvLyBiZWluZyBoaXQgYnkgYmFycmllcnMgYXBwZWFyaW5nXHJcbiAgICAnVG93ZXIgUmVkIEdpcmwgR2VuZXJhdGUgQmFycmllciAzJzogJzYwMDgnLCAvLyBiZWluZyBoaXQgYnkgYmFycmllcnMgYXBwZWFyaW5nXHJcbiAgICAnVG93ZXIgUmVkIEdpcmwgR2VuZXJhdGUgQmFycmllciA0JzogJzYwMDknLCAvLyBiZWluZyBoaXQgYnkgYmFycmllcnMgYXBwZWFyaW5nXHJcbiAgICAnVG93ZXIgUmVkIEdpcmwgR2VuZXJhdGUgQmFycmllciA1JzogJzYzMTAnLCAvLyBiZWluZyBoaXQgYnkgYmFycmllcnMgYXBwZWFyaW5nXHJcbiAgICAnVG93ZXIgUmVkIEdpcmwgR2VuZXJhdGUgQmFycmllciA2JzogJzYzMTEnLCAvLyBiZWluZyBoaXQgYnkgYmFycmllcnMgYXBwZWFyaW5nXHJcbiAgICAnVG93ZXIgUmVkIEdpcmwgR2VuZXJhdGUgQmFycmllciA3JzogJzYzMTInLCAvLyBiZWluZyBoaXQgYnkgYmFycmllcnMgYXBwZWFyaW5nXHJcbiAgICAnVG93ZXIgUmVkIEdpcmwgR2VuZXJhdGUgQmFycmllciA4JzogJzYzMTMnLCAvLyBiZWluZyBoaXQgYnkgYmFycmllcnMgYXBwZWFyaW5nXHJcbiAgICAnVG93ZXIgUmVkIEdpcmwgU2hvY2sgV2hpdGUgMSc6ICc2MDBGJywgLy8gd2hpdGUgc2hvY2t3YXZlIGNpcmNsZSBub3QgZHJvcHBlZCBvbiBibGFja1xyXG4gICAgJ1Rvd2VyIFJlZCBHaXJsIFNob2NrIFdoaXRlIDInOiAnNjAxMCcsIC8vIHdoaXRlIHNob2Nrd2F2ZSBjaXJjbGUgbm90IGRyb3BwZWQgb24gYmxhY2tcclxuICAgICdUb3dlciBSZWQgR2lybCBTaG9jayBCbGFjayAxJzogJzYwMTEnLCAvLyBibGFjayBzaG9ja3dhdmUgY2lyY2xlIG5vdCBkcm9wcGVkIG9uIHdoaXRlXHJcbiAgICAnVG93ZXIgUmVkIEdpcmwgUG9pbnQgV2hpdGUgMSc6ICc2MDFGJywgLy8gYmVpbmcgaGl0IGJ5IGEgd2hpdGUgbGFzZXJcclxuICAgICdUb3dlciBSZWQgR2lybCBQb2ludCBXaGl0ZSAyJzogJzYwMjEnLCAvLyBiZWluZyBoaXQgYnkgYSB3aGl0ZSBsYXNlclxyXG4gICAgJ1Rvd2VyIFJlZCBHaXJsIFBvaW50IEJsYWNrIDEnOiAnNjAyMCcsIC8vIGJlaW5nIGhpdCBieSBhIGJsYWNrIGxhc2VyXHJcbiAgICAnVG93ZXIgUmVkIEdpcmwgUG9pbnQgQmxhY2sgMic6ICc2MDIyJywgLy8gYmVpbmcgaGl0IGJ5IGEgYmxhY2sgbGFzZXJcclxuICAgICdUb3dlciBSZWQgR2lybCBXaXBlIFdoaXRlJzogJzYwMEMnLCAvLyBub3QgbGluZSBvZiBzaWdodGluZyB0aGUgd2hpdGUgbWV0ZW9yXHJcbiAgICAnVG93ZXIgUmVkIEdpcmwgV2lwZSBCbGFjayc6ICc2MDBEJywgLy8gbm90IGxpbmUgb2Ygc2lnaHRpbmcgdGhlIGJsYWNrIG1ldGVvclxyXG4gICAgJ1Rvd2VyIFJlZCBHaXJsIERpZmZ1c2UgRW5lcmd5JzogJzYwNTYnLCAvLyByb3RhdGluZyBjbG9uZSBidWJibGUgY2xlYXZlc1xyXG4gICAgJ1Rvd2VyIFJlZCBHaXJsIFB5bG9uIEJpZyBFeHBsb3Npb24nOiAnNjAyNycsIC8vIG5vdCBraWxsaW5nIGEgcHlsb24gZHVyaW5nIGhhY2tpbmcgcGhhc2VcclxuICAgICdUb3dlciBSZWQgR2lybCBQeWxvbiBFeHBsb3Npb24nOiAnNjAyNicsIC8vIHB5bG9uIGR1cmluZyBDaGlsZCdzIHBsYXlcclxuICAgICdUb3dlciBQaGlsb3NvcGhlciBEZXBsb3kgQXJtYW1lbnRzIE1pZGRsZSc6ICc1QzAyJywgLy8gbWlkZGxlIGxhc2VyXHJcbiAgICAnVG93ZXIgUGhpbG9zb3BoZXIgRGVwbG95IEFybWFtZW50cyBTaWRlcyc6ICc1QzA1JywgLy8gc2lkZXMgbGFzZXJcclxuICAgICdUb3dlciBQaGlsb3NvcGhlciBEZXBsb3kgQXJtYW1lbnRzIDMnOiAnNjA3OCcsIC8vIGdvZXMgd2l0aCA1QzAxXHJcbiAgICAnVG93ZXIgUGhpbG9zb3BoZXIgRGVwbG95IEFybWFtZW50cyA0JzogJzYwNzknLCAvLyBnb2VzIHdpdGggNUMwNFxyXG4gICAgJ1Rvd2VyIFBoaWxvc29waGVyIEVuZXJneSBCb21iJzogJzVDMDUnLCAvLyBwaW5rIGJ1YmJsZVxyXG4gICAgJ1Rvd2VyIEZhbHNlIElkb2wgTWFkZSBNYWdpYyBSaWdodCc6ICc1QkQ3JywgLy8gcm90YXRpbmcgd2hlZWwgZ29pbmcgcmlnaHRcclxuICAgICdUb3dlciBGYWxzZSBJZG9sIE1hZGUgTWFnaWMgTGVmdCc6ICc1QkQ2JywgLy8gcm90YXRpbmcgd2hlZWwgZ29pbmcgbGVmdFxyXG4gICAgJ1Rvd2VyIEZhbHNlIElkb2wgTGlnaHRlciBOb3RlJzogJzVCREEnLCAvLyBsaWdodGVyIG5vdGUgbW92aW5nIGFvZXNcclxuICAgICdUb3dlciBGYWxzZSBJZG9sIE1hZ2ljYWwgSW50ZXJmZXJlbmNlJzogJzVCRDUnLCAvLyBsYXNlcnMgZHVyaW5nIFJoeXRobSBSaW5nc1xyXG4gICAgJ1Rvd2VyIEZhbHNlIElkb2wgU2NhdHRlcmVkIE1hZ2ljJzogJzVCREYnLCAvLyBjaXJjbGUgYW9lcyBmcm9tIFNlZWQgT2YgTWFnaWNcclxuICAgICdUb3dlciBIZXIgSW5mbG9yZXNjZW5jZSBVbmV2ZW4gRm90dGluZyc6ICc1QkUyJywgLy8gYnVpbGRpbmcgZnJvbSBSZWNyZWF0ZSBTdHJ1Y3R1cmVcclxuICAgICdUb3dlciBIZXIgSW5mbG9yZXNjZW5jZSBDcmFzaCc6ICc1QkU1JywgLy8gdHJhaW5zIGZyb20gTWl4ZWQgU2lnbmFsc1xyXG4gICAgJ1Rvd2VyIEhlciBJbmZsb3Jlc2NlbmNlIEhlYXZ5IEFybXMgMSc6ICc1QkVEJywgLy8gaGVhdnkgYXJtcyBmcm9udC9iYWNrIGF0dGFja1xyXG4gICAgJ1Rvd2VyIEhlciBJbmZsb3Jlc2NlbmNlIEhlYXZ5IEFybXMgMic6ICc1QkVGJywgLy8gaGVhdnkgYXJtcyBzaWRlcyBhdHRhY2tcclxuICAgICdUb3dlciBIZXIgSW5mbG9yZXNjZW5jZSBFbmVyZ3kgU2NhdHRlcmVkIE1hZ2ljJzogJzVCRTgnLCAvLyBvcmJzIGZyb20gUmVkIEdpcmwgYnkgdHJhaW5cclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdUb3dlciBIZXIgSW5mbG9yZXNjZW5jZSBQbGFjZSBPZiBQb3dlcic6ICc1QzBEJywgLy8gaW5zdGFkZWF0aCBtaWRkbGUgY2lyY2xlIGJlZm9yZSBibGFjay93aGl0ZSByaW5nc1xyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnVG93ZXIgS25hdmUgTWFnaWMgQXJ0aWxsZXJ5IEFscGhhJzogJzVFQUInLCAvLyBTcHJlYWRcclxuICAgICdUb3dlciBIYW5zZWwgU2VlZCBPZiBNYWdpYyBBbHBoYSc6ICc1QzYxJywgLy8gU3ByZWFkXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgICdUb3dlciBLbmF2ZSBNYWdpYyBBcnRpbGxlcnkgQmV0YSc6ICc1RUIzJywgLy8gVGFua2J1c3RlclxyXG4gICAgJ1Rvd2VyIFJlZCBHaXJsIE1hbmlwdWxhdGUgRW5lcmd5JzogJzYwMUEnLCAvLyBUYW5rYnVzdGVyXHJcbiAgICAnVG93ZXIgRmFsc2UgSWRvbCBEYXJrZXIgTm90ZSc6ICc1QkRDJywgLy8gVGFua2J1c3RlclxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdUb3dlciBLbm9ja2VkIE9mZicsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgLy8gNUVCMSA9IEtuYXZlIEx1bmdlXHJcbiAgICAgIC8vIDVCRjIgPSBIZXIgSW5mbG9yZXNlbmNlIFNob2Nrd2F2ZVxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6IFsnNUVCMScsICc1QkYyJ10gfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnS25vY2tlZCBvZmYnLFxyXG4gICAgICAgICAgICBkZTogJ1J1bnRlcmdlZmFsbGVuJyxcclxuICAgICAgICAgICAgZnI6ICdBIMOpdMOpIGFzc29tbcOpKGUpJyxcclxuICAgICAgICAgICAgamE6ICfjg47jg4Pjgq/jg5Djg4Pjgq8nLFxyXG4gICAgICAgICAgICBjbjogJ+WHu+mAgOWdoOiQvScsXHJcbiAgICAgICAgICAgIGtvOiAn64SJ67CxJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5Ba2FkYWVtaWFBbnlkZXIsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0FueWRlciBBY3JpZCBTdHJlYW0nOiAnNDMwNCcsXHJcbiAgICAnQW55ZGVyIFdhdGVyc3BvdXQnOiAnNDMwNicsXHJcbiAgICAnQW55ZGVyIFJhZ2luZyBXYXRlcnMnOiAnNDMwMicsXHJcbiAgICAnQW55ZGVyIFZpb2xlbnQgQnJlYWNoJzogJzQzMDUnLFxyXG4gICAgJ0FueWRlciBUaWRhbCBHdWlsbG90aW5lIDEnOiAnM0UwOCcsXHJcbiAgICAnQW55ZGVyIFRpZGFsIEd1aWxsb3RpbmUgMic6ICczRTBBJyxcclxuICAgICdBbnlkZXIgUGVsYWdpYyBDbGVhdmVyIDEnOiAnM0UwOScsXHJcbiAgICAnQW55ZGVyIFBlbGFnaWMgQ2xlYXZlciAyJzogJzNFMEInLFxyXG4gICAgJ0FueWRlciBBcXVhdGljIExhbmNlJzogJzNFMDUnLFxyXG4gICAgJ0FueWRlciBTeXJ1cCBTcG91dCc6ICc0MzA4JyxcclxuICAgICdBbnlkZXIgTmVlZGxlIFN0b3JtJzogJzQzMDknLFxyXG4gICAgJ0FueWRlciBFeHRlbnNpYmxlIFRlbmRyaWxzIDEnOiAnM0UxMCcsXHJcbiAgICAnQW55ZGVyIEV4dGVuc2libGUgVGVuZHJpbHMgMic6ICczRTExJyxcclxuICAgICdBbnlkZXIgUHV0cmlkIEJyZWF0aCc6ICczRTEyJyxcclxuICAgICdBbnlkZXIgRGV0b25hdG9yJzogJzQzMEYnLFxyXG4gICAgJ0FueWRlciBEb21pbmlvbiBTbGFzaCc6ICc0MzBEJyxcclxuICAgICdBbnlkZXIgUXVhc2FyJzogJzQzMEInLFxyXG4gICAgJ0FueWRlciBEYXJrIEFycml2aXNtZSc6ICc0MzBFJyxcclxuICAgICdBbnlkZXIgVGh1bmRlcnN0b3JtJzogJzNFMUMnLFxyXG4gICAgJ0FueWRlciBXaW5kaW5nIEN1cnJlbnQnOiAnM0UxRicsXHJcbiAgICAvLyAzRTIwIGlzIGJlaW5nIGhpdCBieSB0aGUgZ3Jvd2luZyBvcmJzLCBtYXliZT9cclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkFtYXVyb3QsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0FtYXVyb3QgQnVybmluZyBTa3knOiAnMzU0QScsXHJcbiAgICAnQW1hdXJvdCBXaGFjayc6ICczNTNDJyxcclxuICAgICdBbWF1cm90IEFldGhlcnNwaWtlJzogJzM1M0InLFxyXG4gICAgJ0FtYXVyb3QgVmVuZW1vdXMgQnJlYXRoJzogJzNDQ0UnLFxyXG4gICAgJ0FtYXVyb3QgQ29zbWljIFNocmFwbmVsJzogJzREMjYnLFxyXG4gICAgJ0FtYXVyb3QgRWFydGhxdWFrZSc6ICczQ0NEJyxcclxuICAgICdBbWF1cm90IE1ldGVvciBSYWluJzogJzNDQzYnLFxyXG4gICAgJ0FtYXVyb3QgRmluYWwgU2t5JzogJzNDQ0InLFxyXG4gICAgJ0FtYXVyb3QgTWFsZXZvbGVuY2UnOiAnMzU0MScsXHJcbiAgICAnQW1hdXJvdCBUdXJuYWJvdXQnOiAnMzU0MicsXHJcbiAgICAnQW1hdXJvdCBTaWNrbHkgSW5mZXJubyc6ICczREUzJyxcclxuICAgICdBbWF1cm90IERpc3F1aWV0aW5nIEdsZWFtJzogJzM1NDYnLFxyXG4gICAgJ0FtYXVyb3QgQmxhY2sgRGVhdGgnOiAnMzU0MycsXHJcbiAgICAnQW1hdXJvdCBGb3JjZSBvZiBMb2F0aGluZyc6ICczNTQ0JyxcclxuICAgICdBbWF1cm90IERhbW5pbmcgUmF5IDEnOiAnM0UwMCcsXHJcbiAgICAnQW1hdXJvdCBEYW1uaW5nIFJheSAyJzogJzNFMDEnLFxyXG4gICAgJ0FtYXVyb3QgRGVhZGx5IFRlbnRhY2xlcyc6ICczNTQ3JyxcclxuICAgICdBbWF1cm90IE1pc2ZvcnR1bmUnOiAnM0NFMicsXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnQW1hdXJvdCBBcG9rYWx5cHNpcyc6ICczQ0Q3JyxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkFuYW1uZXNpc0FueWRlcixcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnQW5hbW5lc2lzIFRyZW5jaCBQaHVhYm8gU3BpbmUgTGFzaCc6ICc0RDFBJywgLy8gZnJvbnRhbCBjb25hbFxyXG4gICAgJ0FuYW1uZXNpcyBUcmVuY2ggQW5lbW9uZSBGYWxsaW5nIFJvY2snOiAnNEUzNycsIC8vIGdyb3VuZCBjaXJjbGUgYW9lIGZyb20gVHJlbmNoIEFuZW1vbmUgc2hvd2luZyB1cFxyXG4gICAgJ0FuYW1uZXNpcyBUcmVuY2ggRGFnb25pdGUgU2V3ZXIgV2F0ZXInOiAnNEQxQycsIC8vIGZyb250YWwgY29uYWwgZnJvbSBUcmVuY2ggQW5lbW9uZSAoPyEpXHJcbiAgICAnQW5hbW5lc2lzIFRyZW5jaCBZb3ZyYSBSb2NrIEhhcmQnOiAnNEQyMScsIC8vIHRhcmdldGVkIGNpcmNsZSBhb2VcclxuICAgICdBbmFtbmVzaXMgVHJlbmNoIFlvdnJhIFRvcnJlbnRpYWwgVG9ybWVudCc6ICc0RDIxJywgLy8gZnJvbnRhbCBjb25hbFxyXG4gICAgJ0FuYW1uZXNpcyBVbmtub3duIEx1bWlub3VzIFJheSc6ICc0RTI3JywgLy8gVW5rbm93biBsaW5lIGFvZVxyXG4gICAgJ0FuYW1uZXNpcyBVbmtub3duIFNpbnN0ZXIgQnViYmxlIEV4cGxvc2lvbic6ICc0QjZFJywgLy8gVW5rbm93biBleHBsb3Npb25zIGR1cmluZyBTY3J1dGlueVxyXG4gICAgJ0FuYW1uZXNpcyBVbmtub3duIFJlZmxlY3Rpb24nOiAnNEI2RicsIC8vIFVua25vd24gY29uYWwgYXR0YWNrIGR1cmluZyBTY3J1dGlueVxyXG4gICAgJ0FuYW1uZXNpcyBVbmtub3duIENsZWFyb3V0IDEnOiAnNEI3NCcsIC8vIFVua25vd24gZnJvbnRhbCBjb25lXHJcbiAgICAnQW5hbW5lc2lzIFVua25vd24gQ2xlYXJvdXQgMic6ICc0QjZCJywgLy8gVW5rbm93biBmcm9udGFsIGNvbmVcclxuICAgICdBbmFtbmVzaXMgVW5rbm93biBTZXRiYWNrIDEnOiAnNEI3NScsIC8vIFVua25vd24gcmVhciBjb25lXHJcbiAgICAnQW5hbW5lc2lzIFVua25vd24gU2V0YmFjayAyJzogJzVCNkMnLCAvLyBVbmtub3duIHJlYXIgY29uZVxyXG4gICAgJ0FuYW1uZXNpcyBBbnlkZXIgQ2xpb25pZCBBY3JpZCBTdHJlYW0nOiAnNEQyNCcsIC8vIHRhcmdldGVkIGNpcmNsZSBhb2VcclxuICAgICdBbmFtbmVzaXMgQW55ZGVyIERpdmluZXIgRHJlYWRzdG9ybSc6ICc0RDI4JywgLy8gZ3JvdW5kIGNpcmNsZSBhb2VcclxuICAgICdBbmFtbmVzaXMgS3lrbG9wcyAyMDAwLU1pbmEgU3dpbmcnOiAnNEI1NScsIC8vIEt5a2xvcHMgZ2V0IG91dCBtZWNoYW5pY1xyXG4gICAgJ0FuYW1uZXNpcyBLeWtsb3BzIFRlcnJpYmxlIEhhbW1lcic6ICc0QjVEJywgLy8gS3lrbG9wcyBIYW1tZXIvQmxhZGUgYWx0ZXJuYXRpbmcgc3F1YXJlc1xyXG4gICAgJ0FuYW1uZXNpcyBLeWtsb3BzIFRlcnJpYmxlIEJsYWRlJzogJzRCNUUnLCAvLyBLeWtsb3BzIEhhbW1lci9CbGFkZSBhbHRlcm5hdGluZyBzcXVhcmVzXHJcbiAgICAnQW5hbW5lc2lzIEt5a2xvcHMgUmFnaW5nIEdsb3dlcic6ICc0QjU2JywgLy8gS3lrbG9wcyBsaW5lIGFvZVxyXG4gICAgJ0FuYW1uZXNpcyBLeWtsb3BzIEV5ZSBPZiBUaGUgQ3ljbG9uZSc6ICc0QjU3JywgLy8gS3lrbG9wcyBkb251dFxyXG4gICAgJ0FuYW1uZXNpcyBBbnlkZXIgSGFycG9vbmVyIEh5ZHJvYmFsbCc6ICc0RDI2JywgLy8gZnJvbnRhbCBjb25hbFxyXG4gICAgJ0FuYW1uZXNpcyBSdWtzaHMgU3dpZnQgU2hpZnQnOiAnNEI4MycsIC8vIFJ1a3NocyBEZWVtIHRlbGVwb3J0IE4vU1xyXG4gICAgJ0FuYW1uZXNpcyBSdWtzaHMgRGVwdGggR3JpcCBXYXZlYnJlYWtlcic6ICczM0Q0JywgLy8gUnVrc2hzIERlZW0gaGFuZCBhdHRhY2tzXHJcbiAgICAnQW5hbW5lc2lzIFJ1a3NocyBSaXNpbmcgVGlkZSc6ICc0QjhCJywgLy8gUnVrc2hzIERlZW0gY3Jvc3MgYW9lXHJcbiAgICAnQW5hbW5lc2lzIFJ1a3NocyBDb21tYW5kIEN1cnJlbnQnOiAnNEI4MicsIC8vIFJ1a3NocyBEZWVtIHByb3RlYW4taXNoIGdyb3VuZCBhb2VzXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdBbmFtbmVzaXMgVHJlbmNoIFh6b21pdCBNYW50bGUgRHJpbGwnOiAnNEQxOScsIC8vIGNoYXJnZSBhdHRhY2tcclxuICAgICdBbmFtbmVzaXMgSW8gT3VzaWEgQmFycmVsaW5nIFNtYXNoJzogJzRFMjQnLCAvLyBjaGFyZ2UgYXR0YWNrXHJcbiAgICAnQW5hbW5lc2lzIEt5a2xvcHMgV2FuZGVyZXJcXCdzIFB5cmUnOiAnNEI1RicsIC8vIEt5a2xvcHMgc3ByZWFkIGF0dGFja1xyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFRPRE86IE1pc3NpbmcgR3Jvd2luZyB0ZXRoZXJzIG9uIGJvc3MgMi5cclxuLy8gKE1heWJlIGdhdGhlciBwYXJ0eSBtZW1iZXIgbmFtZXMgb24gdGhlIHByZXZpb3VzIFRJSUlJTUJFRUVFRUVSIGNhc3QgZm9yIGNvbXBhcmlzb24/KVxyXG4vLyBUT0RPOiBGYWlsaW5nIHRvIGludGVycnVwdCBEb2huZmF1c3QgRnVhdGggb24gV2F0ZXJpbmcgV2hlZWwgY2FzdHM/XHJcbi8vICgxNTouLi4uLi4uLjpEb2huZmFzdCBGdWF0aDozREFBOldhdGVyaW5nIFdoZWVsOi4uLi4uLi4uOihcXHl7TmFtZX0pOilcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5Eb2huTWhlZyxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnRG9obiBNaGVnIEdleXNlcic6ICcyMjYwJywgLy8gV2F0ZXIgZXJ1cHRpb25zLCBib3NzIDFcclxuICAgICdEb2huIE1oZWcgSHlkcm9mYWxsJzogJzIyQkQnLCAvLyBHcm91bmQgQW9FIG1hcmtlciwgYm9zcyAxXHJcbiAgICAnRG9obiBNaGVnIExhdWdoaW5nIExlYXAnOiAnMjI5NCcsIC8vIEdyb3VuZCBBb0UgbWFya2VyLCBib3NzIDFcclxuICAgICdEb2huIE1oZWcgU3dpbmdlJzogJzIyQ0EnLCAvLyBGcm9udGFsIGNvbmUsIGJvc3MgMlxyXG4gICAgJ0RvaG4gTWhlZyBDYW5vcHknOiAnM0RCMCcsIC8vIEZyb250YWwgY29uZSwgRG9obmZhdXN0IFJvd2FucyB0aHJvdWdob3V0IGluc3RhbmNlXHJcbiAgICAnRG9obiBNaGVnIFBpbmVjb25lIEJvbWInOiAnM0RCMScsIC8vIENpcmN1bGFyIGdyb3VuZCBBb0UgbWFya2VyLCBEb2huZmF1c3QgUm93YW5zIHRocm91Z2hvdXQgaW5zdGFuY2VcclxuICAgICdEb2huIE1oZWcgQmlsZSBCb21iYXJkbWVudCc6ICczNEVFJywgLy8gR3JvdW5kIEFvRSBtYXJrZXIsIGJvc3MgM1xyXG4gICAgJ0RvaG4gTWhlZyBDb3Jyb3NpdmUgQmlsZSc6ICczNEVDJywgLy8gRnJvbnRhbCBjb25lLCBib3NzIDNcclxuICAgICdEb2huIE1oZWcgRmxhaWxpbmcgVGVudGFjbGVzJzogJzM2ODEnLFxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdEb2huIE1oZWcgSW1wIENob2lyJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzQ2RScgfSksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmVmZmVjdCB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdEb2huIE1oZWcgVG9hZCBDaG9pcicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICcxQjcnIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5lZmZlY3QgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRG9obiBNaGVnIEZvb2xcXCdzIFR1bWJsZScsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICcxODMnIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5lZmZlY3QgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gVE9ETzogQmVyc2Vya2VyIDJuZC8zcmQgd2lsZCBhbmd1aXNoIHNob3VsZCBiZSBzaGFyZWQgd2l0aCBqdXN0IGEgcm9ja1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZUhlcm9lc0dhdW50bGV0LFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdUSEcgQmxhZGVcXCdzIEJlbmlzb24nOiAnNTIyOCcsIC8vIHBsZCBjb25hbFxyXG4gICAgJ1RIRyBBYnNvbHV0ZSBIb2x5JzogJzUyNEInLCAvLyB3aG0gdmVyeSBsYXJnZSBhb2VcclxuICAgICdUSEcgSGlzc2F0c3U6IEdva2EnOiAnNTIzRCcsIC8vIHNhbSBsaW5lIGFvZVxyXG4gICAgJ1RIRyBXaG9sZSBTZWxmJzogJzUyMkQnLCAvLyBtbmsgd2lkZSBsaW5lIGFvZVxyXG4gICAgJ1RIRyBSYW5kZ3JpdGgnOiAnNTIzMicsIC8vIGRyZyB2ZXJ5IGJpZyBsaW5lIGFvZVxyXG4gICAgJ1RIRyBWYWN1dW0gQmxhZGUgMSc6ICc1MDYxJywgLy8gU3BlY3RyYWwgVGhpZWYgY2lyY3VsYXIgZ3JvdW5kIGFvZSBmcm9tIG1hcmtlclxyXG4gICAgJ1RIRyBWYWN1dW0gQmxhZGUgMic6ICc1MDYyJywgLy8gU3BlY3RyYWwgVGhpZWYgY2lyY3VsYXIgZ3JvdW5kIGFvZSBmcm9tIG1hcmtlclxyXG4gICAgJ1RIRyBDb3dhcmRcXCdzIEN1bm5pbmcnOiAnNEZENycsIC8vIFNwZWN0cmFsIFRoaWVmIENoaWNrZW4gS25pZmUgbGFzZXJcclxuICAgICdUSEcgUGFwZXJjdXR0ZXIgMSc6ICc0RkQxJywgLy8gU3BlY3RyYWwgVGhpZWYgbGluZSBhb2UgZnJvbSBtYXJrZXJcclxuICAgICdUSEcgUGFwZXJjdXR0ZXIgMic6ICc0RkQyJywgLy8gU3BlY3RyYWwgVGhpZWYgbGluZSBhb2UgZnJvbSBtYXJrZXJcclxuICAgICdUSEcgUmluZyBvZiBEZWF0aCc6ICc1MjM2JywgLy8gZHJnIGNpcmN1bGFyIGFvZVxyXG4gICAgJ1RIRyBMdW5hciBFY2xpcHNlJzogJzUyMjcnLCAvLyBwbGQgY2lyY3VsYXIgYW9lXHJcbiAgICAnVEhHIEFic29sdXRlIEdyYXZpdHknOiAnNTI0OCcsIC8vIGluayBtYWdlIGNpcmN1bGFyXHJcbiAgICAnVEhHIFJhaW4gb2YgTGlnaHQnOiAnNTI0MicsIC8vIGJhcmQgbGFyZ2UgY2lyY3VsZSBhb2VcclxuICAgICdUSEcgRG9vbWluZyBGb3JjZSc6ICc1MjM5JywgLy8gZHJnIGxpbmUgYW9lXHJcbiAgICAnVEhHIEFic29sdXRlIERhcmsgSUknOiAnNEY2MScsIC8vIE5lY3JvbWFuY2VyIDEyMCBkZWdyZWUgY29uYWxcclxuICAgICdUSEcgQnVyc3QnOiAnNTNCNycsIC8vIE5lY3JvbWFuY2VyIG5lY3JvYnVyc3Qgc21hbGwgem9tYmllIGV4cGxvc2lvblxyXG4gICAgJ1RIRyBQYWluIE1pcmUnOiAnNEZBNCcsIC8vIE5lY3JvbWFuY2VyIHZlcnkgbGFyZ2UgZ3JlZW4gYmxlZWQgcHVkZGxlXHJcbiAgICAnVEhHIERhcmsgRGVsdWdlJzogJzRGNUQnLCAvLyBOZWNyb21hbmNlciBncm91bmQgYW9lXHJcbiAgICAnVEhHIFRla2thIEdvamluJzogJzUyM0UnLCAvLyBzYW0gOTAgZGVncmVlIGNvbmFsXHJcbiAgICAnVEhHIFJhZ2luZyBTbGljZSAxJzogJzUyMEEnLCAvLyBCZXJzZXJrZXIgbGluZSBjbGVhdmVcclxuICAgICdUSEcgUmFnaW5nIFNsaWNlIDInOiAnNTIwQicsIC8vIEJlcnNlcmtlciBsaW5lIGNsZWF2ZVxyXG4gICAgJ1RIRyBXaWxkIFJhZ2UnOiAnNTIwMycsIC8vIEJlcnNlcmtlciBibHVlIGtub2NrYmFjayBwdWNrXHJcbiAgfSxcclxuICBnYWluc0VmZmVjdFdhcm46IHtcclxuICAgICdUSEcgQmxlZWRpbmcnOiAnODI4JywgLy8gU3RhbmRpbmcgaW4gdGhlIE5lY3JvbWFuY2VyIHB1ZGRsZSBvciBvdXRzaWRlIHRoZSBCZXJzZXJrZXIgYXJlbmFcclxuICB9LFxyXG4gIGdhaW5zRWZmZWN0RmFpbDoge1xyXG4gICAgJ1RIRyBUcnVseSBCZXJzZXJrJzogJzkwNicsIC8vIFN0YW5kaW5nIGluIHRoZSBjcmF0ZXIgdG9vIGxvbmdcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ1RIRyBBYnNvbHV0ZSBUaHVuZGVyIElWJzogJzUyNDUnLCAvLyBoZWFkbWFya2VyIGFvZSBmcm9tIGJsbVxyXG4gICAgJ1RIRyBNb29uZGl2ZXInOiAnNTIzMycsIC8vIGhlYWRtYXJrZXIgYW9lIGZyb20gZHJnXHJcbiAgICAnVEhHIFNwZWN0cmFsIEd1c3QnOiAnNTNDRicsIC8vIFNwZWN0cmFsIFRoaWVmIGhlYWRtYXJrZXIgYW9lXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgICdUSEcgRmFsbGluZyBSb2NrJzogJzUyMDUnLCAvLyBCZXJzZXJrZXIgaGVhZG1hcmtlciBhb2UgdGhhdCBjcmVhdGVzIHJ1YmJsZVxyXG4gIH0sXHJcbiAgc29sb1dhcm46IHtcclxuICAgIC8vIFRoaXMgc2hvdWxkIGFsd2F5cyBiZSBzaGFyZWQuICBPbiBhbGwgdGltZXMgYnV0IHRoZSAybmQgYW5kIDNyZCwgaXQncyBhIHBhcnR5IHNoYXJlLlxyXG4gICAgLy8gVE9ETzogb24gdGhlIDJuZCBhbmQgM3JkIHRpbWUgdGhpcyBzaG91bGQgb25seSBiZSBzaGFyZWQgd2l0aCBhIHJvY2suXHJcbiAgICAvLyBUT0RPOiBhbHRlcm5hdGl2ZWx5IHdhcm4gb24gdGFraW5nIG9uZSBvZiB0aGVzZSB3aXRoIGEgNDcyIE1hZ2ljIFZ1bG5lcmFiaWxpdHkgVXAgZWZmZWN0XHJcbiAgICAnVEhHIFdpbGQgQW5ndWlzaCc6ICc1MjA5JyxcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnVEhHIFdpbGQgUmFtcGFnZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzUyMDcnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIC8vIFRoaXMgaXMgemVybyBkYW1hZ2UgaWYgeW91IGFyZSBpbiB0aGUgY3JhdGVyLlxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiBkYXRhLkRhbWFnZUZyb21NYXRjaGVzKG1hdGNoZXMpID4gMCxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkhvbG1pbnN0ZXJTd2l0Y2gsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0hvbG1pbnN0ZXIgVGh1bWJzY3Jldyc6ICczREM2JyxcclxuICAgICdIb2xtaW5zdGVyIFdvb2RlbiBob3JzZSc6ICczREM3JyxcclxuICAgICdIb2xtaW5zdGVyIExpZ2h0IFNob3QnOiAnM0RDOCcsXHJcbiAgICAnSG9sbWluc3RlciBIZXJldGljXFwncyBGb3JrJzogJzNEQ0UnLFxyXG4gICAgJ0hvbG1pbnN0ZXIgSG9seSBXYXRlcic6ICczREQ0JyxcclxuICAgICdIb2xtaW5zdGVyIEZpZXJjZSBCZWF0aW5nIDEnOiAnM0RERCcsXHJcbiAgICAnSG9sbWluc3RlciBGaWVyY2UgQmVhdGluZyAyJzogJzNEREUnLFxyXG4gICAgJ0hvbG1pbnN0ZXIgRmllcmNlIEJlYXRpbmcgMyc6ICczRERGJyxcclxuICAgICdIb2xtaW5zdGVyIENhdCBPXFwnIE5pbmUgVGFpbHMnOiAnM0RFMScsXHJcbiAgICAnSG9sbWluc3RlciBSaWdodCBLbm91dCc6ICczREU2JyxcclxuICAgICdIb2xtaW5zdGVyIExlZnQgS25vdXQnOiAnM0RFNycsXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnSG9sbWluc3RlciBBZXRoZXJzdXAnOiAnM0RFOScsXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdIb2xtaW5zdGVyIEZsYWdlbGxhdGlvbic6ICczREQ2JyxcclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgJ0hvbG1pbnN0ZXIgVGFwaGVwaG9iaWEnOiAnNDE4MScsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5NYWxpa2Foc1dlbGwsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ01hbGlrYWggRmFsbGluZyBSb2NrJzogJzNDRUEnLFxyXG4gICAgJ01hbGlrYWggV2VsbGJvcmUnOiAnM0NFRCcsXHJcbiAgICAnTWFsaWthaCBHZXlzZXIgRXJ1cHRpb24nOiAnM0NFRScsXHJcbiAgICAnTWFsaWthaCBTd2lmdCBTcGlsbCc6ICczQ0YwJyxcclxuICAgICdNYWxpa2FoIEJyZWFraW5nIFdoZWVsIDEnOiAnM0NGNScsXHJcbiAgICAnTWFsaWthaCBDcnlzdGFsIE5haWwnOiAnM0NGNycsXHJcbiAgICAnTWFsaWthaCBIZXJldGljXFwncyBGb3JrIDEnOiAnM0NGOScsXHJcbiAgICAnTWFsaWthaCBCcmVha2luZyBXaGVlbCAyJzogJzNDRkEnLFxyXG4gICAgJ01hbGlrYWggSGVyZXRpY1xcJ3MgRm9yayAyJzogJzNFMEUnLFxyXG4gICAgJ01hbGlrYWggRWFydGhzaGFrZSc6ICczRTM5JyxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gVE9ETzogY291bGQgaW5jbHVkZSA1NDg0IE11ZG1hbiBSb2NreSBSb2xsIGFzIGEgc2hhcmVXYXJuLCBidXQgaXQncyBsb3cgZGFtYWdlIGFuZCBjb21tb24uXHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuTWF0b3lhc1JlbGljdCxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnTWF0b3lhIFJlbGljdCBXZXJld29vZCBPdmF0aW9uJzogJzU1MTgnLCAvLyBsaW5lIGFvZVxyXG4gICAgJ01hdG95YSBDYXZlIFRhcmFudHVsYSBIYXdrIEFwaXRveGluJzogJzU1MTknLCAvLyBiaWcgY2lyY2xlIGFvZVxyXG4gICAgJ01hdG95YSBTcHJpZ2dhbiBTdG9uZWJlYXJlciBSb21wJzogJzU1MUEnLCAvLyBjb25hbCBhb2VcclxuICAgICdNYXRveWEgU29ubnkgT2YgWmlnZ3kgSml0dGVyaW5nIEdsYXJlJzogJzU1MUMnLCAvLyBsb25nIG5hcnJvdyBjb25hbCBhb2VcclxuICAgICdNYXRveWEgTXVkbWFuIFF1YWdtaXJlJzogJzU0ODEnLCAvLyBNdWRtYW4gYW9lIHB1ZGRsZXNcclxuICAgICdNYXRveWEgTXVkbWFuIEJyaXR0bGUgQnJlY2NpYSAxJzogJzU0OEUnLCAvLyBleHBhbmRpbmcgY2lyY2xlIGFvZVxyXG4gICAgJ01hdG95YSBNdWRtYW4gQnJpdHRsZSBCcmVjY2lhIDInOiAnNTQ4RicsIC8vIGV4cGFuZGluZyBjaXJjbGUgYW9lXHJcbiAgICAnTWF0b3lhIE11ZG1hbiBCcml0dGxlIEJyZWNjaWEgMyc6ICc1NDkwJywgLy8gZXhwYW5kaW5nIGNpcmNsZSBhb2VcclxuICAgICdNYXRveWEgTXVkbWFuIE11ZCBCdWJibGUnOiAnNTQ4NycsIC8vIHN0YW5kaW5nIGluIG11ZCBwdWRkbGU/XHJcbiAgICAnTWF0b3lhIENhdmUgUHVnaWwgU2NyZXdkcml2ZXInOiAnNTUxRScsIC8vIGNvbmFsIGFvZVxyXG4gICAgJ01hdG95YSBOaXhpZSBHdXJnbGUnOiAnNTk5MicsIC8vIE5peGllIHdhbGwgZmx1c2hcclxuICAgICdNYXRveWEgUmVsaWN0IE1vbHRlbiBQaG9lYmFkIFB5cm9jbGFzdGljIFNob3QnOiAnNTdFQicsIC8vIHRoZSBsaW5lIGFvZXMgYXMgeW91IHJ1biB0byB0cmFzaFxyXG4gICAgJ01hdG95YSBSZWxpY3QgRmxhbiBGbG9vZCc6ICc1NTIzJywgLy8gYmlnIGNpcmNsZSBhb2VcclxuICAgICdNYXRveWEgUHlyb2R1Y3QgRWxkdGh1cnMgTWFzaCc6ICc1NTI3JywgLy8gbGluZSBhb2VcclxuICAgICdNYXR5b2EgUHlyb2R1Y3QgRWxkdGh1cnMgU3Bpbic6ICc1NTI4JywgLy8gdmVyeSBsYXJnZSBjaXJjbGUgYW9lXHJcbiAgICAnTWF0b3lhIFJlbGljdCBCYXZhcm9pcyBUaHVuZGVyIElJSSc6ICc1NTI1JywgLy8gY2lyY2xlIGFvZVxyXG4gICAgJ01hdG95YSBSZWxpY3QgTWFyc2htYWxsb3cgQW5jaWVudCBBZXJvJzogJzU1MjQnLCAvLyB2ZXJ5IGxhcmdlIGxpbmUgZ3JvYW9lXHJcbiAgICAnTWF0b3lhIFJlbGljdCBQdWRkaW5nIEZpcmUgSUknOiAnNTUyMicsIC8vIGNpcmNsZSBhb2VcclxuICAgICdNYXRveWEgUmVsaWN0IE1vbHRlbiBQaG9lYmFkIEhvdCBMYXZhJzogJzU3RTknLCAvLyBjb25hbCBhb2VcclxuICAgICdNYXRveWEgUmVsaWN0IE1vbHRlbiBQaG9lYmFkIFZvbGNhbmljIERyb3AnOiAnNTdFOCcsIC8vIGNpcmNsZSBhb2VcclxuICAgICdNYXRveWEgTW90aGVyIFBvcnhpZSBNZWRpdW0gUmVhcic6ICc1OTFEJywgLy8ga25vY2tiYWNrIGludG8gc2FmZSBjaXJjbGUgYW9lXHJcbiAgICAnTWF0b3lhIE1vdGhlciBQb3J4aWUgQmFyYmVxdWUgTGluZSc6ICc1OTE3JywgLy8gbGluZSBhb2UgZHVyaW5nIGJicVxyXG4gICAgJ01hdG95YSBNb3RoZXIgUG9yeGllIEJhcmJlcXVlIENpcmNsZSc6ICc1OTE4JywgLy8gY2lyY2xlIGFvZSBkdXJpbmcgYmJxXHJcbiAgICAnTWF0b3lhIE1vdGhlciBQb3J4aWUgVG8gQSBDcmlzcCc6ICc1OTI1JywgLy8gZ2V0dGluZyB0byBjbG9zZSB0byBib3NzIGR1cmluZyBiYnFcclxuICAgICdNYXRveWEgTW90aGVyIFByb3hpZSBCdWZmZXQnOiAnNTkyNicsIC8vIEFlb2xpYW4gQ2F2ZSBTcHJpdGUgbGluZSBhb2UgKGlzIHRoaXMgYSBwdW4/KVxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ01hdG95YSBOaXhpZSBTZWEgU2hhbnR5JzogJzU5OEMnLCAvLyBOb3QgdGFraW5nIHRoZSBwdWRkbGUgdXAgdG8gdGhlIHRvcD8gRmFpbGluZyBhZGQgZW5yYWdlP1xyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnTWF0b3lhIE5peGllIENyYWNrJzogJzU5OTAnLCAvLyBOaXhpZSBDcmFzaC1TbWFzaCB0YW5rIHRldGhlcnNcclxuICAgICdNYXRveWEgTml4aWUgU3B1dHRlcic6ICc1OTkzJywgLy8gTml4aWUgc3ByZWFkIG1hcmtlclxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuTXRHdWxnLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdHdWxnIEltbW9sYXRpb24nOiAnNDFBQScsXHJcbiAgICAnR3VsZyBUYWlsIFNtYXNoJzogJzQxQUInLFxyXG4gICAgJ0d1bGcgSGVhdmVuc2xhc2gnOiAnNDFBOScsXHJcbiAgICAnR3VsZyBUeXBob29uIFdpbmcgMSc6ICczRDAwJyxcclxuICAgICdHdWxnIFR5cGhvb24gV2luZyAyJzogJzNEMDEnLFxyXG4gICAgJ0d1bGcgSHVycmljYW5lIFdpbmcnOiAnM0QwMycsXHJcbiAgICAnR3VsZyBFYXJ0aCBTaGFrZXInOiAnMzdGNScsXHJcbiAgICAnR3VsZyBTYW5jdGlmaWNhdGlvbic6ICc0MUFFJyxcclxuICAgICdHdWxnIEV4ZWdlc2lzJzogJzNEMDcnLFxyXG4gICAgJ0d1bGcgUGVyZmVjdCBDb250cml0aW9uJzogJzNEMEUnLFxyXG4gICAgJ0d1bGcgU2FuY3RpZmllZCBBZXJvJzogJzQxQUQnLFxyXG4gICAgJ0d1bGcgRGl2aW5lIERpbWludWVuZG8gMSc6ICczRDE2JyxcclxuICAgICdHdWxnIERpdmluZSBEaW1pbnVlbmRvIDInOiAnM0QxOCcsXHJcbiAgICAnR3VsZyBEaXZpbmUgRGltaW51ZW5kbyAzJzogJzQ2NjknLFxyXG4gICAgJ0d1bGcgRGl2aW5lIERpbWludWVuZG8gNCc6ICczRDE5JyxcclxuICAgICdHdWxnIERpdmluZSBEaW1pbnVlbmRvIDUnOiAnM0QyMScsXHJcbiAgICAnR3VsZyBDb252aWN0aW9uIE1hcmNhdG8gMSc6ICczRDFBJyxcclxuICAgICdHdWxnIENvbnZpY3Rpb24gTWFyY2F0byAyJzogJzNEMUInLFxyXG4gICAgJ0d1bGcgQ29udmljdGlvbiBNYXJjYXRvIDMnOiAnM0QyMCcsXHJcbiAgICAnR3VsZyBWZW5hIEFtb3Jpcyc6ICczRDI3JyxcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdHdWxnIEx1bWVuIEluZmluaXR1bSc6ICc0MUIyJyxcclxuICAgICdHdWxnIFJpZ2h0IFBhbG0nOiAnMzdGOCcsXHJcbiAgICAnR3VsZyBMZWZ0IFBhbG0nOiAnMzdGQScsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFRPRE86IFdoYXQgdG8gZG8gYWJvdXQgS2FobiBSYWkgNUI1MD9cclxuLy8gSXQgc2VlbXMgaW1wb3NzaWJsZSBmb3IgdGhlIG1hcmtlZCBwZXJzb24gdG8gYXZvaWQgZW50aXJlbHkuXHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuUGFnbHRoYW4sXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ1BhZ2x0aGFuIFRlbG92b3VpdnJlIFBsYWd1ZSBTd2lwZSc6ICc2MEZDJywgLy8gZnJvbnRhbCBjb25hbCBjbGVhdmVcclxuICAgICdQYWdsdGhhbiBMZXNzZXIgVGVsb2RyYWdvbiBFbmd1bGZpbmcgRmxhbWVzJzogJzYwRjUnLCAvLyBmcm9udGFsIGNvbmFsIGNsZWF2ZVxyXG4gICAgJ1BhZ2x0aGFuIEFtaHVsdWsgTGlnaHRuaW5nIEJvbHQnOiAnNUM0QycsIC8vIGNpcmN1bGFyIGxpZ2h0bmluZyBhb2UgKG9uIHNlbGYgb3IgcG9zdClcclxuICAgICdQYWdsdGhhbiBBbWh1bHVrIEJhbGwgT2YgTGV2aW4gU2hvY2snOiAnNUM1MicsIC8vIHB1bHNpbmcgc21hbGwgY2lyY3VsYXIgYW9lc1xyXG4gICAgJ1BhZ2x0aGFuIEFtaHVsdWsgU3VwZXJjaGFyZ2VkIEJhbGwgT2YgTGV2aW4gU2hvY2snOiAnNUM1MycsIC8vIHB1bHNpbmcgbGFyZ2UgY2lyY3VsYXIgYW9lXHJcbiAgICAnUGFnbHRoYW4gQW1odWx1ayBXaWRlIEJsYXN0ZXInOiAnNjBDNScsIC8vIHJlYXIgY29uYWwgY2xlYXZlXHJcbiAgICAnUGFnbHRoYW4gVGVsb2Jyb2JpbnlhayBGYWxsIE9mIE1hbic6ICc2MTQ4JywgLy8gY2lyY3VsYXIgYW9lXHJcbiAgICAnUGFnbHRoYW4gVGVsb3RlayBSZWFwZXIgTWFnaXRlayBDYW5ub24nOiAnNjEyMScsIC8vIGNpcmN1bGFyIGFvZVxyXG4gICAgJ1BhZ2x0aGFuIFRlbG9kcmFnb24gU2hlZXQgb2YgSWNlJzogJzYwRjgnLCAvLyBjaXJjdWxhciBhb2VcclxuICAgICdQYWdsdGhhbiBUZWxvZHJhZ29uIEZyb3N0IEJyZWF0aCc6ICc2MEY3JywgLy8gdmVyeSBsYXJnZSBjb25hbCBjbGVhdmVcclxuICAgICdQYWdsdGhhbiBNYWdpdGVrIENvcmUgU3RhYmxlIENhbm5vbic6ICc1Qzk0JywgLy8gbGFyZ2UgbGluZSBhb2VzXHJcbiAgICAnUGFnbHRoYW4gTWFnaXRlayBDb3JlIDItVG9uemUgTWFnaXRlayBNaXNzaWxlJzogJzVDOTUnLCAvLyBsYXJnZSBjaXJjdWxhciBhb2VcclxuICAgICdQYWdsdGhhbiBUZWxvdGVrIFNreSBBcm1vciBBZXRoZXJzaG90JzogJzVDOUMnLCAvLyBjaXJjdWxhciBhb2VcclxuICAgICdQYWdsdGhhbiBNYXJrIElJIFRlbG90ZWsgQ29sb3NzdXMgRXhoYXVzdCc6ICc1Qzk5JywgLy8gbGFyZ2UgbGluZSBhb2VcclxuICAgICdQYWdsdGhhbiBNYWdpdGVrIE1pc3NpbGUgRXhwbG9zaXZlIEZvcmNlJzogJzVDOTgnLCAvLyBzbG93IG1vdmluZyBob3Jpem9udGFsIG1pc3NpbGVzXHJcbiAgICAnUGFnbHRoYW4gVGlhbWF0IEZsYW1pc3BoZXJlJzogJzYxMEYnLCAvLyB2ZXJ5IGxvbmcgbGluZSBhb2VcclxuICAgICdQYWdsdGhhbiBBcm1vcmVkIFRlbG9kcmFnb24gVG9ydG9pc2UgU3RvbXAnOiAnNjE0QicsIC8vIGxhcmdlIGNpcmN1bGFyIGFvZSBmcm9tIHR1cnRsZVxyXG4gICAgJ1BhZ2x0aGFuIFRlbG9kcmFnb24gVGh1bmRlcm91cyBCcmVhdGgnOiAnNjE0OScsIC8vIGxhcmdlIGNvbmFsIGNsZWF2ZVxyXG4gICAgJ1BhZ2x0aGFuIEx1bmFyIEJhaGFtdXQgTHVuYXIgTmFpbCBVcGJ1cnN0JzogJzYwNUInLCAvLyBzbWFsbCBhb2VzIGJlZm9yZSBCaWcgQnVyc3RcclxuICAgICdQYWdsdGhhbiBMdW5hciBCYWhhbXV0IEx1bmFyIE5haWwgQmlnIEJ1cnN0JzogJzVCNDgnLCAvLyBsYXJnZSBjaXJjdWxhciBhb2VzIGZyb20gbmFpbHNcclxuICAgICdQYWdsdGhhbiBMdW5hciBCYWhhbXV0IFBlcmlnZWFuIEJyZWF0aCc6ICc1QjU5JywgLy8gbGFyZ2UgY29uYWwgY2xlYXZlXHJcbiAgICAnUGFnbHRoYW4gTHVuYXIgQmFoYW11dCBNZWdhZmxhcmUnOiAnNUI0RScsIC8vIG1lZ2FmbGFyZSBwZXBwZXJvbmlcclxuICAgICdQYWdsdGhhbiBMdW5hciBCYWhhbXV0IE1lZ2FmbGFyZSBEaXZlJzogJzVCNTInLCAvLyBtZWdhZmxhcmUgbGluZSBhb2UgYWNyb3NzIHRoZSBhcmVuYVxyXG4gICAgJ1BhZ2x0aGFuIEx1bmFyIEJhaGFtdXQgTHVuYXIgRmxhcmUnOiAnNUI0QScsIC8vIGxhcmdlIHB1cnBsZSBzaHJpbmtpbmcgY2lyY2xlc1xyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnUGFnbHRoYW4gTHVuYXIgQmFoYW11dCBNZWdhZmxhcmUnOiAnNUI0RCcsIC8vIG1lZ2FmbGFyZSBzcHJlYWQgbWFya2Vyc1xyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlUWl0YW5hUmF2ZWwsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ1FpdGFuYSBTdW4gVG9zcyc6ICczQzhBJywgLy8gR3JvdW5kIEFvRSwgYm9zcyBvbmVcclxuICAgICdRaXRhbmEgUm9ua2FuIExpZ2h0IDEnOiAnM0M4QycsIC8vIFN0YXR1ZSBhdHRhY2ssIGJvc3Mgb25lXHJcbiAgICAnUWl0YW5hIExvemF0bFxcJ3MgRnVyeSAxJzogJzNDOEYnLCAvLyBTZW1pY2lyY2xlIGNsZWF2ZSwgYm9zcyBvbmVcclxuICAgICdRaXRhbmEgTG96YXRsXFwncyBGdXJ5IDInOiAnM0M5MCcsIC8vIFNlbWljaXJjbGUgY2xlYXZlLCBib3NzIG9uZVxyXG4gICAgJ1FpdGFuYSBGYWxsaW5nIFJvY2snOiAnM0M5NicsIC8vIFNtYWxsIGdyb3VuZCBBb0UsIGJvc3MgdHdvXHJcbiAgICAnUWl0YW5hIEZhbGxpbmcgQm91bGRlcic6ICczQzk3JywgLy8gTGFyZ2UgZ3JvdW5kIEFvRSwgYm9zcyB0d29cclxuICAgICdRaXRhbmEgVG93ZXJmYWxsJzogJzNDOTgnLCAvLyBQaWxsYXIgY29sbGFwc2UsIGJvc3MgdHdvXHJcbiAgICAnUWl0YW5hIFZpcGVyIFBvaXNvbiAyJzogJzNDOUUnLCAvLyBTdGF0aW9uYXJ5IHBvaXNvbiBwdWRkbGVzLCBib3NzIHRocmVlXHJcbiAgICAnUWl0YW5hIENvbmZlc3Npb24gb2YgRmFpdGggMSc6ICczQ0EyJywgLy8gRGFuZ2Vyb3VzIG1pZGRsZSBkdXJpbmcgc3ByZWFkIGNpcmNsZXMsIGJvc3MgdGhyZWVcclxuICAgICdRaXRhbmEgQ29uZmVzc2lvbiBvZiBGYWl0aCAzJzogJzNDQTYnLCAvLyBEYW5nZXJvdXMgc2lkZXMgZHVyaW5nIHN0YWNrIG1hcmtlciwgYm9zcyB0aHJlZVxyXG4gICAgJ1FpdGFuYSBDb25mZXNzaW9uIG9mIEZhaXRoIDQnOiAnM0NBNycsIC8vIERhbmdlcm91cyBzaWRlcyBkdXJpbmcgc3RhY2sgbWFya2VyLCBib3NzIHRocmVlXHJcbiAgICAnUWl0YW5hIFJvbmthbiBMaWdodCAyJzogJzNENkQnLCAvLyBTdGF0dWUgYXR0YWNrLCBib3NzIG9uZVxyXG4gICAgJ1FpdGFuYSBXcmF0aCBvZiB0aGUgUm9ua2EnOiAnM0UyQycsIC8vIFN0YXR1ZSBsaW5lIGF0dGFjayBmcm9tIG1pbmktYm9zc2VzIGJlZm9yZSBmaXJzdCBib3NzXHJcbiAgICAnUWl0YW5hIFNpbnNwaXR0ZXInOiAnM0UzNicsIC8vIEdvcmlsbGEgYm91bGRlciB0b3NzIEFvRSBiZWZvcmUgdGhpcmQgYm9zc1xyXG4gICAgJ1FpdGFuYSBIb3VuZCBvdXQgb2YgSGVhdmVuJzogJzQyQjgnLCAvLyBUZXRoZXIgZXh0ZW5zaW9uIGZhaWx1cmUsIGJvc3MgdGhyZWU7IDQyQjcgaXMgY29ycmVjdCBleGVjdXRpb25cclxuICAgICdRaXRhbmEgUm9ua2FuIEFieXNzJzogJzQzRUInLCAvLyBHcm91bmQgQW9FIGZyb20gbWluaS1ib3NzZXMgYmVmb3JlIGZpcnN0IGJvc3NcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ1FpdGFuYSBWaXBlciBQb2lzb24gMSc6ICczQzlEJywgLy8gQW9FIGZyb20gdGhlIDAwQUIgcG9pc29uIGhlYWQgbWFya2VyLCBib3NzIHRocmVlXHJcbiAgICAnUWl0YW5hIENvbmZlc3Npb24gb2YgRmFpdGggMic6ICczQ0EzJywgLy8gT3ZlcmxhcHBlZCBjaXJjbGVzIGZhaWx1cmUgb24gdGhlIHNwcmVhZCBjaXJjbGVzIHZlcnNpb24gb2YgdGhlIG1lY2hhbmljXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFRoZSBHcmFuZCBDb3Ntb3NcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZUdyYW5kQ29zbW9zLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdDb3Ntb3MgSXJvbiBKdXN0aWNlJzogJzQ5MUYnLFxyXG4gICAgJ0Nvc21vcyBTbWl0ZSBPZiBSYWdlJzogJzQ5MjEnLFxyXG5cclxuICAgICdDb3Ntb3MgVHJpYnVsYXRpb24nOiAnNDlBNCcsXHJcbiAgICAnQ29zbW9zIERhcmsgU2hvY2snOiAnNDc2RicsXHJcbiAgICAnQ29zbW9zIFN3ZWVwJzogJzQ3NzAnLFxyXG4gICAgJ0Nvc21vcyBEZWVwIENsZWFuJzogJzQ3NzEnLFxyXG5cclxuICAgICdDb3Ntb3MgU2hhZG93IEJ1cnN0JzogJzQ5MjQnLFxyXG4gICAgJ0Nvc21vcyBCbG9vZHkgQ2FyZXNzJzogJzQ5MjcnLFxyXG4gICAgJ0Nvc21vcyBOZXBlbnRoaWMgUGx1bmdlJzogJzQ5MjgnLFxyXG4gICAgJ0Nvc21vcyBCcmV3aW5nIFN0b3JtJzogJzQ5MjknLFxyXG5cclxuICAgICdDb3Ntb3MgT2RlIFRvIEZhbGxlbiBQZXRhbHMnOiAnNDk1MCcsXHJcbiAgICAnQ29zbW9zIEZhciBXaW5kIEdyb3VuZCc6ICc0MjczJyxcclxuXHJcbiAgICAnQ29zbW9zIEZpcmUgQnJlYXRoJzogJzQ5MkInLFxyXG4gICAgJ0Nvc21vcyBSb25rYW4gRnJlZXplJzogJzQ5MkUnLFxyXG4gICAgJ0Nvc21vcyBPdmVycG93ZXInOiAnNDkyRCcsXHJcblxyXG4gICAgJ0Nvc21vcyBTY29yY2hpbmcgTGVmdCc6ICc0NzYzJyxcclxuICAgICdDb3Ntb3MgU2NvcmNoaW5nIFJpZ2h0JzogJzQ3NjInLFxyXG4gICAgJ0Nvc21vcyBPdGhlcndvcmRseSBIZWF0JzogJzQ3NUMnLFxyXG4gICAgJ0Nvc21vcyBGaXJlXFwncyBJcmUnOiAnNDc2MScsXHJcbiAgICAnQ29zbW9zIFBsdW1tZXQnOiAnNDc2NycsXHJcblxyXG4gICAgJ0Nvc21vcyBGaXJlXFwncyBEb21haW4gVGV0aGVyJzogJzQ3NUYnLFxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnQ29zbW9zIERhcmsgV2VsbCc6ICc0NzZEJyxcclxuICAgICdDb3Ntb3MgRmFyIFdpbmQgU3ByZWFkJzogJzQ3MjQnLFxyXG4gICAgJ0Nvc21vcyBCbGFjayBGbGFtZSc6ICc0NzVEJyxcclxuICAgICdDb3Ntb3MgRmlyZVxcJ3MgRG9tYWluJzogJzQ3NjAnLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlVHdpbm5pbmcsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ1R3aW5uaW5nIEF1dG8gQ2Fubm9ucyc6ICc0M0E5JyxcclxuICAgICdUd2lubmluZyBIZWF2ZSc6ICczREI5JyxcclxuICAgICdUd2lubmluZyAzMiBUb256ZSBTd2lwZSc6ICczREJCJyxcclxuICAgICdUd2lubmluZyBTaWRlc3dpcGUnOiAnM0RCRicsXHJcbiAgICAnVHdpbm5pbmcgV2luZCBTcG91dCc6ICczREJFJyxcclxuICAgICdUd2lubmluZyBTaG9jayc6ICczREYxJyxcclxuICAgICdUd2lubmluZyBMYXNlcmJsYWRlJzogJzNERUMnLFxyXG4gICAgJ1R3aW5uaW5nIFZvcnBhbCBCbGFkZSc6ICczREMyJyxcclxuICAgICdUd2lubmluZyBUaHJvd24gRmxhbWVzJzogJzNEQzMnLFxyXG4gICAgJ1R3aW5uaW5nIE1hZ2l0ZWsgUmF5JzogJzNERjMnLFxyXG4gICAgJ1R3aW5uaW5nIEhpZ2ggR3Jhdml0eSc6ICczREZBJyxcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdUd2lubmluZyAxMjggVG9uemUgU3dpcGUnOiAnM0RCQScsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gVE9ETzogRGVhZCBJcm9uIDVBQjAgKGVhcnRoc2hha2VycywgYnV0IG9ubHkgaWYgeW91IHRha2UgdHdvPylcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5EZWx1YnJ1bVJlZ2luYWUsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0RlbHVicnVtIFNlZWtlciBNZXJjeSBGb3VyZm9sZCc6ICc1QjM0JywgLy8gRm91ciBnbG93aW5nIHN3b3JkIGhhbGYgcm9vbSBjbGVhdmVzXHJcbiAgICAnRGVsdWJydW0gU2Vla2VyIEJhbGVmdWwgU3dhdGhlJzogJzVBQjQnLCAvLyBHcm91bmQgYW9lIHRvIGVpdGhlciBzaWRlIG9mIGJvc3NcclxuICAgICdEZWx1YnJ1bSBTZWVrZXIgQmFsZWZ1bCBCbGFkZSc6ICc1QjI4JywgLy8gSGlkZSBiZWhpbmQgcGlsbGFycyBhdHRhY2tcclxuICAgICdEZWx1YnJ1bSBTZWVrZXIgSXJvbiBTcGxpdHRlciBCbHVlIDEnOiAnNUFBNCcsIC8vIEJsdWUgcmluZyBleHBsb3Npb25cclxuICAgICdEZWx1YnJ1bSBTZWVrZXIgSXJvbiBTcGxpdHRlciBCbHVlIDInOiAnNUFBNScsIC8vIEJsdWUgcmluZyBleHBsb3Npb25cclxuICAgICdEZWx1YnJ1bSBTZWVrZXIgSXJvbiBTcGxpdHRlciBCbHVlIDMnOiAnNUFBNicsIC8vIEJsdWUgcmluZyBleHBsb3Npb25cclxuICAgICdEZWx1YnJ1bSBTZWVrZXIgSXJvbiBTcGxpdHRlciBXaGl0ZSAxJzogJzVBQTcnLCAvLyBXaGl0ZSByaW5nIGV4cGxvc2lvblxyXG4gICAgJ0RlbHVicnVtIFNlZWtlciBJcm9uIFNwbGl0dGVyIFdoaXRlIDInOiAnNUFBOCcsIC8vIFdoaXRlIHJpbmcgZXhwbG9zaW9uXHJcbiAgICAnRGVsdWJydW0gU2Vla2VyIElyb24gU3BsaXR0ZXIgV2hpdGUgMyc6ICc1QUE5JywgLy8gV2hpdGUgcmluZyBleHBsb3Npb25cclxuICAgICdEZWx1YnJ1bSBTZWVrZXIgU2NvcmNoaW5nIFNoYWNrbGUnOiAnNUFBRScsIC8vIENoYWluIGRhbWFnZVxyXG4gICAgJ0RlbHVicnVtIFNlZWtlciBNZXJjaWZ1bCBCcmVlemUnOiAnNUFBQicsIC8vIFdhZmZsZSBjcmlzcy1jcm9zcyBmbG9vciBtYXJrZXJzXHJcbiAgICAnRGVsdWJydW0gU2Vla2VyIE1lcmNpZnVsIEJsb29tcyc6ICc1QUFEJywgLy8gUHVycGxlIGdyb3dpbmcgY2lyY2xlXHJcbiAgICAnRGVsdWJydW0gRGFodSBSaWdodC1TaWRlZCBTaG9ja3dhdmUnOiAnNTc2MScsIC8vIFJpZ2h0IGNpcmN1bGFyIGNsZWF2ZVxyXG4gICAgJ0RlbHVicnVtIERhaHUgTGVmdC1TaWRlZCBTaG9ja3dhdmUnOiAnNTc2MicsIC8vIExlZnQgY2lyY3VsYXIgY2xlYXZlXHJcbiAgICAnRGVsdWJydW0gRGFodSBGaXJlYnJlYXRoZSc6ICc1NzY1JywgLy8gQ29uYWwgYnJlYXRoXHJcbiAgICAnRGVsdWJydW0gRGFodSBGaXJlYnJlYXRoZSBSb3RhdGluZyc6ICc1NzVBJywgLy8gQ29uYWwgYnJlYXRoLCByb3RhdGluZ1xyXG4gICAgJ0RlbHVicnVtIERhaHUgSGVhZCBEb3duJzogJzU3NTYnLCAvLyBsaW5lIGFvZSBjaGFyZ2UgZnJvbSBNYXJjaG9zaWFzIGFkZFxyXG4gICAgJ0RlbHVicnVtIERhaHUgSHVudGVyXFwncyBDbGF3JzogJzU3NTcnLCAvLyBjaXJjdWxhciBncm91bmQgYW9lIGNlbnRlcmVkIG9uIE1hcmNob3NpYXMgYWRkXHJcbiAgICAnRGVsdWJydW0gRGFodSBGYWxsaW5nIFJvY2snOiAnNTc1QycsIC8vIGdyb3VuZCBhb2UgZnJvbSBSZXZlcmJlcmF0aW5nIFJvYXJcclxuICAgICdEZWx1YnJ1bSBEYWh1IEhvdCBDaGFyZ2UnOiAnNTc2NCcsIC8vIGRvdWJsZSBjaGFyZ2VcclxuICAgICdEZWx1YnJ1bSBEYWh1IFJpcHBlciBDbGF3JzogJzU3NUQnLCAvLyBmcm9udGFsIGNsZWF2ZVxyXG4gICAgJ0RlbHVicnVtIERhaHUgVGFpbCBTd2luZyc6ICc1NzVGJywgLy8gdGFpbCBzd2luZyA7KVxyXG4gICAgJ0RlbHVicnVtIEd1YXJkIFBhd24gT2ZmJzogJzU4MDYnLCAvLyBRdWVlbidzIFNvbGRpZXIgU2VjcmV0cyBSZXZlYWxlZCB0ZXRoZXJlZCBjbG9uZSBhb2VcclxuICAgICdEZWx1YnJ1bSBHdWFyZCBUdXJyZXRcXCdzIFRvdXIgMSc6ICc1ODBEJywgLy8gUXVlZW4ncyBHdW5uZXIgcmVmbGVjdGl2ZSB0dXJyZXQgc2hvdFxyXG4gICAgJ0RlbHVicnVtIEd1YXJkIFR1cnJldFxcJ3MgVG91ciAyJzogJzU4MEUnLCAvLyBRdWVlbidzIEd1bm5lciByZWZsZWN0aXZlIHR1cnJldCBzaG90XHJcbiAgICAnRGVsdWJydW0gR3VhcmQgVHVycmV0XFwncyBUb3VyIDMnOiAnNTgwRicsIC8vIFF1ZWVuJ3MgR3VubmVyIHJlZmxlY3RpdmUgdHVycmV0IHNob3RcclxuICAgICdEZWx1YnJ1bSBHdWFyZCBPcHRpbWFsIFBsYXkgU2hpZWxkJzogJzU3RjMnLCAvLyBRdWVlbidzIEtuaWdodCBzaGllbGQgZ2V0IHVuZGVyXHJcbiAgICAnRGVsdWJydW0gR3VhcmQgT3B0aW1hbCBQbGF5IFN3b3JkJzogJzU3RjInLCAvLyBRdWVlbidzIEtuaWdodCBzd29yZCBnZXQgb3V0XHJcbiAgICAnRGVsdWJydW0gR3VhcmQgQ291bnRlcnBsYXknOiAnNTdGNicsIC8vIEhpdHRpbmcgYWV0aGVyaWFsIHdhcmQgZGlyZWN0aW9uYWwgYmFycmllclxyXG4gICAgJ0RlbHVicnVtIFBoYW50b20gU3dpcmxpbmcgTWlhc21hIDEnOiAnNTdBOScsIC8vIEluaXRpYWwgcGhhbnRvbSBkb251dCBhb2UgZnJvbSBjaXJjbGVcclxuICAgICdEZWx1YnJ1bSBQaGFudG9tIFN3aXJsaW5nIE1pYXNtYSAyJzogJzU3QUEnLCAvLyBNb3ZpbmcgcGhhbnRvbSBkb251dCBhb2VzIGZyb20gY2lyY2xlXHJcbiAgICAnRGVsdWJydW0gUGhhbnRvbSBDcmVlcGluZyBNaWFzbWEnOiAnNTdBNScsIC8vIHBoYW50b20gbGluZSBhb2UgZnJvbSBzcXVhcmVcclxuICAgICdEZWx1YnJ1bSBQaGFudG9tIFZpbGUgV2F2ZSc6ICc1N0IxJywgLy8gcGhhbnRvbSBjb25hbCBhb2VcclxuICAgICdEZWx1YnJ1bSBBdm93ZWQgRnVyeSBPZiBCb3pqYSc6ICc1OTczJywgLy8gVHJpbml0eSBBdm93ZWQgQWxsZWdpYW50IEFyc2VuYWwgXCJvdXRcIlxyXG4gICAgJ0RlbHVicnVtIEF2b3dlZCBGbGFzaHZhbmUnOiAnNTk3MicsIC8vIFRyaW5pdHkgQXZvd2VkIEFsbGVnaWFudCBBcnNlbmFsIFwiZ2V0IGJlaGluZFwiXHJcbiAgICAnRGVsdWJydW0gQXZvd2VkIEluZmVybmFsIFNsYXNoJzogJzU5NzEnLCAvLyBUcmluaXR5IEF2b3dlZCBBbGxlZ2lhbnQgQXJzZW5hbCBcImdldCBmcm9udFwiXHJcbiAgICAnRGVsdWJydW0gQXZvd2VkIEZsYW1lcyBPZiBCb3pqYSc6ICc1OTY4JywgLy8gODAlIGZsb29yIGFvZSBiZWZvcmUgc2hpbW1lcmluZyBzaG90IHN3b3Jkc1xyXG4gICAgJ0RlbHVicnVtIEF2b3dlZCBHbGVhbWluZyBBcnJvdyc6ICc1OTc0JywgLy8gVHJpbml0eSBBdmF0YXIgbGluZSBhb2VzIGZyb20gb3V0c2lkZVxyXG4gICAgJ0RlbHVicnVtIFF1ZWVuIFRoZSBNZWFucyAxJzogJzU5QkInLCAvLyBUaGUgUXVlZW4ncyBCZWNrIGFuZCBDYWxsIGNyb3NzIGFvZSBmcm9tIGFkZHNcclxuICAgICdEZWx1YnJ1bSBRdWVlbiBUaGUgTWVhbnMgMic6ICc1OUJEJywgLy8gVGhlIFF1ZWVuJ3MgQmVjayBhbmQgQ2FsbCBjcm9zcyBhb2UgZnJvbSBhZGRzXHJcbiAgICAnRGVsdWJydW0gUXVlZW4gVGhlIEVuZCAxJzogJzU5QkEnLCAvLyBBbHNvIFRoZSBRdWVlbidzIEJlY2sgYW5kIENhbGwgY3Jvc3MgYW9lIGZyb20gYWRkc1xyXG4gICAgJ0RlbHVicnVtIFF1ZWVuIFRoZSBFbmQgMic6ICc1OUJDJywgLy8gQWxzbyBUaGUgUXVlZW4ncyBCZWNrIGFuZCBDYWxsIGNyb3NzIGFvZSBmcm9tIGFkZHNcclxuICAgICdEZWx1YnJ1bSBRdWVlbiBOb3J0aHN3YWluXFwncyBHbG93JzogJzU5QzQnLCAvLyBleHBhbmRpbmcgbGluZXMgd2l0aCBleHBsb3Npb24gaW50ZXJzZWN0aW9uc1xyXG4gICAgJ0RlbHVicnVtIFF1ZWVuIEp1ZGdtZW50IEJsYWRlIExlZnQnOiAnNUI4MycsIC8vIGRhc2ggYWNyb3NzIHJvb20gd2l0aCBsZWZ0IGNsZWF2ZVxyXG4gICAgJ0RlbHVicnVtIFF1ZWVuIEp1ZGdtZW50IEJsYWRlIFJpZ2h0JzogJzVCODMnLCAvLyBkYXNoIGFjcm9zcyByb29tIHdpdGggcmlnaHQgY2xlYXZlXHJcbiAgICAnRGVsdWJydW0gUXVlZW4gUXVlZW5cXCdzIEp1c3RpY2UnOiAnNTlCRicsIC8vIGZhaWxpbmcgdG8gd2FsayB0aGUgcmlnaHQgbnVtYmVyIG9mIHNxdWFyZXNcclxuICAgICdEZWx1YnJ1bSBRdWVlbiBUdXJyZXRcXCdzIFRvdXIgMSc6ICc1OUUwJywgLy8gcmVmbGVjdGl2ZSB0dXJyZXQgc2hvdCBkdXJpbmcgUXVlZW5cclxuICAgICdEZWx1YnJ1bSBRdWVlbiBUdXJyZXRcXCdzIFRvdXIgMic6ICc1OUUxJywgLy8gcmVmbGVjdGl2ZSB0dXJyZXQgc2hvdCBkdXJpbmcgUXVlZW5cclxuICAgICdEZWx1YnJ1bSBRdWVlbiBUdXJyZXRcXCdzIFRvdXIgMyc6ICc1OUUyJywgLy8gcmVmbGVjdGl2ZSB0dXJyZXQgc2hvdCBkdXJpbmcgUXVlZW5cclxuICAgICdEZWx1YnJ1bSBRdWVlbiBQYXduIE9mZic6ICc1OURBJywgLy8gU2VjcmV0cyBSZXZlYWxlZCB0ZXRoZXJlZCBjbG9uZSBhb2UgZHVyaW5nIFF1ZWVuXHJcbiAgICAnRGVsdWJydW0gUXVlZW4gT3B0aW1hbCBQbGF5IFNoaWVsZCc6ICc1OUNFJywgLy8gUXVlZW4ncyBLbmlnaHQgc2hpZWxkIGdldCB1bmRlciBkdXJpbmcgUXVlZW5cclxuICAgICdEZWx1YnJ1bSBRdWVlbiBPcHRpbWFsIFBsYXkgU3dvcmQnOiAnNTlDQycsIC8vIFF1ZWVuJ3MgS25pZ2h0IHN3b3JkIGdldCBvdXQgZHVyaW5nIFF1ZWVuXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnRGVsdWJydW0gSGlkZGVuIFRyYXAgTWFzc2l2ZSBFeHBsb3Npb24nOiAnNUE2RScsIC8vIGV4cGxvc2lvbiB0cmFwXHJcbiAgICAnRGVsdWJydW0gSGlkZGVuIFRyYXAgUG9pc29uIFRyYXAnOiAnNUE2RicsIC8vIHBvaXNvbiB0cmFwXHJcbiAgICAnRGVsdWJydW0gQXZvd2VkIEhlYXQgU2hvY2snOiAnNTk1RScsIC8vIHRvbyBtdWNoIGhlYXQgb3IgZmFpbGluZyB0byByZWd1bGF0ZSB0ZW1wZXJhdHVyZVxyXG4gICAgJ0RlbHVicnVtIEF2b3dlZCBDb2xkIFNob2NrJzogJzU5NUYnLCAvLyB0b28gbXVjaCBjb2xkIG9yIGZhaWxpbmcgdG8gcmVndWxhdGUgdGVtcGVyYXR1cmVcclxuICB9LFxyXG4gIGdhaW5zRWZmZWN0V2Fybjoge1xyXG4gICAgJ0RlbHVicnVtIFNlZWtlciBNZXJjaWZ1bCBNb29uJzogJzI2MicsIC8vIFwiUGV0cmlmaWNhdGlvblwiIGZyb20gQWV0aGVyaWFsIE9yYiBsb29rYXdheVxyXG4gIH0sXHJcbiAgc2hhcmVGYWlsOiB7XHJcbiAgICAnRGVsdWJydW0gRGFodSBIZWF0IEJyZWF0aCc6ICc1NzY2JywgLy8gdGFuayBjbGVhdmVcclxuICAgICdEZWx1YnJ1bSBBdm93ZWQgV3JhdGggT2YgQm96amEnOiAnNTk3NScsIC8vIHRhbmsgY2xlYXZlXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICAvLyBBdCBsZWFzdCBkdXJpbmcgVGhlIFF1ZWVuLCB0aGVzZSBhYmlsaXR5IGlkcyBjYW4gYmUgb3JkZXJlZCBkaWZmZXJlbnRseSxcclxuICAgICAgLy8gYW5kIHRoZSBmaXJzdCBleHBsb3Npb24gXCJoaXRzXCIgZXZlcnlvbmUsIGFsdGhvdWdoIHdpdGggXCIxQlwiIGZsYWdzLlxyXG4gICAgICBpZDogJ0RlbHVicnVtIExvdHMgQ2FzdCcsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogWyc1NjVBJywgJzU2NUInLCAnNTdGRCcsICc1N0ZFJywgJzVCODYnLCAnNUI4NycsICc1OUQyJywgJzVEOTMnXSwgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBjb25kaXRpb246IChfZGF0YSwgbWF0Y2hlcykgPT4gbWF0Y2hlcy5mbGFncy5zbGljZSgtMikgPT09ICcwMycsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gVE9ETzogRGFodSA1Nzc2IFNwaXQgRmxhbWUgc2hvdWxkIGFsd2F5cyBoaXQgYSBNYXJjaG9zaWFzXHJcbi8vIFRPRE86IGhpdHRpbmcgcGhhbnRvbSB3aXRoIGljZSBzcGlrZXMgd2l0aCBhbnl0aGluZyBidXQgZGlzcGVsP1xyXG4vLyBUT0RPOiBmYWlsaW5nIGljeS9maWVyeSBwb3J0ZW50IChndWFyZCBhbmQgcXVlZW4pXHJcbi8vICAgICAgIGAxODpQeXJldGljIERvVCBUaWNrIG9uICR7bmFtZX0gZm9yICR7ZGFtYWdlfSBkYW1hZ2UuYFxyXG4vLyBUT0RPOiBXaW5kcyBPZiBGYXRlIC8gV2VpZ2h0IE9mIEZvcnR1bmU/XHJcbi8vIFRPRE86IFR1cnJldCdzIFRvdXI/XHJcbi8vIGdlbmVyYWwgdHJhcHM6IGV4cGxvc2lvbjogNUE3MSwgcG9pc29uIHRyYXA6IDVBNzIsIG1pbmk6IDVBNzNcclxuLy8gZHVlbCB0cmFwczogbWluaTogNTdBMSwgaWNlOiA1NzlGLCB0b2FkOiA1N0EwXHJcbi8vIFRPRE86IHRha2luZyBtYW5hIGZsYW1lIHdpdGhvdXQgcmVmbGVjdFxyXG4vLyBUT0RPOiB0YWtpbmcgTWFlbHN0cm9tJ3MgQm9sdCB3aXRob3V0IGxpZ2h0bmluZyBidWZmXHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRGVsdWJydW1SZWdpbmFlU2F2YWdlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdEZWx1YnJ1bVNhdiBTZWVrZXIgU2xpbWVzIEhlbGxpc2ggU2xhc2gnOiAnNTdFQScsIC8vIEJvemphbiBTb2xkaWVyIGNsZWF2ZVxyXG4gICAgJ0RlbHVicnVtU2F2IFNlZWtlciBTbGltZXMgVmlzY291cyBSdXB0dXJlJzogJzUwMTYnLCAvLyBGdWxseSBtZXJnZWQgdmlzY291cyBzbGltZSBhb2VcclxuXHJcbiAgICAnRGVsdWJydW1TYXYgU2Vla2VyIEdvbGVtcyBEZW1vbGlzaCc6ICc1ODgwJywgLy8gaW50ZXJydXB0aWJsZSBSdWlucyBHb2xlbSBjYXN0XHJcblxyXG4gICAgJ0RlbHVicnVtU2F2IFNlZWtlciBCYWxlZnVsIFN3YXRoZSc6ICc1QUQxJywgLy8gR3JvdW5kIGFvZSB0byBlaXRoZXIgc2lkZSBvZiBib3NzXHJcbiAgICAnRGVsdWJydW1TYXYgU2Vla2VyIEJhbGVmdWwgQmxhZGUnOiAnNUIyQScsIC8vIEhpZGUgYmVoaW5kIHBpbGxhcnMgYXR0YWNrXHJcbiAgICAnRGVsdWJydW1TYXYgU2Vla2VyIFNjb3JjaGluZyBTaGFja2xlJzogJzVBQ0InLCAvLyBDaGFpbnNcclxuICAgICdEZWx1YnJ1bVNhdiBTZWVrZXIgTWVyY3kgRm91cmZvbGQgMSc6ICc1Qjk0JywgLy8gRm91ciBnbG93aW5nIHN3b3JkIGhhbGYgcm9vbSBjbGVhdmVzXHJcbiAgICAnRGVsdWJydW1TYXYgU2Vla2VyIE1lcmN5IEZvdXJmb2xkIDInOiAnNUFCOScsIC8vIEZvdXIgZ2xvd2luZyBzd29yZCBoYWxmIHJvb20gY2xlYXZlc1xyXG4gICAgJ0RlbHVicnVtU2F2IFNlZWtlciBNZXJjeSBGb3VyZm9sZCAzJzogJzVBQkEnLCAvLyBGb3VyIGdsb3dpbmcgc3dvcmQgaGFsZiByb29tIGNsZWF2ZXNcclxuICAgICdEZWx1YnJ1bVNhdiBTZWVrZXIgTWVyY3kgRm91cmZvbGQgNCc6ICc1QUJCJywgLy8gRm91ciBnbG93aW5nIHN3b3JkIGhhbGYgcm9vbSBjbGVhdmVzXHJcbiAgICAnRGVsdWJydW1TYXYgU2Vla2VyIE1lcmN5IEZvdXJmb2xkIDUnOiAnNUFCQycsIC8vIEZvdXIgZ2xvd2luZyBzd29yZCBoYWxmIHJvb20gY2xlYXZlc1xyXG4gICAgJ0RlbHVicnVtU2F2IFNlZWtlciBNZXJjaWZ1bCBCcmVlemUnOiAnNUFDOCcsIC8vIFdhZmZsZSBjcmlzcy1jcm9zcyBmbG9vciBtYXJrZXJzXHJcbiAgICAnRGVsdWJydW1TYXYgU2Vla2VyIEJhbGVmdWwgQ29tZXQnOiAnNUFENycsIC8vIENsb25lIG1ldGVvciBkcm9wcGluZyBiZWZvcmUgY2hhcmdlc1xyXG4gICAgJ0RlbHVicnVtU2F2IFNlZWtlciBCYWxlZnVsIEZpcmVzdG9ybSc6ICc1QUQ4JywgLy8gQ2xvbmUgY2hhcmdlIGFmdGVyIEJhbGVmdWwgQ29tZXRcclxuICAgICdEZWx1YnJ1bVNhdiBTZWVrZXIgSXJvbiBSb3NlJzogJzVBRDknLCAvLyBDbG9uZSBsaW5lIGFvZXNcclxuICAgICdEZWx1YnJ1bVNhdiBTZWVrZXIgSXJvbiBTcGxpdHRlciBCbHVlIDEnOiAnNUFDMScsIC8vIEJsdWUgcmluIGcgZXhwbG9zaW9uXHJcbiAgICAnRGVsdWJydW1TYXYgU2Vla2VyIElyb24gU3BsaXR0ZXIgQmx1ZSAyJzogJzVBQzInLCAvLyBCbHVlIHJpbmcgZXhwbG9zaW9uXHJcbiAgICAnRGVsdWJydW1TYXYgU2Vla2VyIElyb24gU3BsaXR0ZXIgQmx1ZSAzJzogJzVBQzMnLCAvLyBCbHVlIHJpbmcgZXhwbG9zaW9uXHJcbiAgICAnRGVsdWJydW1TYXYgU2Vla2VyIElyb24gU3BsaXR0ZXIgV2hpdGUgMSc6ICc1QUM0JywgLy8gV2hpdGUgcmluZyBleHBsb3Npb25cclxuICAgICdEZWx1YnJ1bVNhdiBTZWVrZXIgSXJvbiBTcGxpdHRlciBXaGl0ZSAyJzogJzVBQzUnLCAvLyBXaGl0ZSByaW5nIGV4cGxvc2lvblxyXG4gICAgJ0RlbHVicnVtU2F2IFNlZWtlciBJcm9uIFNwbGl0dGVyIFdoaXRlIDMnOiAnNUFDNicsIC8vIFdoaXRlIHJpbmcgZXhwbG9zaW9uXHJcbiAgICAnRGVsdWJydW1TYXYgU2Vla2VyIEFjdCBPZiBNZXJjeSc6ICc1QUNGJywgLy8gY3Jvc3Mtc2hhcGVkIGxpbmUgYW9lc1xyXG5cclxuICAgICdEZWx1YnJ1bVNhdiBEYWh1IFJpZ2h0LVNpZGVkIFNob2Nrd2F2ZSAxJzogJzU3NzAnLCAvLyBSaWdodCBjaXJjdWxhciBjbGVhdmVcclxuICAgICdEZWx1YnJ1bVNhdiBEYWh1IFJpZ2h0LVNpZGVkIFNob2Nrd2F2ZSAyJzogJzU3NzInLCAvLyBSaWdodCBjaXJjdWxhciBjbGVhdmVcclxuICAgICdEZWx1YnJ1bVNhdiBEYWh1IExlZnQtU2lkZWQgU2hvY2t3YXZlIDEnOiAnNTc2RicsIC8vIExlZnQgY2lyY3VsYXIgY2xlYXZlXHJcbiAgICAnRGVsdWJydW1TYXYgRGFodSBMZWZ0LVNpZGVkIFNob2Nrd2F2ZSAyJzogJzU3NzEnLCAvLyBMZWZ0IGNpcmN1bGFyIGNsZWF2ZVxyXG4gICAgJ0RlbHVicnVtU2F2IERhaHUgRmlyZWJyZWF0aGUnOiAnNTc3NCcsIC8vIENvbmFsIGJyZWF0aFxyXG4gICAgJ0RlbHVicnVtU2F2IERhaHUgRmlyZWJyZWF0aGUgUm90YXRpbmcnOiAnNTc2QycsIC8vIENvbmFsIGJyZWF0aCwgcm90YXRpbmdcclxuICAgICdEZWx1YnJ1bVNhdiBEYWh1IEhlYWQgRG93bic6ICc1NzY4JywgLy8gbGluZSBhb2UgY2hhcmdlIGZyb20gTWFyY2hvc2lhcyBhZGRcclxuICAgICdEZWx1YnJ1bVNhdiBEYWh1IEh1bnRlclxcJ3MgQ2xhdyc6ICc1NzY5JywgLy8gY2lyY3VsYXIgZ3JvdW5kIGFvZSBjZW50ZXJlZCBvbiBNYXJjaG9zaWFzIGFkZFxyXG4gICAgJ0RlbHVicnVtU2F2IERhaHUgRmFsbGluZyBSb2NrJzogJzU3NkUnLCAvLyBncm91bmQgYW9lIGZyb20gUmV2ZXJiZXJhdGluZyBSb2FyXHJcbiAgICAnRGVsdWJydW1TYXYgRGFodSBIb3QgQ2hhcmdlJzogJzU3NzMnLCAvLyBkb3VibGUgY2hhcmdlXHJcblxyXG4gICAgJ0RlbHVicnVtU2F2IER1ZWwgTWFzc2l2ZSBFeHBsb3Npb24nOiAnNTc5RScsIC8vIGJvbWJzIGJlaW5nIGNsZWFyZWRcclxuICAgICdEZWx1YnJ1bVNhdiBEdWVsIFZpY2lvdXMgU3dpcGUnOiAnNTc5NycsIC8vIGNpcmN1bGFyIGFvZSBhcm91bmQgYm9zc1xyXG4gICAgJ0RlbHVicnVtU2F2IER1ZWwgRm9jdXNlZCBUcmVtb3IgMSc6ICc1NzhGJywgLy8gc3F1YXJlIGZsb29yIGFvZXNcclxuICAgICdEZWx1YnJ1bVNhdiBEdWVsIEZvY3VzZWQgVHJlbW9yIDInOiAnNTc5MScsIC8vIHNxdWFyZSBmbG9vciBhb2VzXHJcbiAgICAnRGVsdWJydW1TYXYgRHVlbCBEZXZvdXInOiAnNTc4OScsIC8vIGNvbmFsIGFvZSBhZnRlciB3aXRoZXJpbmcgY3Vyc2VcclxuICAgICdEZWx1YnJ1bVNhdiBEdWVsIEZsYWlsaW5nIFN0cmlrZSAxJzogJzU3OEMnLCAvLyBpbml0aWFsIHJvdGF0aW5nIGNsZWF2ZVxyXG4gICAgJ0RlbHVicnVtU2F2IER1ZWwgRmxhaWxpbmcgU3RyaWtlIDInOiAnNTc4RCcsIC8vIHJvdGF0aW5nIGNsZWF2ZXNcclxuXHJcbiAgICAnRGVsdWJydW1TYXYgR3VhcmQgT3B0aW1hbCBPZmZlbnNpdmUgU3dvcmQnOiAnNTgxOScsIC8vIG1pZGRsZSBleHBsb3Npb25cclxuICAgICdEZWx1YnJ1bVNhdiBHdWFyZCBPcHRpbWFsIE9mZmVuc2l2ZSBTaGllbGQnOiAnNTgxQScsIC8vIG1pZGRsZSBleHBsb3Npb25cclxuICAgICdEZWx1YnJ1bVNhdiBHdWFyZCBPcHRpbWFsIFBsYXkgU3dvcmQnOiAnNTgxNicsIC8vIE9wdGltYWwgUGxheSBTd29yZCBcImdldCBvdXRcIlxyXG4gICAgJ0RlbHVicnVtU2F2IEd1YXJkIE9wdGltYWwgUGxheSBTaGllbGQnOiAnNTgxNycsIC8vIE9wdGltYWwgcGxheSBzaGllbGQgXCJnZXQgaW5cIlxyXG4gICAgJ0RlbHVicnVtU2F2IEd1YXJkIE9wdGltYWwgUGxheSBDbGVhdmUnOiAnNTgxOCcsIC8vIE9wdGltYWwgUGxheSBjbGVhdmVzIGZvciBzd29yZC9zaGllbGRcclxuICAgICdEZWx1YnJ1bVNhdiBHdWFyZCBVbmx1Y2t5IExvdCc6ICc1ODFEJywgLy8gUXVlZW4ncyBLbmlnaHQgb3JiIGV4cGxvc2lvblxyXG4gICAgJ0RlbHVicnVtU2F2IEd1YXJkIEJ1cm4gMSc6ICc1ODNEJywgLy8gc21hbGwgZmlyZSBhZGRzXHJcbiAgICAnRGVsdWJydW1TYXYgR3VhcmQgQnVybiAyJzogJzU4M0UnLCAvLyBsYXJnZSBmaXJlIGFkZHNcclxuICAgICdEZWx1YnJ1bVNhdiBHdWFyZCBQYXduIE9mZic6ICc1ODNBJywgLy8gUXVlZW4ncyBTb2xkaWVyIFNlY3JldHMgUmV2ZWFsZWQgdGV0aGVyZWQgY2xvbmUgYW9lXHJcbiAgICAnRGVsdWJydW1TYXYgR3VhcmQgVHVycmV0XFwncyBUb3VyIE5vcm1hbCAxJzogJzU4NDcnLCAvLyBcIm5vcm1hbCBtb2RlXCIgdHVycmV0cywgaW5pdGlhbCBsaW5lcyAxXHJcbiAgICAnRGVsdWJydW1TYXYgR3VhcmQgVHVycmV0XFwncyBUb3VyIE5vcm1hbCAyJzogJzU4NDgnLCAvLyBcIm5vcm1hbCBtb2RlXCIgdHVycmV0cywgaW5pdGlhbCBsaW5lcyAyXHJcbiAgICAnRGVsdWJydW1TYXYgR3VhcmQgVHVycmV0XFwncyBUb3VyIE5vcm1hbCAzJzogJzU4NDknLCAvLyBcIm5vcm1hbCBtb2RlXCIgdHVycmV0cywgc2Vjb25kIGxpbmVzXHJcbiAgICAnRGVsdWJydW1TYXYgR3VhcmQgQ291bnRlcnBsYXknOiAnNThGNScsIC8vIEhpdHRpbmcgYWV0aGVyaWFsIHdhcmQgZGlyZWN0aW9uYWwgYmFycmllclxyXG5cclxuICAgICdEZWx1YnJ1bVNhdiBQaGFudG9tIFN3aXJsaW5nIE1pYXNtYSAxJzogJzU3QjgnLCAvLyBJbml0aWFsIHBoYW50b20gZG9udXQgYW9lXHJcbiAgICAnRGVsdWJydW1TYXYgUGhhbnRvbSBTd2lybGluZyBNaWFzbWEgMic6ICc1N0I5JywgLy8gTW92aW5nIHBoYW50b20gZG9udXQgYW9lc1xyXG4gICAgJ0RlbHVicnVtU2F2IFBoYW50b20gQ3JlZXBpbmcgTWlhc21hIDEnOiAnNTdCNCcsIC8vIEluaXRpYWwgcGhhbnRvbSBsaW5lIGFvZVxyXG4gICAgJ0RlbHVicnVtU2F2IFBoYW50b20gQ3JlZXBpbmcgTWlhc21hIDInOiAnNTdCNScsIC8vIExhdGVyIHBoYW50b20gbGluZSBhb2VcclxuICAgICdEZWx1YnJ1bVNhdiBQaGFudG9tIExpbmdlcmluZyBNaWFzbWEgMSc6ICc1N0I2JywgLy8gSW5pdGlhbCBwaGFudG9tIGNpcmNsZSBhb2VcclxuICAgICdEZWx1YnJ1bVNhdiBQaGFudG9tIExpbmdlcmluZyBNaWFzbWEgMic6ICc1N0I3JywgLy8gTW92aW5nIHBoYW50b20gY2lyY2xlIGFvZVxyXG4gICAgJ0RlbHVicnVtU2F2IFBoYW50b20gVmlsZSBXYXZlJzogJzU3QkYnLCAvLyBwaGFudG9tIGNvbmFsIGFvZVxyXG5cclxuICAgICdEZWx1YnJ1bVNhdiBBdm93ZWQgRnVyeSBPZiBCb3pqYSc6ICc1OTRDJywgLy8gVHJpbml0eSBBdm93ZWQgQWxsZWdpYW50IEFyc2VuYWwgXCJvdXRcIlxyXG4gICAgJ0RlbHVicnVtU2F2IEF2b3dlZCBGbGFzaHZhbmUnOiAnNTk0QicsIC8vIFRyaW5pdHkgQXZvd2VkIEFsbGVnaWFudCBBcnNlbmFsIFwiZ2V0IGJlaGluZFwiXHJcbiAgICAnRGVsdWJydW1TYXYgQXZvd2VkIEluZmVybmFsIFNsYXNoJzogJzU5NEEnLCAvLyBUcmluaXR5IEF2b3dlZCBBbGxlZ2lhbnQgQXJzZW5hbCBcImdldCBmcm9udFwiXHJcbiAgICAnRGVsdWJydW1TYXYgQXZvd2VkIEZsYW1lcyBPZiBCb3pqYSc6ICc1OTM5JywgLy8gODAlIGZsb29yIGFvZSBiZWZvcmUgc2hpbW1lcmluZyBzaG90IHN3b3Jkc1xyXG4gICAgJ0RlbHVicnVtU2F2IEF2b3dlZCBHbGVhbWluZyBBcnJvdyc6ICc1OTREJywgLy8gVHJpbml0eSBBdmF0YXIgbGluZSBhb2VzIGZyb20gb3V0c2lkZVxyXG5cclxuICAgICdEZWx1YnJ1bVNhdiBMb3JkIFdoYWNrJzogJzU3RDAnLCAvLyBjbGVhdmVcclxuICAgICdEZWx1YnJ1bVNhdiBMb3JkIERldmFzdGF0aW5nIEJvbHQgMSc6ICc1N0M1JywgLy8gbGlnaHRuaW5nIHJpbmdzXHJcbiAgICAnRGVsdWJydW1TYXYgTG9yZCBEZXZhc3RhdGluZyBCb2x0IDInOiAnNTdDNicsIC8vIGxpZ2h0bmluZyByaW5nc1xyXG4gICAgJ0RlbHVicnVtU2F2IExvcmQgRWxlY3Ryb2N1dGlvbic6ICc1N0NDJywgLy8gcmFuZG9tIGNpcmNsZSBhb2VzXHJcbiAgICAnRGVsdWJydW1TYXYgTG9yZCBSYXBpZCBCb2x0cyc6ICc1N0MzJywgLy8gZHJvcHBlZCBsaWdodG5pbmcgYW9lc1xyXG4gICAgJ0RlbHVicnVtU2F2IExvcmQgMTExMS1Ub256ZSBTd2luZyc6ICc1N0Q4JywgLy8gdmVyeSBsYXJnZSBcImdldCBvdXRcIiBzd2luZ1xyXG4gICAgJ0RlbHVicnVtU2F2IExvcmQgTW9uayBBdHRhY2snOiAnNTVBNicsIC8vIE1vbmsgYWRkIGF1dG8tYXR0YWNrXHJcblxyXG4gICAgJ0RlbHVicnVtU2F2IFF1ZWVuIE5vcnRoc3dhaW5cXCdzIEdsb3cnOiAnNTlGNCcsIC8vIGV4cGFuZGluZyBsaW5lcyB3aXRoIGV4cGxvc2lvbiBpbnRlcnNlY3Rpb25zXHJcbiAgICAnRGVsdWJydW1TYXYgUXVlZW4gVGhlIE1lYW5zIDEnOiAnNTlFNycsIC8vIFRoZSBRdWVlbidzIEJlY2sgYW5kIENhbGwgY3Jvc3MgYW9lIGZyb20gYWRkc1xyXG4gICAgJ0RlbHVicnVtU2F2IFF1ZWVuIFRoZSBNZWFucyAyJzogJzU5RUEnLCAvLyBUaGUgUXVlZW4ncyBCZWNrIGFuZCBDYWxsIGNyb3NzIGFvZSBmcm9tIGFkZHNcclxuICAgICdEZWx1YnJ1bVNhdiBRdWVlbiBUaGUgRW5kIDEnOiAnNTlFOCcsIC8vIEFsc28gVGhlIFF1ZWVuJ3MgQmVjayBhbmQgQ2FsbCBjcm9zcyBhb2UgZnJvbSBhZGRzXHJcbiAgICAnRGVsdWJydW1TYXYgUXVlZW4gVGhlIEVuZCAyJzogJzU5RTknLCAvLyBBbHNvIFRoZSBRdWVlbidzIEJlY2sgYW5kIENhbGwgY3Jvc3MgYW9lIGZyb20gYWRkc1xyXG4gICAgJ0RlbHVicnVtU2F2IFF1ZWVuIE9wdGltYWwgT2ZmZW5zaXZlIFN3b3JkJzogJzVBMDInLCAvLyBtaWRkbGUgZXhwbG9zaW9uXHJcbiAgICAnRGVsdWJydW1TYXYgUXVlZW4gT3B0aW1hbCBPZmZlbnNpdmUgU2hpZWxkJzogJzVBMDMnLCAvLyBtaWRkbGUgZXhwbG9zaW9uXHJcbiAgICAnRGVsdWJydW1TYXYgUXVlZW4gSnVkZ21lbnQgQmxhZGUgTGVmdCAxJzogJzU5RjInLCAvLyBkYXNoIGFjcm9zcyByb29tIHdpdGggbGVmdCBjbGVhdmVcclxuICAgICdEZWx1YnJ1bVNhdiBRdWVlbiBKdWRnbWVudCBCbGFkZSBMZWZ0IDInOiAnNUI4NScsIC8vIGRhc2ggYWNyb3NzIHJvb20gd2l0aCBsZWZ0IGNsZWF2ZVxyXG4gICAgJ0RlbHVicnVtU2F2IFF1ZWVuIEp1ZGdtZW50IEJsYWRlIFJpZ2h0IDEnOiAnNTlGMScsIC8vIGRhc2ggYWNyb3NzIHJvb20gd2l0aCByaWdodCBjbGVhdmVcclxuICAgICdEZWx1YnJ1bVNhdiBRdWVlbiBKdWRnbWVudCBCbGFkZSBSaWdodCAyJzogJzVCODQnLCAvLyBkYXNoIGFjcm9zcyByb29tIHdpdGggcmlnaHQgY2xlYXZlXHJcbiAgICAnRGVsdWJydW1TYXYgUXVlZW4gUGF3biBPZmYnOiAnNUExRCcsIC8vIFF1ZWVuJ3MgU29sZGllciBTZWNyZXRzIFJldmVhbGVkIHRldGhlcmVkIGNsb25lIGFvZVxyXG4gICAgJ0RlbHVicnVtU2F2IFF1ZWVuIE9wdGltYWwgUGxheSBTd29yZCc6ICc1OUZGJywgLy8gT3B0aW1hbCBQbGF5IFN3b3JkIFwiZ2V0IG91dFwiXHJcbiAgICAnRGVsdWJydW1TYXYgUXVlZW4gT3B0aW1hbCBQbGF5IFNoaWVsZCc6ICc1QTAwJywgLy8gT3B0aW1hbCBwbGF5IHNoaWVsZCBcImdldCBpblwiXHJcbiAgICAnRGVsdWJydW1TYXYgUXVlZW4gT3B0aW1hbCBQbGF5IENsZWF2ZSc6ICc1QTAxJywgLy8gT3B0aW1hbCBQbGF5IGNsZWF2ZXMgZm9yIHN3b3JkL3NoaWVsZFxyXG4gICAgJ0RlbHVicnVtU2F2IFF1ZWVuIFR1cnJldFxcJ3MgVG91ciBOb3JtYWwgMSc6ICc1QTI4JywgLy8gXCJub3JtYWwgbW9kZVwiIHR1cnJldHMsIGluaXRpYWwgbGluZXMgMVxyXG4gICAgJ0RlbHVicnVtU2F2IFF1ZWVuIFR1cnJldFxcJ3MgVG91ciBOb3JtYWwgMic6ICc1QTJBJywgLy8gXCJub3JtYWwgbW9kZVwiIHR1cnJldHMsIGluaXRpYWwgbGluZXMgMlxyXG4gICAgJ0RlbHVicnVtU2F2IFF1ZWVuIFR1cnJldFxcJ3MgVG91ciBOb3JtYWwgMyc6ICc1QTI5JywgLy8gXCJub3JtYWwgbW9kZVwiIHR1cnJldHMsIHNlY29uZCBsaW5lc1xyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ0RlbHVicnVtU2F2IEF2b3dlZCBIZWF0IFNob2NrJzogJzU5MjcnLCAvLyB0b28gbXVjaCBoZWF0IG9yIGZhaWxpbmcgdG8gcmVndWxhdGUgdGVtcGVyYXR1cmVcclxuICAgICdEZWx1YnJ1bVNhdiBBdm93ZWQgQ29sZCBTaG9jayc6ICc1OTI4JywgLy8gdG9vIG11Y2ggY29sZCBvciBmYWlsaW5nIHRvIHJlZ3VsYXRlIHRlbXBlcmF0dXJlXHJcbiAgICAnRGVsdWJydW1TYXYgUXVlZW4gUXVlZW5cXCdzIEp1c3RpY2UnOiAnNTlFQicsIC8vIGZhaWxpbmcgdG8gd2FsayB0aGUgcmlnaHQgbnVtYmVyIG9mIHNxdWFyZXNcclxuICAgICdEZWx1YnJ1bVNhdiBRdWVlbiBHdW5uaGlsZHJcXCdzIEJsYWRlcyc6ICc1QjIyJywgLy8gbm90IGJlaW5nIGluIHRoZSBjaGVzcyBibHVlIHNhZmUgc3F1YXJlXHJcbiAgICAnRGVsdWJydW1TYXYgUXVlZW4gVW5sdWNreSBMb3QnOiAnNTVCNicsIC8vIGxpZ2h0bmluZyBvcmIgYXR0YWNrXHJcbiAgfSxcclxuICBnYWluc0VmZmVjdFdhcm46IHtcclxuICAgICdEZWx1YnJ1bVNhdiBTZWVrZXIgTWVyY2lmdWwgTW9vbic6ICcyNjInLCAvLyBcIlBldHJpZmljYXRpb25cIiBmcm9tIEFldGhlcmlhbCBPcmIgbG9va2F3YXlcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0RlbHVicnVtU2F2IFNlZWtlciBQaGFudG9tIEJhbGVmdWwgT25zbGF1Z2h0JzogJzVBRDYnLCAvLyBzb2xvIHRhbmsgY2xlYXZlXHJcbiAgICAnRGVsdWJydW1TYXYgTG9yZCBGb2UgU3BsaXR0ZXInOiAnNTdENycsIC8vIHRhbmsgY2xlYXZlXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICAvLyBUaGVzZSBhYmlsaXR5IGlkcyBjYW4gYmUgb3JkZXJlZCBkaWZmZXJlbnRseSBhbmQgXCJoaXRcIiBwZW9wbGUgd2hlbiBsZXZpdGF0aW5nLlxyXG4gICAgICBpZDogJ0RlbHVicnVtU2F2IEd1YXJkIExvdHMgQ2FzdCcsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogWyc1ODI3JywgJzU4MjgnLCAnNUI2QycsICc1QjZEJywgJzVCQjYnLCAnNUJCNycsICc1Qjg4JywgJzVCODknXSwgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBjb25kaXRpb246IChfZGF0YSwgbWF0Y2hlcykgPT4gbWF0Y2hlcy5mbGFncy5zbGljZSgtMikgPT09ICcwMycsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRGVsdWJydW1TYXYgR29sZW0gQ29tcGFjdGlvbicsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnNTc0NicgfSksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgdGV4dDogYCR7bWF0Y2hlcy5zb3VyY2V9OiAke21hdGNoZXMuYWJpbGl0eX1gIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0RlbHVicnVtU2F2IFNsaW1lIFNhbmd1aW5lIEZ1c2lvbicsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnNTU0RCcgfSksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgdGV4dDogYCR7bWF0Y2hlcy5zb3VyY2V9OiAke21hdGNoZXMuYWJpbGl0eX1gIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRWRlbnNHYXRlUmVzdXJyZWN0aW9uLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdFMU4gRWRlblxcJ3MgVGh1bmRlciBJSUknOiAnNDRFRCcsXHJcbiAgICAnRTFOIEVkZW5cXCdzIEJsaXp6YXJkIElJSSc6ICc0NEVDJyxcclxuICAgICdFMU4gUHVyZSBCZWFtJzogJzNEOUUnLFxyXG4gICAgJ0UxTiBQYXJhZGlzZSBMb3N0JzogJzNEQTAnLFxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ0UxTiBFZGVuXFwncyBGbGFyZSc6ICczRDk3JyxcclxuICAgICdFMU4gUHVyZSBMaWdodCc6ICczREEzJyxcclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgJ0UxTiBGaXJlIElJSSc6ICc0NEVCJyxcclxuICAgICdFMU4gVmljZSBPZiBWYW5pdHknOiAnNDRFNycsIC8vIHRhbmsgbGFzZXJzXHJcbiAgICAnRTFOIFZpY2UgT2YgQXBhdGh5JzogJzQ0RTgnLCAvLyBkcHMgcHVkZGxlc1xyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBUT0RPOiBmYWlsaW5nIHRvIGludGVycnVwdCBNYW5hIEJvb3N0ICgzRDhEKVxyXG4vLyBUT0RPOiBmYWlsaW5nIHRvIHBhc3MgaGVhbGVyIGRlYnVmZj9cclxuLy8gVE9ETzogd2hhdCBoYXBwZW5zIGlmIHlvdSBkb24ndCBraWxsIGEgbWV0ZW9yIGR1cmluZyBmb3VyIG9yYnM/XHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5FZGVuc0dhdGVSZXN1cnJlY3Rpb25TYXZhZ2UsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0UxUyBFZGVuXFwncyBUaHVuZGVyIElJSSc6ICc0NEY3JyxcclxuICAgICdFMVMgRWRlblxcJ3MgQmxpenphcmQgSUlJJzogJzQ0RjYnLFxyXG4gICAgJ0UxUyBFZGVuXFwncyBSZWdhaW5lZCBCbGl6emFyZCBJSUknOiAnNDRGQScsXHJcbiAgICAnRTFTIFB1cmUgQmVhbSBUcmlkZW50IDEnOiAnM0Q4MycsXHJcbiAgICAnRTFTIFB1cmUgQmVhbSBUcmlkZW50IDInOiAnM0Q4NCcsXHJcbiAgICAnRTFTIFBhcmFkaXNlIExvc3QnOiAnM0Q4NycsXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnRTFTIEVkZW5cXCdzIEZsYXJlJzogJzNENzMnLFxyXG4gICAgJ0UxUyBQdXJlIExpZ2h0JzogJzNEOEEnLFxyXG4gIH0sXHJcbiAgc2hhcmVGYWlsOiB7XHJcbiAgICAnRTFTIEZpcmUvVGh1bmRlciBJSUknOiAnNDRGQicsXHJcbiAgICAnRTFTIFB1cmUgQmVhbSBTaW5nbGUnOiAnM0Q4MScsXHJcbiAgICAnRTFTIFZpY2UgT2YgVmFuaXR5JzogJzQ0RjEnLCAvLyB0YW5rIGxhc2Vyc1xyXG4gICAgJ0UxUyBWaWNlIG9mIEFwYXRoeSc6ICc0NEYyJywgLy8gZHBzIHB1ZGRsZXNcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuaW1wb3J0IHsgcGxheWVyRGFtYWdlRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vb29wc3lfY29tbW9uJztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBUT0RPOiBzaGFkb3dleWUgZmFpbHVyZSAodG9wIGxpbmUgZmFpbCwgYm90dG9tIGxpbmUgc3VjY2VzcywgZWZmZWN0IHRoZXJlIHRvbylcclxuLy8gWzE2OjE3OjM1Ljk2Nl0gMTY6NDAwMTEwRkU6Vm9pZHdhbGtlcjo0MEI3OlNoYWRvd2V5ZToxMDYxMjM0NTpUaW5pIFBvdXRpbmk6RjoxMDAwMDoxMDAxOTBGOlxyXG4vLyBbMTY6MTc6MzUuOTY2XSAxNjo0MDAxMTBGRTpWb2lkd2Fsa2VyOjQwQjc6U2hhZG93ZXllOjEwNjc4OTBBOlBvdGF0byBDaGlwcHk6MTowOjFDOjgwMDA6XHJcbi8vIGdhaW5zIHRoZSBlZmZlY3Qgb2YgUGV0cmlmaWNhdGlvbiBmcm9tIFZvaWR3YWxrZXIgZm9yIDEwLjAwIFNlY29uZHMuXHJcbi8vIFRPRE86IHB1ZGRsZSBmYWlsdXJlP1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkVkZW5zR2F0ZURlc2NlbnQsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0UyTiBEb29tdm9pZCBTbGljZXInOiAnM0UzQycsXHJcbiAgICAnRTJOIERvb212b2lkIEd1aWxsb3RpbmUnOiAnM0UzQicsXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ0UyTiBOeXgnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICczRTNEJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ3dhcm4nLFxyXG4gICAgICAgICAgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ0Jvb3BlZCcsXHJcbiAgICAgICAgICAgIGRlOiAnTnl4IGJlcsO8aHJ0JyxcclxuICAgICAgICAgICAgZnI6ICdNYWx1cyBkZSBkw6lnw6J0cycsXHJcbiAgICAgICAgICAgIGphOiBtYXRjaGVzLmFiaWxpdHksIC8vIEZJWE1FXHJcbiAgICAgICAgICAgIGNuOiBtYXRjaGVzLmFiaWxpdHksIC8vIEZJWE1FXHJcbiAgICAgICAgICAgIGtvOiAn64uJ7IqkJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gVE9ETzogc2hhZG93ZXllIGZhaWx1cmVcclxuLy8gVE9ETzogRW1wdHkgSGF0ZSAoM0U1OS8zRTVBKSBoaXRzIGV2ZXJ5Ym9keSwgc28gaGFyZCB0byB0ZWxsIGFib3V0IGtub2NrYmFja1xyXG4vLyBUT0RPOiBtYXliZSBtYXJrIGhlbGwgd2luZCBwZW9wbGUgd2hvIGdvdCBjbGlwcGVkIGJ5IHN0YWNrP1xyXG4vLyBUT0RPOiBtaXNzaW5nIHB1ZGRsZXM/XHJcbi8vIFRPRE86IG1pc3NpbmcgbGlnaHQvZGFyayBjaXJjbGUgc3RhY2tcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5FZGVuc0dhdGVEZXNjZW50U2F2YWdlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdFMlMgRG9vbXZvaWQgU2xpY2VyJzogJzNFNTAnLFxyXG4gICAgJ0UzUyBFbXB0eSBSYWdlJzogJzNFNkMnLFxyXG4gICAgJ0UzUyBEb29tdm9pZCBHdWlsbG90aW5lJzogJzNFNEYnLFxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnRTJTIERvb212b2lkIENsZWF2ZXInOiAnM0U2NCcsXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ0UyUyBTaGFkb3dleWUnLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICAvLyBTdG9uZSBDdXJzZVxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnNTg5JyB9KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuZWZmZWN0IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0UyUyBOeXgnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICczRTUxJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ3dhcm4nLFxyXG4gICAgICAgICAgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ0Jvb3BlZCcsXHJcbiAgICAgICAgICAgIGRlOiAnTnl4IGJlcsO8aHJ0JyxcclxuICAgICAgICAgICAgZnI6ICdNYWx1cyBkZSBkw6lnw6J0cycsXHJcbiAgICAgICAgICAgIGphOiBtYXRjaGVzLmFiaWxpdHksIC8vIEZJWE1FXHJcbiAgICAgICAgICAgIGNuOiBtYXRjaGVzLmFiaWxpdHksIC8vIEZJWE1FXHJcbiAgICAgICAgICAgIGtvOiAn64uJ7IqkJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5FZGVuc0dhdGVJbnVuZGF0aW9uLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdFM04gTW9uc3RlciBXYXZlIDEnOiAnM0ZDQScsXHJcbiAgICAnRTNOIE1vbnN0ZXIgV2F2ZSAyJzogJzNGRTknLFxyXG4gICAgJ0UzTiBNYWVsc3Ryb20nOiAnM0ZEOScsXHJcbiAgICAnRTNOIFN3aXJsaW5nIFRzdW5hbWknOiAnM0ZENScsXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnRTNOIFRlbXBvcmFyeSBDdXJyZW50IDEnOiAnM0ZDRScsXHJcbiAgICAnRTNOIFRlbXBvcmFyeSBDdXJyZW50IDInOiAnM0ZDRCcsXHJcbiAgICAnRTNOIFNwaW5uaW5nIERpdmUnOiAnM0ZEQicsXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgICdFM04gUmlwIEN1cnJlbnQnOiAnM0ZDNycsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFRPRE86IFNjb3VyaW5nIFRzdW5hbWkgKDNDRTApIG9uIHNvbWVib2R5IG90aGVyIHRoYW4gdGFyZ2V0XHJcbi8vIFRPRE86IFN3ZWVwaW5nIFRzdW5hbWkgKDNGRjUpIG9uIHNvbWVib2R5IG90aGVyIHRoYW4gdGFua3NcclxuLy8gVE9ETzogUmlwIEN1cnJlbnQgKDNGRTAsIDNGRTEpIG9uIHNvbWVib2R5IG90aGVyIHRoYW4gdGFyZ2V0L3RhbmtzXHJcbi8vIFRPRE86IEJvaWxlZCBBbGl2ZSAoNDAwNikgaXMgZmFpbGluZyBwdWRkbGVzPz8/XHJcbi8vIFRPRE86IGZhaWxpbmcgdG8gY2xlYW5zZSBTcGxhc2hpbmcgV2F0ZXJzXHJcbi8vIFRPRE86IGRvZXMgZ2V0dGluZyBoaXQgYnkgdW5kZXJzZWEgcXVha2UgY2F1c2UgYW4gYWJpbGl0eT9cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkVkZW5zR2F0ZUludW5kYXRpb25TYXZhZ2UsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0UzUyBNb25zdGVyIFdhdmUgMSc6ICczRkU1JyxcclxuICAgICdFM1MgTW9uc3RlciBXYXZlIDInOiAnM0ZFOScsXHJcbiAgICAnRTNTIE1hZWxzdHJvbSc6ICczRkZCJyxcclxuICAgICdFM1MgU3dpcmxpbmcgVHN1bmFtaSc6ICczRkY0JyxcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdFM1MgVGVtcG9yYXJ5IEN1cnJlbnQgMSc6ICczRkVBJyxcclxuICAgICdFM1MgVGVtcG9yYXJ5IEN1cnJlbnQgMic6ICczRkVCJyxcclxuICAgICdFM1MgVGVtcG9yYXJ5IEN1cnJlbnQgMyc6ICczRkVDJyxcclxuICAgICdFM1MgVGVtcG9yYXJ5IEN1cnJlbnQgNCc6ICczRkVEJyxcclxuICAgICdFM1MgU3Bpbm5pbmcgRGl2ZSc6ICczRkZEJyxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkVkZW5zR2F0ZVNlcHVsdHVyZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnRTROIFdlaWdodCBvZiB0aGUgTGFuZCc6ICc0MEVCJyxcclxuICAgICdFNE4gRXZpbCBFYXJ0aCc6ICc0MEVGJyxcclxuICAgICdFNE4gQWZ0ZXJzaG9jayAxJzogJzQxQjQnLFxyXG4gICAgJ0U0TiBBZnRlcnNob2NrIDInOiAnNDBGMCcsXHJcbiAgICAnRTROIEV4cGxvc2lvbiAxJzogJzQwRUQnLFxyXG4gICAgJ0U0TiBFeHBsb3Npb24gMic6ICc0MEY1JyxcclxuICAgICdFNE4gTGFuZHNsaWRlJzogJzQxMUInLFxyXG4gICAgJ0U0TiBSaWdodHdhcmQgTGFuZHNsaWRlJzogJzQxMDAnLFxyXG4gICAgJ0U0TiBMZWZ0d2FyZCBMYW5kc2xpZGUnOiAnNDBGRicsXHJcbiAgICAnRTROIE1hc3NpdmUgTGFuZHNsaWRlJzogJzQwRkMnLFxyXG4gICAgJ0U0TiBTZWlzbWljIFdhdmUnOiAnNDBGMycsXHJcbiAgICAnRTROIEZhdWx0IExpbmUnOiAnNDEwMScsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERhdGEgZXh0ZW5kcyBPb3BzeURhdGEge1xyXG4gIGZhdWx0TGluZVRhcmdldD86IHN0cmluZztcclxufVxyXG5cclxuLy8gVE9ETzogY291bGQgdHJhY2sgcGVvcGxlIGdldCBoaXR0aW5nIGJ5IG1hcmtlcnMgdGhleSBzaG91bGRuJ3RcclxuLy8gVE9ETzogY291bGQgdHJhY2sgbm9uLXRhbmtzIGdldHRpbmcgaGl0IGJ5IHRhbmtidXN0ZXJzLCBtZWdhbGl0aHNcclxuLy8gVE9ETzogY291bGQgdHJhY2sgbm9uLXRhcmdldCBnZXR0aW5nIGhpdCBieSB0YW5rYnVzdGVyXHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRWRlbnNHYXRlU2VwdWx0dXJlU2F2YWdlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdFNFMgV2VpZ2h0IG9mIHRoZSBMYW5kJzogJzQxMDgnLFxyXG4gICAgJ0U0UyBFdmlsIEVhcnRoJzogJzQxMEMnLFxyXG4gICAgJ0U0UyBBZnRlcnNob2NrIDEnOiAnNDFCNScsXHJcbiAgICAnRTRTIEFmdGVyc2hvY2sgMic6ICc0MTBEJyxcclxuICAgICdFNFMgRXhwbG9zaW9uJzogJzQxMEEnLFxyXG4gICAgJ0U0UyBMYW5kc2xpZGUnOiAnNDExQicsXHJcbiAgICAnRTRTIFJpZ2h0d2FyZCBMYW5kc2xpZGUnOiAnNDExRCcsXHJcbiAgICAnRTRTIExlZnR3YXJkIExhbmRzbGlkZSc6ICc0MTFDJyxcclxuICAgICdFNFMgTWFzc2l2ZSBMYW5kc2xpZGUgMSc6ICc0MTE4JyxcclxuICAgICdFNFMgTWFzc2l2ZSBMYW5kc2xpZGUgMic6ICc0MTE5JyxcclxuICAgICdFNFMgU2Vpc21pYyBXYXZlJzogJzQxMTAnLFxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ0U0UyBEdWFsIEVhcnRoZW4gRmlzdHMgMSc6ICc0MTM1JyxcclxuICAgICdFNFMgRHVhbCBFYXJ0aGVuIEZpc3RzIDInOiAnNDY4NycsXHJcbiAgICAnRTRTIFBsYXRlIEZyYWN0dXJlJzogJzQzRUEnLFxyXG4gICAgJ0U0UyBFYXJ0aGVuIEZpc3QgMSc6ICc0M0NBJyxcclxuICAgICdFNFMgRWFydGhlbiBGaXN0IDInOiAnNDNDOScsXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ0U0UyBGYXVsdCBMaW5lIENvbGxlY3QnLFxyXG4gICAgICB0eXBlOiAnU3RhcnRzVXNpbmcnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5zdGFydHNVc2luZyh7IGlkOiAnNDExRScsIHNvdXJjZTogJ1RpdGFuJyB9KSxcclxuICAgICAgbmV0UmVnZXhEZTogTmV0UmVnZXhlcy5zdGFydHNVc2luZyh7IGlkOiAnNDExRScsIHNvdXJjZTogJ1RpdGFuJyB9KSxcclxuICAgICAgbmV0UmVnZXhGcjogTmV0UmVnZXhlcy5zdGFydHNVc2luZyh7IGlkOiAnNDExRScsIHNvdXJjZTogJ1RpdGFuJyB9KSxcclxuICAgICAgbmV0UmVnZXhKYTogTmV0UmVnZXhlcy5zdGFydHNVc2luZyh7IGlkOiAnNDExRScsIHNvdXJjZTogJ+OCv+OCpOOCv+ODsycgfSksXHJcbiAgICAgIG5ldFJlZ2V4Q246IE5ldFJlZ2V4ZXMuc3RhcnRzVXNpbmcoeyBpZDogJzQxMUUnLCBzb3VyY2U6ICfms7DlnaYnIH0pLFxyXG4gICAgICBuZXRSZWdleEtvOiBOZXRSZWdleGVzLnN0YXJ0c1VzaW5nKHsgaWQ6ICc0MTFFJywgc291cmNlOiAn7YOA7J207YOEJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuZmF1bHRMaW5lVGFyZ2V0ID0gbWF0Y2hlcy50YXJnZXQ7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0U0UyBGYXVsdCBMaW5lJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnNDExRScsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS5mYXVsdExpbmVUYXJnZXQgIT09IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ1J1biBPdmVyJyxcclxuICAgICAgICAgICAgZGU6ICdXdXJkZSDDvGJlcmZhaHJlbicsXHJcbiAgICAgICAgICAgIGZyOiAnQSDDqXTDqSDDqWNyYXPDqShlKScsXHJcbiAgICAgICAgICAgIGphOiBtYXRjaGVzLmFiaWxpdHksIC8vIEZJWE1FXHJcbiAgICAgICAgICAgIGNuOiBtYXRjaGVzLmFiaWxpdHksIC8vIEZJWE1FXHJcbiAgICAgICAgICAgIGtvOiBtYXRjaGVzLmFiaWxpdHksIC8vIEZJWE1FXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEYXRhIGV4dGVuZHMgT29wc3lEYXRhIHtcclxuICBoYXNPcmI/OiB7IFtuYW1lOiBzdHJpbmddOiBib29sZWFuIH07XHJcbiAgY2xvdWRNYXJrZXJzPzogc3RyaW5nW107XHJcbn1cclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5FZGVuc1ZlcnNlRnVsbWluYXRpb24sXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0U1TiBJbXBhY3QnOiAnNEUzQScsIC8vIFN0cmF0b3NwZWFyIGxhbmRpbmcgQW9FXHJcbiAgICAnRTVOIExpZ2h0bmluZyBCb2x0JzogJzRCOUMnLCAvLyBTdG9ybWNsb3VkIHN0YW5kYXJkIGF0dGFja1xyXG4gICAgJ0U1TiBHYWxsb3AnOiAnNEI5NycsIC8vIFNpZGV3YXlzIGFkZCBjaGFyZ2VcclxuICAgICdFNU4gU2hvY2sgU3RyaWtlJzogJzRCQTEnLCAvLyBTbWFsbCBBb0UgY2lyY2xlcyBkdXJpbmcgVGh1bmRlcnN0b3JtXHJcbiAgICAnRTVOIFZvbHQgU3RyaWtlJzogJzRDRjInLCAvLyBMYXJnZSBBb0UgY2lyY2xlcyBkdXJpbmcgVGh1bmRlcnN0b3JtXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnRTVOIEp1ZGdtZW50IEpvbHQnOiAnNEI4RicsIC8vIFN0cmF0b3NwZWFyIGV4cGxvc2lvbnNcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIC8vIFRoaXMgaGFwcGVucyB3aGVuIGEgcGxheWVyIGdldHMgNCsgc3RhY2tzIG9mIG9yYnMuIERvbid0IGJlIGdyZWVkeSFcclxuICAgICAgaWQ6ICdFNU4gU3RhdGljIENvbmRlbnNhdGlvbicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICc4QjUnIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5lZmZlY3QgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIEhlbHBlciBmb3Igb3JiIHBpY2t1cCBmYWlsdXJlc1xyXG4gICAgICBpZDogJ0U1TiBPcmIgR2FpbicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICc4QjQnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5oYXNPcmIgPz89IHt9O1xyXG4gICAgICAgIGRhdGEuaGFzT3JiW21hdGNoZXMudGFyZ2V0XSA9IHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0U1TiBPcmIgTG9zZScsXHJcbiAgICAgIHR5cGU6ICdMb3Nlc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmxvc2VzRWZmZWN0KHsgZWZmZWN0SWQ6ICc4QjQnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5oYXNPcmIgPz89IHt9O1xyXG4gICAgICAgIGRhdGEuaGFzT3JiW21hdGNoZXMudGFyZ2V0XSA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFNU4gRGl2aW5lIEp1ZGdlbWVudCBWb2x0cycsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzRCOUEnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+ICFkYXRhLmhhc09yYiB8fCAhZGF0YS5oYXNPcmJbbWF0Y2hlcy50YXJnZXRdLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogYCR7bWF0Y2hlcy5hYmlsaXR5fSAobm8gb3JiKWAsXHJcbiAgICAgICAgICAgIGRlOiBgJHttYXRjaGVzLmFiaWxpdHl9IChrZWluIE9yYilgLFxyXG4gICAgICAgICAgICBmcjogYCR7bWF0Y2hlcy5hYmlsaXR5fSAocGFzIGQnb3JiZSlgLFxyXG4gICAgICAgICAgICBqYTogYCR7bWF0Y2hlcy5hYmlsaXR5fSAo6Zu3546J54Sh44GXKWAsXHJcbiAgICAgICAgICAgIGNuOiBgJHttYXRjaGVzLmFiaWxpdHl9ICjmsqHlkIPnkIMpYCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTVOIFN0b3JtY2xvdWQgVGFyZ2V0IFRyYWNraW5nJyxcclxuICAgICAgdHlwZTogJ0hlYWRNYXJrZXInLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5oZWFkTWFya2VyKHsgaWQ6ICcwMDZFJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuY2xvdWRNYXJrZXJzID8/PSBbXTtcclxuICAgICAgICBkYXRhLmNsb3VkTWFya2Vycy5wdXNoKG1hdGNoZXMudGFyZ2V0KTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIFRoaXMgYWJpbGl0eSBpcyBzZWVuIG9ubHkgaWYgcGxheWVycyBzdGFja2VkIHRoZSBjbG91ZHMgaW5zdGVhZCBvZiBzcHJlYWRpbmcgdGhlbS5cclxuICAgICAgaWQ6ICdFNU4gVGhlIFBhcnRpbmcgQ2xvdWRzJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnNEI5RCcsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgc3VwcHJlc3NTZWNvbmRzOiAzMCxcclxuICAgICAgbWlzdGFrZTogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgZGF0YS5jbG91ZE1hcmtlcnMgPz8gW10pIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgICAgYmxhbWU6IG5hbWUsXHJcbiAgICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgICBlbjogYCR7bWF0Y2hlcy5hYmlsaXR5fSAoY2xvdWRzIHRvbyBjbG9zZSlgLFxyXG4gICAgICAgICAgICAgIGRlOiBgJHttYXRjaGVzLmFiaWxpdHl9IChXb2xrZW4genUgbmFoZSlgLFxyXG4gICAgICAgICAgICAgIGZyOiBgJHttYXRjaGVzLmFiaWxpdHl9IChudWFnZXMgdHJvcCBwcm9jaGVzKWAsXHJcbiAgICAgICAgICAgICAgamE6IGAke21hdGNoZXMuYWJpbGl0eX0gKOmbsui/keOBmeOBjilgLFxyXG4gICAgICAgICAgICAgIGNuOiBgJHttYXRjaGVzLmFiaWxpdHl9ICjpm7fkupHph43lj6ApYCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFNU4gU3Rvcm1jbG91ZCBjbGVhbnVwJyxcclxuICAgICAgdHlwZTogJ0hlYWRNYXJrZXInLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5oZWFkTWFya2VyKHsgaWQ6ICcwMDZFJyB9KSxcclxuICAgICAgZGVsYXlTZWNvbmRzOiAzMCwgLy8gU3Rvcm1jbG91ZHMgcmVzb2x2ZSB3ZWxsIGJlZm9yZSB0aGlzLlxyXG4gICAgICBydW46IChkYXRhKSA9PiB7XHJcbiAgICAgICAgZGVsZXRlIGRhdGEuY2xvdWRNYXJrZXJzO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuaW1wb3J0IHsgcGxheWVyRGFtYWdlRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vb29wc3lfY29tbW9uJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGF0YSBleHRlbmRzIE9vcHN5RGF0YSB7XHJcbiAgaGFzT3JiPzogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gIGhhdGVkPzogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gIGNsb3VkTWFya2Vycz86IHN0cmluZ1tdO1xyXG59XHJcblxyXG4vLyBUT0RPOiBpcyB0aGVyZSBhIGRpZmZlcmVudCBhYmlsaXR5IGlmIHRoZSBzaGllbGQgZHV0eSBhY3Rpb24gaXNuJ3QgdXNlZCBwcm9wZXJseT9cclxuLy8gVE9ETzogaXMgdGhlcmUgYW4gYWJpbGl0eSBmcm9tIFJhaWRlbiAodGhlIGJpcmQpIGlmIHlvdSBnZXQgZWF0ZW4/XHJcbi8vIFRPRE86IG1heWJlIGNoYWluIGxpZ2h0bmluZyB3YXJuaW5nIGlmIHlvdSBnZXQgaGl0IHdoaWxlIHlvdSBoYXZlIHN5c3RlbSBzaG9jayAoOEI4KVxyXG5cclxuY29uc3Qgbm9PcmIgPSAoc3RyOiBzdHJpbmcpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgZW46IHN0ciArICcgKG5vIG9yYiknLFxyXG4gICAgZGU6IHN0ciArICcgKGtlaW4gT3JiKScsXHJcbiAgICBmcjogc3RyICsgJyAocGFzIGRcXCdvcmJlKScsXHJcbiAgICBqYTogc3RyICsgJyAo6Zu3546J54Sh44GXKScsXHJcbiAgICBjbjogc3RyICsgJyAo5rKh5ZCD55CDKScsXHJcbiAgICBrbzogc3RyICsgJyAo6rWs7IqsIOyXhuydjCknLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRWRlbnNWZXJzZUZ1bG1pbmF0aW9uU2F2YWdlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdFNVMgSW1wYWN0JzogJzRFM0InLCAvLyBTdHJhdG9zcGVhciBsYW5kaW5nIEFvRVxyXG4gICAgJ0U1UyBHYWxsb3AnOiAnNEJCNCcsIC8vIFNpZGV3YXlzIGFkZCBjaGFyZ2VcclxuICAgICdFNVMgU2hvY2sgU3RyaWtlJzogJzRCQzEnLCAvLyBTbWFsbCBBb0UgY2lyY2xlcyBkdXJpbmcgVGh1bmRlcnN0b3JtXHJcbiAgICAnRTVTIFN0ZXBwZWQgTGVhZGVyIFR3aXN0ZXInOiAnNEJDNycsIC8vIFR3aXN0ZXIgc3RlcHBlZCBsZWFkZXJcclxuICAgICdFNVMgU3RlcHBlZCBMZWFkZXIgRG9udXQnOiAnNEJDOCcsIC8vIERvbnV0IHN0ZXBwZWQgbGVhZGVyXHJcbiAgICAnRTVTIFNob2NrJzogJzRFM0QnLCAvLyBIYXRlZCBvZiBMZXZpbiBTdG9ybWNsb3VkLWNsZWFuc2FibGUgZXhwbG9kaW5nIGRlYnVmZlxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ0U1UyBKdWRnbWVudCBKb2x0JzogJzRCQTcnLCAvLyBTdHJhdG9zcGVhciBleHBsb3Npb25zXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdFNVMgVm9sdCBTdHJpa2UgRG91YmxlJzogJzRCQzMnLCAvLyBMYXJnZSBBb0UgY2lyY2xlcyBkdXJpbmcgVGh1bmRlcnN0b3JtXHJcbiAgICAnRTVTIENyaXBwbGluZyBCbG93JzogJzRCQ0EnLFxyXG4gICAgJ0U1UyBDaGFpbiBMaWdodG5pbmcgRG91YmxlJzogJzRCQzUnLFxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgLy8gSGVscGVyIGZvciBvcmIgcGlja3VwIGZhaWx1cmVzXHJcbiAgICAgIGlkOiAnRTVTIE9yYiBHYWluJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzhCNCcgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmhhc09yYiA/Pz0ge307XHJcbiAgICAgICAgZGF0YS5oYXNPcmJbbWF0Y2hlcy50YXJnZXRdID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTVTIE9yYiBMb3NlJyxcclxuICAgICAgdHlwZTogJ0xvc2VzRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMubG9zZXNFZmZlY3QoeyBlZmZlY3RJZDogJzhCNCcgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmhhc09yYiA/Pz0ge307XHJcbiAgICAgICAgZGF0YS5oYXNPcmJbbWF0Y2hlcy50YXJnZXRdID0gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0U1UyBEaXZpbmUgSnVkZ2VtZW50IFZvbHRzJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnNEJCNycsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gIWRhdGEuaGFzT3JiIHx8ICFkYXRhLmhhc09yYlttYXRjaGVzLnRhcmdldF0sXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBub09yYihtYXRjaGVzLmFiaWxpdHkpIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0U1UyBWb2x0IFN0cmlrZSBPcmInLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICc0QkMzJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiAhZGF0YS5oYXNPcmIgfHwgIWRhdGEuaGFzT3JiW21hdGNoZXMudGFyZ2V0XSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG5vT3JiKG1hdGNoZXMuYWJpbGl0eSkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTVTIERlYWRseSBEaXNjaGFyZ2UgQmlnIEtub2NrYmFjaycsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzRCQjInLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+ICFkYXRhLmhhc09yYiB8fCAhZGF0YS5oYXNPcmJbbWF0Y2hlcy50YXJnZXRdLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnZmFpbCcsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbm9PcmIobWF0Y2hlcy5hYmlsaXR5KSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFNVMgTGlnaHRuaW5nIEJvbHQnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICc0QkI5JywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgLy8gSGF2aW5nIGEgbm9uLWlkZW1wb3RlbnQgY29uZGl0aW9uIGZ1bmN0aW9uIGlzIGEgYml0IDxfPFxyXG4gICAgICAgIC8vIE9ubHkgY29uc2lkZXIgbGlnaHRuaW5nIGJvbHQgZGFtYWdlIGlmIHlvdSBoYXZlIGEgZGVidWZmIHRvIGNsZWFyLlxyXG4gICAgICAgIGlmICghZGF0YS5oYXRlZCB8fCAhZGF0YS5oYXRlZFttYXRjaGVzLnRhcmdldF0pXHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgZGVsZXRlIGRhdGEuaGF0ZWRbbWF0Y2hlcy50YXJnZXRdO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFNVMgSGF0ZWQgb2YgTGV2aW4nLFxyXG4gICAgICB0eXBlOiAnSGVhZE1hcmtlcicsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmhlYWRNYXJrZXIoeyBpZDogJzAwRDInIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5oYXRlZCA/Pz0ge307XHJcbiAgICAgICAgZGF0YS5oYXRlZFttYXRjaGVzLnRhcmdldF0gPSB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFNVMgU3Rvcm1jbG91ZCBUYXJnZXQgVHJhY2tpbmcnLFxyXG4gICAgICB0eXBlOiAnSGVhZE1hcmtlcicsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmhlYWRNYXJrZXIoeyBpZDogJzAwNkUnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5jbG91ZE1hcmtlcnMgPz89IFtdO1xyXG4gICAgICAgIGRhdGEuY2xvdWRNYXJrZXJzLnB1c2gobWF0Y2hlcy50YXJnZXQpO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gVGhpcyBhYmlsaXR5IGlzIHNlZW4gb25seSBpZiBwbGF5ZXJzIHN0YWNrZWQgdGhlIGNsb3VkcyBpbnN0ZWFkIG9mIHNwcmVhZGluZyB0aGVtLlxyXG4gICAgICBpZDogJ0U1UyBUaGUgUGFydGluZyBDbG91ZHMnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICc0QkJBJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBzdXBwcmVzc1NlY29uZHM6IDMwLFxyXG4gICAgICBtaXN0YWtlOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBkYXRhLmNsb3VkTWFya2VycyA/PyBbXSkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgICBibGFtZTogbmFtZSxcclxuICAgICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICAgIGVuOiBgJHttYXRjaGVzLmFiaWxpdHl9IChjbG91ZHMgdG9vIGNsb3NlKWAsXHJcbiAgICAgICAgICAgICAgZGU6IGAke21hdGNoZXMuYWJpbGl0eX0gKFdvbGtlbiB6dSBuYWhlKWAsXHJcbiAgICAgICAgICAgICAgZnI6IGAke21hdGNoZXMuYWJpbGl0eX0gKG51YWdlcyB0cm9wIHByb2NoZXMpYCxcclxuICAgICAgICAgICAgICBqYTogYCR7bWF0Y2hlcy5hYmlsaXR5fSAo6Zuy6L+R44GZ44GOKWAsXHJcbiAgICAgICAgICAgICAgY246IGAke21hdGNoZXMuYWJpbGl0eX0gKOmbt+S6kemHjeWPoClgLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0U1UyBTdG9ybWNsb3VkIGNsZWFudXAnLFxyXG4gICAgICB0eXBlOiAnSGVhZE1hcmtlcicsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmhlYWRNYXJrZXIoeyBpZDogJzAwNkUnIH0pLFxyXG4gICAgICAvLyBTdG9ybWNsb3VkcyByZXNvbHZlIHdlbGwgYmVmb3JlIHRoaXMuXHJcbiAgICAgIGRlbGF5U2Vjb25kczogMzAsXHJcbiAgICAgIHJ1bjogKGRhdGEpID0+IHtcclxuICAgICAgICBkZWxldGUgZGF0YS5jbG91ZE1hcmtlcnM7XHJcbiAgICAgICAgZGVsZXRlIGRhdGEuaGF0ZWQ7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRWRlbnNWZXJzZUZ1cm9yLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdFNk4gVGhvcm5zJzogJzRCREEnLCAvLyBBb0UgbWFya2VycyBhZnRlciBFbnVtZXJhdGlvblxyXG4gICAgJ0U2TiBGZXJvc3Rvcm0gMSc6ICc0QkREJyxcclxuICAgICdFNk4gRmVyb3N0b3JtIDInOiAnNEJFNScsXHJcbiAgICAnRTZOIFN0b3JtIE9mIEZ1cnkgMSc6ICc0QkUwJywgLy8gQ2lyY2xlIEFvRSBkdXJpbmcgdGV0aGVycy0tR2FydWRhXHJcbiAgICAnRTZOIFN0b3JtIE9mIEZ1cnkgMic6ICc0QkU2JywgLy8gQ2lyY2xlIEFvRSBkdXJpbmcgdGV0aGVycy0tUmFrdGFwYWtzYVxyXG4gICAgJ0U2TiBFeHBsb3Npb24nOiAnNEJFMicsIC8vIEFvRSBjaXJjbGVzLCBHYXJ1ZGEgb3Jic1xyXG4gICAgJ0U2TiBIZWF0IEJ1cnN0JzogJzRCRUMnLFxyXG4gICAgJ0U2TiBDb25mbGFnIFN0cmlrZSc6ICc0QkVFJywgLy8gMjcwLWRlZ3JlZSBmcm9udGFsIEFvRVxyXG4gICAgJ0U2TiBTcGlrZSBPZiBGbGFtZSc6ICc0QkYwJywgLy8gT3JiIGV4cGxvc2lvbnMgYWZ0ZXIgU3RyaWtlIFNwYXJrXHJcbiAgICAnRTZOIFJhZGlhbnQgUGx1bWUnOiAnNEJGMicsXHJcbiAgICAnRTZOIEVydXB0aW9uJzogJzRCRjQnLFxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ0U2TiBWYWN1dW0gU2xpY2UnOiAnNEJENScsIC8vIERhcmsgbGluZSBBb0UgZnJvbSBHYXJ1ZGFcclxuICAgICdFNk4gRG93bmJ1cnN0JzogJzRCREInLCAvLyBCbHVlIGtub2NrYmFjayBjaXJjbGUuIEFjdHVhbCBrbm9ja2JhY2sgaXMgdW5rbm93biBhYmlsaXR5IDRDMjBcclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgLy8gS2lsbHMgbm9uLXRhbmtzIHdobyBnZXQgaGl0IGJ5IGl0LlxyXG4gICAgJ0U2TiBJbnN0YW50IEluY2luZXJhdGlvbic6ICc0QkVEJyxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IFNpbXBsZU9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbi8vIFRPRE86IGNoZWNrIHRldGhlcnMgYmVpbmcgY3V0ICh3aGVuIHRoZXkgc2hvdWxkbid0KVxyXG4vLyBUT0RPOiBjaGVjayBmb3IgY29uY3Vzc2VkIGRlYnVmZlxyXG4vLyBUT0RPOiBjaGVjayBmb3IgdGFraW5nIHRhbmtidXN0ZXIgd2l0aCBsaWdodGhlYWRlZFxyXG4vLyBUT0RPOiBjaGVjayBmb3Igb25lIHBlcnNvbiB0YWtpbmcgbXVsdGlwbGUgU3Rvcm0gT2YgRnVyeSBUZXRoZXJzICg0QzAxLzRDMDgpXHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBTaW1wbGVPb3BzeVRyaWdnZXJTZXQgPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRWRlbnNWZXJzZUZ1cm9yU2F2YWdlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgIC8vIEl0J3MgY29tbW9uIHRvIGp1c3QgaWdub3JlIGZ1dGJvbCBtZWNoYW5pY3MsIHNvIGRvbid0IHdhcm4gb24gU3RyaWtlIFNwYXJrLlxyXG4gICAgLy8gJ1NwaWtlIE9mIEZsYW1lJzogJzRDMTMnLCAvLyBPcmIgZXhwbG9zaW9ucyBhZnRlciBTdHJpa2UgU3BhcmtcclxuXHJcbiAgICAnRTZTIFRob3Jucyc6ICc0QkZBJywgLy8gQW9FIG1hcmtlcnMgYWZ0ZXIgRW51bWVyYXRpb25cclxuICAgICdFNlMgRmVyb3N0b3JtIDEnOiAnNEJGRCcsXHJcbiAgICAnRTZTIEZlcm9zdG9ybSAyJzogJzRDMDYnLFxyXG4gICAgJ0U2UyBTdG9ybSBPZiBGdXJ5IDEnOiAnNEMwMCcsIC8vIENpcmNsZSBBb0UgZHVyaW5nIHRldGhlcnMtLUdhcnVkYVxyXG4gICAgJ0U2UyBTdG9ybSBPZiBGdXJ5IDInOiAnNEMwNycsIC8vIENpcmNsZSBBb0UgZHVyaW5nIHRldGhlcnMtLVJha3RhcGFrc2FcclxuICAgICdFNlMgRXhwbG9zaW9uJzogJzRDMDMnLCAvLyBBb0UgY2lyY2xlcywgR2FydWRhIG9yYnNcclxuICAgICdFNlMgSGVhdCBCdXJzdCc6ICc0QzFGJyxcclxuICAgICdFNlMgQ29uZmxhZyBTdHJpa2UnOiAnNEMxMCcsIC8vIDI3MC1kZWdyZWUgZnJvbnRhbCBBb0VcclxuICAgICdFNlMgUmFkaWFudCBQbHVtZSc6ICc0QzE1JyxcclxuICAgICdFNlMgRXJ1cHRpb24nOiAnNEMxNycsXHJcbiAgICAnRTZTIFdpbmQgQ3V0dGVyJzogJzRDMDInLCAvLyBUZXRoZXItY3V0dGluZyBsaW5lIGFvZVxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ0U2UyBWYWN1dW0gU2xpY2UnOiAnNEJGNScsIC8vIERhcmsgbGluZSBBb0UgZnJvbSBHYXJ1ZGFcclxuICAgICdFNlMgRG93bmJ1cnN0IDEnOiAnNEJGQicsIC8vIEJsdWUga25vY2tiYWNrIGNpcmNsZSAoR2FydWRhKS5cclxuICAgICdFNlMgRG93bmJ1cnN0IDInOiAnNEJGQycsIC8vIEJsdWUga25vY2tiYWNrIGNpcmNsZSAoUmFrdGFwYWtzYSkuXHJcbiAgICAnRTZTIE1ldGVvciBTdHJpa2UnOiAnNEMwRicsIC8vIEZyb250YWwgYXZvaWRhYmxlIHRhbmsgYnVzdGVyXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdFNlMgSGFuZHMgb2YgSGVsbCc6ICc0QzBbQkNdJywgLy8gVGV0aGVyIGNoYXJnZVxyXG4gICAgJ0U2UyBIYW5kcyBvZiBGbGFtZSc6ICc0QzBBJywgLy8gRmlyc3QgVGFua2J1c3RlclxyXG4gICAgJ0U2UyBJbnN0YW50IEluY2luZXJhdGlvbic6ICc0QzBFJywgLy8gU2Vjb25kIFRhbmtidXN0ZXJcclxuICAgICdFNlMgQmxhemUnOiAnNEMxQicsIC8vIEZsYW1lIFRvcm5hZG8gQ2xlYXZlXHJcbiAgfSxcclxuICBzb2xvRmFpbDoge1xyXG4gICAgJ0U2UyBBaXIgQnVtcCc6ICc0QkY5JyxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuaW1wb3J0IHsgcGxheWVyRGFtYWdlRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vb29wc3lfY29tbW9uJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGF0YSBleHRlbmRzIE9vcHN5RGF0YSB7XHJcbiAgaGFzQXN0cmFsPzogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gIGhhc1VtYnJhbD86IHsgW25hbWU6IHN0cmluZ106IGJvb2xlYW4gfTtcclxufVxyXG5cclxuY29uc3Qgd3JvbmdCdWZmID0gKHN0cjogc3RyaW5nKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGVuOiBzdHIgKyAnICh3cm9uZyBidWZmKScsXHJcbiAgICBkZTogc3RyICsgJyAoZmFsc2NoZXIgQnVmZiknLFxyXG4gICAgZnI6IHN0ciArICcgKG1hdXZhaXMgYnVmZiknLFxyXG4gICAgamE6IHN0ciArICcgKOS4jemBqeWIh+OBquODkOODlSknLFxyXG4gICAgY246IHN0ciArICcgKEJ1ZmbplJnkuoYpJyxcclxuICAgIGtvOiBzdHIgKyAnICjrsoTtlIQg7YuA66a8KScsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IG5vQnVmZiA9IChzdHI6IHN0cmluZykgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBlbjogc3RyICsgJyAobm8gYnVmZiknLFxyXG4gICAgZGU6IHN0ciArICcgKGtlaW4gQnVmZiknLFxyXG4gICAgZnI6IHN0ciArICcgKHBhcyBkZSBidWZmKScsXHJcbiAgICBqYTogc3RyICsgJyAo44OQ44OV54Sh44GXKScsXHJcbiAgICBjbjogc3RyICsgJyAo5rKh5pyJQnVmZiknLFxyXG4gICAga286IHN0ciArICco67KE7ZSEIOyXhuydjCknLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRWRlbnNWZXJzZUljb25vY2xhc20sXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0U3TiBTdHlnaWFuIFN3b3JkJzogJzRDNTUnLCAvLyBDaXJjbGUgZ3JvdW5kIEFvRXMgYWZ0ZXIgRmFsc2UgVHdpbGlnaHRcclxuICAgICdFN04gU3RyZW5ndGggSW4gTnVtYmVycyBEb251dCc6ICc0QzRDJywgLy8gTGFyZ2UgZG9udXQgZ3JvdW5kIEFvRXMsIGludGVybWlzc2lvblxyXG4gICAgJ0U3TiBTdHJlbmd0aCBJbiBOdW1iZXJzIDInOiAnNEM0RCcsIC8vIExhcmdlIGNpcmNsZSBncm91bmQgQW9FcywgaW50ZXJtaXNzaW9uXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdFN04gU3R5Z2lhbiBTdGFrZSc6ICc0QzMzJywgLy8gTGFzZXIgdGFuayBidXN0ZXIsIG91dHNpZGUgaW50ZXJtaXNzaW9uIHBoYXNlXHJcbiAgICAnRTVOIFNpbHZlciBTaG90JzogJzRFN0QnLCAvLyBTcHJlYWQgbWFya2VycywgaW50ZXJtaXNzaW9uXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ0U3TiBBc3RyYWwgRWZmZWN0IEdhaW4nLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnOEJFJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuaGFzQXN0cmFsID8/PSB7fTtcclxuICAgICAgICBkYXRhLmhhc0FzdHJhbFttYXRjaGVzLnRhcmdldF0gPSB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFN04gQXN0cmFsIEVmZmVjdCBMb3NlJyxcclxuICAgICAgdHlwZTogJ0xvc2VzRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMubG9zZXNFZmZlY3QoeyBlZmZlY3RJZDogJzhCRScgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmhhc0FzdHJhbCA/Pz0ge307XHJcbiAgICAgICAgZGF0YS5oYXNBc3RyYWxbbWF0Y2hlcy50YXJnZXRdID0gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0U3TiBVbWJyYWwgRWZmZWN0IEdhaW4nLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnOEJGJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuaGFzVW1icmFsID8/PSB7fTtcclxuICAgICAgICBkYXRhLmhhc1VtYnJhbFttYXRjaGVzLnRhcmdldF0gPSB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFN04gVW1icmFsIEVmZmVjdCBMb3NlJyxcclxuICAgICAgdHlwZTogJ0xvc2VzRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMubG9zZXNFZmZlY3QoeyBlZmZlY3RJZDogJzhCRicgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmhhc1VtYnJhbCA/Pz0ge307XHJcbiAgICAgICAgZGF0YS5oYXNVbWJyYWxbbWF0Y2hlcy50YXJnZXRdID0gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0U3TiBMaWdodFxcJ3MgQ291cnNlJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiBbJzRDM0UnLCAnNEM0MCcsICc0QzIyJywgJzRDM0MnLCAnNEU2MyddLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4gIWRhdGEuaGFzVW1icmFsIHx8ICFkYXRhLmhhc1VtYnJhbFttYXRjaGVzLnRhcmdldF07XHJcbiAgICAgIH0sXHJcbiAgICAgIG1pc3Rha2U6IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEuaGFzQXN0cmFsICYmIGRhdGEuaGFzQXN0cmFsW21hdGNoZXMudGFyZ2V0XSlcclxuICAgICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiB3cm9uZ0J1ZmYobWF0Y2hlcy5hYmlsaXR5KSB9O1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBub0J1ZmYobWF0Y2hlcy5hYmlsaXR5KSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFN04gRGFya3NcXCdzIENvdXJzZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogWyc0QzNEJywgJzRDMjMnLCAnNEM0MScsICc0QzQzJ10sIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiAhZGF0YS5oYXNBc3RyYWwgfHwgIWRhdGEuaGFzQXN0cmFsW21hdGNoZXMudGFyZ2V0XTtcclxuICAgICAgfSxcclxuICAgICAgbWlzdGFrZTogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBpZiAoZGF0YS5oYXNVbWJyYWwgJiYgZGF0YS5oYXNVbWJyYWxbbWF0Y2hlcy50YXJnZXRdKVxyXG4gICAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IHdyb25nQnVmZihtYXRjaGVzLmFiaWxpdHkpIH07XHJcbiAgICAgICAgLy8gVGhpcyBjYXNlIGlzIHByb2JhYmx5IGltcG9zc2libGUsIGFzIHRoZSBkZWJ1ZmYgdGlja3MgYWZ0ZXIgZGVhdGgsXHJcbiAgICAgICAgLy8gYnV0IGxlYXZpbmcgaXQgaGVyZSBpbiBjYXNlIHRoZXJlJ3Mgc29tZSByZXogb3IgZGlzY29ubmVjdCB0aW1pbmdcclxuICAgICAgICAvLyB0aGF0IGNvdWxkIGxlYWQgdG8gdGhpcy5cclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbm9CdWZmKG1hdGNoZXMuYWJpbGl0eSkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG4vLyBUT0RPOiBtaXNzaW5nIGFuIG9yYiBkdXJpbmcgdG9ybmFkbyBwaGFzZVxyXG4vLyBUT0RPOiBqdW1waW5nIGluIHRoZSB0b3JuYWRvIGRhbWFnZT8/XHJcbi8vIFRPRE86IHRha2luZyBzdW5ncmFjZSg0QzgwKSBvciBtb29uZ3JhY2UoNEM4Mikgd2l0aCB3cm9uZyBkZWJ1ZmZcclxuLy8gVE9ETzogc3R5Z2lhbiBzcGVhci9zaWx2ZXIgc3BlYXIgd2l0aCB0aGUgd3JvbmcgZGVidWZmXHJcbi8vIFRPRE86IHRha2luZyBleHBsb3Npb24gZnJvbSB0aGUgd3JvbmcgQ2hpYXJvL1NjdXJvIG9yYlxyXG4vLyBUT0RPOiBoYW5kbGUgNEM4OSBTaWx2ZXIgU3Rha2UgdGFua2J1c3RlciAybmQgaGl0LCBhcyBpdCdzIG9rIHRvIGhhdmUgdHdvIGluLlxyXG5cclxuY29uc3Qgd3JvbmdCdWZmID0gKHN0cjogc3RyaW5nKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGVuOiBzdHIgKyAnICh3cm9uZyBidWZmKScsXHJcbiAgICBkZTogc3RyICsgJyAoZmFsc2NoZXIgQnVmZiknLFxyXG4gICAgZnI6IHN0ciArICcgKG1hdXZhaXMgYnVmZiknLFxyXG4gICAgamE6IHN0ciArICcgKOS4jemBqeWIh+OBquODkOODlSknLFxyXG4gICAgY246IHN0ciArICcgKEJ1ZmbplJnkuoYpJyxcclxuICAgIGtvOiBzdHIgKyAnICjrsoTtlIQg7YuA66a8KScsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IG5vQnVmZiA9IChzdHI6IHN0cmluZykgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBlbjogc3RyICsgJyAobm8gYnVmZiknLFxyXG4gICAgZGU6IHN0ciArICcgKGtlaW4gQnVmZiknLFxyXG4gICAgZnI6IHN0ciArICcgKHBhcyBkZSBidWZmKScsXHJcbiAgICBqYTogc3RyICsgJyAo44OQ44OV54Sh44GXKScsXHJcbiAgICBjbjogc3RyICsgJyAo5rKh5pyJQnVmZiknLFxyXG4gICAga286IHN0ciArICcgKOuyhO2UhCDsl4bsnYwpJyxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEYXRhIGV4dGVuZHMgT29wc3lEYXRhIHtcclxuICBoYXNBc3RyYWw/OiB7IFtuYW1lOiBzdHJpbmddOiBib29sZWFuIH07XHJcbiAgaGFzVW1icmFsPzogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG59XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRWRlbnNWZXJzZUljb25vY2xhc21TYXZhZ2UsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0U3UyBTaWx2ZXIgU3dvcmQnOiAnNEM4RScsIC8vIGdyb3VuZCBhb2VcclxuICAgICdFN1MgT3ZlcndoZWxtaW5nIEZvcmNlJzogJzRDNzMnLCAvLyBhZGQgcGhhc2UgZ3JvdW5kIGFvZVxyXG4gICAgJ0U3UyBTdHJlbmd0aCBpbiBOdW1iZXJzIDEnOiAnNEM3MCcsIC8vIGFkZCBnZXQgdW5kZXJcclxuICAgICdFN1MgU3RyZW5ndGggaW4gTnVtYmVycyAyJzogJzRDNzEnLCAvLyBhZGQgZ2V0IG91dFxyXG4gICAgJ0U3UyBQYXBlciBDdXQnOiAnNEM3RCcsIC8vIHRvcm5hZG8gZ3JvdW5kIGFvZXNcclxuICAgICdFN1MgQnVmZmV0JzogJzRDNzcnLCAvLyB0b3JuYWRvIGdyb3VuZCBhb2VzIGFsc28/P1xyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ0U3UyBCZXR3aXh0IFdvcmxkcyc6ICc0QzZCJywgLy8gcHVycGxlIGdyb3VuZCBsaW5lIGFvZXNcclxuICAgICdFN1MgQ3J1c2FkZSc6ICc0QzU4JywgLy8gYmx1ZSBrbm9ja2JhY2sgY2lyY2xlIChzdGFuZGluZyBpbiBpdClcclxuICAgICdFN1MgRXhwbG9zaW9uJzogJzRDNkYnLCAvLyBkaWRuJ3Qga2lsbCBhbiBhZGRcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0U3UyBTdHlnaWFuIFN0YWtlJzogJzRDMzQnLCAvLyBMYXNlciB0YW5rIGJ1c3RlciAxXHJcbiAgICAnRTdTIFNpbHZlciBTaG90JzogJzRDOTInLCAvLyBTcHJlYWQgbWFya2Vyc1xyXG4gICAgJ0U3UyBTaWx2ZXIgU2NvdXJnZSc6ICc0QzkzJywgLy8gSWNlIG1hcmtlcnNcclxuICAgICdFN1MgQ2hpYXJvIFNjdXJvIEV4cGxvc2lvbiAxJzogJzREMTQnLCAvLyBvcmIgZXhwbG9zaW9uXHJcbiAgICAnRTdTIENoaWFybyBTY3VybyBFeHBsb3Npb24gMic6ICc0RDE1JywgLy8gb3JiIGV4cGxvc2lvblxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgLy8gSW50ZXJydXB0XHJcbiAgICAgIGlkOiAnRTdTIEFkdmVudCBPZiBMaWdodCcsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnNEM2RScgfSksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIC8vIFRPRE86IGlzIHRoaXMgYmxhbWUgY29ycmVjdD8gZG9lcyB0aGlzIGhhdmUgYSB0YXJnZXQ/XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFN1MgQXN0cmFsIEVmZmVjdCBHYWluJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzhCRScgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmhhc0FzdHJhbCA9IGRhdGEuaGFzQXN0cmFsIHx8IHt9O1xyXG4gICAgICAgIGRhdGEuaGFzQXN0cmFsW21hdGNoZXMudGFyZ2V0XSA9IHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0U3UyBBc3RyYWwgRWZmZWN0IExvc2UnLFxyXG4gICAgICB0eXBlOiAnTG9zZXNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5sb3Nlc0VmZmVjdCh7IGVmZmVjdElkOiAnOEJFJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuaGFzQXN0cmFsID0gZGF0YS5oYXNBc3RyYWwgfHwge307XHJcbiAgICAgICAgZGF0YS5oYXNBc3RyYWxbbWF0Y2hlcy50YXJnZXRdID0gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0U3UyBVbWJyYWwgRWZmZWN0IEdhaW4nLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnOEJGJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuaGFzVW1icmFsID0gZGF0YS5oYXNVbWJyYWwgfHwge307XHJcbiAgICAgICAgZGF0YS5oYXNVbWJyYWxbbWF0Y2hlcy50YXJnZXRdID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTdTIFVtYnJhbCBFZmZlY3QgTG9zZScsXHJcbiAgICAgIHR5cGU6ICdMb3Nlc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmxvc2VzRWZmZWN0KHsgZWZmZWN0SWQ6ICc4QkYnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5oYXNVbWJyYWwgPSBkYXRhLmhhc1VtYnJhbCB8fCB7fTtcclxuICAgICAgICBkYXRhLmhhc1VtYnJhbFttYXRjaGVzLnRhcmdldF0gPSBmYWxzZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTdTIExpZ2h0XFwncyBDb3Vyc2UnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6IFsnNEM2MicsICc0QzYzJywgJzRDNjQnLCAnNEM1QicsICc0QzVGJ10sIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiAhZGF0YS5oYXNVbWJyYWwgfHwgIWRhdGEuaGFzVW1icmFsW21hdGNoZXMudGFyZ2V0XTtcclxuICAgICAgfSxcclxuICAgICAgbWlzdGFrZTogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBpZiAoZGF0YS5oYXNBc3RyYWwgJiYgZGF0YS5oYXNBc3RyYWxbbWF0Y2hlcy50YXJnZXRdKVxyXG4gICAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IHdyb25nQnVmZihtYXRjaGVzLmFiaWxpdHkpIH07XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG5vQnVmZihtYXRjaGVzLmFiaWxpdHkpIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0U3UyBEYXJrc1xcJ3MgQ291cnNlJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiBbJzRDNjUnLCAnNEM2NicsICc0QzY3JywgJzRDNUEnLCAnNEM2MCddLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4gIWRhdGEuaGFzQXN0cmFsIHx8ICFkYXRhLmhhc0FzdHJhbFttYXRjaGVzLnRhcmdldF07XHJcbiAgICAgIH0sXHJcbiAgICAgIG1pc3Rha2U6IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEuaGFzVW1icmFsICYmIGRhdGEuaGFzVW1icmFsW21hdGNoZXMudGFyZ2V0XSlcclxuICAgICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiB3cm9uZ0J1ZmYobWF0Y2hlcy5hYmlsaXR5KSB9O1xyXG4gICAgICAgIC8vIFRoaXMgY2FzZSBpcyBwcm9iYWJseSBpbXBvc3NpYmxlLCBhcyB0aGUgZGVidWZmIHRpY2tzIGFmdGVyIGRlYXRoLFxyXG4gICAgICAgIC8vIGJ1dCBsZWF2aW5nIGl0IGhlcmUgaW4gY2FzZSB0aGVyZSdzIHNvbWUgcmV6IG9yIGRpc2Nvbm5lY3QgdGltaW5nXHJcbiAgICAgICAgLy8gdGhhdCBjb3VsZCBsZWFkIHRvIHRoaXMuXHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG5vQnVmZihtYXRjaGVzLmFiaWxpdHkpIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0U3UyBDcnVzYWRlIEtub2NrYmFjaycsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgLy8gNEM3NiBpcyB0aGUga25vY2tiYWNrIGRhbWFnZSwgNEM1OCBpcyB0aGUgZGFtYWdlIGZvciBzdGFuZGluZyBvbiB0aGUgcHVjay5cclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzRDNzYnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnS25vY2tlZCBvZmYnLFxyXG4gICAgICAgICAgICBkZTogJ1J1bnRlcmdlZmFsbGVuJyxcclxuICAgICAgICAgICAgZnI6ICdBIMOpdMOpIGFzc29tbcOpKGUpJyxcclxuICAgICAgICAgICAgamE6ICfjg47jg4Pjgq/jg5Djg4Pjgq8nLFxyXG4gICAgICAgICAgICBjbjogJ+WHu+mAgOWdoOiQvScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5FZGVuc1ZlcnNlUmVmdWxnZW5jZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnRThOIEJpdGluZyBGcm9zdCc6ICc0RERCJywgLy8gMjcwLWRlZ3JlZSBmcm9udGFsIEFvRSwgU2hpdmFcclxuICAgICdFOE4gRHJpdmluZyBGcm9zdCc6ICc0RERDJywgLy8gUmVhciBjb25lIEFvRSwgU2hpdmFcclxuICAgICdFOE4gRnJpZ2lkIFN0b25lJzogJzRFNjYnLCAvLyBTbWFsbCBzcHJlYWQgY2lyY2xlcywgcGhhc2UgMVxyXG4gICAgJ0U4TiBSZWZsZWN0ZWQgQXhlIEtpY2snOiAnNEUwMCcsIC8vIExhcmdlIGNpcmNsZSBBb0UsIEZyb3plbiBNaXJyb3JcclxuICAgICdFOE4gUmVmbGVjdGVkIFNjeXRoZSBLaWNrJzogJzRFMDEnLCAvLyBEb251dCBBb0UsIEZyb3plbiBNaXJyb3JcclxuICAgICdFOE4gRnJpZ2lkIEVydXB0aW9uJzogJzRFMDknLCAvLyBTbWFsbCBjaXJjbGUgQW9FIHB1ZGRsZXMsIHBoYXNlIDFcclxuICAgICdFOE4gSWNpY2xlIEltcGFjdCc6ICc0RTBBJywgLy8gTGFyZ2UgY2lyY2xlIEFvRSBwdWRkbGVzLCBwaGFzZSAxXHJcbiAgICAnRThOIEF4ZSBLaWNrJzogJzRERTInLCAvLyBMYXJnZSBjaXJjbGUgQW9FLCBTaGl2YVxyXG4gICAgJ0U4TiBTY3l0aGUgS2ljayc6ICc0REUzJywgLy8gRG9udXQgQW9FLCBTaGl2YVxyXG4gICAgJ0U4TiBSZWZsZWN0ZWQgQml0aW5nIEZyb3N0JzogJzRERkUnLCAvLyAyNzAtZGVncmVlIGZyb250YWwgQW9FLCBGcm96ZW4gTWlycm9yXHJcbiAgICAnRThOIFJlZmxlY3RlZCBEcml2aW5nIEZyb3N0JzogJzRERkYnLCAvLyBDb25lIEFvRSwgRnJvemVuIE1pcnJvclxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge30sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdFOE4gU2hpbmluZyBBcm1vcicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICc5NScgfSksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmVmZmVjdCB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFOE4gSGVhdmVubHkgU3RyaWtlJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnNEREOCcsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgZGVhdGhSZWFzb246IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdQdXNoZWQgb2ZmIScsXHJcbiAgICAgICAgICAgIGRlOiAnUnVudGVyIGdlc3Rvw59lbiEnLFxyXG4gICAgICAgICAgICBmcjogJ0Egw6l0w6kgcG91c3PDqShlKSAhJyxcclxuICAgICAgICAgICAgamE6ICfjg47jg4Pjgq/jg5Djg4Pjgq8nLFxyXG4gICAgICAgICAgICBjbjogJ+WHu+mAgOWdoOiQvScsXHJcbiAgICAgICAgICAgIGtvOiAn64SJ67Cx65CoIScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0U4TiBGcm9zdCBBcm1vcicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIC8vIFRoaW4gSWNlXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICczOEYnIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ1NsaWQgb2ZmIScsXHJcbiAgICAgICAgICAgIGRlOiAncnVudGVyZ2VydXRzY2h0IScsXHJcbiAgICAgICAgICAgIGZyOiAnQSBnbGlzc8OpKGUpICEnLFxyXG4gICAgICAgICAgICBqYTogJ+a7keOBo+OBnycsXHJcbiAgICAgICAgICAgIGNuOiAn5ruR6JC9JyxcclxuICAgICAgICAgICAga286ICfrr7jrgYTrn6zsp5AhJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gVE9ETzogcnVzaCBoaXR0aW5nIHRoZSBjcnlzdGFsXHJcbi8vIFRPRE86IGFkZHMgbm90IGJlaW5nIGtpbGxlZFxyXG4vLyBUT0RPOiB0YWtpbmcgdGhlIHJ1c2ggdHdpY2UgKHdoZW4geW91IGhhdmUgZGVidWZmKVxyXG4vLyBUT0RPOiBub3QgaGl0dGluZyB0aGUgZHJhZ29uIGZvdXIgdGltZXMgZHVyaW5nIHd5cm0ncyBsYW1lbnRcclxuLy8gVE9ETzogZGVhdGggcmVhc29ucyBmb3Igbm90IHBpY2tpbmcgdXAgcHVkZGxlXHJcbi8vIFRPRE86IG5vdCBiZWluZyBpbiB0aGUgdG93ZXIgd2hlbiB5b3Ugc2hvdWxkXHJcbi8vIFRPRE86IHBpY2tpbmcgdXAgdG9vIG1hbnkgc3RhY2tzXHJcblxyXG4vLyBOb3RlOiBCYW5pc2ggSUlJICg0REE4KSBhbmQgQmFuaXNoIElpaSBEaXZpZGVkICg0REE5KSBib3RoIGFyZSB0eXBlPTB4MTYgbGluZXMuXHJcbi8vIFRoZSBzYW1lIGlzIHRydWUgZm9yIEJhbmlzaCAoNERBNikgYW5kIEJhbmlzaCBEaXZpZGVkICg0REE3KS5cclxuLy8gSSdtIG5vdCBzdXJlIHRoaXMgbWFrZXMgYW55IHNlbnNlPyBCdXQgY2FuJ3QgdGVsbCBpZiB0aGUgc3ByZWFkIHdhcyBhIG1pc3Rha2Ugb3Igbm90LlxyXG4vLyBNYXliZSB3ZSBjb3VsZCBjaGVjayBmb3IgXCJNYWdpYyBWdWxuZXJhYmlsaXR5IFVwXCI/XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRWRlbnNWZXJzZVJlZnVsZ2VuY2VTYXZhZ2UsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0U4UyBCaXRpbmcgRnJvc3QnOiAnNEQ2NicsIC8vIDI3MC1kZWdyZWUgZnJvbnRhbCBBb0UsIFNoaXZhXHJcbiAgICAnRThTIERyaXZpbmcgRnJvc3QnOiAnNEQ2NycsIC8vIFJlYXIgY29uZSBBb0UsIFNoaXZhXHJcbiAgICAnRThTIEF4ZSBLaWNrJzogJzRENkQnLCAvLyBMYXJnZSBjaXJjbGUgQW9FLCBTaGl2YVxyXG4gICAgJ0U4UyBTY3l0aGUgS2ljayc6ICc0RDZFJywgLy8gRG9udXQgQW9FLCBTaGl2YVxyXG4gICAgJ0U4UyBSZWZsZWN0ZWQgQXhlIEtpY2snOiAnNERCOScsIC8vIExhcmdlIGNpcmNsZSBBb0UsIEZyb3plbiBNaXJyb3JcclxuICAgICdFOFMgUmVmbGVjdGVkIFNjeXRoZSBLaWNrJzogJzREQkEnLCAvLyBEb251dCBBb0UsIEZyb3plbiBNaXJyb3JcclxuICAgICdFOFMgRnJpZ2lkIEVydXB0aW9uJzogJzREOUYnLCAvLyBTbWFsbCBjaXJjbGUgQW9FIHB1ZGRsZXMsIHBoYXNlIDFcclxuICAgICdFOFMgRnJpZ2lkIE5lZWRsZSc6ICc0RDlEJywgLy8gOC13YXkgXCJmbG93ZXJcIiBleHBsb3Npb25cclxuICAgICdFOFMgSWNpY2xlIEltcGFjdCc6ICc0REEwJywgLy8gTGFyZ2UgY2lyY2xlIEFvRSBwdWRkbGVzLCBwaGFzZSAxXHJcbiAgICAnRThTIFJlZmxlY3RlZCBCaXRpbmcgRnJvc3QgMSc6ICc0REI3JywgLy8gMjcwLWRlZ3JlZSBmcm9udGFsIEFvRSwgRnJvemVuIE1pcnJvclxyXG4gICAgJ0U4UyBSZWZsZWN0ZWQgQml0aW5nIEZyb3N0IDInOiAnNERDMycsIC8vIDI3MC1kZWdyZWUgZnJvbnRhbCBBb0UsIEZyb3plbiBNaXJyb3JcclxuICAgICdFOFMgUmVmbGVjdGVkIERyaXZpbmcgRnJvc3QgMSc6ICc0REI4JywgLy8gQ29uZSBBb0UsIEZyb3plbiBNaXJyb3JcclxuICAgICdFOFMgUmVmbGVjdGVkIERyaXZpbmcgRnJvc3QgMic6ICc0REM0JywgLy8gQ29uZSBBb0UsIEZyb3plbiBNaXJyb3JcclxuXHJcbiAgICAnRThTIEhhbGxvd2VkIFdpbmdzIDEnOiAnNEQ3NScsIC8vIExlZnQgY2xlYXZlXHJcbiAgICAnRThTIEhhbGxvd2VkIFdpbmdzIDInOiAnNEQ3NicsIC8vIFJpZ2h0IGNsZWF2ZVxyXG4gICAgJ0U4UyBIYWxsb3dlZCBXaW5ncyAzJzogJzRENzcnLCAvLyBLbm9ja2JhY2sgZnJvbnRhbCBjbGVhdmVcclxuICAgICdFOFMgUmVmbGVjdGVkIEhhbGxvd2VkIFdpbmdzIDEnOiAnNEQ5MCcsIC8vIFJlZmxlY3RlZCBsZWZ0IDJcclxuICAgICdFOFMgUmVmbGVjdGVkIEhhbGxvd2VkIFdpbmdzIDInOiAnNERCQicsIC8vIFJlZmxlY3RlZCBsZWZ0IDFcclxuICAgICdFOFMgUmVmbGVjdGVkIEhhbGxvd2VkIFdpbmdzIDMnOiAnNERDNycsIC8vIFJlZmxlY3RlZCByaWdodCAyXHJcbiAgICAnRThTIFJlZmxlY3RlZCBIYWxsb3dlZCBXaW5ncyA0JzogJzREOTEnLCAvLyBSZWZsZWN0ZWQgcmlnaHQgMVxyXG4gICAgJ0U4UyBUd2luIFN0aWxsbmVzcyAxJzogJzRENjgnLFxyXG4gICAgJ0U4UyBUd2luIFN0aWxsbmVzcyAyJzogJzRENkInLFxyXG4gICAgJ0U4UyBUd2luIFNpbGVuY2UgMSc6ICc0RDY5JyxcclxuICAgICdFOFMgVHdpbiBTaWxlbmNlIDInOiAnNEQ2QScsXHJcbiAgICAnRThTIEFraCBSaGFpJzogJzREOTknLFxyXG4gICAgJ0U4UyBFbWJpdHRlcmVkIERhbmNlIDEnOiAnNEQ3MCcsXHJcbiAgICAnRThTIEVtYml0dGVyZWQgRGFuY2UgMic6ICc0RDcxJyxcclxuICAgICdFOFMgU3BpdGVmdWwgRGFuY2UgMSc6ICc0RDZGJyxcclxuICAgICdFOFMgU3BpdGVmdWwgRGFuY2UgMic6ICc0RDcyJyxcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgIC8vIEJyb2tlbiB0ZXRoZXIuXHJcbiAgICAnRThTIFJlZnVsZ2VudCBGYXRlJzogJzREQTQnLFxyXG4gICAgLy8gU2hhcmVkIG9yYiwgY29ycmVjdCBpcyBCcmlnaHQgUHVsc2UgKDREOTUpXHJcbiAgICAnRThTIEJsaW5kaW5nIFB1bHNlJzogJzREOTYnLFxyXG4gIH0sXHJcbiAgc2hhcmVGYWlsOiB7XHJcbiAgICAnRThTIFBhdGggb2YgTGlnaHQnOiAnNERBMScsIC8vIFByb3RlYW5cclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRThTIFNoaW5pbmcgQXJtb3InLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICAvLyBTdHVuXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICc5NScgfSksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmVmZmVjdCB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gSW50ZXJydXB0XHJcbiAgICAgIGlkOiAnRThTIFN0b25lc2tpbicsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnNEQ4NScgfSksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5FZGVuc1Byb21pc2VVbWJyYSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnRTlOIFRoZSBBcnQgT2YgRGFya25lc3MgMSc6ICc1MjIzJywgLy8gbGVmdC1yaWdodCBjbGVhdmVcclxuICAgICdFOU4gVGhlIEFydCBPZiBEYXJrbmVzcyAyJzogJzUyMjQnLCAvLyBsZWZ0LXJpZ2h0IGNsZWF2ZVxyXG4gICAgJ0U5TiBXaWRlLUFuZ2xlIFBhcnRpY2xlIEJlYW0nOiAnNUFGRicsIC8vIGZyb250YWwgY2xlYXZlIHR1dG9yaWFsIG1lY2hhbmljXHJcbiAgICAnRTlOIFdpZGUtQW5nbGUgUGhhc2VyJzogJzU1RTEnLCAvLyB3aWRlLWFuZ2xlIFwic2lkZXNcIlxyXG4gICAgJ0U5TiBCYWQgVmlicmF0aW9ucyc6ICc1NUU2JywgLy8gdGV0aGVyZWQgb3V0c2lkZSBnaWFudCB0cmVlIGdyb3VuZCBhb2VzXHJcbiAgICAnRTlOIEVhcnRoLVNoYXR0ZXJpbmcgUGFydGljbGUgQmVhbSc6ICc1MjI1JywgLy8gbWlzc2luZyB0b3dlcnM/XHJcbiAgICAnRTlOIEFudGktQWlyIFBhcnRpY2xlIEJlYW0nOiAnNTVEQycsIC8vIFwiZ2V0IG91dFwiIGR1cmluZyBwYW5lbHNcclxuICAgICdFOU4gWmVyby1Gb3JtIFBhcnRpY2xlIEJlYW0gMic6ICc1NURCJywgLy8gQ2xvbmUgbGluZSBhb2VzIHcvIEFudGktQWlyIFBhcnRpY2xlIEJlYW1cclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdFOU4gV2l0aGRyYXcnOiAnNTUzNCcsIC8vIFNsb3cgdG8gYnJlYWsgc2VlZCBjaGFpbiwgZ2V0IHN1Y2tlZCBiYWNrIGluIHlpa2VzXHJcbiAgICAnRTlOIEFldGhlcm9zeW50aGVzaXMnOiAnNTUzNScsIC8vIFN0YW5kaW5nIG9uIHNlZWRzIGR1cmluZyBleHBsb3Npb24gKHBvc3NpYmx5IHZpYSBXaXRoZHJhdylcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0U5TiBaZXJvLUZvcm0gUGFydGljbGUgQmVhbSAxJzogJzU1RUInLCAvLyB0YW5rIGxhc2VyIHdpdGggbWFya2VyXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gVE9ETzogNTYxRCBFdmlsIFNlZWQgaGl0cyBldmVyeW9uZSwgaGFyZCB0byBrbm93IGlmIHRoZXJlJ3MgYSBkb3VibGUgdGFwXHJcbi8vIFRPRE86IGZhbGxpbmcgdGhyb3VnaCBwYW5lbCBqdXN0IGRvZXMgZGFtYWdlIHdpdGggbm8gYWJpbGl0eSBuYW1lLCBsaWtlIGEgZGVhdGggd2FsbFxyXG4vLyBUT0RPOiB3aGF0IGhhcHBlbnMgaWYgeW91IGp1bXAgaW4gc2VlZCB0aG9ybnM/XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRWRlbnNQcm9taXNlVW1icmFTYXZhZ2UsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0U5UyBCYWQgVmlicmF0aW9ucyc6ICc1NjFDJywgLy8gdGV0aGVyZWQgb3V0c2lkZSBnaWFudCB0cmVlIGdyb3VuZCBhb2VzXHJcbiAgICAnRTlTIFdpZGUtQW5nbGUgUGFydGljbGUgQmVhbSc6ICc1QjAwJywgLy8gYW50aS1haXIgXCJzaWRlc1wiXHJcbiAgICAnRTlTIFdpZGUtQW5nbGUgUGhhc2VyIFVubGltaXRlZCc6ICc1NjBFJywgLy8gd2lkZS1hbmdsZSBcInNpZGVzXCJcclxuICAgICdFOVMgQW50aS1BaXIgUGFydGljbGUgQmVhbSc6ICc1QjAxJywgLy8gd2lkZS1hbmdsZSBcIm91dFwiXHJcbiAgICAnRTlTIFRoZSBTZWNvbmQgQXJ0IE9mIERhcmtuZXNzIDEnOiAnNTYwMScsIC8vIGxlZnQtcmlnaHQgY2xlYXZlXHJcbiAgICAnRTlTIFRoZSBTZWNvbmQgQXJ0IE9mIERhcmtuZXNzIDInOiAnNTYwMicsIC8vIGxlZnQtcmlnaHQgY2xlYXZlXHJcbiAgICAnRTlTIFRoZSBBcnQgT2YgRGFya25lc3MgMSc6ICc1QTk1JywgLy8gYm9zcyBsZWZ0LXJpZ2h0IHN1bW1vbi9wYW5lbCBjbGVhdmVcclxuICAgICdFOVMgVGhlIEFydCBPZiBEYXJrbmVzcyAyJzogJzVBOTYnLCAvLyBib3NzIGxlZnQtcmlnaHQgc3VtbW9uL3BhbmVsIGNsZWF2ZVxyXG4gICAgJ0U5UyBUaGUgQXJ0IE9mIERhcmtuZXNzIENsb25lIDEnOiAnNTYxRScsIC8vIGNsb25lIGxlZnQtcmlnaHQgc3VtbW9uIGNsZWF2ZVxyXG4gICAgJ0U5UyBUaGUgQXJ0IE9mIERhcmtuZXNzIENsb25lIDInOiAnNTYxRicsIC8vIGNsb25lIGxlZnQtcmlnaHQgc3VtbW9uIGNsZWF2ZVxyXG4gICAgJ0U5UyBUaGUgVGhpcmQgQXJ0IE9mIERhcmtuZXNzIDEnOiAnNTYwMycsIC8vIHRoaXJkIGFydCBsZWZ0LXJpZ2h0IGNsZWF2ZSBpbml0aWFsXHJcbiAgICAnRTlTIFRoZSBUaGlyZCBBcnQgT2YgRGFya25lc3MgMic6ICc1NjA0JywgLy8gdGhpcmQgYXJ0IGxlZnQtcmlnaHQgY2xlYXZlIGluaXRpYWxcclxuICAgICdFOVMgQXJ0IE9mIERhcmtuZXNzJzogJzU2MDYnLCAvLyB0aGlyZCBhcnQgbGVmdC1yaWdodCBjbGVhdmUgZmluYWxcclxuICAgICdFOVMgRnVsbC1QZXJpbWl0ZXIgUGFydGljbGUgQmVhbSc6ICc1NjI5JywgLy8gcGFuZWwgXCJnZXQgaW5cIlxyXG4gICAgJ0U5UyBEYXJrIENoYWlucyc6ICc1RkFDJywgLy8gU2xvdyB0byBicmVhayBwYXJ0bmVyIGNoYWluc1xyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ0U5UyBXaXRoZHJhdyc6ICc1NjFBJywgLy8gU2xvdyB0byBicmVhayBzZWVkIGNoYWluLCBnZXQgc3Vja2VkIGJhY2sgaW4geWlrZXNcclxuICAgICdFOVMgQWV0aGVyb3N5bnRoZXNpcyc6ICc1NjFCJywgLy8gU3RhbmRpbmcgb24gc2VlZHMgZHVyaW5nIGV4cGxvc2lvbiAocG9zc2libHkgdmlhIFdpdGhkcmF3KVxyXG4gIH0sXHJcbiAgZ2FpbnNFZmZlY3RXYXJuOiB7XHJcbiAgICAnRTlTIFN0eWdpYW4gVGVuZHJpbHMnOiAnOTUyJywgLy8gc3RhbmRpbmcgaW4gdGhlIGJyYW1ibGVzXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdFOVMgSHlwZXItRm9jdXNlZCBQYXJ0aWNsZSBCZWFtJzogJzU1RkQnLCAvLyBBcnQgT2YgRGFya25lc3MgcHJvdGVhblxyXG4gIH0sXHJcbiAgc2hhcmVGYWlsOiB7XHJcbiAgICAnRTlTIENvbmRlbnNlZCBXaWRlLUFuZ2xlIFBhcnRpY2xlIEJlYW0nOiAnNTYxMCcsIC8vIHdpZGUtYW5nbGUgXCJ0YW5rIGxhc2VyXCJcclxuICB9LFxyXG4gIHNvbG9XYXJuOiB7XHJcbiAgICAnRTlTIE11bHRpLVByb25nZWQgUGFydGljbGUgQmVhbSc6ICc1NjAwJywgLy8gQXJ0IE9mIERhcmtuZXNzIFBhcnRuZXIgU3RhY2tcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIC8vIEFudGktYWlyIFwidGFuayBzcHJlYWRcIi4gIFRoaXMgY2FuIGJlIHN0YWNrZWQgYnkgdHdvIHRhbmtzIGludnVsbmluZy5cclxuICAgICAgLy8gTm90ZTogdGhpcyB3aWxsIHN0aWxsIHNob3cgc29tZXRoaW5nIGZvciBob2xtZ2FuZy9saXZpbmcsIGJ1dFxyXG4gICAgICAvLyBhcmd1YWJseSBhIGhlYWxlciBtaWdodCBuZWVkIHRvIGRvIHNvbWV0aGluZyBhYm91dCB0aGF0LCBzbyBtYXliZVxyXG4gICAgICAvLyBpdCdzIG9rIHRvIHN0aWxsIHNob3cgYXMgYSB3YXJuaW5nPz9cclxuICAgICAgaWQ6ICdFOVMgQ29uZGVuc2VkIEFudGktQWlyIFBhcnRpY2xlIEJlYW0nLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgdHlwZTogJzIyJywgaWQ6ICc1NjE1JywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiBkYXRhLkRhbWFnZUZyb21NYXRjaGVzKG1hdGNoZXMpID4gMCxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gQW50aS1haXIgXCJvdXRcIi4gIFRoaXMgY2FuIGJlIGludnVsbmVkIGJ5IGEgdGFuayBhbG9uZyB3aXRoIHRoZSBzcHJlYWQgYWJvdmUuXHJcbiAgICAgIGlkOiAnRTlTIEFudGktQWlyIFBoYXNlciBVbmxpbWl0ZWQnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICc1NjEyJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiBkYXRhLkRhbWFnZUZyb21NYXRjaGVzKG1hdGNoZXMpID4gMCxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkVkZW5zUHJvbWlzZUxpdGFueSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnRTEwTiBGb3J3YXJkIEltcGxvc2lvbic6ICc1NkI0JywgLy8gaG93bCBib3NzIGltcGxvc2lvblxyXG4gICAgJ0UxME4gRm9yd2FyZCBTaGFkb3cgSW1wbG9zaW9uJzogJzU2QjUnLCAvLyBob3dsIHNoYWRvdyBpbXBsb3Npb25cclxuICAgICdFMTBOIEJhY2t3YXJkIEltcGxvc2lvbic6ICc1NkI3JywgLy8gdGFpbCBib3NzIGltcGxvc2lvblxyXG4gICAgJ0UxME4gQmFja3dhcmQgU2hhZG93IEltcGxvc2lvbic6ICc1NkI4JywgLy8gdGFpbCBzaGFkb3cgaW1wbG9zaW9uXHJcbiAgICAnRTEwTiBCYXJicyBPZiBBZ29ueSAxJzogJzU2RDknLCAvLyBTaGFkb3cgV2FycmlvciAzIGRvZyByb29tIGNsZWF2ZVxyXG4gICAgJ0UxME4gQmFyYnMgT2YgQWdvbnkgMic6ICc1QjI2JywgLy8gU2hhZG93IFdhcnJpb3IgMyBkb2cgcm9vbSBjbGVhdmVcclxuICAgICdFMTBOIENsb2FrIE9mIFNoYWRvd3MnOiAnNUIxMScsIC8vIG5vbi1zcXVpZ2dseSBsaW5lIGV4cGxvc2lvbnNcclxuICAgICdFMTBOIFRocm9uZSBPZiBTaGFkb3cnOiAnNTZDNycsIC8vIHN0YW5kaW5nIHVwIGdldCBvdXRcclxuICAgICdFMTBOIFJpZ2h0IEdpZ2EgU2xhc2gnOiAnNTZBRScsIC8vIGJvc3MgcmlnaHQgZ2lnYSBzbGFzaFxyXG4gICAgJ0UxME4gUmlnaHQgU2hhZG93IFNsYXNoJzogJzU2QUYnLCAvLyBnaWdhIHNsYXNoIGZyb20gc2hhZG93XHJcbiAgICAnRTEwTiBMZWZ0IEdpZ2EgU2xhc2gnOiAnNTZCMScsIC8vIGJvc3MgbGVmdCBnaWdhIHNsYXNoXHJcbiAgICAnRTEwTiBMZWZ0IFNoYWRvdyBTbGFzaCc6ICc1NkJEJywgLy8gZ2lnYSBzbGFzaCBmcm9tIHNoYWRvd1xyXG4gICAgJ0UxME4gU2hhZG93eSBFcnVwdGlvbic6ICc1NkUxJywgLy8gYmFpdGVkIGdyb3VuZCBhb2UgbWFya2VycyBwYWlyZWQgd2l0aCBiYXJic1xyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnRTEwTiBTaGFkb3dcXCdzIEVkZ2UnOiAnNTZEQicsIC8vIFRhbmtidXN0ZXIgc2luZ2xlIHRhcmdldCBmb2xsb3d1cFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFRPRE86IGhpdHRpbmcgc2hhZG93IG9mIHRoZSBoZXJvIHdpdGggYWJpbGl0aWVzIGNhbiBjYXVzZSB5b3UgdG8gdGFrZSBkYW1hZ2UsIGxpc3QgdGhvc2U/XHJcbi8vICAgICAgIGUuZy4gcGlja2luZyB1cCB5b3VyIGZpcnN0IHBpdGNoIGJvZyBwdWRkbGUgd2lsbCBjYXVzZSB5b3UgdG8gZGllIHRvIHRoZSBkYW1hZ2VcclxuLy8gICAgICAgeW91ciBzaGFkb3cgdGFrZXMgZnJvbSBEZWVwc2hhZG93IE5vdmEgb3IgRGlzdGFudCBTY3JlYW0uXHJcbi8vIFRPRE86IDU3M0IgQmxpZ2h0aW5nIEJsaXR6IGlzc3VlcyBkdXJpbmcgbGltaXQgY3V0IG51bWJlcnNcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5FZGVuc1Byb21pc2VMaXRhbnlTYXZhZ2UsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0UxMFMgSW1wbG9zaW9uIFNpbmdsZSAxJzogJzU2RjInLCAvLyBzaW5nbGUgdGFpbCB1cCBzaGFkb3cgaW1wbG9zaW9uXHJcbiAgICAnRTEwUyBJbXBsb3Npb24gU2luZ2xlIDInOiAnNTZFRicsIC8vIHNpbmdsZSBob3dsIHNoYWRvdyBpbXBsb3Npb25cclxuICAgICdFMTBTIEltcGxvc2lvbiBRdWFkcnVwbGUgMSc6ICc1NkVGJywgLy8gcXVhZHJ1cGxlIHNldCBvZiBzaGFkb3cgaW1wbG9zaW9uc1xyXG4gICAgJ0UxMFMgSW1wbG9zaW9uIFF1YWRydXBsZSAyJzogJzU2RjInLCAvLyBxdWFkcnVwbGUgc2V0IG9mIHNoYWRvdyBpbXBsb3Npb25zXHJcbiAgICAnRTEwUyBHaWdhIFNsYXNoIFNpbmdsZSAxJzogJzU2RUMnLCAvLyBHaWdhIHNsYXNoIHNpbmdsZSBmcm9tIHNoYWRvd1xyXG4gICAgJ0UxMFMgR2lnYSBTbGFzaCBTaW5nbGUgMic6ICc1NkVEJywgLy8gR2lnYSBzbGFzaCBzaW5nbGUgZnJvbSBzaGFkb3dcclxuICAgICdFMTBTIEdpZ2EgU2xhc2ggQm94IDEnOiAnNTcwOScsIC8vIEdpZ2Egc2xhc2ggYm94IGZyb20gZm91ciBncm91bmQgc2hhZG93c1xyXG4gICAgJ0UxMFMgR2lnYSBTbGFzaCBCb3ggMic6ICc1NzBEJywgLy8gR2lnYSBzbGFzaCBib3ggZnJvbSBmb3VyIGdyb3VuZCBzaGFkb3dzXHJcbiAgICAnRTEwUyBHaWdhIFNsYXNoIFF1YWRydXBsZSAxJzogJzU2RUMnLCAvLyBxdWFkcnVwbGUgc2V0IG9mIGdpZ2Egc2xhc2ggY2xlYXZlc1xyXG4gICAgJ0UxMFMgR2lnYSBTbGFzaCBRdWFkcnVwbGUgMic6ICc1NkU5JywgLy8gcXVhZHJ1cGxlIHNldCBvZiBnaWdhIHNsYXNoIGNsZWF2ZXNcclxuICAgICdFMTBTIENsb2FrIE9mIFNoYWRvd3MgMSc6ICc1QjEzJywgLy8gaW5pdGlhbCBub24tc3F1aWdnbHkgbGluZSBleHBsb3Npb25zXHJcbiAgICAnRTEwUyBDbG9hayBPZiBTaGFkb3dzIDInOiAnNUIxNCcsIC8vIHNlY29uZCBzcXVpZ2dseSBsaW5lIGV4cGxvc2lvbnNcclxuICAgICdFMTBTIFRocm9uZSBPZiBTaGFkb3cnOiAnNTcxNycsIC8vIHN0YW5kaW5nIHVwIGdldCBvdXRcclxuICAgICdFMTBTIFNoYWRvd3kgRXJ1cHRpb24nOiAnNTczOCcsIC8vIGJhaXRlZCBncm91bmQgYW9lIGR1cmluZyBhbXBsaWZpZXJcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdFMTBTIFN3YXRoIE9mIFNpbGVuY2UgMSc6ICc1NzFBJywgLy8gU2hhZG93IGNsb25lIGNsZWF2ZSAodG9vIGNsb3NlKVxyXG4gICAgJ0UxMFMgU3dhdGggT2YgU2lsZW5jZSAyJzogJzVCQkYnLCAvLyBTaGFkb3cgY2xvbmUgY2xlYXZlICh0aW1lZClcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0UxMFMgU2hhZGVmaXJlJzogJzU3MzInLCAvLyBwdXJwbGUgdGFuayB1bWJyYWwgb3Jic1xyXG4gICAgJ0UxMFMgUGl0Y2ggQm9nJzogJzU3MjInLCAvLyBtYXJrZXIgc3ByZWFkIHRoYXQgZHJvcHMgYSBzaGFkb3cgcHVkZGxlXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgICdFMTBTIFNoYWRvd1xcJ3MgRWRnZSc6ICc1NzI1JywgLy8gVGFua2J1c3RlciBzaW5nbGUgdGFyZ2V0IGZvbGxvd3VwXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ0UxMFMgRGFtYWdlIERvd24gT3JicycsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgc291cmNlOiAnRmxhbWVzaGFkb3cnLCBlZmZlY3RJZDogJzgyQycgfSksXHJcbiAgICAgIG5ldFJlZ2V4RGU6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBzb3VyY2U6ICdTY2hhdHRlbmZsYW1tZScsIGVmZmVjdElkOiAnODJDJyB9KSxcclxuICAgICAgbmV0UmVnZXhGcjogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IHNvdXJjZTogJ0ZsYW1tZSBvbWJyYWxlJywgZWZmZWN0SWQ6ICc4MkMnIH0pLFxyXG4gICAgICBuZXRSZWdleEphOiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgc291cmNlOiAn44K344Oj44OJ44Km44OV44Os44Kk44OgJywgZWZmZWN0SWQ6ICc4MkMnIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnZGFtYWdlJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBgJHttYXRjaGVzLmVmZmVjdH0gKHBhcnRpYWwgc3RhY2spYCB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFMTBTIERhbWFnZSBEb3duIEJvc3MnLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICAvLyBTaGFja2xlcyBiZWluZyBtZXNzZWQgdXAgYXBwZWFyIHRvIGp1c3QgZ2l2ZSB0aGUgRGFtYWdlIERvd24sIHdpdGggbm90aGluZyBlbHNlLlxyXG4gICAgICAvLyBNZXNzaW5nIHVwIHRvd2VycyBpcyB0aGUgVGhyaWNlLUNvbWUgUnVpbiBlZmZlY3QgKDlFMiksIGJ1dCBhbHNvIERhbWFnZSBEb3duLlxyXG4gICAgICAvLyBUT0RPOiBzb21lIG9mIHRoZXNlIHdpbGwgYmUgZHVwbGljYXRlZCB3aXRoIG90aGVycywgbGlrZSBgRTEwUyBUaHJvbmUgT2YgU2hhZG93YC5cclxuICAgICAgLy8gTWF5YmUgaXQnZCBiZSBuaWNlIHRvIGZpZ3VyZSBvdXQgaG93IHRvIHB1dCB0aGUgZGFtYWdlIG1hcmtlciBvbiB0aGF0P1xyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IHNvdXJjZTogJ1NoYWRvd2tlZXBlcicsIGVmZmVjdElkOiAnODJDJyB9KSxcclxuICAgICAgbmV0UmVnZXhEZTogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IHNvdXJjZTogJ1NjaGF0dGVua8O2bmlnJywgZWZmZWN0SWQ6ICc4MkMnIH0pLFxyXG4gICAgICBuZXRSZWdleEZyOiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgc291cmNlOiAnUm9pIERlIExcXCdPbWJyZScsIGVmZmVjdElkOiAnODJDJyB9KSxcclxuICAgICAgbmV0UmVnZXhKYTogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IHNvdXJjZTogJ+W9seOBrueOiycsIGVmZmVjdElkOiAnODJDJyB9KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2RhbWFnZScsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogYCR7bWF0Y2hlcy5lZmZlY3R9YCB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gU2hhZG93IFdhcnJpb3IgNCBkb2cgcm9vbSBjbGVhdmVcclxuICAgICAgLy8gVGhpcyBjYW4gYmUgbWl0aWdhdGVkIGJ5IHRoZSB3aG9sZSBncm91cCwgc28gYWRkIGEgZGFtYWdlIGNvbmRpdGlvbi5cclxuICAgICAgaWQ6ICdFMTBTIEJhcmJzIE9mIEFnb255JyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiBbJzU3MkEnLCAnNUIyNyddLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IGRhdGEuRGFtYWdlRnJvbU1hdGNoZXMobWF0Y2hlcykgPiAwLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5FZGVuc1Byb21pc2VBbmFtb3JwaG9zaXMsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0UxMU4gQnVybnQgU3RyaWtlIExpZ2h0bmluZyc6ICc1NjJFJywgLy8gTGluZSBjbGVhdmVcclxuICAgICdFMTFOIEJ1cm50IFN0cmlrZSBGaXJlJzogJzU2MkMnLCAvLyBMaW5lIGNsZWF2ZVxyXG4gICAgJ0UxMU4gQnVybnQgU3RyaWtlIEhvbHknOiAnNTYzMCcsIC8vIExpbmUgY2xlYXZlXHJcbiAgICAnRTExTiBCdXJub3V0JzogJzU2MkYnLCAvLyBCdXJudCBTdHJpa2UgbGlnaHRuaW5nIGV4cGFuc2lvblxyXG4gICAgJ0UxMU4gU2hpbmluZyBCbGFkZSc6ICc1NjMxJywgLy8gQmFpdGVkIGV4cGxvc2lvblxyXG4gICAgJ0UxMU4gSGFsbyBPZiBGbGFtZSBCcmlnaHRmaXJlJzogJzU2M0InLCAvLyBSZWQgY2lyY2xlIGludGVybWlzc2lvbiBleHBsb3Npb25cclxuICAgICdFMTFOIEhhbG8gT2YgTGV2aW4gQnJpZ2h0ZmlyZSc6ICc1NjNDJywgLy8gQmx1ZSBjaXJjbGUgaW50ZXJtaXNzaW9uIGV4cGxvc2lvblxyXG4gICAgJ0UxMU4gUmVzb3VuZGluZyBDcmFjayc6ICc1NjREJywgLy8gRGVtaS1HdWt1bWF0eiAyNzAgZGVncmVlIGZyb250YWwgY2xlYXZlXHJcbiAgICAnRTExTiBJbWFnZSBCdXJudCBTdHJpa2UgTGlnaHRuaW5nJzogJzU2NDUnLCAvLyBGYXRlIEJyZWFrZXIncyBJbWFnZSBsaW5lIGNsZWF2ZVxyXG4gICAgJ0UxMU4gSW1hZ2UgQnVybnQgU3RyaWtlIEZpcmUnOiAnNTY0MycsIC8vIEZhdGUgQnJlYWtlcidzIEltYWdlIGxpbmUgY2xlYXZlXHJcbiAgICAnRTExTiBJbWFnZSBCdXJub3V0JzogJzU2NDYnLCAvLyBGYXRlIEJyZWFrZXIncyBJbWFnZSBsaWdodG5pbmcgZXhwYW5zaW9uXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnRTExTiBCbGFzdGluZyBab25lJzogJzU2M0UnLCAvLyBQcmlzbWF0aWMgRGVjZXB0aW9uIGNoYXJnZXNcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0UxMU4gQnVybiBNYXJrJzogJzU2NEYnLCAvLyBQb3dkZXIgTWFyayBkZWJ1ZmYgZXhwbG9zaW9uXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ0UxMU4gQmxhc3RidXJuIEtub2NrZWQgT2ZmJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICAvLyA1NjJEID0gQnVybnQgU3RyaWtlIGZpcmUgZm9sbG93dXAgZHVyaW5nIG1vc3Qgb2YgdGhlIGZpZ2h0XHJcbiAgICAgIC8vIDU2NDQgPSBzYW1lIHRoaW5nLCBidXQgZnJvbSBGYXRlYnJlYWtlcidzIEltYWdlXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogWyc1NjJEJywgJzU2NDQnXSB9KSxcclxuICAgICAgZGVhdGhSZWFzb246IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdLbm9ja2VkIG9mZicsXHJcbiAgICAgICAgICAgIGRlOiAnUnVudGVyZ2VmYWxsZW4nLFxyXG4gICAgICAgICAgICBmcjogJ0Egw6l0w6kgYXNzb21tw6koZSknLFxyXG4gICAgICAgICAgICBqYTogJ+ODjuODg+OCr+ODkOODg+OCrycsXHJcbiAgICAgICAgICAgIGNuOiAn5Ye76YCA5Z2g6JC9JyxcclxuICAgICAgICAgICAga286ICfrhInrsLEnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyA1NjVBLzU2OEQgU2luc21va2UgQm91bmQgT2YgRmFpdGggc2hhcmVcclxuLy8gNTY1RS81Njk5IEJvd3Nob2NrIGhpdHMgdGFyZ2V0IG9mIDU2NUQgKHR3aWNlKSBhbmQgdHdvIG90aGVyc1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkVkZW5zUHJvbWlzZUFuYW1vcnBob3Npc1NhdmFnZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnRTExUyBCdXJudCBTdHJpa2UgRmlyZSc6ICc1NjUyJywgLy8gTGluZSBjbGVhdmVcclxuICAgICdFMTFTIEJ1cm50IFN0cmlrZSBMaWdodG5pbmcnOiAnNTY1NCcsIC8vIExpbmUgY2xlYXZlXHJcbiAgICAnRTExUyBCdXJudCBTdHJpa2UgSG9seSc6ICc1NjU2JywgLy8gTGluZSBjbGVhdmVcclxuICAgICdFMTFTIFNoaW5pbmcgQmxhZGUnOiAnNTY1NycsIC8vIEJhaXRlZCBleHBsb3Npb25cclxuICAgICdFMTFTIEJ1cm50IFN0cmlrZSBDeWNsZSBGaXJlJzogJzU2OEUnLCAvLyBMaW5lIGNsZWF2ZSBkdXJpbmcgQ3ljbGVcclxuICAgICdFMTFTIEJ1cm50IFN0cmlrZSBDeWNsZSBMaWdodG5pbmcnOiAnNTY5NScsIC8vIExpbmUgY2xlYXZlIGR1cmluZyBDeWNsZVxyXG4gICAgJ0UxMVMgQnVybnQgU3RyaWtlIEN5Y2xlIEhvbHknOiAnNTY5RCcsIC8vIExpbmUgY2xlYXZlIGR1cmluZyBDeWNsZVxyXG4gICAgJ0UxMVMgU2hpbmluZyBCbGFkZSBDeWNsZSc6ICc1NjlFJywgLy8gQmFpdGVkIGV4cGxvc2lvbiBkdXJpbmcgQ3ljbGVcclxuICAgICdFMTFTIEhhbG8gT2YgRmxhbWUgQnJpZ2h0ZmlyZSc6ICc1NjZEJywgLy8gUmVkIGNpcmNsZSBpbnRlcm1pc3Npb24gZXhwbG9zaW9uXHJcbiAgICAnRTExUyBIYWxvIE9mIExldmluIEJyaWdodGZpcmUnOiAnNTY2QycsIC8vIEJsdWUgY2lyY2xlIGludGVybWlzc2lvbiBleHBsb3Npb25cclxuICAgICdFMTFTIFBvcnRhbCBPZiBGbGFtZSBCcmlnaHQgUHVsc2UnOiAnNTY3MScsIC8vIFJlZCBjYXJkIGludGVybWlzc2lvbiBleHBsb3Npb25cclxuICAgICdFMTFTIFBvcnRhbCBPZiBMZXZpbiBCcmlnaHQgUHVsc2UnOiAnNTY3MCcsIC8vIEJsdWUgY2FyZCBpbnRlcm1pc3Npb24gZXhwbG9zaW9uXHJcbiAgICAnRTExUyBSZXNvbmFudCBXaW5kcyc6ICc1Njg5JywgLy8gRGVtaS1HdWt1bWF0eiBcImdldCBpblwiXHJcbiAgICAnRTExUyBSZXNvdW5kaW5nIENyYWNrJzogJzU2ODgnLCAvLyBEZW1pLUd1a3VtYXR6IDI3MCBkZWdyZWUgZnJvbnRhbCBjbGVhdmVcclxuICAgICdFMTFTIEltYWdlIEJ1cm50IFN0cmlrZSBMaWdodG5pbmcnOiAnNTY3QicsIC8vIEZhdGUgQnJlYWtlcidzIEltYWdlIGxpbmUgY2xlYXZlXHJcbiAgICAnRTExTiBJbWFnZSBCdXJub3V0JzogJzU2N0MnLCAvLyBGYXRlIEJyZWFrZXIncyBJbWFnZSBsaWdodG5pbmcgZXhwYW5zaW9uXHJcbiAgICAnRTExTiBJbWFnZSBCdXJudCBTdHJpa2UgRmlyZSc6ICc1Njc5JywgLy8gRmF0ZSBCcmVha2VyJ3MgSW1hZ2UgbGluZSBjbGVhdmVcclxuICAgICdFMTFOIEltYWdlIEJ1cm50IFN0cmlrZSBIb2x5JzogJzU2N0InLCAvLyBGYXRlIEJyZWFrZXIncyBJbWFnZSBsaW5lIGNsZWF2ZVxyXG4gICAgJ0UxMU4gSW1hZ2UgU2hpbmluZyBCbGFkZSc6ICc1NjdFJywgLy8gRmF0ZSBCcmVha2VyJ3MgSW1hZ2UgYmFpdGVkIGV4cGxvc2lvblxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ0UxMVMgQnVybm91dCc6ICc1NjU1JywgLy8gQnVybnQgU3RyaWtlIGxpZ2h0bmluZyBleHBhbnNpb25cclxuICAgICdFMTFTIEJ1cm5vdXQgQ3ljbGUnOiAnNTY5NicsIC8vIEJ1cm50IFN0cmlrZSBsaWdodG5pbmcgZXhwYW5zaW9uXHJcbiAgICAnRTExUyBCbGFzdGluZyBab25lJzogJzU2NzQnLCAvLyBQcmlzbWF0aWMgRGVjZXB0aW9uIGNoYXJnZXNcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0UxMVMgRWxlbWVudGFsIEJyZWFrJzogJzU2NjQnLCAvLyBFbGVtZW50YWwgQnJlYWsgcHJvdGVhblxyXG4gICAgJ0UxMVMgRWxlbWVudGFsIEJyZWFrIEN5Y2xlJzogJzU2OEMnLCAvLyBFbGVtZW50YWwgQnJlYWsgcHJvdGVhbiBkdXJpbmcgQ3ljbGVcclxuICAgICdFMTFTIFNpbnNtaXRlJzogJzU2NjcnLCAvLyBMaWdodG5pbmcgRWxlbWVudGFsIEJyZWFrIHNwcmVhZFxyXG4gICAgJ0UxMVMgU2luc21pdGUgQ3ljbGUnOiAnNTY5NCcsIC8vIExpZ2h0bmluZyBFbGVtZW50YWwgQnJlYWsgc3ByZWFkIGR1cmluZyBDeWNsZVxyXG4gIH0sXHJcbiAgc2hhcmVGYWlsOiB7XHJcbiAgICAnRTExUyBCdXJuIE1hcmsnOiAnNTZBMycsIC8vIFBvd2RlciBNYXJrIGRlYnVmZiBleHBsb3Npb25cclxuICAgICdFMTFTIFNpbnNpZ2h0IDEnOiAnNTY2MScsIC8vIEhvbHkgQm91bmQgT2YgRmFpdGggdGV0aGVyXHJcbiAgICAnRTExUyBTaW5zaWdodCAyJzogJzVCQzcnLCAvLyBIb2x5IEJvdW5kIE9mIEZhaXRoIHRldGhlciBmcm9tIEZhdGVicmVha2VyJ3MgSW1hZ2VcclxuICAgICdFMTFTIFNpbnNpZ2h0IDMnOiAnNTZBMCcsIC8vIEhvbHkgQm91bmQgT2YgRmFpdGggdGV0aGVyIGR1cmluZyBDeWNsZVxyXG4gIH0sXHJcbiAgc29sb0ZhaWw6IHtcclxuICAgICdFMTFTIEhvbHkgU2luc2lnaHQgR3JvdXAgU2hhcmUnOiAnNTY2OScsXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ0UxMVMgQmxhc3RidXJuIEtub2NrZWQgT2ZmJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICAvLyA1NjUzID0gQnVybnQgU3RyaWtlIGZpcmUgZm9sbG93dXAgZHVyaW5nIG1vc3Qgb2YgdGhlIGZpZ2h0XHJcbiAgICAgIC8vIDU2N0EgPSBzYW1lIHRoaW5nLCBidXQgZnJvbSBGYXRlYnJlYWtlcidzIEltYWdlXHJcbiAgICAgIC8vIDU2OEYgPSBzYW1lIHRoaW5nLCBidXQgZHVyaW5nIEN5Y2xlIG9mIEZhaXRoXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogWyc1NjUzJywgJzU2N0EnLCAnNTY4RiddIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ0tub2NrZWQgb2ZmJyxcclxuICAgICAgICAgICAgZGU6ICdSdW50ZXJnZWZhbGxlbicsXHJcbiAgICAgICAgICAgIGZyOiAnQSDDqXTDqSBhc3NvbW3DqShlKScsXHJcbiAgICAgICAgICAgIGphOiAn44OO44OD44Kv44OQ44OD44KvJyxcclxuICAgICAgICAgICAgY246ICflh7vpgIDlnaDokL0nLFxyXG4gICAgICAgICAgICBrbzogJ+uEieuwsScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRWRlbnNQcm9taXNlRXRlcm5pdHksXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0UxMk4gSnVkZ21lbnQgSm9sdCBTaW5nbGUnOiAnNTg1RicsIC8vIFJhbXVoIGdldCBvdXQgY2FzdFxyXG4gICAgJ0UxMk4gSnVkZ21lbnQgSm9sdCc6ICc0RTMwJywgLy8gUmFtdWggZ2V0IG91dCBjYXN0XHJcbiAgICAnRTEyTiBUZW1wb3JhcnkgQ3VycmVudCBTaW5nbGUnOiAnNTg1QycsIC8vIExldmkgZ2V0IHVuZGVyIGNhc3RcclxuICAgICdFMTJOIFRlbXBvcmFyeSBDdXJyZW50JzogJzRFMkQnLCAvLyBMZXZpIGdldCB1bmRlciBjYXN0XHJcbiAgICAnRTEyTiBDb25mbGFnIFN0cmlrZSBTaW5nbGUnOiAnNTg1RCcsIC8vIElmcml0IGdldCBzaWRlcyBjYXN0XHJcbiAgICAnRTEyTiBDb25mbGFnIFN0cmlrZSc6ICc0RTJFJywgLy8gSWZyaXQgZ2V0IHNpZGVzIGNhc3RcclxuICAgICdFMTJOIEZlcm9zdG9ybSBTaW5nbGUnOiAnNTg1RScsIC8vIEdhcnVkYSBnZXQgaW50ZXJjYXJkaW5hbHMgY2FzdFxyXG4gICAgJ0UxMk4gRmVyb3N0b3JtJzogJzRFMkYnLCAvLyBHYXJ1ZGEgZ2V0IGludGVyY2FyZGluYWxzIGNhc3RcclxuICAgICdFMTJOIFJhcHR1cm91cyBSZWFjaCAxJzogJzU4NzgnLCAvLyBIYWlyY3V0XHJcbiAgICAnRTEyTiBSYXB0dXJvdXMgUmVhY2ggMic6ICc1ODc3JywgLy8gSGFpcmN1dFxyXG4gICAgJ0UxMk4gQm9tYiBFeHBsb3Npb24nOiAnNTg2RCcsIC8vIFNtYWxsIGJvbWIgZXhwbG9zaW9uXHJcbiAgICAnRTEyTiBUaXRhbmljIEJvbWIgRXhwbG9zaW9uJzogJzU4NkYnLCAvLyBMYXJnZSBib21iIGV4cGxvc2lvblxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnRTEyTiBFYXJ0aHNoYWtlcic6ICc1ODg1JywgLy8gRWFydGhzaGFrZXIgb24gZmlyc3QgcGxhdGZvcm1cclxuICAgICdFMTJOIFByb21pc2UgRnJpZ2lkIFN0b25lIDEnOiAnNTg2NycsIC8vIFNoaXZhIHNwcmVhZCB3aXRoIHNsaWRpbmdcclxuICAgICdFMTJOIFByb21pc2UgRnJpZ2lkIFN0b25lIDInOiAnNTg2OScsIC8vIFNoaXZhIHNwcmVhZCB3aXRoIFJhcHR1cm91cyBSZWFjaFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgeyBMYW5nIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL2xhbmd1YWdlcyc7XHJcbmltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IHsgVW5yZWFjaGFibGVDb2RlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25vdF9yZWFjaGVkJztcclxuaW1wb3J0IE91dHB1dHMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL291dHB1dHMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE5ldE1hdGNoZXMgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9uZXRfbWF0Y2hlcyc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuaW1wb3J0IHsgTG9jYWxlVGV4dCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL3RyaWdnZXInO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEYXRhIGV4dGVuZHMgT29wc3lEYXRhIHtcclxuICBkZWNPZmZzZXQ/OiBudW1iZXI7XHJcbiAgbGFzZXJOYW1lVG9OdW0/OiB7IFtuYW1lOiBzdHJpbmddOiBudW1iZXIgfTtcclxuICBzY3VscHR1cmVUZXRoZXJOYW1lVG9JZD86IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9O1xyXG4gIHNjdWxwdHVyZVlQb3NpdGlvbnM/OiB7IFtzY3VscHR1cmVJZDogc3RyaW5nXTogbnVtYmVyIH07XHJcbiAgYmxhZGVPZkZsYW1lQ291bnQ/OiBudW1iZXI7XHJcbiAgcGlsbGFySWRUb093bmVyPzogeyBbcGlsbGFySWQ6IHN0cmluZ106IHN0cmluZyB9O1xyXG4gIHNtYWxsTGlvbklkVG9Pd25lcj86IHsgW3BpbGxhcklkOiBzdHJpbmddOiBzdHJpbmcgfTtcclxuICBzbWFsbExpb25Pd25lcnM/OiBzdHJpbmdbXTtcclxuICBub3J0aEJpZ0xpb24/OiBzdHJpbmc7XHJcbiAgZmlyZT86IHsgW25hbWU6IHN0cmluZ106IGJvb2xlYW4gfTtcclxufVxyXG5cclxuLy8gVE9ETzogYWRkIHNlcGFyYXRlIGRhbWFnZVdhcm4tZXNxdWUgaWNvbiBmb3IgZGFtYWdlIGRvd25zP1xyXG4vLyBUT0RPOiA1OEE2IFVuZGVyIFRoZSBXZWlnaHQgLyA1OEIyIENsYXNzaWNhbCBTY3VscHR1cmUgbWlzc2luZyBzb21lYm9keSBpbiBwYXJ0eSB3YXJuaW5nP1xyXG4vLyBUT0RPOiA1OENBIERhcmsgV2F0ZXIgSUlJIC8gNThDNSBTaGVsbCBDcnVzaGVyIHNob3VsZCBoaXQgZXZlcnlvbmUgaW4gcGFydHlcclxuLy8gVE9ETzogRGFyayBBZXJvIElJSSA1OEQ0IHNob3VsZCBub3QgYmUgYSBzaGFyZSBleGNlcHQgb24gYWR2YW5jZWQgcmVsYXRpdml0eSBmb3IgZG91YmxlIGFlcm8uXHJcbi8vIChmb3IgZ2FpbnMgZWZmZWN0LCBzaW5nbGUgYWVybyA9IH4yMyBzZWNvbmRzLCBkb3VibGUgYWVybyA9IH4zMSBzZWNvbmRzIGR1cmF0aW9uKVxyXG5cclxuLy8gRHVlIHRvIGNoYW5nZXMgaW50cm9kdWNlZCBpbiBwYXRjaCA1LjIsIG92ZXJoZWFkIG1hcmtlcnMgbm93IGhhdmUgYSByYW5kb20gb2Zmc2V0XHJcbi8vIGFkZGVkIHRvIHRoZWlyIElELiBUaGlzIG9mZnNldCBjdXJyZW50bHkgYXBwZWFycyB0byBiZSBzZXQgcGVyIGluc3RhbmNlLCBzb1xyXG4vLyB3ZSBjYW4gZGV0ZXJtaW5lIHdoYXQgaXQgaXMgZnJvbSB0aGUgZmlyc3Qgb3ZlcmhlYWQgbWFya2VyIHdlIHNlZS5cclxuLy8gVGhlIGZpcnN0IDFCIG1hcmtlciBpbiB0aGUgZW5jb3VudGVyIGlzIHRoZSBmb3JtbGVzcyB0YW5rYnVzdGVyLCBJRCAwMDRGLlxyXG5jb25zdCBmaXJzdEhlYWRtYXJrZXIgPSBwYXJzZUludCgnMDBEQScsIDE2KTtcclxuY29uc3QgZ2V0SGVhZG1hcmtlcklkID0gKGRhdGE6IERhdGEsIG1hdGNoZXM6IE5ldE1hdGNoZXNbJ0hlYWRNYXJrZXInXSkgPT4ge1xyXG4gIC8vIElmIHdlIG5haXZlbHkganVzdCBjaGVjayAhZGF0YS5kZWNPZmZzZXQgYW5kIGxlYXZlIGl0LCBpdCBicmVha3MgaWYgdGhlIGZpcnN0IG1hcmtlciBpcyAwMERBLlxyXG4gIC8vIChUaGlzIG1ha2VzIHRoZSBvZmZzZXQgMCwgYW5kICEwIGlzIHRydWUuKVxyXG4gIGlmICh0eXBlb2YgZGF0YS5kZWNPZmZzZXQgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgZGF0YS5kZWNPZmZzZXQgPSBwYXJzZUludChtYXRjaGVzLmlkLCAxNikgLSBmaXJzdEhlYWRtYXJrZXI7XHJcbiAgLy8gVGhlIGxlYWRpbmcgemVyb2VzIGFyZSBzdHJpcHBlZCB3aGVuIGNvbnZlcnRpbmcgYmFjayB0byBzdHJpbmcsIHNvIHdlIHJlLWFkZCB0aGVtIGhlcmUuXHJcbiAgLy8gRm9ydHVuYXRlbHksIHdlIGRvbid0IGhhdmUgdG8gd29ycnkgYWJvdXQgd2hldGhlciBvciBub3QgdGhpcyBpcyByb2J1c3QsXHJcbiAgLy8gc2luY2Ugd2Uga25vdyBhbGwgdGhlIElEcyB0aGF0IHdpbGwgYmUgcHJlc2VudCBpbiB0aGUgZW5jb3VudGVyLlxyXG4gIHJldHVybiAocGFyc2VJbnQobWF0Y2hlcy5pZCwgMTYpIC0gZGF0YS5kZWNPZmZzZXQpLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpLnBhZFN0YXJ0KDQsICcwJyk7XHJcbn07XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRWRlbnNQcm9taXNlRXRlcm5pdHlTYXZhZ2UsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0UxMlMgUHJvbWlzZSBSYXB0dXJvdXMgUmVhY2ggTGVmdCc6ICc1OEFEJywgLy8gSGFpcmN1dCB3aXRoIGxlZnQgc2FmZSBzaWRlXHJcbiAgICAnRTEyUyBQcm9taXNlIFJhcHR1cm91cyBSZWFjaCBSaWdodCc6ICc1OEFFJywgLy8gSGFpcmN1dCB3aXRoIHJpZ2h0IHNhZmUgc2lkZVxyXG4gICAgJ0UxMlMgUHJvbWlzZSBUZW1wb3JhcnkgQ3VycmVudCc6ICc0RTQ0JywgLy8gTGV2aSBnZXQgdW5kZXIgY2FzdCAoZGFtYWdlIGRvd24pXHJcbiAgICAnRTEyUyBQcm9taXNlIENvbmZsYWcgU3RyaWtlJzogJzRFNDUnLCAvLyBJZnJpdCBnZXQgc2lkZXMgY2FzdCAoZGFtYWdlIGRvd24pXHJcbiAgICAnRTEyUyBQcm9taXNlIEZlcm9zdG9ybSc6ICc0RTQ2JywgLy8gR2FydWRhIGdldCBpbnRlcmNhcmRpbmFscyBjYXN0IChkYW1hZ2UgZG93bilcclxuICAgICdFMTJTIFByb21pc2UgSnVkZ21lbnQgSm9sdCc6ICc0RTQ3JywgLy8gUmFtdWggZ2V0IG91dCBjYXN0IChkYW1hZ2UgZG93bilcclxuICAgICdFMTJTIFByb21pc2UgU2hhdHRlcic6ICc1ODlDJywgLy8gSWNlIFBpbGxhciBleHBsb3Npb24gaWYgdGV0aGVyIG5vdCBnb3R0ZW5cclxuICAgICdFMTJTIFByb21pc2UgSW1wYWN0JzogJzU4QTEnLCAvLyBUaXRhbiBib21iIGRyb3BcclxuICAgICdFMTJTIE9yYWNsZSBEYXJrIEJsaXp6YXJkIElJSSc6ICc1OEQzJywgLy8gUmVsYXRpdml0eSBkb251dCBtZWNoYW5pY1xyXG4gICAgJ0UxMlMgT3JhY2xlIEFwb2NhbHlwc2UnOiAnNThFNicsIC8vIExpZ2h0IHVwIGNpcmNsZSBleHBsb3Npb25zIChkYW1hZ2UgZG93bilcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdFMTJTIE9yYWNsZSBNYWVsc3Ryb20nOiAnNThEQScsIC8vIEFkdmFuY2VkIFJlbGF0aXZpdHkgdHJhZmZpYyBsaWdodCBhb2VcclxuICB9LFxyXG4gIGdhaW5zRWZmZWN0RmFpbDoge1xyXG4gICAgJ0UxMlMgT3JhY2xlIERvb20nOiAnOUQ0JywgLy8gUmVsYXRpdml0eSBwdW5pc2htZW50IGZvciBtdWx0aXBsZSBtaXN0YWtlc1xyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnRTEyUyBQcm9taXNlIEZyaWdpZCBTdG9uZSc6ICc1ODlFJywgLy8gU2hpdmEgc3ByZWFkXHJcbiAgICAnRTEyUyBPcmFjbGUgRGFya2VzdCBEYW5jZSc6ICc0RTMzJywgLy8gRmFydGhlc3QgdGFyZ2V0IGJhaXQgKyBqdW1wIGJlZm9yZSBrbm9ja2JhY2tcclxuICAgICdFMTJTIE9yYWNsZSBEYXJrIEN1cnJlbnQnOiAnNThEOCcsIC8vIEJhaXRlZCB0cmFmZmljIGxpZ2h0IGxhc2Vyc1xyXG4gICAgJ0UxMlMgT3JhY2xlIFNwaXJpdCBUYWtlcic6ICc1OEM2JywgLy8gUmFuZG9tIGp1bXAgc3ByZWFkIG1lY2hhbmljIGFmdGVyIFNoZWxsIENydXNoZXJcclxuICAgICdFMTJTIE9yYWNsZSBTb21iZXIgRGFuY2UgMSc6ICc1OEJGJywgLy8gRmFydGhlc3QgdGFyZ2V0IGJhaXQgZm9yIER1YWwgQXBvY2FseXBzZVxyXG4gICAgJ0UxMlMgT3JhY2xlIFNvbWJlciBEYW5jZSAyJzogJzU4QzAnLCAvLyBTZWNvbmQgc29tYmVyIGRhbmNlIGp1bXBcclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgJ0UxMlMgUHJvbWlzZSBXZWlnaHQgT2YgVGhlIFdvcmxkJzogJzU4QTUnLCAvLyBUaXRhbiBib21iIGJsdWUgbWFya2VyXHJcbiAgICAnRTEyUyBQcm9taXNlIFB1bHNlIE9mIFRoZSBMYW5kJzogJzU4QTMnLCAvLyBUaXRhbiBib21iIHllbGxvdyBtYXJrZXJcclxuICAgICdFMTJTIE9yYWNsZSBEYXJrIEVydXB0aW9uIDEnOiAnNThDRScsIC8vIEluaXRpYWwgd2FybXVwIHNwcmVhZCBtZWNoYW5pY1xyXG4gICAgJ0UxMlMgT3JhY2xlIERhcmsgRXJ1cHRpb24gMic6ICc1OENEJywgLy8gUmVsYXRpdml0eSBzcHJlYWQgbWVjaGFuaWNcclxuICAgICdFMTJTIE9yYWNsZSBCbGFjayBIYWxvJzogJzU4QzcnLCAvLyBUYW5rYnVzdGVyIGNsZWF2ZVxyXG4gIH0sXHJcbiAgc29sb1dhcm46IHtcclxuICAgICdFMTJTIFByb21pc2UgRm9yY2UgT2YgVGhlIExhbmQnOiAnNThBNCcsXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICAvLyBCaWcgY2lyY2xlIGdyb3VuZCBhb2VzIGR1cmluZyBTaGl2YSBqdW5jdGlvbi5cclxuICAgICAgLy8gVGhpcyBjYW4gYmUgc2hpZWxkZWQgdGhyb3VnaCBhcyBsb25nIGFzIHRoYXQgcGVyc29uIGRvZXNuJ3Qgc3RhY2suXHJcbiAgICAgIGlkOiAnRTEyUyBJY2ljbGUgSW1wYWN0JyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnNEU1QScsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS5EYW1hZ2VGcm9tTWF0Y2hlcyhtYXRjaGVzKSA+IDAsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTEyUyBIZWFkbWFya2VyJyxcclxuICAgICAgdHlwZTogJ0hlYWRNYXJrZXInLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5oZWFkTWFya2VyKHt9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGNvbnN0IGlkID0gZ2V0SGVhZG1hcmtlcklkKGRhdGEsIG1hdGNoZXMpO1xyXG4gICAgICAgIGNvbnN0IGZpcnN0TGFzZXJNYXJrZXIgPSAnMDA5MSc7XHJcbiAgICAgICAgY29uc3QgbGFzdExhc2VyTWFya2VyID0gJzAwOTgnO1xyXG4gICAgICAgIGlmIChpZCA+PSBmaXJzdExhc2VyTWFya2VyICYmIGlkIDw9IGxhc3RMYXNlck1hcmtlcikge1xyXG4gICAgICAgICAgLy8gaWRzIGFyZSBzZXF1ZW50aWFsOiAjMSBzcXVhcmUsICMyIHNxdWFyZSwgIzMgc3F1YXJlLCAjNCBzcXVhcmUsICMxIHRyaWFuZ2xlIGV0Y1xyXG4gICAgICAgICAgY29uc3QgZGVjT2Zmc2V0ID0gcGFyc2VJbnQoaWQsIDE2KSAtIHBhcnNlSW50KGZpcnN0TGFzZXJNYXJrZXIsIDE2KTtcclxuXHJcbiAgICAgICAgICAvLyBkZWNPZmZzZXQgaXMgMC03LCBzbyBtYXAgMC0zIHRvIDEtNCBhbmQgNC03IHRvIDEtNC5cclxuICAgICAgICAgIGRhdGEubGFzZXJOYW1lVG9OdW0gPz89IHt9O1xyXG4gICAgICAgICAgZGF0YS5sYXNlck5hbWVUb051bVttYXRjaGVzLnRhcmdldF0gPSBkZWNPZmZzZXQgJSA0ICsgMTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBUaGVzZSBzY3VscHR1cmVzIGFyZSBhZGRlZCBhdCB0aGUgc3RhcnQgb2YgdGhlIGZpZ2h0LCBzbyB3ZSBuZWVkIHRvIGNoZWNrIHdoZXJlIHRoZXlcclxuICAgICAgLy8gdXNlIHRoZSBcIkNsYXNzaWNhbCBTY3VscHR1cmVcIiBhYmlsaXR5IGFuZCBlbmQgdXAgb24gdGhlIGFyZW5hIGZvciByZWFsLlxyXG4gICAgICBpZDogJ0UxMlMgUHJvbWlzZSBDaGlzZWxlZCBTY3VscHR1cmUgQ2xhc3NpY2FsIFNjdWxwdHVyZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBzb3VyY2U6ICdDaGlzZWxlZCBTY3VscHR1cmUnLCBpZDogJzU4QjInIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgLy8gVGhpcyB3aWxsIHJ1biBwZXIgcGVyc29uIHRoYXQgZ2V0cyBoaXQgYnkgdGhlIHNhbWUgc2N1bHB0dXJlLCBidXQgdGhhdCdzIGZpbmUuXHJcbiAgICAgICAgLy8gUmVjb3JkIHRoZSB5IHBvc2l0aW9uIG9mIGVhY2ggc2N1bHB0dXJlIHNvIHdlIGNhbiB1c2UgaXQgZm9yIGJldHRlciB0ZXh0IGxhdGVyLlxyXG4gICAgICAgIGRhdGEuc2N1bHB0dXJlWVBvc2l0aW9ucyA/Pz0ge307XHJcbiAgICAgICAgZGF0YS5zY3VscHR1cmVZUG9zaXRpb25zW21hdGNoZXMuc291cmNlSWQudG9VcHBlckNhc2UoKV0gPSBwYXJzZUZsb2F0KG1hdGNoZXMueSk7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBUaGUgc291cmNlIG9mIHRoZSB0ZXRoZXIgaXMgdGhlIHBsYXllciwgdGhlIHRhcmdldCBpcyB0aGUgc2N1bHB0dXJlLlxyXG4gICAgICBpZDogJ0UxMlMgUHJvbWlzZSBDaGlzZWxlZCBTY3VscHR1cmUgVGV0aGVyJyxcclxuICAgICAgdHlwZTogJ1RldGhlcicsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLnRldGhlcih7IHRhcmdldDogJ0NoaXNlbGVkIFNjdWxwdHVyZScsIGlkOiAnMDAxMScgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLnNjdWxwdHVyZVRldGhlck5hbWVUb0lkID8/PSB7fTtcclxuICAgICAgICBkYXRhLnNjdWxwdHVyZVRldGhlck5hbWVUb0lkW21hdGNoZXMuc291cmNlXSA9IG1hdGNoZXMudGFyZ2V0SWQudG9VcHBlckNhc2UoKTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTEyUyBQcm9taXNlIEJsYWRlIE9mIEZsYW1lIENvdW50ZXInLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBzb3VyY2U6ICdDaGlzZWxlZCBTY3VscHR1cmUnLCBpZDogJzU4QjMnIH0pLFxyXG4gICAgICBkZWxheVNlY29uZHM6IDEsXHJcbiAgICAgIHN1cHByZXNzU2Vjb25kczogMSxcclxuICAgICAgcnVuOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgIGRhdGEuYmxhZGVPZkZsYW1lQ291bnQgPSBkYXRhLmJsYWRlT2ZGbGFtZUNvdW50IHx8IDA7XHJcbiAgICAgICAgZGF0YS5ibGFkZU9mRmxhbWVDb3VudCsrO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gVGhpcyBpcyB0aGUgQ2hpc2VsZWQgU2N1bHB0dXJlIGxhc2VyIHdpdGggdGhlIGxpbWl0IGN1dCBkb3RzLlxyXG4gICAgICBpZDogJ0UxMlMgUHJvbWlzZSBCbGFkZSBPZiBGbGFtZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IHR5cGU6ICcyMicsIHNvdXJjZTogJ0NoaXNlbGVkIFNjdWxwdHVyZScsIGlkOiAnNThCMycgfSksXHJcbiAgICAgIG1pc3Rha2U6IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgaWYgKCFkYXRhLmxhc2VyTmFtZVRvTnVtIHx8ICFkYXRhLnNjdWxwdHVyZVRldGhlck5hbWVUb0lkIHx8ICFkYXRhLnNjdWxwdHVyZVlQb3NpdGlvbnMpXHJcbiAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIEZpbmQgdGhlIHBlcnNvbiB3aG8gaGFzIHRoaXMgbGFzZXIgbnVtYmVyIGFuZCBpcyB0ZXRoZXJlZCB0byB0aGlzIHN0YXR1ZS5cclxuICAgICAgICBjb25zdCBudW1iZXIgPSAoZGF0YS5ibGFkZU9mRmxhbWVDb3VudCB8fCAwKSArIDE7XHJcbiAgICAgICAgY29uc3Qgc291cmNlSWQgPSBtYXRjaGVzLnNvdXJjZUlkLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgY29uc3QgbmFtZXMgPSBPYmplY3Qua2V5cyhkYXRhLmxhc2VyTmFtZVRvTnVtKTtcclxuICAgICAgICBjb25zdCB3aXRoTnVtID0gbmFtZXMuZmlsdGVyKChuYW1lKSA9PiBkYXRhLmxhc2VyTmFtZVRvTnVtPy5bbmFtZV0gPT09IG51bWJlcik7XHJcbiAgICAgICAgY29uc3Qgb3duZXJzID0gd2l0aE51bS5maWx0ZXIoKG5hbWUpID0+IGRhdGEuc2N1bHB0dXJlVGV0aGVyTmFtZVRvSWQ/LltuYW1lXSA9PT0gc291cmNlSWQpO1xyXG5cclxuICAgICAgICAvLyBpZiBzb21lIGxvZ2ljIGVycm9yLCBqdXN0IGFib3J0LlxyXG4gICAgICAgIGlmIChvd25lcnMubGVuZ3RoICE9PSAxKVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBUaGUgb3duZXIgaGl0dGluZyB0aGVtc2VsdmVzIGlzbid0IGEgbWlzdGFrZS4uLnRlY2huaWNhbGx5LlxyXG4gICAgICAgIGlmIChvd25lcnNbMF0gPT09IG1hdGNoZXMudGFyZ2V0KVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBOb3cgdHJ5IHRvIGZpZ3VyZSBvdXQgd2hpY2ggc3RhdHVlIGlzIHdoaWNoLlxyXG4gICAgICAgIC8vIFBlb3BsZSBjYW4gcHV0IHRoZXNlIHdoZXJldmVyLiAgVGhleSBjb3VsZCBnbyBzaWRld2F5cywgb3IgZGlhZ29uYWwsIG9yIHdoYXRldmVyLlxyXG4gICAgICAgIC8vIEl0IHNlZW1zIG1vb29vb3N0IHBlb3BsZSBwdXQgdGhlc2Ugbm9ydGggLyBzb3V0aCAob24gdGhlIHNvdXRoIGVkZ2Ugb2YgdGhlIGFyZW5hKS5cclxuICAgICAgICAvLyBMZXQncyBzYXkgYSBtaW5pbXVtIG9mIDIgeWFsbXMgYXBhcnQgaW4gdGhlIHkgZGlyZWN0aW9uIHRvIGNvbnNpZGVyIHRoZW0gXCJub3J0aC9zb3V0aFwiLlxyXG4gICAgICAgIGNvbnN0IG1pbmltdW1ZYWxtc0ZvclN0YXR1ZXMgPSAyO1xyXG5cclxuICAgICAgICBsZXQgaXNTdGF0dWVQb3NpdGlvbktub3duID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGlzU3RhdHVlTm9ydGggPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBzY3VscHR1cmVJZHMgPSBPYmplY3Qua2V5cyhkYXRhLnNjdWxwdHVyZVlQb3NpdGlvbnMpO1xyXG4gICAgICAgIGlmIChzY3VscHR1cmVJZHMubGVuZ3RoID09PSAyICYmIHNjdWxwdHVyZUlkcy5pbmNsdWRlcyhzb3VyY2VJZCkpIHtcclxuICAgICAgICAgIGNvbnN0IG90aGVySWQgPSBzY3VscHR1cmVJZHNbMF0gPT09IHNvdXJjZUlkID8gc2N1bHB0dXJlSWRzWzFdIDogc2N1bHB0dXJlSWRzWzBdO1xyXG4gICAgICAgICAgY29uc3Qgc291cmNlWSA9IGRhdGEuc2N1bHB0dXJlWVBvc2l0aW9uc1tzb3VyY2VJZF07XHJcbiAgICAgICAgICBjb25zdCBvdGhlclkgPSBkYXRhLnNjdWxwdHVyZVlQb3NpdGlvbnNbb3RoZXJJZCA/PyAnJ107XHJcbiAgICAgICAgICBpZiAoc291cmNlWSA9PT0gdW5kZWZpbmVkIHx8IG90aGVyWSA9PT0gdW5kZWZpbmVkIHx8IG90aGVySWQgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFVucmVhY2hhYmxlQ29kZSgpO1xyXG4gICAgICAgICAgY29uc3QgeURpZmYgPSBNYXRoLmFicyhzb3VyY2VZIC0gb3RoZXJZKTtcclxuICAgICAgICAgIGlmICh5RGlmZiA+IG1pbmltdW1ZYWxtc0ZvclN0YXR1ZXMpIHtcclxuICAgICAgICAgICAgaXNTdGF0dWVQb3NpdGlvbktub3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgaXNTdGF0dWVOb3J0aCA9IHNvdXJjZVkgPCBvdGhlclk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBvd25lciA9IG93bmVyc1swXTtcclxuICAgICAgICBjb25zdCBvd25lck5pY2sgPSBkYXRhLlNob3J0TmFtZShvd25lcik7XHJcbiAgICAgICAgbGV0IHRleHQgPSB7XHJcbiAgICAgICAgICBlbjogYCR7bWF0Y2hlcy5hYmlsaXR5fSAoZnJvbSAke293bmVyTmlja30sICMke251bWJlcn0pYCxcclxuICAgICAgICAgIGRlOiBgJHttYXRjaGVzLmFiaWxpdHl9ICh2b24gJHtvd25lck5pY2t9LCAjJHtudW1iZXJ9KWAsXHJcbiAgICAgICAgICBqYTogYCR7bWF0Y2hlcy5hYmlsaXR5fSAoJHtvd25lck5pY2t944GL44KJ44CBIyR7bnVtYmVyfSlgLFxyXG4gICAgICAgICAgY246IGAke21hdGNoZXMuYWJpbGl0eX0gKOadpeiHqiR7b3duZXJOaWNrfe+8jCMke251bWJlcn0pYCxcclxuICAgICAgICAgIGtvOiBgJHttYXRjaGVzLmFiaWxpdHl9ICjrjIDsg4HsnpAgXCIke293bmVyTmlja31cIiwgJHtudW1iZXJ967KIKWAsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoaXNTdGF0dWVQb3NpdGlvbktub3duICYmIGlzU3RhdHVlTm9ydGgpIHtcclxuICAgICAgICAgIHRleHQgPSB7XHJcbiAgICAgICAgICAgIGVuOiBgJHttYXRjaGVzLmFiaWxpdHl9IChmcm9tICR7b3duZXJOaWNrfSwgIyR7bnVtYmVyfSBub3J0aClgLFxyXG4gICAgICAgICAgICBkZTogYCR7bWF0Y2hlcy5hYmlsaXR5fSAodm9uICR7b3duZXJOaWNrfSwgIyR7bnVtYmVyfSBub3JkZW4pYCxcclxuICAgICAgICAgICAgamE6IGAke21hdGNoZXMuYWJpbGl0eX0gKOWMl+OBriR7b3duZXJOaWNrfeOBi+OCieOAgSMke251bWJlcn0pYCxcclxuICAgICAgICAgICAgY246IGAke21hdGNoZXMuYWJpbGl0eX0gKOadpeiHquWMl+aWuSR7b3duZXJOaWNrfe+8jCMke251bWJlcn0pYCxcclxuICAgICAgICAgICAga286IGAke21hdGNoZXMuYWJpbGl0eX0gKOuMgOyDgeyekCBcIiR7b3duZXJOaWNrfVwiLCAke251bWJlcn3rsogg67aB7Kq9KWAsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNTdGF0dWVQb3NpdGlvbktub3duICYmICFpc1N0YXR1ZU5vcnRoKSB7XHJcbiAgICAgICAgICB0ZXh0ID0ge1xyXG4gICAgICAgICAgICBlbjogYCR7bWF0Y2hlcy5hYmlsaXR5fSAoZnJvbSAke293bmVyTmlja30sICMke251bWJlcn0gc291dGgpYCxcclxuICAgICAgICAgICAgZGU6IGAke21hdGNoZXMuYWJpbGl0eX0gKHZvbiAke293bmVyTmlja30sICMke251bWJlcn0gU8O8ZGVuKWAsXHJcbiAgICAgICAgICAgIGphOiBgJHttYXRjaGVzLmFiaWxpdHl9ICjljZfjga4ke293bmVyTmlja33jgYvjgonjgIEjJHtudW1iZXJ9KWAsXHJcbiAgICAgICAgICAgIGNuOiBgJHttYXRjaGVzLmFiaWxpdHl9ICjmnaXoh6rljZfmlrkke293bmVyTmlja33vvIwjJHtudW1iZXJ9KWAsXHJcbiAgICAgICAgICAgIGtvOiBgJHttYXRjaGVzLmFiaWxpdHl9ICjrjIDsg4HsnpAgXCIke293bmVyTmlja31cIiwgJHtudW1iZXJ967KIIOuCqOyqvSlgLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIGJsYW1lOiBvd25lcixcclxuICAgICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTEyUyBQcm9taXNlIEljZSBQaWxsYXIgVHJhY2tlcicsXHJcbiAgICAgIHR5cGU6ICdUZXRoZXInLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy50ZXRoZXIoeyBzb3VyY2U6ICdJY2UgUGlsbGFyJywgaWQ6IFsnMDAwMScsICcwMDM5J10gfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLnBpbGxhcklkVG9Pd25lciA/Pz0ge307XHJcbiAgICAgICAgZGF0YS5waWxsYXJJZFRvT3duZXJbbWF0Y2hlcy5zb3VyY2VJZF0gPSBtYXRjaGVzLnRhcmdldDtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTEyUyBQcm9taXNlIEljZSBQaWxsYXIgTWlzdGFrZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IHNvdXJjZTogJ0ljZSBQaWxsYXInLCBpZDogJzU4OUInIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgaWYgKCFkYXRhLnBpbGxhcklkVG9Pd25lcilcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gbWF0Y2hlcy50YXJnZXQgIT09IGRhdGEucGlsbGFySWRUb093bmVyW21hdGNoZXMuc291cmNlSWRdO1xyXG4gICAgICB9LFxyXG4gICAgICBtaXN0YWtlOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBpbGxhck93bmVyID0gZGF0YS5TaG9ydE5hbWUoZGF0YS5waWxsYXJJZFRvT3duZXI/LlttYXRjaGVzLnNvdXJjZUlkXSk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIGJsYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46IGAke21hdGNoZXMuYWJpbGl0eX0gKGZyb20gJHtwaWxsYXJPd25lcn0pYCxcclxuICAgICAgICAgICAgZGU6IGAke21hdGNoZXMuYWJpbGl0eX0gKHZvbiAke3BpbGxhck93bmVyfSlgLFxyXG4gICAgICAgICAgICBmcjogYCR7bWF0Y2hlcy5hYmlsaXR5fSAoZGUgJHtwaWxsYXJPd25lcn0pYCxcclxuICAgICAgICAgICAgamE6IGAke21hdGNoZXMuYWJpbGl0eX0gKCR7cGlsbGFyT3duZXJ944GL44KJKWAsXHJcbiAgICAgICAgICAgIGNuOiBgJHttYXRjaGVzLmFiaWxpdHl9ICjmnaXoh6oke3BpbGxhck93bmVyfSlgLFxyXG4gICAgICAgICAgICBrbzogYCR7bWF0Y2hlcy5hYmlsaXR5fSAo64yA7IOB7J6QIFwiJHtwaWxsYXJPd25lcn1cIilgLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFMTJTIFByb21pc2UgR2FpbiBGaXJlIFJlc2lzdGFuY2UgRG93biBJSScsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIC8vIFRoZSBCZWFzdGx5IFNjdWxwdHVyZSBnaXZlcyBhIDMgc2Vjb25kIGRlYnVmZiwgdGhlIFJlZ2FsIFNjdWxwdHVyZSBnaXZlcyBhIDE0cyBvbmUuXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICc4MzInIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5maXJlID8/PSB7fTtcclxuICAgICAgICBkYXRhLmZpcmVbbWF0Y2hlcy50YXJnZXRdID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTEyUyBQcm9taXNlIExvc2UgRmlyZSBSZXNpc3RhbmNlIERvd24gSUknLFxyXG4gICAgICB0eXBlOiAnTG9zZXNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5sb3Nlc0VmZmVjdCh7IGVmZmVjdElkOiAnODMyJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuZmlyZSA/Pz0ge307XHJcbiAgICAgICAgZGF0YS5maXJlW21hdGNoZXMudGFyZ2V0XSA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFMTJTIFByb21pc2UgU21hbGwgTGlvbiBUZXRoZXInLFxyXG4gICAgICB0eXBlOiAnVGV0aGVyJyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMudGV0aGVyKHsgc291cmNlOiAnQmVhc3RseSBTY3VscHR1cmUnLCBpZDogJzAwMTEnIH0pLFxyXG4gICAgICBuZXRSZWdleERlOiBOZXRSZWdleGVzLnRldGhlcih7IHNvdXJjZTogJ0FiYmlsZCBFaW5lcyBMw7Z3ZW4nLCBpZDogJzAwMTEnIH0pLFxyXG4gICAgICBuZXRSZWdleEZyOiBOZXRSZWdleGVzLnRldGhlcih7IHNvdXJjZTogJ0Nyw6lhdGlvbiBMw6lvbmluZScsIGlkOiAnMDAxMScgfSksXHJcbiAgICAgIG5ldFJlZ2V4SmE6IE5ldFJlZ2V4ZXMudGV0aGVyKHsgc291cmNlOiAn5Ym144KJ44KM44Gf542F5a2QJywgaWQ6ICcwMDExJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuc21hbGxMaW9uSWRUb093bmVyID8/PSB7fTtcclxuICAgICAgICBkYXRhLnNtYWxsTGlvbklkVG9Pd25lclttYXRjaGVzLnNvdXJjZUlkLnRvVXBwZXJDYXNlKCldID0gbWF0Y2hlcy50YXJnZXQ7XHJcbiAgICAgICAgZGF0YS5zbWFsbExpb25Pd25lcnMgPz89IFtdO1xyXG4gICAgICAgIGRhdGEuc21hbGxMaW9uT3duZXJzLnB1c2gobWF0Y2hlcy50YXJnZXQpO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFMTJTIFByb21pc2UgU21hbGwgTGlvbiBMaW9uc2JsYXplJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IHNvdXJjZTogJ0JlYXN0bHkgU2N1bHB0dXJlJywgaWQ6ICc1OEI5JyB9KSxcclxuICAgICAgbmV0UmVnZXhEZTogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IHNvdXJjZTogJ0FiYmlsZCBFaW5lcyBMw7Z3ZW4nLCBpZDogJzU4QjknIH0pLFxyXG4gICAgICBuZXRSZWdleEZyOiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgc291cmNlOiAnQ3LDqWF0aW9uIEzDqW9uaW5lJywgaWQ6ICc1OEI5JyB9KSxcclxuICAgICAgbmV0UmVnZXhKYTogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IHNvdXJjZTogJ+WJteOCieOCjOOBn+eNheWtkCcsIGlkOiAnNThCOScgfSksXHJcbiAgICAgIG1pc3Rha2U6IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgLy8gRm9sa3MgYmFpdGluZyB0aGUgYmlnIGxpb24gc2Vjb25kIGNhbiB0YWtlIHRoZSBmaXJzdCBzbWFsbCBsaW9uIGhpdCxcclxuICAgICAgICAvLyBzbyBpdCdzIG5vdCBzdWZmaWNpZW50IHRvIGNoZWNrIG9ubHkgdGhlIG93bmVyLlxyXG4gICAgICAgIGlmICghZGF0YS5zbWFsbExpb25Pd25lcnMpXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY29uc3Qgb3duZXIgPSBkYXRhLnNtYWxsTGlvbklkVG9Pd25lcj8uW21hdGNoZXMuc291cmNlSWQudG9VcHBlckNhc2UoKV07XHJcbiAgICAgICAgaWYgKCFvd25lcilcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAobWF0Y2hlcy50YXJnZXQgPT09IG93bmVyKVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgdGFyZ2V0IGFsc28gaGFzIGEgc21hbGwgbGlvbiB0ZXRoZXIsIHRoYXQgaXMgYWx3YXlzIGEgbWlzdGFrZS5cclxuICAgICAgICAvLyBPdGhlcndpc2UsIGl0J3Mgb25seSBhIG1pc3Rha2UgaWYgdGhlIHRhcmdldCBoYXMgYSBmaXJlIGRlYnVmZi5cclxuICAgICAgICBjb25zdCBoYXNTbWFsbExpb24gPSBkYXRhLnNtYWxsTGlvbk93bmVycy5pbmNsdWRlcyhtYXRjaGVzLnRhcmdldCk7XHJcbiAgICAgICAgY29uc3QgaGFzRmlyZURlYnVmZiA9IGRhdGEuZmlyZSAmJiBkYXRhLmZpcmVbbWF0Y2hlcy50YXJnZXRdO1xyXG5cclxuICAgICAgICBpZiAoaGFzU21hbGxMaW9uIHx8IGhhc0ZpcmVEZWJ1ZmYpIHtcclxuICAgICAgICAgIGNvbnN0IG93bmVyTmljayA9IGRhdGEuU2hvcnROYW1lKG93bmVyKTtcclxuXHJcbiAgICAgICAgICBjb25zdCBjZW50ZXJZID0gLTc1O1xyXG4gICAgICAgICAgY29uc3QgeCA9IHBhcnNlRmxvYXQobWF0Y2hlcy54KTtcclxuICAgICAgICAgIGNvbnN0IHkgPSBwYXJzZUZsb2F0KG1hdGNoZXMueSk7XHJcbiAgICAgICAgICBsZXQgZGlyT2JqID0gbnVsbDtcclxuICAgICAgICAgIGlmICh5IDwgY2VudGVyWSkge1xyXG4gICAgICAgICAgICBpZiAoeCA+IDApXHJcbiAgICAgICAgICAgICAgZGlyT2JqID0gT3V0cHV0cy5kaXJORTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgIGRpck9iaiA9IE91dHB1dHMuZGlyTlc7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoeCA+IDApXHJcbiAgICAgICAgICAgICAgZGlyT2JqID0gT3V0cHV0cy5kaXJTRTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgIGRpck9iaiA9IE91dHB1dHMuZGlyU1c7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgICBibGFtZTogb3duZXIsXHJcbiAgICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgICAgZW46IGAke21hdGNoZXMuYWJpbGl0eX0gKGZyb20gJHtvd25lck5pY2t9LCAke2Rpck9ialsnZW4nXX0pYCxcclxuICAgICAgICAgICAgICBkZTogYCR7bWF0Y2hlcy5hYmlsaXR5fSAodm9uICR7b3duZXJOaWNrfSwgJHtkaXJPYmpbJ2RlJ119KWAsXHJcbiAgICAgICAgICAgICAgZnI6IGAke21hdGNoZXMuYWJpbGl0eX0gKGRlICR7b3duZXJOaWNrfSwgJHtkaXJPYmpbJ2ZyJ119KWAsXHJcbiAgICAgICAgICAgICAgamE6IGAke21hdGNoZXMuYWJpbGl0eX0gKCR7b3duZXJOaWNrfeOBi+OCiSwgJHtkaXJPYmpbJ2phJ119KWAsXHJcbiAgICAgICAgICAgICAgY246IGAke21hdGNoZXMuYWJpbGl0eX0gKOadpeiHqiR7b3duZXJOaWNrfSwgJHtkaXJPYmpbJ2NuJ119YCxcclxuICAgICAgICAgICAgICBrbzogYCR7bWF0Y2hlcy5hYmlsaXR5fSAo64yA7IOB7J6QIFwiJHtvd25lck5pY2t9XCIsICR7ZGlyT2JqWydrbyddfSlgLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0UxMlMgUHJvbWlzZSBOb3J0aCBCaWcgTGlvbicsXHJcbiAgICAgIHR5cGU6ICdBZGRlZENvbWJhdGFudCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFkZGVkQ29tYmF0YW50RnVsbCh7IG5hbWU6ICdSZWdhbCBTY3VscHR1cmUnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgeSA9IHBhcnNlRmxvYXQobWF0Y2hlcy55KTtcclxuICAgICAgICBjb25zdCBjZW50ZXJZID0gLTc1O1xyXG4gICAgICAgIGlmICh5IDwgY2VudGVyWSlcclxuICAgICAgICAgIGRhdGEubm9ydGhCaWdMaW9uID0gbWF0Y2hlcy5pZC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFMTJTIFByb21pc2UgQmlnIExpb24gS2luZ3NibGF6ZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IHNvdXJjZTogJ1JlZ2FsIFNjdWxwdHVyZScsIGlkOiAnNEY5RScgfSksXHJcbiAgICAgIG5ldFJlZ2V4RGU6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IHNvdXJjZTogJ0FiYmlsZCBlaW5lcyBncm/Dn2VuIEzDtndlbicsIGlkOiAnNEY5RScgfSksXHJcbiAgICAgIG5ldFJlZ2V4RnI6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IHNvdXJjZTogJ2Nyw6lhdGlvbiBsw6lvbmluZSByb3lhbGUnLCBpZDogJzRGOUUnIH0pLFxyXG4gICAgICBuZXRSZWdleEphOiBOZXRSZWdleGVzLmFiaWxpdHkoeyBzb3VyY2U6ICflibXjgonjgozjgZ/njYXlrZDnjosnLCBpZDogJzRGOUUnIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNpbmdsZVRhcmdldCA9IG1hdGNoZXMudHlwZSA9PT0gJzIxJztcclxuICAgICAgICBjb25zdCBoYXNGaXJlRGVidWZmID0gZGF0YS5maXJlICYmIGRhdGEuZmlyZVttYXRjaGVzLnRhcmdldF07XHJcblxyXG4gICAgICAgIC8vIFN1Y2Nlc3MgaWYgb25seSBvbmUgcGVyc29uIHRha2VzIGl0IGFuZCB0aGV5IGhhdmUgbm8gZmlyZSBkZWJ1ZmYuXHJcbiAgICAgICAgaWYgKHNpbmdsZVRhcmdldCAmJiAhaGFzRmlyZURlYnVmZilcclxuICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qgbm9ydGhCaWdMaW9uOiBMb2NhbGVUZXh0ID0ge1xyXG4gICAgICAgICAgZW46ICdub3J0aCBiaWcgbGlvbicsXHJcbiAgICAgICAgICBkZTogJ05vcmRlbSwgZ3Jvw59lciBMw7Z3ZScsXHJcbiAgICAgICAgICBqYTogJ+Wkp+ODqeOCpOOCquODsyjljJcpJyxcclxuICAgICAgICAgIGNuOiAn5YyX5pa55aSn54uu5a2QJyxcclxuICAgICAgICAgIGtvOiAn67aB7Kq9IO2BsCDsgqzsnpAnLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3Qgc291dGhCaWdMaW9uOiBMb2NhbGVUZXh0ID0ge1xyXG4gICAgICAgICAgZW46ICdzb3V0aCBiaWcgbGlvbicsXHJcbiAgICAgICAgICBkZTogJ1PDvGRlbiwgZ3Jvw59lciBMw7Z3ZScsXHJcbiAgICAgICAgICBqYTogJ+Wkp+ODqeOCpOOCquODsyjljZcpJyxcclxuICAgICAgICAgIGNuOiAn5Y2X5pa55aSn54uu5a2QJyxcclxuICAgICAgICAgIGtvOiAn64Ko7Kq9IO2BsCDsgqzsnpAnLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3Qgc2hhcmVkOiBMb2NhbGVUZXh0ID0ge1xyXG4gICAgICAgICAgZW46ICdzaGFyZWQnLFxyXG4gICAgICAgICAgZGU6ICdnZXRlaWx0JyxcclxuICAgICAgICAgIGphOiAn6YeN44Gt44GfJyxcclxuICAgICAgICAgIGNuOiAn6YeN5Y+gJyxcclxuICAgICAgICAgIGtvOiAn6rCZ7J20IOunnuydjCcsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBmaXJlRGVidWZmOiBMb2NhbGVUZXh0ID0ge1xyXG4gICAgICAgICAgZW46ICdoYWQgZmlyZScsXHJcbiAgICAgICAgICBkZTogJ2hhdHRlIEZldWVyJyxcclxuICAgICAgICAgIGphOiAn54KO5LuY44GNJyxcclxuICAgICAgICAgIGNuOiAn54GrRGVidWZmJyxcclxuICAgICAgICAgIGtvOiAn7ZmU7Je8IOuUlOuyhO2UhCDrsJvsnYwnLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGxhYmVscyA9IFtdO1xyXG4gICAgICAgIGNvbnN0IGxhbmc6IExhbmcgPSBkYXRhLm9wdGlvbnMuUGFyc2VyTGFuZ3VhZ2U7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLm5vcnRoQmlnTGlvbikge1xyXG4gICAgICAgICAgaWYgKGRhdGEubm9ydGhCaWdMaW9uID09PSBtYXRjaGVzLnNvdXJjZUlkKVxyXG4gICAgICAgICAgICBsYWJlbHMucHVzaChub3J0aEJpZ0xpb25bbGFuZ10gPz8gbm9ydGhCaWdMaW9uWydlbiddKTtcclxuICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgbGFiZWxzLnB1c2goc291dGhCaWdMaW9uW2xhbmddID8/IHNvdXRoQmlnTGlvblsnZW4nXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghc2luZ2xlVGFyZ2V0KVxyXG4gICAgICAgICAgbGFiZWxzLnB1c2goc2hhcmVkW2xhbmddID8/IHNoYXJlZFsnZW4nXSk7XHJcbiAgICAgICAgaWYgKGhhc0ZpcmVEZWJ1ZmYpXHJcbiAgICAgICAgICBsYWJlbHMucHVzaChmaXJlRGVidWZmW2xhbmddID8/IGZpcmVEZWJ1ZmZbJ2VuJ10pO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiBgJHttYXRjaGVzLmFiaWxpdHl9ICgke2xhYmVscy5qb2luKCcsICcpfSlgLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0UxMlMgS25vY2tlZCBPZmYnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIC8vIDU4OUEgPSBJY2UgUGlsbGFyIChwcm9taXNlIHNoaXZhIHBoYXNlKVxyXG4gICAgICAvLyA1OEI2ID0gUGFsbSBPZiBUZW1wZXJhbmNlIChwcm9taXNlIHN0YXR1ZSBoYW5kKVxyXG4gICAgICAvLyA1OEI3ID0gTGFzZXIgRXllIChwcm9taXNlIGxpb24gcGhhc2UpXHJcbiAgICAgIC8vIDU4QzEgPSBEYXJrZXN0IERhbmNlIChvcmFjbGUgdGFuayBqdW1wICsga25vY2tiYWNrIGluIGJlZ2lubmluZyBhbmQgdHJpcGxlIGFwb2MpXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogWyc1ODlBJywgJzU4QjYnLCAnNThCNycsICc1OEMxJ10gfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnS25vY2tlZCBvZmYnLFxyXG4gICAgICAgICAgICBkZTogJ1J1bnRlcmdlZmFsbGVuJyxcclxuICAgICAgICAgICAgZnI6ICdBIMOpdMOpIGFzc29tbcOpKGUpJyxcclxuICAgICAgICAgICAgamE6ICfjg47jg4Pjgq/jg5Djg4Pjgq8nLFxyXG4gICAgICAgICAgICBjbjogJ+WHu+mAgOWdoOiQvScsXHJcbiAgICAgICAgICAgIGtvOiAn64SJ67CxJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTEyUyBPcmFjbGUgU2hhZG93ZXllJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnNThEMicsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS5EYW1hZ2VGcm9tTWF0Y2hlcyhtYXRjaGVzKSA+IDAsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gVE9ETzogd2FybmluZyBmb3IgdGFraW5nIERpYW1vbmQgRmxhc2ggKDVGQTEpIHN0YWNrIG9uIHlvdXIgb3duP1xyXG5cclxuLy8gRGlhbW9uZCBXZWFwb24gRXh0cmVtZVxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlQ2xvdWREZWNrRXh0cmVtZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnRGlhbW9uZEV4IEF1cmkgQXJ0cyAxJzogJzVGQUYnLCAvLyBBdXJpIEFydHMgZGFzaGVzL2V4cGxvc2lvbnNcclxuICAgICdEaWFtb25kRXggQXVyaSBBcnRzIDInOiAnNUZCMicsIC8vIEF1cmkgQXJ0cyBkYXNoZXMvZXhwbG9zaW9uc1xyXG4gICAgJ0RpYW1vbmRFeCBBdXJpIEFydHMgMyc6ICc1RkNEJywgLy8gQXVyaSBBcnRzIGRhc2hlcy9leHBsb3Npb25zXHJcbiAgICAnRGlhbW9uZEV4IEF1cmkgQXJ0cyA0JzogJzVGQ0UnLCAvLyBBdXJpIEFydHMgZGFzaGVzL2V4cGxvc2lvbnNcclxuICAgICdEaWFtb25kRXggQXVyaSBBcnRzIDUnOiAnNUZDRicsIC8vIEF1cmkgQXJ0cyBkYXNoZXMvZXhwbG9zaW9uc1xyXG4gICAgJ0RpYW1vbmRFeCBBdXJpIEFydHMgNic6ICc1RkY4JywgLy8gQXVyaSBBcnRzIGRhc2hlcy9leHBsb3Npb25zXHJcbiAgICAnRGlhbW9uZEV4IEF1cmkgQXJ0cyA3JzogJzYxNTknLCAvLyBBdXJpIEFydHMgZGFzaGVzL2V4cGxvc2lvbnNcclxuICAgICdEaWFtb25kRXggQXJ0aWN1bGF0ZWQgQml0IEFldGhlcmlhbCBCdWxsZXQnOiAnNUZBQicsIC8vIGJpdCBsYXNlcnMgZHVyaW5nIGFsbCBwaGFzZXNcclxuICAgICdEaWFtb25kRXggRGlhbW9uZCBTaHJhcG5lbCAxJzogJzVGQ0InLCAvLyBjaGFzaW5nIGNpcmNsZXNcclxuICAgICdEaWFtb25kRXggRGlhbW9uZCBTaHJhcG5lbCAyJzogJzVGQ0MnLCAvLyBjaGFzaW5nIGNpcmNsZXNcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdEaWFtb25kRXggQ2xhdyBTd2lwZSBMZWZ0JzogJzVGQzInLCAvLyBBZGFtYW50IFB1cmdlIHBsYXRmb3JtIGNsZWF2ZVxyXG4gICAgJ0RpYW1vbmRFeCBDbGF3IFN3aXBlIFJpZ2h0JzogJzVGQzMnLCAvLyBBZGFtYW50IFB1cmdlIHBsYXRmb3JtIGNsZWF2ZVxyXG4gICAgJ0RpYW1vbmRFeCBBdXJpIEN5Y2xvbmUgMSc6ICc1RkQxJywgLy8gc3RhbmRpbmcgb24gdGhlIGJsdWUga25vY2tiYWNrIHB1Y2tcclxuICAgICdEaWFtb25kRXggQXVyaSBDeWNsb25lIDInOiAnNUZEMicsIC8vIHN0YW5kaW5nIG9uIHRoZSBibHVlIGtub2NrYmFjayBwdWNrXHJcbiAgICAnRGlhbW9uZEV4IEFpcnNoaXBcXCdzIEJhbmUgMSc6ICc1RkZFJywgLy8gZGVzdHJveWluZyBvbmUgb2YgdGhlIHBsYXRmb3JtcyBhZnRlciBBdXJpIEN5Y2xvbmVcclxuICAgICdEaWFtb25kRXggQWlyc2hpcFxcJ3MgQmFuZSAyJzogJzVGRDMnLCAvLyBkZXN0cm95aW5nIG9uZSBvZiB0aGUgcGxhdGZvcm1zIGFmdGVyIEF1cmkgQ3ljbG9uZVxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnRGlhbW9uZEV4IFRhbmsgTGFzZXJzJzogJzVGQzgnLCAvLyBjbGVhdmluZyB5ZWxsb3cgbGFzZXJzIG9uIHRvcCB0d28gZW5taXR5XHJcbiAgICAnRGlhbW9uZEV4IEhvbWluZyBMYXNlcic6ICc1RkM0JywgLy8gQWRhbWFudGUgUHVyZ2Ugc3ByZWFkXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgICdEaWFtb25kRXggRmxvb2QgUmF5JzogJzVGQzcnLCAvLyBcImxpbWl0IGN1dFwiIGNsZWF2ZXNcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRGlhbW9uZEV4IFZlcnRpY2FsIENsZWF2ZSBLbm9ja2VkIE9mZicsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnNUZEMCcgfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnS25vY2tlZCBvZmYnLFxyXG4gICAgICAgICAgICBkZTogJ1J1bnRlcmdlZmFsbGVuJyxcclxuICAgICAgICAgICAgZnI6ICdBIMOpdMOpIGFzc29tbcOpKGUpJyxcclxuICAgICAgICAgICAgamE6ICfjg47jg4Pjgq/jg5Djg4Pjgq8nLFxyXG4gICAgICAgICAgICBjbjogJ+WHu+mAgOWdoOiQvScsXHJcbiAgICAgICAgICAgIGtvOiAn64SJ67CxJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gRGlhbW9uZCBXZWFwb24gTm9ybWFsXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVDbG91ZERlY2ssXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0RpYW1vbmQgV2VhcG9uIEF1cmkgQXJ0cyc6ICc1RkUzJywgLy8gQXVyaSBBcnRzIGRhc2hlc1xyXG4gICAgJ0RpYW1vbmQgV2VhcG9uIERpYW1vbmQgU2hyYXBuZWwgSW5pdGlhbCc6ICc1RkUxJywgLy8gaW5pdGlhbCBjaXJjbGUgb2YgRGlhbW9uZCBTaHJhcG5lbFxyXG4gICAgJ0RpYW1vbmQgV2VhcG9uIERpYW1vbmQgU2hyYXBuZWwgQ2hhc2luZyc6ICc1RkUyJywgLy8gZm9sbG93dXAgY2lyY2xlcyBmcm9tIERpYW1vbmQgU2hyYXBuZWxcclxuICAgICdEaWFtb25kIFdlYXBvbiBBZXRoZXJpYWwgQnVsbGV0JzogJzVGRDUnLCAvLyBiaXQgbGFzZXJzXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnRGlhbW9uZCBXZWFwb24gQ2xhdyBTd2lwZSBMZWZ0JzogJzVGRDknLCAvLyBBZGFtYW50IFB1cmdlIHBsYXRmb3JtIGNsZWF2ZVxyXG4gICAgJ0RpYW1vbmQgV2VhcG9uIENsYXcgU3dpcGUgUmlnaHQnOiAnNUZEQScsIC8vIEFkYW1hbnQgUHVyZ2UgcGxhdGZvcm0gY2xlYXZlXHJcbiAgICAnRGlhbW9uZCBXZWFwb24gQXVyaSBDeWNsb25lIDEnOiAnNUZFNicsIC8vIHN0YW5kaW5nIG9uIHRoZSBibHVlIGtub2NrYmFjayBwdWNrXHJcbiAgICAnRGlhbW9uZCBXZWFwb24gQXVyaSBDeWNsb25lIDInOiAnNUZFNycsIC8vIHN0YW5kaW5nIG9uIHRoZSBibHVlIGtub2NrYmFjayBwdWNrXHJcbiAgICAnRGlhbW9uZCBXZWFwb24gQWlyc2hpcFxcJ3MgQmFuZSAxJzogJzVGRTgnLCAvLyBkZXN0cm95aW5nIG9uZSBvZiB0aGUgcGxhdGZvcm1zIGFmdGVyIEF1cmkgQ3ljbG9uZVxyXG4gICAgJ0RpYW1vbmQgV2VhcG9uIEFpcnNoaXBcXCdzIEJhbmUgMic6ICc1RkZFJywgLy8gZGVzdHJveWluZyBvbmUgb2YgdGhlIHBsYXRmb3JtcyBhZnRlciBBdXJpIEN5Y2xvbmVcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0RpYW1vbmQgV2VhcG9uIEhvbWluZyBMYXNlcic6ICc1RkRCJywgLy8gc3ByZWFkIG1hcmtlcnNcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRGlhbW9uZCBXZWFwb24gVmVydGljYWwgQ2xlYXZlIEtub2NrZWQgT2ZmJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICc1RkU1JyB9KSxcclxuICAgICAgZGVhdGhSZWFzb246IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdLbm9ja2VkIG9mZicsXHJcbiAgICAgICAgICAgIGRlOiAnUnVudGVyZ2VmYWxsZW4nLFxyXG4gICAgICAgICAgICBmcjogJ0Egw6l0w6kgYXNzb21tw6koZSknLFxyXG4gICAgICAgICAgICBqYTogJ+ODjuODg+OCr+ODkOODg+OCrycsXHJcbiAgICAgICAgICAgIGNuOiAn5Ye76YCA5Z2g6JC9JyxcclxuICAgICAgICAgICAga286ICfrhInrsLEnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkNhc3RydW1NYXJpbnVtRXh0cmVtZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnRW1lcmFsZEV4IEhlYXQgUmF5JzogJzVCRDMnLCAvLyBFbWVyYWxkIEJlYW0gaW5pdGlhbCBjb25hbFxyXG4gICAgJ0VtZXJhbGRFeCBQaG90b24gTGFzZXIgMSc6ICc1NTdCJywgLy8gRW1lcmFsZCBCZWFtIGluc2lkZSBjaXJjbGVcclxuICAgICdFbWVyYWxkRXggUGhvdG9uIExhc2VyIDInOiAnNTU3RCcsIC8vIEVtZXJhbGQgQmVhbSBvdXRzaWRlIGNpcmNsZVxyXG4gICAgJ0VtZXJhbGRFeCBIZWF0IFJheSAxJzogJzU1N0EnLCAvLyBFbWVyYWxkIEJlYW0gcm90YXRpbmcgcHVsc2luZyBsYXNlclxyXG4gICAgJ0VtZXJhbGRFeCBIZWF0IFJheSAyJzogJzU1NzknLCAvLyBFbWVyYWxkIEJlYW0gcm90YXRpbmcgcHVsc2luZyBsYXNlclxyXG4gICAgJ0VtZXJhbGRFeCBFeHBsb3Npb24nOiAnNTU5NicsIC8vIE1hZ2l0ZWsgTWluZSBleHBsb3Npb25cclxuICAgICdFbWVyYWxkRXggVGVydGl1cyBUZXJtaW51cyBFc3QgSW5pdGlhbCc6ICc1NUNEJywgLy8gc3dvcmQgaW5pdGlhbCBwdWRkbGVzXHJcbiAgICAnRW1lcmFsZEV4IFRlcnRpdXMgVGVybWludXMgRXN0IEV4cGxvc2lvbic6ICc1NUNFJywgLy8gc3dvcmQgZXhwbG9zaW9uc1xyXG4gICAgJ0VtZXJhbGRFeCBBaXJib3JuZSBFeHBsb3Npb24nOiAnNTVCRCcsIC8vIGV4YWZsYXJlXHJcbiAgICAnRW1lcmFsZEV4IFNpZGVzY2F0aGUgMSc6ICc1NUQ0JywgLy8gbGVmdC9yaWdodCBjbGVhdmVcclxuICAgICdFbWVyYWxkRXggU2lkZXNjYXRoZSAyJzogJzU1RDUnLCAvLyBsZWZ0L3JpZ2h0IGNsZWF2ZVxyXG4gICAgJ0VtZXJhbGRFeCBTaG90cyBGaXJlZCc6ICc1NUI3JywgLy8gcmFuayBhbmQgZmlsZSBzb2xkaWVyc1xyXG4gICAgJ0VtZXJhbGRFeCBTZWN1bmR1cyBUZXJtaW51cyBFc3QnOiAnNTVDQicsIC8vIGRyb3BwZWQgKyBhbmQgeCBoZWFkbWFya2Vyc1xyXG4gICAgJ0VtZXJhbGRFeCBFeHBpcmUnOiAnNTVEMScsIC8vIGdyb3VuZCBhb2Ugb24gYm9zcyBcImdldCBvdXRcIlxyXG4gICAgJ0VtZXJhbGRFeCBBaXJlIFRhbSBTdG9ybSc6ICc1NUQwJywgLy8gZXhwYW5kaW5nIHJlZCBhbmQgYmxhY2sgZ3JvdW5kIGFvZVxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnRW1lcmFsZEV4IERpdmlkZSBFdCBJbXBlcmEnOiAnNTVEOScsIC8vIG5vbi10YW5rIHByb3RlYW4gc3ByZWFkXHJcbiAgICAnRW1lcmFsZEV4IFByaW11cyBUZXJtaW51cyBFc3QgMSc6ICc1NUM0JywgLy8ga25vY2tiYWNrIGFycm93XHJcbiAgICAnRW1lcmFsZEV4IFByaW11cyBUZXJtaW51cyBFc3QgMic6ICc1NUM1JywgLy8ga25vY2tiYWNrIGFycm93XHJcbiAgICAnRW1lcmFsZEV4IFByaW11cyBUZXJtaW51cyBFc3QgMyc6ICc1NUM2JywgLy8ga25vY2tiYWNrIGFycm93XHJcbiAgICAnRW1lcmFsZEV4IFByaW11cyBUZXJtaW51cyBFc3QgNCc6ICc1NUM3JywgLy8ga25vY2tiYWNrIGFycm93XHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkNhc3RydW1NYXJpbnVtLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdFbWVyYWxkIFdlYXBvbiBIZWF0IFJheSc6ICc0RjlEJywgLy8gRW1lcmFsZCBCZWFtIGluaXRpYWwgY29uYWxcclxuICAgICdFbWVyYWxkIFdlYXBvbiBQaG90b24gTGFzZXIgMSc6ICc1NTM0JywgLy8gRW1lcmFsZCBCZWFtIGluc2lkZSBjaXJjbGVcclxuICAgICdFbWVyYWxkIFdlYXBvbiBQaG90b24gTGFzZXIgMic6ICc1NTM2JywgLy8gRW1lcmFsZCBCZWFtIG1pZGRsZSBjaXJjbGVcclxuICAgICdFbWVyYWxkIFdlYXBvbiBQaG90b24gTGFzZXIgMyc6ICc1NTM4JywgLy8gRW1lcmFsZCBCZWFtIG91dHNpZGUgY2lyY2xlXHJcbiAgICAnRW1lcmFsZCBXZWFwb24gSGVhdCBSYXkgMSc6ICc1NTMyJywgLy8gRW1lcmFsZCBCZWFtIHJvdGF0aW5nIHB1bHNpbmcgbGFzZXJcclxuICAgICdFbWVyYWxkIFdlYXBvbiBIZWF0IFJheSAyJzogJzU1MzMnLCAvLyBFbWVyYWxkIEJlYW0gcm90YXRpbmcgcHVsc2luZyBsYXNlclxyXG4gICAgJ0VtZXJhbGQgV2VhcG9uIE1hZ25ldGljIE1pbmUgRXhwbG9zaW9uJzogJzVCMDQnLCAvLyByZXB1bHNpbmcgbWluZSBleHBsb3Npb25zXHJcbiAgICAnRW1lcmFsZCBXZWFwb24gU2lkZXNjYXRoZSAxJzogJzU1M0YnLCAvLyBsZWZ0L3JpZ2h0IGNsZWF2ZVxyXG4gICAgJ0VtZXJhbGQgV2VhcG9uIFNpZGVzY2F0aGUgMic6ICc1NTQwJywgLy8gbGVmdC9yaWdodCBjbGVhdmVcclxuICAgICdFbWVyYWxkIFdlYXBvbiBTaWRlc2NhdGhlIDMnOiAnNTU0MScsIC8vIGxlZnQvcmlnaHQgY2xlYXZlXHJcbiAgICAnRW1lcmFsZCBXZWFwb24gU2lkZXNjYXRoZSA0JzogJzU1NDInLCAvLyBsZWZ0L3JpZ2h0IGNsZWF2ZVxyXG4gICAgJ0VtZXJhbGQgV2VhcG9uIEJpdCBTdG9ybSc6ICc1NTRBJywgLy8gXCJnZXQgaW5cIlxyXG4gICAgJ0VtZXJhbGQgV2VhcG9uIEVtZXJhbGQgQ3J1c2hlcic6ICc1NTNDJywgLy8gYmx1ZSBrbm9ja2JhY2sgcHVja1xyXG4gICAgJ0VtZXJhbGQgV2VhcG9uIFB1bHNlIExhc2VyJzogJzU1NDgnLCAvLyBsaW5lIGFvZVxyXG4gICAgJ0VtZXJhbGQgV2VhcG9uIEVuZXJneSBBZXRoZXJvcGxhc20nOiAnNTU1MScsIC8vIGhpdHRpbmcgYSBnbG93eSBvcmJcclxuICAgICdFbWVyYWxkIFdlYXBvbiBEaXZpZGUgRXQgSW1wZXJhIEdyb3VuZCc6ICc1NTZGJywgLy8gcGFydHkgdGFyZ2V0ZWQgZ3JvdW5kIGNvbmVzXHJcbiAgICAnRW1lcmFsZCBXZWFwb24gUHJpbXVzIFRlcm1pbnVzIEVzdCc6ICc0QjNFJywgLy8gZ3JvdW5kIGNpcmNsZSBkdXJpbmcgYXJyb3cgaGVhZG1hcmtlcnNcclxuICAgICdFbWVyYWxkIFdlYXBvbiBTZWN1bmR1cyBUZXJtaW51cyBFc3QnOiAnNTU2QScsIC8vIFggLyArIGhlYWRtYXJrZXJzXHJcbiAgICAnRW1lcmFsZCBXZWFwb24gVGVydGl1cyBUZXJtaW51cyBFc3QnOiAnNTU2RCcsIC8vIHRyaXBsZSBzd29yZHNcclxuICAgICdFbWVyYWxkIFdlYXBvbiBTaG90cyBGaXJlZCc6ICc1NTVGJywgLy8gbGluZSBhb2VzIGZyb20gc29sZGllcnNcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0VtZXJhbGQgV2VhcG9uIERpdmlkZSBFdCBJbXBlcmEgUDEnOiAnNTU0RScsIC8vIHRhbmtidXN0ZXIsIHByb2JhYmx5IGNsZWF2ZXMsIHBoYXNlIDFcclxuICAgICdFbWVyYWxkIFdlYXBvbiBEaXZpZGUgRXQgSW1wZXJhIFAyJzogJzU1NzAnLCAvLyB0YW5rYnVzdGVyLCBwcm9iYWJseSBjbGVhdmVzLCBwaGFzZSAyXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ0VtZXJhbGQgV2VhcG9uIEVtZXJhbGQgQ3J1c2hlciBLbm9ja2VkIE9mZicsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnNTUzRScgfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnS25vY2tlZCBvZmYnLFxyXG4gICAgICAgICAgICBkZTogJ1J1bnRlcmdlZmFsbGVuJyxcclxuICAgICAgICAgICAgZnI6ICdBIMOpdMOpIGFzc29tbcOpKGUpJyxcclxuICAgICAgICAgICAgamE6ICfjg47jg4Pjgq/jg5Djg4Pjgq8nLFxyXG4gICAgICAgICAgICBjbjogJ+WHu+mAgOWdoOiQvScsXHJcbiAgICAgICAgICAgIGtvOiAn64SJ67CxJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIEdldHRpbmcga25vY2tlZCBpbnRvIGEgd2FsbCBmcm9tIHRoZSBhcnJvdyBoZWFkbWFya2VyLlxyXG4gICAgICBpZDogJ0VtZXJhbGQgV2VhcG9uIFByaW11cyBUZXJtaW51cyBFc3QgV2FsbCcsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiBbJzU1NjMnLCAnNTU2NCddIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ1B1c2hlZCBpbnRvIHdhbGwnLFxyXG4gICAgICAgICAgICBkZTogJ1LDvGNrc3Rvw58gaW4gZGllIFdhbmQnLFxyXG4gICAgICAgICAgICBqYTogJ+WjgeOBuOODjuODg+OCr+ODkOODg+OCrycsXHJcbiAgICAgICAgICAgIGNuOiAn5Ye76YCA6Iez5aKZJyxcclxuICAgICAgICAgICAga286ICfrhInrsLEnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuaW1wb3J0IHsgcGxheWVyRGFtYWdlRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vb29wc3lfY29tbW9uJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGF0YSBleHRlbmRzIE9vcHN5RGF0YSB7XHJcbiAgaGFzRGFyaz86IHN0cmluZ1tdO1xyXG4gIGhhc0JleW9uZERlYXRoPzogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gIGhhc0Rvb20/OiB7IFtuYW1lOiBzdHJpbmddOiBib29sZWFuIH07XHJcbn1cclxuXHJcbi8vIEhhZGVzIEV4XHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVNaW5zdHJlbHNCYWxsYWRIYWRlc3NFbGVneSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnSGFkZXNFeCBTaGFkb3cgU3ByZWFkIDInOiAnNDdBQScsXHJcbiAgICAnSGFkZXNFeCBTaGFkb3cgU3ByZWFkIDMnOiAnNDdFNCcsXHJcbiAgICAnSGFkZXNFeCBTaGFkb3cgU3ByZWFkIDQnOiAnNDdFNScsXHJcbiAgICAvLyBFdmVyeWJvZHkgc3RhY2tzIGluIGdvb2QgZmFpdGggZm9yIEJhZCBGYWl0aCwgc28gZG9uJ3QgY2FsbCBpdCBhIG1pc3Rha2UuXHJcbiAgICAvLyAnSGFkZXNFeCBCYWQgRmFpdGggMSc6ICc0N0FEJyxcclxuICAgIC8vICdIYWRlc0V4IEJhZCBGYWl0aCAyJzogJzQ3QjAnLFxyXG4gICAgLy8gJ0hhZGVzRXggQmFkIEZhaXRoIDMnOiAnNDdBRScsXHJcbiAgICAvLyAnSGFkZXNFeCBCYWQgRmFpdGggNCc6ICc0N0FGJyxcclxuICAgICdIYWRlc0V4IEJyb2tlbiBGYWl0aCc6ICc0N0IyJyxcclxuICAgICdIYWRlc0V4IE1hZ2ljIFNwZWFyJzogJzQ3QjYnLFxyXG4gICAgJ0hhZGVzRXggTWFnaWMgQ2hha3JhbSc6ICc0N0I1JyxcclxuICAgICdIYWRlc0V4IEZvcmtlZCBMaWdodG5pbmcnOiAnNDdDOScsXHJcbiAgICAnSGFkZXNFeCBEYXJrIEN1cnJlbnQgMSc6ICc0N0YxJyxcclxuICAgICdIYWRlc0V4IERhcmsgQ3VycmVudCAyJzogJzQ3RjInLFxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ0hhZGVzRXggQ29tZXQnOiAnNDdCOScsIC8vIG1pc3NlZCB0b3dlclxyXG4gICAgJ0hhZGVzRXggQW5jaWVudCBFcnVwdGlvbic6ICc0N0QzJyxcclxuICAgICdIYWRlc0V4IFB1cmdhdGlvbiAxJzogJzQ3RUMnLFxyXG4gICAgJ0hhZGVzRXggUHVyZ2F0aW9uIDInOiAnNDdFRCcsXHJcbiAgICAnSGFkZXNFeCBTaGFkb3cgU3RyZWFtJzogJzQ3RUEnLFxyXG4gICAgJ0hhZGVzRXggRGVhZCBTcGFjZSc6ICc0N0VFJyxcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0hhZGVzRXggU2hhZG93IFNwcmVhZCBJbml0aWFsJzogJzQ3QTknLFxyXG4gICAgJ0hhZGVzRXggUmF2ZW5vdXMgQXNzYXVsdCc6ICcoPzo0N0E2fDQ3QTcpJyxcclxuICAgICdIYWRlc0V4IERhcmsgRmxhbWUgMSc6ICc0N0M2JyxcclxuICAgICdIYWRlc0V4IERhcmsgRnJlZXplIDEnOiAnNDdDNCcsXHJcbiAgICAnSGFkZXNFeCBEYXJrIEZyZWV6ZSAyJzogJzQ3REYnLFxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdIYWRlc0V4IERhcmsgSUkgVGV0aGVyJyxcclxuICAgICAgdHlwZTogJ1RldGhlcicsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLnRldGhlcih7IHNvdXJjZTogJ1NoYWRvdyBvZiB0aGUgQW5jaWVudHMnLCBpZDogJzAwMTEnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5oYXNEYXJrID8/PSBbXTtcclxuICAgICAgICBkYXRhLmhhc0RhcmsucHVzaChtYXRjaGVzLnRhcmdldCk7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0hhZGVzRXggRGFyayBJSScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyB0eXBlOiAnMjInLCBpZDogJzQ3QkEnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIC8vIERvbid0IGJsYW1lIHBlb3BsZSB3aG8gZG9uJ3QgaGF2ZSB0ZXRoZXJzLlxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiBkYXRhLmhhc0RhcmsgJiYgZGF0YS5oYXNEYXJrLmluY2x1ZGVzKG1hdGNoZXMudGFyZ2V0KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdIYWRlc0V4IEJvc3MgVGV0aGVyJyxcclxuICAgICAgdHlwZTogJ1RldGhlcicsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLnRldGhlcih7IHNvdXJjZTogWydJZ2V5b3JobVxcJ3MgU2hhZGUnLCAnTGFoYWJyZWFcXCdzIFNoYWRlJ10sIGlkOiAnMDAwRScsIGNhcHR1cmU6IGZhbHNlIH0pLFxyXG4gICAgICBtaXN0YWtlOiB7XHJcbiAgICAgICAgdHlwZTogJ3dhcm4nLFxyXG4gICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgIGVuOiAnQm9zc2VzIFRvbyBDbG9zZScsXHJcbiAgICAgICAgICBkZTogJ0Jvc3NlcyB6dSBOYWhlJyxcclxuICAgICAgICAgIGZyOiAnQm9zcyB0cm9wIHByb2NoZXMnLFxyXG4gICAgICAgICAgamE6ICfjg5zjgrnov5HjgZnjgY7jgosnLFxyXG4gICAgICAgICAgY246ICdCT1NT6Z2g5aSq6L+R5LqGJyxcclxuICAgICAgICAgIGtvOiAn7KuE65Ok7J20IOuEiOustCDqsIDquYzsm4AnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0hhZGVzRXggRGVhdGggU2hyaWVrJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnNDdDQicsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS5EYW1hZ2VGcm9tTWF0Y2hlcyhtYXRjaGVzKSA+IDAsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnSGFkZXNFeCBCZXlvbmQgRGVhdGggR2FpbicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICc1NjYnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5oYXNCZXlvbmREZWF0aCA/Pz0ge307XHJcbiAgICAgICAgZGF0YS5oYXNCZXlvbmREZWF0aFttYXRjaGVzLnRhcmdldF0gPSB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdIYWRlc0V4IEJleW9uZCBEZWF0aCBMb3NlJyxcclxuICAgICAgdHlwZTogJ0xvc2VzRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMubG9zZXNFZmZlY3QoeyBlZmZlY3RJZDogJzU2NicgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmhhc0JleW9uZERlYXRoID8/PSB7fTtcclxuICAgICAgICBkYXRhLmhhc0JleW9uZERlYXRoW21hdGNoZXMudGFyZ2V0XSA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdIYWRlc0V4IEJleW9uZCBEZWF0aCcsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICc1NjYnIH0pLFxyXG4gICAgICBkZWxheVNlY29uZHM6IChfZGF0YSwgbWF0Y2hlcykgPT4gcGFyc2VGbG9hdChtYXRjaGVzLmR1cmF0aW9uKSAtIDAuNSxcclxuICAgICAgZGVhdGhSZWFzb246IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgaWYgKCFkYXRhLmhhc0JleW9uZERlYXRoKVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICghZGF0YS5oYXNCZXlvbmREZWF0aFttYXRjaGVzLnRhcmdldF0pXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDogbWF0Y2hlcy5lZmZlY3QsXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnSGFkZXNFeCBEb29tIEdhaW4nLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnNkU5JyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuaGFzRG9vbSA/Pz0ge307XHJcbiAgICAgICAgZGF0YS5oYXNEb29tW21hdGNoZXMudGFyZ2V0XSA9IHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0hhZGVzRXggRG9vbSBMb3NlJyxcclxuICAgICAgdHlwZTogJ0xvc2VzRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMubG9zZXNFZmZlY3QoeyBlZmZlY3RJZDogJzZFOScgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmhhc0Rvb20gPz89IHt9O1xyXG4gICAgICAgIGRhdGEuaGFzRG9vbVttYXRjaGVzLnRhcmdldF0gPSBmYWxzZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnSGFkZXNFeCBEb29tJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzZFOScgfSksXHJcbiAgICAgIGRlbGF5U2Vjb25kczogKF9kYXRhLCBtYXRjaGVzKSA9PiBwYXJzZUZsb2F0KG1hdGNoZXMuZHVyYXRpb24pIC0gMC41LFxyXG4gICAgICBkZWF0aFJlYXNvbjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBpZiAoIWRhdGEuaGFzRG9vbSlcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAoIWRhdGEuaGFzRG9vbVttYXRjaGVzLnRhcmdldF0pXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDogbWF0Y2hlcy5lZmZlY3QsXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIEhhZGVzIE5vcm1hbFxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlRHlpbmdHYXNwLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdIYWRlcyBCYWQgRmFpdGggMSc6ICc0MTRCJyxcclxuICAgICdIYWRlcyBCYWQgRmFpdGggMic6ICc0MTRDJyxcclxuICAgICdIYWRlcyBEYXJrIEVydXB0aW9uJzogJzQxNTInLFxyXG4gICAgJ0hhZGVzIFNoYWRvdyBTcHJlYWQgMSc6ICc0MTU2JyxcclxuICAgICdIYWRlcyBTaGFkb3cgU3ByZWFkIDInOiAnNDE1NycsXHJcbiAgICAnSGFkZXMgQnJva2VuIEZhaXRoJzogJzQxNEUnLFxyXG4gICAgJ0hhZGVzIEhlbGxib3JuIFlhd3AnOiAnNDE2RicsXHJcbiAgICAnSGFkZXMgUHVyZ2F0aW9uJzogJzQxNzInLFxyXG4gICAgJ0hhZGVzIFNoYWRvdyBTdHJlYW0nOiAnNDE1QycsXHJcbiAgICAnSGFkZXMgQWVybyc6ICc0NTk1JyxcclxuICAgICdIYWRlcyBFY2hvIDEnOiAnNDE2MycsXHJcbiAgICAnSGFkZXMgRWNobyAyJzogJzQxNjQnLFxyXG4gIH0sXHJcbiAgc2hhcmVGYWlsOiB7XHJcbiAgICAnSGFkZXMgTmV0aGVyIEJsYXN0JzogJzQxNjMnLFxyXG4gICAgJ0hhZGVzIFJhdmVub3VzIEFzc2F1bHQnOiAnNDE1OCcsXHJcbiAgICAnSGFkZXMgQW5jaWVudCBEYXJrbmVzcyc6ICc0NTkzJyxcclxuICAgICdIYWRlcyBEdWFsIFN0cmlrZSc6ICc0MTYyJyxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gSW5ub2NlbmNlIEV4dHJlbWVcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZUNyb3duT2ZUaGVJbW1hY3VsYXRlRXh0cmVtZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnSW5ub0V4IER1ZWwgRGVzY2VudCc6ICczRUQyJyxcclxuICAgICdJbm5vRXggUmVwcm9iYXRpb24gMSc6ICczRUUwJyxcclxuICAgICdJbm5vRXggUmVwcm9iYXRpb24gMic6ICczRUNDJyxcclxuICAgICdJbm5vRXggU3dvcmQgb2YgQ29uZGVtbmF0aW9uIDEnOiAnM0VERScsXHJcbiAgICAnSW5ub0V4IFN3b3JkIG9mIENvbmRlbW5hdGlvbiAyJzogJzNFREYnLFxyXG4gICAgJ0lubm9FeCBEcmVhbSBvZiB0aGUgUm9vZCAxJzogJzNFRDMnLFxyXG4gICAgJ0lubm9FeCBEcmVhbSBvZiB0aGUgUm9vZCAyJzogJzNFRDQnLFxyXG4gICAgJ0lubm9FeCBEcmVhbSBvZiB0aGUgUm9vZCAzJzogJzNFRDUnLFxyXG4gICAgJ0lubm9FeCBEcmVhbSBvZiB0aGUgUm9vZCA0JzogJzNFRDYnLFxyXG4gICAgJ0lubm9FeCBEcmVhbSBvZiB0aGUgUm9vZCA1JzogJzNFRkInLFxyXG4gICAgJ0lubm9FeCBEcmVhbSBvZiB0aGUgUm9vZCA2JzogJzNFRkMnLFxyXG4gICAgJ0lubm9FeCBEcmVhbSBvZiB0aGUgUm9vZCA3JzogJzNFRkQnLFxyXG4gICAgJ0lubm9FeCBEcmVhbSBvZiB0aGUgUm9vZCA4JzogJzNFRkUnLFxyXG4gICAgJ0lubm9FeCBIb2x5IFRyaW5pdHknOiAnM0VEQicsXHJcbiAgICAnSW5ub0V4IFNvdWwgYW5kIEJvZHkgMSc6ICczRUQ3JyxcclxuICAgICdJbm5vRXggU291bCBhbmQgQm9keSAyJzogJzNFRDgnLFxyXG4gICAgJ0lubm9FeCBTb3VsIGFuZCBCb2R5IDMnOiAnM0VEOScsXHJcbiAgICAnSW5ub0V4IFNvdWwgYW5kIEJvZHkgNCc6ICczRURBJyxcclxuICAgICdJbm5vRXggU291bCBhbmQgQm9keSA1JzogJzNFRkYnLFxyXG4gICAgJ0lubm9FeCBTb3VsIGFuZCBCb2R5IDYnOiAnM0YwMCcsXHJcbiAgICAnSW5ub0V4IFNvdWwgYW5kIEJvZHkgNyc6ICczRjAxJyxcclxuICAgICdJbm5vRXggU291bCBhbmQgQm9keSA4JzogJzNGMDInLFxyXG4gICAgJ0lubm9FeCBHb2QgUmF5IDEnOiAnM0VFNicsXHJcbiAgICAnSW5ub0V4IEdvZCBSYXkgMic6ICczRUU3JyxcclxuICAgICdJbm5vRXggR29kIFJheSAzJzogJzNFRTgnLFxyXG4gICAgJ0lubm9FeCBFeHBsb3Npb24nOiAnM0VGMCcsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIElubm9jZW5jZSBOb3JtYWxcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZUNyb3duT2ZUaGVJbW1hY3VsYXRlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdJbm5vIERheWJyZWFrJzogJzNFOUQnLFxyXG4gICAgJ0lubm8gSG9seSBUcmluaXR5JzogJzNFQjMnLFxyXG5cclxuICAgICdJbm5vIFJlcHJvYmF0aW9uIDEnOiAnM0VCNicsXHJcbiAgICAnSW5ubyBSZXByb2JhdGlvbiAyJzogJzNFQjgnLFxyXG4gICAgJ0lubm8gUmVwcm9iYXRpb24gMyc6ICczRUNCJyxcclxuICAgICdJbm5vIFJlcHJvYmF0aW9uIDQnOiAnM0VCNycsXHJcblxyXG4gICAgJ0lubm8gU291bCBhbmQgQm9keSAxJzogJzNFQjEnLFxyXG4gICAgJ0lubm8gU291bCBhbmQgQm9keSAyJzogJzNFQjInLFxyXG4gICAgJ0lubm8gU291bCBhbmQgQm9keSAzJzogJzNFRjknLFxyXG4gICAgJ0lubm8gU291bCBhbmQgQm9keSA0JzogJzNFRkEnLFxyXG5cclxuICAgICdJbm5vIEdvZCBSYXkgMSc6ICczRUJEJyxcclxuICAgICdJbm5vIEdvZCBSYXkgMic6ICczRUJFJyxcclxuICAgICdJbm5vIEdvZCBSYXkgMyc6ICczRUJGJyxcclxuICAgICdJbm5vIEdvZCBSYXkgNCc6ICczRUMwJyxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBJdCdzIGhhcmQgdG8gY2FwdHVyZSB0aGUgcmVmbGVjdGlvbiBhYmlsaXRpZXMgZnJvbSBMZXZpYXRoYW4ncyBIZWFkIGFuZCBUYWlsIGlmIHlvdSB1c2VcclxuLy8gcmFuZ2VkIHBoeXNpY2FsIGF0dGFja3MgLyBtYWdpYyBhdHRhY2tzIHJlc3BlY3RpdmVseSwgYXMgdGhlIGFiaWxpdHkgbmFtZXMgYXJlIHRoZVxyXG4vLyBhYmlsaXR5IHlvdSB1c2VkIGFuZCBkb24ndCBhcHBlYXIgdG8gc2hvdyB1cCBpbiB0aGUgbG9nIGFzIG5vcm1hbCBcImFiaWxpdHlcIiBsaW5lcy5cclxuLy8gVGhhdCBzYWlkLCBkb3RzIHN0aWxsIHRpY2sgaW5kZXBlbmRlbnRseSBvbiBib3RoIHNvIGl0J3MgbGlrZWx5IHRoYXQgcGVvcGxlIHdpbGwgYXRhY2tcclxuLy8gdGhlbSBhbnl3YXkuXHJcblxyXG4vLyBUT0RPOiBGaWd1cmUgb3V0IHdoeSBEcmVhZCBUaWRlIC8gV2F0ZXJzcG91dCBhcHBlYXIgbGlrZSBzaGFyZXMgKGkuZS4gMHgxNiBpZCkuXHJcbi8vIERyZWFkIFRpZGUgPSA1Q0NBLzVDQ0IvNUNDQywgV2F0ZXJzcG91dCA9IDVDRDFcclxuXHJcbi8vIExldmlhdGhhbiBVbnJlYWxcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZVdob3JsZWF0ZXJVbnJlYWwsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0xldmlVbiBHcmFuZCBGYWxsJzogJzVDREYnLCAvLyB2ZXJ5IGxhcmdlIGNpcmN1bGFyIGFvZSBiZWZvcmUgc3Bpbm55IGRpdmVzLCBhcHBsaWVzIGhlYXZ5XHJcbiAgICAnTGV2aVVuIEh5ZHJvc2hvdCc6ICc1Q0Q1JywgLy8gV2F2ZXNwaW5lIFNhaGFnaW4gYW9lIHRoYXQgZ2l2ZXMgRHJvcHN5IGVmZmVjdFxyXG4gICAgJ0xldmlVbiBEcmVhZHN0b3JtJzogJzVDRDYnLCAvLyBXYXZldG9vdGggU2FoYWdpbiBhb2UgdGhhdCBnaXZlcyBIeXN0ZXJpYSBlZmZlY3RcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdMZXZpVW4gQm9keSBTbGFtJzogJzVDRDInLCAvLyBsZXZpIHNsYW0gdGhhdCB0aWx0cyB0aGUgYm9hdFxyXG4gICAgJ0xldmlVbiBTcGlubmluZyBEaXZlIDEnOiAnNUNEQicsIC8vIGxldmkgZGFzaCBhY3Jvc3MgdGhlIGJvYXQgd2l0aCBrbm9ja2JhY2tcclxuICAgICdMZXZpVW4gU3Bpbm5pbmcgRGl2ZSAyJzogJzVDRTMnLCAvLyBsZXZpIGRhc2ggYWNyb3NzIHRoZSBib2F0IHdpdGgga25vY2tiYWNrXHJcbiAgICAnTGV2aVVuIFNwaW5uaW5nIERpdmUgMyc6ICc1Q0U4JywgLy8gbGV2aSBkYXNoIGFjcm9zcyB0aGUgYm9hdCB3aXRoIGtub2NrYmFja1xyXG4gICAgJ0xldmlVbiBTcGlubmluZyBEaXZlIDQnOiAnNUNFOScsIC8vIGxldmkgZGFzaCBhY3Jvc3MgdGhlIGJvYXQgd2l0aCBrbm9ja2JhY2tcclxuICB9LFxyXG4gIGdhaW5zRWZmZWN0V2Fybjoge1xyXG4gICAgJ0xldmlVbiBEcm9wc3knOiAnMTEwJywgLy8gc3RhbmRpbmcgaW4gdGhlIGh5ZHJvIHNob3QgZnJvbSB0aGUgV2F2ZXNwaW5lIFNhaGFnaW5cclxuICB9LFxyXG4gIGdhaW5zRWZmZWN0RmFpbDoge1xyXG4gICAgJ0xldmlVbiBIeXN0ZXJpYSc6ICcxMjgnLCAvLyBzdGFuZGluZyBpbiB0aGUgZHJlYWRzdG9ybSBmcm9tIHRoZSBXYXZldG9vdGggU2FoYWdpblxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdMZXZpVW4gQm9keSBTbGFtIEtub2NrZWQgT2ZmJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICc1Q0QyJyB9KSxcclxuICAgICAgZGVhdGhSZWFzb246IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdLbm9ja2VkIG9mZicsXHJcbiAgICAgICAgICAgIGRlOiAnUnVudGVyZ2VmYWxsZW4nLFxyXG4gICAgICAgICAgICBmcjogJ0Egw6l0w6kgYXNzb21tw6koZSknLFxyXG4gICAgICAgICAgICBqYTogJ+ODjuODg+OCr+ODkOODg+OCrycsXHJcbiAgICAgICAgICAgIGNuOiAn5Ye76YCA5Z2g6JC9JyxcclxuICAgICAgICAgICAga286ICfrhInrsLEnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBUT0RPOiB0YWtpbmcgdHdvIGRpZmZlcmVudCBIaWdoLVBvd2VyZWQgSG9taW5nIExhc2VycyAoNEFEOClcclxuLy8gVE9ETzogY291bGQgYmxhbWUgdGhlIHRldGhlcmVkIHBsYXllciBmb3IgV2hpdGUgQWdvbnkgLyBXaGl0ZSBGdXJ5IGZhaWx1cmVzP1xyXG5cclxuLy8gUnVieSBXZWFwb24gRXh0cmVtZVxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuQ2luZGVyRHJpZnRFeHRyZW1lLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdSdWJ5RXggUnVieSBCaXQgTWFnaXRlayBSYXknOiAnNEFEMicsIC8vIGxpbmUgYW9lcyBkdXJpbmcgaGVsaWNvY2xhd1xyXG4gICAgJ1J1YnlFeCBTcGlrZSBPZiBGbGFtZSAxJzogJzRBRDMnLCAvLyBpbml0aWFsIGV4cGxvc2lvbiBkdXJpbmcgaGVsaWNvY2xhd1xyXG4gICAgJ1J1YnlFeCBTcGlrZSBPZiBGbGFtZSAyJzogJzRCMkYnLCAvLyBmb2xsb3d1cCBoZWxpY29jbGF3IGV4cGxvc2lvbnNcclxuICAgICdSdWJ5RXggU3Bpa2UgT2YgRmxhbWUgMyc6ICc0RDA0JywgLy8gcmF2ZW5zY2xhdyBleHBsb3Npb24gYXQgZW5kcyBvZiBsaW5lc1xyXG4gICAgJ1J1YnlFeCBTcGlrZSBPZiBGbGFtZSA0JzogJzREMDUnLCAvLyByYXZlbnNjbGF3IGV4cGxvc2lvbiBhdCBlbmRzIG9mIGxpbmVzXHJcbiAgICAnUnVieUV4IFNwaWtlIE9mIEZsYW1lIDUnOiAnNEFDRCcsIC8vIHJhdmVuc2NsYXcgZXhwbG9zaW9uIGF0IGVuZHMgb2YgbGluZXNcclxuICAgICdSdWJ5RXggU3Bpa2UgT2YgRmxhbWUgNic6ICc0QUNFJywgLy8gcmF2ZW5zY2xhdyBleHBsb3Npb24gYXQgZW5kcyBvZiBsaW5lc1xyXG4gICAgJ1J1YnlFeCBVbmRlcm1pbmUnOiAnNEFEMCcsIC8vIGdyb3VuZCBhb2VzIHVuZGVyIHRoZSByYXZlbnNjbGF3IHBhdGNoZXNcclxuICAgICdSdWJ5RXggUnVieSBSYXknOiAnNEIwMicsIC8vIGZyb250YWwgbGFzZXJcclxuICAgICdSdWJ5RXggUmF2ZW5zZmxpZ2h0IDEnOiAnNEFEOScsIC8vIGRhc2ggYXJvdW5kIHRoZSBhcmVuYVxyXG4gICAgJ1J1YnlFeCBSYXZlbnNmbGlnaHQgMic6ICc0QURBJywgLy8gZGFzaCBhcm91bmQgdGhlIGFyZW5hXHJcbiAgICAnUnVieUV4IFJhdmVuc2ZsaWdodCAzJzogJzRBREQnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5RXggUmF2ZW5zZmxpZ2h0IDQnOiAnNEFERScsIC8vIGRhc2ggYXJvdW5kIHRoZSBhcmVuYVxyXG4gICAgJ1J1YnlFeCBSYXZlbnNmbGlnaHQgNSc6ICc0QURGJywgLy8gZGFzaCBhcm91bmQgdGhlIGFyZW5hXHJcbiAgICAnUnVieUV4IFJhdmVuc2ZsaWdodCA2JzogJzRBRTAnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5RXggUmF2ZW5zZmxpZ2h0IDcnOiAnNEFFMScsIC8vIGRhc2ggYXJvdW5kIHRoZSBhcmVuYVxyXG4gICAgJ1J1YnlFeCBSYXZlbnNmbGlnaHQgOCc6ICc0QUUyJywgLy8gZGFzaCBhcm91bmQgdGhlIGFyZW5hXHJcbiAgICAnUnVieUV4IFJhdmVuc2ZsaWdodCA5JzogJzRBRTMnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5RXggUmF2ZW5zZmxpZ2h0IDEwJzogJzRBRTQnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5RXggUmF2ZW5zZmxpZ2h0IDExJzogJzRBRTUnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5RXggUmF2ZW5zZmxpZ2h0IDEyJzogJzRBRTYnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5RXggUmF2ZW5zZmxpZ2h0IDEzJzogJzRBRTcnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5RXggUmF2ZW5zZmxpZ2h0IDE0JzogJzRBRTgnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5RXggUmF2ZW5zZmxpZ2h0IDE1JzogJzRBRTknLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5RXggUmF2ZW5zZmxpZ2h0IDE2JzogJzRBRUEnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5RXggUmF2ZW5zZmxpZ2h0IDE3JzogJzRFNkInLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5RXggUmF2ZW5zZmxpZ2h0IDE4JzogJzRFNkMnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5RXggUmF2ZW5zZmxpZ2h0IDE5JzogJzRFNkQnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5RXggUmF2ZW5zZmxpZ2h0IDIwJzogJzRFNkUnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5RXggUmF2ZW5zZmxpZ2h0IDIxJzogJzRFNkYnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5RXggUmF2ZW5zZmxpZ2h0IDIyJzogJzRFNzAnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5RXggQ3V0IEFuZCBSdW4gMSc6ICc0QjA1JywgLy8gc2xvdyBjaGFyZ2UgYWNyb3NzIGFyZW5hIGFmdGVyIHN0YWNrc1xyXG4gICAgJ1J1YnlFeCBDdXQgQW5kIFJ1biAyJzogJzRCMDYnLCAvLyBzbG93IGNoYXJnZSBhY3Jvc3MgYXJlbmEgYWZ0ZXIgc3RhY2tzXHJcbiAgICAnUnVieUV4IEN1dCBBbmQgUnVuIDMnOiAnNEIwNycsIC8vIHNsb3cgY2hhcmdlIGFjcm9zcyBhcmVuYSBhZnRlciBzdGFja3NcclxuICAgICdSdWJ5RXggQ3V0IEFuZCBSdW4gNCc6ICc0QjA4JywgLy8gc2xvdyBjaGFyZ2UgYWNyb3NzIGFyZW5hIGFmdGVyIHN0YWNrc1xyXG4gICAgJ1J1YnlFeCBDdXQgQW5kIFJ1biA1JzogJzRET0QnLCAvLyBzbG93IGNoYXJnZSBhY3Jvc3MgYXJlbmEgYWZ0ZXIgc3RhY2tzXHJcbiAgICAnUnVieUV4IE1ldGVvciBCdXJzdCc6ICc0QUYyJywgLy8gbWV0ZW9yIGV4cGxvZGluZ1xyXG4gICAgJ1J1YnlFeCBCcmFkYW1hbnRlJzogJzRFMzgnLCAvLyBoZWFkbWFya2VycyB3aXRoIGxpbmUgYW9lc1xyXG4gICAgJ1J1YnlFeCBDb21ldCBIZWF2eSBJbXBhY3QnOiAnNEFGNicsIC8vIGxldHRpbmcgYSB0YW5rIGNvbWV0IGxhbmRcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdSdWJ5RXggUnVieSBTcGhlcmUgQnVyc3QnOiAnNEFDQicsIC8vIGV4cGxvZGluZyB0aGUgcmVkIG1pbmVcclxuICAgICdSdWJ5RXggTHVuYXIgRHluYW1vJzogJzRFQjAnLCAvLyBcImdldCBpblwiIGZyb20gUmF2ZW4ncyBJbWFnZVxyXG4gICAgJ1J1YnlFeCBJcm9uIENoYXJpb3QnOiAnNEVCMScsIC8vIFwiZ2V0IG91dFwiIGZyb20gUmF2ZW4ncyBJbWFnZVxyXG4gICAgJ1J1YnlFeCBIZWFydCBJbiBUaGUgTWFjaGluZSc6ICc0QUZBJywgLy8gV2hpdGUgQWdvbnkvRnVyeSBza3VsbCBoaXR0aW5nIHBsYXllcnNcclxuICB9LFxyXG4gIGdhaW5zRWZmZWN0RmFpbDoge1xyXG4gICAgJ1J1YnlFeCBIeXN0ZXJpYSc6ICcxMjgnLCAvLyBOZWdhdGl2ZSBBdXJhIGxvb2thd2F5IGZhaWx1cmVcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ1J1YnlFeCBIb21pbmcgTGFzZXJzJzogJzRBRDYnLCAvLyBzcHJlYWQgbWFya2VycyBkdXJpbmcgY3V0IGFuZCBydW5cclxuICAgICdSdWJ5RXggTWV0ZW9yIFN0cmVhbSc6ICc0RTY4JywgLy8gc3ByZWFkIG1hcmtlcnMgZHVyaW5nIFAyXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ1J1YnlFeCBTY3JlZWNoJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICc0QUVFJyB9KSxcclxuICAgICAgZGVhdGhSZWFzb246IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdLbm9ja2VkIGludG8gd2FsbCcsXHJcbiAgICAgICAgICAgIGRlOiAnUsO8Y2tzdG/DnyBpbiBkaWUgV2FuZCcsXHJcbiAgICAgICAgICAgIGphOiAn5aOB44G444OO44OD44Kv44OQ44OD44KvJyxcclxuICAgICAgICAgICAgY246ICflh7vpgIDoh7PlopknLFxyXG4gICAgICAgICAgICBrbzogJ+uEieuwsScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBSdWJ5IE5vcm1hbFxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuQ2luZGVyRHJpZnQsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ1J1YnkgUmF2ZW5zY2xhdyc6ICc0QTkzJywgLy8gY2VudGVyZWQgY2lyY2xlIGFvZSBmb3IgcmF2ZW5zY2xhd1xyXG4gICAgJ1J1YnkgU3Bpa2UgT2YgRmxhbWUgMSc6ICc0QTlBJywgLy8gaW5pdGlhbCBleHBsb3Npb24gZHVyaW5nIGhlbGljb2NsYXdcclxuICAgICdSdWJ5IFNwaWtlIE9mIEZsYW1lIDInOiAnNEIyRScsIC8vIGZvbGxvd3VwIGhlbGljb2NsYXcgZXhwbG9zaW9uc1xyXG4gICAgJ1J1YnkgU3Bpa2UgT2YgRmxhbWUgMyc6ICc0QTk0JywgLy8gcmF2ZW5zY2xhdyBleHBsb3Npb24gYXQgZW5kcyBvZiBsaW5lc1xyXG4gICAgJ1J1YnkgU3Bpa2UgT2YgRmxhbWUgNCc6ICc0QTk1JywgLy8gcmF2ZW5zY2xhdyBleHBsb3Npb24gYXQgZW5kcyBvZiBsaW5lc1xyXG4gICAgJ1J1YnkgU3Bpa2UgT2YgRmxhbWUgNSc6ICc0RDAyJywgLy8gcmF2ZW5zY2xhdyBleHBsb3Npb24gYXQgZW5kcyBvZiBsaW5lc1xyXG4gICAgJ1J1YnkgU3Bpa2UgT2YgRmxhbWUgNic6ICc0RDAzJywgLy8gcmF2ZW5zY2xhdyBleHBsb3Npb24gYXQgZW5kcyBvZiBsaW5lc1xyXG4gICAgJ1J1YnkgUnVieSBSYXknOiAnNEFDNicsIC8vIGZyb250YWwgbGFzZXJcclxuICAgICdSdWJ5IFVuZGVybWluZSc6ICc0QTk3JywgLy8gZ3JvdW5kIGFvZXMgdW5kZXIgdGhlIHJhdmVuc2NsYXcgcGF0Y2hlc1xyXG4gICAgJ1J1YnkgUmF2ZW5zZmxpZ2h0IDEnOiAnNEU2OScsIC8vIGRhc2ggYXJvdW5kIHRoZSBhcmVuYVxyXG4gICAgJ1J1YnkgUmF2ZW5zZmxpZ2h0IDInOiAnNEU2QScsIC8vIGRhc2ggYXJvdW5kIHRoZSBhcmVuYVxyXG4gICAgJ1J1YnkgUmF2ZW5zZmxpZ2h0IDMnOiAnNEFBMScsIC8vIGRhc2ggYXJvdW5kIHRoZSBhcmVuYVxyXG4gICAgJ1J1YnkgUmF2ZW5zZmxpZ2h0IDQnOiAnNEFBMicsIC8vIGRhc2ggYXJvdW5kIHRoZSBhcmVuYVxyXG4gICAgJ1J1YnkgUmF2ZW5zZmxpZ2h0IDUnOiAnNEFBMycsIC8vIGRhc2ggYXJvdW5kIHRoZSBhcmVuYVxyXG4gICAgJ1J1YnkgUmF2ZW5zZmxpZ2h0IDYnOiAnNEFBNCcsIC8vIGRhc2ggYXJvdW5kIHRoZSBhcmVuYVxyXG4gICAgJ1J1YnkgUmF2ZW5zZmxpZ2h0IDcnOiAnNEFBNScsIC8vIGRhc2ggYXJvdW5kIHRoZSBhcmVuYVxyXG4gICAgJ1J1YnkgUmF2ZW5zZmxpZ2h0IDgnOiAnNEFBNicsIC8vIGRhc2ggYXJvdW5kIHRoZSBhcmVuYVxyXG4gICAgJ1J1YnkgUmF2ZW5zZmxpZ2h0IDknOiAnNEFBNycsIC8vIGRhc2ggYXJvdW5kIHRoZSBhcmVuYVxyXG4gICAgJ1J1YnkgUmF2ZW5zZmxpZ2h0IDEwJzogJzRDMjEnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5IFJhdmVuc2ZsaWdodCAxMSc6ICc0QzJBJywgLy8gZGFzaCBhcm91bmQgdGhlIGFyZW5hXHJcbiAgICAnUnVieSBDb21ldCBCdXJzdCc6ICc0QUI0JywgLy8gbWV0ZW9yIGV4cGxvZGluZ1xyXG4gICAgJ1J1YnkgQnJhZGFtYW50ZSc6ICc0QUJDJywgLy8gaGVhZG1hcmtlcnMgd2l0aCBsaW5lIGFvZXNcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ1J1YnkgSG9taW5nIExhc2VyJzogJzRBQzUnLCAvLyBzcHJlYWQgbWFya2VycyBpbiBQMVxyXG4gICAgJ1J1YnkgTWV0ZW9yIFN0cmVhbSc6ICc0RTY3JywgLy8gc3ByZWFkIG1hcmtlcnMgaW4gUDJcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBTaGl2YSBVbnJlYWxcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZUFraEFmYWhBbXBoaXRoZWF0cmVVbnJlYWwsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgLy8gTGFyZ2Ugd2hpdGUgY2lyY2xlcy5cclxuICAgICdTaGl2YUV4IEljaWNsZSBJbXBhY3QnOiAnNTM3QicsXHJcbiAgICAvLyBcImdldCBpblwiIGFvZVxyXG4gICAgJ1NoaXZhRXggV2hpdGVvdXQnOiAnNTM3NicsXHJcbiAgICAvLyBBdm9pZGFibGUgdGFuayBzdHVuLlxyXG4gICAgJ1NoaXZhRXggR2xhY2llciBCYXNoJzogJzUzNzUnLFxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgLy8gMjcwIGRlZ3JlZSBhdHRhY2suXHJcbiAgICAnU2hpdmFFeCBHbGFzcyBEYW5jZSc6ICc1Mzc4JyxcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgLy8gSGFpbHN0b3JtIHNwcmVhZCBtYXJrZXIuXHJcbiAgICAnU2hpdmFFeCBIYWlsc3Rvcm0nOiAnNTM2RicsXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgIC8vIExhc2VyLiAgVE9ETzogbWF5YmUgYmxhbWUgdGhlIHBlcnNvbiBpdCdzIG9uPz9cclxuICAgICdTaGl2YUV4IEF2YWxhbmNoZSc6ICc1Mzc5JyxcclxuICB9LFxyXG4gIHNvbG9XYXJuOiB7XHJcbiAgICAvLyBQYXJ0eSBzaGFyZWQgdGFuayBidXN0ZXIuXHJcbiAgICAnU2hpdmFFeCBJY2VicmFuZCc6ICc1MzczJyxcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnU2hpdmFFeCBEZWVwIEZyZWV6ZScsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIC8vIFNoaXZhIGFsc28gdXNlcyBhYmlsaXR5IDUzN0Egb24geW91LCBidXQgaXQgaGFzIGFuIHVua25vd24gbmFtZS5cclxuICAgICAgLy8gU28sIHVzZSB0aGUgZWZmZWN0IGluc3RlYWQgZm9yIGZyZWUgdHJhbnNsYXRpb24uXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICcxRTcnIH0pLFxyXG4gICAgICBjb25kaXRpb246IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIC8vIFRoZSBpbnRlcm1pc3Npb24gYWxzbyBnZXRzIHRoaXMgZWZmZWN0LCBidXQgZm9yIGEgc2hvcnRlciBkdXJhdGlvbi5cclxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChtYXRjaGVzLmR1cmF0aW9uKSA+IDIwO1xyXG4gICAgICB9LFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnZmFpbCcsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5lZmZlY3QgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVEYW5jaW5nUGxhZ3VlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdUaXRhbmlhIFdvb2RcXCdzIEVtYnJhY2UnOiAnM0Q1MCcsXHJcbiAgICAvLyAnVGl0YW5pYSBGcm9zdCBSdW5lJzogJzNENEUnLFxyXG4gICAgJ1RpdGFuaWEgR2VudGxlIEJyZWV6ZSc6ICczRjgzJyxcclxuICAgICdUaXRhbmlhIExlYWZzdG9ybSAxJzogJzNENTUnLFxyXG4gICAgJ1RpdGFuaWEgUHVja1xcJ3MgUmVidWtlJzogJzNENTgnLFxyXG4gICAgJ1RpdGFuaWEgTGVhZnN0b3JtIDInOiAnM0UwMycsXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnVGl0YW5pYSBQaGFudG9tIFJ1bmUgMSc6ICczRDVEJyxcclxuICAgICdUaXRhbmlhIFBoYW50b20gUnVuZSAyJzogJzNENUUnLFxyXG4gIH0sXHJcbiAgc2hhcmVGYWlsOiB7XHJcbiAgICAnVGl0YW5pYSBEaXZpbmF0aW9uIFJ1bmUnOiAnM0Q1QicsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVEYW5jaW5nUGxhZ3VlRXh0cmVtZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnVGl0YW5pYUV4IFdvb2RcXCdzIEVtYnJhY2UnOiAnM0QyRicsXHJcbiAgICAvLyAnVGl0YW5pYUV4IEZyb3N0IFJ1bmUnOiAnM0QyQicsXHJcbiAgICAnVGl0YW5pYUV4IEdlbnRsZSBCcmVlemUnOiAnM0Y4MicsXHJcbiAgICAnVGl0YW5pYUV4IExlYWZzdG9ybSAxJzogJzNEMzknLFxyXG4gICAgJ1RpdGFuaWFFeCBQdWNrXFwncyBSZWJ1a2UnOiAnM0Q0MycsXHJcbiAgICAnVGl0YW5pYUV4IFdhbGxvcCc6ICczRDNCJyxcclxuICAgICdUaXRhbmlhRXggTGVhZnN0b3JtIDInOiAnM0Q0OScsXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnVGl0YW5pYUV4IFBoYW50b20gUnVuZSAxJzogJzNENEMnLFxyXG4gICAgJ1RpdGFuaWFFeCBQaGFudG9tIFJ1bmUgMic6ICczRDREJyxcclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgLy8gVE9ETzogVGhpcyBjb3VsZCBtYXliZSBibGFtZSB0aGUgcGVyc29uIHdpdGggdGhlIHRldGhlcj9cclxuICAgICdUaXRhbmlhRXggVGh1bmRlciBSdW5lJzogJzNEMjknLFxyXG4gICAgJ1RpdGFuaWFFeCBEaXZpbmF0aW9uIFJ1bmUnOiAnM0Q0QScsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFRpdGFuIFVucmVhbFxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlTmF2ZWxVbnJlYWwsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ1RpdGFuVW4gV2VpZ2h0IE9mIFRoZSBMYW5kJzogJzU4RkUnLFxyXG4gICAgJ1RpdGFuVW4gQnVyc3QnOiAnNUFERicsXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnVGl0YW5VbiBMYW5kc2xpZGUnOiAnNUFEQycsXHJcbiAgICAnVGl0YW5VbiBHYW9sZXIgTGFuZHNsaWRlJzogJzU5MDInLFxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnVGl0YW5VbiBSb2NrIEJ1c3Rlcic6ICc1OEY2JyxcclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgJ1RpdGFuVW4gTW91bnRhaW4gQnVzdGVyJzogJzU4RjcnLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5NZW1vcmlhTWlzZXJhRXh0cmVtZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnVmFyaXNFeCBBbGVhIElhY3RhIEVzdCAxJzogJzRDRDInLFxyXG4gICAgJ1ZhcmlzRXggQWxlYSBJYWN0YSBFc3QgMic6ICc0Q0QzJyxcclxuICAgICdWYXJpc0V4IEFsZWEgSWFjdGEgRXN0IDMnOiAnNENENCcsXHJcbiAgICAnVmFyaXNFeCBBbGVhIElhY3RhIEVzdCA0JzogJzRDRDUnLFxyXG4gICAgJ1ZhcmlzRXggQWxlYSBJYWN0YSBFc3QgNSc6ICc0Q0Q2JyxcclxuICAgICdWYXJpc0V4IElnbmlzIEVzdCAxJzogJzRDQjUnLFxyXG4gICAgJ1ZhcmlzRXggSWduaXMgRXN0IDInOiAnNENDNScsXHJcbiAgICAnVmFyaXNFeCBWZW50dXMgRXN0IDEnOiAnNENDNycsXHJcbiAgICAnVmFyaXNFeCBWZW50dXMgRXN0IDInOiAnNENDOCcsXHJcbiAgICAnVmFyaXNFeCBBc3NhdWx0IENhbm5vbic6ICc0Q0U1JyxcclxuICAgICdWYXJpc0V4IEZvcnRpdXMgUm90YXRpbmcnOiAnNENFOScsXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAvLyBEb24ndCBoaXQgdGhlIHNoaWVsZHMhXHJcbiAgICAnVmFyaXNFeCBSZXBheSc6ICc0Q0REJyxcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgLy8gVGhpcyBpcyB0aGUgXCJwcm90ZWFuXCIgZm9ydGl1cy5cclxuICAgICdWYXJpc0V4IEZvcnRpdXMgUHJvdGVhbic6ICc0Q0U3JyxcclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgJ1ZhcmlzRXggTWFnaXRlayBCdXJzdCc6ICc0Q0RGJyxcclxuICAgICdWYXJpc0V4IEFldGhlcm9jaGVtaWNhbCBHcmVuYWRvJzogJzRDRUQnLFxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdWYXJpc0V4IFRlcm1pbnVzIEVzdCcsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzRDQjQnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIHN1cHByZXNzU2Vjb25kczogMSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBUT0RPOiBSYWRpYW50IEJyYXZlciBpcyA0RjE2LzRGMTcoeDIpLCBzaG91bGRuJ3QgZ2V0IGhpdCBieSBib3RoP1xyXG4vLyBUT0RPOiBSYWRpYW50IERlc3BlcmFkbyBpcyA0RjE4LzRGMTksIHNob3VsZG4ndCBnZXQgaGl0IGJ5IGJvdGg/XHJcbi8vIFRPRE86IFJhZGlhbnQgTWV0ZW9yIGlzIDRGMUEsIGFuZCBzaG91bGRuJ3QgZ2V0IGhpdCBieSBtb3JlIHRoYW4gMT9cclxuLy8gVE9ETzogbWlzc2luZyBhIHRvd2VyP1xyXG5cclxuLy8gTm90ZTogRGVsaWJlcmF0ZWx5IG5vdCBpbmNsdWRpbmcgcHlyZXRpYyBkYW1hZ2UgYXMgYW4gZXJyb3IuXHJcbi8vIE5vdGU6IEl0IGRvZXNuJ3QgYXBwZWFyIHRoYXQgdGhlcmUncyBhbnkgd2F5IHRvIHRlbGwgd2hvIGZhaWxlZCB0aGUgY3V0c2NlbmUuXHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlU2VhdE9mU2FjcmlmaWNlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdXT0wgU29sZW1uIENvbmZpdGVvcic6ICc0RjJBJywgLy8gZ3JvdW5kIHB1ZGRsZXNcclxuICAgICdXT0wgQ29ydXNjYW50IFNhYmVyIEluJzogJzRGMTAnLCAvLyBzYWJlciBpblxyXG4gICAgJ1dPTCBDb3J1c2NhbnQgU2FiZXIgT3V0JzogJzRGMTEnLCAvLyBzYWJlciBvdXRcclxuICAgICdXT0wgSW1idWVkIENvcnVzYW5jZSBPdXQnOiAnNEY0QicsIC8vIHNhYmVyIG91dFxyXG4gICAgJ1dPTCBJbWJ1ZWQgQ29ydXNhbmNlIEluJzogJzRGNEMnLCAvLyBzYWJlciBpblxyXG4gICAgJ1dPTCBTaGluaW5nIFdhdmUnOiAnNEYyNicsIC8vIHN3b3JkIHRyaWFuZ2xlXHJcbiAgICAnV09MIENhdXRlcml6ZSc6ICc0RjI1JyxcclxuICAgICdXT0wgQnJpbXN0b25lIEVhcnRoIDEnOiAnNEYxRScsIC8vIGNvcm5lciBncm93aW5nIGNpcmNsZXMsIGluaXRpYWxcclxuICAgICdXT0wgQnJpbXN0b25lIEVhcnRoIDInOiAnNEYxRicsIC8vIGNvcm5lciBncm93aW5nIGNpcmNsZXMsIGdyb3dpbmdcclxuICAgICdXT0wgRmxhcmUgQnJlYXRoJzogJzRGMjQnLFxyXG4gICAgJ1dPTCBEZWNpbWF0aW9uJzogJzRGMjMnLFxyXG4gIH0sXHJcbiAgZ2FpbnNFZmZlY3RXYXJuOiB7XHJcbiAgICAnV09MIERlZXAgRnJlZXplJzogJzRFNicsXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ1dPTCBUcnVlIFdhbGtpbmcgRGVhZCcsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICczOEUnIH0pLFxyXG4gICAgICBkZWxheVNlY29uZHM6IChfZGF0YSwgbWF0Y2hlcykgPT4gcGFyc2VGbG9hdChtYXRjaGVzLmR1cmF0aW9uKSAtIDAuNSxcclxuICAgICAgZGVhdGhSZWFzb246IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgbmFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuZWZmZWN0IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFRPRE86IFJhZGlhbnQgQnJhdmVyIGlzIDRFRjcvNEVGOCh4MiksIHNob3VsZG4ndCBnZXQgaGl0IGJ5IGJvdGg/XHJcbi8vIFRPRE86IFJhZGlhbnQgRGVzcGVyYWRvIGlzIDRFRjkvNEVGQSwgc2hvdWxkbid0IGdldCBoaXQgYnkgYm90aD9cclxuLy8gVE9ETzogUmFkaWFudCBNZXRlb3IgaXMgNEVGQywgYW5kIHNob3VsZG4ndCBnZXQgaGl0IGJ5IG1vcmUgdGhhbiAxP1xyXG4vLyBUT0RPOiBBYnNvbHV0ZSBIb2x5IHNob3VsZCBiZSBzaGFyZWQ/XHJcbi8vIFRPRE86IGludGVyc2VjdGluZyBicmltc3RvbmVzP1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZVNlYXRPZlNhY3JpZmljZUV4dHJlbWUsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ1dPTEV4IFNvbGVtbiBDb25maXRlb3InOiAnNEYwQycsIC8vIGdyb3VuZCBwdWRkbGVzXHJcbiAgICAnV09MRXggQ29ydXNjYW50IFNhYmVyIEluJzogJzRFRjInLCAvLyBzYWJlciBpblxyXG4gICAgJ1dPTEV4IENvcnVzY2FudCBTYWJlciBPdXQnOiAnNEVGMScsIC8vIHNhYmVyIG91dFxyXG4gICAgJ1dPTEV4IEltYnVlZCBDb3J1c2FuY2UgT3V0JzogJzRGNDknLCAvLyBzYWJlciBvdXRcclxuICAgICdXT0xFeCBJbWJ1ZWQgQ29ydXNhbmNlIEluJzogJzRGNEEnLCAvLyBzYWJlciBpblxyXG4gICAgJ1dPTEV4IFNoaW5pbmcgV2F2ZSc6ICc0RjA4JywgLy8gc3dvcmQgdHJpYW5nbGVcclxuICAgICdXT0xFeCBDYXV0ZXJpemUnOiAnNEYwNycsXHJcbiAgICAnV09MRXggQnJpbXN0b25lIEVhcnRoJzogJzRGMDAnLCAvLyBjb3JuZXIgZ3Jvd2luZyBjaXJjbGVzLCBncm93aW5nXHJcbiAgfSxcclxuICBnYWluc0VmZmVjdFdhcm46IHtcclxuICAgICdXT0xFeCBEZWVwIEZyZWV6ZSc6ICc0RTYnLCAvLyBmYWlsaW5nIEFic29sdXRlIEJsaXp6YXJkIElJSVxyXG4gICAgJ1dPTEV4IERhbWFnZSBEb3duJzogJzI3NCcsIC8vIGZhaWxpbmcgQWJzb2x1dGUgRmxhc2hcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ1dPTEV4IEFic29sdXRlIFN0b25lIElJSSc6ICc0RUVCJywgLy8gcHJvdGVhbiB3YXZlIGltYnVlZCBtYWdpY1xyXG4gICAgJ1dPTEV4IEZsYXJlIEJyZWF0aCc6ICc0RjA2JywgLy8gdGV0aGVyIGZyb20gc3VtbW9uZWQgYmFoYW11dHNcclxuICAgICdXT0xFeCBQZXJmZWN0IERlY2ltYXRpb24nOiAnNEYwNScsIC8vIHNtbi93YXIgcGhhc2UgbWFya2VyXHJcbiAgfSxcclxuICBzb2xvV2Fybjoge1xyXG4gICAgJ1dvbEV4IEthdG9uIFNhbiBTaGFyZSc6ICc0RUZFJyxcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnV09MRXggVHJ1ZSBXYWxraW5nIERlYWQnLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnOEZGJyB9KSxcclxuICAgICAgZGVsYXlTZWNvbmRzOiAoX2RhdGEsIG1hdGNoZXMpID0+IHBhcnNlRmxvYXQobWF0Y2hlcy5kdXJhdGlvbikgLSAwLjUsXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnZmFpbCcsIG5hbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmVmZmVjdCB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdXT0xFeCBUb3dlcicsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnNEYwNCcsIGNhcHR1cmU6IGZhbHNlIH0pLFxyXG4gICAgICBtaXN0YWtlOiB7XHJcbiAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgIGVuOiAnTWlzc2VkIFRvd2VyJyxcclxuICAgICAgICAgIGRlOiAnVHVybSB2ZXJwYXNzdCcsXHJcbiAgICAgICAgICBmcjogJ1RvdXIgbWFucXXDqWUnLFxyXG4gICAgICAgICAgamE6ICfloZTjgpLouI/jgb7jgarjgYvjgaPjgZ8nLFxyXG4gICAgICAgICAgY246ICfmsqHouKnloZQnLFxyXG4gICAgICAgICAga286ICfsnqXtjJAg7Iuk7IiYJyxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdXT0xFeCBUcnVlIEhhbGxvd2VkIEdyb3VuZCcsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnNEY0NCcgfSksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBGb3IgQmVyc2VyayBhbmQgRGVlcCBEYXJrc2lkZVxyXG4gICAgICBpZDogJ1dPTEV4IE1pc3NlZCBJbnRlcnJ1cHQnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogWyc1MTU2JywgJzUxNTgnXSB9KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERhdGEgZXh0ZW5kcyBPb3BzeURhdGEge1xyXG4gIGhhc1Rocm90dGxlPzogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gIGphZ2RUZXRoZXI/OiB7IFtzb3VyY2VJZDogc3RyaW5nXTogc3RyaW5nIH07XHJcbn1cclxuXHJcbi8vIFRPRE86IEZJWCBsdW1pbm91cyBhZXRoZXJvcGxhc20gd2FybmluZyBub3Qgd29ya2luZ1xyXG4vLyBUT0RPOiBGSVggZG9sbCBkZWF0aCBub3Qgd29ya2luZ1xyXG4vLyBUT0RPOiBmYWlsaW5nIGhhbmQgb2YgcGFpbi9wYXJ0aW5nIChjaGVjayBmb3IgaGlnaCBkYW1hZ2U/KVxyXG4vLyBUT0RPOiBtYWtlIHN1cmUgZXZlcnlib2R5IHRha2VzIGV4YWN0bHkgb25lIHByb3RlYW4gKHJhdGhlciB0aGFuIHdhdGNoaW5nIGRvdWJsZSBoaXRzKVxyXG4vLyBUT0RPOiB0aHVuZGVyIG5vdCBoaXR0aW5nIGV4YWN0bHkgMj9cclxuLy8gVE9ETzogcGVyc29uIHdpdGggd2F0ZXIvdGh1bmRlciBkZWJ1ZmYgZHlpbmdcclxuLy8gVE9ETzogYmFkIG5pc2kgcGFzc1xyXG4vLyBUT0RPOiBmYWlsZWQgZ2F2ZWwgbWVjaGFuaWNcclxuLy8gVE9ETzogZG91YmxlIHJvY2tldCBwdW5jaCBub3QgaGl0dGluZyBleGFjdGx5IDI/IChvciB0YW5rcylcclxuLy8gVE9ETzogc3RhbmRpbmcgaW4gc2x1ZGdlIHB1ZGRsZXMgYmVmb3JlIGhpZGRlbiBtaW5lP1xyXG4vLyBUT0RPOiBoaWRkZW4gbWluZSBmYWlsdXJlP1xyXG4vLyBUT0RPOiBmYWlsdXJlcyBvZiBvcmRhaW5lZCBtb3Rpb24gLyBzdGlsbG5lc3NcclxuLy8gVE9ETzogZmFpbHVyZXMgb2YgcGxhaW50IG9mIHNldmVyaXR5ICh0ZXRoZXJzKVxyXG4vLyBUT0RPOiBmYWlsdXJlcyBvZiBwbGFpbnQgb2Ygc29saWRhcml0eSAoc2hhcmVkIHNlbnRlbmNlKVxyXG4vLyBUT0RPOiBvcmRhaW5lZCBjYXBpdGFsIHB1bmlzaG1lbnQgaGl0dGluZyBub24tdGFua3NcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVFcGljT2ZBbGV4YW5kZXJVbHRpbWF0ZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnVEVBIFNsdWljZSc6ICc0OUIxJyxcclxuICAgICdURUEgUHJvdGVhbiBXYXZlIDEnOiAnNDgyNCcsXHJcbiAgICAnVEVBIFByb3RlYW4gV2F2ZSAyJzogJzQ5QjUnLFxyXG4gICAgJ1RFQSBTcGluIENydXNoZXInOiAnNEE3MicsXHJcbiAgICAnVEVBIFNhY3JhbWVudCc6ICc0ODVGJyxcclxuICAgICdURUEgUmFkaWFudCBTYWNyYW1lbnQnOiAnNDg4NicsXHJcbiAgICAnVEVBIEFsbWlnaHR5IEp1ZGdtZW50JzogJzQ4OTAnLFxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ1RFQSBIYXdrIEJsYXN0ZXInOiAnNDgzMCcsXHJcbiAgICAnVEVBIENoYWtyYW0nOiAnNDg1NScsXHJcbiAgICAnVEVBIEVudW1lcmF0aW9uJzogJzQ4NTAnLFxyXG4gICAgJ1RFQSBBcG9jYWx5cHRpYyBSYXknOiAnNDg0QycsXHJcbiAgICAnVEVBIFByb3BlbGxlciBXaW5kJzogJzQ4MzInLFxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnVEVBIFByb3RlYW4gV2F2ZSBEb3VibGUgMSc6ICc0OUI2JyxcclxuICAgICdURUEgUHJvdGVhbiBXYXZlIERvdWJsZSAyJzogJzQ4MjUnLFxyXG4gICAgJ1RFQSBGbHVpZCBTd2luZyc6ICc0OUIwJyxcclxuICAgICdURUEgRmx1aWQgU3RyaWtlJzogJzQ5QjcnLFxyXG4gICAgJ1RFQSBIaWRkZW4gTWluZSc6ICc0ODUyJyxcclxuICAgICdURUEgQWxwaGEgU3dvcmQnOiAnNDg2QicsXHJcbiAgICAnVEVBIEZsYXJldGhyb3dlcic6ICc0ODZCJyxcclxuICAgICdURUEgQ2hhc3RlbmluZyBIZWF0JzogJzRBODAnLFxyXG4gICAgJ1RFQSBEaXZpbmUgU3BlYXInOiAnNEE4MicsXHJcbiAgICAnVEVBIE9yZGFpbmVkIFB1bmlzaG1lbnQnOiAnNDg5MScsXHJcbiAgICAvLyBPcHRpY2FsIFNwcmVhZFxyXG4gICAgJ1RFQSBJbmRpdmlkdWFsIFJlcHJvYmF0aW9uJzogJzQ4OEMnLFxyXG4gIH0sXHJcbiAgc29sb0ZhaWw6IHtcclxuICAgIC8vIE9wdGljYWwgU3RhY2tcclxuICAgICdURUEgQ29sbGVjdGl2ZSBSZXByb2JhdGlvbic6ICc0ODhEJyxcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIC8vIFwidG9vIG11Y2ggbHVtaW5vdXMgYWV0aGVyb3BsYXNtXCJcclxuICAgICAgLy8gV2hlbiB0aGlzIGhhcHBlbnMsIHRoZSB0YXJnZXQgZXhwbG9kZXMsIGhpdHRpbmcgbmVhcmJ5IHBlb3BsZVxyXG4gICAgICAvLyBidXQgYWxzbyB0aGVtc2VsdmVzLlxyXG4gICAgICBpZDogJ1RFQSBFeGhhdXN0JyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnNDgxRicsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoX2RhdGEsIG1hdGNoZXMpID0+IG1hdGNoZXMudGFyZ2V0ID09PSBtYXRjaGVzLnNvdXJjZSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIGJsYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdsdW1pbm91cyBhZXRoZXJvcGxhc20nLFxyXG4gICAgICAgICAgICBkZTogJ0x1bWluaXN6ZW50ZXMgw4R0aGVyb3BsYXNtYScsXHJcbiAgICAgICAgICAgIGZyOiAnw4l0aMOpcm9wbGFzbWEgbHVtaW5ldXgnLFxyXG4gICAgICAgICAgICBqYTogJ+WFieaAp+eIhumbtycsXHJcbiAgICAgICAgICAgIGNuOiAn5YWJ5oCn54iG6Zu3JyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnVEVBIERyb3BzeScsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICcxMjEnIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5lZmZlY3QgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnVEVBIFRldGhlciBUcmFja2luZycsXHJcbiAgICAgIHR5cGU6ICdUZXRoZXInLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy50ZXRoZXIoeyBzb3VyY2U6ICdKYWdkIERvbGwnLCBpZDogJzAwMTEnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5qYWdkVGV0aGVyID8/PSB7fTtcclxuICAgICAgICBkYXRhLmphZ2RUZXRoZXJbbWF0Y2hlcy5zb3VyY2VJZF0gPSBtYXRjaGVzLnRhcmdldDtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnVEVBIFJlZHVjaWJsZSBDb21wbGV4aXR5JyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnNDgyMScsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgbWlzdGFrZTogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgLy8gVGhpcyBtYXkgYmUgdW5kZWZpbmVkLCB3aGljaCBpcyBmaW5lLlxyXG4gICAgICAgICAgbmFtZTogZGF0YS5qYWdkVGV0aGVyID8gZGF0YS5qYWdkVGV0aGVyW21hdGNoZXMuc291cmNlSWRdIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ0RvbGwgRGVhdGgnLFxyXG4gICAgICAgICAgICBkZTogJ1B1cHBlIFRvdCcsXHJcbiAgICAgICAgICAgIGZyOiAnUG91cMOpZSBtb3J0ZScsXHJcbiAgICAgICAgICAgIGphOiAn44OJ44O844Or44GM5q2744KT44GgJyxcclxuICAgICAgICAgICAgY246ICfmta7lo6vlvrfmrbvkuqEnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdURUEgRHJhaW5hZ2UnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICc0ODI3JywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiAhZGF0YS5wYXJ0eS5pc1RhbmsobWF0Y2hlcy50YXJnZXQpLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnZmFpbCcsIG5hbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnVEVBIFRocm90dGxlIEdhaW4nLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnMkJDJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuaGFzVGhyb3R0bGUgPz89IHt9O1xyXG4gICAgICAgIGRhdGEuaGFzVGhyb3R0bGVbbWF0Y2hlcy50YXJnZXRdID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnVEVBIFRocm90dGxlIExvc2UnLFxyXG4gICAgICB0eXBlOiAnTG9zZXNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5sb3Nlc0VmZmVjdCh7IGVmZmVjdElkOiAnMkJDJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuaGFzVGhyb3R0bGUgPz89IHt9O1xyXG4gICAgICAgIGRhdGEuaGFzVGhyb3R0bGVbbWF0Y2hlcy50YXJnZXRdID0gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ1RFQSBUaHJvdHRsZScsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICcyQkMnIH0pLFxyXG4gICAgICBkZWxheVNlY29uZHM6IChfZGF0YSwgbWF0Y2hlcykgPT4gcGFyc2VGbG9hdChtYXRjaGVzLmR1cmF0aW9uKSAtIDAuNSxcclxuICAgICAgZGVhdGhSZWFzb246IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgaWYgKCFkYXRhLmhhc1Rocm90dGxlKVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICghZGF0YS5oYXNUaHJvdHRsZVttYXRjaGVzLnRhcmdldF0pXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDogbWF0Y2hlcy5lZmZlY3QsXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIEJhbGxvb24gUG9wcGluZy4gIEl0IHNlZW1zIGxpa2UgdGhlIHBlcnNvbiB3aG8gcG9wcyBpdCBpcyB0aGVcclxuICAgICAgLy8gZmlyc3QgcGVyc29uIGxpc3RlZCBkYW1hZ2Utd2lzZSwgc28gdGhleSBhcmUgbGlrZWx5IHRoZSBjdWxwcml0LlxyXG4gICAgICBpZDogJ1RFQSBPdXRidXJzdCcsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzQ4MkEnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIHN1cHByZXNzU2Vjb25kczogNSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuc291cmNlIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgZmlsZTAgZnJvbSAnLi8wMC1taXNjL2dlbmVyYWwudHMnO1xuaW1wb3J0IGZpbGUxIGZyb20gJy4vMDAtbWlzYy90ZXN0LnRzJztcbmltcG9ydCBmaWxlMiBmcm9tICcuLzAyLWFyci90cmlhbC9pZnJpdC1ubS50cyc7XG5pbXBvcnQgZmlsZTMgZnJvbSAnLi8wMi1hcnIvdHJpYWwvdGl0YW4tbm0udHMnO1xuaW1wb3J0IGZpbGU0IGZyb20gJy4vMDItYXJyL3RyaWFsL2xldmktZXgudHMnO1xuaW1wb3J0IGZpbGU1IGZyb20gJy4vMDItYXJyL3RyaWFsL3NoaXZhLWhtLnRzJztcbmltcG9ydCBmaWxlNiBmcm9tICcuLzAyLWFyci90cmlhbC9zaGl2YS1leC50cyc7XG5pbXBvcnQgZmlsZTcgZnJvbSAnLi8wMi1hcnIvdHJpYWwvdGl0YW4taG0udHMnO1xuaW1wb3J0IGZpbGU4IGZyb20gJy4vMDItYXJyL3RyaWFsL3RpdGFuLWV4LnRzJztcbmltcG9ydCBmaWxlOSBmcm9tICcuLzAzLWh3L2FsbGlhbmNlL3dlZXBpbmdfY2l0eS50cyc7XG5pbXBvcnQgZmlsZTEwIGZyb20gJy4vMDMtaHcvZHVuZ2Vvbi9hZXRoZXJvY2hlbWljYWxfcmVzZWFyY2hfZmFjaWxpdHkudHMnO1xuaW1wb3J0IGZpbGUxMSBmcm9tICcuLzAzLWh3L2R1bmdlb24vZnJhY3RhbF9jb250aW51dW0udHMnO1xuaW1wb3J0IGZpbGUxMiBmcm9tICcuLzAzLWh3L2R1bmdlb24vZ3ViYWxfbGlicmFyeV9oYXJkLnRzJztcbmltcG9ydCBmaWxlMTMgZnJvbSAnLi8wMy1ody9kdW5nZW9uL3NvaG1fYWxfaGFyZC50cyc7XG5pbXBvcnQgZmlsZTE0IGZyb20gJy4vMDMtaHcvcmFpZC9hNm4udHMnO1xuaW1wb3J0IGZpbGUxNSBmcm9tICcuLzAzLWh3L3JhaWQvYTEybi50cyc7XG5pbXBvcnQgZmlsZTE2IGZyb20gJy4vMDQtc2IvZHVuZ2Vvbi9hbGFfbWhpZ28udHMnO1xuaW1wb3J0IGZpbGUxNyBmcm9tICcuLzA0LXNiL2R1bmdlb24vYmFyZGFtc19tZXR0bGUudHMnO1xuaW1wb3J0IGZpbGUxOCBmcm9tICcuLzA0LXNiL2R1bmdlb24vZHJvd25lZF9jaXR5X29mX3NrYWxsYS50cyc7XG5pbXBvcnQgZmlsZTE5IGZyb20gJy4vMDQtc2IvZHVuZ2Vvbi9rdWdhbmVfY2FzdGxlLnRzJztcbmltcG9ydCBmaWxlMjAgZnJvbSAnLi8wNC1zYi9kdW5nZW9uL3NpcmVuc29uZ19zZWEudHMnO1xuaW1wb3J0IGZpbGUyMSBmcm9tICcuLzA0LXNiL2R1bmdlb24vc3RfbW9jaWFubmVfaGFyZC50cyc7XG5pbXBvcnQgZmlsZTIyIGZyb20gJy4vMDQtc2IvZHVuZ2Vvbi9zd2FsbG93c19jb21wYXNzLnRzJztcbmltcG9ydCBmaWxlMjMgZnJvbSAnLi8wNC1zYi9kdW5nZW9uL3RlbXBsZV9vZl90aGVfZmlzdC50cyc7XG5pbXBvcnQgZmlsZTI0IGZyb20gJy4vMDQtc2IvZHVuZ2Vvbi90aGVfYnVybi50cyc7XG5pbXBvcnQgZmlsZTI1IGZyb20gJy4vMDQtc2IvcmFpZC9vMW4udHMnO1xuaW1wb3J0IGZpbGUyNiBmcm9tICcuLzA0LXNiL3JhaWQvbzFzLnRzJztcbmltcG9ydCBmaWxlMjcgZnJvbSAnLi8wNC1zYi9yYWlkL28ybi50cyc7XG5pbXBvcnQgZmlsZTI4IGZyb20gJy4vMDQtc2IvcmFpZC9vMnMudHMnO1xuaW1wb3J0IGZpbGUyOSBmcm9tICcuLzA0LXNiL3JhaWQvbzNuLnRzJztcbmltcG9ydCBmaWxlMzAgZnJvbSAnLi8wNC1zYi9yYWlkL28zcy50cyc7XG5pbXBvcnQgZmlsZTMxIGZyb20gJy4vMDQtc2IvcmFpZC9vNG4udHMnO1xuaW1wb3J0IGZpbGUzMiBmcm9tICcuLzA0LXNiL3JhaWQvbzRzLnRzJztcbmltcG9ydCBmaWxlMzMgZnJvbSAnLi8wNC1zYi9yYWlkL281bi50cyc7XG5pbXBvcnQgZmlsZTM0IGZyb20gJy4vMDQtc2IvcmFpZC9vNXMudHMnO1xuaW1wb3J0IGZpbGUzNSBmcm9tICcuLzA0LXNiL3JhaWQvbzZuLnRzJztcbmltcG9ydCBmaWxlMzYgZnJvbSAnLi8wNC1zYi9yYWlkL282cy50cyc7XG5pbXBvcnQgZmlsZTM3IGZyb20gJy4vMDQtc2IvcmFpZC9vN24udHMnO1xuaW1wb3J0IGZpbGUzOCBmcm9tICcuLzA0LXNiL3JhaWQvbzdzLnRzJztcbmltcG9ydCBmaWxlMzkgZnJvbSAnLi8wNC1zYi9yYWlkL284bi50cyc7XG5pbXBvcnQgZmlsZTQwIGZyb20gJy4vMDQtc2IvcmFpZC9vOHMudHMnO1xuaW1wb3J0IGZpbGU0MSBmcm9tICcuLzA0LXNiL3JhaWQvbzluLnRzJztcbmltcG9ydCBmaWxlNDIgZnJvbSAnLi8wNC1zYi9yYWlkL28xMG4udHMnO1xuaW1wb3J0IGZpbGU0MyBmcm9tICcuLzA0LXNiL3JhaWQvbzExbi50cyc7XG5pbXBvcnQgZmlsZTQ0IGZyb20gJy4vMDQtc2IvcmFpZC9vMTJuLnRzJztcbmltcG9ydCBmaWxlNDUgZnJvbSAnLi8wNC1zYi9yYWlkL28xMnMudHMnO1xuaW1wb3J0IGZpbGU0NiBmcm9tICcuLzA0LXNiL3RyaWFsL2J5YWtrby1leC50cyc7XG5pbXBvcnQgZmlsZTQ3IGZyb20gJy4vMDQtc2IvdHJpYWwvc2hpbnJ5dS50cyc7XG5pbXBvcnQgZmlsZTQ4IGZyb20gJy4vMDQtc2IvdHJpYWwvc3VzYW5vLWV4LnRzJztcbmltcG9ydCBmaWxlNDkgZnJvbSAnLi8wNC1zYi90cmlhbC9zdXpha3UudHMnO1xuaW1wb3J0IGZpbGU1MCBmcm9tICcuLzA0LXNiL3VsdGltYXRlL3VsdGltYV93ZWFwb25fdWx0aW1hdGUudHMnO1xuaW1wb3J0IGZpbGU1MSBmcm9tICcuLzA0LXNiL3VsdGltYXRlL3VuZW5kaW5nX2NvaWxfdWx0aW1hdGUudHMnO1xuaW1wb3J0IGZpbGU1MiBmcm9tICcuLzA1LXNoYi9hbGxpYW5jZS90aGVfY29waWVkX2ZhY3RvcnkudHMnO1xuaW1wb3J0IGZpbGU1MyBmcm9tICcuLzA1LXNoYi9hbGxpYW5jZS90aGVfcHVwcGV0c19idW5rZXIudHMnO1xuaW1wb3J0IGZpbGU1NCBmcm9tICcuLzA1LXNoYi9hbGxpYW5jZS90aGVfdG93ZXJfYXRfcGFyYWRpZ21zX2JyZWFjaC50cyc7XG5pbXBvcnQgZmlsZTU1IGZyb20gJy4vMDUtc2hiL2R1bmdlb24vYWthZGFlbWlhX2FueWRlci50cyc7XG5pbXBvcnQgZmlsZTU2IGZyb20gJy4vMDUtc2hiL2R1bmdlb24vYW1hdXJvdC50cyc7XG5pbXBvcnQgZmlsZTU3IGZyb20gJy4vMDUtc2hiL2R1bmdlb24vYW5hbW5lc2lzX2FueWRlci50cyc7XG5pbXBvcnQgZmlsZTU4IGZyb20gJy4vMDUtc2hiL2R1bmdlb24vZG9obl9taGVnLnRzJztcbmltcG9ydCBmaWxlNTkgZnJvbSAnLi8wNS1zaGIvZHVuZ2Vvbi9oZXJvZXNfZ2F1bnRsZXQudHMnO1xuaW1wb3J0IGZpbGU2MCBmcm9tICcuLzA1LXNoYi9kdW5nZW9uL2hvbG1pbnN0ZXJfc3dpdGNoLnRzJztcbmltcG9ydCBmaWxlNjEgZnJvbSAnLi8wNS1zaGIvZHVuZ2Vvbi9tYWxpa2Foc193ZWxsLnRzJztcbmltcG9ydCBmaWxlNjIgZnJvbSAnLi8wNS1zaGIvZHVuZ2Vvbi9tYXRveWFzX3JlbGljdC50cyc7XG5pbXBvcnQgZmlsZTYzIGZyb20gJy4vMDUtc2hiL2R1bmdlb24vbXRfZ3VsZy50cyc7XG5pbXBvcnQgZmlsZTY0IGZyb20gJy4vMDUtc2hiL2R1bmdlb24vcGFnbHRoYW4udHMnO1xuaW1wb3J0IGZpbGU2NSBmcm9tICcuLzA1LXNoYi9kdW5nZW9uL3FpdGFuYV9yYXZlbC50cyc7XG5pbXBvcnQgZmlsZTY2IGZyb20gJy4vMDUtc2hiL2R1bmdlb24vdGhlX2dyYW5kX2Nvc21vcy50cyc7XG5pbXBvcnQgZmlsZTY3IGZyb20gJy4vMDUtc2hiL2R1bmdlb24vdHdpbm5pbmcudHMnO1xuaW1wb3J0IGZpbGU2OCBmcm9tICcuLzA1LXNoYi9ldXJla2EvZGVsdWJydW1fcmVnaW5hZS50cyc7XG5pbXBvcnQgZmlsZTY5IGZyb20gJy4vMDUtc2hiL2V1cmVrYS9kZWx1YnJ1bV9yZWdpbmFlX3NhdmFnZS50cyc7XG5pbXBvcnQgZmlsZTcwIGZyb20gJy4vMDUtc2hiL3JhaWQvZTFuLnRzJztcbmltcG9ydCBmaWxlNzEgZnJvbSAnLi8wNS1zaGIvcmFpZC9lMXMudHMnO1xuaW1wb3J0IGZpbGU3MiBmcm9tICcuLzA1LXNoYi9yYWlkL2Uybi50cyc7XG5pbXBvcnQgZmlsZTczIGZyb20gJy4vMDUtc2hiL3JhaWQvZTJzLnRzJztcbmltcG9ydCBmaWxlNzQgZnJvbSAnLi8wNS1zaGIvcmFpZC9lM24udHMnO1xuaW1wb3J0IGZpbGU3NSBmcm9tICcuLzA1LXNoYi9yYWlkL2Uzcy50cyc7XG5pbXBvcnQgZmlsZTc2IGZyb20gJy4vMDUtc2hiL3JhaWQvZTRuLnRzJztcbmltcG9ydCBmaWxlNzcgZnJvbSAnLi8wNS1zaGIvcmFpZC9lNHMudHMnO1xuaW1wb3J0IGZpbGU3OCBmcm9tICcuLzA1LXNoYi9yYWlkL2U1bi50cyc7XG5pbXBvcnQgZmlsZTc5IGZyb20gJy4vMDUtc2hiL3JhaWQvZTVzLnRzJztcbmltcG9ydCBmaWxlODAgZnJvbSAnLi8wNS1zaGIvcmFpZC9lNm4udHMnO1xuaW1wb3J0IGZpbGU4MSBmcm9tICcuLzA1LXNoYi9yYWlkL2U2cy50cyc7XG5pbXBvcnQgZmlsZTgyIGZyb20gJy4vMDUtc2hiL3JhaWQvZTduLnRzJztcbmltcG9ydCBmaWxlODMgZnJvbSAnLi8wNS1zaGIvcmFpZC9lN3MudHMnO1xuaW1wb3J0IGZpbGU4NCBmcm9tICcuLzA1LXNoYi9yYWlkL2U4bi50cyc7XG5pbXBvcnQgZmlsZTg1IGZyb20gJy4vMDUtc2hiL3JhaWQvZThzLnRzJztcbmltcG9ydCBmaWxlODYgZnJvbSAnLi8wNS1zaGIvcmFpZC9lOW4udHMnO1xuaW1wb3J0IGZpbGU4NyBmcm9tICcuLzA1LXNoYi9yYWlkL2U5cy50cyc7XG5pbXBvcnQgZmlsZTg4IGZyb20gJy4vMDUtc2hiL3JhaWQvZTEwbi50cyc7XG5pbXBvcnQgZmlsZTg5IGZyb20gJy4vMDUtc2hiL3JhaWQvZTEwcy50cyc7XG5pbXBvcnQgZmlsZTkwIGZyb20gJy4vMDUtc2hiL3JhaWQvZTExbi50cyc7XG5pbXBvcnQgZmlsZTkxIGZyb20gJy4vMDUtc2hiL3JhaWQvZTExcy50cyc7XG5pbXBvcnQgZmlsZTkyIGZyb20gJy4vMDUtc2hiL3JhaWQvZTEybi50cyc7XG5pbXBvcnQgZmlsZTkzIGZyb20gJy4vMDUtc2hiL3JhaWQvZTEycy50cyc7XG5pbXBvcnQgZmlsZTk0IGZyb20gJy4vMDUtc2hiL3RyaWFsL2RpYW1vbmRfd2VhcG9uLWV4LnRzJztcbmltcG9ydCBmaWxlOTUgZnJvbSAnLi8wNS1zaGIvdHJpYWwvZGlhbW9uZF93ZWFwb24udHMnO1xuaW1wb3J0IGZpbGU5NiBmcm9tICcuLzA1LXNoYi90cmlhbC9lbWVyYWxkX3dlYXBvbi1leC50cyc7XG5pbXBvcnQgZmlsZTk3IGZyb20gJy4vMDUtc2hiL3RyaWFsL2VtZXJhbGRfd2VhcG9uLnRzJztcbmltcG9ydCBmaWxlOTggZnJvbSAnLi8wNS1zaGIvdHJpYWwvaGFkZXMtZXgudHMnO1xuaW1wb3J0IGZpbGU5OSBmcm9tICcuLzA1LXNoYi90cmlhbC9oYWRlcy50cyc7XG5pbXBvcnQgZmlsZTEwMCBmcm9tICcuLzA1LXNoYi90cmlhbC9pbm5vY2VuY2UtZXgudHMnO1xuaW1wb3J0IGZpbGUxMDEgZnJvbSAnLi8wNS1zaGIvdHJpYWwvaW5ub2NlbmNlLnRzJztcbmltcG9ydCBmaWxlMTAyIGZyb20gJy4vMDUtc2hiL3RyaWFsL2xldmktdW4udHMnO1xuaW1wb3J0IGZpbGUxMDMgZnJvbSAnLi8wNS1zaGIvdHJpYWwvcnVieV93ZWFwb24tZXgudHMnO1xuaW1wb3J0IGZpbGUxMDQgZnJvbSAnLi8wNS1zaGIvdHJpYWwvcnVieV93ZWFwb24udHMnO1xuaW1wb3J0IGZpbGUxMDUgZnJvbSAnLi8wNS1zaGIvdHJpYWwvc2hpdmEtdW4udHMnO1xuaW1wb3J0IGZpbGUxMDYgZnJvbSAnLi8wNS1zaGIvdHJpYWwvdGl0YW5pYS50cyc7XG5pbXBvcnQgZmlsZTEwNyBmcm9tICcuLzA1LXNoYi90cmlhbC90aXRhbmlhLWV4LnRzJztcbmltcG9ydCBmaWxlMTA4IGZyb20gJy4vMDUtc2hiL3RyaWFsL3RpdGFuLXVuLnRzJztcbmltcG9ydCBmaWxlMTA5IGZyb20gJy4vMDUtc2hiL3RyaWFsL3ZhcmlzLWV4LnRzJztcbmltcG9ydCBmaWxlMTEwIGZyb20gJy4vMDUtc2hiL3RyaWFsL3dvbC50cyc7XG5pbXBvcnQgZmlsZTExMSBmcm9tICcuLzA1LXNoYi90cmlhbC93b2wtZXgudHMnO1xuaW1wb3J0IGZpbGUxMTIgZnJvbSAnLi8wNS1zaGIvdWx0aW1hdGUvdGhlX2VwaWNfb2ZfYWxleGFuZGVyLnRzJztcblxuZXhwb3J0IGRlZmF1bHQgeycwMC1taXNjL2dlbmVyYWwudHMnOiBmaWxlMCwnMDAtbWlzYy90ZXN0LnRzJzogZmlsZTEsJzAyLWFyci90cmlhbC9pZnJpdC1ubS50cyc6IGZpbGUyLCcwMi1hcnIvdHJpYWwvdGl0YW4tbm0udHMnOiBmaWxlMywnMDItYXJyL3RyaWFsL2xldmktZXgudHMnOiBmaWxlNCwnMDItYXJyL3RyaWFsL3NoaXZhLWhtLnRzJzogZmlsZTUsJzAyLWFyci90cmlhbC9zaGl2YS1leC50cyc6IGZpbGU2LCcwMi1hcnIvdHJpYWwvdGl0YW4taG0udHMnOiBmaWxlNywnMDItYXJyL3RyaWFsL3RpdGFuLWV4LnRzJzogZmlsZTgsJzAzLWh3L2FsbGlhbmNlL3dlZXBpbmdfY2l0eS50cyc6IGZpbGU5LCcwMy1ody9kdW5nZW9uL2FldGhlcm9jaGVtaWNhbF9yZXNlYXJjaF9mYWNpbGl0eS50cyc6IGZpbGUxMCwnMDMtaHcvZHVuZ2Vvbi9mcmFjdGFsX2NvbnRpbnV1bS50cyc6IGZpbGUxMSwnMDMtaHcvZHVuZ2Vvbi9ndWJhbF9saWJyYXJ5X2hhcmQudHMnOiBmaWxlMTIsJzAzLWh3L2R1bmdlb24vc29obV9hbF9oYXJkLnRzJzogZmlsZTEzLCcwMy1ody9yYWlkL2E2bi50cyc6IGZpbGUxNCwnMDMtaHcvcmFpZC9hMTJuLnRzJzogZmlsZTE1LCcwNC1zYi9kdW5nZW9uL2FsYV9taGlnby50cyc6IGZpbGUxNiwnMDQtc2IvZHVuZ2Vvbi9iYXJkYW1zX21ldHRsZS50cyc6IGZpbGUxNywnMDQtc2IvZHVuZ2Vvbi9kcm93bmVkX2NpdHlfb2Zfc2thbGxhLnRzJzogZmlsZTE4LCcwNC1zYi9kdW5nZW9uL2t1Z2FuZV9jYXN0bGUudHMnOiBmaWxlMTksJzA0LXNiL2R1bmdlb24vc2lyZW5zb25nX3NlYS50cyc6IGZpbGUyMCwnMDQtc2IvZHVuZ2Vvbi9zdF9tb2NpYW5uZV9oYXJkLnRzJzogZmlsZTIxLCcwNC1zYi9kdW5nZW9uL3N3YWxsb3dzX2NvbXBhc3MudHMnOiBmaWxlMjIsJzA0LXNiL2R1bmdlb24vdGVtcGxlX29mX3RoZV9maXN0LnRzJzogZmlsZTIzLCcwNC1zYi9kdW5nZW9uL3RoZV9idXJuLnRzJzogZmlsZTI0LCcwNC1zYi9yYWlkL28xbi50cyc6IGZpbGUyNSwnMDQtc2IvcmFpZC9vMXMudHMnOiBmaWxlMjYsJzA0LXNiL3JhaWQvbzJuLnRzJzogZmlsZTI3LCcwNC1zYi9yYWlkL28ycy50cyc6IGZpbGUyOCwnMDQtc2IvcmFpZC9vM24udHMnOiBmaWxlMjksJzA0LXNiL3JhaWQvbzNzLnRzJzogZmlsZTMwLCcwNC1zYi9yYWlkL280bi50cyc6IGZpbGUzMSwnMDQtc2IvcmFpZC9vNHMudHMnOiBmaWxlMzIsJzA0LXNiL3JhaWQvbzVuLnRzJzogZmlsZTMzLCcwNC1zYi9yYWlkL281cy50cyc6IGZpbGUzNCwnMDQtc2IvcmFpZC9vNm4udHMnOiBmaWxlMzUsJzA0LXNiL3JhaWQvbzZzLnRzJzogZmlsZTM2LCcwNC1zYi9yYWlkL283bi50cyc6IGZpbGUzNywnMDQtc2IvcmFpZC9vN3MudHMnOiBmaWxlMzgsJzA0LXNiL3JhaWQvbzhuLnRzJzogZmlsZTM5LCcwNC1zYi9yYWlkL284cy50cyc6IGZpbGU0MCwnMDQtc2IvcmFpZC9vOW4udHMnOiBmaWxlNDEsJzA0LXNiL3JhaWQvbzEwbi50cyc6IGZpbGU0MiwnMDQtc2IvcmFpZC9vMTFuLnRzJzogZmlsZTQzLCcwNC1zYi9yYWlkL28xMm4udHMnOiBmaWxlNDQsJzA0LXNiL3JhaWQvbzEycy50cyc6IGZpbGU0NSwnMDQtc2IvdHJpYWwvYnlha2tvLWV4LnRzJzogZmlsZTQ2LCcwNC1zYi90cmlhbC9zaGlucnl1LnRzJzogZmlsZTQ3LCcwNC1zYi90cmlhbC9zdXNhbm8tZXgudHMnOiBmaWxlNDgsJzA0LXNiL3RyaWFsL3N1emFrdS50cyc6IGZpbGU0OSwnMDQtc2IvdWx0aW1hdGUvdWx0aW1hX3dlYXBvbl91bHRpbWF0ZS50cyc6IGZpbGU1MCwnMDQtc2IvdWx0aW1hdGUvdW5lbmRpbmdfY29pbF91bHRpbWF0ZS50cyc6IGZpbGU1MSwnMDUtc2hiL2FsbGlhbmNlL3RoZV9jb3BpZWRfZmFjdG9yeS50cyc6IGZpbGU1MiwnMDUtc2hiL2FsbGlhbmNlL3RoZV9wdXBwZXRzX2J1bmtlci50cyc6IGZpbGU1MywnMDUtc2hiL2FsbGlhbmNlL3RoZV90b3dlcl9hdF9wYXJhZGlnbXNfYnJlYWNoLnRzJzogZmlsZTU0LCcwNS1zaGIvZHVuZ2Vvbi9ha2FkYWVtaWFfYW55ZGVyLnRzJzogZmlsZTU1LCcwNS1zaGIvZHVuZ2Vvbi9hbWF1cm90LnRzJzogZmlsZTU2LCcwNS1zaGIvZHVuZ2Vvbi9hbmFtbmVzaXNfYW55ZGVyLnRzJzogZmlsZTU3LCcwNS1zaGIvZHVuZ2Vvbi9kb2huX21oZWcudHMnOiBmaWxlNTgsJzA1LXNoYi9kdW5nZW9uL2hlcm9lc19nYXVudGxldC50cyc6IGZpbGU1OSwnMDUtc2hiL2R1bmdlb24vaG9sbWluc3Rlcl9zd2l0Y2gudHMnOiBmaWxlNjAsJzA1LXNoYi9kdW5nZW9uL21hbGlrYWhzX3dlbGwudHMnOiBmaWxlNjEsJzA1LXNoYi9kdW5nZW9uL21hdG95YXNfcmVsaWN0LnRzJzogZmlsZTYyLCcwNS1zaGIvZHVuZ2Vvbi9tdF9ndWxnLnRzJzogZmlsZTYzLCcwNS1zaGIvZHVuZ2Vvbi9wYWdsdGhhbi50cyc6IGZpbGU2NCwnMDUtc2hiL2R1bmdlb24vcWl0YW5hX3JhdmVsLnRzJzogZmlsZTY1LCcwNS1zaGIvZHVuZ2Vvbi90aGVfZ3JhbmRfY29zbW9zLnRzJzogZmlsZTY2LCcwNS1zaGIvZHVuZ2Vvbi90d2lubmluZy50cyc6IGZpbGU2NywnMDUtc2hiL2V1cmVrYS9kZWx1YnJ1bV9yZWdpbmFlLnRzJzogZmlsZTY4LCcwNS1zaGIvZXVyZWthL2RlbHVicnVtX3JlZ2luYWVfc2F2YWdlLnRzJzogZmlsZTY5LCcwNS1zaGIvcmFpZC9lMW4udHMnOiBmaWxlNzAsJzA1LXNoYi9yYWlkL2Uxcy50cyc6IGZpbGU3MSwnMDUtc2hiL3JhaWQvZTJuLnRzJzogZmlsZTcyLCcwNS1zaGIvcmFpZC9lMnMudHMnOiBmaWxlNzMsJzA1LXNoYi9yYWlkL2Uzbi50cyc6IGZpbGU3NCwnMDUtc2hiL3JhaWQvZTNzLnRzJzogZmlsZTc1LCcwNS1zaGIvcmFpZC9lNG4udHMnOiBmaWxlNzYsJzA1LXNoYi9yYWlkL2U0cy50cyc6IGZpbGU3NywnMDUtc2hiL3JhaWQvZTVuLnRzJzogZmlsZTc4LCcwNS1zaGIvcmFpZC9lNXMudHMnOiBmaWxlNzksJzA1LXNoYi9yYWlkL2U2bi50cyc6IGZpbGU4MCwnMDUtc2hiL3JhaWQvZTZzLnRzJzogZmlsZTgxLCcwNS1zaGIvcmFpZC9lN24udHMnOiBmaWxlODIsJzA1LXNoYi9yYWlkL2U3cy50cyc6IGZpbGU4MywnMDUtc2hiL3JhaWQvZThuLnRzJzogZmlsZTg0LCcwNS1zaGIvcmFpZC9lOHMudHMnOiBmaWxlODUsJzA1LXNoYi9yYWlkL2U5bi50cyc6IGZpbGU4NiwnMDUtc2hiL3JhaWQvZTlzLnRzJzogZmlsZTg3LCcwNS1zaGIvcmFpZC9lMTBuLnRzJzogZmlsZTg4LCcwNS1zaGIvcmFpZC9lMTBzLnRzJzogZmlsZTg5LCcwNS1zaGIvcmFpZC9lMTFuLnRzJzogZmlsZTkwLCcwNS1zaGIvcmFpZC9lMTFzLnRzJzogZmlsZTkxLCcwNS1zaGIvcmFpZC9lMTJuLnRzJzogZmlsZTkyLCcwNS1zaGIvcmFpZC9lMTJzLnRzJzogZmlsZTkzLCcwNS1zaGIvdHJpYWwvZGlhbW9uZF93ZWFwb24tZXgudHMnOiBmaWxlOTQsJzA1LXNoYi90cmlhbC9kaWFtb25kX3dlYXBvbi50cyc6IGZpbGU5NSwnMDUtc2hiL3RyaWFsL2VtZXJhbGRfd2VhcG9uLWV4LnRzJzogZmlsZTk2LCcwNS1zaGIvdHJpYWwvZW1lcmFsZF93ZWFwb24udHMnOiBmaWxlOTcsJzA1LXNoYi90cmlhbC9oYWRlcy1leC50cyc6IGZpbGU5OCwnMDUtc2hiL3RyaWFsL2hhZGVzLnRzJzogZmlsZTk5LCcwNS1zaGIvdHJpYWwvaW5ub2NlbmNlLWV4LnRzJzogZmlsZTEwMCwnMDUtc2hiL3RyaWFsL2lubm9jZW5jZS50cyc6IGZpbGUxMDEsJzA1LXNoYi90cmlhbC9sZXZpLXVuLnRzJzogZmlsZTEwMiwnMDUtc2hiL3RyaWFsL3J1Ynlfd2VhcG9uLWV4LnRzJzogZmlsZTEwMywnMDUtc2hiL3RyaWFsL3J1Ynlfd2VhcG9uLnRzJzogZmlsZTEwNCwnMDUtc2hiL3RyaWFsL3NoaXZhLXVuLnRzJzogZmlsZTEwNSwnMDUtc2hiL3RyaWFsL3RpdGFuaWEudHMnOiBmaWxlMTA2LCcwNS1zaGIvdHJpYWwvdGl0YW5pYS1leC50cyc6IGZpbGUxMDcsJzA1LXNoYi90cmlhbC90aXRhbi11bi50cyc6IGZpbGUxMDgsJzA1LXNoYi90cmlhbC92YXJpcy1leC50cyc6IGZpbGUxMDksJzA1LXNoYi90cmlhbC93b2wudHMnOiBmaWxlMTEwLCcwNS1zaGIvdHJpYWwvd29sLWV4LnRzJzogZmlsZTExMSwnMDUtc2hiL3VsdGltYXRlL3RoZV9lcGljX29mX2FsZXhhbmRlci50cyc6IGZpbGUxMTIsfTsiXSwic291cmNlUm9vdCI6IiJ9