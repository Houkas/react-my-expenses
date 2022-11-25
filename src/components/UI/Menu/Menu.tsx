import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth/Auth';
import NewCategory from '../../Logic/NewCategory/NewCategory';
import NewSalary from '../../Logic/NewSalary/NewSalary';
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
        <div className={"menu-fadeIn absolute min-h-screen bg-color-dgreen min-w-full py-20 px-5 top-0 z-[1]"}>
            <button onClick={() => handleSignOut()} className="ml-[-15px] flex flex-row items-center">
                <img src={'./sign_out.svg'} />
                Déconnexion
            </button>
            <NewCategory></NewCategory>
            <NewSalary></NewSalary>
        </div>
    );
}
export default Menu;