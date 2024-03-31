<script>
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";
    import { Styles } from '@sveltestrap/sveltestrap';

</script>

<Header/>
<h1>Grupo 22</h1>
<hr>  
<slot></slot>  
<hr>
<Footer/>
<Styles/>

<style>

  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
  }



  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #ccc;
  }
</style>
