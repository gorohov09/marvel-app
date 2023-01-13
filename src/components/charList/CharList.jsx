import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

class CharList extends Component {

    state = {
        characters: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharactersLoaded)
            .catch(this.onErrorLoaded)
    }

    onErrorLoaded = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    onCharactersLoaded = (characters) => {
        const charactersMap = characters.map(char => {
            const {id, ...charProps} = char;
            return (
                <CharListItem 
                key={id}
                {...charProps}
                onCharSelected={() => this.props.onCharSelected(id)}
                />
            );
        });

        this.setState({
            characters: charactersMap,
            loading: false
        });
    }
    
    render() {

        const {characters, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(errorMessage || spinner) ? characters : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                <ul className="char__grid">
                    {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const CharListItem = (props) => {
    const {name, thumbnail, onCharSelected} = props;
    const isImageNotAvailable = thumbnail.includes('image_not_available.jpg');
    return (
        <>
            <li className="char__item"
                onClick={onCharSelected}
                >
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