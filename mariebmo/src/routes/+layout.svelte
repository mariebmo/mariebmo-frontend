<script lang="typescript">
    import Header from './components/Header.svelte';
	import Footer from './components/Footer.svelte';
</script>

<div class="layout">
    <!-- Header -->
      <Header />
  
      <main>
          <div class="centered top-padding">
            <slot></slot>
          </div>
      </main>
  
    <!-- Footer -->
      <Footer />
  </div>

  <style>

    @import '../../static/global.scss';

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