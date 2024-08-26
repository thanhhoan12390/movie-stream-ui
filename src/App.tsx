import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import config from '~/config';
import DefaultLayout from '~/layouts/DefaultLayout';
import RedirectToHome from '~/components/RedirectToHome';
import Home from '~/pages/Home';
import Watch from '~/pages/Watch';
import MyList from '~/pages/MyList';

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

                    {/* Watch */}
                    <Route path={config.routes.watch} element={<Watch />} />

                    {/* MyList  */}
                    <Route
                        path={config.routes.myList}
                        element={
                            <DefaultLayout>
                                <MyList />
                            </DefaultLayout>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
