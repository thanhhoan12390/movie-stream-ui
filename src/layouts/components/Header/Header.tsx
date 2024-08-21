import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './Header.module.scss';
import config from '~/config';
import images from '~/assets/images';
import { useEffect, useState } from 'react';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Header() {
    const [headerBgColorClass, setHeaderBgColorClass] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setHeaderBgColorClass('header-color');
            } else {
                setHeaderBgColorClass('');
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up function
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
                            <Link className={cx('nav-link')} to="">
                                Home
                            </Link>
                        </li>
                        <li className={cx('nav-item')}>
                            <Link className={cx('nav-link')} to="">
                                TV Shows
                            </Link>
                        </li>
                        <li className={cx('nav-item')}>
                            <Link className={cx('nav-link')} to="">
                                Movies
                            </Link>
                        </li>
                        <li className={cx('nav-item')}>
                            <Link className={cx('nav-link')} to="">
                                New & Popular
                            </Link>
                        </li>
                        <li className={cx('nav-item')}>
                            <Link className={cx('nav-link')} to="">
                                My List
                            </Link>
                        </li>
                        <li className={cx('nav-item')}>
                            <Link className={cx('nav-link')} to="">
                                Browse by Languages
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className={cx('avatar-group')}>
                    <FontAwesomeIcon icon={faBell} className={cx('bell-icon')} />

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
