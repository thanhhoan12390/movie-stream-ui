import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState, memo } from 'react';

import styles from './CarouselCard.module.scss';
import { MovieInformation } from '~/models';
import MoviePopover from '~/components/MoviePopover';

const cx = classNames.bind(styles);

interface CarouselCardProps {
    movieInfo: MovieInformation;
}

function CarouselCard({ movieInfo }: CarouselCardProps) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [timeOutIdToClear, setTimeOutIdToClear] = useState<NodeJS.Timeout>();

    const handleOpenModal = () => {
        const timeOutId = setTimeout(() => {
            setIsOpenModal(true);
        }, 700);

        setTimeOutIdToClear(timeOutId);
    };

    const handleClearTimeOut = () => {
        clearTimeout(timeOutIdToClear);
    };

    return (
        <div className={cx('wrapper')}>
            <Link to="" className={cx('carousel-img')} onMouseEnter={handleOpenModal} onMouseLeave={handleClearTimeOut}>
                <img src={movieInfo.bgImage} alt={movieInfo.name} />
            </Link>

            {isOpenModal && (
                <MoviePopover movieInfo={movieInfo} onClose={setIsOpenModal}>
                    <span className={cx('virtual-element')}></span>
                </MoviePopover>
            )}
        </div>
    );
}

export default memo(CarouselCard);
