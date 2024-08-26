import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import {
    faCheck,
    faChevronDown,
    faPlay,
    faPlus,
    faVolumeHigh,
    faVolumeXmark,
    faThumbsUp as solidFaThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import TippyHeadless from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { useNavigate } from 'react-router-dom';

import styles from './MoviePopover.module.scss';
import { MovieInformation } from '~/models';
import videos from '~/assets/videos';
import { setViewId } from '~/pages/Home/homeSlice';
import {
    addToMyList,
    getMyList,
    myListSelector,
    deleteFromMyList,
    getLikedList,
    likedListSelector,
    addToLikedList,
    deleteFromLikedList,
} from '~/pages/MyList/myListSlice';

const cx = classNames.bind(styles);

interface MoviePopoverProps {
    movieInfo: MovieInformation;
    children: JSX.Element;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

function MoviePopover({ movieInfo, children, onClose }: MoviePopoverProps) {
    const [zoomIn, setZoomIn] = useState('');
    const [isBannerVisible, setIsBannerVisible] = useState(true);
    const [isMutedAudio, setIsMutedAudio] = useState(true);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const myList = useAppSelector(myListSelector);
    const likedList = useAppSelector(likedListSelector);

    const handleBannerVideoEnd = () => {
        setIsBannerVisible(true);
    };

    const handleViewInfoBtn = () => {
        dispatch(setViewId(movieInfo.id));
    };

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setIsBannerVisible(false);
        }, 600);

        return () => {
            clearTimeout(timeOutId);
        };
    }, []);

    useEffect(() => {
        dispatch(getMyList());
        dispatch(getLikedList());
    }, [dispatch]);

    return (
        <TippyHeadless
            interactive
            offset={[0, -112]}
            visible
            placement="top"
            onClickOutside={() => onClose(false)}
            render={(attrs) => (
                <div
                    {...attrs}
                    tabIndex={-1}
                    className={cx('movie-popover', zoomIn)}
                    onMouseLeave={() => {
                        setZoomIn('zoom-in');
                        setTimeout(() => {
                            onClose(false);
                        }, 150);
                    }}
                >
                    <div className={cx('background-player')}>
                        <div className={cx('image-video-wrapper')}>
                            {isBannerVisible && (
                                <img src={movieInfo.bgImage} alt="img" className={cx('background-image')} />
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

                    <div className={cx('movie-info')} onClick={handleViewInfoBtn}>
                        <div className={cx('button-group')}>
                            <button
                                className={cx('button-wrapper')}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/watch/${movieInfo.id}`);
                                }}
                            >
                                <FontAwesomeIcon icon={faPlay} className={cx('play-icon')} />
                            </button>

                            {!myList.includes(movieInfo.id) && (
                                <Tippy
                                    offset={[-1, 24]}
                                    content={<span className={cx('icon-tooltip')}>Add to My List</span>}
                                >
                                    <button
                                        className={cx('button-wrapper')}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(addToMyList(movieInfo.id));
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPlus} className={cx('plus-icon')} />
                                    </button>
                                </Tippy>
                            )}

                            {myList.includes(movieInfo.id) && (
                                <Tippy
                                    offset={[-1, 24]}
                                    content={<span className={cx('icon-tooltip')}>Remove from My List</span>}
                                >
                                    <button
                                        className={cx('button-wrapper')}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(deleteFromMyList(movieInfo.id));
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faCheck} className={cx('plus-icon')} />
                                    </button>
                                </Tippy>
                            )}

                            {!likedList.includes(movieInfo.id) && (
                                <Tippy
                                    offset={[1, 24]}
                                    content={<span className={cx('icon-tooltip')}>I like this</span>}
                                >
                                    <button
                                        className={cx('button-wrapper')}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(addToLikedList(movieInfo.id));
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faThumbsUp} className={cx('like-icon')} />
                                    </button>
                                </Tippy>
                            )}

                            {likedList.includes(movieInfo.id) && (
                                <Tippy
                                    offset={[1, 24]}
                                    content={<span className={cx('icon-tooltip')}>Unlike this</span>}
                                >
                                    <button
                                        className={cx('button-wrapper')}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(deleteFromLikedList(movieInfo.id));
                                        }}
                                    >
                                        <FontAwesomeIcon icon={solidFaThumbsUp} className={cx('like-icon')} />
                                    </button>
                                </Tippy>
                            )}

                            <Tippy
                                offset={[-1, 24]}
                                content={<span className={cx('icon-tooltip')}>Episodes & Info</span>}
                            >
                                <button className={cx('button-wrapper')} onClick={handleViewInfoBtn}>
                                    <FontAwesomeIcon icon={faChevronDown} className={cx('down-icon')} />
                                </button>
                            </Tippy>
                        </div>

                        <div className={cx('episode-group')}>
                            <span className={cx('age-considered')}>T13</span>
                            {!!movieInfo.episodes && (
                                <span className={cx('episode-num')}>
                                    {movieInfo?.episodes > 1
                                        ? `${movieInfo.episodes} Episodes`
                                        : `${movieInfo.episodes} Episode`}
                                </span>
                            )}
                            <span className={cx('movie-resolution')}>HD</span>
                        </div>

                        <ul className={cx('genres-group')}>
                            {movieInfo.genres.map((genres, index) => (
                                <li key={index} className={cx('genres-item')}>
                                    {genres}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        >
            {children}
        </TippyHeadless>
    );
}

export default MoviePopover;
