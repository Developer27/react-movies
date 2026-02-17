import Link from "next/link";
import React from "react";

function page() {
  return (
    <div>
      page
      <Link href={"/Signup"}>Don&apos;t have account? Sign up</Link>
    </div>
  );
}

export default page;
