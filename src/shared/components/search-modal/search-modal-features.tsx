import { SearchModalFeatureItem } from "./search-modal-feature-item";

type SearchModalFeaturesProps = {
  closeModal: () => void;
};
export const SearchModalFeatures = ({
  closeModal,
}: SearchModalFeaturesProps) => {
  return (
    <div className="flex flex-col gap-1">
      <SearchModalFeatureItem
        feature="toggle-zen-mode"
        closeModal={closeModal}
      />
      <SearchModalFeatureItem
        feature="change-highlight-color"
        closeModal={closeModal}
      />
      <SearchModalFeatureItem feature="toggle-theme" closeModal={closeModal} />
    </div>
  );
};
