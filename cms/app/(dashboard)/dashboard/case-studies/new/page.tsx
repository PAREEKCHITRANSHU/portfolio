import { EditorPage } from "../../../components/EditorPage";

const CONFIG = {
  contentType: "Case Studies", apiBase: "/api/case-studies", listHref: "/dashboard/case-studies", portfolioBase: "case-studies",
  fields: { hasSubtitle: true, hasExcerpt: false, hasType: false, hasLiveUrl: false, hasGithubUrl: false, hasFeatured: true, hasBlocks: true },
};

export default function NewCaseStudyPage() {
  return <EditorPage config={CONFIG} />;
}
