import { LoaderFunction, redirect } from "@remix-run/node";
import { Await, ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import { fetchDataTrail } from "~/neo4js.serve";
import type { MetaFunction } from "@remix-run/node";
import { Container } from "~/components/Container";
import { CardStep } from "~/components/Cards/CardStep";
import { Suspense, useEffect, useState } from "react";
import AddIcon from "~/assets/icon/add.svg"
import Modal from "~/components/Modal/ModalStep";
import { IListStepsByTrail, IStep } from "~/interface/interfaces";
import { Loading } from "~/components/Loading/Loading";
import { ViewModal } from "~/components/Modal/ViewModal";

export const meta: MetaFunction = () => {
  return [
    { title: "Cognittron" },
    { name: "description", content: "Teste de desenvolvimento" },
  ];
};

export let loader: LoaderFunction = async ({ params }) => {
    const { trailId } = params;
    try {
        if (!trailId) {
            return redirect("/404");
        }
        const steps = await fetchDataTrail(trailId || "");
        if (!steps) {
            return redirect("/404");
          }
        return steps;
    } catch (error) {
        return redirect("/404")
    }
};

export async function clientLoader({
    serverLoader,
    }: ClientLoaderFunctionArgs) {
    const data = await serverLoader()
    return data
}
clientLoader.hydrate = true; 

export function HydrateFallback() {
    return (
        <div className="absolute top-1/2 right-1/2 flex flex-col items-center">
            <Loading loading={true} w="100px" h="100px"/>
            <p className="mt-4 font-medium text-lg text-center">Carregando ...</p>
        </div>
    );
}

export default function ExplorePage(){
    const data:IListStepsByTrail = useLoaderData<typeof loader>();
    const [popUp, setPopUp] = useState<boolean>(false)
    const [popUpView, setPopUpView] = useState<boolean>(false)
    const [selectStep, setSelectStep] = useState<IStep>()

    const handleAddStep = (step:IStep)=>{
        data?.steps.unshift(step)
    }

    const handleSelectStep = (step:IStep)=>{
        setSelectStep(step)
        setPopUpView(true)
    }

    return (
        <main className="flex justify-center py-20">
            <Container>
                <Suspense fallback={<h1>Loading...</h1>}>
                    {/* content */}
                    <div >
                        '{/* Header */}
                        <div className="flex justify-between items-center">
                            <Await
                                resolve={data?.trail}
                                errorElement={
                                    <div>Trilha não encontrada</div>
                                }
                                children={(resolverTrail) => (
                                    <h1 className="text-title font-semibold text-secondary-100">{resolverTrail.title}</h1>
                                )}
                            />
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
                        <Await
                            resolve={data?.steps}
                            errorElement={
                                <div>Steps não encontrados</div>
                            }
                            children={(resolverStep) => (
                                <div className="flex flex-col gap-6 mt-10">
                                    {resolverStep?.map(step => (
                                    <div onClick={()=>handleSelectStep(step)} key={step.id}>
                                        <CardStep  title={step.title} content={step.content} id={step.id} />
                                    </div>
                                    ))}
                                </div>
                            )}
                        />
                    </div>
                </Suspense>
                {/* Modal */}
                {popUp && <Modal setPopUp={setPopUp} handleAddStep={handleAddStep}/>}
                {popUpView && <ViewModal setPopUp={setPopUpView} selectStep={selectStep}/>}
            </Container>
        </main>
    );
}
