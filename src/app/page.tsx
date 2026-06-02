import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>OEDX AI</h1>

      <Link href="/chat">
        Start Chat
      </Link>
    </main>
  );
}
