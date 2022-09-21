import { useState } from "react";
import "./Header.scss";

function Header(props: any) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function updateIsMenuOpen(value: any){
    props.onOpeningMenu(value);
  }

    function handleOpeningMenu(){
      updateIsMenuOpen(!isMenuOpen);
    }

  return (
    <>
      <div className="navbar bg-color-dgreen fixed w-full z-[1] top-0">
        <div className="flex flex-row justify-between">
          <img src={"./logo.svg"} alt="" className="w-[50%] ml-[-20px] pt-5" />
          <button
            className="btn btn-square btn-ghost pr-5"
            onClick={() => { handleOpeningMenu() }}
          >
            <img src={isMenuOpen === false ? "./burger.svg" : "./close.svg"} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
