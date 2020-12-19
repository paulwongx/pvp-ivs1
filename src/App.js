import React, { useState } from 'react';
import 'App.css';

// import views
import Footer from 'components/Footer.js';
import Search from 'components/Search.js';
import Results from 'components/Results.js';

export const PokemonContext = React.createContext();

function App() {
    const [pokemonContext, setPokemonContext] = useState({});

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Snorlax's Body Slammin' PVP IVs</h1>
				<div onLoad={() => console.log('Hello World')}></div>
				<p>
					A tool with UI in mind for Pokemon PVP stats.
				</p>
			</header>
			<div className='body'>
                <PokemonContext.Provider value={[pokemonContext, setPokemonContext]}>
                    <h1>{PokemonContext.value}</h1>
                    <Search/>
                    <Results />
                </PokemonContext.Provider>
			</div>
            <Footer/>
		</div>
	);
}

export default App;
