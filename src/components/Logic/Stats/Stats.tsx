import { useState } from "react";
import Header from "../../UI/Header/Header";
import Menu from "../../UI/Menu/Menu";
import Navbar from "../../UI/Navbar/Navbar";
import ExpenseHome from "../ExpenseHome/ExpenseHome";

function Stats() {
  const [isMenuVisivle, setIsMenuVisible] = useState(false);

  function handleOnOpeningMenu(isOpened: any) {
    if (isOpened) {
      setIsMenuVisible((isOpened) => !isOpened);
    }
  }

  return (
    <>
      <Header onOpeningMenu={handleOnOpeningMenu} />
      <div className="pt-20 px-5">
        <p>im stats</p>
      </div>
      {isMenuVisivle === true && <Menu />}
      <Navbar />
    </>
  );
}
export default Stats;
