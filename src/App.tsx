import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';

import config from '~/config';
import DefaultLayout from '~/layouts/DefaultLayout';
import RedirectToHome from '~/components/RedirectToHome';
import Home from '~/pages/Home';
import View from '~/pages/View';
import Watch from '~/pages/Watch';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<RedirectToHome />} />

                    {/* Home */}
                    <Route
                        path={config.routes.home}
                        element={
                            <DefaultLayout>
                                <Home />
                            </DefaultLayout>
                        }
                    />

                    {/* View movie description pop up*/}
                    <Route
                        path={config.routes.view}
                        element={
                            <DefaultLayout>
                                <Fragment>
                                    <Home />
                                    <View />
                                </Fragment>
                            </DefaultLayout>
                        }
                    />

                    {/* Watch */}
                    <Route path={config.routes.watch} element={<Watch />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
