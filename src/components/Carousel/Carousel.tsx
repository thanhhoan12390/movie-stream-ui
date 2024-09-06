import classNames from 'classnames/bind';
import { Fragment, useEffect, useMemo, useRef, useState, memo } from 'react';
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
    const sevenChildRef = useRef<HTMLDivElement>(null);
    const rightButtonRef = useRef<HTMLButtonElement>(null);
    const leftButtonRef = useRef<HTMLButtonElement>(null);

    const maxSlide = useMemo(() => Math.ceil(carouselData.length / 6), [carouselData.length]);

    const slideArray = useMemo(() => {
        const result: number[] = [];
        for (let i = 0; i < maxSlide; i++) result.push(i + 1);

        return result;
    }, [maxSlide]);

    const handleLeftBtnClick = () => {
        if (!!carouselRef.current) {
            if (leftButtonRef.current) {
                leftButtonRef.current.disabled = true;
            }

            setTimeout(() => {
                if (leftButtonRef.current) {
                    leftButtonRef.current.disabled = false;
                }
            }, 1200);

            const scrollWidth = sevenChildRef.current ? sevenChildRef.current.offsetLeft - 60 + 3 : 0;

            carouselRef.current.scrollLeft -= scrollWidth; // 1405: offsetWidth của thẻ ul

            setDisableRightBtn('');

            if (carouselRef.current.scrollLeft - scrollWidth <= 0) {
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
            if (rightButtonRef.current) {
                rightButtonRef.current.disabled = true;
            }

            setTimeout(() => {
                if (rightButtonRef.current) {
                    rightButtonRef.current.disabled = false;
                }
            }, 1200);

            const scrollWidth = sevenChildRef.current ? sevenChildRef.current.offsetLeft - 60 + 3 : 0;

            carouselRef.current.scrollLeft += scrollWidth;

            setDisableLeftBtn('');

            // 7262: max scrollLeft
            if (carouselRef.current.scrollLeft + scrollWidth > 7250) {
                setDisableRightBtn('disable-right-btn');
                setCurrSlide((prev) => (prev + 1 > maxSlide ? maxSlide : prev + 1));
            } else {
                setCurrSlide((prev) => prev + 1);
                setDisableRightBtn('');
            }
        }
    };

    useEffect(() => {
        setDisableLeftBtn('disable-left-btn');
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('carousel-title')}>{title}</h2>

            {/* Carousel container */}
            <div ref={carouselRef} className={cx('carousel-container')}>
                <div className={cx('carousel-content')}>
                    {carouselData.map((item, index) => (
                        <Fragment key={item.id}>
                            <div ref={index === 6 ? sevenChildRef : null} className={cx('carousel-item')}>
                                <CarouselCard movieInfo={item} />
                            </div>
                        </Fragment>
                    ))}
                </div>

                <button
                    ref={leftButtonRef}
                    className={cx('carousel-arrow-left', 'carousel-arrow', disableLeftBtn)}
                    onClick={handleLeftBtnClick}
                >
                    <FontAwesomeIcon icon={faChevronLeft} className={cx('carousel-icon')} />
                </button>

                <button
                    ref={rightButtonRef}
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

export default memo(Carousel);
