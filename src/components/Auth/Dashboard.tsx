import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
import ExpenseHome from "../Logic/ExpenseHome/ExpenseHome";

import Header from "../UI/Header/Header";
import Menu from "../UI/Menu/Menu";
import Navbar from "../UI/Navbar/Navbar";

import { useAuth } from "./Auth";

export function Dashboard() {
  const [isMenuVisivle, setIsMenuVisible] = useState(false);

  function handleOnOpeningMenu(isOpened: any) {
    if (isOpened) {
      setIsMenuVisible((isOpened) => !isOpened);
    }
  }

  return (
    <div>
      <Header onOpeningMenu={handleOnOpeningMenu} />
      {isMenuVisivle === true && <Menu />}
      <ExpenseHome />
      <Navbar />
    </div>
  );
}
