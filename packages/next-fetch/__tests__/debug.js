const NxFetch = require('../src');
const nodeFetch = require('node-fetch');
const http = NxFetch.getInstance({ fetch: nodeFetch });

http.get('https://api.github.com/users/afeiship').then((res) => {
  console.log(res);
  // expect(res.login).toBe('afeiship');
  // done();
});



/*
.vscode/launch.json

{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "pwa-node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/__tests__/debug.js"
        }
    ]
}
*/
