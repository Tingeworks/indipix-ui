import { ReactPropTypes } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";


interface LayoutProps {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div>
      <Navbar isLoggedIn={props.isLoggedIn} />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
