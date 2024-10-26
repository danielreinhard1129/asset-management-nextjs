import EditAccountPage from "@/features/dashboard/account/EditAccountPage";

const EditAccount = ({ params }: { params: { id: string } }) => {
  return <EditAccountPage userId={Number(params.id)} />;
};

export default EditAccount;
