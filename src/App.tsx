import "./App.css";
import { Input } from "@/components/ui/input";
import { Button } from "./components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { CheckCircleIcon } from "lucide-react";

function App() {
  return (
    <>
      <div className="w-full max-w-lg mx-auto flex flex-col items-center justify-center px-4">
        <h1 className=" text-3xl font-semibold mt-16 mb-18">Einkaufsliste</h1>
        <div className="flex w-full gap-2">
          <Input placeholder="Produkt eingeben..." />
          <Input className="w-14" type="number" value={1} />
        </div>
        <Toaster />
        <Button
          size={"lg"}
          onClick={() => toast.warning("geklickt")}
          className=" w-full mt-2"
        >
          Eintrag Hinzufügen
        </Button>

        <div className="flex flex-col w-full gap-2 mt-6">
          <div className="rounded-xl border bg-card texr-card-foreground shadow p-6 flex justify-between items-center  ">
            <div>
              <h3 className="text-lg font-semibold">Kartoffel</h3>
              <p className="text-sm text-muted-foreground">Anzahl: 10</p>
            </div>
            <Button size={"lg"} variant={"outline"}>
              <CheckCircleIcon />
              Abhaken
            </Button>
          </div>
        </div>

        <div className="flex flex-col w-full gap-2 mt-6">
          <div className="rounded-xl border bg-card texr-card-foreground shadow p-6 flex justify-between items-center  ">
            <div>
              <h3 className="text-lg font-semibold">Kartoffel</h3>
              <p className="text-sm text-muted-foreground">Anzahl: 10</p>
            </div>
            <Button size={"lg"} variant={"outline"}>
              <CheckCircleIcon />
              Abhaken
            </Button>
          </div>
        </div>

        <div className="flex flex-col w-full gap-2 mt-6">
          <div className="rounded-xl border bg-card texr-card-foreground shadow p-6 flex justify-between items-center  ">
            <div>
              <h3 className="text-lg font-semibold">Kartoffel</h3>
              <p className="text-sm text-muted-foreground">Anzahl: 10</p>
            </div>
            <Button size={"lg"} variant={"outline"}>
              <CheckCircleIcon />
              Abhaken
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
