import React, { useState } from 'react';
import './Ivs.css';
//const GameMaster = require('../assets/data/gamemaster.json');

function Ivs() {
	const [searchStr, setSearchStr] = useState('');
	//const listOfPokemon = JSON.parse(GameMaster.pokemon);

	function handleChange(e) {
		setSearchStr(e.target.value);
        console.log(searchStr);

	}

	return (
		<div>
			<div className='search-container'>
				<div className='poke-image'></div>
				<h3>Select your Pokemon</h3>
				<input
					className='poke-search'
					onKeyDownCapture={handleChange}
					type='text'
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
					<option value='abomasnow' type-1='grass' type-2='ice'>
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
					</option>
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
