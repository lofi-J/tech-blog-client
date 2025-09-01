// rehypePrettyCode 노드 타입 정의
export interface RehypeNode {
  type: string;
  tagName?: string;
  properties?: {
    className?: string[];
    [key: string]: unknown;
  };
  children?: RehypeNode[];
  data?: {
    meta?: {
      language?: string;
    };
  };
  lang?: string;
  value?: string;
}

// rehypePrettyCode 설정 타입
export interface RehypePrettyCodeOptions {
  theme?: string;
  keepBackground?: boolean;
  defaultLang?: string;
  onVisitLine?: OnVisitLine;
  onVisitHighlightedLine?: OnVisitHighlightedLine;
}
