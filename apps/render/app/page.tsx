import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen text-emerald-500 text-center flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-9xl">Welcome to Bodilum Render App!</h1>
      <p className="text-3xl text-[skyblue]">This is the section used to render dynamically generated images, and documents.</p>
    </main>
  );
}
