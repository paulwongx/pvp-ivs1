import React, { useState, useEffect } from 'react';
import './Ivs.css';
//const GameMaster = require('../assets/data/gamemaster.json');

function Ivs() {
	const [searchStr, setSearchStr] = useState('');
	//const pokemonList = JSON.parse(GameMaster.pokemon);

    const pokemonList = [
        {name:'Abomasnow', value:'abomasnow', type1:'grass', type2:'ice'},
        {name:'Abomasnow (Shadow)', value:'abomasnow_shadow', type1:'grass', type2:'ice'},
        {name:'Abra', value:'abra', type1:'psychic', type2:'none'},
        {name:'Abra (Shadow)', value:'abra_shadow', type1:'grass', type2:'ice'}
    ];

    useEffect(() => {
        console.log(searchStr);
        if (searchStr === '') return;
        let regex = new RegExp(`^${searchStr}`, 'i');
        let matches = pokemonList.filter(pkmn => regex.test(pkmn.name));
        console.log(matches);
        document.getElementsByClassName('poke-select')[0].value = matches[0].value;
    },[searchStr]);

	return (
		<div>
			<div className='search-container'>
				<div className='poke-image'></div>
				<h3>Select your Pokemon</h3>
                <h2 className='test'></h2>
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
				>
					<option disabled selected value>
						Select a Pokemon
					</option>
                    {pokemonList.map(pokemon => {
                        return (<option value={pokemon.value} type-1={pokemon.type1} type-2={pokemon.type2}>
                                    {pokemon.name}
                                </option>);
                    })}
					{/* <option value='abomasnow' type-1='grass' type-2='ice'>
						Abomasnow
					</option>
					<option value='abomasnow_shadow' type-1='grass' type-2='ice'>
						Abomasnow (Shadow)
					</option>
					<option value='abra' type-1='psychic' type-2='none'>
						Abra
					</option>
					<option value='abra_shadow' type-1='psychic' type-2='none'>
						Abra (Shadow)
					</option> */}
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
					<a href='#' onClick={e => e.preventDefault()}>
						<img
							src={require('../assets/img/combat_league_default_great.png')}
							width='175em'
							alt='Great League'
						/>
					</a>
					<a href='#' onClick={e => e.preventDefault()}>
						<img
							src={require('../assets/img/combat_league_default_ultra.png')}
							width='175em'
							alt='Ultra League'
						/>
					</a>
					<a href='#' onClick={e => e.preventDefault()}>
						<img
							src={require('../assets/img/combat_league_default_master.png')}
							width='175em'
							alt='Master League'
						/>
					</a>
				</div>
			</div>
		</div>
	);
}

export default Ivs;
