import "./App.css";
import { Input } from "@/components/ui/input";
import { Button } from "./components/ui/button";
import { toast } from "sonner";
import { CheckCircleIcon, TrashIcon, Undo2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

type Product = {
  name: string;
  quantity: number;
  completed: boolean;
};

const LOCAL_STORAGE_KEY = "shoppinglist";

function App() {
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);

  const [list, setList] = useState<Product[]>([]);

  const dataLoaded = useRef(false);

  useEffect(() => {
    setList(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"));
    dataLoaded.current = true;
  }, []);

  useEffect(() => {
    if (dataLoaded.current)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  }, [list]);

  return (
    <>
      <div className="w-full max-w-lg mx-auto flex justify-end mt-5 px-4">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ModeToggle />
        </ThemeProvider>
      </div>
      <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center px-4">
        <h1 className=" text-3xl font-semibold mt-16 mb-18">Einkaufsliste</h1>
        <div className="flex w-full gap-2">
          <Input
            type="text"
            placeholder="Produkt eingeben..."
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <Input
            className="w-16"
            type="number"
            value={productQuantity}
            onChange={(e) => setProductQuantity(Number(e.target.value))}
          />
        </div>

        <Button
          size={"lg"}
          className=" w-full mt-2"
          disabled={productName.length < 1}
          onClick={() => {
            if (list.find((item) => item.name === productName)) {
              toast.error("Hinzufügen fehlgeschlagen", {
                description:
                  "Produkt ist bereits in der Einkaufsliste vorhanden!",
              });
              setProductName("");
              setProductQuantity(1);
              return;
            }

            setList([
              {
                name: productName,
                quantity: productQuantity,
                completed: false,
              },
              ...list,
            ]);

            setProductQuantity(1);
            setProductName("");
          }}
        >
          Eintrag Hinzufügen
        </Button>
        <div className="flex flex-col w-full gap-2 mt-6">
          {list.map((item) => (
            <div
              key={item.name}
              className="rounded-xl border bg-card texr-card-foreground shadow p-6 flex justify-between items-center  "
            >
              <div>
                <h3
                  className={`text-lg font-semibold${
                    item.completed ? "text-muted-foreground line-through" : ""
                  }`}
                >
                  {item.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Anzahl: {item.quantity}
                </p>
              </div>
              {item.completed ? (
                <div className="flex gap-2">
                  <Button
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() => {
                      setList([
                        ...list.filter(
                          (listItem) => listItem.name !== item.name
                        ),
                      ]);

                      toast.success("Produkt gelöscht!", {
                        description:
                          item.name + " wurde aus der Einkaufsliste entfernt",
                      });
                    }}
                  >
                    <TrashIcon />
                  </Button>
                  <Button
                    variant={"secondary"}
                    onClick={() => {
                      setList([
                        {
                          name: item.name,
                          quantity: item.quantity,
                          completed: false,
                        },
                        ...list.filter(
                          (listItem) => listItem.name !== item.name
                        ),
                      ]);
                    }}
                  >
                    <Undo2Icon />
                    Zurück
                  </Button>
                </div>
              ) : (
                <Button
                  size={"lg"}
                  variant={"outline"}
                  onClick={() => {
                    setList([
                      ...list.filter((listItem) => listItem.name !== item.name),
                      {
                        name: item.name,
                        quantity: item.quantity,
                        completed: true,
                      },
                    ]);
                  }}
                >
                  <CheckCircleIcon />
                  Abhaken
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
