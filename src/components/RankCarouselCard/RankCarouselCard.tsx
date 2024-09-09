import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState, memo } from 'react';

import styles from './RankCarouselCard.module.scss';
import { MovieInformation } from '~/models';
import MoviePopover from '~/components/MoviePopover';
import {
    RankIcon1,
    RankIcon2,
    RankIcon3,
    RankIcon4,
    RankIcon5,
    RankIcon6,
    RankIcon7,
    RankIcon8,
    RankIcon9,
    RankIcon10,
} from '~/components/Icons';

const cx = classNames.bind(styles);

const rankMapping = [
    RankIcon1,
    RankIcon2,
    RankIcon3,
    RankIcon4,
    RankIcon5,
    RankIcon6,
    RankIcon7,
    RankIcon8,
    RankIcon9,
    RankIcon10,
];

interface RankCarouselCardProps {
    movieInfo: MovieInformation;
    rank: number;
}

function RankCarouselCard({ movieInfo, rank }: RankCarouselCardProps) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [timeOutIdToClear, setTimeOutIdToClear] = useState<NodeJS.Timeout>();

    const RankIcon = rankMapping[rank % 10];

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
                <RankIcon className={cx('rank-icon')} width="100%" height="100%" />
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

export default memo(RankCarouselCard);
