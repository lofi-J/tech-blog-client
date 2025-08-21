import Link from "next/link";

export default function NotFound() {
  // TODO: 404 페이지 디자인 추가
  return (
    <div className="w-full">
      <h1>Not Fount</h1>
      <p>해당 포스팅은 더이상 존재하지 않습니다.</p>
      <Link href="/posts">포스팅 목록으로 돌아가기</Link>
    </div>
  );
}
