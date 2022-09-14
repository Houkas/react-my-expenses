import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { supabase } from "../../services/supabaseClient";
import ExpenseHome from "../Logic/ExpenseHome/ExpenseHome"
import Expenses from "../Logic/Expenses/Expenses"

import { useAuth } from "./Auth"

export function Dashboard() {

    // Get current user and signOut function from context
    const { user, signOut } = useAuth()

    const navigate = useNavigate()

    async function handleSignOut() {
      // Ends user session
      await signOut()

      // Redirects the user to Login page
      navigate('/login')
    }
  
    return (
      <div>
        <p>Welcome to dashboard!</p>
        <button onClick={handleSignOut}>Sign out</button>
        <ExpenseHome />
      </div>
      
    )
  }