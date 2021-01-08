# Explination

The server will dynamically fetch the results from adyen or other code on the backend and populate the response JSON as a part of serving the JSON. These  files will always be empty. I created these empty files simply to allow the server to pre populate headers etc for me with the appropriate content-type etc.

Any API calls not explicitly created here will serve a 404. This also gives a file level transparency to what API calls I need to have. Its one of the many ways to do this quickly for prototyping.
