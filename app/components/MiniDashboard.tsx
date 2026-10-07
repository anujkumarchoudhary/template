export default function MiniDashboard() {
  return (
    <div className="mini-card absolute bottom-10 right-10 w-[260px] rounded-xl bg-white p-4 shadow-xl">

      {/* Row 1 */}
      <div className="flex items-center gap-3 mb-3">
        <div className="h-2 w-6 rounded bg-gray-300"></div>
        <div className="h-2 flex-1 rounded bg-blue-400"></div>
        <div className="h-2 w-4 rounded bg-gray-300"></div>
      </div>

      {/* Row 2 */}
      <div className="flex items-center gap-3 mb-3">
        <div className="h-2 w-6 rounded bg-gray-300"></div>
        <div className="h-2 flex-1 rounded bg-gray-300"></div>
        <div className="h-2 w-4 rounded bg-gray-300"></div>
      </div>

      {/* Row 3 (highlight) */}
      <div className="flex items-center gap-3 mb-3">
        <div className="h-2 w-6 rounded bg-gray-300"></div>
        <div className="h-2 flex-1 rounded bg-blue-400"></div>
        <div className="h-2 w-4 rounded bg-gray-300"></div>
      </div>

      {/* Row 4 */}
      <div className="flex items-center gap-3">
        <div className="h-2 w-6 rounded bg-gray-300"></div>
        <div className="h-2 flex-1 rounded bg-gray-300"></div>
        <div className="h-2 w-4 rounded bg-gray-300"></div>
      </div>

    </div>
  );
}