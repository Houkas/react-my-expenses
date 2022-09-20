import { useState } from "react";
import "./Header.scss";

function Header(props: any) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleOpeningMenu(){

        setIsMenuOpen((state) => !state);
        debugger;
        props.onOpeningMenu(isMenuOpen);
    }

  return (
    <>
      <div className="navbar bg-color-dgreen fixed w-full">
        <div className="flex flex-row justify-between">
          <img src={"./logo.svg"} alt="" className="w-[50%] ml-[-20px] pt-5" />
          <button
            className="btn btn-square btn-ghost pr-5"
            onClick={() => { handleOpeningMenu() }}
          >
            <img src={"./burger.svg"} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
