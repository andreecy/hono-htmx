import { Hono } from "hono";
import { jsx } from "hono/jsx";

const app = new Hono();

let count = 0;

const Counter = ({ count }: { count: number }) => (
  <div id="counter">
    <h2>Counter: {count}</h2>
    <button hx-post="/increment" hx-target="#counter" hx-swap="outerHTML">
      Increment
    </button>
    <button hx-post="/decrement" hx-target="#counter" hx-swap="outerHTML">
      Decrement
    </button>
  </div>
);

app.get("/", (c) => {
  return c.html(
    <html>
      <head>
        <title>Hono Counter</title>
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
      </head>
      <body>
        <Counter count={count} />
      </body>
    </html>
  );
});

app.post("/increment", (c) => {
  count++;
  return c.html(<Counter count={count} />);
});

app.post("/decrement", (c) => {
  count--;
  return c.html(<Counter count={count} />);
});

Bun.serve({
  fetch: app.fetch,
});
