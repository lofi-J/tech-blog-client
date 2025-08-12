export default function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  return <article>PostDetailPage {slug}</article>;
}
