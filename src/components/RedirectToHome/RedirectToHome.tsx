import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import config from '~/config';

function RedirectToHome() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(config.routes.home);
    });

    return null;
}

export default RedirectToHome;
