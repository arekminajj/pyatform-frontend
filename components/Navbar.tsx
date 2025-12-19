
export default function Navbar() {
  return (
    <nav className="block w-full px-4 py-2 bg-white shadow-md lg:px-8 lg:py-3">
      <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
        <a
          href="/"
          className="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold"
        >
          Pyatfrom
        </a>
        <div className="hidden lg:block">
          <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
              <a href="/challenge" className="flex items-center">
                Challenges
              </a>
            </li>
            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
              <a href="/ranking" className="flex items-center">
                Ranking
              </a>
            </li>
            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
              <a href="/api/auth/signin" className="flex items-center">
                Sign in
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
