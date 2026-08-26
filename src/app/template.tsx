export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="route-perspective">
      <div className="route-stage">{children}</div>
    </div>
  );
}
