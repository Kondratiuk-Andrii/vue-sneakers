<script setup>
    defineProps({
        id: Number,
        title: String,
        imageUrl: String,
        price: Number,
        isFavorite: Boolean,
        isAdded: Boolean,
        onClickFavorite: Function,
        onClickAdd: Function,
    });
</script>

<template>
    <div
        class="relative cursor-pointer rounded-3xl border border-slate-100 bg-white p-8 transition hover:-translate-y-2 hover:shadow-xl"
    >
        <img
            class="absolute left-8 top-8"
            v-if="onClickFavorite"
            @click="onClickFavorite"
            :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
            alt="Like"
        />

        <img class="w-full" :src="imageUrl" alt="Sneaker" />

        <p class="mt-2">{{ title }}</p>

        <div class="mt-5 flex justify-between">
            <div class="flex flex-col">
                <span class="text-slate-400">Price:</span>
                <b>{{ price }} $</b>
            </div>
            <img
                v-if="onClickAdd"
                @click="onClickAdd"
                :src="isAdded ? '/checked.svg' : '/plus.svg'"
                alt="Action"
            />
        </div>
    </div>
</template>
