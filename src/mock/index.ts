export async function enableMocking() {
  if (typeof window === "undefined") {
    // const { server } = await import("./node");
    // server.listen();
  } else {
    // const { worker } = await import("./browser");
    // return worker.start();
  }
}
