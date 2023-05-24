import { BrowserRouter } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import   DefaultLayout   from './layout/DefaultLayout';
import RouterPage from './routes/RouterPage';
function App() {
    return (
        <BrowserRouter>
            <DefaultLayout>
                <RouterPage />
            </DefaultLayout>
        </BrowserRouter>
    );
}

export default App;
