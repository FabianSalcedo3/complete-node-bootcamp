# Node js Event Loop

# Start

- Event loop each phase has his callback queue
  1 Expired timer callbacks
  2 I/O polling and callbacks (Networking and File accessing)
  3 setImmediate callbacks
  4 Close callbacks (web server or socket shuts down)

- PROCESS.NEXTTICK() QUEUE
- OTHER MICROTASKS
- 1 tick represents one cycle of the loop
- I
