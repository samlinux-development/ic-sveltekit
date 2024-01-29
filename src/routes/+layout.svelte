<script>
  // Application layout
</script>

<header>
  <nav>
    <a href="/">Home</a>
    <a href="/hello">Hello</a>
  </nav>
</header>

<content>
  <div>
    <slot></slot>
  </div>
</content>

<footer>
  <div>icAcademy</div>
</footer>


<style>
  :global(body) {
    margin: 0rem;
    padding: 0rem;
    font-family: sans-serif;
  }

  header {
    background: #e2f4de;
    color: #145e87;
    padding: 1rem;
  }

  header nav {
    display: flex;
  }

  header nav a {
    color: #145e87;
    text-decoration: none;
    padding: 0 1rem;
  }

  content > div{
    padding: 1rem;
  }
  
  footer {
    background: #e2f4de;
    color: #145e87;
    padding: 1rem;
    text-align: center;
  }
</style>