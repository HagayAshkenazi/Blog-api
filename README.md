<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Blog API - README</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 900px;
      margin: 2rem auto;
      line-height: 1.6;
      padding: 0 1rem;
      color: #333;
    }
    h1, h2, h3 {
      color: #2c3e50;
    }
    pre {
      background: #f4f4f4;
      padding: 1rem;
      overflow-x: auto;
      border-radius: 4px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 0.5rem;
      text-align: left;
    }
    th {
      background-color: #eaeaea;
    }
    a {
      color: #2980b9;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <h1>Blog API</h1>

  <p>A RESTful API for managing blog posts, built with NestJS, Prisma, and PostgreSQL.</p>

  <h2>Overview</h2>
  <p>This API allows you to create, read, update, and delete blog posts.</p>
  <ul>
    <li>UUID validation for post IDs</li>
    <li>Input validation with internationalized error messages</li>
    <li>Global exception handling and logging</li>
    <li>Security hardening with Helmet</li>
    <li>CORS enabled</li>
    <li>Swagger API documentation</li>
    <li>Authentication guard applied globally</li>
  </ul>

  <h2>Endpoints</h2>
  <table>
    <thead>
      <tr>
        <th>Method</th>
        <th>URL</th>
        <th>Description</th>
        <th>Request Body</th>
        <th>Response</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>GET</td>
        <td><code>/api/posts</code></td>
        <td>Get all posts</td>
        <td>None</td>
        <td>Array of posts</td>
      </tr>
      <tr>
        <td>GET</td>
        <td><code>/api/posts/:id</code></td>
        <td>Get post by ID</td>
        <td>None</td>
        <td>Single post or null</td>
      </tr>
      <tr>
        <td>POST</td>
        <td><code>/api/posts</code></td>
        <td>Create a new post</td>
        <td><code>CreatePostDto</code></td>
        <td>Created post</td>
      </tr>
      <tr>
        <td>PATCH</td>
        <td><code>/api/posts/:id</code></td>
        <td>Update post by ID</td>
        <td><code>UpdatePostDto</code></td>
        <td>Updated post</td>
      </tr>
      <tr>
        <td>DELETE</td>
        <td><code>/api/posts/:id</code></td>
        <td>Delete post by ID</td>
        <td>None</td>
        <td>No content (204)</td>
      </tr>
    </tbody>
  </table>

  <h2>Technologies</h2>
  <ul>
    <li><a href="https://nestjs.com/" target="_blank" rel="noopener noreferrer">NestJS</a> - Framework</li>
    <li><a href="https://www.prisma.io/" target="_blank" rel="noopener noreferrer">Prisma</a> - ORM</li>
    <li><a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer">PostgreSQL</a> - Database</li>
    <li><a href="https://helmetjs.github.io/" target="_blank" rel="noopener noreferrer">Helmet</a> - Security middleware</li>
    <li><a href="https://swagger.io/" target="_blank" rel="noopener noreferrer">Swagger</a> - API docs</li>
    <li><a href="https://github.com/expressjs/morgan" target="_blank" rel="noopener noreferrer">Morgan</a> - HTTP request logging</li>
  </ul>

  <h2>Setup & Running</h2>
  <ol>
    <li>Clone the repository:
      <pre><code>git clone https://github.com/your-repo/blog-api.git
cd blog-api</code></pre>
    </li>
    <li>Install dependencies:
      <pre><code>npm install</code></pre>
    </li>
    <li>Create <code>.env</code> file with your database connection string and port number:
      <pre><code>DATABASE_URL=postgresql://user:password@localhost:5432/blogdb
PORT_NUMBER=3000</code></pre>
    </li>
    <li>Run Prisma migrations:
      <pre><code>npx prisma migrate deploy</code></pre>
    </li>
    <li>Start the server:
      <pre><code>npm run start:dev</code></pre>
    </li>

  </ol>

  <h2>Contact</h2>
  <p><strong>Hagay Ashkenazi</strong><br />
  <h2>License</h2>
  <p>MIT License</p>
</body>
</html>
