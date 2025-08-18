import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

type SearchModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
export const SearchModal = ({ isOpen, setIsOpen }: SearchModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
