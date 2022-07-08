import Footer from "./Footer";
import Navbar from "./Navbar";
import { SEO } from "./SEO";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
