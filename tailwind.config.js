/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue, js,ts,jsx,tsx}'],
    theme: {
        extend: {
            gridTemplateColumns: {
                'auto-fill-325': 'repeat(auto-fill, minmax(325px, 1fr))',
            },
        },
    },
    plugins: [],
};


<div class="container mx-auto flex min-h-16 items-center justify-between gap-4 px-4 py-2.5">
            <h1 class="text-xl font-bold">My Website</h1>
            <!-- Navigation Links -->
            <nav>
                <a href="#">Home</a>
                <a href="#">All Posts</a>
                <a href="#">Create Post</a>
            </nav>
            <!-- Login/Register -->
            <div>
                <a href="#">Login</a>
                <a href="#">Register</a>
            </div>
            <!-- Hamburger Menu / Close Button -->
            <!--            <button @click="toggleMenu">-->
            <!--                <font-awesome-icon :icon="isMenuOpen ? faXmark : faBars" />-->
            <!--            </button>-->
        </div>