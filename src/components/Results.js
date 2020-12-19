import React, { useState, useEffect, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Pagination} from 'swiper';

import { PokemonContext } from 'App';
import Table from 'components/Table.js';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

// install Swiper components
SwiperCore.use([Pagination]);

function Results() {
    const [pokemonContext] = useContext(PokemonContext);
    const cpm = [ 0.094, 0.1351374318, 0.16639787, 0.192650919, 0.21573247, 0.2365726613, 0.25572005, 0.2735303812, 0.29024988, 0.3060573775, 0.3210876, 0.3354450362, 0.34921268, 0.3624577511, 0.3752356, 0.387592416, 0.39956728, 0.4111935514, 0.4225, 0.4329264091, 0.44310755, 0.4530599591, 0.4627984, 0.472336093, 0.48168495, 0.4908558003, 0.49985844, 0.508701765, 0.51739395, 0.5259425113, 0.5343543, 0.5426357375, 0.5507927, 0.5588305862, 0.5667545, 0.5745691333, 0.5822789, 0.5898879072, 0.5974, 0.6048236651, 0.6121573, 0.6194041216, 0.6265671, 0.6336491432, 0.64065295, 0.6475809666, 0.65443563, 0.6612192524, 0.667934, 0.6745818959, 0.6811649, 0.6876849038, 0.69414365, 0.70054287, 0.7068842, 0.7131691091, 0.7193991, 0.7255756136, 0.7317, 0.7347410093, 0.7377695, 0.7407855938, 0.74378943, 0.7467812109, 0.74976104, 0.7527290867, 0.7556855, 0.7586303683, 0.76156384, 0.7644860647, 0.76739717, 0.7702972656, 0.7731865, 0.7760649616, 0.77893275, 0.7817900548, 0.784637, 0.7874736075, 0.7903, ];
    const [littleTable, setLittleTable] = useState([]);
    const [greatTable, setGreatTable] = useState([]);
    const [ultraTable, setUltraTable] = useState([]);
    const [masterTable, setMasterTable] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        function generateTable(pokemon) {

            let lt = [],
                gt = [],
                ut = [],
                mt = [];

            for (let atk=0; atk<=15; atk++) {
                for (let def=0; def<=15; def++) {
                    for (let hp=0; hp<=15; hp++) {
                        for (let level=cpm.length-1; level >=0; level--) {
                            let stats = {'ivs': {atk, def, hp}, level, ...pokemon.pokemonData.baseStats};
                            let sp = cp(stats);

                            if (sp.cp <= 500) {
                                lt.push({ivs: {atk, def, hp}, "level": level/2+1, ...sp});
                            }

                            if (sp.cp <= 1500) {
                                gt.push({ivs: {atk, def, hp}, "level": level/2+1, ...sp});
                            } else if (sp.cp <= 2500) {
                                ut.push({ivs: {atk, def, hp}, "level": level/2+1, ...sp});
                            } else {
                                mt.push({ivs: {atk, def, hp}, "level": level/2+1, ...sp});
                            }
                        }

                    }
                }
            }

            lt.sort((a,b) => (a.sp > b.sp) ? -1 : 1);
            gt.sort((a,b) => (a.sp > b.sp) ? -1 : 1);
            ut.sort((a,b) => (a.sp > b.sp) ? -1 : 1);
            mt.sort((a,b) => (a.sp > b.sp) ? -1 : 1);

            // Add percentages for each table
            for (let i=0; i<lt.length; i++) {
                lt[i]['rank'] = i+1;
                lt[i]['percentage'] = (Math.round(lt[i]['sp'] / lt[0]['sp'] * 10000)/100).toFixed(2);
            }

            for (let i=0; i<gt.length; i++) {
                gt[i]['rank'] = i+1;
                gt[i]['percentage'] = (Math.round(gt[i]['sp'] / gt[0]['sp'] * 10000)/100).toFixed(2);
            }

            for (let i=0; i<ut.length; i++) {
                ut[i]['rank'] = i+1;
                ut[i]['percentage'] = (Math.round(ut[i]['sp'] / ut[0]['sp'] * 10000)/100).toFixed(2);
            }

            for (let i=0; i<mt.length; i++) {
                mt[i]['rank'] = i+1;
                mt[i]['percentage'] = (Math.round(mt[i]['sp'] / mt[0]['sp'] * 10000)/100).toFixed(2);
            }

            // Put the searched IVs in position zero
            const query = el => el.ivs.atk===parseInt(pokemonContext.attack) && el.ivs.def===parseInt(pokemonContext.defense) && el.ivs.hp===parseInt(pokemonContext.stamina);

            let ltSel = lt.find(query);
            let gtSel = gt.find(query);
            let utSel = ut.find(query);
            let mtSel = mt.find(query);

            lt.unshift(ltSel);
            gt.unshift(gtSel);
            ut.unshift(utSel);
            mt.unshift(mtSel);

            // Trim the array to make it easier to work with
            lt.splice(26,lt.length-26);
            gt.splice(26,gt.length-26);
            ut.splice(26,gt.length-26);
            mt.splice(26,gt.length-26);

            setLittleTable(lt);
            setGreatTable(gt);
            setUltraTable(ut);
            setMasterTable(mt);

            return {littleTable, greatTable, ultraTable, masterTable};
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

        if (Object.keys(pokemonContext).length !== 0) {
            generateTable(pokemonContext);
        }

    // eslint-disable-next-line
    },[pokemonContext]);


    return (
        <div>
            <h2>Results</h2>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    wrapperTag="ul"
                    loop={true}
                    initialSlide={1}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide tag="li" key={`table-${1}`}>
                        <Table table={littleTable} league="Little"></Table>
                    </SwiperSlide>

                    <SwiperSlide tag="li" key={`table-${2}`}>
                        <Table table={greatTable} league="Great" banner="greatBanner"></Table>
                    </SwiperSlide>

                    <SwiperSlide tag="li" key={`table-${3}`}>
                        <Table table={ultraTable} league="Ultra" banner="ultraBanner"></Table>
                    </SwiperSlide>

                    <SwiperSlide tag="li" key={`table-${4}`}>
                        <Table table={masterTable} league="Master" banner="masterBanner"></Table>
                    </SwiperSlide>

                </Swiper>

            {/* <br/>
            <h3>Great Table [0]</h3>
            <p>{JSON.stringify(greatTable[0])}</p>
            <br/>
            <h3>Pokemon Context</h3>
            <p>{JSON.stringify(pokemonContext)}</p> */}
        </div>
    )
}

export default Results
