import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faPlay, faPlus, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './MoviePopover.module.scss';
import { MovieInformation } from '~/models';
import videos from '~/assets/videos';

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

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setIsBannerVisible(false);
        }, 600);

        return () => {
            clearTimeout(timeOutId);
        };
    }, []);

    const handleBannerVideoEnd = () => {
        setIsBannerVisible(true);
    };

    return (
        <Tippy
            interactive
            offset={[0, -112]}
            visible
            placement="top"
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
                                    <source src={videos.movieTrailer} type="video/mp4" />
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
                    <div className={cx('movie-info')}>
                        <div className={cx('button-group')}>
                            <button className={cx('button-wrapper')}>
                                <FontAwesomeIcon icon={faPlay} className={cx('play-icon')} />
                            </button>

                            <button className={cx('button-wrapper')}>
                                <FontAwesomeIcon icon={faPlus} className={cx('plus-icon')} />
                            </button>

                            <button className={cx('button-wrapper')}>
                                <FontAwesomeIcon icon={faThumbsUp} className={cx('like-icon')} />
                            </button>

                            <button className={cx('button-wrapper')}>
                                <FontAwesomeIcon icon={faChevronDown} className={cx('down-icon')} />
                            </button>
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
        </Tippy>
    );
}

export default MoviePopover;
