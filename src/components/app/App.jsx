import AppHeader from '../appHeader/AppHeader';
import decoration from '../../resources/img/vision.png';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';

const App = () => {
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar />

                <div className="char__content">
                    <CharList />
                    <CharInfo />
                </div>

                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;