import { Navigate, Route, Routes } from "react-router-dom";
import AllElements from "./pages/AllElements";
import store from "./redux/store";
import { Provider } from "react-redux";

export default function App() {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<Navigate to="/elements" />} />
                <Route path="/elements" element={<AllElements />} />
            </Routes>
        </Provider>
    );
}
