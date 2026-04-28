import { EditorPage } from "../../../components/EditorPage";

const CONFIG = {
  contentType: "Blog Posts", apiBase: "/api/blogs", listHref: "/dashboard/blogs", portfolioBase: "blog",
  fields: { hasSubtitle: false, hasExcerpt: true, hasType: false, hasLiveUrl: false, hasGithubUrl: false, hasFeatured: false, hasBlocks: true },
};

export default function NewBlogPage() {
  return <EditorPage config={CONFIG} />;
}
