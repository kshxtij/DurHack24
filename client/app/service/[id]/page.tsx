export default function ServicePage({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <div>
      <h1 className="text-2xl font-bold">{id}</h1>
      {id}
    </div>
  );
}
