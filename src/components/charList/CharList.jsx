import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {

    state = {
        characters: []
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.getCharacters();
    }

    onCharactersLoaded = (characters) => {
        const charactersMap = characters.map(char => {
            const {id, ...charProps} = char;
            return (
                <CharListItem 
                key={id}
                {...charProps}
                />
            );
        });

        this.setState({
            characters: charactersMap
        });
    }

    getCharacters = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharactersLoaded)
    }
    
    render() {

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {this.state.characters}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const CharListItem = (props) => {
    const {name, thumbnail} = props;
    const isImageNotAvailable = thumbnail.includes('image_not_available.jpg');
    return (
        <>
            <li className="char__item">
                <img src={thumbnail} 
                    alt="abyss" 
                    style={isImageNotAvailable ? {objectFit: 'fill'} : {}}
                    />
                <div className="char__name">{name}</div>
            </li>
        </>
    )
}

export default CharList;