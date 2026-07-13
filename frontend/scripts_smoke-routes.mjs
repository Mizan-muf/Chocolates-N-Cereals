import { strict as assert } from "node:assert";
import { spawn } from "node:child_process";

const port = 3307;
const baseUrl = `http://127.0.0.1:${port}`;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(maxAttempts = 120) {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok || response.status === 404) {
        return;
      }
    } catch {}
    await wait(500);
  }

  throw new Error("Next.js server did not start in time for smoke test.");
}

async function checkRoute(pathname) {
  const response = await fetch(`${baseUrl}${pathname}`);
  assert.equal(response.status, 200, `Expected 200 for ${pathname} but got ${response.status}`);
}

async function run() {
  const child = spawn(`npm run start -- -p ${port}`, {
    shell: true,
    stdio: "ignore",
  });

  try {
    await waitForServer();
    await checkRoute("/");
    await checkRoute("/products");
    await checkRoute("/products/hazelnut-midnight-bites");
    await checkRoute("/blogs");
    await checkRoute("/blogs/breakfast-timing-guide");
    await checkRoute("/admin/products");
    console.log("Smoke routes passed.");
  } finally {
    child.kill();
  }
}

run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
