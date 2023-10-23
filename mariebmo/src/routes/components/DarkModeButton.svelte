<script lang="typescript">
  import { browser } from '$app/environment';

    var isDarkMode = false;

    
    if(browser){
        const storedPreference = localStorage.getItem('dark-mode') || window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

        if(storedPreference === 'dark'){
            isDarkMode = true;
        }

        toggle();
    }

    function toggle(){
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        isDarkMode = !isDarkMode;
    }
</script>

<button on:click={toggle}>
    {isDarkMode ? 'Light' : 'Dark'} Mode
</button>
