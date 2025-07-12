export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">안녕하세요!</h1>
        <p className="text-xl mb-2">Noto Sans KR 폰트가 적용되었습니다.</p>
        <p className="text-lg text-muted-foreground">
          한국어 텍스트가 아름답게 표시됩니다.
        </p>
        <div className="mt-8 space-y-2">
          <p className="font-light">가벼운 폰트 (Light)</p>
          <p className="font-normal">일반 폰트 (Normal)</p>
          <p className="font-medium">중간 폰트 (Medium)</p>
          <p className="font-semibold">세미볼드 폰트 (Semibold)</p>
          <p className="font-bold">볼드 폰트 (Bold)</p>
        </div>
      </div>
    </div>
  );
}
