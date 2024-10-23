import BastPage from "@/features/dashboard/bast";

const Bast = ({ params }: { params: { bastNo: string } }) => {
  return <BastPage bastNo={params.bastNo} />;
};

export default Bast;
