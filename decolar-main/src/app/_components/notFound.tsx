import dynamic from "next/dynamic";

const DynamicNotFound = dynamic(() => import("@/app/_components/notFound"), {
  ssr: false,
});

export default function NotFound() {
  return <DynamicNotFound />;
}
