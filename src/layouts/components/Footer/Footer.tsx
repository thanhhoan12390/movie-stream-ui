import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('social-links')}>
                    <a href="/" className={cx('social-item')}>
                        <FontAwesomeIcon icon={faFacebook} className={cx('social-icon')} />
                    </a>
                    <a href="/" className={cx('social-item')}>
                        <FontAwesomeIcon icon={faInstagram} className={cx('social-icon')} />
                    </a>
                    <a href="/" className={cx('social-item')}>
                        <FontAwesomeIcon icon={faTwitter} className={cx('social-icon')} />
                    </a>
                    <a href="/" className={cx('social-item')}>
                        <FontAwesomeIcon icon={faYoutube} className={cx('social-icon')} />
                    </a>
                </div>

                <ul className={cx('footer-links')}>
                    <li className={cx('footer-link-item')}>
                        <span>Audio Description</span>
                    </li>
                    <li className={cx('footer-link-item')}>
                        <span>Help Center</span>
                    </li>
                    <li className={cx('footer-link-item')}>
                        <span>Gift Cards</span>
                    </li>
                    <li className={cx('footer-link-item')}>
                        <span>Media Center</span>
                    </li>
                    <li className={cx('footer-link-item')}>
                        <span>Inventor Relations</span>
                    </li>
                    <li className={cx('footer-link-item')}>
                        <span>Jobs</span>
                    </li>
                    <li className={cx('footer-link-item')}>
                        <span>Term of Use</span>
                    </li>
                    <li className={cx('footer-link-item')}>
                        <span>Privacy</span>
                    </li>
                    <li className={cx('footer-link-item')}>
                        <span>Legal Notices</span>
                    </li>
                    <li className={cx('footer-link-item')}>
                        <span>Cookie Preferences</span>
                    </li>
                    <li className={cx('footer-link-item')}>
                        <span>Corporate Information</span>
                    </li>
                    <li className={cx('footer-link-item')}>
                        <span>Contact Us</span>
                    </li>
                </ul>
                <div className={cx('service-code')}>
                    <span>Service Code</span>
                </div>

                <span className={cx('footer-copyright')}>© 1997-2024 Netflix, Inc.</span>
            </div>
        </div>
    );
}

export default Footer;
