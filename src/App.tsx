import { Navigate, Route, Routes } from "react-router-dom";
import AllElements from "./pages/AllElementsPage";
import store from "./redux/store";
import { Provider } from "react-redux";
import SingleElementDetailsPage from "./pages/SingleElementDetailsPage";

export default function App() {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<Navigate to="/elements" />} />
                <Route path="/elements" element={<AllElements />} />
                <Route
                    path="/elements/:id"
                    element={<SingleElementDetailsPage />}
                />
            </Routes>
        </Provider>
    );
}
