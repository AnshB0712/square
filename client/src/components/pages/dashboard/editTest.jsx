import { useParams } from "react-router-dom";

const EditTest = () => {
  const { testId } = useParams();
  return <div>{testId}</div>;
};

export default EditTest;
