import { Link } from 'react-router-dom';
import logo from '../src/assets/logo_white.svg';

const Footer = () => {
  return (
    <div className="w-full border-t border-orange-900/10 bg-primary flex flex-col p-10 md:p-20 gap-10 md:px-[130px]">
      <div className="flex flex-col gap-10 justify-center items-center">
        <Link
          to="/"
          className="text-[20px] md:text-[30px] md:font-bold font-medium text-[#333333]"
        >
          <img src={logo} alt="" />
        </Link>

        <h3 className="text-white font-medium text-[22px] leading-[35.2px]">
          Experience a reliable and secure platform for all your digital needs
        </h3>
        <div className="flex flex-wrap items-center md:items-end justify-center gap-10">
          <Link
            to="/"
            className="text-[14px] leading-[24px] font-medium text-white cursor-pointer"
          >
            Home
          </Link>
          {/* <Link
            to="/about-us"
            className="text-[14px] leading-[24px] font-medium text-white cursor-pointer"
          >
            About
          </Link> */}
          <Link
            to="/#products"
            className="text-[14px] leading-[24px] font-medium text-white cursor-pointer"
          >
            Products
          </Link>
          <Link
            to="/contact-us"
            className="text-[14px] leading-[24px] font-medium text-white cursor-pointer"
          >
            Contact
          </Link>
          <Link
            to="/"
            className="text-[14px] leading-[24px] font-medium text-white cursor-pointer"
          >
            Terms & Privacy
          </Link>
        </div>
        <p className="text-[12px] leading-[24px] text-center text-orange-100/50">
          &copy; Ovanix Limited. All Rights Reserved
        </p>

        {/* <Link to="/donation" className="text-white text-xl flex gap-[20px]">
        Donate to help build our hub <img src={donate} className="w-32"></img>
      </Link> */}
      </div>
    </div>
  );
};

export default Footer;
