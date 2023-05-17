// import { } from "redux-to"
import { Header } from './component';
import RouterPage from './routes/RouterPage';
import { useAppSelector } from './redux/hooks';
function App() {
    const { openSearchResults } = useAppSelector((state) => state.action);
    return (
        <div className="flex flex-col max-w-7xl mx-auto">
            <Header />
            <RouterPage />
            {openSearchResults && (
                <div id="overlay" className="fixed w-screen h-screen right-0 top-0 bg-overlay z-[900]"></div>
            )}
        </div>
    );
}

export default App;
