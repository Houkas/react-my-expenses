import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { supabase } from "../../services/supabaseClient";
import ExpenseHome from "../Logic/ExpenseHome/ExpenseHome"
import Expenses from "../Logic/Expenses/Expenses"
import Header from "../UI/Header/Header";
import Menu from "../UI/Menu/Menu";
import Navbar from "../UI/Navbar/Navbar";

import { useAuth } from "./Auth"

export function Dashboard() {

  const [isMenuVisivle, setIsMenuVisible] = useState(false);

    // Get current user and signOut function from context
    const { user, signOut } = useAuth()

    const navigate = useNavigate()

    async function handleSignOut() {
      // Ends user session
      await signOut()

      // Redirects the user to Login page
      navigate('/login')
    }

    function handleOnOpeningMenu(isOpened:any){
      if(isOpened){
        setIsMenuVisible((isOpened) => !isOpened);
      }
      console.log(isMenuVisivle);
      debugger;
    }
  
    return (
      <div>
        <Header onOpeningMenu={handleOnOpeningMenu} />
        {isMenuVisivle === true && <Menu />}
        <p>Welcome to dashboard!</p>
        <button onClick={handleSignOut}>Sign out</button>
        <ExpenseHome />
        <Navbar />
      </div>
      
    )
  }