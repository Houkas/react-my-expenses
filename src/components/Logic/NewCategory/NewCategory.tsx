import { useEffect, useState } from "react";
import {
  addExpenseCategory,
  deleteCategory,
  fetchCategories,
} from "../../../services/expenseService";
import { ExpenseCategory } from "../../../types/ExpenseCategory";
import { useAuth } from "../../Auth/Auth";

function NewCategory() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<ExpenseCategory[] | undefined>(
    undefined
  );
  const [input, setInput] = useState("");
  const [color, setColor] = useState("#87FF73");
  const [categoriesUpdated, setcategoriesUpdated] = useState(false);

  useEffect(() => {
    //init
    if (categories?.length == 0 || categories == undefined) {
      fetchCategories(user?.id).then((categories) => {
        setCategories(categories);
      });
    }
    //update
    if (categoriesUpdated == true) {
      async () => {
        await fetchCategories(user?.id).then((categories) => {
          setCategories(categories);
          setcategoriesUpdated(false);
        });
      };
    }
  }, [categories]);

  const categoriesHandler = (event: any) => {
    if (event.keyCode === 13) {
      let newc = new ExpenseCategory(event.target.value.toString(), color);
      // Enter key pressed
      setCategories((prevCategories): ExpenseCategory[] | undefined => {
        return [...(prevCategories ?? []), newc];
      });
      addExpenseCategory(newc, user?.id);
      setcategoriesUpdated(true);
      setInput("");
    }
  };

  const inputHandler = (event: any) => {
    setInput(event.target.value);
  };

  const colorHandler = (event: any) => {
    setColor(event.target.value);
  };

  const deleteHandler = (id: number) => {
    deleteCategory(id);
    setCategories(
      categories?.filter((categorie) => {
        return categorie.id !== id;
      })
    );
  };

  return (
    <>
      <label htmlFor="category" className="text-white">
        Ajouter une ou plusieurs catégories de dépense
      </label>
      <div className="flex flex-col py-2 border-dgreen border bg-transparent color-dgreen font-sm">
        <div className="flex flex-row">
          <input
            type="color"
            id="body"
            name="body"
            value={color}
            className="w-[50px] h-[50px]"
            onChange={colorHandler}
          />
          <input
            type={"text"}
            onKeyDown={categoriesHandler}
            placeholder="Ajouter une catégorie"
            onChange={inputHandler}
            value={input}
            id="category"
            className="color-dgreen"
          ></input>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center p-2 border-lgrey border bg-transparent">
          {categories?.map((categorie) => (
            <div
              className={
                "m-2 flex flex-row flex-wrap items-center justify-center px-2"
              }
              style={{
                background:
                  "linear-gradient(90deg, #1C221C 0%," + categorie.color,
                border: "solid 1px " + categorie.color,
              }}
            >
              <span className="font-bold">{categorie.name}</span>
              <button
                className="p-2 text-white flex flex-row flex-wrap items-center justify-center"
                onClick={() => {
                  deleteHandler(categorie.id);
                }}
              >
                <img src="./delete_red.svg" className="" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default NewCategory;
