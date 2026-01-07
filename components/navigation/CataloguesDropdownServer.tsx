import { getCatalogues } from "@/lib/api";
import CataloguesDropdown from "./CataloguesDropdown";

export default async function CataloguesDropdownServer({
  navLinksRef,
}: {
  navLinksRef: React.RefObject<HTMLDivElement | null>;
}) {
  const catalogues = await getCatalogues();
  return <CataloguesDropdown navLinksRef={navLinksRef} catalogues={catalogues} />;
}

