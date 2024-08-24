import classNames from 'classnames/bind';

import styles from './View.module.scss';

const cx = classNames.bind(styles);

function View() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}></div>
            </div>
        </div>
    );
}

export default View;
