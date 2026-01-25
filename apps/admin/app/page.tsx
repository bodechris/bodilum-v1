import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen text-[#222] text-center flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-9xl">Welcome to Bodilum Admin!</h1>
      <p className="text-3xl text-[skyblue]">This is the main area for admin of the platform - super admins, admins, curators, and general managers.</p>
    </main>
  );
}
