import React from 'react';
import 'App.css';

// import views
import Footer from 'components/Footer.js';
import PokeSearch from 'components/PokeSearch.js';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Snorlax's Body Slammin' PVP IVs</h1>
				<div onLoad={() => console.log('Hello World')}></div>
				<p>
					A tool with UI in mind for Pokemon PVP stats.
				</p>
			</header>
			<body>
                <PokeSearch/>
			</body>
            <Footer/>
		</div>
	);
}

export default App;
