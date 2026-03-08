'use client';

export default function EgressesPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-base font-semibold text-white">Egresses</h1>
      <div className="rounded border border-[#1a1a1a] bg-[#111111] px-4 py-6 text-sm text-[#a1a1aa]">
        No egress streams detected yet. They will be listed once traffic leaves your project.
      </div>
    </div>
  );
}
