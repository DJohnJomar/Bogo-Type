import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

function Layout({children}){
return (
    <div className="flex flex-col min-h-screen container px-4 sm:px-6 lg:px-8 ">
        <Navbar/>

        <main className="flex-1">
            {children}
        </main>

        <Footer/>
    </div>
)
}

export default Layout;