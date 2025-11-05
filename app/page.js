"use client";

// --- SVG Icons (เหมือนเดิม) ---
const CogIcon = () => (
  <svg
    className="w-8 h-8"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.34 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774a1.125 1.125 0 0 1 .12 1.45l-.527.737c-.25.35-.272.806-.108 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.11v1.093c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.142.854.108 1.204l.527.738a1.125 1.125 0 0 1-.12 1.45l-.773.773a1.125 1.125 0 0 1-1.45.12l-.737-.527c-.35-.25-.806-.272-1.204-.108-.397.165-.71.505-.78.93l-.15.893c-.09.543-.56.94-1.11.94h-1.093c-.55 0-1.02-.397-1.11-.94l-.149-.893c-.07-.425-.383-.765-.78-.93-.398-.165-.854-.142-1.204.108l-.738.527a1.125 1.125 0 0 1-1.45-.12l-.773-.773a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272.806.108-1.204-.165-.397-.505.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.11v-1.093c0 .55.398-1.02.94-1.11l.894-.149c.424-.07.764-.383.93-.78.165-.398.142.854-.108-1.204l-.527-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.806.272 1.204.108.397-.165.71.505.78-.93l.15-.893zM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
    />
  </svg>
);
const CloudArrowUpIcon = () => (
  <svg
    className="w-8 h-8"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.33-2.13 3 3 0 0 1 .11-5.875M18.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.33-2.13 3 3 0 0 1 .11-5.875"
    />
  </svg>
);
const DocumentTextIcon = () => (
  <svg
    className="w-8 h-8"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6"
    />
  </svg>
);
// --- จบ SVG Icons ---

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans bg-slate-900 text-slate-400">
      
      {/* ส่วน Navbar ถูกลบไปจากตรงนี้ */}

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* --- Section 1: Hero (Welcome) --- */}
        <section className="mb-16 md:mb-24">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-50 sm:text-5xl md:text-6xl">
            Welcome to the Drone Portal
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-slate-400">
            See your drone config, submit temperature logs,
            and review history.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="/config"
              className="rounded-md bg-teal-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              View Configuration
            </a>
            <a
              href="/logs"
              className="rounded-md bg-slate-800 px-5 py-3 text-base font-semibold text-slate-300 shadow-sm ring-1 ring-inset ring-slate-700 hover:bg-slate-700"
            >
              Review Logs
            </a>
          </div>
        </section>

        {/* --- Section 2: Features (The 3 Cards) --- */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Config */}
            <div className="flex flex-col text-center justify-between p-6 bg-slate-800 border border-slate-700 rounded-lg shadow-sm">
              <div className="flex-grow">
                {/* Icon: White icon on Teal background */}
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-600 text-white mx-auto mb-4">
                  <CogIcon />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-zinc-50">
                  Manage Configuration
                </h3>
                <p className="mt-2 text-base text-slate-400">
                  Manage your drone config that have drone id, drone name, Light and Country
                </p>
              </div>
              <a
                href="/config"
                className="mt-4 inline-block text-teal-500 hover:text-teal-400 font-medium"
              >
                Go to Config &rarr;
              </a>
            </div>

            {/* Card 2: Submit */}
            <div className="flex flex-col text-center justify-between p-6 bg-slate-800 border border-slate-700 rounded-lg shadow-sm">
              <div className="flex-grow">
                  {/* Icon: White icon on Teal background */}
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-600 text-white mx-auto mb-4">
                  <CloudArrowUpIcon />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-zinc-50">
                  Submit Data
                </h3>
                <p className="mt-2 text-base text-slate-400">
                  You can input your temperature here
                </p>
              </div>
              <a
                href="/submit"
                className="mt-4 inline-block text-teal-500 hover:text-teal-400 font-medium"
              >
                Submit Log &rarr;
              </a>
            </div>

            {/* Card 3: Review */}
            <div className="flex flex-col text-center justify-between p-6 bg-slate-800 border border-slate-700 rounded-lg shadow-sm">
              <div className="flex-grow">
                  {/* Icon: White icon on Teal background */}
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-600 text-white mx-auto mb-4">
                  <DocumentTextIcon />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-zinc-50">
                  Review History
                </h3>
                <p className="mt-2 text-base text-slate-400">
                  Here you can review all the history you put in
                </p>
              </div>
              <a
                href="/logs"
                className="mt-4 inline-block text-teal-500 hover:text-teal-400 font-medium"
              >
                View All Logs &rarr;
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}