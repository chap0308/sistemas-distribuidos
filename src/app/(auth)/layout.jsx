import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Autenticacion",
    description: "Proyecto universitario del curso Sistemas Distribuidos",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body data-mode="dark" className={inter.className}>
                <div id="__next">
                    <ToastContainer />
                </div>
                <main className="bg-gray-50 dark:bg-gray-900 md:max-w-5xl md:mx-auto">
                    {children}
                </main>
            </body>
        </html>
    );
}
