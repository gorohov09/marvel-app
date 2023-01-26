import {useParams, Link} from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams();

    const [comic, setComic] = useState({});

    const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(() => {
        onRequest(comicId);
    }, [comicId]);

    const onRequest = (comicId) => {
        clearError();
        getComics(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorContent = error ? <ErrorMessage /> : null;
    const spinnerContent = loading ? <Spinner /> : null;
    const content = !error && !loading ? <View comic={comic} /> : null;

    return (
        <div className="single-comic">
            <img src={comic.thumbnail} alt={comic.title} className="single-comic__img"/>
            <div className="single-comic__info">
                {content}
                {spinnerContent}
                {errorContent}
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
            
        </div>
    )
}

const View = ({comic}) => {
    const {title, description, price, pageCount, language} = comic;

    return (
        <>
            <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language ? language : '-'}</p>
            <div className="single-comic__price">{price}$</div>
        </>
    )
}

export default SingleComicPage;