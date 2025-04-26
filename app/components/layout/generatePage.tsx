export default function GeneratePage({
  children,
  title,
  subTitle,
  footerTools,
  titleRight,
}: {
  children: React.ReactNode;
  title: string;
  subTitle?: string; // Optional subTitle
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
        <div className="flex flex-row justify-between mb-5 items-end">
          <div>
            {/* SubTitle */}
            <div
              className={`text-lg text-gray-600 ${
                subTitle ? 'visible' : 'invisible'
              }`}
            >
              {subTitle || 'Placeholder'}{' '}
              {/* Placeholder ensures consistent height */}
            </div>
            {/* Title */}
            <div className="text-4xl font-bold">{title}</div>
          </div>
          <div className="pb-0.5">{titleRight}</div>
        </div>

        <div className="mb-5">{children}</div>
      </div>
      <div className="fixed bottom-4 inset-x-0 mx-auto w-fit">
        {footerTools}
      </div>
    </div>
  );
}
