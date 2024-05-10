import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Container } from "~/components/Container";

export const loader = () => {
    return json(null, { status: 404 });
};

function page404(){
    return(
        <section className="flex justify-center">
            <Container>
                <div className="text-center absolute top-1/2 -translate-y-1/2">
                    <h1 className="text-7xl tracking-tight font-extrabold text-primary mb-4">404</h1>
                    <h2 className="text-3xl tracking-tight font-bold mb-4">Ah, parece que você solicitou uma Trilha desconhecida!</h2>
                    <p className="mb-6">Desculpe-nos, não conseguimos exibir as informações solicitadas neste momento. Por favor, tente novamente mais tarde.</p>
                    <a href="/" className="py-3 px-4 bg-primary font-semibold text-white rounded-lg">Voltar para Home!</a>
                </div>
            </Container>
        </section>
    )
}

export default page404