export default function ProjectLoading() {
  return (
    <div className="fade-in">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-3.5 w-17.5 bg-slate-800 rounded animate-pulse" />
        <div className="h-3.5 w-2.5 bg-slate-800 rounded animate-pulse" />
        <div className="h-3.5 w-30 bg-slate-800 rounded animate-pulse" />
      </div>

      <div className="card p-5 mb-7 flex justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-3.5 h-3.5 rounded-full bg-slate-800 animate-pulse shrink-0" />
          <div className="flex flex-col gap-1.5">
            <div className="h-4.5 w-45 bg-slate-800 rounded animate-pulse" />
            <div className="h-3.25 w-60 bg-slate-800 rounded animate-pulse" />
          </div>
        </div>

        <div className="flex gap-2">
          {[60, 70, 80].map((w, i) => (
            <div
              key={i}
              className="h-6 bg-slate-800 rounded-full animate-pulse"
              style={{ width: w }}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-1">
          {[50, 80, 90, 80].map((w, i) => (
            <div
              key={i}
              className="h-7 bg-slate-800 rounded-full animate-pulse"
              style={{ width: w }}
            />
          ))}
        </div>

        <div className="h-8.5 w-27.5 bg-slate-800 rounded-lg animate-pulse" />
      </div>

      <div className="flex flex-col gap-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="card h-14 animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
}
