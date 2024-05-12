import { LoaderFunction, redirect } from "@remix-run/node";
import { Await, ClientLoaderFunctionArgs, useActionData, useLoaderData } from "@remix-run/react";
import { addStepByTrail, fetchDataTrail } from "~/neo4js.serve";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Container } from "~/components/Container";
import { CardStep } from "~/components/Cards/CardStep";
import { Suspense, useEffect, useState } from "react";
import AddIcon from "~/assets/icon/add.svg"
import Modal from "~/components/Modal/ModalStep";
import { IListStepsByTrail, IStep } from "~/interface/interfaces";
import { Loading } from "~/components/Loading/Loading";
import { ViewModal } from "~/components/Modal/ViewModal";
import { Bounce, toast } from "react-toastify";

export const meta: MetaFunction = () => {
  return [
    { title: "Cognittron" },
    { name: "description", content: "Teste de desenvolvimento" },
  ];
};


export async function action({
    params,
    request,
  }: ActionFunctionArgs) {
    const trailID = params.trailId || '';
    const body = await request.formData();
    try {
        const id = body.get("id")?.toString() || '';
        const title = body.get("title")?.toString() || '';
        const content = body.get("content")?.toString() || '';
        const formData:IStep = {
            id,
            title,
            content
        }
        
        if(formData.id == '' || formData.title == '' || formData.content == '' || trailID  == ''){
            throw new Error('Valores não foram passados corretamente');
        }

        const data = await addStepByTrail(trailID, formData)
        return {
            result:data,
            status:200
        }
        
    } catch (error) {
        return {
            result: {
                id: '',
                title: '',
                content: ''
            }, 
            status:500}
    }
  }

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
        <div className="w-screen h-screen max-w-full flex flex-col items-center justify-center">
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
    const [loading, setLoading] = useState(false)

    const dataAction = useActionData<typeof action>();

    const handleAddStep = (step:IStep)=>{
        data?.steps.unshift(step)
    }

    const handleSelectStep = (step:IStep)=>{
        setSelectStep(step)
        setPopUpView(true)
    }

    const registerStep = ()=>{
        setLoading(false)
        if(dataAction?.status == 200){
            handleAddStep(dataAction.result)
            toast.success('Passo criado com sucesso!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setPopUp(false)
        }else{
            toast.error('Não foi possível registrar esse passo, tente novamente mais tarde!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }

    useEffect(()=>{
        if(dataAction){
            registerStep()
        }
    },[dataAction])

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
                {popUp && <Modal setPopUp={setPopUp} setLoading={setLoading} loading={loading}/>}
                {popUpView && <ViewModal setPopUp={setPopUpView} selectStep={selectStep}/>}
            </Container>
        </main>
    );
}
