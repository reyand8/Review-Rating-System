import {Route, Routes} from 'react-router-dom';

import {ROUTES} from '../utils/routes';
import NotFound from '../components/Status/NotFound';
import Profile from '../components/Profile/Profile';
import Home from '../components/Home/Home';


const AppRoutes = () => (
    <Routes>
        <Route index element={<Home />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;