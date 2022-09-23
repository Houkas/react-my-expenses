import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth/Auth';
import './Menu.scss';

function Menu(props:any){

    // Get current user and signOut function from context
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    async function handleSignOut() {
        // Ends user session
        await signOut();
    
        // Redirects the user to Login page
        navigate("/login");
      }
    
    return(
        <div className={"menu-fadeIn absolute min-h-screen bg-color-dgreen min-w-full py-20 px-5 top-0"}>
            <button onClick={() => handleSignOut()}>Sign out</button>
        </div>
    );
}
export default Menu;