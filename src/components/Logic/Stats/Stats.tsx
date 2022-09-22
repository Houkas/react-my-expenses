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
      <p>im stats</p>
      <Header onOpeningMenu={handleOnOpeningMenu} />
      {isMenuVisivle === true && <Menu />}
      <Stats />
      <Navbar />
    </>
  );
}
export default Stats;
