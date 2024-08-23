import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import styles from './CarouselCard.module.scss';
import { MovieInformation } from '~/models';
import MoviePopover from '~/components/MoviePopover';

const cx = classNames.bind(styles);

interface CarouselCardProps {
    movieInfo: MovieInformation;
}
function CarouselCard({ movieInfo }: CarouselCardProps) {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <Link to="" className={cx('carousel-img')} onMouseEnter={() => setIsOpenModal(true)}>
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

export default CarouselCard;
