import type { MetaFunction } from "@remix-run/node";
import { Container } from "~/components/Container";
import { CardStep } from "~/components/Cards/CardStep";
import { useEffect, useState } from "react";
import AddIcon from "~/assets/icon/add.svg"
import Modal from "~/components/Modal/ModalStep";
import neo4j from 'neo4j-driver';
import { fetchDataTrail } from "~/service/neo4js";
import { IListStepsByTrail } from "~/interface/interfaces";

export const meta: MetaFunction = () => {
  return [
    { title: "Congnittron" },
    { name: "description", content: "Welcome to express!" },
  ];
};

export default function Index() {
  const [popUp, setPopUp] = useState<boolean>(false)
  const [data, setData] = useState<IListStepsByTrail>();

  useEffect(() => {
    const request = async ()=>{
      const data = await fetchDataTrail()
      setData(data)
    }
    request()
  }, []);
  return (
    <main className="flex justify-center py-20">
      <Container>
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-title font-semibold text-secondary-100">{data?.trail.title}</h1>
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
          {data?.steps.map(step => (
            <CardStep key={step.id} title={step.title} content={step.content} id={step.id}/>
          ))}
        </div>
        {/* Modal */}
        {popUp && <Modal setPopUp={setPopUp} />}
      </Container>
    </main>
  );
}
