import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Carousel.module.scss';
import { MovieInformation } from '~/models';

const cx = classNames.bind(styles);

interface CarouselProps {
    carouselData: Array<MovieInformation>;
    title: string;
}

function Carousel({ carouselData, title }: CarouselProps) {
    const [disableLeftBtn, setDisableLeftBtn] = useState('');
    const [disableRightBtn, setDisableRightBtn] = useState('');

    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setDisableLeftBtn('disable-left-btn');
    }, []);

    const handleLeftBtnClick = () => {
        if (!!carouselRef.current) {
            carouselRef.current.scrollLeft -= 1405; // 1405: offsetWidth của thẻ ul

            setDisableRightBtn('');

            if (carouselRef.current.scrollLeft - 1405 <= 0) {
                setDisableLeftBtn('disable-left-btn');
            } else {
                setDisableLeftBtn('');
            }
        }
    };

    const handleRightBtnClick = () => {
        if (!!carouselRef.current) {
            carouselRef.current.scrollLeft += 1405;

            setDisableLeftBtn('');

            // 7262: max scrollLeft
            if (carouselRef.current.scrollLeft + 1405 > 7250) {
                setDisableRightBtn('disable-right-btn');
            } else {
                setDisableRightBtn('');
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('carousel-title')}>{title}</h2>

            {/* Carousel container */}
            <div ref={carouselRef} className={cx('carousel-container')}>
                <ul className={cx('carousel-content')}>
                    {carouselData.map((item) => (
                        <li key={item.id} className={cx('carousel-item')}>
                            <Link to="" className={cx('carousel-img')}>
                                <img src={item.bgImage} alt={item.name} />
                            </Link>
                        </li>
                    ))}
                </ul>

                <button
                    className={cx('carousel-arrow-left', 'carousel-arrow', disableLeftBtn)}
                    onClick={handleLeftBtnClick}
                >
                    <FontAwesomeIcon icon={faChevronLeft} className={cx('carousel-icon')} />
                </button>

                <button
                    className={cx('carousel-arrow-right', 'carousel-arrow', disableRightBtn)}
                    onClick={handleRightBtnClick}
                >
                    <FontAwesomeIcon icon={faChevronRight} className={cx('carousel-icon')} />
                </button>
            </div>
        </div>
    );
}

export default Carousel;
