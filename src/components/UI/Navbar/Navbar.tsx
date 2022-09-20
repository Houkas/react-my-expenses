function Navbar() {
  return (
    <>
      <div className="navbar bg-color-dgreen fixed bottom-0 border-t border-lgrey w-screen min-h-[60px]">
        <div className="flex flex-row justify-evenly">
          <div className="flex flex-col items-center pt-1">
            <button className="btn btn-square btn-ghost flex flex-col items-center">
              <img src={"./plus.svg"} />
              <span className="color-green text-xs">Ajouter une dépense</span>
            </button>
          </div>
          <div className="flex flex-col items-center pt-1">
            <button className="btn btn-square btn-ghost flex flex-col items-center">
              <img src={"./sort.svg"} />
              <span className="color-green text-xs">Statistiques</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
