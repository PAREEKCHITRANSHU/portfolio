import { EditorPage } from "../../../components/EditorPage";

const CONFIG = {
  contentType: "Projects", apiBase: "/api/projects", listHref: "/dashboard/projects", portfolioBase: "projects",
  fields: { hasSubtitle: false, hasExcerpt: false, hasType: true, hasLiveUrl: true, hasGithubUrl: true, hasFeatured: true, hasBlocks: true },
};

export default function NewProjectPage() {
  return <EditorPage config={CONFIG} />;
}
