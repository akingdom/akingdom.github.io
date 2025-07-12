// i18n.js
// (C) 2023-2025 Andrew Kingdom

// Simple random picker
const pick = arr => arr[Math.floor(Math.random() * arr.length)];

// Annotation: each entry must provide
// - punct1: array of strings
// - punct2: array of strings
// - build: function({strokes,h,m,s,words,ordinal,pick}) → string

const i18n = {
  // Arabic (Saudi Arabia)
  'ar-SA': {
    punct1: ['،','!','…','؛'], punct2: ['.','!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1 = pick(words.punct1), P2 = pick(words.punct2);
      const min = m===0 ? 'تماماً' : `${m} دقيقة`;
      const sec = s===0 ? 'تماماً' : `و${s} ثانية`;
      return `عند الضربة ${strokes}${ordinal(strokes)}${P1} سيكون الوقت ${h} و${min} و${sec}${P2}`;
    }
  },
  // Czech (Czechia)
  'cs-CZ': {
    punct1: [',','!','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const min = m===0 ? 'přesně' : `${m} minut${m===1?'a':''}`;
      const sec = s===0 ? 'přesně' : `a ${s} sekund`;
      return `Při ${strokes}${ordinal(strokes)} úderu${P1} je ${h} ${min} ${sec}${P2}`;
    }
  },
  // Danish (Denmark)
  'da-DK': {
    punct1: [',','!','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const min = m===0 ? 'præcis' : `${m} minutter`;
      const sec = s===0 ? 'præcis' : `og ${s} sekunder`;
      return `Ved ${strokes}${ordinal(strokes)} slag${P1} er klokken ${h} ${min} ${sec}${P2}`;
    }
  },
  // German (Germany)
  'de-DE': {
    punct1: [',','!','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const min = m===0 ? 'genau' : `${m} ${m===1?'Minute':'Minuten'}`;
      const sec = s===0 ? 'genau' : `und ${s} ${s===1?'Sekunde':'Sekunden'}`;
      return `Beim ${strokes}${ordinal(strokes)} Schlag${P1} ist es ${h} Uhr ${min} ${sec}${P2}`;
    }
  },
  // Greek (Greece)
  'el-GR': {
    punct1: [',','!','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const min = m===0 ? 'ακριβώς' : `${m} λεπτό${m===1?'':'ντα'}`;
      const sec = s===0 ? 'ακριβώς' : `και ${s} δευτερόλεπτο${s===1?'':'ι'}`;
      return `Στον ${strokes}${ordinal(strokes)} κτύπο${P1} θα είναι ${h} ${min} ${sec}${P2}`;
    }
  },
  // Australian English
  'en-AU': {
    punct1: ['!',',','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? "o'clock" : `${m<10?'oh '+m:m}`;
      const sStr = s===0 ? 'precisely' : `and ${s} seconds`;
      return `At the ${strokes}${ordinal(strokes)} stroke${P1} the time will be ${h} ${mStr} ${sStr}${P2}`;
    }
  },
  // British English
  'en-GB': {
    punct1: ['!',',','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? "o'clock" : `${m<10?'oh '+m:m}`;
      const sStr = s===0 ? 'precisely' : `and ${s} seconds`;
      return `At the ${strokes}${ordinal(strokes)} stroke${P1} the time will be ${h} ${mStr} ${sStr}${P2}`;
    }
  },
  // Irish English
  'en-IE': 'en-GB',
  // Indian English
  'en-IN': 'en-GB',
  // Scottish English
  'en-Scotland': 'en-GB',
  // American English
  'en-US': 'en-GB',
  // South African English
  'en-ZA': 'en-GB',
  // Spanish (Argentina)
  'es-AR': {
    punct1: [',','!','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? 'en punto' : `${m} minutos`;
      const sStr = s===0 ? 'precisamente' : `y ${s} segundos`;
      return `En el ${strokes}${ordinal(strokes)} golpe${P1} serán las ${h} ${mStr} ${sStr}${P2}`;
    }
  },
  // European Spanish
  'es-ES': 'es-AR',
  // Mexican Spanish
  'es-MX': 'es-AR',
  // US Spanish
  'es-US': 'es-AR',
  // Finnish (Finland)
  'fi-FI': {
    punct1: [',','!','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? 'tasan' : `${m} minuuttia`;
      const sStr = s===0 ? 'tasan' : `ja ${s} sekuntia`;
      return `Kolmannella${P1} osumalla kello on ${h} ${mStr} ${sStr}${P2}`;
    }
  },
  // Canadian French
  'fr-CA': 'fr-FR',
  // French (France)
  'fr-FR': {
    punct1: [',','!','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? `pile` : `${m} minute${m===1?'':'s'}`;
      const sStr = s===0 ? `précisément` : `et ${s} seconde${s===1?'':'s'}`;
      return `Au ${strokes}${ordinal(strokes)} coup${P1} il est ${h} ${mStr} ${sStr}${P2}`;
    }
  },
  // Hebrew (Israel)
  'he-IL': {
    punct1: [',','!','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? 'מדויק' : `${m} דקות`;
      const sStr = s===0 ? 'מדויק' : `ו${s} שניות`;
      return `בהקשה מספר ${strokes}${ordinal(strokes)}${P1} הזמן יהיה ${h}:${m}:${s}${P2}`;
    }
  },
  // Hindi (India)
  'hi-IN': {
    punct1: ['!', '…', ','], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? 'ठीक' : `${m} मिनट`;
      const sStr = s===0 ? 'ठीक' : `और ${s} सेकंड`;
      return `${strokes}${ordinal(strokes)} बीट पर समय होगा ${h} ${mStr} ${sStr}${P2}`;
    }
  },
  // Hungarian (Hungary)
  'hu-HU': {
    punct1: [',','!','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? 'pontos' : `${m} perc`;
      const sStr = s===0 ? 'pontos' : `és ${s} másodperc`;
      return `${strokes}${ordinal(strokes)} ütéssel az idő ${h} ${mStr} ${sStr}${P2}`;
    }
  },
  // Indonesian (Indonesia)
  'id-ID': {
    punct1: [',','!','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? 'tepat' : `${m} menit`;
      const sStr = s===0 ? 'tepat' : `dan ${s} detik`;
      return `Pada ketukan ke-${strokes}${P1} waktu menunjukkan ${h} ${mStr} ${sStr}${P2}`;
    }
  },
  // Italian (Italy)
  'it-IT': {
    punct1: [',','!','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? 'precisamente' : `${m} minuti`;
      const sStr = s===0 ? 'precisamente' : `e ${s} secondi`;
      return `Al ${strokes}${ordinal(strokes)} rintocco${P1} saranno le ${h} ${mStr} ${sStr}${P2}`;
    }
  },
  // Japanese (Japan)
  'ja-JP': {
    punct1: ['、','！','…'], punct2: ['。','！'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? 'ちょうど' : `${m}分`;
      const sStr = s===0 ? 'ちょうど' : `と ${s}秒`;
      return `${strokes}${ordinal(strokes)}回目の時報${P1}時刻は${h}時${mStr}${sStr}${P2}`;
    }
  },
  // Korean (South Korea)
  'ko-KR': {
    punct1: [',','!','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? '정각' : `${m}분`;
      const sStr = s===0 ? '정각' : `그리고 ${s}초`;
      return `${strokes}${ordinal(strokes)}번째 타종${P1} 시간은 ${h}시 ${mStr} ${sStr}${P2}`;
    }
  },
  // Norwegian Bokmål (Norway)
  'nb-NO': {
    punct1: [',','!','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? 'helt' : `${m} minutter`;
      const sStr = s===0 ? 'helt' : `og ${s} sekunder`;
      return `Ved ${strokes}${ordinal(strokes)} slag${P1} er klokka ${h} ${mStr} ${sStr}${P2}`;
    }
  },
  // Flemish (Belgium)
  'nl-BE': {
    punct1: [',','!','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? 'precies' : `${m} minuten`;
      const sStr = s===0 ? 'precies' : `en ${s} seconden`;
      return `Bij de ${strokes}${ordinal(strokes)} slag${P1} is het ${h} ${mStr} ${sStr}${P2}`;
    }
  },
  // Dutch (Netherlands)
  'nl-NL': 'nl-BE',
  // Polish (Poland)
  'pl-PL': {
    punct1: [',','!','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? 'dokładnie' : `${m} minut`;
      const sStr = s===0 ? 'dokładnie' : `i ${s} sekund`;
      return `Przy ${strokes}${ordinal(strokes)} uderzeniu${P1} będzie ${h} ${mStr} ${sStr}${P2}`;
    }
  },
  // Brazilian Portuguese
  'pt-BR': {
    punct1: [',','!','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? 'em ponto' : `${m} minutos`;
      const sStr = s===0 ? 'em ponto' : `e ${s} segundos`;
      return `No ${strokes}${ordinal(strokes)} toque${P1} serão ${h} horas ${mStr} ${sStr}${P2}`;
    }
  },
  // European Portuguese
  'pt-PT': 'pt-BR',
  // Romanian (Romania)
  'ro-RO': {
    punct1: [',','!','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? 'fix' : `${m} minute`;
      const sStr = s===0 ? 'fix' : `și ${s} secunde`;
      return `La a ${strokes}${ordinal(strokes)} lovitură${P1} ora este ${h} ${mStr} ${sStr}${P2}`;
    }
  },
  // Russian (Russia)
  'ru-RU': {
    punct1: [',','!','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? 'ровно' : `${m} минут`;
      const sStr = s===0 ? 'ровно' : `и ${s} секунд`;
      return `При ${strokes}${ordinal(strokes)} ударе${P1} время ${h} ${mStr} ${sStr}${P2}`;
    }
  },
  // Slovak (Slovakia)
  'sk-SK': {
    punct1: [',','!','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? 'presne' : `${m} minút`;
      const sStr = s===0 ? 'presne' : `a ${s} sekúnd`;
      return `Pri ${strokes}${ordinal(strokes)} údere${P1} bude ${h} ${mStr} ${sStr}${P2}`;
    }
  },
  // Swedish (Sweden)
  'sv-SE': {
    punct1: [',','!','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? 'exakt' : `${m} minuter`;
      const sStr = s===0 ? 'exakt' : `och ${s} sekunder`;
      return `Vid ${strokes}${ordinal(strokes)} slag${P1} är klockan ${h} ${mStr} ${sStr}${P2}`;
    }
  },
  // Thai (Thailand)
  'th-TH': {
    punct1: [' ', '!'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? 'ตรง' : `${m} นาที`;
      const sStr = s===0 ? 'ตรง' : `และ ${s} วินาที`;
      return `ที่จังหวะที่ ${strokes}${ordinal(strokes)}${P1} เวลา ${h} ${mStr} ${sStr}${P2}`;
    }
  },
  // Turkish (Türkiye)
  'tr-TR': {
    punct1: [',','!','…'], punct2: ['.', '!'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? 'tam' : `${m} dakika`;
      const sStr = s===0 ? 'tam' : `ve ${s} saniye`;
      return `${strokes}${ordinal(strokes)}. vuruşta saat ${h} ${mStr} ${sStr}${P2}`;
    }
  },
  // Chinese (China)
  'zh-CN': {
    punct1: ['，','！','…'], punct2: ['。','！'],
    build: ({strokes,h,m,s,words,ordinal,pick}) => {
      const P1=pick(words.punct1), P2=pick(words.punct2);
      const mStr = m===0 ? '整' : `${m}分`;
      const sStr = s===0 ? '整' : `和${s}秒`;
      return `在第${strokes}${ordinal(strokes)}次报时${P1}时间是${h}点${mStr}${sStr}${P2}`;
    }
  },
  // Chinese (Hong Kong)
  'zh-HK': 'zh-CN',
  // Chinese (Taiwan)
  'zh-TW': 'zh-CN'
};

// Aliases for non-standard tags
const aliases = {
  'en-Scotland': 'en-GB'
};

// buildAnnouncement helper
function buildAnnouncement(dt, voiceLang, strokes, ordinal) {
  // resolve alias
  const tag = aliases[voiceLang] || voiceLang;
  // exact lookup
  let cfg = i18n[tag];
  // parent fallback (e.g. 'en-US'→'en')
  if (!cfg) {
    const base = tag.split(/[-_]/)[0];
    cfg = i18n[base];
  }
  // default to British English
  if (!cfg) cfg = i18n['en-GB'];

  // extract hours/minutes/seconds
  const h = dt.getHours() % 12 || 12;
  const m = dt.getMinutes();
  const s = dt.getSeconds();

  // for punctuation arrays
  const words = cfg;

  // if cfg is a string alias, keep looking up
  if (typeof cfg === 'string') return buildAnnouncement(dt, cfg, strokes, ordinal);

  return cfg.build({ strokes, h, m, s, words, ordinal, pick });
}
