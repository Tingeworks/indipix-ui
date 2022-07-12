import {
  FaDownload,
  FaFileDownload,
  FaHeart,
  FaSearch,
  FaShoppingCart,
  FaUpload,
  FaUser,
} from "react-icons/fa";
import ButtonWithIcon from "../Form/ButtonWithIcon";

interface navbarProps {
  isLoggedIn: boolean;
}

const Navbar: React.FC<navbarProps> = (props) => {
  return (
    <nav className="container px-5 lg:px-10 xl:px-20 mx-auto flex items-center py-3 justify-between">
      <div className="">
        <img width={25} src="/logo.png" alt="" />
      </div>
      <div className="pl-4">
        <ul className="flex text-xs">
          <li className="pr-6">
            <a href="">Explore</a>
          </li>
          <li className="pr-6">
            <a href="">Advertise</a>
          </li>
          <li className="pr-6">
            <a href="">Blog</a>
          </li>
          <li className="pr-6">
            <a href="">Price</a>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <div className="flex items-center bg-gray-100 py-2 px-2 rounded-sm">
          <FaSearch className="text-gray-400" />
          <input
            placeholder="Search images &amp; gallaries"
            className="focus:outline-none bg-gray-100 pl-2 text-sm flex-1"
            type="text"
          />
        </div>
      </div>
      <div>
        <ul className="flex items-center">
          {props.isLoggedIn ? (
            <>
              <li className="px-2">
                <button className="flex items-center px-4 border border-gray-200 py-2 text-gray-600 rounded-sm">
                  <FaUpload />
                  <span className="pl-2 text-sm">Submit</span>
                </button>
              </li>
              <li className="px-2">
                <button className="text-gray-600">
                  <FaShoppingCart />
                </button>
              </li>
              <li className="px-2">
                <button className="text-gray-600">
                  <FaHeart />
                </button>
              </li>
              <li className="pl-2">
                <button className="text-gray-600">
                  <FaUser />
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button className="text-gray-600 px-2 mx-2">
                  login
                </button>
              </li>

              <li>
                <button className="text-white rounded-sm px-4 py-1 bg-red-700 hover:bg-black">
                  Join
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
