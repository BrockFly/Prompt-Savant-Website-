import { useState, useEffect, useRef } from "react";

// ── BRAND TOKENS ─────────────────────────────────────────────
const G = {
  gold: "#C9A84C",
  goldLight: "#E8C96A",
  goldDim: "#8a6f2e",
  goldGhost: "#C9A84C18",
  black: "#060606",
  dark: "#0c0b08",
  panel: "#111009",
  border: "#7d6a3b",
  borderHot: "#a8904a",
  creme: "#f0e8d5",
  cremeDark: "#e8dcc4",
  orange: "#FF6B1A",
  orangeDim: "#FF6B1A33",
  text: "#ede2c2",
  muted: "#b09e6a",
  ghost: "#ffffff08",
};

const genres = [
  { rank:1,  id:"hip-hop-rap",        genre:"Hip-Hop / Rap",         bpm:"90 BPM",      tags:["Boom-Bap","Trap","Melodic","Drill","Phonk"] },
  { rank:2,  id:"pop",                genre:"Pop",                   bpm:"120 BPM",     tags:["Dance-Pop","Synth-Pop","Dark Pop","Electropop","Indie Pop"] },
  { rank:3,  id:"rock",               genre:"Rock",                  bpm:"130 BPM",     tags:["Classic","Hard Rock","Alt","Grunge","Prog"] },
  { rank:4,  id:"country",            genre:"Country",               bpm:"96 BPM",      tags:["Classic","Outlaw","Modern","Bluegrass","Country-Pop"] },
  { rank:5,  id:"edm",                genre:"EDM",                   bpm:"128 BPM",     tags:["Progressive","Big Room","Minimal","Melodic","Festival"] },
  { rank:6,  id:"latin",              genre:"Latin",                 bpm:"100 BPM",     tags:["Reggaeton","Salsa","Bachata","Cumbia","Latin Trap"] },
  { rank:7,  id:"k-pop",              genre:"K-Pop",                 bpm:"118 BPM",     tags:["Idol","Dark","Retro","Hyperpop","Ballad"] },
  { rank:8,  id:"rnb-soul",           genre:"R&B / Soul",            bpm:"85 BPM",      tags:["Neo-Soul","Contemporary","Classic","Alt R&B","Quiet Storm"] },
  { rank:9,  id:"jazz",               genre:"Jazz",                  bpm:"132 BPM",     tags:["Bebop","Fusion","Smooth","Modal","Avant-garde"] },
  { rank:10, id:"classical",          genre:"Classical",             bpm:"72 BPM",      tags:["Orchestral","Chamber","Romantic","Baroque","Minimalist"] },
  { rank:11, id:"trap",               genre:"Trap",                  bpm:"142 BPM",     tags:["Dark","Melodic","Drill","Hi-Hat Heavy","Cinematic"] },
  { rank:12, id:"blues",              genre:"Blues",                 bpm:"88 BPM",      tags:["Delta","Chicago","Electric","Slow","Jump Blues"] },
  { rank:13, id:"reggae",             genre:"Reggae",                bpm:"80 BPM",      tags:["Roots","Dancehall","Dub","Rocksteady","Lover's Rock"] },
  { rank:14, id:"metal",              genre:"Metal",                 bpm:"160 BPM",     tags:["Heavy","Death","Black","Thrash","Nu-Metal"] },
  { rank:15, id:"funk",               genre:"Funk",                  bpm:"106 BPM",     tags:["Classic","P-Funk","Funk-Rock","Jazz-Funk","Neo-Funk"] },
  { rank:16, id:"gospel",             genre:"Gospel",                bpm:"92 BPM",      tags:["Traditional","Contemporary","Southern","Urban","Choir"] },
  { rank:17, id:"electronic-ambient", genre:"Electronic / Ambient",  bpm:"90 BPM",      tags:["Ambient","IDM","Glitch","Downtempo","Experimental"] },
  { rank:18, id:"disco",              genre:"Disco",                 bpm:"118 BPM",     tags:["Classic","Nu-Disco","Italo","Cosmic","Funk-Disco"] },
  { rank:19, id:"house",              genre:"House",                 bpm:"124 BPM",     tags:["Deep","Tech House","Afro","Progressive","Chicago"] },
  { rank:20, id:"techno",             genre:"Techno",                bpm:"140 BPM",     tags:["Industrial","Minimal","Detroit","Hard","Melodic"] },
  { rank:21, id:"punk",               genre:"Punk",                  bpm:"180 BPM",     tags:["Classic","Pop-Punk","Post-Punk","Hardcore","Emo"] },
  { rank:22, id:"alternative-indie",  genre:"Alternative / Indie",   bpm:"110 BPM",     tags:["Indie Rock","Shoegaze","Dream Pop","Lo-Fi","Art Rock"] },
  { rank:23, id:"soul",               genre:"Soul",                  bpm:"78 BPM",      tags:["Classic","Deep","Southern","Psychedelic","Blue-Eyed"] },
  { rank:24, id:"melodic-trap",       genre:"Melodic Trap",          bpm:"130 BPM",     tags:["Emo Rap","SoundCloud","Dark","Rage","Cloud Rap"] },
  { rank:25, id:"afrobeats",          genre:"Afrobeats",             bpm:"102 BPM",     tags:["Afropop","Afro-Fusion","Highlife","Amapiano","Afro-Trap"] },
  { rank:26, id:"drill",              genre:"Drill",                 bpm:"140 BPM",     tags:["UK Drill","Chicago","Brooklyn","Pop Drill","Dark"] },
  { rank:27, id:"phonk",              genre:"Phonk",                 bpm:"138 BPM",     tags:["Memphis","Drift","Dark","Aggressive","Lo-Fi"] },
  { rank:28, id:"lo-fi-hip-hop",      genre:"Lo-Fi Hip-Hop",         bpm:"75 BPM",      tags:["Study","Chill","Jazz-Hop","Vintage","Rainy"] },
  { rank:29, id:"synthwave",          genre:"Synthwave",             bpm:"108 BPM",     tags:["Retrowave","Darksynth","Outrun","Cyberpunk","Dreamwave"] },
  { rank:30, id:"salsa",              genre:"Salsa",                 bpm:"180 BPM",     tags:["Afro-Cuban","Romantica","Timba","Jazz-Salsa","Modern"] },
  { rank:31, id:"bossa-nova",         genre:"Bossa Nova",            bpm:"130 BPM",     tags:["Classic","Jazz-Bossa","Modern","Vocal","Instrumental"] },
  { rank:32, id:"dancehall",          genre:"Dancehall",             bpm:"90 BPM",      tags:["Classic","Modern","Ragga","Digital","Pop-Dancehall"] },
  { rank:33, id:"flamenco",           genre:"Flamenco",              bpm:"Variable",    tags:["Traditional","Nuevo","Fusion","Jazz-Flamenco","Electric"] },
  { rank:34, id:"gospel-ccm",         genre:"Gospel / CCM",          bpm:"76 BPM",      tags:["Worship","Contemporary","Praise","Gospel-Pop","Choir"] },
  { rank:35, id:"indie-pop",          genre:"Indie Pop",             bpm:"115 BPM",     tags:["Dream Pop","Bedroom","Art Pop","Electro-Indie","Folk-Pop"] },
  { rank:36, id:"hard-rock",          genre:"Hard Rock",             bpm:"145 BPM",     tags:["Classic","Arena","Southern","Glam","Modern"] },
  { rank:37, id:"progressive-rock",   genre:"Progressive Rock",      bpm:"Variable",    tags:["Classic","Symphonic","Neo-Prog","Math Rock","Post-Rock"] },
  { rank:38, id:"ambient-drone",      genre:"Ambient / Drone",       bpm:"None",        tags:["Dark Ambient","Drone","Noise","Healing","Cinematic"] },
  { rank:39, id:"outlaw-country",     genre:"Outlaw Country",        bpm:"104 BPM",     tags:["Outlaw","Texas","Red Dirt","Americana","Folk-Country"] },
  { rank:40, id:"new-jack-swing",     genre:"New Jack Swing",        bpm:"96 BPM",      tags:["Classic","Modern","R&B-Swing","Hip-Hop Swing","Urban"] },
  { rank:41, id:"samba",              genre:"Samba",                 bpm:"200 BPM",     tags:["Brazilian","Pagode","Samba-Rock","Gafieira","Modern"] },
  { rank:42, id:"blues-rock",         genre:"Blues Rock",            bpm:"100 BPM",     tags:["Classic","Southern","Psychedelic","Modern","Texas"] },
  { rank:43, id:"ska",                genre:"Ska",                   bpm:"160 BPM",     tags:["Traditional","2-Tone","Ska-Punk","Reggae-Ska","Modern"] },
  { rank:44, id:"neo-soul",           genre:"Neo-Soul",              bpm:"82 BPM",      tags:["Classic","Contemporary","Jazz-Soul","Indie-Soul","Alt"] },
  { rank:45, id:"dubstep",            genre:"Dubstep",               bpm:"140 BPM",     tags:["Brostep","Riddim","Deep","Melodic","Liquid"] },
  { rank:46, id:"drum-and-bass",      genre:"Drum & Bass",           bpm:"174 BPM",     tags:["Liquid","Neurofunk","Jump-Up","Jungle","Dark"] },
  { rank:47, id:"cumbia",             genre:"Cumbia",                bpm:"112 BPM",     tags:["Colombian","Electronic","Cumbia-Pop","Andean","Modern"] },
  { rank:48, id:"grunge",             genre:"Grunge",                bpm:"120 BPM",     tags:["Seattle","Post-Grunge","Noise Rock","Sludge","Alt"] },
  { rank:49, id:"trap-metal",         genre:"Trap Metal",            bpm:"145 BPM",     tags:["Dark Rap","Rage","Nu-Metal Rap","Aggro","Experimental"] },
  { rank:50, id:"hyperpop",           genre:"Hyperpop",              bpm:"150 BPM",     tags:["PC Music","Glitchcore","Bubblegum Bass","Experimental","Dark"] },
];

// ── FREE TIER PROMPTS (Style B — Tagged Modular) ──────────────
const freePrompts = {
  "hip-hop-rap": "[Genre: Hip-Hop / Rap] [Tempo: 88 BPM] [Key: F Minor] Male rapper, confident rhythmic flow, melodic or chanted hook, ad libs throughout. 808 sub bass, trap hi-hats, sampled piano chop, atmospheric pad. Hard-hitting production, punchy kick and snare, low-end dominant mix. Structure I-V1-Hook-V2-Hook-Bridge-Hook-O. 16-bar verses, infectious hook, bridge strips to atmosphere, outro loops hook. This will convey the unshakeable confidence of someone who built everything from nothing and answers to no one.",
  "pop": "[Genre: Pop] [Tempo: 120 BPM] [Key: C Major] Female or male lead vocal, polished and doubled on chorus, wide harmonies. Electronic drums, synth bass, rhythm guitar, pad layers, bright synth lead. Clean modern production, punchy low end, wide stereo field. Structure I-V-Pre-C-V-Pre-C-Bridge-C-O. Verse intimate and building, chorus explosive release, bridge harmonic contrast, outro fades on hook. This will convey the feeling of pure joy breaking through — the moment everything finally feels right.",
  "rock": "[Genre: Rock] [Tempo: 128 BPM] [Key: E Minor] Male or female vocal, raw grit in verse, soaring on chorus. Overdriven rhythm guitar, lead guitar, electric bass, full live drums, minimal keys. Thick punchy production, wide stereo guitars, hard-hitting natural drums. Structure I-V-C-V-C-Solo-Bridge-C-O. Riff leads everything, verse controlled energy, chorus full release, solo emotional peak, final chorus maximum. This will convey the feeling of refusing to bow — standing in the fire and choosing not to move.",
  "country": "[Genre: Country] [Tempo: 96 BPM] [Key: G Major] Male baritone, authentic twang, clear storytelling vocal, soaring on chorus. Acoustic guitar, Telecaster, pedal steel, fiddle, bass, live drums. Warm analog production, natural room sound, organic feel. Structure I-V-C-V-C-Bridge-C-O. Story in verses, emotional payoff chorus, narrative turn in bridge, fade on final chorus. This will convey the quiet ache of a life fully lived — the roads taken, the ones left behind, and the ones worth remembering.",
  "edm": "[Genre: EDM] [Tempo: 130 BPM] [Key: A Major] Female vocal, soaring and inspirational, pitched on chorus. Massive synth lead, four-on-the-floor kick, snare roll, white noise riser, sidechained bass, atmospheric pad. Festival-scale production, enormous low end, maximum energy. Structure I-V-Build-Drop-Breakdown-Drop2-O. Vocal teased in intro, filter sweep into drop, emotional breakdown, second drop variation. This will convey the feeling of a crowd of thousands becoming one organism, lifted by pure sound.",
  "latin": "[Genre: Reggaeton] [Tempo: 95 BPM] [Key: G Minor] Male vocal, charismatic rhythmic, Spanish or bilingual, melodic dancefloor hook. Dembow pattern, deep sub bass, off-beat synth chords, driving hi-hat, vocal effects. Punchy club-ready production, enormous bass, crisp dembow. Structure I-V-C-V-C-Perreo-O. Immediate dembow, rhythmic verse, dominant chorus hook, percussion dance break, sustaining outro. This will convey the magnetic pull between two people on a dancefloor where everything else disappears.",
  "k-pop": "[Genre: K-Pop] [Tempo: 120 BPM] [Key: A Minor / Major chorus] Group vocal — mixed male and female — tight harmonies, contrasting rap section. Electronic drums, sidechained synth bass, arpeggio synth, atmospheric pad. Hyper-polished production, wide stereo, every element precisely placed. Structure I-V-Pre-C-RapSection-Bridge-C-O. High-energy intro, tight verse, rising pre, anthemic chorus, rap contrast, emotional bridge, maximum final chorus. This will convey the electric precision of a performance where every note and movement is an act of devotion to the audience.",
  "rnb-soul": "[Genre: R&B / Soul] [Tempo: 80 BPM] [Key: Bb Minor] Male tenor, silky vocal, controlled vibrato, melismatic riffs and runs at peaks. Deep synth bass, Rhodes piano, acoustic guitar, live drums, lush stereo pads, congas. Warm analog production, wide stereo field, tension-and-release dynamics. Structure I-V-C-V-C-Bridge-O. Sparse intimate verse, full emotional chorus, bridge harmonic peak, outro vocal runs. This will convey the emotional longing of someone who gave everything to love and is still reaching for what was lost.",
  "jazz": "[Genre: Jazz] [Tempo: 160 BPM swing] [Key: F Major, ii-V-I] Lead vocal or instrument, spontaneous and expressive. Piano comping, walking upright bass, brushed drums, responsive rhythm section. Live intimate production, room sound present. Structure Head-Solos-Trading-HeadOut-Tag. Full melody, improvised solos over changes, 4-bar trading, varied melody return, repeated tag resolution. This will convey the exhilarating freedom of musical conversation between masters — intelligence and feeling arriving at the same place simultaneously.",
  "classical": "[Genre: Classical / Orchestral] [Tempo: 120 BPM allegro] [Key: D Major] No vocal. Full orchestra — strings, woodwinds, brass, percussion, piano. Natural concert hall acoustic, no processing, full dynamic range. Structure Exposition-Development-Recapitulation-Coda. Themes introduced, fragmented under tension, tonal resolution, grand coda. This will convey the full majesty of human musical achievement — complexity and beauty working together at the absolute limit of both.",
  "trap": "[Genre: Trap] [Tempo: 72 BPM half-time] [Key: C Minor] Male rapper, triplet flow and slow deliberate bars, melodic auto-tuned hook. 808 sub bass, hi-hat triplets, hard cracking snare, dark atmospheric pad, piano sample. Massive 808, crisp hi-hats, dark aggressive mix. Structure I-V1-Hook-V2-Hook-Bridge-O. 808 sets tone, flow over minimal beat, melodic repeating hook, atmospheric bridge. This will convey the cold clarity of someone who came from nothing and sees exactly where they are going.",
  "blues": "[Genre: Blues] [Tempo: 80 BPM shuffle] [Key: E Major, 12-bar] Male or female vocal, lived-in and expressive, AAB lyric structure. Expressive lead guitar, rhythm guitar, walking bass, shuffle drums, optional harmonica. Warm analog production, guitar forward, natural room drums. Structure I-V1-Solo-V2-Turnaround-O. Riff opens, AAB verse, guitar solo, second verse, turnaround pushes back. This will convey the weight of carrying something heavy for a long time — and the grace of still being able to sing about it.",
  "reggae": "[Genre: Reggae] [Tempo: 82 BPM] [Key: A Mixolydian] Male vocal, message-driven and patient, conscious lyric, slight rasp. Melodic bass, rhythm guitar skank on off-beats, organ, one-drop drums, bongo and shaker. Warm analog production, bass forward, spacious mix. Structure I-V-C-DubSection-V-O. Bass establishes groove, patient intentional verse, authoritative chorus, echo dub section, bass sustains outro. This will convey the quiet power of truth spoken without urgency — words that land because they were worth waiting for.",
  "metal": "[Genre: Metal] [Tempo: 160 BPM] [Key: B Minor, Phrygian] Male vocal, powerful clean or controlled scream, alternating. Down-tuned stereo rhythm guitars, shredding lead, driving bass, double kick drums. Thick crushing production, saturated guitars, massive low end. Structure I-V-C-V-C-Solo-Breakdown-C-O. Brutal riff from bar one, intense verse, anthemic chorus, technical solo, devastating breakdown. This will convey the primal release of every suppressed rage finally given voice — pure and unapologetic.",
  "funk": "[Genre: Funk] [Tempo: 108 BPM] [Key: G Minor] Male or female vocal, rhythmic phrasing over pocket, call-and-response with band. Slap bass, tight staccato rhythm guitar, ghost-note drums, horn stabs, keys. Tight punchy production, bass and drums locked, bright horns, rhythm-forward mix. Structure I-V-C-InstrumentalBreak-Bridge-O. Groove from bar one, pocket verse, full horn chorus, bass break, peak vamp outro. This will convey the pure physical joy of a groove so tight it moves your body before your mind gets a vote.",
  "gospel": "[Genre: Gospel] [Tempo: 88 BPM] [Key: G Major] Male or female lead vocal, testifying conviction, powerful SATB choir response. Hammond organ, piano, bass guitar, full live drums, hand claps. Live warm production, organ prominent, choir wide in stereo. Structure I-V-C-Vamp-Bridge-O. Spirit-filled opening, testifying verse, full gospel chorus, open vamp call-response, maximum bridge intensity, choir sustains outro. This will convey the overwhelming sensation of being held by something greater — faith made audible, hope made real.",
  "electronic-ambient": "[Genre: Ambient / Chill] [Tempo: Beatless or 70 BPM] [Key: E Modal] Wordless voice texture or no vocal. Layered synth pads, soft piano, sub drone, field recordings, melodic fragments. Enormous reverb tails, slow attack, long release, immersive spatial mix. Structure organic — elements emerge and dissolve slowly, space is the instrument. This will convey the profound stillness found between thoughts — the quiet that restores everything.",
  "disco": "[Genre: Dance / Electronic Pop] [Tempo: 124 BPM] [Key: A Minor] Female lead vocal, bright and layered on chorus. Four-on-the-floor kick, sidechained synth bass, arpeggio synth, atmospheric pad, claps. Modern electronic production, heavy sidechain, wide and punchy. Structure I-V-Build-Drop-Breakdown-Drop2-O. Verse restrained, build with filter sweep, drop explosive, breakdown breathes, second drop heavier. This will convey the electric sensation of losing yourself completely in a moment that feels infinite.",
  "house": "[Genre: House] [Tempo: 124 BPM] [Key: F Minor] Female vocal, warm breathy gospel phrasing, pitched and layered. Four-on-the-floor kick, open hi-hat, soulful chord stabs, deep bass groove, Rhodes accent. Warm analog-influenced production, punchy kick, wide deep mix. Structure I-Breakdown-Build-Drop-Breakdown2-Peak-O. Slow element layering, full groove drop, atmospheric breakdowns, outro strips back. This will convey the transcendent joy of losing yourself completely in the music — body and soul surrendered to the groove.",
  "techno": "[Genre: Techno] [Tempo: 138 BPM] [Key: Atonal / Industrial] No vocal or processed voice fragments only. Relentless kick, industrial hi-hat, harsh synth stab, sub bass, noise layers. Dark mechanical production, driving kick, aggressive mix. Structure I-LayerBuild-Peak-Breakdown-ReEntry-O. Kick from bar one, elements add every 16 bars, hypnotic peak, minimal breakdown, full re-entry, abrupt outro. This will convey the primal surrender to machine rhythm — consciousness dissolving into pure repetitive force.",
  "punk": "[Genre: Punk] [Tempo: 180 BPM] [Key: A Major] Shouted urgent vocal, group vocal on chorus, no polish. Two raw overdriven guitars, bass, relentless simple drums. Lo-fi intentional production, dry and aggressive. Structure I-V-C-V-C-Bridge-O. Immediate riff, short urgent verse, louder faster chorus, brief bridge breakdown, under 3 minutes total. This will convey the raw fury of someone who has had enough and is not asking for permission to say it.",
  "alternative-indie": "[Genre: Alternative / Indie Rock] [Tempo: 110 BPM] [Key: D Major, modal] Intimate vocal, unguarded and warm, sparse harmonies. Jangly or atmospheric guitar, melodic bass, restrained live drums, synth texture. Warm analog production, slightly imperfect, intimate mix. Structure I-V-C-V-C-Bridge-O. Atmospheric intro, introspective verse, chorus lifts through texture, experimental bridge, open outro. This will convey the quiet courage of being completely yourself in a world that keeps asking you to be someone else.",
  "soul": "[Genre: Soul] [Tempo: 76 BPM] [Key: F Minor] Male or female vocal, deeply personal, powerful melisma at peaks. Organ or piano, melodic bass, live drums, punchy horns on chorus, warm backing vocals. Warm analog organic production, breathing mix. Structure I-V-C-V-C-Bridge-O. Warm organ intro, personal verse, full gospel chorus, melisma bridge peak, vocal runs on outro. This will convey the healing power of music that knows your pain and transforms it into something worth singing.",
  "melodic-trap": "[Genre: Trap] [Tempo: 72 BPM half-time] [Key: C Minor] Male rapper, triplet flow and slow deliberate bars, melodic auto-tuned hook. 808 sub bass, hi-hat triplets, hard cracking snare, dark atmospheric pad, piano sample. Massive 808, crisp hi-hats, dark aggressive mix. Structure I-V1-Hook-V2-Hook-Bridge-O. 808 sets tone, flow over minimal beat, melodic repeating hook, atmospheric bridge. This will convey the aching vulnerability beneath the surface — emotion turned into art.",
  "afrobeats": "[Genre: Afrobeats] [Tempo: 103 BPM] [Key: F Major] Male or female vocal, melodic rhythmic, Pidgin or African English, call-and-response. Percussion-forward — shaker, talking drum, conga — synth guitar, bass, keyboard stabs. Bright punchy production, percussion prominent, deep bass, wide energetic mix. Structure I-V-C-V-C-DanceBreak-O. Infectious groove from bar one, irresistible chorus, percussion dance break, fade at peak. This will convey the unstoppable joy of celebration — a whole community moving as one.",
  "drill": "[Genre: Hip-Hop / Rap] [Tempo: 88 BPM] [Key: F Minor] Male rapper, direct and unflinching delivery, dark melodic hook. Sliding 808 bass, hi-hat rolls, trap percussion, dark minor piano chop, orchestral strings. Hard dark production, rolling 808s, crisp percussion. Structure I-V1-Hook-V2-Hook-Bridge-O. Dark instrumental, verse raw and cold, hook melodic contrast, bridge atmospheric. This will convey the steely resolve of someone who has seen everything and still chooses to move forward.",
  "phonk": "[Genre: Trap] [Tempo: 138 BPM] [Key: C Minor] Male rapper or no vocal, aggressive drift-influenced delivery. Memphis-style cowbell, 808 sub bass, dark soul sample chop, hi-hat rolls. Lo-fi aggressive production, dark distorted 808, gritty texture. Structure I-V1-Hook-V2-Hook-O. Dark loop from bar one, aggressive verse, hook drives momentum, outro sustains groove. This will convey the aggressive momentum of speed and darkness — adrenaline in sonic form.",
  "lo-fi-hip-hop": "[Genre: Lo-Fi Hip-Hop] [Tempo: 80 BPM] [Key: F Minor 7] No vocal or filtered vocal sample and wordless hum. Vinyl crackle, rain ambient, Rhodes or jazz piano, lazy programmed drums, warm bass, guitar or flute. Intentional lo-fi production — warm, vinyl feel, minimal high end. Structure I-MainLoop-MelodicLayer-Variation-Breakdown-Return. Vinyl opens, loop establishes, melody layers, shift variation, atmospheric breakdown, loop fades. This will convey the warm comfort of a rainy afternoon with nowhere to be — time moving slowly and that being exactly right.",
  "synthwave": "[Genre: Dance / Electronic Pop] [Tempo: 108 BPM] [Key: A Minor] Male or female vocal, nostalgic and cinematic, echoing reverb wash. Analog synth arpeggios, gated reverb snare, synth bass pulsing, pad layers wide, lead synth melodic. Retro electronic production, analog warmth, wide cinematic mix. Structure I-V-C-V-C-Bridge-O. Synth arpeggio opens, nostalgic verse, soaring chorus, driving bridge, fade on repeat hook. This will convey the bittersweet beauty of memory — neon-lit nights and moments you can almost touch.",
  "salsa": "[Genre: Salsa] [Tempo: 185 BPM] [Key: C Major, Latin Jazz] Male lead vocal, powerful and expressive, group coro response. Piano tumbao, walking bass, clave, timbales, conga, bongo, brass section. Live punchy production, brass forward, dense percussion. Structure Intro-Cuerpo-Estribillo-Montuno-Mambo-Coda. Brass fanfare, call verse, coro chorus, extended montuno, brass mambo peak. This will convey the irresistible heat of a dancefloor where culture, passion, and rhythm are one and the same.",
  "bossa-nova": "[Genre: Bossa Nova] [Tempo: 120 BPM] [Key: C Major 7] Female or male vocal, intimate near-spoken, Portuguese or English, pure tone no vibrato. Nylon string guitar, upright bass, brushed drums, flute or vibraphone. Intimate dry production, minimal reverb, acoustic space. Structure I-V-C-InstrumentalBreak-V-O. Guitar alone intro, soft vocal entry, undramatic chorus lift, instrument feature, intimate final verse. This will convey the gentle melancholy of a beautiful afternoon ending — warmth fading slowly into something even more beautiful.",
  "dancehall": "[Genre: Dancehall] [Tempo: 100 BPM] [Key: F Minor] Deejay or singjay vocal, Jamaican patois, rhythmic and playful, melodic hook. Riddim drum pattern, hypnotic bass, synth stabs, echo and reverb. Warm punchy production, echo prominent, driving bass. Structure I-V-C-V-C-DubSection-O. Immediate riddim, swagger verse, melodic chorus, echo dub section, sustaining outro. This will convey the irresistible magnetism of someone who walks into any room and owns it without trying.",
  "flamenco": "[Genre: Flamenco] [Tempo: 12-beat compas] [Key: A Phrygian / Andalusian] Male cantaor, deeply expressive, raw cante jondo tradition. Classical guitar with falsetas, palmas, cajon or footwork, jaleo responses. Live intimate production, guitar and voice forward, silence as instrument. Structure I-Cante-Llamada-Baile-Escobilla-Cierre. Guitar falseta intro, singer enters, dancer called, footwork escalates, rapid climax, final resolution strike. This will convey the ancient ache of duende — the dark ineffable force that makes art feel like survival.",
  "gospel-ccm": "[Genre: Christian Contemporary] [Tempo: 84 BPM] [Key: G Major] Male or female vocal, worshipful and genuine, warm inviting harmonies. Atmospheric electric guitar, piano, bass, live drums, wide pads. Warm open production, reverb-forward guitar, congregational mix. Structure I-V-C-V-C-Bridge-Tag-O. Gentle guitar opening, personal verse, anthemic chorus, worshipful bridge, tag repeats key lyric, soft resolution. This will convey the overwhelming peace of complete surrender — faith not as concept but as lived breathing reality.",
  "indie-pop": "[Genre: Indie Pop] [Tempo: 112 BPM] [Key: E Major] Bright conversational vocal, light airy harmonies. Jangly guitar, synth pad, melodic bass, light live drums, glockenspiel texture. Warm airy production, spacious reverb, intimate wide mix. Structure I-V-C-V-C-Bridge-O. Gentle intro, bright verse, warm chorus, unexpected bridge chord, fade with layered harmonies. This will convey the tender warmth of a feeling you did not see coming — and would not trade for anything.",
  "hard-rock": "[Genre: Rock] [Tempo: 145 BPM] [Key: E Minor] Male or female vocal, raw power in verse, anthemic soaring chorus. Down-tuned rhythm guitars wide in stereo, shredding lead, driving bass, powerful live drums. Thick arena production, guitars saturated, massive low end. Structure I-V-C-V-C-Solo-Bridge-C-O. Heavy riff from bar one, powerful verse, anthemic chorus, technical solo, bridge contrast, maximum final chorus. This will convey the exhilarating power of music played without restraint — volume and emotion as one force.",
  "progressive-rock": "[Genre: Alternative / Indie Rock] [Tempo: 110 BPM] [Key: D Major, modal] Male or female vocal, expressive and technically precise. Complex guitar arrangements, melodic bass, intricate drum patterns, keys and synth textures. Detailed production, every instrument distinct, dynamic range full. Structure I-V-C-InstrSec-V-C-EpicOutro. Atmospheric intro, building verse, melodic chorus, extended instrumental, final epic outro. This will convey the journey of a mind fully alive — complexity and beauty arriving at the same destination.",
  "ambient-drone": "[Genre: Ambient / Chill] [Tempo: Beatless] [Key: E Modal] No vocal. Layered drone textures, evolving synth pads, deep sub harmonic, field recordings, subtle melodic fragments. Enormous spatial reverb, infinite sustain, immersive mix. Structure organic evolution — no sections, only emergence and dissolution. This will convey the experience of pure stillness — consciousness expanding into sound and finding peace there.",
  "outlaw-country": "[Genre: Country] [Tempo: 104 BPM] [Key: G Major] Male baritone, raw outlaw delivery, storytelling verse, defiant chorus. Acoustic guitar, Telecaster electric with bite, bass, live drums loose and driving. Raw analog production, guitar forward, natural room, gritty edge. Structure I-V-C-V-C-Bridge-O. Guitar riff opens, outlaw story in verse, defiant chorus, bridge turns the narrative, final chorus resolves. This will convey the freedom of living by your own rules — choosing the hard road because it is the honest one.",
  "new-jack-swing": "[Genre: R&B / Soul] [Tempo: 96 BPM] [Key: Bb Minor] Male or female vocal, smooth urban delivery, melodic hook, harmonized chorus. New jack drum machine, synth bass, rhythm guitar stabs, keys, horn accents. Tight urban production, punchy drums, bass driving, wide harmonies. Structure I-V-C-V-C-Bridge-O. Drum intro, smooth verse, melodic chorus hook, bridge harmonic shift, final chorus full harmonies. This will convey the irresistible confidence of someone at the peak of their moment — cool, magnetic, completely in control.",
  "samba": "[Genre: Salsa] [Tempo: 200 BPM] [Key: C Major] Male or female vocal, celebratory and rhythmic, call-and-response chorus. Surdo bass drum, tamborim, pandeiro, agogô, cavaquinho, seven-string guitar, brass accents. Live punchy production, percussion forward, brass bright, energetic mix. Structure Intro-V-C-PercBreak-V-O. Percussion launches immediately, verse vocal over groove, chorus full band, percussion break feature, outro fades at peak. This will convey the pure ecstatic joy of Carnival — every body moving, every soul celebrating.",
  "blues-rock": "[Genre: Blues] [Tempo: 100 BPM] [Key: E Major] Male or female vocal, raw and powerful, blues phrasing with rock energy. Overdriven lead guitar expressive and vocal, rhythm guitar, electric bass, live drums full kit. Warm powerful production, guitar forward, drums punchy, full band energy. Structure I-V-C-V-C-Solo-O. Guitar riff opens heavy, blues verse, rock chorus lifts, extended guitar solo peaks, outro sustains groove. This will convey the cathartic release of emotion played through an overdriven guitar — raw and completely free.",
  "ska": "[Genre: Punk] [Tempo: 160 BPM] [Key: A Major] Male or female vocal, energetic and upbeat, group backing vocals. Offbeat rhythm guitar skank, walking bass, drum kit driving, horn section — trumpet and trombone. Bright live production, horns forward, bass driving, energetic mix. Structure I-V-C-V-C-HornBreak-O. Skank guitar opens, energetic verse, horn-lifted chorus, horn feature break, outro at full energy. This will convey the irresistible energy of music that makes standing still physically impossible.",
  "neo-soul": "[Genre: Neo-Soul] [Tempo: 78 BPM] [Key: Eb Minor 7] Male or female vocal, conversational intimate, musical melisma at peaks. Rhodes piano, organic synth bass, laid-back live drums with ghost notes, textural guitar, strings. Warm detailed production, Rhodes prominent, intimate mix. Structure I-V-C-V-C-Bridge-O. Rhodes groove opens, conversational verse, melodic chorus, harmonic adventure bridge, vocal improvisation outro. This will convey the quiet complexity of someone who has felt everything deeply and finally found the language to say it.",
  "dubstep": "[Genre: EDM] [Tempo: 140 BPM] [Key: A Minor] Male or female vocal sample or no vocal. Heavy synth bass wobble, half-time drum pattern, atmospheric pad, riser sweeps, sub bass dominant. Dark powerful production, bass enormous, drop devastating. Structure I-V-Build-Drop-Breakdown-Drop2-O. Atmospheric intro, tension build with riser, devastating drop, breakdown breathes, second drop variation. This will convey the overwhelming physical impact of bass so heavy it changes the air in the room.",
  "drum-and-bass": "[Genre: Drum and Bass] [Tempo: 174 BPM] [Key: D Minor] Female vocal sample or atmospheric processed voice. Amen break, modulated Reese sub bass, atmospheric pad, stab accents. Crisp break, enormous sub, dynamic mix. Structure I-Drop1-ReeseSec-Breakdown-Drop2-O. Atmospheric intro, break explodes, Reese modulates, breakdown breathes, heavier second drop. This will convey the relentless forward momentum of a world moving too fast to stop — and the thrill of keeping pace.",
  "cumbia": "[Genre: Cumbia] [Tempo: 90 BPM] [Key: F Major] Male or female vocal, warm celebratory, narrative lyric, singalong chorus. Accordion, guacharaca, bass drum, conga, melodic bass, maracas. Warm organic production, accordion forward, lively percussion. Structure I-V-C-InstrumentalBreak-V-O. Accordion identity, storytelling verse, dancefloor chorus, accordion break, groove fade outro. This will convey the warmth of celebration shared between generations — music that belongs to everyone and always has.",
  "grunge": "[Genre: Alternative / Indie Rock] [Tempo: 120 BPM] [Key: D Major, modal] Male or female vocal, raw and emotionally exposed, quiet verse to powerful chorus. Distorted guitars heavy and wide, melodic bass, live drums powerful. Raw production, guitars thick, dynamic contrast extreme. Structure I-V-C-V-C-Bridge-O. Quiet guitar intro, introspective verse, explosive chorus, bridge most raw, final chorus full release. This will convey the cathartic release of emotion held too long — everything finally breaking through.",
  "trap-metal": "[Genre: Metal] [Tempo: 145 BPM] [Key: B Minor] Male vocal, aggressive rap verse, screamed or sung hook. Down-tuned distorted guitars, 808 sub bass, trap hi-hats, double kick drums, dark synth. Dark aggressive production, 808 and guitars fused, maximum energy. Structure I-V-Hook-V-Hook-Breakdown-O. Dark intro, rap verse aggressive, hook powerful, breakdown destroys, outro sustains. This will convey the collision of two worlds of aggression — twice the energy, no apology.",
  "hyperpop": "[Genre: Pop] [Tempo: 150 BPM] [Key: C Major] Male or female vocal, heavily processed and pitched, chaotic energy. Hyper-compressed drums, distorted 808, synth arpeggios extreme, glitch effects, everything pushed to breaking. Maximalist production, every element at 110%, controlled chaos. Structure I-V-Drop-V-Drop-Bridge-O. Immediate energy, verse melodic but chaotic, drop explodes all elements, bridge brief chaos, final drop maximum. This will convey the exhilarating chaos of emotion processed at maximum speed — everything felt all at once.",
};

const varTypes = [
  { id:"mood",           label:"Mood",         count:40, icon:"◈" },
  { id:"tempo",          label:"Tempo",         count:30, icon:"◎" },
  { id:"hybrid",         label:"Genre Hybrid",  count:50, icon:"⟁" },
  { id:"modulation",     label:"Modulation",    count:30, icon:"♦" },
  { id:"mix",            label:"Mix Profile",   count:30, icon:"◉" },
  { id:"production_era", label:"Era",           count:20, icon:"◇" },
];

const tiers = [
  {
    id: "free",
    name: "Prompt Savant",
    sub: "FREE FOREVER",
    price: "$0",
    priceSub: "NO CARD REQUIRED",
    accent: G.gold,
    badge: null,
    prompts: 50,
    desc: "50 hand-selected prompts across all 50 genres. The perfect starting point.",
    features: [
      "50 prompts across all 50 genres",
      "1 prompt per genre sampled",
      "Full prompt quality — no watermarks",
      "Access via web app",
      "Plug-in compatible with VP I/O (Coming Soon)",
    ],
    cta: "Start Free",
    outline: true,
  },
  {
    id: "vault",
    name: "Prompt Savant Vault",
    sub: "UPGRADE · TIER 1",
    price: "$15",
    priceSub: "ONE-TIME · YOURS FOREVER",
    accent: G.gold,
    badge: null,
    prompts: 2050,
    desc: "2,050 prompts drawn from the full codex — 40 per genre, every style covered.",
    features: [
      "2,050 prompts (40 per genre)",
      "All 50 genres fully represented",
      "Curated from the VP I/O 10k Codex",
      "All 6 variation types included",
      "Instant access · Lifetime license",
      "Plug-in compatible with VP I/O (Coming Soon)",
    ],
    cta: "Get The Vault — $15",
    outline: false,
  },
  {
    id: "codex",
    name: "Prompt Savant Codex",
    sub: "UPGRADE · TIER 2",
    price: "$50",
    priceSub: "ONE-TIME · COMPLETE LIBRARY",
    accent: G.orange,
    badge: "COMPLETE",
    prompts: 10050,
    desc: "The entire VP I/O Prompt Codex. All 10,050 prompts. Nothing held back.",
    features: [
      "Full 10,050-prompt VP I/O Codex",
      "All 50 genres · 200 variations each",
      "All 6 variation types",
      "Instant PDF download included",
      "Lifetime access · All future updates",
      "Priority VP I/O plug-in integration (Coming Soon)",
    ],
    cta: "Get The Codex — $50",
    outline: false,
  },
];

// ── ACCESS CODE VALIDATION ────────────────────────────────────
// Replace these with your real codes from Stripe
const ACCESS_CODES = {
  "VAULT-XXXX": "vault",
  "CODEX-XXXX": "codex",
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Space+Mono:wght@400;700&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes glow {
    0%,100% { text-shadow: 0 0 20px #C9A84C44; }
    50%      { text-shadow: 0 0 40px #C9A84C99, 0 0 80px #C9A84C33; }
  }

  .fade-up   { animation: fadeUp .6s ease both; }
  .fade-up-1 { animation: fadeUp .6s .1s ease both; }
  .fade-up-2 { animation: fadeUp .6s .2s ease both; }
  .fade-up-3 { animation: fadeUp .6s .3s ease both; }
  .fade-up-4 { animation: fadeUp .6s .4s ease both; }
  .glow-gold { animation: glow 3s ease-in-out infinite; }

  .genre-row { transition: background .15s, border-color .15s, box-shadow .15s; box-shadow: 0 2px 0 #0d0b04, 0 4px 8px rgba(0,0,0,.4), inset 0 1px 0 rgba(201,168,76,.04); }
  .genre-row:hover { background: #16130a !important; border-color: #6e5e2a !important; box-shadow: 0 3px 0 #0d0b04, 0 6px 16px rgba(0,0,0,.5), inset 0 1px 0 rgba(201,168,76,.08) !important; }

  .var-tab { transition: all .15s; }
  .var-tab:hover { border-color: #C9A84C88 !important; }

  .tier-card { transition: border-color .2s, transform .2s, box-shadow .2s; box-shadow: 0 2px 0 #1a1408, 0 4px 0 #100d05, 0 6px 12px rgba(0,0,0,.6), inset 0 1px 0 rgba(201,168,76,.08); }
  .tier-card:hover { transform: translateY(-3px); box-shadow: 0 4px 0 #1a1408, 0 8px 0 #100d05, 0 12px 24px rgba(0,0,0,.7), inset 0 1px 0 rgba(201,168,76,.12); }

  .btn-gold {
    background:#C9A84C; color:#060606; border:none;
    font-family:'Space Mono',monospace; font-weight:700;
    letter-spacing:.15em; text-transform:uppercase;
    cursor:pointer; transition: all .2s;
  }
  .btn-gold:hover { background:#E8C96A; transform:translateY(-1px); }

  .btn-outline {
    background:transparent; border:1px solid #6e5e2a; color:#C9A84C;
    font-family:'Space Mono',monospace; letter-spacing:.15em;
    text-transform:uppercase; cursor:pointer; transition: all .2s;
  }
  .btn-outline:hover { border-color:#C9A84C; background:#C9A84C11; }

  .btn-orange {
    background:#FF6B1A; color:#060606; border:none;
    font-family:'Space Mono',monospace; font-weight:700;
    letter-spacing:.15em; text-transform:uppercase;
    cursor:pointer; transition: all .2s;
  }
  .btn-orange:hover { background:#ff8540; transform:translateY(-1px); }

  .btn-ghost {
    background:transparent; border:1px solid #453820; color:#6b5e3e;
    font-family:'Space Mono',monospace; letter-spacing:.15em;
    text-transform:uppercase; cursor:pointer; transition: all .2s;
  }
  .btn-ghost:hover { border-color:#5c4e22; color:#C9A84C; }

  .lock-row { transition: background .1s; }
  .lock-row:hover { background:#16130a; }

  input:focus { outline: 1px solid #C9A84C44 !important; }

  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:#0c0b08; }
  ::-webkit-scrollbar-thumb { background:#2a2210; border-radius:2px; }
  ::-webkit-scrollbar-thumb:hover { background:#5c4e22; }

  .noise {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    background-repeat:repeat; background-size:256px;
    pointer-events:none; position:fixed; inset:0; z-index:1; mix-blend-mode:overlay;
  }
`;

// ── ROOT ──────────────────────────────────────────────────────
export default function PromptSavant() {
  const [page, setPage] = useState("landing");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [activeVar, setActiveVar] = useState("mood");
  const [scrolled, setScrolled] = useState(false);
  const [userTier, setUserTier] = useState(() => {
    return localStorage.getItem("ps_tier") || "free";
  });
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [logoTaps, setLogoTaps] = useState(0);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const tapTimer = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleLogoTap = () => {
    const newCount = logoTaps + 1;
    setLogoTaps(newCount);
    if (tapTimer.current) clearTimeout(tapTimer.current);
    if (newCount >= 5) {
      setLogoTaps(0);
      setShowAdminModal(true);
    } else {
      tapTimer.current = setTimeout(() => setLogoTaps(0), 2000);
    }
  };

  const handleCodeRedeemed = (tier) => {
    setUserTier(tier);
    localStorage.setItem("ps_tier", tier);
    setShowCodeModal(false);
  };

  const handleAdminUnlock = () => {
    setUserTier("codex");
    localStorage.setItem("ps_tier", "codex");
    setShowAdminModal(false);
  };

  const filtered = genres.filter(g =>
    g.genre.toLowerCase().includes(search.toLowerCase()) ||
    g.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <style>{CSS}</style>
      <div className="noise" />
      <div style={{ fontFamily:"'Cormorant Garamond',serif", background:G.black, minHeight:"100vh", color:G.text, position:"relative", zIndex:2 }}>
        {page === "landing" && <Landing go={setPage} scrolled={scrolled} onLogoTap={handleLogoTap} />}
        {page === "library" && <Library go={setPage} search={search} setSearch={setSearch} filtered={filtered} selected={selected} setSelected={setSelected} activeVar={activeVar} setActiveVar={setActiveVar} userTier={userTier} onRedeemCode={() => setShowCodeModal(true)} onLogoTap={handleLogoTap} />}
        {page === "pricing" && <Pricing go={setPage} onRedeemCode={() => setShowCodeModal(true)} onLogoTap={handleLogoTap} />}
        {showCodeModal && <CodeModal onClose={() => setShowCodeModal(false)} onRedeemed={handleCodeRedeemed} />}
        {showAdminModal && <AdminModal onClose={() => setShowAdminModal(false)} onUnlock={handleAdminUnlock} />}
      </div>
    </>
  );
}

// ── ACCESS CODE MODAL ─────────────────────────────────────────
function CodeModal({ onClose, onRedeemed }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRedeem = () => {
    const tier = ACCESS_CODES[code.trim().toUpperCase()];
    if (tier) {
      setSuccess(true);
      setTimeout(() => onRedeemed(tier), 1200);
    } else {
      setError("Invalid code. Please check your email and try again.");
    }
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:999, background:"rgba(0,0,0,.85)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ background:G.dark, border:`1px solid ${G.borderHot}`, padding:"48px 40px", maxWidth:420, width:"100%", position:"relative" }}>
        <button onClick={onClose} style={{ position:"absolute", top:16, right:20, background:"none", border:"none", color:G.muted, cursor:"pointer", fontSize:20, lineHeight:1 }}>×</button>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:"0.5em", color:G.gold, marginBottom:16 }}>REDEEM ACCESS CODE</div>
        <div style={{ fontSize:22, fontWeight:300, fontStyle:"italic", color:"#fff", marginBottom:8 }}>Enter your code</div>
        <div style={{ color:G.muted, fontSize:13, fontStyle:"italic", marginBottom:28, lineHeight:1.6 }}>After purchase you'll receive an access code by email. Enter it below to unlock your tier.</div>
        {success ? (
          <div style={{ fontFamily:"'Space Mono',monospace", color:G.gold, fontSize:12, letterSpacing:"0.2em", textAlign:"center", padding:"20px 0" }}>✦ ACCESS GRANTED ✦</div>
        ) : (
          <>
            <input
              value={code}
              onChange={e => { setCode(e.target.value); setError(""); }}
              placeholder="VAULT-XXXX or CODEX-XXXX"
              style={{ width:"100%", padding:"12px 16px", background:G.panel, border:`1px solid ${G.border}`, color:G.text, fontSize:13, fontFamily:"'Space Mono',monospace", marginBottom:8 }}
            />
            {error && <div style={{ color:"#ff4444", fontSize:11, fontFamily:"'Space Mono',monospace", marginBottom:12, letterSpacing:"0.1em" }}>{error}</div>}
            <button onClick={handleRedeem} className="btn-gold" style={{ width:"100%", padding:"13px", fontSize:10, marginTop:8 }}>
              Redeem Code
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── ADMIN MODAL ───────────────────────────────────────────────
function AdminModal({ onClose, onUnlock }) {
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const ADMIN_PASSWORD = "PromptSavantAdmin2025";

  const handleUnlock = () => {
    if (pass === ADMIN_PASSWORD) {
      setSuccess(true);
      setTimeout(() => onUnlock(), 1000);
    } else {
      setError("Incorrect.");
      setTimeout(() => setError(""), 1500);
    }
  };

  return (
    <div style={{ position:"fixed", inset:0, zIndex:999, background:"rgba(0,0,0,.92)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ background:G.dark, border:`1px solid ${G.borderHot}`, padding:"40px 36px", maxWidth:360, width:"100%", position:"relative" }}>
        <button onClick={onClose} style={{ position:"absolute", top:14, right:18, background:"none", border:"none", color:G.muted, cursor:"pointer", fontSize:20 }}>×</button>
        {success ? (
          <div style={{ fontFamily:"'Space Mono',monospace", color:G.gold, fontSize:12, letterSpacing:"0.2em", textAlign:"center", padding:"20px 0" }}>✦ ADMIN ACCESS GRANTED ✦</div>
        ) : (
          <>
            <input
              value={pass}
              onChange={e => { setPass(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleUnlock()}
              type="password"
              placeholder="Enter password"
              style={{ width:"100%", padding:"12px 16px", background:G.panel, border:`1px solid ${error ? "#ff4444" : G.border}`, color:G.text, fontSize:13, fontFamily:"'Space Mono',monospace", marginBottom:8, outline:"none" }}
              autoFocus
            />
            {error && <div style={{ color:"#ff4444", fontSize:10, fontFamily:"'Space Mono',monospace", marginBottom:8, letterSpacing:"0.1em" }}>{error}</div>}
            <button onClick={handleUnlock} className="btn-gold" style={{ width:"100%", padding:"12px", fontSize:10, marginTop:4 }}>Unlock</button>
          </>
        )}
      </div>
    </div>
  );
}

// ── NAV ──────────────────────────────────────────────────────
function Nav({ go, scrolled, onLogoTap }) {
  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:200,
      padding:"38px 48px",
      background: scrolled ? "#ede5d0" : "#f0e8d5",
      borderBottom: `1px solid #ddd0aa`,
      boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,.35), 0 1px 0 #d4c488" : "0 2px 8px rgba(0,0,0,.2), 0 1px 0 #d4c488",
      transition:"all .4s",
      display:"flex", alignItems:"center", justifyContent:"space-between",
    }}>
      <button onClick={() => { go("landing"); onLogoTap && onLogoTap(); }} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"baseline", gap:6 }}>
        <span style={{ fontFamily:"'Space Mono',monospace", fontWeight:700, fontSize:13, letterSpacing:"0.25em", color:G.gold }}>PROMPT</span>
        <span style={{ fontFamily:"'Space Mono',monospace", fontWeight:400, fontSize:13, letterSpacing:"0.25em", color:"#1a1408" }}>SAVANT</span>
      </button>
      <div style={{ display:"flex", gap:16, alignItems:"center" }}>
        <button onClick={() => go("library")} style={{
          background:"transparent", border:`1px solid ${G.goldDim}`, color:G.goldDim,
          fontFamily:"'Space Mono',monospace", letterSpacing:".15em", textTransform:"uppercase",
          cursor:"pointer", padding:"7px 18px", fontSize:10, transition:"all .2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor=G.gold; e.currentTarget.style.color=G.gold; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor=G.goldDim; e.currentTarget.style.color=G.goldDim; }}
        >Library</button>
        <button onClick={() => go("pricing")} className="btn-gold" style={{ padding:"8px 22px", fontSize:10 }}>Upgrade</button>
      </div>
    </nav>
  );
}

// ── LANDING ───────────────────────────────────────────────────
function Landing({ go, scrolled, onLogoTap }) {
  return (
    <div style={{ background:G.black, minHeight:"100vh" }}>
      <Nav go={go} scrolled={scrolled} onLogoTap={onLogoTap} />

      {/* HERO */}
      <div style={{
        minHeight:"100vh", display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center", textAlign:"center",
        padding:"140px 24px 100px", position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", inset:0, opacity:.035, backgroundImage:`linear-gradient(${G.gold} 1px,transparent 1px),linear-gradient(90deg,${G.gold} 1px,transparent 1px)`, backgroundSize:"72px 72px" }}/>
        <div style={{ position:"absolute", top:"5%", left:"50%", transform:"translateX(-50%)", width:700, height:700, borderRadius:"50%", background:`radial-gradient(circle,${G.gold}0d 0%,transparent 65%)`, pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:"20%", left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${G.border},transparent)` }}/>
        <div style={{ position:"absolute", bottom:"20%", left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${G.border},transparent)` }}/>

        <div style={{ position:"relative", zIndex:2, maxWidth:800 }}>
          <div className="fade-up" style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:"0.5em", color:G.gold, marginBottom:32, opacity:.8 }}>
            THE AI MUSIC PROMPT LIBRARY
          </div>
          <div className="fade-up-1" style={{ lineHeight:1 }}>
            <div style={{ fontSize:"clamp(56px,9vw,108px)", fontWeight:300, color:"#fff", letterSpacing:"-3px", fontStyle:"italic" }}>Prompt</div>
            <div className="glow-gold" style={{ fontSize:"clamp(56px,9vw,108px)", fontWeight:700, color:G.gold, letterSpacing:"-3px", marginTop:"-0.08em" }}>Savant</div>
          </div>
          <p className="fade-up-2" style={{ fontSize:"clamp(15px,2vw,19px)", color:G.muted, maxWidth:540, margin:"32px auto 0", lineHeight:1.8, fontStyle:"italic", fontWeight:300 }}>
            Start free. Go deep when you're ready. 50 genres. Up to 10,050 codex-grade AI music generation prompts — built for maximum output, minimum waste.
          </p>

          <div className="fade-up-3" style={{ display:"flex", gap:0, justifyContent:"center", margin:"56px 0 48px", flexWrap:"wrap" }}>
            {[
              { label:"Prompt Savant", count:"50 Prompts", free:true },
              { label:"Vault", count:"2,050 Prompts", free:false },
              { label:"Codex", count:"10,050 Prompts", free:false },
            ].map((t, i) => (
              <div key={t.label} style={{ padding:"24px 36px", borderLeft:`1px solid ${i===0?"transparent":G.border}`, textAlign:"center" }}>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"clamp(18px,3vw,28px)", fontWeight:700, color: G.creme }}>{t.count}</div>
                <div style={{ fontSize:11, color:G.muted, letterSpacing:"0.3em", marginTop:6, textTransform:"uppercase", fontFamily:"'Space Mono',monospace" }}>{t.label}</div>
                {t.free && <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:G.gold, letterSpacing:"0.3em", marginTop:4 }}>FREE</div>}
              </div>
            ))}
          </div>

          <div className="fade-up-4" style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={() => go("library")} className="btn-gold" style={{ padding:"16px 44px", fontSize:11 }}>Start Free</button>
            <button onClick={() => go("pricing")} className="btn-outline" style={{ padding:"16px 44px", fontSize:11 }}>View Upgrades</button>
          </div>

          <div style={{ marginTop:40, display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
            <div style={{ height:1, width:48, background:G.border }}/>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:G.muted, letterSpacing:"0.3em" }}>
              VP I/O VARIANT PROMPTR PLUG-IN · COMING SOON
            </span>
            <div style={{ height:1, width:48, background:G.border }}/>
          </div>
        </div>
      </div>

      {/* SECTION DIVIDER */}
      <div style={{ height:1, background:`linear-gradient(90deg, transparent, ${G.borderHot}, transparent)`, margin:"0 48px" }} />

      {/* TIER CARDS */}
      <div style={{ padding:"100px 48px", maxWidth:1080, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:"0.5em", color:G.gold, marginBottom:16 }}>THREE TIERS · ONE LIBRARY</div>
          <h2 style={{ fontSize:"clamp(28px,4vw,44px)", fontWeight:300, color:"#fff", fontStyle:"italic" }}>Start Free. Upgrade Anytime.</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:2 }}>
          {tiers.map(tier => <TierCard key={tier.id} tier={tier} go={() => go("pricing")} />)}
        </div>
      </div>

      {/* VP I/O COMING SOON BLOCK */}
      <div style={{ borderTop:`1px solid ${G.border}`, borderBottom:`1px solid ${G.border}`, background:G.panel, padding:"72px 48px" }}>
        <div style={{ maxWidth:760, margin:"0 auto", textAlign:"center" }}>
          <div style={{ display:"inline-block", background:G.orangeDim, border:`1px solid ${G.orange}55`, padding:"5px 18px", fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:"0.5em", color:G.orange, marginBottom:24 }}>
            COMING SOON
          </div>
          <h3 style={{ fontSize:"clamp(24px,4vw,38px)", fontWeight:300, color:"#fff", fontStyle:"italic", marginBottom:20, lineHeight:1.2 }}>
            Plug-In to VP I/O<br/>Variant Promptr
          </h3>
          <p style={{ color:G.muted, fontSize:15, lineHeight:1.8, fontStyle:"italic", marginBottom:36 }}>
            Prompt Savant will plug directly into VP I/O — the full AI music platform — as an integrated module. VP I/O subscribers will get Prompt Savant access built into their tier upgrades. One library. Two entry points.
          </p>
          <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
            {["STANDALONE APP", "VP I/O PLUG-IN", "ONE CODEX"].map(label => (
              <div key={label} style={{ background:G.black, border:`1px solid ${G.border}`, padding:"14px 28px" }}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:G.muted, letterSpacing:"0.3em" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding:"48px", textAlign:"center", borderTop:`1px solid ${G.border}` }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:6, justifyContent:"center", marginBottom:10 }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontWeight:700, fontSize:14, letterSpacing:"0.25em", color:G.gold }}>PROMPT</span>
          <span style={{ fontFamily:"'Space Mono',monospace", fontWeight:400, fontSize:14, letterSpacing:"0.25em", color:"#fff" }}>SAVANT</span>
        </div>
        <div style={{ fontFamily:"'Space Mono',monospace", color:G.muted, fontSize:10, letterSpacing:"0.3em" }}>
          © 2025 · AI MUSIC PROMPT LIBRARY · VP I/O PLUG-IN COMING SOON
        </div>
      </div>
    </div>
  );
}

// ── TIER CARD ─────────────────────────────────────────────────
function TierCard({ tier, go }) {
  const isOrange = tier.accent === G.orange;
  return (
    <div className="tier-card" style={{ background: isOrange ? "#090700" : G.panel, border:`1px solid ${isOrange ? G.orange+"44" : G.gold+"55"}`, padding:"44px 36px", position:"relative" }}>
      {tier.badge && (
        <div style={{ position:"absolute", top:-1, right:24, background:G.orange, color:"#000", fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:"0.4em", padding:"5px 16px", fontWeight:700 }}>{tier.badge}</div>
      )}
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:"0.6em", color:tier.accent, marginBottom:16 }}>{tier.sub}</div>
      <div style={{ fontSize: isOrange ? 22 : 26, fontWeight: isOrange ? 700 : 300, color:"#fff", fontStyle: isOrange ? "normal" : "italic", marginBottom:16, fontFamily: isOrange ? "'Space Mono',monospace" : "'Cormorant Garamond',serif", lineHeight:1.2 }}>
        {tier.name}
      </div>
      <div style={{ color:G.muted, fontSize:13, marginBottom:24, lineHeight:1.7, fontStyle:"italic" }}>{tier.desc}</div>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:44, color:tier.accent, fontWeight:700, marginBottom:4 }}>{tier.price}</div>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:G.muted, letterSpacing:"0.3em", marginBottom:28 }}>{tier.priceSub}</div>
      {tier.features.map(f => (
        <div key={f} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:9 }}>
          <span style={{ color:tier.accent, fontSize:11, marginTop:2 }}>✦</span>
          <span style={{ fontSize:13, color:G.text, fontStyle:"italic", lineHeight:1.5 }}>{f}</span>
        </div>
      ))}
      <button onClick={go} className={isOrange ? "btn-orange" : tier.outline ? "btn-ghost" : "btn-gold"} style={{ marginTop:28, padding:"12px 28px", fontSize:10, width:"100%" }}>
        {tier.cta}
      </button>
    </div>
  );
}

// ── LIBRARY ───────────────────────────────────────────────────
function Library({ go, search, setSearch, filtered, selected, setSelected, activeVar, setActiveVar, userTier, onRedeemCode, onLogoTap }) {
  const accessLevel = userTier === "codex" ? 200 : userTier === "vault" ? 40 : 1;
  const totalVisible = userTier === "codex" ? 10050 : userTier === "vault" ? 2050 : 50;
  const tierLabel = userTier === "codex" ? "CODEX" : userTier === "vault" ? "VAULT" : "FREE";

  return (
    <div style={{ background:G.black, minHeight:"100vh" }}>
      <div style={{ background:G.dark, borderBottom:`1px solid ${G.border}`, padding:"16px 40px", position:"sticky", top:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:24 }}>
          <button onClick={() => { go("landing"); onLogoTap && onLogoTap(); }} style={{ background:"none", border:"none", color:G.muted, cursor:"pointer", fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:"0.2em" }}>← HOME</button>
          <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
            <span style={{ fontFamily:"'Space Mono',monospace", fontWeight:700, fontSize:12, letterSpacing:"0.25em", color:G.gold }}>PROMPT</span>
            <span style={{ fontFamily:"'Space Mono',monospace", fontWeight:400, fontSize:12, letterSpacing:"0.25em", color:"#fff" }}>SAVANT</span>
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:G.muted, marginLeft:8, letterSpacing:"0.2em" }}>/ {tierLabel}</span>
          </div>
        </div>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search genre or style..."
          style={{ padding:"9px 18px", background:G.panel, border:`1px solid ${G.border}`, color:G.text, fontSize:12, fontFamily:"'Space Mono',monospace", outline:"none", width:260 }} />
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={onRedeemCode} className="btn-outline" style={{ padding:"9px 18px", fontSize:10 }}>Redeem Code</button>
          {userTier === "free" && <button onClick={() => go("pricing")} className="btn-gold" style={{ padding:"9px 22px", fontSize:10 }}>Upgrade</button>}
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 40px" }}>
        {userTier === "free" && (
          <div style={{ background:`linear-gradient(135deg,#1a1200,#0d0d0d)`, border:`1px solid ${G.goldDim}`, padding:"20px 28px", marginBottom:32, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
            <div>
              <div style={{ fontFamily:"'Space Mono',monospace", color:G.gold, fontSize:10, letterSpacing:"0.4em", marginBottom:4 }}>PROMPT SAVANT · FREE</div>
              <div style={{ color:G.muted, fontSize:13, fontStyle:"italic" }}>
                You have <strong style={{color:G.text}}>50 prompts</strong> — 1 per genre. Upgrade to Vault (2,050) or Codex (10,050).
              </div>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={() => go("pricing")} className="btn-outline" style={{ padding:"9px 20px", fontSize:10 }}>Vault — $15</button>
              <button onClick={() => go("pricing")} className="btn-gold" style={{ padding:"9px 20px", fontSize:10 }}>Codex — $50</button>
            </div>
          </div>
        )}

        {selected ? (
          <div>
            <button onClick={() => setSelected(null)} className="btn-outline" style={{ padding:"8px 18px", fontSize:10, marginBottom:28 }}>← All Genres</button>
            <div style={{ display:"flex", alignItems:"flex-start", gap:28, marginBottom:44, flexWrap:"wrap" }}>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:80, fontWeight:700, color:G.border, lineHeight:1 }}>
                {String(selected.rank).padStart(2,"0")}
              </div>
              <div>
                <h2 style={{ fontSize:"clamp(24px,4vw,40px)", color:"#fff", fontWeight:300, fontStyle:"italic", marginBottom:8 }}>{selected.genre}</h2>
                <div style={{ fontFamily:"'Space Mono',monospace", color:G.gold, fontSize:11, letterSpacing:"0.3em", marginBottom:16 }}>
                  {selected.bpm} · {accessLevel} OF 200 VARIATIONS ACCESSIBLE
                </div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {selected.tags.map(t => (
                    <span key={t} style={{ background:G.panel, border:`1px solid ${G.border}`, color:G.muted, padding:"3px 12px", fontSize:11, letterSpacing:"0.2em", fontFamily:"'Space Mono',monospace" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display:"flex", gap:2, marginBottom:24, flexWrap:"wrap" }}>
              {varTypes.map(v => (
                <button key={v.id} onClick={() => setActiveVar(v.id)} className="var-tab" style={{
                  background: activeVar===v.id ? G.gold : G.panel,
                  border:`1px solid ${activeVar===v.id ? G.gold : G.border}`,
                  color: activeVar===v.id ? G.black : G.muted,
                  padding:"8px 16px", fontSize:10, letterSpacing:"0.3em",
                  cursor:"pointer", fontFamily:"'Space Mono',monospace", fontWeight:700, textTransform:"uppercase",
                }}>
                  {v.icon} {v.label} ({v.count})
                </button>
              ))}
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
              {Array.from({ length: varTypes.find(v=>v.id===activeVar)?.count || 30 }).map((_,i) => {
                const isLocked = i >= accessLevel;
                const isFreeSlot = i === 0 && freePrompts[selected.id];
                const promptText = isFreeSlot
                  ? freePrompts[selected.id]
                  : `${selected.genre} — ${varTypes.find(v=>v.id===activeVar)?.label} variation ${String(i+1).padStart(3,"0")}. Codex-grade prompt with full production, mix, harmonic, and dynamic arc specifications optimized for maximum AI music generation yield.`;
                return (
                  <div key={i} className="lock-row" style={{ background:G.panel, border:`1px solid ${G.border}`, padding:"16px 20px", display:"flex", alignItems:"center", gap:20 }}>
                    <span style={{ fontFamily:"'Space Mono',monospace", color: isLocked ? G.border : G.goldDim, fontSize:11, minWidth:32 }}>
                      {String(i+1).padStart(3,"0")}
                    </span>
                    <div style={{ flex:1, position:"relative" }}>
                      <div style={{ fontSize:13, color:G.text, lineHeight:1.6, filter:isLocked?"blur(5px)":"none", userSelect:isLocked?"none":"auto", fontStyle:"italic" }}>
                        {promptText}
                      </div>
                      {isLocked && (
                        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <button onClick={() => go("pricing")} className="btn-gold" style={{ padding:"6px 20px", fontSize:10 }}>
                            🔒 {userTier === "free" ? "Upgrade to Vault" : "Upgrade to Codex"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontFamily:"'Space Mono',monospace", color:G.muted, fontSize:10, letterSpacing:"0.3em", marginBottom:20 }}>
              {filtered.length} GENRES · {totalVisible.toLocaleString()} PROMPTS ACCESSIBLE
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
              {filtered.map(g => (
                <div key={g.rank} onClick={() => setSelected(g)} className="genre-row"
                  style={{ background:"#0a0900", border:`1px solid ${G.border}`, padding:"20px 28px", cursor:"pointer", display:"flex", alignItems:"center", gap:28 }}>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:28, fontWeight:700, color:G.border, minWidth:52 }}>
                    {String(g.rank).padStart(2,"0")}
                  </span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:18, fontWeight:300, color:"#fff", fontStyle:"italic", marginBottom:8 }}>{g.genre}</div>
                    <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                      {g.tags.slice(0,4).map(t => (
                        <span key={t} style={{ fontFamily:"'Space Mono',monospace", color:G.muted, fontSize:10, letterSpacing:"0.2em" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontFamily:"'Space Mono',monospace", color:G.gold, fontSize:11, letterSpacing:"0.2em", marginBottom:4 }}>{g.bpm}</div>
                    <div style={{ fontFamily:"'Space Mono',monospace", color:G.muted, fontSize:10, letterSpacing:"0.15em" }}>{accessLevel} / 200 PROMPTS</div>
                  </div>
                  <span style={{ color:G.goldDim, fontSize:22, marginLeft:8 }}>›</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── PRICING ───────────────────────────────────────────────────
function Pricing({ go, onRedeemCode, onLogoTap }) {
  return (
    <div style={{ background:G.black, minHeight:"100vh" }}>
      <div style={{ padding:"28px 48px", background:"#f0e8d5", borderBottom:`1px solid #ddd0aa`, boxShadow:"0 2px 8px rgba(0,0,0,.2), 0 1px 0 #d4c488", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:24 }}>
          <button onClick={() => go("landing")} style={{ background:"none", border:"none", color:G.goldDim, cursor:"pointer", fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:"0.2em" }}>← HOME</button>
          <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
            <span style={{ fontFamily:"'Space Mono',monospace", fontWeight:700, fontSize:13, letterSpacing:"0.25em", color:G.gold }}>PROMPT</span>
            <span style={{ fontFamily:"'Space Mono',monospace", fontWeight:400, fontSize:13, letterSpacing:"0.25em", color:"#1a1408" }}>SAVANT</span>
          </div>
        </div>
        <button onClick={onRedeemCode} style={{ background:G.gold, color:"#060606", border:"none", fontFamily:"'Space Mono',monospace", fontWeight:700, letterSpacing:".15em", textTransform:"uppercase", cursor:"pointer", padding:"7px 18px", fontSize:10, transition:"all .2s" }}>Redeem Code</button>
      </div>

      <div style={{ maxWidth:1040, margin:"0 auto", padding:"80px 40px" }}>
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:"0.5em", color:G.gold, marginBottom:16 }}>THREE TIERS · ONE DECISION</div>
          <h2 style={{ fontSize:"clamp(32px,5vw,52px)", fontWeight:300, color:"#fff", fontStyle:"italic", marginBottom:16 }}>Start Free. Go Deep.</h2>
          <p style={{ color:G.muted, fontSize:15, fontStyle:"italic" }}>Every tier accesses the same codex-grade library — at different depths.</p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:2, marginBottom:48 }}>
          {tiers.map(tier => <TierCard key={tier.id} tier={tier} go={() => go("library")} />)}
        </div>

        {/* Already purchased */}
        <div style={{ border:`1px solid ${G.gold}55`, background:"#0d0b06", padding:"28px 36px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:20, marginBottom:16, boxShadow:`0 2px 0 #1a1408, 0 4px 0 #100d05, 0 6px 12px rgba(0,0,0,.6), inset 0 1px 0 rgba(201,168,76,.08)` }}>
          <div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:"0.5em", color:G.gold, marginBottom:8 }}>ALREADY PURCHASED?</div>
            <div style={{ color:G.text, fontSize:14, fontStyle:"italic" }}>Check your email for your access code and redeem it to unlock your tier instantly.</div>
          </div>
          <button onClick={onRedeemCode} className="btn-gold" style={{ padding:"10px 24px", fontSize:10, whiteSpace:"nowrap" }}>Redeem Code</button>
        </div>

        {/* VP I/O note */}
        <div style={{ border:`1px solid ${G.orange}44`, background:"#090700", padding:"28px 36px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:20, boxShadow:`0 2px 0 #1a1408, 0 4px 0 #100d05, 0 6px 12px rgba(0,0,0,.6)` }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, letterSpacing:"0.5em", color:G.muted }}>VP I/O VARIANT PROMPTR</div>
              <div style={{ background:G.orangeDim, border:`1px solid ${G.orange}44`, padding:"3px 10px", fontFamily:"'Space Mono',monospace", fontSize:8, letterSpacing:"0.3em", color:G.orange }}>COMING SOON</div>
            </div>
            <div style={{ color:G.text, fontSize:14, fontStyle:"italic" }}>Prompt Savant will be included in VP I/O tier upgrades when it launches. Stay tuned.</div>
          </div>
        </div>

        <div style={{ textAlign:"center", marginTop:36, fontFamily:"'Space Mono',monospace", color:G.muted, fontSize:10, letterSpacing:"0.2em" }}>
          Secure checkout · Instant delivery · All major cards accepted
        </div>
      </div>
    </div>
  );
}
