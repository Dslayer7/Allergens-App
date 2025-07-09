import HomeClient from "./home-client";

export default function Home() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          AllergenWise
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Simplify your menu allergen labeling. Upload your menu file to get started.
        </p>
      </div>
      <div className="mt-12">
        <HomeClient />
      </div>
    </div>
  );
}
