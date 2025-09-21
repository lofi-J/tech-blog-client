export const MdxTable = ({ children }: { children: React.ReactNode }) => {
  return (
    <table className="w-full min-w-[800px] table-fixed border-collapse my-5">
      {children}
    </table>
  );
};

export const MdxTableHead = ({ children }: { children: React.ReactNode }) => {
  return <thead className="border border-input">{children}</thead>;
};

export const MdxTableRow = ({ children }: { children: React.ReactNode }) => {
  return <tr className="border border-input">{children}</tr>;
};

export const MdxTableCell = ({ children }: { children: React.ReactNode }) => {
  return (
    <td className="px-2 py-1 border border-input text-center">{children}</td>
  );
};

export const MdxTableHeader = ({ children }: { children: React.ReactNode }) => {
  return <th className="h-9 px-2 border border-input">{children}</th>;
};

export const MdxTableBody = ({ children }: { children: React.ReactNode }) => {
  return <tbody className="bg-blue text-center">{children}</tbody>;
};
