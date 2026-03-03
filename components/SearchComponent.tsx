import { searchItem } from "@/app/actions/searchAction";
import { Search } from "lucide-react";

function SearchComponent() {
  return (
    <form action={searchItem} className="flex gap-2 my-2">
      <input
        type="text"
        placeholder="Search anime..."
        className="border border-black rounded-md px-2 py-1 text-sm outline-none"
        name="q"
        required
      />
      <button className="hover:cursor-pointer hover:rotate-40 active:scale-110 transform transition-all duration-200 ease-in">
        <Search size={20} />
      </button>
    </form>
  );
}

export default SearchComponent;
