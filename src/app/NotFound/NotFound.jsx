import { Link } from "react-router";

export const NotFoundPage = () => {

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-bold mb-4">
        404
      </h1>
      <p className="text-slate-400 mb-6">
        La página que buscas no existe
      </p>
      <Link
        to="/"
        className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition"
      >
        Volver al dashboard
      </Link>

    </div>
  );
};