export const metadata = {
  title: "AI Visuals Masterclass — The 7 Pillars of Visual Creation System",
  description:
    "Full-day workshop: learn the system behind publishable AI-generated images using the 7 Pillars framework.",
};

export default function WorkshopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
}
