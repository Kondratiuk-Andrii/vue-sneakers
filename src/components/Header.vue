<script setup>
    defineProps({
        totalPrice: Number,
    });
    const emit = defineEmits(['openDrawer']);
</script>

<template>
    <header class="flex justify-between border-b border-slate-200 px-10 py-8">
        <RouterLink to="/">
            <div class="flex items-center gap-4">
                <img class="w-11" src="/logo.png" alt="Logo" />
                <div>
                    <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
                    <p class="text-slate-400">The store of the best sneakers</p>
                </div>
            </div>
        </RouterLink>

        <ul class="flex items-center gap-10">
            <li class="text flex cursor-pointer items-center gap-3" @click="emit('openDrawer')">
                <img src="/cart.svg" alt="Cart" />
                <b>{{ totalPrice }} $</b>
            </li>
            <RouterLink to="/favorites">
                <li class="text flex cursor-pointer items-center gap-3">
                    <img src="/heart.svg" alt="Favorite" />
                    <span>Favorites</span>
                </li>
            </RouterLink>
            <li class="text flex cursor-pointer items-center gap-3">
                <img src="/profile.svg" alt="Favorite" />
                <span>Profile</span>
            </li>
        </ul>
    </header>
</template>
