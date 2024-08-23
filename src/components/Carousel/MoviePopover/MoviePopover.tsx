import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './MoviePopover.module.scss';
import { MovieInformation } from '~/models';

const cx = classNames.bind(styles);

interface MoviePopoverProps {
    children: JSX.Element;
    movieInfo: MovieInformation;
}

function MoviePopover({ children, movieInfo }: MoviePopoverProps) {
    return (
        // Fix warning Tippy
        <span>
            <Tippy
                interactive
                offset={[0, -240]}
                delay={[200, 200]}
                render={(attrs) => (
                    <div className={cx('movie-popover')} tabIndex={-1} {...attrs}>
                        <div className={cx('background-player')}>
                            <div className={cx('image-video-wrapper')}>
                                <img src={movieInfo.bgImage} alt="img" className={cx('background-image')} />
                            </div>
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
        </span>
    );
}

export default MoviePopover;
