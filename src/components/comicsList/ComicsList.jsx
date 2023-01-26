import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemsLoading, setNewItemsLoading] = useState(false); //Загружаются ли новые элементы
    const [offset, setOffset] = useState(8); //Отступ
    const [comicsEnded, setCharEnded] = useState(false); //Закончились ли комиксы

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);

        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newcomicsList) => {
        let ended = false;
        if (newcomicsList.length < 8) {
            ended = true;
        }

        setCharEnded(ended);
        setOffset(offset => offset + 8);
        setComicsList(comicsList => [...comicsList, ...newcomicsList]);
        setNewItemsLoading(false);
    }

    const renderItems = (arr) => {
        const items = arr.map((item, i) => {

            return (
                <li 
                    className="comics__item"
                    key={i}
                    >
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}B</div>
                        <div className="comics__item-price">{`${item.price}$`}</div>
                    </Link>
                </li>
            )
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const comics = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemsLoading ? <Spinner/> : null;
    
    return (
        <div className="comics__list">
            {comics}
            {errorMessage}
            {spinner}
            <button 
                onClick={() => onRequest(offset, false)}
                disabled={newItemsLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;