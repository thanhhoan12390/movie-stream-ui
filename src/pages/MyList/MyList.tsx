import classNames from 'classnames/bind';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '~/app/hooks';

import styles from './MyList.module.scss';
import CarouselCard from '~/components/CarouselCard';
import { getMyList, myListSelector } from './myListSlice';

import { moviesData } from '~/apiFakeData'; // fake data

const cx = classNames.bind(styles);

function MyList() {
    const dispatch = useAppDispatch();

    const myListIds = useAppSelector(myListSelector);

    const myList = useMemo(
        () =>
            myListIds.map((id) => {
                const movie = moviesData.filter((item) => item.id === id);

                return movie[0];
            }),

        [myListIds],
    );

    useEffect(() => {
        dispatch(getMyList());
    }, [dispatch]);

    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('header')}>
                        <h2 className={cx('heading')}>My List</h2>
                    </div>

                    <div className={cx('my-list')}>
                        <div className="grid">
                            <div className="row sm-gutter">
                                {myList.map((item) => (
                                    <div key={item.id} className="col l-2 m-4 c-6">
                                        <div className={cx('list-item')}>
                                            <CarouselCard movieInfo={item} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyList;
