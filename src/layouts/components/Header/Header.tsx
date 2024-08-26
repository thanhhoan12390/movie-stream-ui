import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './Header.module.scss';
import config from '~/config';
import images from '~/assets/images';

import { carouselList } from '~/apiFakeData'; // fake Data

const cx = classNames.bind(styles);

function Header() {
    const [headerBgColorClass, setHeaderBgColorClass] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setHeaderBgColorClass('header-color');
            } else {
                setHeaderBgColorClass('');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={cx('wrapper', headerBgColorClass)}>
            <div className={cx('container')}>
                <div className={cx('logo-nav-group')}>
                    <Link to={config.routes.home} className={cx('logo')} onClick={(e) => {}}>
                        <img src={images.logo} alt="logo img" />
                    </Link>
                    <ul className={cx('nav-group')}>
                        <li className={cx('nav-item')}>
                            <Link to={config.routes.home} className={cx('nav-link')}>
                                Home
                            </Link>
                        </li>
                        <li className={cx('nav-item')}>
                            <Link to={config.routes.myList} className={cx('nav-link')}>
                                My List
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className={cx('avatar-group')}>
                    <div>
                        <Tippy
                            interactive
                            offset={[-170, 28]}
                            delay={[100, 200]}
                            placement="bottom"
                            render={(attrs) => (
                                <div className={cx('notify-menu')} tabIndex={-1} {...attrs}>
                                    <ul className={cx('notify-list')}>
                                        {carouselList.map((item) => (
                                            <li
                                                key={item.id}
                                                className={cx('notify-item')}
                                                onClick={() => navigate(`/watch/${item.id}`)}
                                            >
                                                <Link to="" className={cx('notify-link')}>
                                                    <img src={item.bgImage} alt="img" />
                                                </Link>

                                                <div className={cx('notify-desc')}>
                                                    <span className={cx('desc-title')}>New Arrival</span>
                                                    <span className={cx('desc-name')}>{item.name}</span>
                                                    <span className={cx('desc-day')}>1 week ago</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        >
                            <FontAwesomeIcon icon={faBell} className={cx('bell-icon')} />
                        </Tippy>
                    </div>

                    <Tippy
                        interactive
                        offset={[-74, 21]}
                        delay={[200, 200]}
                        render={(attrs) => (
                            <div className={cx('avatar-dropdown')} tabIndex={-1} {...attrs}>
                                <ul className={cx('dropdown-list')}>
                                    <li className={cx('dropdown-item')}>
                                        <FontAwesomeIcon icon={faPencil} className={cx('dropdown-icon')} />
                                        <span>Manage Profiles</span>
                                    </li>
                                    <li className={cx('dropdown-item')}>
                                        <FontAwesomeIcon icon={faUser} className={cx('dropdown-icon')} />
                                        <span>Account</span>
                                    </li>
                                    <li className={cx('dropdown-item')}>
                                        <FontAwesomeIcon icon={faCircleQuestion} className={cx('dropdown-icon')} />
                                        <span>Help Center</span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    >
                        <div className={cx('avatar')}>
                            <img src={images.defaultAvatar} alt="avatar" />
                            <span className={cx('caret-icon')}></span>
                        </div>
                    </Tippy>
                </div>
            </div>
        </div>
    );
}

export default Header;
