import { compile } from "@mdx-js/mdx";
import fs from "fs";
import matter from "gray-matter";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const contentDirectory = path.join(process.cwd(), "src/content");
    const filePath = path.join(contentDirectory, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `Post not found: ${slug}` },
        { status: 404 }
      );
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    // MDX를 클라이언트에서 실행 가능한 형태로 컴파일
    let compiledMdx = null;
    try {
      const compiled = await compile(content, {
        outputFormat: "function-body",
        development: false,
      });

      // compiled는 Uint8Array 형태로 반환되므로 문자열로 변환
      if (compiled instanceof Uint8Array) {
        compiledMdx = new TextDecoder().decode(compiled);
      } else {
        compiledMdx = String(compiled);
      }
    } catch (compileError) {
      console.error("MDX compilation error:", compileError);
      // 컴파일 실패 시 원본 content만 반환
    }

    return NextResponse.json({
      slug,
      metadata: data,
      content,
      compiledMdx,
    });
  } catch (error) {
    console.error("Error reading post:", error);
    return NextResponse.json({ error: "Failed to read post" }, { status: 500 });
  }
}
