import Link from "next/link";

const Verification = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0c243b]">
      <h1 className="text-white text-5xl font-bold">Verification Done, click to </h1>
      <div className="ml-2">
      <Link className="text-white text-7xl font-bold underline ml-4" href="/login">
        login
      </Link>
      </div>
    </div>
  );
};

export default Verification;