import { EditorPage } from "../../../components/EditorPage";

const CONFIG = {
  contentType: "Research", apiBase: "/api/research", listHref: "/dashboard/research", portfolioBase: "research",
  fields: { hasSubtitle: true, hasExcerpt: false, hasType: false, hasLiveUrl: false, hasGithubUrl: false, hasFeatured: false, hasBlocks: true },
};

export default function NewResearchPage() {
  return <EditorPage config={CONFIG} />;
}
