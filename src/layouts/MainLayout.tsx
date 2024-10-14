import Footer from "@/components/Footer/Footer";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <Sidebar />
      <main className="pb-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
