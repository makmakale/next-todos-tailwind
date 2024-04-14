import "@/styles/globals.css";
import 'react-quill/dist/quill.snow.css'
import {Poppins} from "next/font/google";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import {ThemeProvider} from "@/components/Providers/theme-provider"
import SessionProvider from "@/components/Providers/session-provider";
import {getServerSession} from 'next-auth'
import {authOptions} from '@/lib/auth'
import {db} from '@/lib/database/sequelize'
import {Toaster} from "@/components/ui/toaster";

const inter = Poppins({subsets: ["latin"], weight: '400'});

export const metadata = {
  title: "To Do Board",
};

export default async function RootLayout({children, auth}) {
  const session = await getServerSession(authOptions)

  // init db if required
  if (!db.initialized) { await db.initialize() }

  return (
    <html lang="en" suppressHydrationWarning>
    <body className={`${inter.className} min-h-screen flex flex-col`}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider session={session}>
        <Navbar/>

        <div className="flex-grow flex">
          {!!session ?
            <>
              <aside className="hidden md:block border-r border-r-gray-300 dark:border-r-gray-800">
                <Sidebar/>
              </aside>

              <main className="flex-grow overflow-hidden">
                {children}
              </main>
            </>
            :
            <main className="flex-grow">
              {auth}
            </main>
          }
          <Toaster/>
        </div>

        <Footer/>
      </SessionProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}
