import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { BsPerson } from 'react-icons/bs';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import { RiArrowDownSFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import Plflag from '../../asets/pl-flag.png';
import Uaflag from '../../asets/ua-flag.png';

import './Navbar.scss';
import { logout } from '../../Redux/Actions/UserActions';

const Navbar = () => {
  const dispatch =useDispatch()

  const [chuesContry, setChuesContry] = useState(false);
  const [open, setOpen] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHendler = () => {
    dispatch(logout())
  };

  const flag = [Uaflag, Plflag];
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <div className="item-country" onClick={() => setChuesContry(!chuesContry)}>
            <img src={flag[0]} alt="" />
            <IoIosArrowDown />
            <div>
              {chuesContry && (
                <div className="sort_popup">
                  {flag.map((obj, i) => (
                    <Link key={i}>
                      <img src={obj} alt="" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="center">
          <Link className="link" to="/">
            ButyKiosk
          </Link>
        </div>
        <div className="right">
          <div className="nav-item">
            <Link to="/" className="link nav-link">
              Home
            </Link>
            <Link className="link nav-link">About</Link>
            <Link className="link nav-link">Contact</Link>
            <Link to="/All" className="link nav-link">
              Store
            </Link>
          </div>
          <div className="nav-icon">
            <div className="log-person" onClick={() => setOpen(!open)}>
              {userInfo ? (
                <>
                  <span>{userInfo.name}</span>
                  <BsPerson />
                  <RiArrowDownSFill />
                  <div me="sort_popup">
                    {open && (
                      <div className="sort_popup-items">
                        <Link to="/profile" className="links">
                          profile
                        </Link>
                        <Link className="links" onClick={logoutHendler}>
                          logout
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <BsPerson />
                  <RiArrowDownSFill />
                  <div me="sort_popup">
                    {open && (
                      <div className="sort_popup-items">
                        <Link to="/register" className="links">
                          Register
                        </Link>
                        <Link to="/login" className="links">
                          login
                        </Link>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            <Link to={'/cart'}>
              <button type="button" className="shop-icon">
                <HiOutlineShoppingCart />
                <span className="shop-icon-qty">{cartItems.length}</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
