import Footer from "./Components/Shared/footer.jsx";
import Header from "./Components/Shared/Header/header.jsx";  
import Home from "./page/Home/Home";
import Topheader from "./Components/Shared/Header/topHeader.jsx";

const App= () => {
  return (
    <div>
      <Topheader></Topheader>
      <Header></Header>
      <Home/>
      <Footer></Footer>
    </div>
  );
};
export default App;

