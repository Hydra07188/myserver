"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require();
const port = 3000;
module_1.app.get('/', (req, res) => {
    res.send('Hello, World!');
});
module_1.app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
