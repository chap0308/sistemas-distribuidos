import "@/app/globals.css";
import AlmacenProvider from "@/context/AlmacenProvider";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Sistemas Distribudios",
    description: "Proyecto universitario del curso Sistemas Distribuidos",
    // themeColor: '#000',
};

const Pagelayout = ({ children }) => {
    return (
        <html lang="es">
            <body data-mode="dark" className={inter.className + " overflow-y-scroll"} >
                <AlmacenProvider>
                <Navbar />
                    <div id="__next">
                        <ToastContainer />
                    </div>
                    
                    <main className="md:max-w-5xl md:mx-auto mx-4">
                        {children}
                    </main>
                </AlmacenProvider>
            </body>
        </html>
    );
};
export default Pagelayout;
