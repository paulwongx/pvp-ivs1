import React, { useState, useEffect, useContext } from 'react';
import { PokemonContext } from 'App';
import 'components/Search.css';

// const axios = require('axios');

const gameMaster = require(`./gamemaster.json`);
const pokemonList = gameMaster.data.pokemon;

function Search() {
    const [, setPokemonContext] = useContext(PokemonContext);
    const [searchStr, setSearchStr] = useState('');
    const [matches, setMatches] = useState(pokemonList);

    //const [gameMaster, setGameMaster] = useState(getGameMaster());
    // const [pokemonList, setPokemonList] = useState(gameMaster.data.pokemon);

    useEffect(() => {
        if (searchStr === '') return;
        let regex = new RegExp(`^${searchStr}`, 'i');
        setMatches(pokemonList.filter(pkmn => regex.test(pkmn.speciesId)));
        if (matches.length > 0) {
            document.getElementsByClassName('poke-select')[0].value = matches[0].speciesName;
        };

    // eslint-disable-next-line
    },[searchStr]);

    function handleSubmit() {
        console.log('Submit button clicked');

        let ivs = {};
        ivs.pokemonData = matches[0];
        ivs.attack = document.getElementById('atkStat').value;
        ivs.defense = document.getElementById('defStat').value;
        ivs.stamina = document.getElementById('hpStat').value;
        // ivs.league = document.getElementsByClassName('league-select')[0].value;

        setPokemonContext(ivs);
    }

    // async function getGameMaster() {
    //     try {
    //         let url = 'https://raw.githubusercontent.com/pvpoke/pvpoke/master/src/data/gamemaster.json';
    //         const gameMaster = await axios.get(url);
    //         return gameMaster;

    //     } catch {
    //         const gameMaster = require(`./gamemaster.json`);
    //         return gameMaster;

    //     }
    // }

	return (
		<div>
            <div className='search-container'>
				<div className='poke-image'></div>

				<h3>Select your Pokemon</h3>
				<input
					className='poke-search'
                    onChange={e=>setSearchStr(e.target.value)}
					type='search'
					placeholder='Search name'
					style={{
						fontSize: '1em',
						marginTop: '1em',
						width: '50vw',
						padding: '0.25em',
					}}
				/>
				<select
					className='poke-select'
					style={{
						fontSize: '1em',
						marginTop: '1em',
						width: '50vw',
						padding: '0.25em',
                    }}
                    defaultValue={"default"}
				>
					<option disabled value="default" key={0}>
						Select a Pokemon
					</option>
                    {matches.map(pokemon => {
                        return (<option value={pokemon.speciesName}  key={pokemon.speciesId}>
                                    {pokemon.speciesName}
                                </option>);
                    })}
				</select>
                <div
					style={{
						display: 'flex',
						flexDirection: 'row',
						padding: '1em',
						width: '50vw',
						justifyContent: 'center',
					}}
				>
                    <label htmlFor="atkStat">Attack</label>
                    <input type="number" id="atkStat" min="0" max="15" defaultValue="15"></input>
                    <label htmlFor="defStat">Defense</label>
                    <input type="number" id="defStat" min="0" max="15" defaultValue="15"></input>
                    <label htmlFor="hpStat">Stamina</label>
                    <input type="number" id="hpStat" min="0" max="15" defaultValue="15"></input>
                </div>
                <div
					style={{
						display: 'flex',
						flexDirection: 'row',
						padding: '1em',
						width: '50vw',
						justifyContent: 'center',
					}}
				>
                    {/* <select
                        className='league-select'
                        style={{
                            fontSize: '1em',
                            marginTop: '1em',
                            width: '50vw',
                            padding: '0.25em',
                        }}
                        defaultValue="great"
                    >
                        <option value="little">Little League</option>
                        <option value="great">Great League</option>
                        <option value="ultra">Ultra League</option>
                        <option value="master">Master League</option>
                    </select> */}
                </div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						padding: '1em',
						width: '50vw',
						justifyContent: 'center',
					}}
				>
					{/* <a href='/#' onClick={e => e.preventDefault()}>
						<img src={require('images/great_league.png')} width='175em' alt='Great League' />
					</a>
					<a href='/#' onClick={e => e.preventDefault()}>
						<img src={require('images/ultra_league.png')} width='175em' alt='Ultra League' />
					</a>
					<a href='/#' onClick={e => e.preventDefault()}>
						<img src={require('images/master_league.png')} width='175em' alt='Master League' />
					</a> */}
				</div>
                <button className='submit' onClick={handleSubmit}>Submit</button>
			</div>
		</div>
	);
}

export default Search;




// OLD UNUSED CODE
    // const pokemonList = [
    //     {speciesId:'Abomasnow', value:'abomasnow', type1:'grass', type2:'ice'},
    //     {speciesId:'Abomasnow (Shadow)', value:'abomasnow_shadow', type1:'grass', type2:'ice'},
    //     {speciesId:'Abra', value:'abra', type1:'psychic', type2:'none'},
    //     {speciesId:'Abra (Shadow)', value:'abra_shadow', type1:'grass', type2:'ice'}
    // ];

    //     <option value='abomasnow' type-1='grass' type-2='ice'>
    //     Abomasnow
    // </option>
    // <option value='abomasnow_shadow' type-1='grass' type-2='ice'>
    //     Abomasnow (Shadow)
    // </option>
    // <option value='abra' type-1='psychic' type-2='none'>
    //     Abra
    // </option>
    // <option value='abra_shadow' type-1='psychic' type-2='none'>
    //     Abra (Shadow)
    // </option>