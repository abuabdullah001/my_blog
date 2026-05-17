import Footer from "./Components/Shared/footer.jsx";
import Header from "./Components/Shared/Header/header.jsx";  
import Home from "./page/Home/Home";
import Topheader from "./Components/Shared/Header/topHeader.jsx";
import BlogDetails from "./page/Home/HomeComponents/BlogDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col">
                <Topheader />
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/blog/:slug" element={<BlogDetails />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
};
export default App;

