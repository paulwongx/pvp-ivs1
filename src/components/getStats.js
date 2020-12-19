const axios = require('axios');
const gameMaster = require(`./gamemaster.json`);
const fs = require('fs');

const cpm = [ 0.094, 0.1351374318, 0.16639787, 0.192650919, 0.21573247, 0.2365726613, 0.25572005, 0.2735303812, 0.29024988, 0.3060573775, 0.3210876, 0.3354450362, 0.34921268, 0.3624577511, 0.3752356, 0.387592416, 0.39956728, 0.4111935514, 0.4225, 0.4329264091, 0.44310755, 0.4530599591, 0.4627984, 0.472336093, 0.48168495, 0.4908558003, 0.49985844, 0.508701765, 0.51739395, 0.5259425113, 0.5343543, 0.5426357375, 0.5507927, 0.5588305862, 0.5667545, 0.5745691333, 0.5822789, 0.5898879072, 0.5974, 0.6048236651, 0.6121573, 0.6194041216, 0.6265671, 0.6336491432, 0.64065295, 0.6475809666, 0.65443563, 0.6612192524, 0.667934, 0.6745818959, 0.6811649, 0.6876849038, 0.69414365, 0.70054287, 0.7068842, 0.7131691091, 0.7193991, 0.7255756136, 0.7317, 0.7347410093, 0.7377695, 0.7407855938, 0.74378943, 0.7467812109, 0.74976104, 0.7527290867, 0.7556855, 0.7586303683, 0.76156384, 0.7644860647, 0.76739717, 0.7702972656, 0.7731865, 0.7760649616, 0.77893275, 0.7817900548, 0.784637, 0.7874736075, 0.7903, ];

function getPokemon(speciesId) {
    let pokemonStats = gameMaster.data.pokemon.find(x => x.speciesId === speciesId);
    return pokemonStats;

}

function generateTable(pokemon) { // speciesId, atk = 0, def = 0, hp = 0, league = 'great'

    let level = 21; // to be updated

    let greatTable = [],
        ultraTable = [],
        masterTable = [];

    for (let atk=0; atk<=15; atk++) {
        for (let def=0; def<=15; def++) {
            for (let hp=0; hp<=15; hp++) {
                for (let level=cpm.length-1; level >=0; level--) {
                    let stats = {'ivs': {atk, def, hp}, level, ...pokemon.baseStats};
                    let sp = cp(stats);

                    if (sp.cp <= 1500) {
                        greatTable.push({ivs: {atk, def, hp}, "level": level/2+1, ...sp});
                    } else if (sp.cp <= 2500) {
                        ultraTable.push({ivs: {atk, def, hp}, "level": level/2+1, ...sp});
                    } else {
                        masterTable.push({ivs: {atk, def, hp}, "level": level/2+1, ...sp});
                    }
                }

            }
        }
    }

    greatTable.sort((a,b) => (a.sp > b.sp) ? -1 : 1);
    ultraTable.sort((a,b) => (a.sp > b.sp) ? -1 : 1);
    masterTable.sort((a,b) => (a.sp > b.sp) ? -1 : 1);

    // Add percentages for each table
    for (let i=0; i<greatTable.length; i++) {
        greatTable[i]['percentage'] = (Math.round(greatTable[i]['sp'] / greatTable[0]['sp'] * 10000)/100).toFixed(2);
    }

    for (let i=0; i<ultraTable.length; i++) {
        ultraTable[i]['percentage'] = (Math.round(ultraTable[i]['sp'] / ultraTable[0]['sp'] * 10000)/100).toFixed(2);
    }

    for (let i=0; i<masterTable.length; i++) {
        masterTable[i]['percentage'] = (Math.round(masterTable[i]['sp'] / masterTable[0]['sp'] * 10000)/100).toFixed(2);
    }

    greatTable.splice(50,greatTable.length-50);
    fs.writeFileSync('greatTable.json', JSON.stringify(greatTable));
    // fs.writeFileSync('ultraTable.json', JSON.stringify(ultraTable));
    // fs.writeFileSync('masterTable.json', JSON.stringify(masterTable));
	return greatTable;
}


function cp(stats) {
    let {atk, def, hp, level, ivs} = stats;

    // Calculate atk, def, hp stat products
	let attack = (atk + ivs.atk) * cpm[level],
		defense = (def + ivs.def) * cpm[level],
        stamina = (hp + ivs.hp) * cpm[level],
        cp = Math.max(Math.floor(attack * defense**0.5 * stamina**0.5 / 10), 10);

    stamina = Math.floor(stamina);
    let sp = Math.round(attack * defense * stamina)/1000;

    attack = (Math.round(attack*100)/100).toFixed(2);
    defense = (Math.round(defense*100)/100).toFixed(2);

    return { cp, attack, defense, stamina, sp };

}

async function getGameMaster() {
	try {
		let url = 'https://raw.githubusercontent.com/pvpoke/pvpoke/master/src/data/gamemaster.json';
		const gameMaster = await axios.get(url);
        return gameMaster;

	} catch {
		const gameMaster = require(`./gamemaster.json`);
        return gameMaster;

	}
}

// getGameMaster();

let swampert = {
    "dex": 260,
    "speciesName": "Swampert",
    "speciesId": "swampert",
    "baseStats": {
        "atk": 208,
        "def": 175,
        "hp": 225
    },
    "types": ["water", "ground"],
    "fastMoves": ["MUD_SHOT", "WATER_GUN"],
    "chargedMoves": ["EARTHQUAKE", "SLUDGE_WAVE", "SURF", "HYDRO_CANNON", "MUDDY_WATER"],
    "tags": ["starter", "shadoweligible"],
    "defaultIVs": {
        "cp500": [6.5, 5, 9, 9],
        "cp1500": [19, 5, 7, 11],
        "cp2500": [32, 6, 11, 14]
    },
    "level25CP": 1841,
    "eliteMoves": ["HYDRO_CANNON"],
    "searchPriority": 31
};

generateTable(swampert);

// const pokemonList = gameMaster.data.pokemon;

// let searchStr = 'bulb'
// let regex = new RegExp(`^${searchStr}`, 'i');
// let matches = pokemonList.filter(pkmn => regex.test(pkmn.speciesId));

// console.log(matches);

// a = 121.11;
// b = 110.05;
// c = 139;

// num = (Math.round(a*b*c)/1000).toFixed(3);
// console.log(num);

// Removed code


	// Get max cp
	// let rankOne = getBestIvs(speciesId);

    // if (league === 'great') {
    //     rankOne = rankOne.cp1500;
    // } else if (league === 'ultra') {
    //     rankOne = rankOne.cp2500;
    // } else {
    //     rankOne = rankOne.max;
    // }

	// let lvl_rankOne = rankOne[0];
    // let atk_rankOne = rankOne[1];
    // let def_rankOne = rankOne[2];
    // let hp_rankOne = rankOne[3];

    // function getStatProduct(speciesId, level=40, atk = 0, def = 0, hp = 0) {
    //     // prettier-ignore
    //     let pokemon = gameMaster.data.pokemon.find(x => x.speciesId === speciesId);

    //     let atk_base = pokemon.baseStats.atk;
    //     let def_base = pokemon.baseStats.def;
    //     let hp_base = pokemon.baseStats.hp;

    //     let atkProd = (atk_base + atk) * cpm[(level - 1) * 2];
    //     let defProd = (def_base + def) * cpm[(level - 1) * 2];
    //     let hpProd = (hp_base + hp) * cpm[(level - 1) * 2];

    //     let statProd = atkProd * defProd * hpProd;
    //     let cp = Math.max((atkProd * defProd ** 0.5 * hpProd ** 0.5) / 10, 10);

    //     let output = {
    //         'speciesId': speciesId,
    //         'level': level,
    //         'atk': atk,
    //         'def': def,
    //         'hp': hp,
    //         'atkProd': Math.round(atkProd*100)/100,
    //         'defProd': Math.round(defProd*100)/100,
    //         'hpProd': Math.round(hpProd*100)/100,
    //         'statProd': Math.round(statProd*1000)/1000,
    //         'cp': Math.floor(cp)
    //     }

    //     return output;
    // }

    // async function getBestIvs(speciesId, isLevel41 = false) {
    //     if (!isLevel41) {
    //         let pokemon = gameMaster.data.pokemon.find(
    //             x => x.speciesId === speciesId
    //         );
    //         pokemon.defaultIVs.max = [40, 15, 15, 15];
    //         return pokemon.defaultIVs;
    //     } else {
    //         return console.log('Work in progress...');
    //     }
    // }