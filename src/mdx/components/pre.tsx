// import { CopyButton } from "@/shared/components/copy-button";
// import {
//   guranteeLanguage,
//   LanguageIcon,
// } from "@/shared/components/language-icon";
// import { PropsWithChildren } from "react";

// type Props = PropsWithChildren<{
//   code: string;
//   language: string;
//   filename: string;
// }>;

// export const MdxPre = ({ children, code, language, filename }: Props) => {
//   return (
//     <pre
//       className="rounded-lg overflow-x-auto mdx-text rts-14 mdx-code-bg relative"
//       {...props}
//     >
//       <div className="flex items-center justify-between pb-2 mb-4 border-b border-input">
//         <LanguageIcon
//           language={guranteeLanguage(language)}
//           className="size-5"
//         />
//         {filename && (
//           <span className="rts-14 font-jetbrains-mono">{filename}</span>
//         )}
//         <CopyButton code={code} />
//       </div>
//       {children}
//     </pre>
//   );
// };
