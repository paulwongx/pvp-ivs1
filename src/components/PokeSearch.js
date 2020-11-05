import React, { useState, useEffect } from 'react';
import 'components/PokeSearch.css';

const gameMaster = require(`./gamemaster.json`);
const pokemonList = gameMaster.data.pokemon;

function PokeSearch() {
	const [searchStr, setSearchStr] = useState('');
    const [matches, setMatches] = useState(pokemonList);

    useEffect(() => {
        console.log(searchStr);
        if (searchStr === '') return;
        let regex = new RegExp(`^${searchStr}`, 'i');
        setMatches(pokemonList.filter(pkmn => regex.test(pkmn.speciesId)));
        console.log(matches);
        if (matches.length > 0) {
            document.getElementsByClassName('poke-select')[0].value = matches[0].value;
        };

    },[searchStr]);

	return (
		<div>
			<div className='search-container'>
				<div className='poke-image'></div>
				<div className='test1'>{searchStr.length}</div>

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
				>
					<option disabled selected value>
						Select a Pokemon
					</option>
                    {matches.map(pokemon => {
                        return (<option value={pokemon.speciesName}>
                                    {pokemon.speciesName}
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
							src={require('images/great_league.png')}
							width='175em'
							alt='Great League'
						/>
					</a>
					<a href='#' onClick={e => e.preventDefault()}>
						<img
							src={require('images/ultra_league.png')}
							width='175em'
							alt='Ultra League'
						/>
					</a>
					<a href='#' onClick={e => e.preventDefault()}>
						<img
							src={require('images/master_league.png')}
							width='175em'
							alt='Master League'
						/>
					</a>
				</div>
			</div>
            <div class='table'></div>
		</div>
	);
}

export default PokeSearch;




// OLD UNUSED CODE
    // const pokemonList = [
    //     {speciesId:'Abomasnow', value:'abomasnow', type1:'grass', type2:'ice'},
    //     {speciesId:'Abomasnow (Shadow)', value:'abomasnow_shadow', type1:'grass', type2:'ice'},
    //     {speciesId:'Abra', value:'abra', type1:'psychic', type2:'none'},
    //     {speciesId:'Abra (Shadow)', value:'abra_shadow', type1:'grass', type2:'ice'}
    // ];