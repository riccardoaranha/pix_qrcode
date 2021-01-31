import Head from 'next/head';
import Header from '../components/Header';
import Static from './static';

const Home = () => {
	return (

<div id="page-home">
	<div className="content">
		<Header / >
		<Static/>
	</div>
</div>
	);
}

export default Home;
