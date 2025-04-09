import dynamic from "next/dynamic";

const ClientSuccess = dynamic(() => import("./client"), { ssr: false });

export default function SuccessPage() {
  return <ClientSuccess />;
}
