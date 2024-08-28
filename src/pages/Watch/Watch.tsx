import classNames from 'classnames/bind';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faArrowRotateLeft,
    faArrowRotateRight,
    faCheck,
    faCompress,
    faExpand,
    faLanguage,
    faPause,
    faPlay,
    faVolumeHigh,
    faVolumeLow,
    faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { Link, useParams } from 'react-router-dom';

import styles from './Watch.module.scss';
import videos from '~/assets/videos';
import images from '~/assets/images';
import config from '~/config';

import { moviesData } from '~/apiFakeData'; // fake data

const cx = classNames.bind(styles);

function Watch() {
    const [isHidePreWatchImage, setIsHidePreWatchImage] = useState(false);
    const [isPauseButton, setIsPauseButton] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [currentVolume, setCurrentVolume] = useState(1);
    const [playSpeed, setPlaySpeed] = useState(1);
    const [isSpeedModalOpen, setIsSpeedModalOpen] = useState(false);
    const [isScrubbing, setIsScrubbing] = useState(false);
    const [videoDuration, setVideoDuration] = useState('00:00');
    const [isVolumeBarVisible, setIsVolumeBarVisible] = useState(false);
    const [language, setLanguage] = useState<'Vietnamese' | 'English'>('English');
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
    const [isUserActive, setIsUserActive] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const videoWrapperRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    const { movieId } = useParams();

    const movieInfo = useMemo(() => {
        if (movieId) {
            return moviesData.find((movie) => +movieId === movie.id);
        }
    }, [movieId]);

    const togglePlay = useCallback(() => {
        if (videoRef.current?.paused) {
            setIsPauseButton(true);
            videoRef.current?.play();
        } else {
            setIsPauseButton(false);
            videoRef.current?.pause();
        }
    }, []);

    const toggleFullScreen = () => {
        if (document.fullscreenElement === null) {
            videoWrapperRef.current?.requestFullscreen();
            setIsFullScreen(true);
        } else {
            document.exitFullscreen();
            setIsFullScreen(false);
        }
    };

    const toggleMute = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            if (videoRef.current.volume === 0) {
                setCurrentVolume(1);
                videoRef.current.volume = 1;
            }
        }
    }, []);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentVolume(+e.target.value);
        if (videoRef.current) {
            videoRef.current.volume = +e.target.value;
            videoRef.current.muted = +e.target.value === 0;
        }
    };

    const handleVideoVolumeChange = () => {
        if (videoRef.current) {
            if (videoRef.current.muted || videoRef.current.volume === 0) {
                setCurrentVolume(0);
            } else {
                setCurrentVolume(videoRef.current.volume);
            }
        }
    };

    const handlePlayBackSpeed = (language: number) => {
        setPlaySpeed(language);
        if (videoRef.current) {
            videoRef.current.playbackRate = language;
        }
    };

    const handleTimelineUpdate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (timelineRef.current) {
            const react = timelineRef.current.getBoundingClientRect();
            const percent = Math.min(Math.max(0, e.pageX - react.x), react.width) / react.width;

            if (isScrubbing && videoRef.current) {
                e.preventDefault();
                timelineRef.current.style.setProperty('--progress-position', `${percent}`);
                videoRef.current.currentTime = percent * videoRef.current.duration;
            }
        }
    };

    const handleVideoTimeUpdate = () => {
        if (timelineRef.current && videoRef.current) {
            const percent = videoRef.current.currentTime / videoRef.current.duration;
            timelineRef.current.style.setProperty('--progress-position', `${percent}`);
        }
    };

    const toggleScrubbing = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (timelineRef.current) {
            const react = timelineRef.current.getBoundingClientRect();
            const percent = Math.min(Math.max(0, e.pageX - react.x), react.width) / react.width;

            (e.buttons & 1) === 1 ? setIsScrubbing(true) : setIsScrubbing(false);
            if (isScrubbing) {
                if (videoRef.current?.paused) {
                    videoRef.current.pause();
                }
            } else {
                if (videoRef.current) {
                    videoRef.current.currentTime = percent * videoRef.current.duration;

                    if (!videoRef.current.paused) {
                        videoRef.current.play();
                    }
                }
            }
        }
        handleTimelineUpdate(e);
    };

    const handleForwardBackwardTenSecs = (seconds: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime += seconds;
        }
    };

    const leadingZeroFormatter = useMemo(
        () =>
            new Intl.NumberFormat(undefined, {
                minimumIntegerDigits: 2,
            }),
        [],
    );
    const formatDuration = useCallback(
        (time: number) => {
            const seconds = Math.floor(time % 60);
            const minutes = Math.floor(time / 60) % 60;
            const hours = Math.floor(time / 3600);

            if (hours === 0) return `${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`;
            else return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`;
        },
        [leadingZeroFormatter],
    );

    // eslint-disable-next-line
    const handleUserActive = () => {
        setIsUserActive(true);
    };

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setIsUserActive(false);
            document.body.style.cursor = 'none';
        }, 2000);

        return () => {
            document.body.style.cursor = 'auto';
            clearTimeout(timeOutId);
        };
    }, [handleUserActive]);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (videoRef.current) {
                setVideoDuration(formatDuration(videoRef.current.duration));
            }
        }, 2000);

        return () => {
            clearTimeout(timeOutId);
        };
    }, [formatDuration]);

    useEffect(() => {
        const timeOutId = setTimeout(() => setIsHidePreWatchImage(true), 1000);

        return () => {
            clearTimeout(timeOutId);
        };
    }, []);

    useEffect(() => {
        document.onkeydown = function (e) {
            switch (e.key.toLowerCase()) {
                case 'm':
                    toggleMute();
                    break;
                case ' ':
                case 'k':
                    togglePlay();
                    break;
                case 'f':
                    toggleFullScreen();
                    break;
                case 'arrowright':
                    handleForwardBackwardTenSecs(10);
                    break;
                case 'arrowleft':
                    handleForwardBackwardTenSecs(-10);
                    break;
                default:
                    break;
            }
        };
    }, [togglePlay, toggleMute]);

    return (
        <div className={cx('wrapper')}>
            <div
                ref={videoWrapperRef}
                className={isScrubbing ? cx('movie-wrapper', 'scrubbing') : cx('movie-wrapper')}
                onMouseMove={(e) => {
                    if (isScrubbing) handleTimelineUpdate(e);
                    handleUserActive();
                }}
                onClick={handleUserActive}
                onMouseUp={(e) => {
                    if (isScrubbing) toggleScrubbing(e);
                }}
            >
                {!isHidePreWatchImage && (
                    <div className={cx('pre-watch-image')}>
                        <img src={images.watchMovieImg} alt="img" />
                        <div className={cx('pre-image-layer')}></div>
                    </div>
                )}

                {/* Video */}
                {isHidePreWatchImage && (
                    <video
                        ref={videoRef}
                        muted={currentVolume === 0}
                        className={cx('watch-video')}
                        onVolumeChange={handleVideoVolumeChange}
                        onTimeUpdate={handleVideoTimeUpdate}
                        onEnded={() => setIsPauseButton(false)}
                    >
                        <source src={videos.onePieceBanner} type="video/mp4" />
                    </video>
                )}

                <Link
                    to={config.routes.home}
                    className={isUserActive ? cx('back-button-wrapper') : cx('back-button-wrapper', 'vjs-fade-out')}
                >
                    <FontAwesomeIcon icon={faArrowLeft} className={cx('back-icon')} />
                </Link>

                {isHidePreWatchImage && (
                    <div className={isUserActive ? cx('movie-control') : cx('movie-control', 'vjs-fade-out')}>
                        <h2 className={cx('movie-name')}>{movieInfo?.name} Movie</h2>

                        {/* Timeline control */}
                        <div className={cx('time-control')}>
                            <div
                                ref={timelineRef}
                                className={cx('timeline-container')}
                                onMouseMove={(e) => handleTimelineUpdate(e)}
                                onMouseDown={(e) => toggleScrubbing(e)}
                            >
                                <div className={cx('timeline')}>
                                    <div className={cx('thumb-indicator')}></div>
                                </div>
                            </div>

                            <span className={cx('time-total')}>{videoDuration}</span>
                        </div>

                        {/* Control buttons  */}
                        <div className={cx('control-button-group')}>
                            <div className={cx('left-buttons')}>
                                {!isPauseButton && (
                                    <button className={cx('play-button-wrapper')} onClick={togglePlay}>
                                        <FontAwesomeIcon icon={faPlay} className={cx('play-icon')} />
                                    </button>
                                )}

                                {isPauseButton && (
                                    <button className={cx('pause-button-wrapper')} onClick={togglePlay}>
                                        <FontAwesomeIcon icon={faPause} className={cx('pause-icon')} />
                                    </button>
                                )}

                                <button
                                    className={cx('left-button-wrapper')}
                                    onClick={() => handleForwardBackwardTenSecs(-10)}
                                >
                                    <FontAwesomeIcon icon={faArrowRotateLeft} className={cx('rotate-left-icon')} />
                                    <span className={cx('rotate-left-num')}>10</span>
                                </button>

                                <button
                                    className={cx('right-button-wrapper')}
                                    onClick={() => handleForwardBackwardTenSecs(10)}
                                >
                                    <FontAwesomeIcon icon={faArrowRotateRight} className={cx('rotate-right-icon')} />
                                    <span className={cx('rotate-right-num')}>10</span>
                                </button>

                                {currentVolume >= 0.5 && (
                                    <button
                                        className={cx('volume-button-wrapper')}
                                        onClick={toggleMute}
                                        onMouseLeave={() => setIsVolumeBarVisible(false)}
                                        onMouseEnter={() => setIsVolumeBarVisible(true)}
                                    >
                                        <FontAwesomeIcon icon={faVolumeHigh} className={cx('volume-hight-icon')} />
                                    </button>
                                )}

                                {currentVolume > 0 && currentVolume < 0.5 && (
                                    <button
                                        className={cx('volume-button-wrapper')}
                                        onClick={toggleMute}
                                        onMouseLeave={() => setIsVolumeBarVisible(false)}
                                        onMouseEnter={() => setIsVolumeBarVisible(true)}
                                    >
                                        <FontAwesomeIcon icon={faVolumeLow} className={cx('volume-low-icon')} />
                                    </button>
                                )}

                                {currentVolume === 0 && (
                                    <button
                                        className={cx('no-volume-button-wrapper')}
                                        onClick={toggleMute}
                                        onMouseLeave={() => setIsVolumeBarVisible(false)}
                                        onMouseEnter={() => setIsVolumeBarVisible(true)}
                                    >
                                        <FontAwesomeIcon icon={faVolumeXmark} className={cx('no-volume-icon')} />
                                    </button>
                                )}

                                {isVolumeBarVisible && (
                                    <input
                                        className={cx('volume-slider')}
                                        value={currentVolume}
                                        type="range"
                                        min={0}
                                        max={1}
                                        step="any"
                                        onChange={(e) => handleVolumeChange(e)}
                                        onMouseLeave={() => setIsVolumeBarVisible(false)}
                                        onMouseEnter={() => setIsVolumeBarVisible(true)}
                                    />
                                )}
                            </div>

                            <div className={cx('right-buttons')}>
                                <button
                                    className={cx('button-wrapper')}
                                    onMouseLeave={() => setIsLanguageModalOpen(false)}
                                    onMouseEnter={() => setIsLanguageModalOpen(true)}
                                >
                                    <FontAwesomeIcon icon={faLanguage} className={cx('language-icon')} />
                                </button>

                                <button
                                    className={cx('button-wrapper')}
                                    onMouseEnter={() => setIsSpeedModalOpen(true)}
                                    onMouseLeave={() => setIsSpeedModalOpen(false)}
                                >
                                    <FontAwesomeIcon icon={faClock} className={cx('clock-icon')} />
                                </button>

                                {!isFullScreen && (
                                    <button className={cx('button-wrapper')} onClick={toggleFullScreen}>
                                        <FontAwesomeIcon icon={faExpand} className={cx('expand-icon')} />
                                    </button>
                                )}

                                {isFullScreen && (
                                    <button className={cx('button-wrapper')} onClick={toggleFullScreen}>
                                        <FontAwesomeIcon icon={faCompress} className={cx('compress-icon')} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {isHidePreWatchImage && <div className={cx('video-layer')} onClick={togglePlay}></div>}

                {/* Playback language modal */}
                {isSpeedModalOpen && (
                    <div
                        className={cx('speed-menu')}
                        onMouseLeave={() => setIsSpeedModalOpen(false)}
                        onMouseEnter={() => setIsSpeedModalOpen(true)}
                    >
                        <ul className={cx('speed-list')}>
                            <li className={cx('speed-heading')}>Speed</li>
                            <li
                                className={cx('speed-item')}
                                onClick={() => {
                                    handlePlayBackSpeed(0.5);
                                    setIsSpeedModalOpen(false);
                                }}
                            >
                                0.5
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={cx('check-icon')}
                                    style={playSpeed === 0.5 ? { display: 'block' } : { display: 'none' }}
                                />
                            </li>
                            <li
                                className={cx('speed-item')}
                                onClick={() => {
                                    handlePlayBackSpeed(0.75);
                                    setIsSpeedModalOpen(false);
                                }}
                            >
                                0.75
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={cx('check-icon')}
                                    style={playSpeed === 0.75 ? { display: 'block' } : { display: 'none' }}
                                />
                            </li>
                            <li
                                className={cx('speed-item')}
                                onClick={() => {
                                    handlePlayBackSpeed(1);
                                    setIsSpeedModalOpen(false);
                                }}
                            >
                                Normal
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={cx('check-icon')}
                                    style={playSpeed === 1 ? { display: 'block' } : { display: 'none' }}
                                />
                            </li>
                            <li
                                className={cx('speed-item')}
                                onClick={() => {
                                    handlePlayBackSpeed(1.25);
                                    setIsSpeedModalOpen(false);
                                }}
                            >
                                1.25
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={cx('check-icon')}
                                    style={playSpeed === 1.25 ? { display: 'block' } : { display: 'none' }}
                                />
                            </li>
                            <li
                                className={cx('speed-item')}
                                onClick={() => {
                                    handlePlayBackSpeed(1.5);
                                    setIsSpeedModalOpen(false);
                                }}
                            >
                                1.5
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={cx('check-icon')}
                                    style={playSpeed === 1.5 ? { display: 'block' } : { display: 'none' }}
                                />
                            </li>
                        </ul>
                    </div>
                )}

                {/* Language modal */}
                {isLanguageModalOpen && (
                    <div
                        className={cx('language-menu')}
                        onMouseLeave={() => setIsLanguageModalOpen(false)}
                        onMouseEnter={() => setIsLanguageModalOpen(true)}
                    >
                        <ul className={cx('language-list')}>
                            <li className={cx('language-heading')}>Languages</li>
                            <li
                                className={cx('language-item')}
                                onClick={() => {
                                    setLanguage('English');
                                    setIsLanguageModalOpen(false);
                                }}
                            >
                                English
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={cx('check-icon')}
                                    style={language === 'English' ? { display: 'block' } : { display: 'none' }}
                                />
                            </li>
                            <li
                                className={cx('language-item')}
                                onClick={() => {
                                    setLanguage('Vietnamese');
                                    setIsLanguageModalOpen(false);
                                }}
                            >
                                Vietnamese
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className={cx('check-icon')}
                                    style={language === 'Vietnamese' ? { display: 'block' } : { display: 'none' }}
                                />
                            </li>
                        </ul>
                    </div>
                )}

                {/* Overlay */}
                {isHidePreWatchImage && (
                    <div
                        className={
                            !isPauseButton && !isUserActive
                                ? cx('movie-overlay', 'overlay-visible')
                                : cx('movie-overlay')
                        }
                    >
                        <div className={cx('evidence-overlay')}>
                            <span className={cx('heading')}>You're watching</span>
                            <h2 className={cx('overlay-name')}>{movieInfo?.name}</h2>
                            <h3 className={cx('overlay-info')}>
                                <span>{movieInfo?.release}</span>
                                <span>T16</span>
                            </h3>
                            <p className={cx('overlay-desc')}>{movieInfo?.description}</p>
                            <span className={cx('overlay-paused')}>Paused</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Watch;
