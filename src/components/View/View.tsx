import classNames from 'classnames/bind';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { useMemo, useEffect, useState, Fragment } from 'react';
import {
    faCheck,
    faChevronDown,
    faChevronUp,
    faPlay,
    faPlus,
    faVolumeHigh,
    faVolumeXmark,
    faXmark,
    faThumbsUp as solidFaThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import { useNavigate } from 'react-router-dom';

import styles from './View.module.scss';
import { removeViewId } from '~/pages/Home/homeSlice';
import { viewIdSelector } from '~/pages/Home/homeSlice';
import videos from '~/assets/videos';

import { moviesData, moreLikeList } from '~/apiFakeData'; // fake data
import {
    addToLikedList,
    addToMyList,
    deleteFromLikedList,
    deleteFromMyList,
    getLikedList,
    getMyList,
    likedListSelector,
    myListSelector,
} from '~/pages/MyList/myListSlice';

const cx = classNames.bind(styles);

function View() {
    const [isBannerVisible, setIsBannerVisible] = useState(true);
    const [isMutedAudio, setIsMutedAudio] = useState(true);
    const [episodeListMaxHeight, setEpisodeListMaxHeight] = useState(false);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const viewId = useAppSelector(viewIdSelector);
    const myList = useAppSelector(myListSelector);
    const likedList = useAppSelector(likedListSelector);

    const movieInfo = useMemo(() => moviesData.find((movie) => movie.id === viewId), [viewId]);
    const isInMyList = useMemo(() => {
        if (movieInfo) {
            return myList.includes(movieInfo.id);
        } else return false;
    }, [movieInfo, myList]);

    const isInLikedList = useMemo(() => {
        if (movieInfo) {
            return likedList.includes(movieInfo.id);
        } else return false;
    }, [movieInfo, likedList]);

    const episodeList = useMemo(() => {
        if (!!movieInfo?.episodes) {
            const result = [];
            for (let index = 0; index < movieInfo?.episodes; index++) {
                result.push(index + 1);
            }

            return result;
        } else return [];
    }, [movieInfo?.episodes]);

    const handleBannerVideoEnd = () => {
        setIsBannerVisible(true);
    };

    const handleRemoveViewId = () => {
        dispatch(removeViewId());
    };

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setIsBannerVisible(false);
        }, 400);

        return () => {
            clearTimeout(timeOutId);
        };
    }, []);

    useEffect(() => {
        dispatch(getMyList());
        dispatch(getLikedList());
    }, [dispatch]);

    return (
        <div className={cx('wrapper')} onClick={handleRemoveViewId}>
            <div className={cx('container')} onClick={(e) => e.stopPropagation()}>
                <div className={cx('content')}>
                    {/* Background layer */}
                    <div className={cx('background-player')}>
                        <div className={cx('image-video-wrapper')}>
                            {isBannerVisible && (
                                <img src={movieInfo?.bgImage} alt="img" className={cx('background-image')} />
                            )}

                            {!isBannerVisible && (
                                <video
                                    autoPlay
                                    muted={isMutedAudio}
                                    className={cx('background-video')}
                                    onEnded={handleBannerVideoEnd}
                                >
                                    <source src={videos.onePieceTrailer} type="video/mp4" />
                                </video>
                            )}
                        </div>

                        <div className={cx('modal-layer')}>
                            <button className={cx('close-button')} onClick={handleRemoveViewId}>
                                <FontAwesomeIcon icon={faXmark} className={cx('close-icon')} />
                            </button>

                            <button className={cx('info-play-btn')} onClick={() => navigate(`/watch/${movieInfo?.id}`)}>
                                <FontAwesomeIcon icon={faPlay} className={cx('play-btn-icon')} />
                                <span>Play</span>
                            </button>

                            {!isInMyList && (
                                <button
                                    className={cx('plus-button')}
                                    onClick={() => {
                                        if (movieInfo?.id) {
                                            dispatch(addToMyList(movieInfo.id));
                                        }
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPlus} className={cx('plus-icon')} />
                                </button>
                            )}

                            {isInMyList && (
                                <button
                                    className={cx('plus-button')}
                                    onClick={() => {
                                        if (movieInfo?.id) {
                                            dispatch(deleteFromMyList(movieInfo.id));
                                        }
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCheck} className={cx('plus-icon')} />
                                </button>
                            )}

                            {!isInLikedList && (
                                <button
                                    className={cx('like-button')}
                                    onClick={() => {
                                        if (movieInfo?.id) {
                                            dispatch(addToLikedList(movieInfo.id));
                                        }
                                    }}
                                >
                                    <FontAwesomeIcon icon={faThumbsUp} className={cx('like-icon')} />
                                </button>
                            )}

                            {isInLikedList && (
                                <button
                                    className={cx('like-button')}
                                    onClick={() => {
                                        if (movieInfo?.id) {
                                            dispatch(deleteFromLikedList(movieInfo.id));
                                        }
                                    }}
                                >
                                    <FontAwesomeIcon icon={solidFaThumbsUp} className={cx('like-icon')} />
                                </button>
                            )}

                            {!isBannerVisible && !isMutedAudio && (
                                <button
                                    className={cx('volume-btn')}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsMutedAudio(true);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faVolumeHigh} className={cx('volume-icon')} />
                                </button>
                            )}

                            {!isBannerVisible && isMutedAudio && (
                                <button
                                    className={cx('volume-btn')}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsMutedAudio(false);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faVolumeXmark} className={cx('volume-icon')} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Information group */}
                    <div className={cx('info-wrapper')}>
                        {/* Description and cast */}
                        <div className={cx('desc-cast')}>
                            <div className={cx('desc-group')}>
                                <span className={cx('release-year')}>
                                    {movieInfo?.release} <span className={cx('resolution')}>HD</span>
                                </span>

                                <span className={cx('maturity')}>
                                    <span>T16</span>
                                    {movieInfo?.maturity?.map((text, index) => {
                                        if (index + 1 === movieInfo.maturity?.length) {
                                            return <Fragment key={index}>{text}</Fragment>;
                                        } else return <Fragment key={index}>{text}, </Fragment>;
                                    })}
                                </span>

                                <span className={cx('movie-name')}>{movieInfo?.name}</span>

                                <span className={cx('movie-desc')}>{movieInfo?.description}</span>
                            </div>

                            <div className={cx('cast-genres')}>
                                <span className={cx('movie-cast')}>
                                    <span>Cast: </span>
                                    {movieInfo?.cast}
                                </span>

                                <span className={cx('movie-genres')}>
                                    <span>Genres: </span>
                                    {movieInfo?.genres?.map((text, index) => {
                                        if (index + 1 === movieInfo.maturity?.length) {
                                            return <Fragment key={index}>{text}</Fragment>;
                                        } else return <Fragment key={index}>{text}, </Fragment>;
                                    })}
                                </span>
                            </div>
                        </div>

                        {/* Episodes group */}
                        <div className={cx('episodes-group')}>
                            <h2 className={cx('episode-heading')}>Episodes</h2>

                            <div
                                className={cx('episodes-list')}
                                style={episodeListMaxHeight ? { maxHeight: 'unset' } : {}}
                            >
                                {episodeList.map((episodeNum, index) => (
                                    <div
                                        key={index}
                                        className={cx('episode-item')}
                                        onClick={() => navigate(`/watch/${movieInfo?.id}`)}
                                    >
                                        <div className={cx('episode-img')}>
                                            <img src={movieInfo?.bgImage} alt="img" />

                                            <button className={cx('episode-button')}>
                                                <FontAwesomeIcon icon={faPlay} className={cx('episode-icon')} />
                                            </button>
                                        </div>

                                        <div className={cx('episode-desc')}>
                                            <div className={cx('episode-header')}>
                                                <span className={cx('episode-num')}>Episode {episodeNum}</span>
                                                <span>23m</span>
                                            </div>
                                            <span className={cx('desc-text')}>{movieInfo?.description}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {!episodeListMaxHeight && (
                                <button
                                    className={cx('episode-more-button')}
                                    onClick={() => setEpisodeListMaxHeight(true)}
                                >
                                    <FontAwesomeIcon icon={faChevronDown} className={cx('episode-more-icon')} />
                                </button>
                            )}

                            {episodeListMaxHeight && (
                                <button
                                    className={cx('episode-more-button')}
                                    onClick={() => setEpisodeListMaxHeight(false)}
                                >
                                    <FontAwesomeIcon icon={faChevronUp} className={cx('episode-more-icon')} />
                                </button>
                            )}
                        </div>

                        {/* More like this group */}
                        <div className={cx('more-like-this')}>
                            <h3 className={cx('like-this-heading')}>More Like This</h3>

                            <div className="grid">
                                <div className="row">
                                    {moreLikeList.map((movie) => (
                                        <div key={movie.id} className="col l-4 m-6 c-12">
                                            <div className={cx('like-this-item')}>
                                                <div
                                                    className={cx('more-image')}
                                                    onClick={() => navigate(`/watch/${movie.id}`)}
                                                >
                                                    <img src={movie.bgImage} alt="img" />

                                                    <button className={cx('more-play-btn')}>
                                                        <FontAwesomeIcon
                                                            icon={faPlay}
                                                            className={cx('more-play-icon')}
                                                        />
                                                    </button>
                                                </div>

                                                <div
                                                    className={cx('info-group')}
                                                    onClick={() => navigate(`/watch/${movie.id}`)}
                                                >
                                                    <div className={cx('maturity-resolution')}>
                                                        <span className={cx('more-maturity')}>T16</span>
                                                        <span className={cx('more-resolution')}>HD</span>
                                                        <span className={cx('more-release')}>{movie.release}</span>
                                                    </div>
                                                    <span className={cx('more-desc')}>{movie.description}</span>

                                                    {!myList.includes(movie.id) && (
                                                        <Tippy
                                                            offset={[-1, 20]}
                                                            content={
                                                                <span className={cx('more-icon-tooltip')}>
                                                                    Add to My List
                                                                </span>
                                                            }
                                                        >
                                                            <button
                                                                className={cx('more-button-wrapper')}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    dispatch(addToMyList(movie.id));
                                                                }}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={faPlus}
                                                                    className={cx('more-plus-icon')}
                                                                />
                                                            </button>
                                                        </Tippy>
                                                    )}

                                                    {myList.includes(movie.id) && (
                                                        <Tippy
                                                            offset={[-1, 20]}
                                                            content={
                                                                <span className={cx('more-icon-tooltip')}>
                                                                    Remove from My List
                                                                </span>
                                                            }
                                                        >
                                                            <button
                                                                className={cx('more-button-wrapper')}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    dispatch(deleteFromMyList(movie.id));
                                                                }}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={faCheck}
                                                                    className={cx('more-plus-icon')}
                                                                />
                                                            </button>
                                                        </Tippy>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default View;
