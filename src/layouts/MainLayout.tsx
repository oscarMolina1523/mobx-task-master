import Navbar from "@/components/Navbar";
import { observer } from "mobx-react-lite";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = observer(({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4">
        {children}
      </div>
      <footer className="mt-20 py-6 text-center text-gray-400 text-sm">
        <p>© 2025 TaskMaster. Todos los derechos reservados a Oscar Molina.</p>
      </footer>
    </div>
  );
});

export default MainLayout;
