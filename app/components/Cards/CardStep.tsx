import { IStep } from "~/interface/interfaces"

export const CardStep = ({title, content, id}:IStep)=>{
    return(
        <div className="bg-white p-6 border border-secondary-50 rounded-xl">
            <h1 className="text-lg text-secondary-100 font-semibold mb-2">{title}</h1>
            <p>{content}</p>
        </div>
    )
}