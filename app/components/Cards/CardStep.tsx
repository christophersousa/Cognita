import { IStep } from "~/interface/interfaces"

export const CardStep = ({title, content, id}:IStep)=>{
    const text = content.length > 200 ? content.substring(0,200).concat("...") : content
    return(
        <div className="bg-white p-6 border border-secondary-50 rounded-xl cursor-pointer">
            <h1 className="text-lg text-secondary-100 font-semibold mb-2">{title}</h1>
            <p>{text}</p>
        </div>
    )
}