import classNames from 'classnames/bind';
import { useAppSelector } from '~/app/hooks';
import { useEffect } from 'react';

import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import View from '~/components/View';
import { viewIdSelector } from '~/pages/Home/homeSlice';

const cx = classNames.bind(styles);

interface DefaultLayoutProps {
    children: JSX.Element;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
    const viewId = useAppSelector(viewIdSelector);

    useEffect(() => {
        if (!!viewId) {
            // hide scrollbar
            document.body.style.overflow = 'hidden';
        } else {
            // unhide scrollbar
            document.body.style.overflow = '';
        }
    }, [viewId]);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
            {!!viewId && <View />}
        </div>
    );
}

export default DefaultLayout;
