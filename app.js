const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hola mundo");
});

// crear un registro
app.post(`/post`, async (req, res) => {
    const { title, content } = req.body;
    const result = await prisma.post.create({
        data: {
            title,
            content,
        },
    });
    res.json(result);
});

// mostar todos los registros
app.get(`/posts`, async (req, res) => {
    const posts = await prisma.post.findMany();
    res.json(posts);
});

//Actualizar un registro
app.put("/post/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await prisma.post.update({
        where: { id: Number(id) },
        data: { title, content },
    });
    res.json(post);
});
//Eliminar un registro
app.delete("/post/:id", async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.delete({ where: { id: Number(id) } });
    res.json("Eliminado");
});
app.listen(3000, () => console.log(`server ready at:  http://@localhost:3000`));
 