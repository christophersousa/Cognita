import type { MetaFunction } from "@remix-run/node";
import { Container } from "~/components/Container";
import AddIcon from "~/assets/icon/add.svg"
import { CardStep } from "~/components/Cards/CardStep";
import Modal from "~/components/Modal/ModalStep";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Congnittron" },
    { name: "description", content: "Welcome to express!" },
  ];
};

export default function Index() {
  const [popUp, setPopUp] = useState<boolean>(false)
  return (
    <main className="flex justify-center py-20">
      <Container>
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-title font-semibold text-secondary-100">Título da trilha</h1>
          <div 
            className="flex items-center py-3 px-4 gap-1 bg-primary text-base text-white font-semibold cursor-pointer rounded-xl hover:bg-primary-100"
            onClick={()=>setPopUp(true)}
            >
            <img
              src={AddIcon}
              className="w-5 h-5"
            />
            Adicionar passos
          </div>
        </div>
        {/* List of steps */}
        <div className="flex flex-col gap-6 mt-10">
          <CardStep/>
        </div>
        {/* Modal */}
        {popUp && <Modal setPopUp={setPopUp} />}
      </Container>
    </main>
  );
}
