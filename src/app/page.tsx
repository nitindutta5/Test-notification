// Import the functions you need from the SDKs you need
import { ClientButton } from "./Component/ClientButtons";
import { ServerComponent } from "./Component/ServerComponent";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ClientButton />
      <ServerComponent/>
    </main>
  );
}
