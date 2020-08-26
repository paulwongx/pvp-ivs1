import React from 'react';
import './App.css';

// import views
import Footer from './components/Footer.js';
import Ivs from './components/Ivs.js';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Snorlax's Body Slammin' PVP IVs</h1>
				<div onLoad={() => console.log('Hello World')}></div>
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
			</header>
			<body>
                <Ivs/>
			</body>
            <Footer/>
		</div>
	);
}

export default App;
