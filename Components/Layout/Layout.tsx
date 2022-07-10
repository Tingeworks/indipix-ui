import Footer from "./Footer";
import Navbar from "./Navbar";
import SEO from "../Misc/SEO";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SEO title="" description="" keywords=""/>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
