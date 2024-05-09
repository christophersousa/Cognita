interface AppGlobalContainerProps {
    children: React.ReactNode;
}
export const Container = ({children}:  AppGlobalContainerProps) => {
    return (
        <div className="max-w-[800] w-full px-4 md:px-20" >
            {children}
        </div>
    )
}