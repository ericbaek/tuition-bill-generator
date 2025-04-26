export default function GeneratePage({
  children,
  title,
  footerTools,
  titleRight,
}: {
  children: React.ReactNode;
  title: string;
  titleRight?: React.ReactNode;
  footerTools?: React.ReactNode;
}) {
  return (
    <div
      aria-label="Page"
      className="flex flex-col items-center min-h-screen bg-gray-100"
    >
      <div className="mt-16 w-full max-w-5xl px-4 sm:px-6 md:px-8">
        {/* Title Component */}
        <div className="flex flex-row justify-between items-center mb-5">
          <div className="text-4xl font-bold">{title}</div>
          {titleRight}
        </div>

        <div className="mb-5">{children}</div>
      </div>
      <div className="fixed bottom-4 inset-x-0 mx-auto w-fit">
        {footerTools}
      </div>
    </div>
  );
}
