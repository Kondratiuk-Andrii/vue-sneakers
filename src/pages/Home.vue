<script setup>
    import axios from 'axios';
    import CardList from 'components/CardList.vue';
    import { inject, onMounted, reactive, ref, watch } from 'vue';

    const { cartItems, addToCart, removeFromCart } = inject('cart');

    const items = ref([]);

    const filters = reactive({
        sortBy: '-id',
        searchQuery: '',
    });

    const onClickAddPlus = (item) => {
        if (item.isAdded) {
            removeFromCart(item);
        } else {
            addToCart(item);
        }
    };

    const onChangeSelect = (event) => {
        filters.sortBy = event.target.value;
    };
    const onChangeSearchInput = (event) => {
        filters.searchQuery = event.target.value;
    };

    const addToFavorite = async (item) => {
        try {
            if (!item.isFavorite) {
                const obj = {
                    item_id: item.id,
                };

                item.isFavorite = true;
                const { data } = await axios.post(
                    'https://763c6f204bf60b83.mokky.dev/favorites',
                    obj
                );
                item.favoriteId = data.id;
            } else {
                item.isFavorite = false;
                await axios.delete(
                    `https://763c6f204bf60b83.mokky.dev/favorites/${item.favoriteId}`
                );
                item.favoriteId = null;
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchFavorites = async () => {
        try {
            const { data: favorites } = await axios.get(
                'https://763c6f204bf60b83.mokky.dev/favorites'
            );

            items.value = items.value.map((item) => {
                const favorite = favorites.find((favorite) => favorite.item_id === item.id);

                if (!favorite) {
                    return item;
                }
                return {
                    ...item,
                    isFavorite: true,
                    favoriteId: favorite.id,
                };
            });
        } catch (err) {
            console.error(err);
        }
    };

    const fetchItems = async () => {
        try {
            const params = {
                sortBy: filters.sortBy,
                title: filters.searchQuery ? `*${filters.searchQuery}*` : undefined,
            };
            const { data } = await axios.get('https://763c6f204bf60b83.mokky.dev/items', {
                params,
            });

            items.value = data.map((obj) => ({
                ...obj,
                isFavorite: false,
                favoriteId: null,
                isAdded: cartItems.value.some((item) => item?.id === obj.id),
            }));
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    onMounted(async () => {
        if (localStorage.getItem('cartItems')) {
            cartItems.value = JSON.parse(localStorage.getItem('cartItems'));
        }
        await fetchItems();
        await fetchFavorites();
    });

    watch(cartItems, () => {
        items.value = items.value.map((item) => ({
            ...item,
            isAdded: cartItems.value.some((cartItem) => cartItem?.id === item.id),
        }));
    });

    watch(filters, fetchItems);
</script>

<template>
    <div class="flex items-center justify-between">
        <h2 class="mb-8 text-3xl font-bold">Featured Products</h2>

        <div class="flex gap-4">
            <select
                class="rounded-md border bg-white px-3 py-2 outline-none"
                @change="onChangeSelect"
            >
                <option value="" disabled selected hidden>Sort by</option>
                <option value="title">By name</option>
                <option value="price">By price ( Increase )</option>
                <option value="-price">By price ( Decrease )</option>
            </select>

            <div class="relative">
                <img class="absolute left-4 top-3" src="/search.svg" alt="Search" />
                <input
                    class="rounded-md border py-2 pl-11 pr-4 outline-none focus:border-gray-400"
                    @input="onChangeSearchInput"
                    placeholder="Find your sneaker"
                />
            </div>
        </div>
    </div>

    <div class="mt-10">
        <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onClickAddPlus" />
    </div>
</template>
