import { redirect, type LoaderFunction, type MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Cognittron" },
    { name: "description", content: "Home!" },
  ];
};

export let loader: LoaderFunction = async ({ params }) => {
  return redirect("/explore/trail-1")
};

export default function Index() {
  return
}
