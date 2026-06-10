import { getAllArticles } from "@/lib/articles";
import SearchResults from "./SearchResults";

export default function SearchPage() {
  const articles = getAllArticles();
  return <SearchResults articles={JSON.parse(JSON.stringify(articles))} />;
}
