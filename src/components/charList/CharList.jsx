import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

class CharList extends Component {

    state = {
        characters: [],
        loading: true,
        error: false,
        newItemsLoading: false,
        offset: 1550,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharactersLoaded)
            .catch(this.onErrorLoaded)
    }

    onCharListLoading = () => {
        this.setState({
            newItemsLoading: true
        })
    }

    onErrorLoaded = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    onCharactersLoaded = (newCharacters) => {
        let ended = false;
        if (newCharacters.length < 9) {
            ended = true;
        }

        const charactersMap = newCharacters.map(char => {
            const {id, ...charProps} = char;
            return (
                <CharListItem 
                key={id}
                {...charProps}
                onCharSelected={() => this.props.onCharSelected(id)}
                />
            );
        });

        this.setState(({characters, offset}) => ({
            characters: [...characters, charactersMap],
            loading: false,
            newItemsLoading: false,
            offset: offset + 9,
            charEnded: ended
        }));
    }
    
    render() {

        const {characters, loading, error, newItemsLoading, offset, charEnded} = this.state;
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
                <button
                    onClick={() => this.onRequest(offset)}
                    disabled={newItemsLoading} 
                    style={{'display': charEnded ? 'none' : 'block'}}
                    className="button button__main button__long"
                    >
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