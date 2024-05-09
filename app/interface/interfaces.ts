// requests
export interface IListStepsByTrail{
    trail: ITrail;
    steps: IStep[]
}

export interface ITrail{
    id: string;
    title: string
}

export interface IStep{
    id: string;
    title: string;
    content: string
}