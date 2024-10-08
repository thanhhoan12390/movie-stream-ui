import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPlay, faRotateRight, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '~/app/hooks';
import { useNavigate } from 'react-router-dom';

import styles from './Home.module.scss';
import images from '~/assets/images';
import videos from '~/assets/videos';
import Carousel from '~/components/Carousel';
import RankCarousel from '~/components/RankCarousel';
import { setViewId } from './homeSlice';

import { bannerMovieInfo, carouselList, rankCarouselList } from '~/apiFakeData'; // fake Data

const cx = classNames.bind(styles);

function Home() {
    const [isBannerVisible, setIsBannerVisible] = useState(true);
    const [isReplayBtnVisible, setIsReplayBtnVisible] = useState(false);
    const [isMutedAudio, setIsMutedAudio] = useState(true);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const handleBannerVideoEnd = () => {
        setIsBannerVisible(true);
        setIsReplayBtnVisible(true);
    };

    const handleReplayTrailer = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setIsBannerVisible(false);
        setIsReplayBtnVisible(false);
    };

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setIsBannerVisible(false);
        }, 2000);

        return () => {
            clearTimeout(timeOutId);
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {/* Banner video */}
                <div className={cx('banner-group')}>
                    <div className={cx('banner-row')}>
                        <div className={cx('banner-trailer')}>
                            {/* Banner background */}
                            <div className={cx('banner-motion')}>
                                <div className={cx('image-video-wrapper')}>
                                    {/*Banner video */}
                                    {!isBannerVisible && (
                                        <video
                                            autoPlay
                                            muted={isMutedAudio}
                                            className={cx('banner-video')}
                                            onEnded={handleBannerVideoEnd}
                                        >
                                            <source src={videos.onePieceBanner} type="video/mp4" />
                                        </video>
                                    )}
                                    {/* Banner image */}
                                    {isBannerVisible && (
                                        <img src={images.bannerImg} alt="banner img" className={cx('banner-image')} />
                                    )}
                                    <div className={cx('trailer-vignette')}></div>
                                    <div className={cx('hero-vignette')}></div>
                                </div>
                            </div>

                            {/* Banner info */}
                            <div className={cx('fill-content')}>
                                <div className={cx('info-layer')}>
                                    <div className={cx('info-header')}>
                                        <img src={images.netflixN} alt="netflix N" />
                                        <span>F I L M</span>
                                    </div>

                                    <span className={cx('info-name')}>{bannerMovieInfo.name}</span>

                                    <div className={cx('info-desc')}>{bannerMovieInfo.description}</div>

                                    <div className={cx('info-btn-group')}>
                                        <button
                                            className={cx('info-play-btn')}
                                            onClick={() => navigate(`/watch/${bannerMovieInfo.id}`)}
                                        >
                                            <FontAwesomeIcon icon={faPlay} className={cx('play-btn-icon')} />
                                            <span>Play</span>
                                        </button>
                                        <button
                                            className={cx('info-more-btn')}
                                            onClick={() => dispatch(setViewId(bannerMovieInfo.id))}
                                        >
                                            <FontAwesomeIcon icon={faCircleInfo} className={cx('more-btn-icon')} />
                                            <span>More Info</span>
                                        </button>
                                    </div>
                                </div>

                                <div className={cx('button-layer')}>
                                    {isReplayBtnVisible && (
                                        <button className={cx('reload-btn')} onClick={(e) => handleReplayTrailer(e)}>
                                            <FontAwesomeIcon icon={faRotateRight} className={cx('reload-icon')} />
                                        </button>
                                    )}

                                    {!isReplayBtnVisible && !isMutedAudio && (
                                        <button
                                            className={cx('reload-btn')}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsMutedAudio(true);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faVolumeHigh} className={cx('reload-icon')} />
                                        </button>
                                    )}

                                    {!isReplayBtnVisible && isMutedAudio && (
                                        <button
                                            className={cx('reload-btn')}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsMutedAudio(false);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faVolumeXmark} className={cx('reload-icon')} />
                                        </button>
                                    )}
                                    <span className={cx('episode-layer')}>T13</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className={cx('content')}>
                    <Carousel carouselData={carouselList} title={`Today's Top Picks for You`} />
                    <RankCarousel carouselData={rankCarouselList} title={'Top 10 TV Shows Today'} />
                    <Carousel carouselData={carouselList} title={`New on Movie Stream`} />
                    <RankCarousel carouselData={rankCarouselList} title={'Top 10 Movies Today'} />
                    <Carousel carouselData={carouselList} title={`International TV Show`} />
                </div>
            </div>
        </div>
    );
}

export default Home;
