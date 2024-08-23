import classNames from 'classnames/bind';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Carousel.module.scss';
import { MovieInformation } from '~/models';
import CarouselCard from '~/components/CarouselCard';

const cx = classNames.bind(styles);

interface CarouselProps {
    carouselData: Array<MovieInformation>;
    title: string;
}

function Carousel({ carouselData, title }: CarouselProps) {
    const [disableLeftBtn, setDisableLeftBtn] = useState('');
    const [disableRightBtn, setDisableRightBtn] = useState('');
    const [currSlide, setCurrSlide] = useState(1);

    const carouselRef = useRef<HTMLDivElement>(null);

    const maxSlide = useMemo(() => Math.ceil(carouselData.length / 6), [carouselData.length]);

    const slideArray = useMemo(() => {
        const result: number[] = [];

        for (let i = 0; i < maxSlide; i++) result.push(i + 1);

        return result;
    }, [maxSlide]);

    useEffect(() => {
        setDisableLeftBtn('disable-left-btn');
    }, []);

    const handleLeftBtnClick = () => {
        if (!!carouselRef.current) {
            carouselRef.current.scrollLeft -= 1405; // 1405: offsetWidth của thẻ ul

            setDisableRightBtn('');

            if (carouselRef.current.scrollLeft - 1405 <= 0) {
                setDisableLeftBtn('disable-left-btn');
                setCurrSlide((prev) => (prev - 1 <= 1 ? 1 : prev - 1));
            } else {
                setCurrSlide((prev) => prev - 1);
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
                setCurrSlide((prev) => (prev + 1 > maxSlide ? maxSlide : prev + 1));
            } else {
                setCurrSlide((prev) => prev + 1);
                setDisableRightBtn('');
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('carousel-title')}>{title}</h2>

            {/* Carousel container */}
            <div ref={carouselRef} className={cx('carousel-container')}>
                <div className={cx('carousel-content')}>
                    {carouselData.map((item) => (
                        <Fragment key={item.id}>
                            <div className={cx('carousel-item')}>
                                <CarouselCard movieInfo={item} />
                            </div>
                        </Fragment>
                    ))}
                </div>

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

            <ul className={cx('pagination-indicator')}>
                {slideArray.map((slideIndex) => (
                    <li key={slideIndex} className={slideIndex === currSlide ? cx('slide-active') : cx('')}></li>
                ))}
            </ul>
        </div>
    );
}

export default Carousel;
