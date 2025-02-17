import { useParams } from "react-router-dom";

function PetDetails() {
  const { id } = useParams();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Detalji ljubimca {id}</h1>
    </div>
  );
}

export default PetDetails;
