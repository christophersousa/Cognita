interface AppGlobalContainerProps {
    children: React.ReactNode;
}
export const Container = ({children}:  AppGlobalContainerProps) => {
    return (
        <div className="max-w-[800px] w-full" >
            {children}
        </div>
    )
}