import Header from "./Header";
import MainPage from "./MainPage";
import Footer from "./Footer";

export default function ProtectedHome({ ...props }) {
    return (
        <>
            <Header />
            <MainPage {...props} />
            <Footer />
        </>
    )
}