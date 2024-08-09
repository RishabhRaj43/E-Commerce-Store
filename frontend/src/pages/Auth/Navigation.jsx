import { useState } from "react";
import "./Navigation.css";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";

const Navigation = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  return <div>navigation</div>;
};

export default Navigation;
