<script lang="typescript">
    import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';
    import Logo from './components/Logo.svelte';
    import Variables from '$lib/variables.svelte';
    import {smallLogo, largeLogo} from '$lib/config';
</script>

<div class="layout">
    <!-- Header -->
      <Header />
  
      <main>
          <!-- Black hole for other content -->
          <div class="centered top-padding">
            <Logo />
          </div>
      </main>
  
    <!-- Footer -->
      <Footer />
  </div>

  <style>

    :global(body) {
        background-color: var(--background-color);
    }

    .layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
    }

    .centered {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    .top-padding {
        padding-top: 5rem;
    }
  </style>