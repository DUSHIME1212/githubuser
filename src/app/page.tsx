import GitHubUserSearch from "@/components/GitHubUserSearch";


export default function Home() {
  return (
    <main className="container mx-auto p-4 flex font-dmsans items-center flex-col min-h-[512px] text-center">
      <h1 className="font-bold mb-4 text-6xl">GitHub User Search</h1>
      <GitHubUserSearch />
    </main>
  )
}

