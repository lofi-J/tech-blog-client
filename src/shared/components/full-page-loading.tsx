import { Loader } from "./loader";

export default function FullPageLoading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-background">
      <Loader />
    </div>
  );
}
