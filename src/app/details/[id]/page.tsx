import PageContainer from "./pageContainer";
import "../styles.scss";
export default function Page({ params }: { params: { id: string } }) {
  return <PageContainer id={params.id} />;
}
