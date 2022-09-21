import './Menu.scss';

function Menu(props:any){

    function handleSignOut(){
        props.onSignOut()
    }
    
    return(
        <div className={"menu-fadeIn absolute min-h-screen bg-color-dgreen min-w-full py-20 px-5"}>
            <button onClick={() => handleSignOut()}>Sign out</button>
        </div>
    );
}
export default Menu;