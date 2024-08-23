import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useMemo, useRef, useState, useEffect } from 'react';

import styles from './CarouselCard.module.scss';
import { MovieInformation } from '~/models';
import MoviePopover from '~/components/MoviePopover';

const cx = classNames.bind(styles);

interface CarouselCardProps {
    movieInfo: MovieInformation;
}
function CarouselCard({ movieInfo }: CarouselCardProps) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [elementPos, setElementPos] = useState<DOMRect>();

    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setElementPos(cardRef.current?.getBoundingClientRect());
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const offsetX = useMemo(() => {
        if (!!elementPos) {
            return elementPos.x;
        } else return 0;
    }, [elementPos]);

    const offsetY = useMemo(() => {
        if (!!elementPos) {
            return elementPos.y;
        } else return 0;
    }, [elementPos]);

    return (
        <div ref={cardRef} className={cx('wrapper')}>
            <Link to="" className={cx('carousel-img')} onMouseEnter={() => setIsOpenModal(true)}>
                <img src={movieInfo.bgImage} alt={movieInfo.name} />
            </Link>

            {isOpenModal && (
                <MoviePopover movieInfo={movieInfo} offsetX={offsetX} offsetY={offsetY} onClose={setIsOpenModal} />
            )}
        </div>
    );
}

export default CarouselCard;
