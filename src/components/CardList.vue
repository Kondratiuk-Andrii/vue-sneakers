<script setup>
    import Card from './Card.vue';

    defineProps({
        items: Array,
        isFavoritesPage: Boolean,
    });

    const emit = defineEmits(['addToFavorite', 'addToCart']);
</script>

<template>
    <div class="mx-5 grid grid-cols-auto-fill-325 gap-5 pb-10" v-auto-animate>
        <Card
            v-for="item in items"
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :image-url="item.imageUrl"
            :price="item.price"
            :on-click-add="isFavoritesPage ? null : () => emit('addToCart', item)"
            :on-click-favorite="isFavoritesPage ? null : () => emit('addToFavorite', item)"
            :is-added="item.isAdded"
            :is-favorite="item.isFavorite"
        />
    </div>
</template>
